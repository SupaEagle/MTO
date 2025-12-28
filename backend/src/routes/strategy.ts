import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

import { db } from '../lib/db';

router.get('/:subAccountId', authenticate, async (req: Request, res: Response) => {
    try {
        const { subAccountId } = req.params;

        const query = `

            SELECT id, identity_data, brand_core, visual_identity, narrative, competitor_recon, strategic_differentiation, audience_definition, voice_calibration, content_strategy, last_updated_at
            FROM brand_dna
            WHERE sub_account_id = $1
            ORDER BY last_updated_at DESC
            LIMIT 1;
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
