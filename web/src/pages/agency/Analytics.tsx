import { useState } from 'react';

const Analytics = () => {
    const [timeRange, setTimeRange] = useState('30d');

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Performance Analytics</h1>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 3 Months</option>
                    <option value="1y">Last Year</option>
                </select>
            </div>

            {/* Top Level Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Revenue', value: '$124,500', change: '+12%', color: 'text-emerald-400' },
                    { label: 'Active Clients', value: '42', change: '+3', color: 'text-blue-400' },
                    { label: 'Content Pieces', value: '1,240', change: '+15%', color: 'text-purple-400' },
                    { label: 'Avg. ROI', value: '3.2x', change: '+0.4x', color: 'text-pink-400' },
                ].map((metric, i) => (
                    <div key={i} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <p className="text-slate-400 text-sm mb-1">{metric.label}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
                            <span className={`text-sm font-medium ${metric.color}`}>{metric.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Growth Chart Placeholder */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-6">Revenue Growth</h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                        {[40, 55, 45, 60, 75, 65, 85, 90, 80, 95, 100, 110].map((h, i) => (
                            <div key={i} className="w-full bg-slate-700 rounded-t hover:bg-purple-600 transition-colors relative group">
                                <div
                                    style={{ height: `${h}%` }}
                                    className="bg-gradient-to-t from-purple-900 to-purple-500 rounded-t w-full absolute bottom-0"
                                ></div>
                                {/* Tooltip */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    ${h * 1000}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-500">
                        <span>Jan</span>
                        <span>Dec</span>
                    </div>
                </div>

                {/* Client Performance Table */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-6">Top Performing Clients</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-slate-400 text-sm border-b border-slate-700">
                                    <th className="pb-3 font-medium">Client</th>
                                    <th className="pb-3 font-medium">Reach</th>
                                    <th className="pb-3 font-medium">Engagement</th>
                                    <th className="pb-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    { name: 'Acme Corp', reach: '1.2M', eng: '4.5%', status: 'Excellent' },
                                    { name: 'Stark Ind', reach: '850K', eng: '5.2%', status: 'Excellent' },
                                    { name: 'Wayne Ent', reach: '2.1M', eng: '3.8%', status: 'Good' },
                                    { name: 'Cyberdyne', reach: '500K', eng: '2.1%', status: 'Needs Attention' },
                                    { name: 'Umbrella', reach: '300K', eng: '1.5%', status: 'Critical' },
                                ].map((client, i) => (
                                    <tr key={i} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-700/30 transition-colors">
                                        <td className="py-3 text-white font-medium">{client.name}</td>
                                        <td className="py-3 text-slate-300">{client.reach}</td>
                                        <td className="py-3 text-slate-300">{client.eng}</td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${client.status === 'Excellent' ? 'bg-emerald-500/20 text-emerald-400' :
                                                    client.status === 'Good' ? 'bg-blue-500/20 text-blue-400' :
                                                        client.status === 'Needs Attention' ? 'bg-yellow-500/20 text-yellow-400' :
                                                            'bg-red-500/20 text-red-400'
                                                }`}>
                                                {client.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
