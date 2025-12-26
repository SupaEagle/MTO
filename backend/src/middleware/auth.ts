import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];

    // Development / Mock Bypass
    if (token === 'mock-token' || token === 'null' || !token) {
        console.log("[AUTH] Using Mock Token Bypass");
        (req as any).user = { uid: 'mock-user', email: 'dev@mansatina.io' };
        return next();
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        (req as any).user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};
