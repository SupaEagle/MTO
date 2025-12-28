import { z } from 'zod';

export const BrandDnaSchema = z.object({
    // Section 1: Core Identity
    core: z.object({
        company_name: z.string(),
        website_url: z.string(),
        industry: z.string(),
        physical_address: z.string().describe("Scraped from footer or 'Remote'"),
        mission: z.string(),
        vision: z.string(),
        brand_promise: z.string(),
        narrative: z.object({
            founder_name: z.string(),
            origin_story: z.string().describe("The 'Hero vs Villain' story"),
        })
    }),

    // Section 2: Audience
    audience: z.object({
        avatar_name: z.string(), // e.g. "Stressed Sarah"
        demographics: z.string(),
        psychographics: z.string(),
        misery_map: z.object({
            fear: z.string(),   // Misery 1
            pain: z.string(),   // Misery 2
            problem: z.string() // Misery 3
        }),
        miracle: z.string().describe("The specific Dream Outcome")
    }),

    // Section 3: Voice
    voice: z.object({
        persona_type: z.string(), // e.g. "The Sage"
        reading_level: z.string(), // e.g. "Grade 8"
        forbidden_words: z.array(z.string()),
        hook_style: z.string(),
        emoji_usage: z.enum(['Heavy', 'Moderate', 'Minimal'])
    }),

    // Section 4: Competitors
    competitors: z.array(z.object({
        name: z.string(),
        url: z.string(),
        weakness: z.string().describe("The gap we exploit")
    })).min(3).describe("Exactly 3 competitors"),

    // Section 5: Content
    content: z.object({
        pillars: z.array(z.string()).min(4).describe("At least 4 content pillars"),
        posting_frequency: z.string(),
        platform_mix: z.string()
    }),

    // Section 6: Strategy (USP)
    strategy: z.object({
        usp: z.string(),
        market_gap: z.string(),
        value_equation: z.object({
            dream_outcome: z.string(),
            time_delay: z.string(),
            effort_sacrifice: z.string()
        })
    }),

    // Adding visual_identity as it's used in frontend and DB, even if implicitly part of "Strategist" output
    visual_identity: z.object({
        primary_color: z.string(),
        secondary_color: z.string(),
        accent_color: z.string(),
        typography: z.object({
            header: z.string(),
            body: z.string()
        })
    }).optional()
});

export type BrandDna = z.infer<typeof BrandDnaSchema>;
