import { useState } from 'react';

const BrandVoiceCalibration = () => {
    const [voiceAttributes, setVoiceAttributes] = useState({
        formal: 50,
        enthusiastic: 50,
        technical: 50,
        empathetic: 50,
    });

    const handleSliderChange = (attribute: string, value: number) => {
        setVoiceAttributes(prev => ({ ...prev, [attribute]: value }));
    };

    const sliders = [
        {
            key: 'formal',
            left: 'Casual & Friendly',
            right: 'Formal & Professional',
            value: voiceAttributes.formal
        },
        {
            key: 'enthusiastic',
            left: 'Calm & Grounded',
            right: 'High Energy & Enthusiastic',
            value: voiceAttributes.enthusiastic
        },
        {
            key: 'technical',
            left: 'Simple & Accessible',
            right: 'Technical & Expert',
            value: voiceAttributes.technical
        }
    ];

    return (
        <div className="space-y-6 relative">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-pink/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>

            <div className="relative group rounded-2xl p-[1px] bg-gradient-to-r from-white/10 to-white/5 border border-white/10 shadow-2xl">

                <div className="relative bg-[#0f1016]/80 backdrop-blur-xl p-8 rounded-2xl h-full border border-white/5">
                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400 mb-3">Brand Voice Calibration</h2>
                        <p className="text-slate-400 text-lg">Define the sonic identity of your agency. How do you want to be heard?</p>
                    </div>

                    <div className="space-y-12 max-w-3xl mx-auto">
                        {sliders.map((slider) => (
                            <div key={slider.key} className="relative">
                                <div className="flex justify-between text-sm font-bold text-slate-300 mb-4 tracking-wide">
                                    <span className="text-brand-pink">{slider.left}</span>
                                    <span className="text-brand-purple">{slider.right}</span>
                                </div>
                                <div className="relative w-full h-4 rounded-full bg-black/40 border border-white/5">
                                    <div
                                        className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-brand-pink to-brand-purple opacity-50"
                                        style={{ width: `${slider.value}%` }}
                                    ></div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={slider.value}
                                        onChange={(e) => handleSliderChange(slider.key, parseInt(e.target.value))}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    {/* Custom Thumb Element for visual flair */}
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white border-2 border-brand-purple shadow-[0_0_15px_rgba(157,78,221,0.5)] pointer-events-none transition-all"
                                        style={{ left: `calc(${slider.value}% - 12px)` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 p-8 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 relative overflow-hidden group/preview hover:border-brand-purple/30 transition-colors">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-brand-pink to-brand-purple"></div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-2xl">🎙️</span>
                            <span>AI Voice Preview</span>
                        </h3>
                        <p className="text-slate-300 italic text-lg leading-relaxed font-light border-l-2 border-white/10 pl-6 py-2">
                            "Here is a sample of how your brand might sound based on these settings. We combine deep industry knowledge with a friendly, approachable tone to help you succeed."
                        </p>
                        <button className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-pink hover:text-white transition-colors group-hover/preview:translate-x-2 duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Regenerate Preview
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .animate-pulse-slow {
                    animation: pulse-slow 8s infinite cubic-bezier(0.4, 0, 0.6, 1);
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.3; }
                }
            `}</style>
        </div>
    );

};

export default BrandVoiceCalibration;
