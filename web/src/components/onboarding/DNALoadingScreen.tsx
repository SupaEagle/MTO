import { useState, useEffect } from 'react';

// The "Thought Steps" to mask latency
const LOADING_MESSAGES = [
    "Ingesting raw answers...",
    "Structuring unstructured data...",
    "Applying 'Mansa Magic' to voice calibration...",
    "Identifying high-value audience segments...",
    "Finalizing DNA sequence...",
    "Encrypting strategy data..."
];

export default function DNALoadingScreen() {
    const [messageIndex, setMessageIndex] = useState(0);

    // Cycle through messages every 2.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev < LOADING_MESSAGES.length - 1 ? prev + 1 : prev));
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white">
            {/* 1. The DNA Helix Animation */}
            <div className="relative flex h-32 w-64 items-center justify-between px-4">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="relative flex h-full flex-col justify-between">
                        {/* Top Strand (Primary Color) */}
                        <div
                            className="h-3 w-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                            style={{
                                animation: `helix-top 2s ease-in-out infinite`,
                                animationDelay: `${i * 0.15}s`,
                            }}
                        />
                        {/* Bottom Strand (Secondary Color) */}
                        <div
                            className="h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                            style={{
                                animation: `helix-bottom 2s ease-in-out infinite`,
                                animationDelay: `${i * 0.15}s`,
                            }}
                        />
                    </div>
                ))}

                {/* Connecting Lines (The 'Rungs' of the DNA) - Optional visual flair */}
                <div className="absolute inset-0 flex items-center justify-between px-[1.15rem]">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={`line-${i}`}
                            className="h-full w-[1px] bg-slate-800/30"
                            style={{
                                animation: `helix-bar 2s ease-in-out infinite`,
                                animationDelay: `${i * 0.15}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* 2. The Text Updates */}
            <div className="mt-12 flex flex-col items-center space-y-2">
                <h2 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    SEQUENCING DNA
                </h2>

                <div className="h-6 overflow-hidden">
                    <p className="animate-pulse text-sm font-medium text-slate-400">
                        {`> ${LOADING_MESSAGES[messageIndex]}`}
                    </p>
                </div>
            </div>

            {/* 3. Style Injection for Keyframes */}
            <style>{`
        @keyframes helix-top {
          0%, 100% { transform: translateY(0) scale(1); z-index: 10; opacity: 1; }
          50% { transform: translateY(100px) scale(0.5); z-index: 0; opacity: 0.5; }
        }
        @keyframes helix-bottom {
          0%, 100% { transform: translateY(0) scale(0.5); z-index: 0; opacity: 0.5; }
          50% { transform: translateY(-100px) scale(1); z-index: 10; opacity: 1; }
        }
        @keyframes helix-bar {
           0%, 100% { opacity: 0.1; transform: scaleY(1); }
           50% { opacity: 0; transform: scaleY(0.2); }
        }
      `}</style>
        </div>
    );
}
