
import { db } from '../lib/db';

async function checkData() {
    console.log('🔍 Checking latest Brand DNA...');

    try {
        const client = await db.connect();
        const res = await client.query(`
            SELECT id, sub_account_id, last_updated_at,
                   identity_data, brand_core, competitor_recon, narrative, strategic_differentiation,
                   visual_identity
            FROM brand_dna 
            ORDER BY last_updated_at DESC 
            LIMIT 1
        `);

        if (res.rows.length === 0) {
            console.log('❌ No records found.');
        } else {
            console.log('✅ Record Found:', JSON.stringify(res.rows[0], null, 2));
        }

        client.release();
        process.exit(0);
    } catch (err) {
        console.error('❌ Failed:', err);
        process.exit(1);
    }
}

checkData();
