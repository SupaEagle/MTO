import { useState } from 'react';

const ScalingFocus = () => {
    const [selectedBottleneck, setSelectedBottleneck] = useState<string | null>(null);

    const bottlenecks = [
        { id: 'leads', title: 'Not Enough Leads', description: 'I need more people to know about my business.', icon: '📢' },
        { id: 'conversion', title: 'Low Conversion', description: 'People visit but don\'t buy.', icon: '📉' },
        { id: 'retention', title: 'Churn / Retention', description: 'Customers don\'t stay long enough.', icon: '💔' },
        { id: 'capacity', title: 'Operational Capacity', description: 'I can\'t handle more work right now.', icon: '⚙️' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-2">Scaling & Focus</h2>
                <p className="text-slate-400 mb-8">Identify your current bottleneck to focus your marketing efforts.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {bottlenecks.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedBottleneck(item.id)}
                            className={`p-6 rounded-xl border text-left transition-all ${selectedBottleneck === item.id
                                    ? 'bg-teal-900/30 border-teal-500 ring-1 ring-teal-500'
                                    : 'bg-slate-700/30 border-slate-600 hover:bg-slate-700/50'
                                }`}
                        >
                            <div className="text-3xl mb-4">{item.icon}</div>
                            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-400">{item.description}</p>
                        </button>
                    ))}
                </div>

                {selectedBottleneck && (
                    <div className="bg-gradient-to-r from-teal-900/50 to-emerald-900/50 p-6 rounded-xl border border-teal-500/30 animate-fade-in">
                        <h3 className="text-lg font-bold text-white mb-2">Recommended Focus</h3>
                        <p className="text-slate-300 mb-4">
                            Based on your selection, we recommend focusing on
                            <span className="font-bold text-teal-400"> {bottlenecks.find(b => b.id === selectedBottleneck)?.title}</span>.
                        </p>
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <h4 className="text-sm font-bold text-white mb-2">Action Plan:</h4>
                            <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                                <li>Launch a targeted awareness campaign.</li>
                                <li>Optimize landing page copy for clarity.</li>
                                <li>Increase posting frequency on LinkedIn.</li>
                            </ul>
                        </div>
                        <button className="mt-6 px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors">
                            Apply Strategy to Content Plan
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScalingFocus;
