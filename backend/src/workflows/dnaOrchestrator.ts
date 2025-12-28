import { z } from 'zod';
import { ai } from '../lib/genkit';
import { gemini25Pro } from '@genkit-ai/googleai';
import { db } from '../lib/db';
import { BrandDnaSchema } from '../lib/schemas/dnaSchema';
import { detectiveFlow } from '../agents/detective';
import { psychologistFlow } from '../agents/psychologist';
import { strategistFlow } from '../agents/strategist';
import * as fs from 'fs';
import * as path from 'path';

// Util for logging
function logError(error: any, context: string) {
    const logPath = path.join(__dirname, '../latest_error.log');
    const timestamp = new Date().toISOString();
    const message = `[${timestamp}] ERROR in ${context}: ${error instanceof Error ? error.message : JSON.stringify(error)}\nStack: ${error instanceof Error ? error.stack : ''}\n\n`;
    fs.appendFileSync(logPath, message);
}

export async function startBrandAnalysis(subAccountId: string, wizardData: any) {
    console.log(`🚀 Starting Brand Analysis V2 (Reverse-Engineering) for ${subAccountId}...`);

    try {
        // 1. Parallel Execution
        // Note: Flows defined by `ai.defineFlow` are directly callable.
        console.log("🕵️‍♂️ Launching Agents: Detective, Psychologist, Strategist...");

        const [detectiveData, psychologistData, strategistData] = await Promise.all([
            detectiveFlow({
                industry: wizardData.industry,
                websiteUrl: wizardData.website
            }),
            psychologistFlow({
                successStory: wizardData.homeRunClient,
                villain: wizardData.villain || "Generic Industry Problems"
            }),
            strategistFlow({
                vibe: wizardData.adjectives,
                antiStrategy: wizardData.antiStyle
            })
        ]);

        console.log("✅ Agents Returned. Synthesizing Final DNA...");

        // 2. Synthesis Phase

        const finalSynthesis = await ai.generate({
            model: 'vertexai/gemini-2.5-pro',
            prompt: `
                Merge these insights into the Final Brand DNA JSON.
                
                METADATA:
                Company Name: ${wizardData.companyName}
                Website: ${wizardData.website}
                1-Year Goal: ${wizardData.missionGoal} / ${wizardData.missionText}

                DETECTIVE DATA (Competitors/Address): ${JSON.stringify(detectiveData)}
                PSYCH DATA (Audience/Story): ${JSON.stringify(psychologistData)}
                STRATEGIST DATA (Voice/Visuals): ${JSON.stringify(strategistData)}
                
                TASKS:
                1. Combine "Psychologist.origin_story" into the Narrative section.
                2. Combine "Detective.physical_address" into Core section.
                3. Ensure "Customer Misery 1, 2, 3" are distinct.
                4. Ensure "Market Gap" is based on competitor weaknesses found by Detective.
                5. Add 4 solid Content Pillars and Strategy based on the 1-Year Goal.
            `,
            output: { schema: BrandDnaSchema }
        });

        const dna = finalSynthesis.output;

        if (!dna) {
            throw new Error("Failed to generate DNA from Synthesis");
        }

        // 3. Save to DB
        console.log("💾 Saving DNA to Database...");
        const query = `
            UPDATE brand_dna
            SET 
                identity_data = $1,
                visual_identity = $2,
                brand_core = $3,
                narrative = $4,
                audience_definition = $5,
                competitor_recon = $6,
                voice_calibration = $7,
                content_strategy = $8,
                strategic_differentiation = $9,
                last_updated_at = NOW()
            WHERE sub_account_id = $10
        `;


        await db.query(query, [
            JSON.stringify({ company_name: dna.core.company_name, website_url: dna.core.website_url, industry: dna.core.industry, physical_address: dna.core.physical_address }), // identity_data
            JSON.stringify(dna.visual_identity),
            JSON.stringify(dna.core),
            JSON.stringify(dna.core.narrative), // narrative
            JSON.stringify(dna.audience),
            JSON.stringify(dna.competitors),
            JSON.stringify(dna.voice),
            JSON.stringify(dna.content),
            JSON.stringify(dna.strategy),
            subAccountId
        ]);

        console.log("✅ Brand DNA V2 Saved Successfully!");
        return { success: true, dna };

    } catch (error) {
        console.error("❌ Error in Brand Analysis Flow:", error);
        logError(error, "startBrandAnalysis");
        throw error;
    }
}
