import { genkit, z } from 'genkit';
import { vertexAI } from '@genkit-ai/vertexai';

const ai = genkit({
    plugins: [
        vertexAI({
            projectId: 'mansa-tina-ops',
            location: 'us-central1',
        }),
    ]
});

// Helper Schema for Phase 1
const CompetitorListSchema = z.object({
    competitors: z.array(z.object({
        name: z.string(),
        website: z.string().optional(),
    })).describe("List of top 3 direct competitors")
});

export const researchCompetitorsFlow = ai.defineFlow(
    {
        name: 'researchCompetitors',
        inputSchema: z.object({
            industry: z.string(),
            location: z.string(),
            website: z.string().optional()
        }) as any,
        outputSchema: z.string() as any, // Returns the final "Gap Report"
    },
    async (input) => {
        console.log(`🕵️‍♂️ Market Detective: Phase 1 - Identification (${input.industry} in ${input.location})...`);

        // PHASE 1: IDENTIFY (Get a structured list to iterate on)
        const identification = await ai.generate({
            model: 'vertexai/gemini-2.5-pro',
            output: { schema: CompetitorListSchema },
            prompt: `
        TASK: Identify the top 3 direct competitors for a "${input.industry}" business in "${input.location}".
        CONTEXT: The client website is ${input.website || "not provided"}.
        Exclude directory sites (Yelp, TripAdvisor) if possible. Focus on actual businesses.
      `,
        });

        const competitors = identification.output?.competitors || [];
        console.log(`🕵️‍♂️ Found targets: ${competitors.map(c => c.name).join(', ')}`);

        // PHASE 2: DEEP DIVE (Parallel execution for speed)
        console.log(`🕵️‍♂️ Market Detective: Phase 2 - Deep Dive...`);
        const deepDivePromises = competitors.map(async (comp) => {
            const rawIntel = await ai.generate({
                model: 'vertexai/gemini-2.5-pro',
                prompt: `
          RESEARCH TARGET: ${comp.name} (${comp.website || "No URL"})
          
          TASK: Act as a Private Investigator. Find specific dirt and details.
          Search specifically for:
          1. "Pricing" - Are they cheap, expensive, or hidden?
          2. "Negative Reviews" - What do people hate? (e.g., "rude service", "slow shipping").
          3. "Case Studies" - What do they brag about?

          Output a raw bulleted list of findings.
        `,
            });
            return `## Competitor: ${comp.name}\n${rawIntel.text}`;
        });

        const deepDiveResults = await Promise.all(deepDivePromises);

        // PHASE 3: SYNTHESIS (Gap Report)
        console.log(`🕵️‍♂️ Market Detective: Phase 3 - Generating Gap Report...`);
        const gapReport = await ai.generate({
            model: 'vertexai/gemini-2.5-pro',
            prompt: `
        You are a Strategic Consultant.
        
        Analyze the following Field Notes from your researcher:
        ${deepDiveResults.join('\n\n')}

        TASK: Write a "Strategic Gap Report".
        
        Structure:
        1. **The Landscape**: Brief summary of the 3 competitors.
        2. **The Weakness**: What is the COMMON complaint or failure point across them? (e.g., "They are all corporate and cold" or "They all have 2-week wait times").
        3. **The Blue Ocean**: Where is the gap? What can a new player do (specifically) to win?
        
        This report will be used by a Copywriter to attack these weaknesses. Be specific.
      `
        });

        return gapReport.text;
    }
);
