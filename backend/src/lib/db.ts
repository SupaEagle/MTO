import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

// Note: In a real Cloud Run environment with Cloud SQL Auth Proxy, 
// socketPath is often used. For TCP (public IP), host/port are used.
// We'll support both via env vars.

const poolConfig: any = {
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'mansa_main',
};

if (process.env.INSTANCE_CONNECTION_NAME) {
    // Cloud SQL Connector logic (Unix socket)
    poolConfig.host = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
} else {
    // TCP logic (Localhost or IP)
    poolConfig.host = process.env.DB_HOST || '127.0.0.1';
    poolConfig.port = parseInt(process.env.DB_PORT || '5432');
}

export const db = new Pool(poolConfig);

// Test connection helper
export const checkDatabaseConnection = async () => {
    try {
        const client = await db.connect();
        const res = await client.query('SELECT NOW()');
        client.release();
        console.log('Database connected successfully:', res.rows[0]);
        return true;
    } catch (err) {
        console.error('Database connection failed:', err);
        return false;
    }
};
