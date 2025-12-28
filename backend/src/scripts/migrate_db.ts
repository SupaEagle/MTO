
import { db } from '../lib/db';

async function migrate() {
    console.log('🔄 Starting Migration: Adding Agentic Columns...');

    const queries = [
        'ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS competitor_recon JSONB;',
        'ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS strategic_differentiation JSONB;',
        'ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS narrative JSONB;',
        'ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS brand_core JSONB;',
        'ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS visual_identity JSONB;',
        'ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS audience_definition JSONB;',
        'ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS voice_calibration JSONB;',
        'ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS content_strategy JSONB;'
    ];

    try {
        const client = await db.connect();
        for (const query of queries) {
            console.log(`Executing: ${query}`);
            await client.query(query);
        }
        client.release();
        console.log('✅ Migration Complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Migration Failed:', err);
        process.exit(1);
    }
}

migrate();
