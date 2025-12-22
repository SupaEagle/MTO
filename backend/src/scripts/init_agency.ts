import { db } from '../lib/db';

async function initAgencyTables() {
    try {
        console.log('Initializing Agency Tables...');

        // 1. Ensure sub_accounts table exists (might already exist from previous steps)
        await db.query(`
            CREATE TABLE IF NOT EXISTS sub_accounts (
                id UUID PRIMARY KEY,
                parent_agency_id VARCHAR(255),
                name VARCHAR(255) NOT NULL,
                tier VARCHAR(50),
                status VARCHAR(50) DEFAULT 'active',
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log('Verified sub_accounts table.');

        // 2. Ensure brand_dna table exists (might already exist)
        // Note: checking minimal columns required for the wizard to work if it was created differently before
        await db.query(`
            CREATE TABLE IF NOT EXISTS brand_dna (
                id SERIAL PRIMARY KEY,
                sub_account_id UUID REFERENCES sub_accounts(id),
                identity_data JSONB,
                voice_profile JSONB,
                audience_personas JSONB,
                strategic_differentiation JSONB,
                usps JSONB,
                content_mix JSONB,
                competitor_analysis JSONB,
                embedding VECTOR(768),
                last_updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log('Verified brand_dna table.');

        // 3. Create users table (New requirement)
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                sub_account_id UUID REFERENCES sub_accounts(id),
                email VARCHAR(255) UNIQUE NOT NULL,
                role VARCHAR(50) NOT NULL, -- 'admin', 'editor', 'viewer'
                password_hash VARCHAR(255),
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log('Verified users table.');

        console.log('Agency Tables Initialization Complete.');
        process.exit(0);
    } catch (error) {
        console.error('Error initializing tables:', error);
        process.exit(1);
    }
}

initAgencyTables();
