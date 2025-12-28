import { ai } from '../lib/genkit';
import { gemini25Pro } from '@genkit-ai/googleai';
import { z } from 'zod';

export const psychologistFlow = ai.defineFlow(
    {
        name: 'brandPsychologist',
        inputSchema: z.object({ successStory: z.string(), villain: z.string() }),
        outputSchema: z.object({
            audience: z.object({
                avatar_name: z.string(),
                demographics: z.string(),
                psychographics: z.string(),
                misery_map: z.object({
                    fear: z.string(),
                    pain: z.string(),
                    problem: z.string()
                }),
                miracle: z.string()
            }),
            origin_story: z.string()
        })
    },
    async ({ successStory, villain }) => {

        const result = await ai.generate({
            model: 'vertexai/gemini-2.5-pro',
            prompt: `
        You are a Brand Psychologist. 
        Analyze this Success Story: "${successStory}"
        The declared Enemy/Villain is: "${villain}"
        
        TASKS:
        1. Extract the "Customer Misery" (The Fear, Pain, and Problem) from the story.
        2. Define the "Dream Outcome" (The Miracle) that was achieved.
        3. Define the "Avatar Name" (e.g. Frustrated Frank).
        4. Write an "Origin Story" where the Founder fights "${villain}" to help this Avatar.
      `,
            output: {
                schema: z.object({
                    audience: z.object({
                        avatar_name: z.string(),
                        demographics: z.string(),
                        psychographics: z.string(),
                        misery_map: z.object({
                            fear: z.string(),
                            pain: z.string(),
                            problem: z.string()
                        }),
                        miracle: z.string()
                    }),
                    origin_story: z.string()
                })
            }
        });
        return result.output;
    }
);
