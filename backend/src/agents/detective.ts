import { ai } from '../lib/genkit';
import { gemini25Pro } from '@genkit-ai/googleai';
import { z } from 'zod';

export const detectiveFlow = ai.defineFlow(
    {
        name: 'brandDetective',
        inputSchema: z.object({ industry: z.string().optional(), websiteUrl: z.string() }),
        outputSchema: z.object({
            physical_address: z.string(),
            competitors: z.array(z.object({
                name: z.string(),
                url: z.string(),
                weakness: z.string()
            }))
        })
    },
    async ({ industry, websiteUrl }) => {
        // In a real scenario, we'd use a scraping tool here. 
        // For now, we rely on the model's knowledge or grounding if enabled/available.

        const effectiveIndustry = industry || "the business represented by the website";


        const searchResult = await ai.generate({
            model: 'vertexai/gemini-2.5-pro',


            config: {
                // googleSearchRetrieval: {} // Temporarily disabled due to Schema conflict
            },
            prompt: `
            You are a Market Detective.
            Target Website: ${websiteUrl}
            Target Industry: ${effectiveIndustry} (Infer specific niche if "Unknown")

            TASKS:
            1. Find the physical address of the company at ${websiteUrl} (or "Remote" if none).
            2. Find 3 top real-world competitors for this specific industry/niche.
            3. For each competitor, identify a specific weakness based on reviews or pricing.
            `,
            output: {
                schema: z.object({
                    physical_address: z.string().describe("The found address or Remote"),
                    competitors: z.array(z.object({
                        name: z.string(),
                        url: z.string(),
                        weakness: z.string()
                    }))
                })
            }
        });

        return searchResult.output;
    }
);
