import { useState } from 'react';
import {
    Activity, Shield, AlertTriangle, Briefcase, Plus
} from 'lucide-react';

const TeamOps = () => {
    const [activeTab, setActiveTab] = useState<'roster' | 'load-balancer' | 'profitability'>('load-balancer');

    // Mock Data for Team
    const team = [
        { id: 1, name: "Sarah Jenkins", role: "Account Manager", avatar: "SJ", capacity: 80, activeHours: 32, rate: 50, skills: ["Strategy", "Client Comms"] },
        { id: 2, name: "Mike Thompson", role: "Copywriter", avatar: "MT", capacity: 95, activeHours: 38, rate: 45, skills: ["Copywriting", "SEO"] },
        { id: 3, name: "Jessica Lee", role: "Designer", avatar: "JL", capacity: 40, activeHours: 16, rate: 60, skills: ["Design", "Branding"] },
        { id: 4, name: "David Kim", role: "Video Editor", avatar: "DK", capacity: 20, activeHours: 4, rate: 55, skills: ["Video", "Animation"] },
    ];

    // Mock Data for Load Balancer (Heatmap)
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const workload = {
        1: [6, 7, 7, 6, 6], // Sarah (Busy but ok)
        2: [8, 8, 9, 7, 6], // Mike (Overloaded)
        3: [3, 4, 3, 2, 4], // Jessica (Light)
        4: [0, 2, 2, 0, 0], // David (Very Light)
    };

    const getCapacityColor = (hours: number) => {
        if (hours >= 8) return "bg-red-500 text-white";
        if (hours >= 6) return "bg-yellow-500 text-black";
        if (hours > 0) return "bg-green-500/20 text-green-400";
        return "bg-slate-800 text-slate-600";
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                        <Shield className="w-6 h-6 text-brand-purple" /> Team & Ops Command
                    </h1>
                    <p className="text-slate-400 text-sm">Align human effort with agency economics.</p>
                </div>
                <div className="flex bg-surface-dark border border-white/10 p-1 rounded-lg">
                    {['roster', 'load-balancer', 'profitability'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${activeTab === tab ? 'bg-brand-purple text-white shadow-lg' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Top Level Metrics (The Pulse) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Visualization Gauge */}
                <div className="bg-surface-dark border border-white/5 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Activity className="w-12 h-12 text-brand-gold" />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Agency Utilization</p>
                    <div className="flex items-end gap-2 mb-2">
                        <h3 className="text-4xl font-black text-white">72%</h3>
                        <span className="text-sm font-bold text-green-400 mb-1">Healthy</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500 w-[72%]"></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-3">
                        Capacity for ~3 more clients without hiring.
                    </p>
                </div>

                {/* Profit Leak Alert */}
                <div className="bg-surface-dark border border-red-500/20 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <AlertTriangle className="w-12 h-12 text-red-500" />
                    </div>
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Profit Leak Detected</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-surface-card flex items-center justify-center text-xs font-bold">AD</div>
                            <div>
                                <p className="text-sm font-bold text-white">Acme Dental</p>
                                <p className="text-xs text-red-400 font-bold">-$400 Net Loss</p>
                            </div>
                        </div>
                        <p className="text-xs text-slate-400">
                            Staff costs ($2,400) exceeded Retainer ($2,000) this month.
                        </p>
                        <button className="text-xs font-bold text-white underline decoration-red-500">Audit Hours</button>
                    </div>
                </div>

                {/* Quick Hire */}
                <div className="bg-surface-dark border border-white/5 p-6 rounded-2xl flex flex-col justify-center items-center text-center group cursor-pointer hover:border-brand-purple/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6 text-brand-purple" />
                    </div>
                    <h3 className="text-sm font-bold text-white">Hire Talent</h3>
                    <p className="text-xs text-slate-400">Add freelancer or full-time staff to roster.</p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-surface-dark border border-white/5 rounded-2xl overflow-hidden min-h-[400px]">

                {/* View: Load Balancer (Heatmap) */}
                {activeTab === 'load-balancer' && (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white">Capacity Heatmap</h3>
                            <div className="flex items-center gap-4 text-xs">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500/20"></div> Optimal</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Full</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Overloaded</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Team Member</th>
                                        {weekDays.map(day => (
                                            <th key={day} className="py-4 px-2 text-center text-xs font-bold text-slate-500 uppercase">{day}</th>
                                        ))}
                                        <th className="text-right py-4 px-4 text-xs font-bold text-slate-500 uppercase">Avg Load</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {team.map(member => (
                                        <tr key={member.id} className="group hover:bg-white/5 transition-colors">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                                                        {member.avatar}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">{member.name}</p>
                                                        <p className="text-xs text-slate-500">{member.role}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            {workload[member.id as keyof typeof workload].map((hours, idx) => (
                                                <td key={idx} className="p-2 text-center">
                                                    <div className={`w-full py-2 rounded-lg text-xs font-bold ${getCapacityColor(hours)} transition-all hover:brightness-110 cursor-pointer`}>
                                                        {hours}h
                                                    </div>
                                                </td>
                                            ))}
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className={`text-sm font-bold ${member.capacity > 90 ? 'text-red-500' : 'text-slate-300'}`}>
                                                        {member.capacity}%
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* View: Roster */}
                {activeTab === 'roster' && (
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {team.map(member => (
                            <div key={member.id} className="bg-surface-card border border-white/5 rounded-xl p-5 hover:border-brand-purple/30 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-white border border-white/10">
                                            {member.avatar}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white">{member.name}</h3>
                                            <p className="text-xs text-slate-400">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300 font-mono">
                                        ${member.rate}/hr
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {member.skills.map(skill => (
                                        <span key={skill} className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-slate-300 border border-white/5">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <div className="text-xs text-slate-500">
                                        <span className="text-white font-bold">{member.activeHours}</span> / 40 hrs
                                    </div>
                                    <button className="text-xs font-bold text-brand-purple opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* View: Profitability placeholder */}
                {activeTab === 'profitability' && (
                    <div className="p-12 text-center">
                        <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Profitability Engine</h3>
                        <p className="text-slate-400 max-w-md mx-auto">
                            This module connects time tracking directly to Stripe revenue to calculate real-time margins per client.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default TeamOps;
