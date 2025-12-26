import { genkit, z } from 'genkit';
import { vertexAI } from '@genkit-ai/vertexai';
import { BrandDnaSchema } from '../lib/schemas/dnaSchema';

const ai = genkit({
   plugins: [
      vertexAI({
         projectId: '284915496002',
         location: 'us-central1',
      }),
   ]
});

export const generateStrategyFlow = ai.defineFlow(
   {
      name: 'generateStrategy',
      inputSchema: z.object({
         userInputs: z.any(),
         researchData: z.string(),
      }) as any,
      outputSchema: BrandDnaSchema as any,
   },
   async ({ userInputs, researchData }) => {
      const { companyName, website, adjectives, antiStyle, missionGoal, missionText, homeRunClient } = userInputs;

      const prompt = `
ROLE: You are the Chief Strategy Officer for a Fortune 500 Agency.
   TASK: Analyze the inputs below and generate a COMPLETE Brand Strategy Document. 
      
      *** CRITICAL RULES ***
   1. PRIORITIZE INPUTS: Use '${companyName}' and '${website}' verbatim.
      2. USE RESEARCH: Use the provided 'Competitor Research' to fill the 'competitor_recon' and 'strategic_differentiation' sections.
      3. TONE: See "GOLD STANDARD EXAMPLES" below.You MUST mimic this "Warm, Inspiring, We-centric" voice.

      --- INPUTS-- -
   Company: ${companyName}
Website: ${website}
"Home Run" Story: ${homeRunClient}
Goals: ${missionGoal} - ${missionText}
Vibe: ${adjectives?.join(', ')}
Anti - Style: ${antiStyle}

--- RESEARCH DATA(From Researcher Agent)-- -
   ${researchData}

      *** GOLD STANDARD EXAMPLES(TONE & STYLE) ***

   1. MISSION STATEMENT(Longer, Warmer, Inspiring. "We/Company" perspective):
- "We dedicate ourselves to cultivating deep, honest relationships with local farmers... We believe that true hospitality begins with the soil..."
   - "Our mission is to ignite the spark of curiosity in every child... ensuring every student feels seen, valued, and capable of greatness."
   - "We design living spaces that breathe in harmony with nature... We are committed to the belief that your home should not only shelter your family but also nurture your spirit..."

2. VISION STATEMENT(The Dream.Future - oriented):
- "We envision a world where well-being is not a luxury, but a daily rhythm for everyone..."
   - "We dream of a time when our shelters are empty not because we closed them, but because every animal has found a loving home..."
   - "We look forward to a world without barriers..."

3. BRAND PROMISE(The Vow.Warm, Personal Guarantee):
- "When you stay with us, we promise you will feel less like a guest and more like family..."
   - "We promise to treat your dreams with the same care as we treat your finances... guide with integrity..."
   - "We promise that every cup you pour will be a moment of pause in your busy day..."

--- INSTRUCTIONS-- -

   1. BRAND CORE:
- Mission: Answer Why / Who / How using the WARM, NARRATIVE style above.
- Vision: Future outcome(5 - 10 years).
         - Promise: Personal, emotional guarantee.

      2. VISUAL IDENTITY:
- If colors aren't provided in research, suggest them based on the "Vibe".

3. NARRATIVE:
- Dramatize the "Hope Run" story into a legendary origin.

      Output MUST match the JSON schema exactly.
    `;

      const response = await ai.generate({
         model: 'vertexai/gemini-3-flash-preview',
         prompt: prompt,
         output: { schema: BrandDnaSchema as any }
      });

      return response.output;
   }
);
