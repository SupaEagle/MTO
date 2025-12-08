

const GlobalHealthScorecard = () => {
    const metrics = [
        { label: 'Total Clients', value: '42', change: '+3', trend: 'up', color: 'text-blue-400' },
        { label: 'Total MRR', value: '$124,500', change: '+12%', trend: 'up', color: 'text-emerald-400' },
        { label: 'Success Rate', value: '94%', change: '+1%', trend: 'up', color: 'text-purple-400' },
        { label: 'Churn Rate', value: '1.2%', change: '-0.5%', trend: 'down', color: 'text-green-400' }, // Down is good for churn
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
                <div key={index} className="glass-panel p-6 rounded-xl">
                    <h3 className="text-slate-400 text-sm font-medium">{metric.label}</h3>
                    <div className="flex items-end justify-between mt-2">
                        <p className="text-3xl font-bold text-white">{metric.value}</p>
                        <span className={`text-sm font-medium flex items-center gap-1 ${metric.color}`}>
                            <span>{metric.change}</span>
                            <span className="text-slate-500 text-xs">vs last month</span>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GlobalHealthScorecard;
