
import { startBrandAnalysis } from '../workflows/dnaOrchestrator';
import { db } from '../lib/db';

async function testAgentFlow() {
    console.log("🚀 Manually triggering Agent Flow...");

    // 1. Target the NEW client ID from the latest lookup (d175...)
    const subAccountId = "d1754b61-a082-4c98-ac92-0e3fdf9adbbd";


    // 2. Mock Data from "Ignition" Wizard (V2)
    const mockWizardData = {
        companyName: "KeenPlex Technologies LLC",
        website: "https://www.keenplextechnologies.com/",
        // Note: 'industry' removed as per V2, but we can pass it if we want to test that override, 
        // OR rely on Detective inference. Let's test inference.
        // industry: "Managed IT", 

        // 12-Month Goal (Formerly Mission)
        missionGoal: "Growth",
        missionText: "Expand to 2 new locations and hit $2M ARR.",

        // Home Run Case (Audience)
        homeRunClient: "We helped a Dental Practice that was held hostage by ransomware. We restored their data in 4 hours and secured their network. They were crying with relief.",

        // Villain (New Step)
        villain: "Cyber Criminals and 'Tech Bro' IT providers who don't care about people.",

        // Voice
        adjectives: ["Reliable", "Protective", "Human-Centric"],
        antiStyle: "Robotic Tech Jargon"
    };

    console.log("🔥 Triggering V2 Agent Orchestrator...");

    try {
        const result = await startBrandAnalysis(subAccountId, mockWizardData);
        console.log("✅ Analysis Complete:", JSON.stringify(result, null, 2));
        process.exit(0); // Assuming success should still exit with 0 unless explicitly stated otherwise for success
    } catch (error) {
        console.error("❌ Analysis Failed:", error);
        process.exit(1);
    }
}


testAgentFlow();
