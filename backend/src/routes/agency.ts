import express, { Request, Response } from 'express';
import { db } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Mock email sender for now
const sendInviteEmail = async (email: string, data: any) => {
    console.log(`[MOCK EMAIL] Sending invite to ${email} with data:`, data);
    return true;
};

// GET /clients - List all clients (for GlobalClientSelector)
router.get('/clients', async (req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT id, name FROM sub_accounts ORDER BY created_at DESC');
        return res.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch clients:", error);
        return res.status(500).json({ error: "Failed to fetch clients" });
    }
});

// DELETE /clients/:id - Remove a client and all associated data
router.delete('/clients/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        // Delete Brand DNA first (FK constraint usually handles this if ON DELETE CASCADE, but being safe)
        await client.query('DELETE FROM brand_dna WHERE sub_account_id = $1', [id]);

        // Delete Sub Account
        const result = await client.query('DELETE FROM sub_accounts WHERE id = $1 RETURNING id', [id]);

        if (result.rowCount === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: "Client not found" });
        }

        await client.query('COMMIT');
        return res.json({ success: true, message: "Client deleted successfully" });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Failed to delete client:", error);
        return res.status(500).json({ error: "Failed to delete client" });
    } finally {
        client.release();
    }
});

// POST /clients - Boards a new client/tenant
router.post('/clients', async (req: Request, res: Response) => {
    // 1. Verify Agency Auth (Middleware usually handles this)
    const agencyId = req.headers['x-agency-id'] || 'mock-agency-id';

    const { companyName, email, tier, website, address, primaryContact } = req.body;

    if (!companyName || !email || !tier) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const client = await db.connect();

    try {
        // 2. Transaction: Create Tenant + User + Settings
        await client.query('BEGIN');

        // A. Create Sub-Account (Tenant) - simplified for "Lean" schema
        const tenantId = uuidv4();
        await client.query(
            `INSERT INTO sub_accounts (id, name) VALUES ($1, $2)`,
            [tenantId, companyName]
        );

        // B. Create Empty Brand DNA Record (Ready for Wizard)
        await client.query(
            `INSERT INTO brand_dna (sub_account_id) VALUES ($1)`,
            [tenantId]
        );

        // C. User creation skipped for now to avoid schema issues in "God Mode"
        // User can be added later or we assume current user is admin.
        const tempPassword = uuidv4().slice(0, 8); // Still generate for invite link

        await client.query('COMMIT');

        // D. Send Invite (Async)
        // Don't await this if you want speed, but good for error checking
        await sendInviteEmail(email, {
            link: `https://app.mansatina.io/invite?token=${tempPassword}`,
            agencyName: "Mansa Tina Agency" // Fetch this dynamically
        });

        return res.json({
            success: true,
            message: "Client onboarded",
            redirectUrl: `/discovery?client_id=${tenantId}`,
            subAccountId: tenantId
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Failed to create client:", error);
        return res.status(500).json({ error: "Failed to create client" });
    } finally {
        client.release();
    }
});

export default router;
