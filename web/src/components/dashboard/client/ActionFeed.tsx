const ActionFeed = () => {
    const actions = [
        { type: 'approval', message: '5 new posts ready for approval', time: '2h ago', urgent: true },
        { type: 'comment', message: 'New comment on "Strategy 101" post', time: '4h ago', urgent: false },
        { type: 'system', message: 'Weekly report is ready', time: '1d ago', urgent: false },
    ];

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full">
            <h3 className="text-lg font-bold text-white mb-4">Action Feed</h3>
            <div className="space-y-4">
                {actions.map((action, i) => (
                    <div key={i} className={`p-4 rounded-lg border ${action.urgent ? 'bg-purple-900/20 border-purple-500/30' : 'bg-slate-700/30 border-slate-700'
                        }`}>
                        <div className="flex justify-between items-start">
                            <p className="text-sm text-white font-medium">{action.message}</p>
                            {action.urgent && <span className="w-2 h-2 rounded-full bg-purple-500"></span>}
                        </div>
                        <p className="text-xs text-slate-400 mt-2">{action.time}</p>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-slate-400 hover:text-white border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors">
                View All Notifications
            </button>
        </div>
    );
};

export default ActionFeed;
