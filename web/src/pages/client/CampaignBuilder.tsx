import { useState } from 'react';

const CampaignBuilder = () => {
    const [step, setStep] = useState(1);
    const [objective, setObjective] = useState('');

    const objectives = [
        { id: 'awareness', title: 'Brand Awareness', icon: '📢' },
        { id: 'traffic', title: 'Website Traffic', icon: '🖱️' },
        { id: 'leads', title: 'Lead Generation', icon: '🎯' },
        { id: 'sales', title: 'Sales / Conversions', icon: '💰' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-white">Campaign Builder</h2>
                    <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-teal-500' : 'bg-slate-700'}`}></span>
                        <span className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-teal-500' : 'bg-slate-700'}`}></span>
                        <span className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-teal-500' : 'bg-slate-700'}`}></span>
                    </div>
                </div>

                {step === 1 && (
                    <div className="animate-fade-in">
                        <h3 className="text-lg font-bold text-white mb-4">Step 1: Choose your objective</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {objectives.map((obj) => (
                                <button
                                    key={obj.id}
                                    onClick={() => setObjective(obj.id)}
                                    className={`p-6 rounded-xl border text-center transition-all ${objective === obj.id
                                            ? 'bg-teal-900/30 border-teal-500 ring-1 ring-teal-500'
                                            : 'bg-slate-900/50 border-slate-700 hover:bg-slate-800'
                                        }`}
                                >
                                    <div className="text-3xl mb-3">{obj.icon}</div>
                                    <p className="font-bold text-white">{obj.title}</p>
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => setStep(2)}
                                disabled={!objective}
                                className="px-6 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
                            >
                                Next: Audience →
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-fade-in">
                        <h3 className="text-lg font-bold text-white mb-4">Step 2: Define Audience</h3>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 mb-6">
                            <p className="text-slate-400 text-center italic">AI Audience Suggestions coming soon...</p>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setStep(1)}
                                className="px-6 py-2 text-slate-400 hover:text-white font-medium"
                            >
                                ← Back
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition-colors"
                            >
                                Next: Creative →
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-fade-in">
                        <h3 className="text-lg font-bold text-white mb-4">Step 3: Ad Creative</h3>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 mb-6 text-center">
                            <p className="text-slate-400">Select creatives from your library</p>
                            <button className="mt-4 px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:text-white hover:border-slate-400">
                                Browse Library
                            </button>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setStep(2)}
                                className="px-6 py-2 text-slate-400 hover:text-white font-medium"
                            >
                                ← Back
                            </button>
                            <button
                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-purple-900/20"
                            >
                                🚀 Launch Campaign
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CampaignBuilder;
