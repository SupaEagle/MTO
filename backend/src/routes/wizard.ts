import { Router, Request, Response } from 'express';
import { PubSub } from '@google-cloud/pubsub';
import { authenticate } from '../middleware/auth';
import { db } from '../lib/db';
import { startBrandAnalysis } from '../workflows/dnaOrchestrator';

const router = Router();

// POST /submit: Async Agent Dispatch
router.post('/submit', async (req: Request, res: Response) => {
    try {
        const { rawAnswers, subAccountId } = req.body;

        if (!rawAnswers || !subAccountId) {
            return res.status(400).json({ error: 'Missing rawAnswers or subAccountId' });
        }

        // 1. Fetch Official Company Name from DB
        const clientRes = await db.query('SELECT name FROM sub_accounts WHERE id = $1', [subAccountId]);
        const officialName = clientRes.rows[0]?.name || rawAnswers.companyName || 'Unknown Company';

        console.log(`🚀 Dispatching Agents for client ${officialName} (${subAccountId})...`);

        // 2. Dispatch the Agentic Workflow (Fire and Forget)
        startBrandAnalysis(subAccountId, { ...rawAnswers, companyName: officialName })
            .catch(err => console.error("❌ Agent Orchestration Failed in Background:", err));

        // 3. Return immediate response
        res.json({
            status: 'processing',
            message: 'Agents dispatched. Strategy generation in progress.',
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
            SELECT id, identity_data, brand_core, visual_identity, narrative, competitor_recon, strategic_differentiation, audience_definition, voice_calibration, content_strategy, last_updated_at 
            FROM brand_dna 
            WHERE sub_account_id = $1 
            ORDER BY last_updated_at DESC 
            LIMIT 1;
        `;
        // Note: The schema changed above (JSONB columns), so this SELECT might need adjustment if using the old column names.
        // However, for now, let's keep the SELECT as is or update it if the user wants to fetch the new structure.
        // The user didn't explicitly ask for GET update, but it's good practice.
        // Let's assume the frontend might not be ready for the new structure yet, or we'll update it later.

        // Actually, let's update GET to return the new columns if they exist, or at least be safe.
        // For compliance with the specific task "Update API Route", I'll focus on POST.
        // But I should update the SELECT to match the new schema? 
        // Let's just update POST for now to match exactly what was requested.

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


import multer from 'multer';
import { Storage } from '@google-cloud/storage';

// Multer setup for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// GCS Setup
const storage = new Storage({ projectId: 'mansa-tina-ops' });
const bucketName = 'mansa-tina-vault';

// POST /upload: Handle file upload for The Vault
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    // router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    try {
        const file = req.file;
        const { subAccountId } = req.body;

        if (!file || !subAccountId) {
            return res.status(400).json({ error: 'Missing file or subAccountId' });
        }

        console.log(`📂 Uploading ${file.originalname} for ${subAccountId}...`);

        // 1. Prepare File Name
        const sanitizedParams = file.originalname.replace(/\s/g, '_');
        const fileName = `${subAccountId}/${Date.now()}-${sanitizedParams}`;
        const gcsFile = storage.bucket(bucketName).file(fileName);

        // 2. Stream Upload to GCS
        await gcsFile.save(file.buffer, {
            contentType: file.mimetype,
            resumable: false
        });

        // 3. Make Public URL (assuming bucket is public or signed URL needed?)
        // User requested publicUrl manually constructed. 
        // Note: Bucket might need "allUsers: objectViewer" for this to work publicly, 
        // or we use signed URLs. Given the snippet, user expects public access.
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

        // 4. Update Database
        const assetRecord = JSON.stringify({
            name: file.originalname,
            url: publicUrl,
            type: file.mimetype,
            uploaded_at: new Date().toISOString()
        });

        const query = `
            UPDATE brand_dna 
            SET vault_assets = COALESCE(vault_assets, '[]'::jsonb) || $1::jsonb 
            WHERE sub_account_id = $2
            RETURNING vault_assets;
        `;

        const result = await db.query(query, [assetRecord, subAccountId]);

        if (result.rows.length === 0) {
            // In case brand_dna doesn't exist yet (rare in this flow, but possible if skipped steps)
            // We could UPSERT, but usually DNA is created on client creation or first wizard step.
            console.warn(`No brand_dna record found for ${subAccountId}, creating one...`);
            await db.query(`
                INSERT INTO brand_dna (sub_account_id, vault_assets) 
                VALUES ($1, $2::jsonb) 
             `, [subAccountId, `[${assetRecord}]`]);
        }

        console.log('✅ Asset uploaded and saved.');

        res.json({ success: true, url: publicUrl, vault: result.rows[0]?.vault_assets });

    } catch (error) {
        console.error('Upload Failed:', error);
        res.status(500).json({ error: 'Upload failed' });
    }
});

export default router;
