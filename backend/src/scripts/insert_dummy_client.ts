
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function run() {
    try {
        const id = '00000000-0000-0000-0000-000000000000';
        // Use UPSERT (ON CONFLICT DO NOTHING) to be safe if run multiple times
        await pool.query(`
            INSERT INTO sub_accounts (id, name) 
            VALUES ($1, 'Demo Client')
            ON CONFLICT (id) DO NOTHING
        `, [id]);
        console.log('✅ Demo Client inserted (or already existed).');
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}

run();
