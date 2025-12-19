import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, async (req: Request, res: Response) => {
    try {
        const { businessName, industry, goals } = req.body;

        // Mock Logic (migrated from Cloud Functions)
        // In reality, this would call OpenAI/Anthropic
        const strategy = {
            pillars: ["Education", "Behind the Scenes", "Social Proof"],
            recommendedPlatforms: ["LinkedIn", "Instagram"],
            summary: `Strategy generated for ${businessName} in ${industry}. Focusing on ${goals}.`
        };

        res.json({ strategy });
    } catch (error) {
        console.error('Error generating strategy:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
