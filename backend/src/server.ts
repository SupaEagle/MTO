import express from 'express';
import cors from 'cors';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { authenticate } from './middleware/auth';

dotenv.config();

// Initialize Firebase Admin
// In production, this will use Google Application Default Credentials automatically.
// For local dev, ensure you have GOOGLE_APPLICATION_CREDENTIALS set or use a service account key.
if (process.env.NODE_ENV === 'development') {
    const serviceAccount = require('../service-account-key.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} else {
    admin.initializeApp();
}


import strategyRoutes from './routes/strategy';
import contentRoutes from './routes/content';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: true }));
app.use(express.json());

// Public Route (Health Check)
app.get('/', (req, res) => {
    res.send('Mansa Tina Backend Service (Cloud Run) - Active');
});

// Protected Routes
app.use('/api/strategy', strategyRoutes);
app.use('/api/content', contentRoutes);

// Auth Check Example
app.get('/api/me', authenticate, (req: any, res) => {
    res.json({
        message: 'You are authenticated!',
        uid: req.user.uid,
        email: req.user.email
    });
});

import { checkDatabaseConnection } from './lib/db';

// Start Server
app.listen(PORT, async () => {
    console.log(`Backend service listening on port ${PORT}`);
    await checkDatabaseConnection();
});
