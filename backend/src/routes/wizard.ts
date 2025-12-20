import { Router, Request, Response } from 'express';
import { PubSub } from '@google-cloud/pubsub';
import { authenticate } from '../middleware/auth';
import { db } from '../lib/db';

const router = Router();
const pubsub = new PubSub();
const TOPIC_NAME = 'brand-dna-analysis-tasks';

router.post('/submit', authenticate, async (req: Request, res: Response) => {
    try {
        const { rawAnswers, subAccountId } = req.body;
        const userId = (req as any).user.uid;

        // 1. Basic Validation
        if (!rawAnswers || !subAccountId) {
            return res.status(400).json({ error: 'Missing rawAnswers or subAccountId' });
        }

        // 2. Publish to Pub/Sub (Async Analysis)
        const dataBuffer = Buffer.from(JSON.stringify({
            userId,
            subAccountId,
            rawAnswers,
            timestamp: new Date().toISOString()
        }));

        const messageId = await pubsub.topic(TOPIC_NAME).publishMessage({ data: dataBuffer });

        console.log(`Job queued with Message ID: ${messageId}`);

        res.json({
            status: 'analyzing',
            jobId: messageId,
            message: 'Brand DNA analysis initiated. processing in background.'
        });

    } catch (error) {
        console.error('Error submitting wizard data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/results', authenticate, async (req: Request, res: Response) => {
    try {
        const subAccountId = req.query.subAccountId as string;

        if (!subAccountId) {
            return res.status(400).json({ error: 'Missing subAccountId' });
        }

        const query = `
            SELECT id, identity_data, voice_profile, audience_personas, usps, content_mix, last_updated_at 
            FROM brand_dna 
            WHERE sub_account_id = $1 
            ORDER BY last_updated_at DESC 
            LIMIT 1;
        `;

        const result = await db.query(query, [subAccountId]);

        if (result.rows.length === 0) {
            return res.json({ status: 'processing', data: null });
        }

        res.json({ status: 'complete', data: result.rows[0] });

    } catch (error) {
        console.error('Error fetching wizard results:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
