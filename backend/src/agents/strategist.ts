import { ai } from '../lib/genkit';
import { gemini25Pro } from '@genkit-ai/googleai';
import { z } from 'zod';

export const strategistFlow = ai.defineFlow(
   {
      name: 'brandStrategist',
      inputSchema: z.object({ vibe: z.array(z.string()), antiStrategy: z.string() }),
      outputSchema: z.object({
         voice: z.object({
            persona_type: z.string(),
            reading_level: z.string(),
            forbidden_words: z.array(z.string()),
            hook_style: z.string(),
            emoji_usage: z.enum(['Heavy', 'Moderate', 'Minimal'])
         }),
         visual_identity: z.object({
            primary_color: z.string(),
            secondary_color: z.string(),
            accent_color: z.string(),
            typography: z.object({
               header: z.string(),
               body: z.string()
            })
         })
      })
   },
   async ({ vibe, antiStrategy }) => {

      const result = await ai.generate({
         model: 'vertexai/gemini-2.5-pro',
         prompt: `
        You are a Creative Strategist.
        Client Vibe/Adjectives: ${vibe.join(', ')}
        Anti-Strategy (What they hate): ${antiStrategy}

        TASKS:
        1. Define the Brand Voice & Persona Type (e.g. "The Sage").
        2. Create a list of "Forbidden Words" based on the Anti-Strategy.
        3. Define the Visual Identity (Colors/Fonts) matching the Vibe.
      `,
         output: {
            schema: z.object({
               voice: z.object({
                  persona_type: z.string(),
                  reading_level: z.string(),
                  forbidden_words: z.array(z.string()),
                  hook_style: z.string(),
                  emoji_usage: z.enum(['Heavy', 'Moderate', 'Minimal'])
               }),
               visual_identity: z.object({
                  primary_color: z.string(),
                  secondary_color: z.string(),
                  accent_color: z.string(),
                  typography: z.object({
                     header: z.string(),
                     body: z.string()
                  })
               })
            })
         }
      });
      return result.output;
   }
);
