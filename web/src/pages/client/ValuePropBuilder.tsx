import { useState } from 'react';

const ValuePropBuilder = () => {
    const [problem, setProblem] = useState('');
    const [solution, setSolution] = useState('');

    return (
        <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-2">Value Proposition Builder</h2>
                <p className="text-slate-400 mb-8">Craft a compelling message that resonates with your ideal client.</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">The Problem You Solve</label>
                            <textarea
                                value={problem}
                                onChange={(e) => setProblem(e.target.value)}
                                className="w-full h-32 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                                placeholder="Describe the pain point your client is facing..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Your Unique Solution</label>
                            <textarea
                                value={solution}
                                onChange={(e) => setSolution(e.target.value)}
                                className="w-full h-32 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                                placeholder="How do you solve it differently than everyone else?"
                            />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-teal-900/50 to-emerald-900/50 p-6 rounded-xl border border-teal-500/30">
                        <h3 className="text-lg font-bold text-white mb-4">Generated USP</h3>
                        <div className="bg-slate-900/80 p-6 rounded-lg border border-slate-700 min-h-[200px] flex items-center justify-center text-center">
                            {problem && solution ? (
                                <p className="text-xl font-medium text-white">
                                    "We help [Target Audience] who struggle with <span className="text-teal-400">{problem}</span> by providing <span className="text-emerald-400">{solution}</span>, so they can achieve [Result]."
                                </p>
                            ) : (
                                <p className="text-slate-500">Fill in the fields to generate your USP</p>
                            )}
                        </div>
                        <button className="w-full mt-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-teal-900/20">
                            ✨ Polish with AI
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValuePropBuilder;
