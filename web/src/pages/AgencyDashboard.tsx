import {
    Users,
    DollarSign,
    Activity,
    Server,
    AlertTriangle,
    Clock,
    MessageSquare,
    ArrowRight,
    TrendingUp,
    Shield
} from 'lucide-react';
import ApprovalLoopMonitor from '../components/dashboard/ApprovalLoopMonitor';

const AgencyDashboard = () => {
    // Mock Data for "Morning Coffee" Queue
    const alerts = [
        {
            id: 1,
            type: 'urgent',
            client: 'Acme Dental',
            message: 'Facebook Token Expired',
            time: '2h ago',
            action: 'Reconnect'
        },
        {
            id: 2,
            type: 'warning',
            client: 'Legal Eagles',
            message: '5 Posts waiting for approval > 3 days',
            time: '5h ago',
            action: 'Nudge Client'
        },
        {
            id: 3,
            type: 'info',
            client: 'Pizza Palace',
            message: 'Negative Google Review received',
            time: '1h ago',
            action: 'Reply'
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Section A: The Financial Pulse */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total MRR */}
                <div className="bg-surface-dark border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-brand-purple/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <DollarSign className="w-16 h-16 text-brand-gold" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total MRR</p>
                        <h3 className="text-3xl font-black text-white mb-2">$142,500</h3>
                        <div className="flex items-center gap-2 text-green-400 text-xs font-bold">
                            <TrendingUp className="w-3 h-3" /> +12% vs last month
                        </div>
                    </div>
                </div>

                {/* Active Clients */}
                <div className="bg-surface-dark border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users className="w-16 h-16 text-blue-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Active Clients</p>
                        <h3 className="text-3xl font-black text-white mb-2">45 <span className="text-lg text-slate-500 font-normal">/ 50</span></h3>
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> 2 Onboarding
                        </div>
                    </div>
                </div>

                {/* Total Ad Spend */}
                <div className="bg-surface-dark border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-pink-500/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity className="w-16 h-16 text-pink-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Managed Ad Spend</p>
                        <h3 className="text-3xl font-black text-white mb-2">$58,200</h3>
                        <div className="flex items-center gap-2 text-brand-purple text-xs font-bold">
                            Looking to scale?
                        </div>
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-surface-dark border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-green-500/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Server className="w-16 h-16 text-green-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">System Health</p>
                        <h3 className="text-3xl font-black text-green-400 mb-2">100%</h3>
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                            All APIs Operational
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Section B: The "Morning Coffee" Queue */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="text-2xl">☕</span> Morning Coffee Queue
                        </h2>
                        <button className="text-xs text-brand-purple font-bold hover:underline">View All Alerts</button>
                    </div>

                    <div className="bg-surface-dark border border-white/10 rounded-2xl overflow-hidden">
                        {alerts.map((alert) => (
                            <div
                                key={alert.id}
                                className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors flex items-center justify-between group cursor-pointer"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-2 rounded-lg ${alert.type === 'urgent' ? 'bg-red-500/10 text-red-500' :
                                            alert.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
                                                'bg-blue-500/10 text-blue-500'
                                        }`}>
                                        {alert.type === 'urgent' ? <AlertTriangle className="w-5 h-5" /> :
                                            alert.type === 'warning' ? <Clock className="w-5 h-5" /> :
                                                <MessageSquare className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{alert.client}</h4>
                                        <p className="text-slate-400 text-sm">{alert.message}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-slate-600 font-medium">{alert.time}</span>
                                    <button className="px-3 py-1.5 bg-white/5 hover:bg-brand-purple hover:text-white rounded-lg text-xs font-bold text-slate-300 transition-all flex items-center gap-1 group-hover:translate-x-1">
                                        {alert.action} <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/* Empty State / All Clear */}
                        {alerts.length === 0 && (
                            <div className="p-10 text-center text-slate-500">
                                <p>All caught up! Enjoy your coffee.</p>
                            </div>
                        )}
                    </div>

                    {/* Reuse existing Approval Loop Monitor but styled for Agency View */}
                    <div className="pt-4">
                        <ApprovalLoopMonitor />
                    </div>
                </div>

                {/* Right Column: Quick Actions & Team Status */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-brand-purple/20 to-brand-blue/10 border border-brand-purple/20 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-brand-purple" /> Admin Override
                        </h3>
                        <p className="text-sm text-slate-400 mb-4">
                            Need to jump into a client account to fix something?
                        </p>
                        <button className="w-full py-3 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                            <Users className="w-4 h-4" /> Impersonate Client
                        </button>
                    </div>

                    {/* Mini Team Status */}
                    <div className="bg-surface-dark border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Team Availability</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Sarah J.', role: 'Account Mgr', status: 'online' },
                                { name: 'Mike T.', role: 'Copywriter', status: 'busy' },
                                { name: 'Jessica L.', role: 'Designer', status: 'offline' },
                            ].map((member, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-200">{member.name}</p>
                                            <p className="text-[10px] text-slate-500 uppercase">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className={`w-2 h-2 rounded-full ${member.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' :
                                            member.status === 'busy' ? 'bg-red-500' : 'bg-slate-600'
                                        }`}></div>
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
