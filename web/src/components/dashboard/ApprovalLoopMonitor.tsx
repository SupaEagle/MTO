

const ApprovalLoopMonitor = () => {
    const approvalStats = [
        { label: 'Awaiting Approval', value: 15, status: 'warning' },
        { label: 'Overdue', value: 3, status: 'critical' },
        { label: 'Regeneration Requests', value: 5, status: 'info' },
    ];

    return (
        <div className="glass-panel p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Approval Loop Monitor</h3>
                <button className="text-sm text-purple-400 hover:text-purple-300">View All</button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                {approvalStats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-white/5 rounded-lg">
                        <p className={`text-2xl font-bold ${stat.status === 'critical' ? 'text-red-400' :
                            stat.status === 'warning' ? 'text-yellow-400' :
                                'text-blue-400'
                            }`}>{stat.value}</p>
                        <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-300">Bottleneck Alert</h4>
                {[
                    { client: 'Acme Corp', delay: '2 days overdue', type: 'Approval' },
                    { client: 'Stark Ind', delay: 'High regeneration rate', type: 'Quality' },
                ].map((alert, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="text-sm text-white font-medium">{alert.client}</span>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-red-300">{alert.delay}</p>
                            <p className="text-[10px] text-slate-500">{alert.type}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApprovalLoopMonitor;
