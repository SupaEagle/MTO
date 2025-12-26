
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function inspectData() {
    try {
        console.log("Fetching ALL sub_accounts...");
        const accounts = await pool.query('SELECT id, name FROM sub_accounts');
        console.table(accounts.rows);

        for (const account of accounts.rows) {
            const id = account.id;
            console.log(`\nChecking DNA for account: ${id} (${account.name})`);

            const dna = await pool.query(`
                SELECT id, identity_data, core_identity, visual_identity, competitor_intel
                FROM brand_dna 
                WHERE sub_account_id = $1
            `, [id]);

            if (dna.rows.length === 0) {
                console.log("❌ No Brand DNA record found.");
            } else {
                const row = dna.rows[0];
                const hasIdentity = row.identity_data && Object.keys(row.identity_data).length > 0;
                const hasCore = row.core_identity && Object.keys(row.core_identity).length > 0;
                console.log(`✅ Brand DNA record exists.`);
                console.log(`   Has Identity Data: ${hasIdentity}`);
                console.log(`   Has Core Identity: ${hasCore}`);
                if (row.identity_data) {
                    console.log(`   Company Name: ${row.identity_data.company_name}`);
                    console.log(`   Website: ${row.identity_data.website_url}`);
                    console.log(`   Address: ${row.identity_data.physical_address}`);
                }

                if (row.visual_identity) {
                    console.log(`   Primary Color: ${row.visual_identity.primary_color}`);
                    console.log(`   Secondary Color: ${row.visual_identity.secondary_color}`);
                    console.log(`   Accent Color: ${row.visual_identity.accent_color}`);
                    console.log(`   Typography:`, JSON.stringify(row.visual_identity.typography, null, 2));
                }

                if (row.core_identity) {
                    console.log(`   Mission: ${row.core_identity.mission_statement}`);
                    console.log(`   Vision: ${row.core_identity.vision_statement}`);
                    console.log(`   Brand Promise: ${row.core_identity.brand_promise}`);
                }

                if (row.competitor_intel) {
                    console.log(`   Competitors:`, JSON.stringify(row.competitor_intel.primary_competitors, null, 2));
                }
            }
        }

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}

inspectData();
