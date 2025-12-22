
import { db } from '../lib/db';

async function migrate() {
    const client = await db.connect();
    try {
        await client.query('BEGIN');

        console.log("Migrating brand_dna table...");

        // 1. Add new columns if they don't exist
        await client.query(`
            ALTER TABLE brand_dna 
            ADD COLUMN IF NOT EXISTS website_url TEXT,
            ADD COLUMN IF NOT EXISTS core_identity JSONB DEFAULT '{}',
            ADD COLUMN IF NOT EXISTS audience_definition JSONB DEFAULT '{}',
            ADD COLUMN IF NOT EXISTS strategic_differentiation JSONB DEFAULT '{}',
            ADD COLUMN IF NOT EXISTS voice_profile JSONB DEFAULT '{}',
            ADD COLUMN IF NOT EXISTS content_strategy JSONB DEFAULT '{}';
        `);

        // 2. Ensure last_updated_at exists (it likely does, but safe to check/add)
        await client.query(`
            ALTER TABLE brand_dna 
            ADD COLUMN IF NOT EXISTS last_updated_at TIMESTAMP DEFAULT NOW();
        `);

        await client.query('COMMIT');
        console.log("Migration complete: brand_dna schema updated.");
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Migration failed:", error);
    } finally {
        client.release();
        process.exit();
    }
}

migrate();
