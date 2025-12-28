import { BaseAgent } from './BaseAgent';
import { VertexAI } from '@google-cloud/vertexai';

// Agent 1: Core Identity & Basics
export class CoreIdentityAgent extends BaseAgent {
  constructor() {
    super(`
      ROLE: Brand Founder & Visionary.
      TASK: Define the foundational 'Brand Core' based on user inputs.
      OUTPUT SCHEMA: { company_name, website_url, industry_niche, physical_address, visual_identity: { primary_color, secondary_color, accent_color, typography: { header, body } }, brand_core: { mission_statement, vision_statement, brand_promise }, narrative: { founder_name, origin_story } }
    `);
  }

  async execute(inputs: any) {
    return this.run(`
      INPUTS:
      - Name: ${inputs.companyName}
      - Vibe: ${inputs.vibe}
      - Success Story: ${inputs.successStory} (Use this for Origin Story)
      
      INSTRUCTIONS:
      1. Write a 'Fortune 500' style Mission Statement.
      2. Suggest Hex Codes for Primary/Secondary/Accent colors based on '${inputs.vibe}'.
      3. Suggest Google Font pairings (one for Header, one for Body).
      4. Craft an Origin Story where the founder defeats a 'Villain' based on the success story.
    `);
  }
}

// Agent 2: Audience Definition
export class AudienceAgent extends BaseAgent {
  constructor() {
    super(`
      ROLE: Consumer Psychologist.
      TASK: Profile the 'Ideal Client Avatar'.
      OUTPUT SCHEMA: { avatar_name, market_description, demographics, psychographics, misery_map: { fear, pain, problem }, miracle }
    `);
  }

  async execute(inputs: any) {
    return this.run(`
      Analyze this story: "${inputs.successStory}"
      
      1. Who is the hero? Name them (e.g. 'Stressed Sarah').
      2. Extract the 3 layers of misery:
         - External Problem (What happened?)
         - Internal Pain (How did they feel?)
         - Philosophical Fear (Why is it wrong?)
      3. Define the 'Miracle' (The perfect outcome).
    `);
  }
}

// Agent 3: AI Voice Calibration
export class VoiceAgent extends BaseAgent {
  constructor() {
    super(`
      ROLE: Copywriting Chief.
      TASK: Define the Brand Voice guidelines.
      OUTPUT SCHEMA: { persona_type, reading_level, forbidden_words: string[], required_terminology: string[], emoji_usage: string, hook_style: string }
    `);
  }

  async execute(inputs: any) {
    return this.run(`
      Vibe: ${inputs.vibe}
      Anti-Strategy (What they hate): ${inputs.antiStrategy}

      1. If they hate "${inputs.antiStrategy}", list 5 "Forbidden Words" they should never use.
      2. Define a Persona Type (e.g. "The Sage", "The Rebel") matching "${inputs.vibe}".
      3. Define reading level and emoji usage.
    `);
  }
}

// Agent 4: Competitor Recon (The Special Agent with Grounding)
export class CompetitorAgent {
  private model: any;

  constructor() {
    const vertexAI = new VertexAI({ project: 'mansa-tina-ops', location: 'us-central1' });
    this.model = vertexAI.preview.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      tools: [{ google_search: {} } as any] // <--- ENABLE SEARCH (Note: uses snake_case in this SDK version)
    });
  }

  async execute(inputs: any) {
    const prompt = `
      Find 3 real competitors for a "${inputs.industry || 'specified industry'}" company named "${inputs.companyName}".
      For each, find: Name, Website URL, and 1 Weakness (check reviews).
      Return as JSON: { primary_competitors: [{name, url, weakness}], additional_players: string[] }
    `;

    try {
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      });
      const text = result.response.candidates[0].content.parts[0].text;
      if (!text) throw new Error("No output generated");
      return JSON.parse(text.replace(/```json|```/g, '').trim());
    } catch (error) {
      console.error("Competitor Agent Failure:", error);
      return { competitors: [] };
    }
  }
}

// Agent 5: Content Pillars & Mix
export class ContentAgent extends BaseAgent {
  constructor() {
    super(`      ROLE: Social Media Strategist. Output JSON: { pillars: string[], platform_mix, posting_frequency, topics: { trend_jacking: string[], evergreen: string[] } }
`);
  }

  async execute(inputs: any) {
    return this.run(`
      Goal: ${inputs.goal}
      Industry: ${inputs.industry}
      
      1. Create 4 Content Pillars (Themes) that lead to the goal.
      2. Suggest a Platform Mix (e.g. LinkedIn vs TikTok) based on the industry.
      3. Suggest posting frequency.
    `);
  }
}

// Agent 6: Strategic Differentiation
export class StrategyAgent extends BaseAgent {
  constructor() {
    super(`      ROLE: Business Strategist. Output JSON: { unique_selling_proposition, market_gap, value_equation: { dream_outcome, likelihood, time_delay, effort_sacrifice }, pricing_strategy }
`);
  }

  async execute(inputs: any) {
    return this.run(`
      Anti-Strategy: ${inputs.antiStrategy}
      Success Story: ${inputs.successStory}
      
      1. Define the 'Market Gap': What is everyone else doing (Anti-Strategy) that this brand refuses to do?
      2. Write a 1-sentence USP.
      3. Define the Value Equation.
    `);
  }
}
