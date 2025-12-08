const FunnelAnalysis = () => {
    const funnelSteps = [
        { label: 'Impressions', value: '45,200', conversion: '100%', dropoff: '0%' },
        { label: 'Clicks', value: '3,450', conversion: '7.6%', dropoff: '92.4%' },
        { label: 'Leads', value: '128', conversion: '3.7%', dropoff: '96.3%' },
        { label: 'Sales', value: '12', conversion: '9.4%', dropoff: '90.6%' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-2">Funnel Analysis</h2>
                <p className="text-slate-400 mb-8">Visualize your customer journey from awareness to conversion.</p>

                <div className="space-y-4 max-w-3xl mx-auto">
                    {funnelSteps.map((step, i) => (
                        <div key={i} className="relative">
                            <div
                                className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 flex justify-between items-center relative z-10"
                                style={{ width: `${100 - (i * 15)}%`, minWidth: '300px', margin: '0 auto' }}
                            >
                                <div>
                                    <p className="text-white font-bold">{step.label}</p>
                                    <p className="text-xs text-slate-400">Conversion: {step.conversion}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-teal-400">{step.value}</p>
                                    {i > 0 && <p className="text-xs text-red-400">Dropoff: {step.dropoff}</p>}
                                </div>
                            </div>
                            {i < funnelSteps.length - 1 && (
                                <div className="h-8 w-0.5 bg-slate-600 mx-auto"></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <h3 className="text-sm font-bold text-white mb-2">Top Traffic Source</h3>
                        <p className="text-teal-400 font-medium">LinkedIn Organic</p>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <h3 className="text-sm font-bold text-white mb-2">Best Converting Content</h3>
                        <p className="text-teal-400 font-medium">"5 Ways to Scale" Carousel</p>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <h3 className="text-sm font-bold text-white mb-2">Avg. Deal Size</h3>
                        <p className="text-teal-400 font-medium">$2,450</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FunnelAnalysis;
