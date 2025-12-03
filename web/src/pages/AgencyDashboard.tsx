const AgencyDashboard = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Metric Card */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-gray-400 text-sm font-medium">Total Revenue (MRR)</h3>
                    <p className="text-3xl font-bold text-white mt-2">$124,500</p>
                    <span className="text-green-400 text-sm flex items-center gap-1 mt-2">
                        <span>↑ 12%</span>
                        <span className="text-gray-500">vs last month</span>
                    </span>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-gray-400 text-sm font-medium">Active Clients</h3>
                    <p className="text-3xl font-bold text-white mt-2">42</p>
                    <span className="text-purple-400 text-sm flex items-center gap-1 mt-2">
                        <span>+3</span>
                        <span className="text-gray-500">new this week</span>
                    </span>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-gray-400 text-sm font-medium">Pending Approvals</h3>
                    <p className="text-3xl font-bold text-white mt-2">15</p>
                    <span className="text-yellow-400 text-sm flex items-center gap-1 mt-2">
                        <span>Needs Attention</span>
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Client Health */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Client Health</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-600"></div>
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
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
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
    );
};

export default AgencyDashboard;
