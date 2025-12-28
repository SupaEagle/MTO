import { runSixAgentPipeline } from '../workflows/sixAgentOrchestrator';

async function testHexagon() {
    const subAccountId = 'f19d0840-776a-4d93-8b40-664483160046'; // Using our test client ID
    const inputs = {
        companyName: "KeenPlex Technologies",
        websiteUrl: "https://keenplex.com",
        industry: "Custom Software Development",
        vibe: "Innovative, Professional, Secure",
        successStory: "We helped a healthcare startup automate their patient records, reducing errors by 90% and saving them $200k in year one. The 'Villain' was the legacy manual system that was slow and prone to human error.",
        antiStrategy: "Generic templates and offshore outsourcing",
        goal: "Dominate the Enterprise SaaS market in 2026"
    };

    console.time("Hexagon Speed Test");
    const result = await runSixAgentPipeline(subAccountId, inputs);
    console.timeEnd("Hexagon Speed Test");

    console.log("Result Core:", JSON.stringify(result.dna.core, null, 2));
}

testHexagon().catch(err => {
    console.error("Test Failed:", err);
    process.exit(1);
});
