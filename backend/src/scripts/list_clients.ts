
import { db } from '../lib/db';

async function listClients() {
    try {
        const res = await db.query('SELECT id, name FROM sub_accounts');
        console.table(res.rows);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

listClients();
