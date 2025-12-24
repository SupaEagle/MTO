import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

import { db } from '../lib/db';

router.get('/:subAccountId', authenticate, async (req: Request, res: Response) => {
    try {
        const { subAccountId } = req.params;

        const query = `
            SELECT 
                identity_data,
                visual_identity,
                core_identity, 
                narrative,
                audience_persona, 
                competitor_intel, 
                voice_guide, 
                content_matrix,
                strategic_differentiation,
                website_url,
                vault_assets
            FROM brand_dna 
            WHERE sub_account_id = $1
        `;

        const result = await db.query(query, [subAccountId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Strategy not found for this client' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching strategy:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
