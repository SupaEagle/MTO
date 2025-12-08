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

    return (
        <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-2">Brand Voice Calibration</h2>
                <p className="text-slate-400 mb-8">Define how your brand sounds to your audience.</p>

                <div className="space-y-8 max-w-2xl">
                    {/* Formal vs Casual */}
                    <div>
                        <div className="flex justify-between text-sm font-medium text-white mb-2">
                            <span>Casual & Friendly</span>
                            <span>Formal & Professional</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={voiceAttributes.formal}
                            onChange={(e) => handleSliderChange('formal', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                        />
                    </div>

                    {/* Calm vs Enthusiastic */}
                    <div>
                        <div className="flex justify-between text-sm font-medium text-white mb-2">
                            <span>Calm & Grounded</span>
                            <span>High Energy & Enthusiastic</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={voiceAttributes.enthusiastic}
                            onChange={(e) => handleSliderChange('enthusiastic', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                        />
                    </div>

                    {/* Simple vs Technical */}
                    <div>
                        <div className="flex justify-between text-sm font-medium text-white mb-2">
                            <span>Simple & Accessible</span>
                            <span>Technical & Expert</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={voiceAttributes.technical}
                            onChange={(e) => handleSliderChange('technical', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                        />
                    </div>
                </div>

                <div className="mt-12 p-6 bg-slate-700/30 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-2">AI Voice Preview</h3>
                    <p className="text-slate-300 italic">
                        "Here is a sample of how your brand might sound based on these settings. We combine deep industry knowledge with a friendly, approachable tone to help you succeed."
                    </p>
                    <button className="mt-4 text-sm text-teal-400 hover:text-teal-300 font-medium">
                        ↻ Regenerate Preview
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BrandVoiceCalibration;
