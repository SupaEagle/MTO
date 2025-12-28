
import { db } from '../lib/db';

async function findKeenPlex() {
    try {
        const res = await db.query(`SELECT id, name, created_at FROM sub_accounts WHERE name ILIKE '%KeenPlex%'`);
        console.table(res.rows);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

findKeenPlex();
