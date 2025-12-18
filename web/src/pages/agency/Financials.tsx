import { useState } from 'react';
import {
    DollarSign, TrendingUp, TrendingDown,
    AlertTriangle, Shield, RefreshCw,
    Lock, Activity, Users
} from 'lucide-react';

const Financials = () => {
    const [activeTab, setActiveTab] = useState<'subs' | 'media' | 'pnl'>('subs');

    // --- MOCK DATA ---
    const SUBSCRIPTIONS = [
        { id: 1, client: 'Acme Dental', plan: 'Gold Tier', amount: 3000, cycle: '1st', status: 'Active', card: '**** 4242' },
        { id: 2, client: 'Smile Pros', plan: 'Starter', amount: 1000, cycle: '15th', status: 'Past Due', card: '**** 1234' },
        { id: 3, client: 'City Dentist', plan: 'Dominance', amount: 5000, cycle: '1st', status: 'Active', card: '**** 9876' },
        { id: 4, client: 'Ortho Center', plan: 'Gold Tier', amount: 3000, cycle: '5th', status: 'Trial', card: '**** 5555' },
    ];

    const MEDIA_SPEND = [
        { id: 1, client: 'Acme Dental', platform: 'Meta', amount: 1540.50, date: 'Yesterday', billingStatus: 'Unbilled', markup: 15 },
        { id: 2, client: 'Acme Dental', platform: 'Vibe.co', amount: 4500.00, date: 'Yesterday', billingStatus: 'Unbilled', markup: 15 },
        { id: 3, client: 'Smile Pros', platform: 'Google', amount: 230.00, date: 'Yesterday', billingStatus: 'Failed', markup: 0 },
        { id: 4, client: 'City Dentist', platform: 'Meta', amount: 890.00, date: 'Yesterday', billingStatus: 'Billed', markup: 10 },
    ];

    const PNL_DATA = [
        { id: 1, client: 'Acme Dental', mrr: 5000, adMarkup: 500, staffCost: 1200, swCost: 100, net: 4200, margin: 84 },
        { id: 2, client: 'Smile Pros', mrr: 1000, adMarkup: 0, staffCost: 1100, swCost: 50, net: -150, margin: -15 },
        { id: 3, client: 'City Dentist', mrr: 3000, adMarkup: 200, staffCost: 800, swCost: 100, net: 2300, margin: 76 },
    ];

    // --- SUB-COMPONENTS ---

    const KPICard = ({ title, value, subtext, trend, trendValue, icon: Icon, color }: any) => (
        <div className="bg-surface-dark border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-brand-purple/50 transition-colors">
            <div className={`absolute top-0 right-0 p-4 opacity-10 ${color}`}>
                <Icon className="w-24 h-24 transform rotate-12 -translate-y-4 translate-x-4" />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                </div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
                <div className="text-2xl font-black text-white mb-2">{value}</div>

                <div className="flex items-center gap-2">
                    {trend === 'up' ? (
                        <span className="flex items-center text-xs font-bold text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded">
                            <TrendingUp className="w-3 h-3 mr-1" /> {trendValue}
                        </span>
                    ) : (
                        <span className="flex items-center text-xs font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">
                            <TrendingDown className="w-3 h-3 mr-1" /> {trendValue}
                        </span>
                    )}
                    <span className="text-xs text-slate-500">{subtext}</span>
                </div>
            </div>
        </div>
    );

    const SubscriptionsView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Dunning Alert */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 shrink-0 animate-pulse">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold">Dunning Alert: 1 Payment Past Due</h3>
                        <p className="text-sm text-red-200/60">Automated retry logic active. Account lock scheduled in 2 days.</p>
                    </div>
                </div>
                <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-lg shadow-lg flex items-center gap-2 transition-colors">
                    <Lock className="w-4 h-4" /> Lock Accounts
                </button>
            </div>

            <div className="bg-surface-dark border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-brand-purple" /> Active Retainers
                    </h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs font-bold text-slate-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">Export CSV</button>
                    </div>
                </div>
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-white/5 text-xs uppercase font-bold text-slate-500">
                        <tr>
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4">Plan Tier</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Billing Cycle</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {SUBSCRIPTIONS.map(sub => (
                            <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-bold text-white">{sub.client}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-white/5 rounded border border-white/5 text-xs font-mono">{sub.plan}</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-white">${sub.amount.toLocaleString()}</td>
                                <td className="px-6 py-4 text-xs">{sub.cycle}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${sub.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            sub.status === 'Past Due' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                        }`}>
                                        {sub.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button className="text-xs font-bold text-brand-purple hover:text-brand-pink transition-colors">Upgrade</button>
                                    <button className="text-xs text-slate-500 hover:text-white transition-colors">History</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const MediaBankView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Risk Control */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <Shield className="w-5 h-5 text-indigo-400" />
                            <h3 className="font-bold text-white">Daily Budget Kill Switch</h3>
                        </div>
                        <p className="text-sm text-indigo-200 mb-4">
                            System auto-pauses campaigns if unbilled spend exceeds $500 AND client card fails.
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30 flex items-center gap-1 animate-pulse">
                                <Activity className="w-3 h-3" /> System Active
                            </div>
                            <span className="text-xs text-slate-400">Last check: 1 min ago</span>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-dark border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-white mb-1">Unbilled Float</h3>
                        <div className="text-3xl font-black text-white">$6,270.50</div>
                        <p className="text-xs text-slate-500">Ad spend fronted by Agency cards in last 24h.</p>
                    </div>
                    <button className="mt-4 w-full py-3 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all">
                        <RefreshCw className="w-4 h-4" /> Process Re-Billing Engine
                    </button>
                </div>
            </div>

            {/* Ledger */}
            <div className="bg-surface-dark border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <h3 className="font-bold text-white">Ad Spend Ledger (Yesterday)</h3>
                </div>
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-white/5 text-xs uppercase font-bold text-slate-500">
                        <tr>
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4">Platform</th>
                            <th className="px-6 py-4">Spend (Cost)</th>
                            <th className="px-6 py-4">Markup</th>
                            <th className="px-6 py-4">Total Billable</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {MEDIA_SPEND.map(item => {
                            const totalBillable = item.amount * (1 + item.markup / 100);
                            return (
                                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-bold text-white">{item.client}</td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${item.platform === 'Vibe.co' ? 'bg-brand-pink' : item.platform === 'Meta' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                                        {item.platform}
                                    </td>
                                    <td className="px-6 py-4 font-mono">${item.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-brand-gold font-bold">{item.markup}%</td>
                                    <td className="px-6 py-4 font-mono text-white font-bold">${totalBillable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${item.billingStatus === 'Billed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                item.billingStatus === 'Failed' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                    'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            }`}>
                                            {item.billingStatus}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const PNLView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-surface-dark border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-bold text-white">Client Profitability Ranking</h3>
                    <p className="text-xs text-slate-500">Connecting "Money In" with "Effort Out"</p>
                </div>
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-white/5 text-xs uppercase font-bold text-slate-500">
                        <tr>
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4 text-green-400">MRR (In)</th>
                            <th className="px-6 py-4 text-green-400">Ad Fees (In)</th>
                            <th className="px-6 py-4 text-red-400">Staff Cost (Out)</th>
                            <th className="px-6 py-4 text-red-400">Software (Out)</th>
                            <th className="px-6 py-4 text-white">Net Profit</th>
                            <th className="px-6 py-4">Margin</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {PNL_DATA.sort((a, b) => b.net - a.net).map(row => (
                            <tr key={row.id} className={`hover:bg-white/5 transition-colors ${row.net < 0 ? 'bg-red-500/5' : ''}`}>
                                <td className="px-6 py-4 font-bold text-white">{row.client}</td>
                                <td className="px-6 py-4 text-green-400 font-mono">+${row.mrr.toLocaleString()}</td>
                                <td className="px-6 py-4 text-green-400 font-mono">+${row.adMarkup.toLocaleString()}</td>
                                <td className="px-6 py-4 text-red-400 font-mono">-${row.staffCost.toLocaleString()}</td>
                                <td className="px-6 py-4 text-red-400 font-mono">-${row.swCost.toLocaleString()}</td>
                                <td className={`px-6 py-4 font-black font-mono text-lg ${row.net > 0 ? 'text-white' : 'text-red-500'}`}>
                                    ${row.net.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${row.margin > 50 ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            row.margin > 20 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                'bg-red-500/10 text-red-400 border-red-500/20'
                                        }`}>
                                        {row.margin}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Financial Command</h1>
                    <p className="text-slate-400 text-sm">Track every dollar. Automate billing. Eliminate churn.</p>
                </div>
            </div>

            {/* KPI Ticker */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KPICard
                    title="Monthly Recurring Revenue"
                    value="$98,450"
                    subtext="vs last month"
                    trend="up"
                    trendValue="12%"
                    icon={DollarSign}
                    color="text-green-400 bg-green-500/10"
                />
                <KPICard
                    title="Ad Spend Under Mgmt"
                    value="$412k"
                    subtext="Flowing through agency"
                    trend="up"
                    trendValue="8%"
                    icon={Activity}
                    color="text-brand-purple bg-brand-purple/10"
                />
                <KPICard
                    title="Net Profit (Est)"
                    value="$32,100"
                    subtext="32% Margin"
                    trend="up"
                    trendValue="4%"
                    icon={TrendingUp}
                    color="text-brand-gold bg-brand-gold/10"
                />
                <KPICard
                    title="Outstanding Invoices"
                    value="$12,400"
                    subtext="3 Clients Past Due"
                    trend="down"
                    trendValue="2"
                    icon={AlertTriangle}
                    color="text-red-400 bg-red-500/10"
                />
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-6 border-b border-white/5 mb-8">
                <button
                    onClick={() => setActiveTab('subs')}
                    className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === 'subs' ? 'text-white' : 'text-slate-500 hover:text-white'}`}
                >
                    Subscription Manager
                    {activeTab === 'subs' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-purple shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('media')}
                    className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === 'media' ? 'text-white' : 'text-slate-500 hover:text-white'}`}
                >
                    Media Bank (Re-Billing)
                    {activeTab === 'media' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-pink shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('pnl')}
                    className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === 'pnl' ? 'text-white' : 'text-slate-500 hover:text-white'}`}
                >
                    Client P&L
                    {activeTab === 'pnl' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>}
                </button>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {activeTab === 'subs' && <SubscriptionsView />}
                {activeTab === 'media' && <MediaBankView />}
                {activeTab === 'pnl' && <PNLView />}
            </div>
        </div>
    );
};

export default Financials;
