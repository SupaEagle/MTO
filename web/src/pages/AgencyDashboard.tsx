import GlobalHealthScorecard from '../components/dashboard/GlobalHealthScorecard';
import ApprovalLoopMonitor from '../components/dashboard/ApprovalLoopMonitor';
import TeamCapacityHeatmap from '../components/dashboard/TeamCapacityHeatmap';
import AutomationSavingsTracker from '../components/dashboard/AutomationSavingsTracker';
import ThemeTest from '../components/ThemeTest';

const AgencyDashboard = () => {
    return (
        <div className="relative min-h-screen">
            <div className="space-y-6 relative z-10">
                <ThemeTest />
                <GlobalHealthScorecard />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <ApprovalLoopMonitor />
                    </div>

                    <div className="grid grid-rows-2 gap-6">
                        <TeamCapacityHeatmap />
                        <AutomationSavingsTracker />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Client Health */}
                    <div className="glass-panel p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">Client Health</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                                        <div>
                                            <p className="text-sm font-medium text-white">Client {i}</p>
                                            <p className="text-xs text-gray-400">Last active: 2h ago</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Healthy</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="glass-panel p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                    <div>
                                        <p className="text-sm text-gray-300">New content generated for <span className="text-white font-medium">Client {i}</span></p>
                                        <p className="text-xs text-gray-500">15 mins ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgencyDashboard;
