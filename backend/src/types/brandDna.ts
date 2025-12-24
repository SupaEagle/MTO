export interface BrandDnaSchema {
    // Section 1: Core Identity & Basics
    business_details: {
        company_name: string;
        website_url: string;
        industry_niche: string;
        physical_address: string;
    };
    visual_identity: {
        primary_color: string;
        secondary_color: string;
        accent_color: string;
        typography: { header: string; body: string };
    };
    brand_core: {
        mission_statement: string;
        vision_statement: string;
        brand_promise: string;
    };
    narrative: {
        founder_name: string;
        origin_story: string; // The "Legend" version
    };

    // Section 2: Audience Definition
    audience_definition: {
        avatar_name: string; // e.g. "Stressed Susan"
        market_description: string;
        demographics: string;
        psychographics: string; // Values & Beliefs
        misery_map: {
            fear: string;    // Misery 1
            pain: string;    // Misery 2
            problem: string; // Misery 3
        };
        miracle: string; // The Dream Outcome
    };

    // Section 3: AI Voice Calibration
    voice_calibration: {
        persona_type: string; // e.g. "The Sage"
        reading_level: string; // e.g. "Grade 8"
        forbidden_words: string[];
        required_terminology: string[];
        emoji_usage: "Heavy" | "Moderate" | "None";
        hook_style: string;
    };

    // Section 4: Competitor Recon
    competitors: {
        primary_competitors: Array<{ name: string; url: string; }>; // Top 3
        additional_players: string[];
    };

    // Section 5: Content Pillars & Mix
    content_strategy: {
        pillars: [string, string, string, string]; // 4 Core Themes
        posting_frequency: string;
        platform_mix: string; // e.g. "LinkedIn 80%, X 20%"
        topics: {
            trend_jacking: string[];
            evergreen: string[];
        };
    };

    // Section 6: Strategic Differentiation (USP)
    strategy_usp: {
        unique_selling_proposition: string;
        market_gap: string;
        value_equation: {
            dream_outcome: string;
            likelihood: string;
            time_delay: string;
            effort_sacrifice: string;
        };
        pricing_strategy: string;
    };
}
