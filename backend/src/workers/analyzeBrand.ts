import { VertexAI } from '@google-cloud/vertexai';
import { scrapeWebsiteText } from '../lib/scraper';
import { BrandDnaSchema } from '../types/brandDna';

const vertexAI = new VertexAI({ project: '284915496002', location: 'us-central1' });
const model = vertexAI.preview.getGenerativeModel({
  model: 'gemini-2.5-pro',
  generationConfig: { responseMimeType: "application/json" }
});

export async function generateBrandDNA(wizardInputs: any): Promise<BrandDnaSchema> {
  const { website, missionGoal, missionText, homeRunClient, adjectives, antiStyle, companyName } = wizardInputs;
  const websiteUrl = website; // Mapping specifically for consistency

  // 1. Scrape Context (The Foundation)
  let webContext = "";
  if (websiteUrl) {
    try {
      webContext = await scrapeWebsiteText(websiteUrl);
    } catch (e) {
      console.error("Scraping failed", e);
    }
  }

  // 2. The Mega-Prompt
  const prompt = `
    ROLE: You are the Chief Strategy Officer for a Fortune 500 Agency.
    TASK: Analyze the inputs below and generate a COMPLETE Brand Strategy Document. 
    You must EXTRAPOLATE missing details based on the "Success Story" and "Web Context".

    --- INPUTS ---
    Company: ${companyName || 'Unknown Company'}
    Web Context: ${webContext ? webContext.slice(0, 10000) : 'No website content found.'} (Use this for Competitors, Services, and Address)
    "Home Run" Story: ${homeRunClient} (Use this to profile the Avatar and Pain Points)
    12-Month Goal: ${missionGoal}: ${missionText} (Use this to decide Content Mix and Strategy)
    Vibe: ${adjectives?.join(', ')} (Use this for Voice & Visuals)
    Anti-Style: ${antiStyle} (Use this for Forbidden Words)

    --- INSTRUCTIONS PER SECTION ---

    1. CORE & BASICS:
       - Find the address in the Web Context. If none, return empty string.
       - SUGGEST Hex Codes and Fonts based on the "${adjectives?.join(', ')}" vibe.
       - Write a "Legend" Origin Story based on the "Home Run" story.

    2. AUDIENCE (The Avatar):
       - Name the avatar (e.g. "Stressed Susan").
       - Infer 3 specific "Miseries" (Fear, Pain, Problem) from the success story.
       - Define the "Psychographics" (What do they believe about themselves?).

    3. VOICE:
       - Define a "Reading Level" (e.g. Grade 5 vs Grade 12) matching the Industry.
       - Add specific "Forbidden Words" based on the Anti-Style input.

    4. COMPETITORS:
       - Identify 3 likely competitor archetypes or real brands based on the Industry.

    5. CONTENT:
       - Create 4 Content Pillars.
       - Suggest a Platform Mix (e.g. LinkedIn vs TikTok) based on the Avatar's age.

    6. STRATEGY (USP):
       - Define the "Market Gap" (What are they doing that others aren't?).
       - Fill the "Value Equation" (Dream Outcome, Time Delay, Effort).

    --- OUTPUT FORMAT ---
    Return ONLY a valid JSON object matching the BrandDnaSchema structure exactly.
    {
      "business_details": {
        "company_name": "string",
        "website_url": "string",
        "industry_niche": "string",
        "physical_address": "string"
      },
      "visual_identity": {
        "primary_color": "string",
        "secondary_color": "string",
        "accent_color": "string",
        "typography": { "header": "string", "body": "string" }
      },
      "brand_core": {
        "mission_statement": "string",
        "vision_statement": "string",
        "brand_promise": "string"
      },
      "narrative": {
        "founder_name": "string",
        "origin_story": "string"
      },
      "audience_definition": {
        "avatar_name": "string",
        "market_description": "string",
        "demographics": "string",
        "psychographics": "string",
        "misery_map": {
          "fear": "string",
          "pain": "string",
          "problem": "string"
        },
        "miracle": "string"
      },
      "voice_calibration": {
        "persona_type": "string",
        "reading_level": "string",
        "forbidden_words": ["string"],
        "required_terminology": ["string"],
        "emoji_usage": "string (Heavy|Moderate|None)",
        "hook_style": "string"
      },
      "competitors": {
        "primary_competitors": [{"name": "string", "url": "string"}],
        "additional_players": ["string"]
      },
      "content_strategy": {
        "pillars": ["string", "string", "string", "string"],
        "posting_frequency": "string",
        "platform_mix": "string",
        "topics": {
          "trend_jacking": ["string"],
          "evergreen": ["string"]
        }
      },
      "strategy_usp": {
        "unique_selling_proposition": "string",
        "market_gap": "string",
        "value_equation": {
          "dream_outcome": "string",
          "likelihood": "string",
          "time_delay": "string",
          "effort_sacrifice": "string"
        },
        "pricing_strategy": "string"
      }
    }
  `;

  // 3. Execute
  console.log("🧬 Sequencing DNA with Gemini 2.5 Pro (Mega-Prompt)...");
  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!responseText) throw new Error("AI returned empty response");

  try {
    const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr) as BrandDnaSchema;
  } catch (e) {
    console.error("Failed to parse AI response", responseText);
    throw new Error("Invalid JSON from AI");
  }
}

// Alias for backwards compatibility if needed specifically by name import
export const generateFullBrandStrategy = generateBrandDNA;
