import { useState } from 'react';

const LeadAutomation = () => {
    const [rules, setRules] = useState([
        { id: 1, trigger: 'Comment contains "info"', action: 'DM "Here is the link..."', active: true },
        { id: 2, trigger: 'Comment contains "price"', action: 'Reply "Sent you a DM!"', active: true },
    ]);

    const toggleRule = (id: number) => {
        setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
    };

    return (
        <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Lead Automation</h2>
                        <p className="text-slate-400">Turn comments into leads automatically.</p>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-colors">
                        + New Rule
                    </button>
                </div>

                <div className="space-y-4">
                    {rules.map((rule) => (
                        <div key={rule.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl">
                                    ⚡
                                </div>
                                <div>
                                    <p className="text-white font-medium">
                                        If <span className="text-purple-400">{rule.trigger}</span>
                                    </p>
                                    <p className="text-sm text-slate-400">
                                        Then <span className="text-teal-400">{rule.action}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-medium ${rule.active ? 'text-green-400' : 'text-slate-500'}`}>
                                    {rule.active ? 'Active' : 'Paused'}
                                </span>
                                <button
                                    onClick={() => toggleRule(rule.id)}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${rule.active ? 'bg-green-500/20' : 'bg-slate-700'
                                        }`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${rule.active ? 'left-7 bg-green-500' : 'left-1 bg-slate-500'
                                        }`}></div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeadAutomation;
