export interface BrandDnaSchema {
    core_identity: {
        mission_statement: string;
        vision_statement: string;
        brand_values: string[]; // e.g., ["Integrity", "Speed"]
        brand_archetype: string; // e.g., "The Hero", "The Sage"
    };
    voice_profile: {
        tone_adjectives: string[]; // e.g., "Witty", "Authoritative"
        reading_level: string; // e.g., "Grade 8"
        do_not_say: string[]; // List of forbidden words
        emoji_usage: "Heavy" | "Moderate" | "None";
    };
    audience_definition: {
        primary_persona: {
            name: string; // e.g., "Stressed Sarah"
            demographics: string;
            psychographics: string;
            pain_points: string[];
            desires: string[];
        };
    };
    strategic_differentiation: {
        unique_value_proposition: string;
        competitor_gap: string; // What are competitors doing wrong?
    };
}
