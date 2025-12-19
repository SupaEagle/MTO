import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { generateCreativeContent } from '../lib/ai';

const router = Router();

router.post('/', authenticate, async (req: Request, res: Response) => {
    try {
        const { platform, topic, tone, additionalInstructions } = req.body;

        const content = await generateCreativeContent(platform, topic, tone, additionalInstructions);

        res.json({ content });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
