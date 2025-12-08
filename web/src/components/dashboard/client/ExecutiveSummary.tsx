const ExecutiveSummary = () => {
    const metrics = [
        { label: 'Total ROI', value: '342%', trend: '+12%', color: 'text-emerald-400' },
        { label: 'CAC', value: '$42.50', trend: '-5%', color: 'text-blue-400' },
        { label: 'LTV', value: '$1,250', trend: '+8%', color: 'text-purple-400' },
        { label: 'Conversion Rate', value: '2.4%', trend: '+0.2%', color: 'text-teal-400' },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
                <div key={i} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{metric.label}</p>
                    <div className="flex items-end justify-between mt-2">
                        <p className="text-2xl font-bold text-white">{metric.value}</p>
                        <span className={`text-xs font-medium ${metric.trend.startsWith('+') ? 'text-green-400' : 'text-green-400'}`}>
                            {metric.trend}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExecutiveSummary;
