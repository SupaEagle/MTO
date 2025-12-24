import { PubSub } from '@google-cloud/pubsub';
import { db } from './lib/db';
import * as dotenv from 'dotenv';
import { generateFullBrandStrategy } from './workers/analyzeBrand';

dotenv.config();

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'mansa-tina-ops';
const SUBSCRIPTION_NAME = 'brand-dna-worker-sub';

const pubsub = new PubSub({ projectId: PROJECT_ID });

async function processMessage(message: any) {
    try {
        const data = JSON.parse(message.data.toString());
        const subAccountId = data.subAccountId || data.sub_account_id;
        const wizardData = data.rawAnswers || data.wizard_data;

        if (!subAccountId) {
            console.error("Missing subAccountId in message");
            message.ack();
            return;
        }

        console.log(`🧬 Sequencing DNA for Tenant: ${subAccountId}`);

        // 1. Run the AI Analysis (Full Strategy)
        const strategy = await generateFullBrandStrategy(wizardData);

        // 2. Save to Database (Upsert)
        const query = `
            INSERT INTO brand_dna (
                sub_account_id, 
                website_url,
                core_identity, 
                audience_persona, 
                competitor_intel, 
                voice_guide, 
                content_matrix
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (sub_account_id) DO UPDATE SET
                website_url = EXCLUDED.website_url,
                core_identity = EXCLUDED.core_identity,
                audience_persona = EXCLUDED.audience_persona,
                competitor_intel = EXCLUDED.competitor_intel,
                voice_guide = EXCLUDED.voice_guide,
                content_matrix = EXCLUDED.content_matrix,
                last_updated_at = NOW();
        `;

        await db.query(query, [
            subAccountId,
            wizardData.website || '',
            JSON.stringify(strategy.core_identity),
            JSON.stringify(strategy.audience_persona),
            JSON.stringify(strategy.competitor_intel),
            JSON.stringify(strategy.voice_guide),
            JSON.stringify(strategy.content_matrix)
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
