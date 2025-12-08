const BudgetOptimizer = () => {
    const channels = [
        { name: 'Facebook Ads', spend: 1200, roas: 2.4, recommendation: 'increase' },
        { name: 'Google Search', spend: 800, roas: 3.1, recommendation: 'increase' },
        { name: 'LinkedIn Ads', spend: 1500, roas: 1.2, recommendation: 'decrease' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-2">Budget Optimizer</h2>
                <p className="text-slate-400 mb-8">AI-driven recommendations to maximize your ROAS.</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {channels.map((channel, i) => (
                        <div key={i} className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 relative overflow-hidden">
                            <div className={`absolute top-0 right-0 p-2 rounded-bl-xl text-xs font-bold uppercase tracking-wide ${channel.recommendation === 'increase' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                }`}>
                                {channel.recommendation === 'increase' ? 'Scale Up' : 'Scale Down'}
                            </div>

                            <h3 className="text-lg font-bold text-white mb-4">{channel.name}</h3>

                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-slate-400 text-sm">Current Spend</span>
                                    <span className="text-white font-medium">${channel.spend}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400 text-sm">ROAS</span>
                                    <span className={`font-medium ${channel.roas > 2 ? 'text-green-400' : 'text-yellow-400'}`}>
                                        {channel.roas}x
                                    </span>
                                </div>
                            </div>

                            <button className={`w-full py-2 rounded-lg text-sm font-bold transition-colors ${channel.recommendation === 'increase'
                                    ? 'bg-green-600 hover:bg-green-500 text-white'
                                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                                }`}>
                                {channel.recommendation === 'increase' ? 'Apply Increase (+20%)' : 'Reduce Budget (-10%)'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BudgetOptimizer;
