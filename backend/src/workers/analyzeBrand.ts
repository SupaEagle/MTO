import { VertexAI } from '@google-cloud/vertexai';
import { BrandDnaSchema } from '../types/brandDna';

// Initialize Vertex AI
// Note: Project and Location should be environment variables in production, 
// strictly using 'mansa-tina-ops' and 'us-central1' as per user snippet for now.
const vertexAI = new VertexAI({ project: 'mansa-tina-ops', location: 'us-central1' });
const model = vertexAI.preview.getGenerativeModel({ model: 'gemini-1.5-pro-002' }); // Using 1.5 Pro as requested

export async function generateBrandDNA(wizardAnswers: any): Promise<BrandDnaSchema> {

    // 1. Construct the Prompt
    const prompt = `
    ROLE:
    You are the Chief Brand Strategist for a Fortune 500 agency. Your job is to take raw client input and distill it into a sophisticated "Brand DNA" strategy document.

    INPUT DATA (Raw Wizard Answers):
    ${JSON.stringify(wizardAnswers, null, 2)}

    TASK:
    Analyze the input above. Extrapolate, refine, and structure the data into a cohesive brand strategy. 
    - If the input is "We sell coffee," turn it into "Premium artisanal coffee experiences for the modern connoisseur."
    - Infer the "Brand Archetype" based on their tone.
    - Create a specific "Persona" name (e.g., "Corporate Carl").

    OUTPUT FORMAT:
    Return ONLY a valid JSON object matching this TypeScript interface exactly. Do not use Markdown blocks.
    
    {
      "core_identity": {
        "mission_statement": "string",
        "vision_statement": "string",
        "brand_values": ["string"],
        "brand_archetype": "string"
      },
      "voice_profile": {
        "tone_adjectives": ["string"],
        "reading_level": "string",
        "do_not_say": ["string"],
        "emoji_usage": "Heavy" | "Moderate" | "None"
      },
      "audience_definition": {
        "primary_persona": {
          "name": "string",
          "demographics": "string",
          "psychographics": "string",
          "pain_points": ["string"],
          "desires": ["string"]
        }
      },
      "strategic_differentiation": {
        "unique_value_proposition": "string",
        "competitor_gap": "string"
      }
    }
  `;

    // 2. Call Gemini
    try {
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json", // CRITICAL: Forces JSON output
                temperature: 0.7, // Slightly creative for strategy
            },
        });

        const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text;

        // 3. Parse & Validate
        if (!responseText) throw new Error("No response from AI");

        const brandDna = JSON.parse(responseText) as BrandDnaSchema;
        return brandDna;

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        throw error;
    }
}
