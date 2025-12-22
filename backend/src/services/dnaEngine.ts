import { VertexAI } from '@google-cloud/vertexai';
import { scrapeWebsiteText } from '../lib/scraper';

// Initialize Gemini
// Using the project ID from the user instructions.
// In production, these should be env vars.
const vertexAI = new VertexAI({ project: 'mansa-tina-ops', location: 'us-central1' });
const model = vertexAI.preview.getGenerativeModel({
    model: 'gemini-1.5-pro-002', // Best for complex logic
    generationConfig: { responseMimeType: "application/json" } // Force JSON
});

export async function generateBrandStrategy(inputs: any) {
    // Map frontend inputs to the variables expected by the prompts
    // Frontend: website, missionGoal, missionText, homeRunClient, adjectives, antiStyle
    const { website, missionGoal, missionText, homeRunClient, adjectives, antiStyle } = inputs;

    const websiteUrl = website;
    const successStory = homeRunClient;
    const goal = `${missionGoal}: ${missionText}`; // Combine goal + specifics
    const voiceAdjectives = adjectives?.join(', ');

    // 1. Run the Scraper (Async)
    const websiteContext = await scrapeWebsiteText(websiteUrl);

    // 2. The Mega-Prompt
    const prompt = `
    ROLE: You are the 'Mansa Tina' Chief Strategy Officer.
    TASK: Convert raw inputs into a 40-point Brand DNA strategy.

    INPUTS:
    - Scraped Context: ${websiteContext}
    - "Home Run" Client Story: ${successStory}
    - 90-Day Business Goal: ${goal}
    - Vibe/Voice: ${voiceAdjectives}
    - Constraints (HATE list): ${antiStyle}

    INSTRUCTIONS:
    1. INFER the "Core USP" based on the client story.
    2. CREATE a "Journey Map" for the USP (Hook -> Pitch -> Close).
    3. DEFINE the "Audience Persona" derived from the success story character.
    4. CALIBRATE the voice: Mix the website's current tone with the desired 'Vibe'.

    OUTPUT SCHEMA (Return STRICT JSON):
    {
      "core_identity": { "mission_statement": "...", "vision_statement": "...", "brand_values": ["..."], "brand_archetype": "..." },
      "audience_definition": { 
         "primary_persona": { "name": "...", "demographics": "...", "psychographics": "...", "pain_points": ["..."], "desires": ["..."] } 
      },
      "strategic_differentiation": { 
         "core_usp": "...", 
         "journey_touchpoints": { "hook": "...", "pitch": "...", "close": "..." },
         "competitor_gap": "..."
      },
      "voice_profile": { "tone_keywords": ["..."], "reading_level": "...", "do_not_say": ["..."], "emoji_usage": "..." },
      "content_strategy": { "pillars": [{"topic": "...", "rationale": "..."}] }
    }
  `;

    // 3. Call AI
    console.log("🧬 Sequencing DNA with Gemini...");
    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) throw new Error("AI returned empty response");

    return JSON.parse(responseText);
}
