import { genkit, z } from 'genkit';
import { vertexAI } from '@genkit-ai/vertexai';

const ai = genkit({
    plugins: [
        vertexAI({
            projectId: '284915496002',
            location: 'us-central1',
        }),
    ]
});

export const researchCompetitorsFlow = ai.defineFlow(
    {
        name: 'researchCompetitors',
        inputSchema: z.object({
            industry: z.string(),
            location: z.string(),
            website: z.string().optional()
        }) as any,
        outputSchema: z.string() as any, // Returns raw insights text
    },
    async (input) => {
        console.log(`🕵️‍♂️ Researcher looking for competitors in ${input.location} for ${input.industry}`);

        const llmResponse = await ai.generate({
            // Using specific version for Vertex AI
            model: 'vertexai/gemini-3-flash-preview',
            prompt: `
        You are a Market Research Agent.

    TASK:
        Find 3 top competitors for a "${input.industry}" business in "${input.location}".
        If a website is provided(${input.website}), analyze it briefly to understand the niche better.

        For each competitor, find their:
1. Name
2. Website URL
3. One major customer complaint(check reviews if possible) or weakness.
        4. One strong selling point(Strength).

    Also, find the "Market Gap" - what are these competitors missing that a new player could offer ?

        Return the data as a detailed summary.
      `,
            config: {
                googleSearchRetrieval: {}
            },
        });

        return llmResponse.text;
    }
);
