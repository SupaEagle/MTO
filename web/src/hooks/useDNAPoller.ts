import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';

export function useDNAPoller(subAccountId: string | null, isProcessing: boolean) {
    const [status, setStatus] = useState<'idle' | 'processing' | 'complete' | 'failed'>('idle');
    const [progress, setProgress] = useState(0); // For the progress bar
    const navigate = useNavigate();

    // Use a ref to stop polling if component unmounts
    // Using 'any' for timeout type to avoid NodeJS namespace issues in browser environment
    const pollingRef = useRef<any>(null);

    useEffect(() => {
        if (!isProcessing || !subAccountId) return;

        setStatus('processing');

        const poll = async () => {
            try {
                // Use our API client which handles auth headers
                // Assuming the endpoint is /api/wizard/results?subAccountId=...
                // Note: API.get returns the parsed JSON body
                const data = await API.get(`/api/wizard/results?subAccountId=${subAccountId}`);

                if (data.status === 'complete') {
                    setStatus('complete');
                    setProgress(100);
                    if (pollingRef.current) clearInterval(pollingRef.current);

                    // Wait 1s for user to see "100%" then redirect
                    // TODO: Ensure this route exists or update to correct specific dashboard path
                    setTimeout(() => navigate('/client/dna'), 1000);
                } else {
                    // Fake progress bump to keep user engaged (up to 95%)
                    setProgress((prev) => {
                        if (prev >= 95) return prev;
                        // Increment by smaller amounts as we get closer to 95
                        const increment = prev > 80 ? 1 : 5;
                        return prev + increment;
                    });
                }
            } catch (error) {
                console.error("Polling failed", error);
                // Don't fail immediately on one network blip, just retry next tick
            }
        };

        // Poll every 2 seconds
        pollingRef.current = setInterval(poll, 2000);

        return () => {
            if (pollingRef.current) clearInterval(pollingRef.current);
        };
    }, [isProcessing, subAccountId, navigate]);

    return { status, progress };
}
