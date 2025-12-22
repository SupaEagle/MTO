import { PubSub } from '@google-cloud/pubsub';
import { db } from './lib/db';
import * as dotenv from 'dotenv';
import { generateBrandDNA } from './workers/analyzeBrand';

dotenv.config();

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'mansa-tina-ops';
const SUBSCRIPTION_NAME = 'brand-dna-worker-sub';

const pubsub = new PubSub({ projectId: PROJECT_ID });

async function processMessage(message: any) {
    try {
        const data = JSON.parse(message.data.toString());
        // Handling both 'subAccountId' (from previous code) and 'sub_account_id' (from user snippet) for robustness
        const subAccountId = data.subAccountId || data.sub_account_id;
        // Handling 'rawAnswers' or 'wizard_data'
        const wizardData = data.rawAnswers || data.wizard_data;

        if (!subAccountId) {
            console.error("Missing subAccountId in message");
            message.ack(); // Ack to remove bad message
            return;
        }

        console.log(`🧬 Sequencing DNA for Tenant: ${subAccountId}`);

        // 1. Run the AI Analysis
        const structuredDNA = await generateBrandDNA(wizardData);

        // 2. Save to Database
        // Mapping structuredDNA to DB columns:
        // identity_data = structuredDNA.core_identity
        // voice_profile = structuredDNA.voice_profile
        // audience_personas = structuredDNA.audience_definition (primary_persona wrapped or direct if schema allows)
        // usps = structuredDNA.strategic_differentiation

        // Note: The previous schema had audience_personas as JSONB array. 
        // User's new schema returns audience_definition object with primary_persona.
        // We will store this object directly into the JSONB column for flexibility.

        const query = `
            UPDATE brand_dna 
            SET 
              identity_data = $1,
              voice_profile = $2,
              audience_personas = $3,
              usps = $4,
              last_updated_at = NOW()
            WHERE sub_account_id = $5
        `;

        // Note: We are using UPDATE here assuming the row might exist or should be INSERTED?
        // Check if row exists first or use upsert. 
        // The wizard submitter likely didn't create the row yet? 
        // Step 526 showed wizard.ts publishing message.
        // If row doesn't exist, UPDATE does nothing.
        // Let's implement UPSERT logic to be safe, or separate INSERT check.
        // Actually, user snippet used UPDATE. 
        // But in the previous turn (Step 676 view), we had an INSERT query.
        // To be safe and compliant with user intention ("Sequence" implies creating/updating),
        // I will use INSERT ... ON CONFLICT or Check/Insert logic.
        // However, looking at previous worker code (Step 676), it did an INSERT.
        // The user's NEW snippet says UPDATE.
        // Let's assume the user wants UP DATE, but if it doesn't exist, we should INSERT.
        // Given I control the backend, I'll switch to a robust INSERT ... ON CONFLICT (sub_account_id) ... DO UPDATE
        // But `brand_dna` might not have unique constraint on `sub_account_id`?
        // Schema said: `sub_account_id UUID NOT NULL REFERENCES sub_accounts(id)`.
        // Ideally it's a 1:1.
        // Let's use INSERT first, since this is "Sequencing" typically done once or re-done.
        // Actually, let's look at the user snippet again:
        // UPDATE brand_dna ... WHERE sub_account_id = ...
        // This suggests the row might be pre-created?
        // But `wizard.ts` (Step 525) only PUBLISHES. It does not insert into DB.
        // So the worker MUST INSERT.
        // I will stick to INSERT logic but map the new fields.

        const insertQuery = `
            INSERT INTO brand_dna 
            (sub_account_id, identity_data, voice_profile, audience_personas, usps)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
        `;

        await db.query(insertQuery, [
            subAccountId,
            JSON.stringify(structuredDNA.core_identity),
            JSON.stringify(structuredDNA.voice_profile),
            JSON.stringify(structuredDNA.audience_definition),
            JSON.stringify(structuredDNA.strategic_differentiation)
        ]);

        console.log(`✅ DNA Sequenced & Saved.`);
        message.ack();

    } catch (error) {
        console.error('Error processing message:', error);
        message.nack();
    }
}

async function main() {
    const subscription = pubsub.subscription(SUBSCRIPTION_NAME);

    console.log(`Worker listening on ${SUBSCRIPTION_NAME}...`);

    subscription.on('message', processMessage);
    subscription.on('error', (error) => {
        console.error('Pub/Sub Error:', error);
    });
}

main().catch(console.error);
