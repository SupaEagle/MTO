const CollaborationPortal = () => {
    const handoffs = [
        { from: 'Mike (Copy)', to: 'Jessica (Design)', item: 'Acme Q3 Posts', time: '2h ago' },
        { from: 'Sarah (Strategy)', to: 'David (Video)', item: 'Stark Reel Brief', time: '4h ago' },
    ];

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">Handoffs & Review</h3>
            <div className="space-y-3">
                {handoffs.map((handoff, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-700/50">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                            {handoff.from[0]}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-white font-medium">{handoff.item}</p>
                            <p className="text-xs text-slate-400 mt-0.5">
                                {handoff.from} <span className="text-slate-600">→</span> {handoff.to}
                            </p>
                        </div>
                        <span className="text-[10px] text-slate-500">{handoff.time}</span>
                    </div>
                ))}
                <button className="w-full py-2 mt-2 text-sm text-slate-400 hover:text-white border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors">
                    + New Handoff
                </button>
            </div>
        </div>
    );
};

export default CollaborationPortal;
