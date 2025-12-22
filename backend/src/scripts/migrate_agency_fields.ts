import { db } from '../lib/db';

async function migrateAgencyTables() {
    try {
        console.log('Migrating Agency Tables...');

        await db.query(`
            ALTER TABLE sub_accounts 
            ADD COLUMN IF NOT EXISTS website VARCHAR(255),
            ADD COLUMN IF NOT EXISTS address TEXT,
            ADD COLUMN IF NOT EXISTS primary_contact VARCHAR(255);
        `);
        console.log('Added website, address, primary_contact to sub_accounts.');

        console.log('Migration Complete.');
        process.exit(0);
    } catch (error) {
        console.error('Error migrating tables:', error);
        process.exit(1);
    }
}

migrateAgencyTables();
