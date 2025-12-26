import { researchCompetitorsFlow } from '../agents/researcher';
import { generateStrategyFlow } from '../agents/strategist';
import { db } from '../lib/db';
import { BrandDna } from '../lib/schemas/dnaSchema';

export async function startBrandAnalysis(subAccountId: string, wizardData: any) {

    console.log(`🚀 Starting Brand Analysis for ${subAccountId}...`);

    try {
        // Step 1: Trigger Research Agent (The "Hunter")
        const searchLocation = wizardData.address || "United States"; // Fallback
        const searchIndustry = wizardData.missionGoal || "Business"; // Fallback inference

        console.log("🕵️‍♂️ Agent Starting: Competitor Recon...");
        // Direct invocation in Genkit 1.x
        const researchResults = await researchCompetitorsFlow({
            industry: searchIndustry,
            location: searchLocation,
            website: wizardData.website
        });

        // Step 2: Trigger Strategist Agent (The "Creator")
        console.log("🧠 Agent Starting: Strategy Synthesis...");
        const finalDNA = await generateStrategyFlow({
            userInputs: wizardData,
            researchData: researchResults
        });

        // Step 3: Save to Database
        console.log("💾 Saving DNA to Vault...");

        // Explicitly casting or ensuring strict types for the query parameters
        const dna: BrandDna = finalDNA;

        const query = `
      UPDATE brand_dna SET
        identity_data = $1,
        competitor_recon = $2,
        strategic_differentiation = $3,
        narrative = $4,
        brand_core = $5,
        visual_identity = $6,
        audience_definition = $7,
        voice_calibration = $8,
        content_strategy = $9,
        last_updated_at = NOW()
      WHERE sub_account_id = $10
    `;

        await db.query(query, [
            JSON.stringify(dna.business_details),
            JSON.stringify(dna.competitor_recon),
            JSON.stringify(dna.strategic_differentiation),
            JSON.stringify(dna.narrative),
            JSON.stringify(dna.brand_core),
            JSON.stringify(dna.visual_identity),
            JSON.stringify(dna.audience_definition),
            JSON.stringify(dna.voice_calibration),
            JSON.stringify(dna.content_strategy),
            subAccountId
        ]);

        console.log("✅ Brand DNA Saved Successfully!");
        return { success: true };

    } catch (error) {
        console.error("❌ Agent Orchestration Failed:", error);
        // Optional: Update DB status to 'failed' if we had a status column
        throw error;
    }
}
