import * as dotenv from 'dotenv';
dotenv.config();

import { startBrandAnalysis } from '../workflows/dnaOrchestrator';

async function refresh() {
    try {
        const subAccountId = '550e8400-e29b-41d4-a716-446655440001';
        console.log(`Refreshing Brand DNA for account: ${subAccountId} (Agentic Flow)`);

        // Mock Wizard Inputs
        const wizardInputs = {
            companyName: "KeenPlex Technologies",
            website: "https://www.keenplextechnologies.com/",
            address: "St Petersburg, FL", // Added for Researcher
            missionGoal: "Scale to 50 clients",
            missionText: "We want to help more private practices stay secure.",
            homeRunClient: "Dr. Evelyn Reed. She was terrified of ransomware. We installed our system, she slept better instantly, and saved $50k in potential fines. She loves our 'set and forget' approach.",
            adjectives: ["Reliable", "Authoritative", "Calm", "Tech-Savvy"],
            antiStyle: "Don't use overly complex jargon or fear-mongering."
        };

        // Run the Orchestrator (it saves to DB internally)
        await startBrandAnalysis(subAccountId, wizardInputs);

        console.log("✅ Brand DNA successfully refreshed via Agentic Workflow.");

    } catch (e) {
        console.error("Failed to refresh DNA:", e);
    }
}

refresh();
