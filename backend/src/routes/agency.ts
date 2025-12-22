import express, { Request, Response } from 'express';
import { db } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Mock email sender for now
const sendInviteEmail = async (email: string, data: any) => {
    console.log(`[MOCK EMAIL] Sending invite to ${email} with data:`, data);
    return true;
};

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

        // A. Create Sub-Account (Tenant)
        const tenantId = uuidv4();
        await client.query(
            `INSERT INTO sub_accounts (id, parent_agency_id, name, tier, website, address, primary_contact, status) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, 'active')`,
            [tenantId, agencyId, companyName, tier, website, address, primaryContact]
        );

        // B. Create Empty Brand DNA Record (Ready for Wizard)
        await client.query(
            `INSERT INTO brand_dna (sub_account_id) VALUES ($1)`,
            [tenantId]
        );

        // C. Create the Admin User for this Client
        const tempPassword = uuidv4().slice(0, 8); // Or generate Magic Link token
        await client.query(
            `INSERT INTO users (sub_account_id, email, role, password_hash) 
             VALUES ($1, $2, 'admin', $3)`,
            [tenantId, email, 'temp_hash_placeholder']
        );

        await client.query('COMMIT');

        // D. Send Invite (Async)
        // Don't await this if you want speed, but good for error checking
        await sendInviteEmail(email, {
            link: `https://app.mansatina.io/invite?token=${tempPassword}`,
            agencyName: "Mansa Tina Agency" // Fetch this dynamically
        });

        return res.json({ success: true, message: "Client onboarded", tenantId });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Failed to create client:", error);
        return res.status(500).json({ error: "Failed to create client" });
    } finally {
        client.release();
    }
});

export default router;
