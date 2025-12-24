
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function check() {
    try {
        const id = '550e8400-e29b-41d4-a716-446655440001';
        const res = await pool.query('SELECT * FROM sub_accounts WHERE id = $1', [id]);
        console.log(`Checking ${id}: Found ${res.rows.length} rows.`);
        if (res.rows.length > 0) console.log(res.rows[0]);

        const dummy = '00000000-0000-0000-0000-000000000000';
        const res2 = await pool.query('SELECT * FROM sub_accounts WHERE id = $1', [dummy]);
        console.log(`Checking ${dummy}: Found ${res2.rows.length} rows.`);

    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}

check();
