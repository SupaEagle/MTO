
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function migrate() {
    try {
        console.log("Starting schema alignment migration...");

        // 1. Rename existing columns to match new spec
        // Handle potential existence of both if user ran scripts multiple times

        await pool.query(`
            ALTER TABLE brand_dna 
            RENAME COLUMN audience_definition TO audience_persona;
        `).catch(e => console.log("Audience rename skipped or failed:", e.message));

        await pool.query(`
            ALTER TABLE brand_dna 
            RENAME COLUMN competitor_analysis TO competitor_intel;
        `).catch(e => console.log("Competitor rename skipped or failed:", e.message));

        await pool.query(`
            ALTER TABLE brand_dna 
            RENAME COLUMN voice_profile TO voice_guide;
        `).catch(e => console.log("Voice rename skipped or failed:", e.message));

        await pool.query(`
            ALTER TABLE brand_dna 
            RENAME COLUMN content_strategy TO content_matrix;
        `).catch(e => console.log("Content Matrix rename skipped or failed:", e.message));


        // 2. Add missing columns if they don't exist (safety check)
        await pool.query(`
            ALTER TABLE brand_dna 
            ADD COLUMN IF NOT EXISTS core_identity JSONB DEFAULT '{}',
            ADD COLUMN IF NOT EXISTS audience_persona JSONB DEFAULT '{}',
            ADD COLUMN IF NOT EXISTS competitor_intel JSONB DEFAULT '{}',
            ADD COLUMN IF NOT EXISTS voice_guide JSONB DEFAULT '{}',
            ADD COLUMN IF NOT EXISTS content_matrix JSONB DEFAULT '{}';
        `);

        console.log("✅ Schema alignment complete.");
    } catch (e) {
        console.error("Migration failed:", e);
    } finally {
        await pool.end();
    }
}

migrate();
