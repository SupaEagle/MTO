const CompetitorSpy = () => {
    const competitors = [
        { name: 'Competitor A', strength: 'High Volume', weakness: 'Generic Content', recentAd: 'Scale your agency in 30 days...' },
        { name: 'Competitor B', strength: 'Great Video', weakness: 'Inconsistent Posting', recentAd: 'The secret to viral reels...' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-2">Competitor Spy</h2>
                <p className="text-slate-400 mb-8">Monitor your competition's ads and content strategy.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {competitors.map((comp, i) => (
                        <div key={i} className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-bold text-white">{comp.name}</h3>
                                <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded">Tracking</span>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase">Strength</p>
                                    <p className="text-sm text-green-400 font-medium">{comp.strength}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase">Weakness</p>
                                    <p className="text-sm text-red-400 font-medium">{comp.weakness}</p>
                                </div>
                            </div>

                            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <p className="text-xs text-slate-400 mb-2">Recently Spotted Ad</p>
                                <p className="text-sm text-white italic">"{comp.recentAd}"</p>
                                <button className="mt-3 text-xs text-teal-400 hover:text-white">
                                    View in Ad Library →
                                </button>
                            </div>
                        </div>
                    ))}

                    <button className="border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:text-white hover:border-slate-400 transition-colors min-h-[200px]">
                        <span className="text-3xl mb-2">+</span>
                        <span className="font-medium">Add Competitor</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompetitorSpy;
