import { auth } from './firebase';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

export class API {
    private static async getHeaders() {
        if (!auth.currentUser) {
            throw new Error('User not authenticated');
        }
        const token = await auth.currentUser.getIdToken();
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    }

    static async post(endpoint: string, data: any) {
        const headers = await this.getHeaders();
        const response = await fetch(`${BACKEND_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `API Error: ${response.statusText}`);
        }

        return response.json();
    }

    static async get(endpoint: string) {
        const headers = await this.getHeaders();
        const response = await fetch(`${BACKEND_URL}${endpoint}`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }
}
