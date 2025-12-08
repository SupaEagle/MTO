

const AutomationSavingsTracker = () => {
    return (
        <div className="glass-panel p-6 rounded-xl flex flex-col justify-center items-center text-center h-full">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-4 border border-purple-500/30">
                <span className="text-3xl">🤖</span>
            </div>
            <h3 className="text-white font-bold text-lg">Automation Savings</h3>

            <div className="mt-4 mb-2">
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    124 hrs
                </span>
            </div>
            <p className="text-slate-400 text-sm">saved this month</p>

            <div className="mt-6 w-full grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/5 p-2 rounded">
                    <span className="block text-white font-bold">$6,200</span>
                    <span className="text-slate-500">Labor Value</span>
                </div>
                <div className="bg-white/5 p-2 rounded">
                    <span className="block text-white font-bold">450+</span>
                    <span className="text-slate-500">Tasks Auto-run</span>
                </div>
            </div>
        </div>
    );
};

export default AutomationSavingsTracker;
