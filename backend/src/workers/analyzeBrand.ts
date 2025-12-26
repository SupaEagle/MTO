import { VertexAI } from '@google-cloud/vertexai';
import { scrapeWebsiteText } from '../lib/scraper';
import { BrandDnaSchema } from '../types/brandDna';

const vertexAI = new VertexAI({ project: '284915496002', location: 'us-central1' });
const model = vertexAI.preview.getGenerativeModel({
  model: 'gemini-3-pro-preview',
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
    
    *** CRITICAL RULES ***
    1. PRIORITIZE INPUTS: You MUST use the provided 'Company' and 'Website URL' inputs verbatim. Do NOT hallucinations diffent values.
    2. USE CONTEXT: Use the 'Web Context' to find the ACTUAL Physical Address and Service Details.
    3. NO GENERIC FLUFF: Avoid corporate jargon. Be specific, bold, and strategic.

    --- INPUTS ---
    Company: ${companyName || 'Unknown Company'}
    Website URL: ${websiteUrl || 'Not Provided'}
    "Home Run" Story: ${homeRunClient}
    12-Month Goal: ${missionGoal}: ${missionText}
    Vibe: ${adjectives?.join(', ')}
    Anti-Style: ${antiStyle}
    
    Web Context (EXTRACTED CONTENT): 
    "${webContext ? webContext.slice(0, 50000) : 'No website content found.'}"

    *** GOLD STANDARD EXAMPLES (TONE & STYLE) ***
    
    1. MISSION STATEMENT (Longer, Warmer, Inspiring. "We/Company" perspective):
       - "We dedicate ourselves to cultivating deep, honest relationships with local farmers to bring the freshest, most nourishing harvest to your plate. We believe that true hospitality begins with the soil and ends with a shared smile across the table."
       - "Our mission is to ignite the spark of curiosity in every child. We strive to create safe, magical learning environments where mistakes are celebrated as stepping stones, ensuring every student feels seen, valued, and capable of greatness."
       - "We design living spaces that breathe in harmony with nature. We are committed to the belief that your home should not only shelter your family but also nurture your spirit and protect the environment we all share." 
       *RULE: Answer Why/Who/How, but use this warm, narrative style.*

    2. VISION STATEMENT (The Dream. Future-oriented):
       - "We envision a world where well-being is not a luxury, but a daily rhythm for everyone. We see a future where stress is replaced by balance, and where every individual has the knowledge and support to live their most vibrant, energetic life."
       - "We dream of a time when our shelters are empty not because we closed them, but because every animal has found a loving home. We look toward a society where compassion for all living beings is the standard, not the exception."
       - "We look forward to a world without barriers, where language serves as a bridge rather than a wall. We see a global community where understanding flows freely, and strangers become friends through the power of shared communication."

    3. BRAND PROMISE (The Vow. Warm, Personal Guarantee):
       - "When you stay with us, we promise you will feel less like a guest and more like family. From the moment you arrive, we guarantee a sanctuary of warmth and attention where your comfort is our only priority."
       - "We promise to treat your dreams with the same care as we treat your finances. You can expect us to listen without judgment, guide with integrity, and walk beside you through every season of your life with clarity and reassurance."
       - "We promise that every cup you pour will be a moment of pause in your busy day. We guarantee ethical sourcing that respects the farmer, and a roasting craft that delivers consistency, warmth, and inspiration in every sip."
    
    --- INSTRUCTIONS PER SECTION ---

    1. BUSINESS DETAILS:
       - Company Name: Use "${companyName}" exactly.
       - Website URL: Use "${websiteUrl}" exactly. Do not change it.
       - Physical Address: SEARCH the Web Context for a real street address. If none found, write "Remote / Not Listed".
       - Industry/Niche: Be specific (e.g., "Managed Cybersecurity for Private Healthcare Practices").

    2. BRAND CORE (The Soul):
       - Mission Statement: MUST explicitly answer: 1. Why? 2. Who? 3. How? BUT MUST be written in the "Longer, Warmer, Inspiring" style of the Examples above. Use "We" perspective. Avoid cold corporate brevity.
       - Vision Statement: Must be FUTURE-ORIENTED (5-10 years). Use phrases like "We envision a world...", "We see a future where...". MIMIC the length and warmth of the Examples.
       - Brand Promise: A NON-NEGOTIABLE commitment. Use "We promise...", "We guarantee...". Make it personal and emotional like the Examples.
       - Origin Story: Dramatize the "Home Run" story into a legendary founding moment.

    3. VISUAL IDENTITY:
       - LOOK for "DETECTED_COLORS" and "DETECTED_FONTS" in the Web Context.
       - COLORS: Use the most frequent/relevant colors found for Primary/Secondary/Accent. Ensure contrast.
       - FONTS: Use the detected fonts for "typography.header" and "typography.body". 
         - If multiple fonts found, assign the most bold/distinctive to Header and the most readable to Body.
         - If "DETECTED_FONTS" is empty, suggest Google Fonts based on "Vibe".

    4. AUDIENCE (The Avatar):
       - Name the avatar (e.g. "Stressed Susan").
       - Miseries: Infer 3 specific points of pain/fear from the inputs.
       - Psychographics: Deep internal beliefs and identity triggers.

    5. VOICE:
       - Reading Level: Match the industry (e.g. Grade 12 for Medical, Grade 5 for DTC).
       - Forbidden Words: STRICTLY respect "${antiStyle}".

    6. COMPETITORS:
       - SEARCH YOUR INTERNAL KNOWLEDGE for REAL companies in this specific Niche/Location.
       - Do NOT invent "Competitor A". Use REAL names if possible (e.g. "GeekSquad", "Local MSPs").
       - If you can't find specific local ones, list TOP NATIONAL PLAYERS in this space.

    7. CONTENT:
       - Create 4 Distinct Content Pillars (Themes).
       - Suggest a Platform Mix suitable for the avatar.

    8. STRATEGY (USP):
       - Define the "Market Gap".
       - Fill the "Value Equation".

    --- OUTPUT FORMAT ---
    Return ONLY a valid JSON object matching the BrandDnaSchema structure.
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
        "emoji_usage": "string",
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
