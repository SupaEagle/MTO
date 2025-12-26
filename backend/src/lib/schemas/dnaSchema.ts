import { z } from 'zod';

export const BrandDnaSchema = z.object({
    business_details: z.object({
        company_name: z.string(),
        website_url: z.string(),
        physical_address: z.string().describe("Extracted from footer or contact page"),
        industry_niche: z.string(),
    }),
    visual_identity: z.object({
        primary_color: z.string().describe("Hex code"),
        secondary_color: z.string(),
        accent_color: z.string(),
        typography: z.object({
            header: z.string(),
            body: z.string()
        }),
    }),
    brand_core: z.object({
        mission_statement: z.string().describe("Why/Who/How. Warm, inspiring tone."),
        vision_statement: z.string().describe("Future-oriented outcome."),
        brand_promise: z.string().describe("Non-negotiable commitment."),
    }),
    narrative: z.object({
        origin_story: z.string().describe("2-paragraph legend based on success story"),
        founder_name: z.string().optional(),
    }),
    audience_definition: z.object({
        avatar_name: z.string(),
        market_description: z.string(),
        demographics: z.string(),
        psychographics: z.string(),
        misery_map: z.object({
            fear: z.string(),
            pain: z.string(),
            problem: z.string(),
        }),
        miracle: z.string(),
    }),
    voice_calibration: z.object({
        persona_type: z.string(),
        reading_level: z.string(),
        forbidden_words: z.array(z.string()),
        required_terminology: z.array(z.string()),
        emoji_usage: z.string(),
        hook_style: z.string(),
    }),
    competitor_recon: z.object({
        primary_competitors: z.array(z.object({
            name: z.string(),
            url: z.string(),
            weakness: z.string().describe("Major customer complaint or weakness"),
            strengths: z.string().optional(),
        })).describe("Top 3 direct competitors found via search"),
        additional_players: z.array(z.string()),
    }),
    content_strategy: z.object({
        pillars: z.array(z.string()),
        posting_frequency: z.string(),
        platform_mix: z.string(),
        topics: z.object({
            trend_jacking: z.array(z.string()),
            evergreen: z.array(z.string()),
        }),
    }),
    strategic_differentiation: z.object({
        unique_selling_proposition: z.string(),
        market_gap: z.string().describe("What they do that competitors don't"),
        value_equation: z.object({
            dream_outcome: z.string(),
            likelihood: z.string(),
            time_delay: z.string(),
            effort_sacrifice: z.string(),
        }),
        pricing_strategy: z.string(),
    }),
});

export type BrandDna = z.infer<typeof BrandDnaSchema>;
