
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function patchUrl() {
    try {
        const id = 'f19d4043-5e4e-46cb-bb82-3b767d6e44f8';
        console.log(`Patching URL for client: ${id}`);

        await pool.query(`
            UPDATE brand_dna 
            SET identity_data = jsonb_set(identity_data, '{website_url}', '"https://www.keenplextechnologies.com/"')
            WHERE sub_account_id = $1
        `, [id]);

        console.log("✅ URL updated successfully.");

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}

patchUrl();
