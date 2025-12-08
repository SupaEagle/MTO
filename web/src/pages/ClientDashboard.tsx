import ExecutiveSummary from '../components/dashboard/client/ExecutiveSummary';
import ActionFeed from '../components/dashboard/client/ActionFeed';

const ClientDashboard = () => {
    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-teal-900/50 to-emerald-900/50 p-8 rounded-2xl border border-teal-800/30">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Sarah!</h1>
                <p className="text-teal-200">Your marketing engine is running smoothly. You have 5 posts waiting for approval.</p>
                <button className="mt-6 px-6 py-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-teal-900/20">
                    Review Content
                </button>
            </div>

            {/* Executive Summary */}
            <ExecutiveSummary />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Area (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Metric Card */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <h3 className="text-slate-400 text-sm font-medium">Total Reach</h3>
                            <p className="text-3xl font-bold text-white mt-2">45.2K</p>
                            <span className="text-emerald-400 text-sm flex items-center gap-1 mt-2">
                                <span>↑ 8.5%</span>
                            </span>
                        </div>

                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <h3 className="text-slate-400 text-sm font-medium">Engagement Rate</h3>
                            <p className="text-3xl font-bold text-white mt-2">4.8%</p>
                            <span className="text-emerald-400 text-sm flex items-center gap-1 mt-2">
                                <span>↑ 1.2%</span>
                            </span>
                        </div>

                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <h3 className="text-slate-400 text-sm font-medium">Leads Generated</h3>
                            <p className="text-3xl font-bold text-white mt-2">128</p>
                            <span className="text-emerald-400 text-sm flex items-center gap-1 mt-2">
                                <span>↑ 15%</span>
                            </span>
                        </div>
                    </div>

                    {/* Upcoming Content Preview */}
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h3 className="text-lg font-semibold text-white mb-4">Upcoming Content</h3>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex gap-4 p-4 bg-slate-700/30 rounded-lg border border-slate-700/50">
                                    <div className="w-24 h-24 bg-slate-600 rounded-lg flex-shrink-0"></div>
                                    <div>
                                        <div className="flex gap-2 mb-2">
                                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">LinkedIn</span>
                                            <span className="px-2 py-0.5 bg-slate-600 text-slate-300 text-xs rounded-full">Draft</span>
                                        </div>
                                        <h4 className="text-white font-medium mb-1">5 Ways to Optimize Your Workflow</h4>
                                        <p className="text-sm text-slate-400 line-clamp-2">
                                            Discover the secrets to boosting productivity without burning out. In this post we cover...
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar (1/3) */}
                <div className="space-y-6">
                    <ActionFeed />
                </div>
            </div>
            {/* Content Calendar Preview */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Upcoming Content</h3>
                    <button className="text-sm text-teal-400 hover:text-teal-300">View Calendar</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 hover:border-teal-500/50 transition-colors cursor-pointer group">
                            <div className="aspect-square bg-slate-600 rounded-md mb-3 flex items-center justify-center text-slate-500 group-hover:bg-slate-600/80">
                                Image
                            </div>
                            <p className="text-sm font-medium text-white truncate">How to scale your business...</p>
                            <p className="text-xs text-slate-400 mt-1">Tomorrow, 10:00 AM</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
