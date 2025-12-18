import { useState } from 'react';
import {
    LayoutDashboard,
    Plus,
    BarChart3,
    Tv,
    Facebook,
    Globe,
    Search,
    MapPin,
    Target,
    Users,
    Play,
    CheckCircle,
    ArrowRight,
    TrendingUp,
    DollarSign
} from 'lucide-react';

// Mock Data
const CAMPAIGNS = [
    { id: 1, name: 'Summer Sale - Retargeting', platform: 'meta', status: 'active', budget: 150, roas: 3.2, spend: 4500 },
    { id: 2, name: 'Brand Awareness - TV Spot', platform: 'tv', status: 'active', budget: 500, roas: 1.8, spend: 12000 },
    { id: 3, name: 'Competitor Conquesting', platform: 'google', status: 'paused', budget: 100, roas: 2.1, spend: 800 },
    { id: 4, name: 'Product Demo - YouTube', platform: 'google', status: 'active', budget: 200, roas: 2.5, spend: 5000 },
];

const TV_INVENTORY = [
    { id: 'sports', name: 'Live Sports', description: 'ESPN, Fox Sports, NBC', cpm: 35 },
    { id: 'news', name: 'News', description: 'CNN, Fox News, MSNBC', cpm: 25 },
    { id: 'entertainment', name: 'Entertainment', description: 'Hulu, Tubi, Peacock', cpm: 20 },
    { id: 'lifestyle', name: 'Lifestyle', description: 'HGTV, Food Network, TLC', cpm: 18 },
];

const PaidMedia = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'builder' | 'analytics'>('dashboard');

    return (
        <div className="space-y-6">
            {/* Header Tabs */}
            <div className="flex space-x-4 border-b border-surface-border pb-1">
                <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`pb-3 px-2 flex items-center gap-2 transition-colors ${activeTab === 'dashboard' ? 'border-b-2 border-brand-purple text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                    <LayoutDashboard className="w-4 h-4" /> Command Center
                </button>
                <button
                    onClick={() => setActiveTab('builder')}
                    className={`pb-3 px-2 flex items-center gap-2 transition-colors ${activeTab === 'builder' ? 'border-b-2 border-brand-pink text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                    <Plus className="w-4 h-4" /> Campaign Builder
                </button>
                <button
                    onClick={() => setActiveTab('analytics')}
                    className={`pb-3 px-2 flex items-center gap-2 transition-colors ${activeTab === 'analytics' ? 'border-b-2 border-brand-gold text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                    <BarChart3 className="w-4 h-4" /> TV Lift Analytics
                </button>
            </div>

            {/* Content Area */}
            <div className="min-h-[600px] animate-in fade-in duration-300">
                {activeTab === 'dashboard' && <DashboardView onBuildClick={() => setActiveTab('builder')} />}
                {activeTab === 'builder' && <CampaignWizard />}
                {activeTab === 'analytics' && <AnalyticsView />}
            </div>
        </div>
    );
};

// --- Screen 1: Command Center ---
const DashboardView = ({ onBuildClick }: { onBuildClick: () => void }) => {
    return (
        <div className="space-y-8">
            {/* KPI Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPIWidget
                    title="Total Ad Spend"
                    value="$22,300"
                    change="+12%"
                    icon={<DollarSign className="w-5 h-5 text-green-400" />}
                    subtext="Aggregated across channels"
                />
                <KPIWidget
                    title="Blended ROAS"
                    value="2.8x"
                    change="+0.3"
                    icon={<TrendingUp className="w-5 h-5 text-brand-purple" />}
                    subtext="Return on Ad Spend"
                />
                <KPIWidget
                    title="CAC"
                    value="$45.20"
                    change="-5%"
                    icon={<Users className="w-5 h-5 text-blue-400" />}
                    subtext="Customer Acquisition Cost"
                />
                <KPIWidget
                    title="TV Lift"
                    value="+1,200"
                    change="Visits"
                    icon={<Tv className="w-5 h-5 text-brand-pink" />}
                    subtext="24h Website Visits after TV View"
                />
            </div>

            {/* Campaign Master Table */}
            <div className="bg-surface-dark border border-brand-purple rounded-xl overflow-hidden shadow-lg shadow-brand-purple/5">
                <div className="p-6 border-b border-surface-border flex justify-between items-center bg-surface-card">
                    <h3 className="font-bold text-white text-lg">Active Campaigns</h3>
                    <button
                        onClick={onBuildClick}
                        className="px-4 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> New Campaign
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-surface-dark text-xs uppercase font-bold text-slate-500">
                            <tr>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Campaign Name</th>
                                <th className="px-6 py-4">Platform</th>
                                <th className="px-6 py-4">Daily Budget</th>
                                <th className="px-6 py-4">ROAS</th>
                                <th className="px-6 py-4">Total Spend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-border">
                            {CAMPAIGNS.map((campaign) => (
                                <tr key={campaign.id} className="hover:bg-surface-hover/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className={`flex items-center gap-2 font-bold ${campaign.status === 'active' ? 'text-green-400' : 'text-slate-500'}`}>
                                            <span className={`w-2 h-2 rounded-full ${campaign.status === 'active' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-slate-500'}`}></span>
                                            {campaign.status === 'active' ? 'On' : 'Off'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white">{campaign.name}</td>
                                    <td className="px-6 py-4">
                                        <PlatformBadge platform={campaign.platform} />
                                    </td>
                                    <td className="px-6 py-4 font-mono text-white">${campaign.budget}</td>
                                    <td className="px-6 py-4 font-mono text-brand-gold">{campaign.roas}x</td>
                                    <td className="px-6 py-4 font-mono text-slate-300">${campaign.spend.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- Screen 2: Campaign Wizard ---
const CampaignWizard = () => {
    const [step, setStep] = useState(1);
    const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

    const toggleChannel = (id: string) => {
        setSelectedChannels(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    return (
        <div className="bg-surface-dark border border-surface-border rounded-xl overflow-hidden min-h-[600px] flex flex-col">
            {/* Wizard Progress */}
            <div className="bg-surface-card p-6 border-b border-surface-border">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">
                        {step === 1 && "Start a New Campaign"}
                        {step === 2 && "Target Audience"}
                        {step === 3 && "Inventory Selection"}
                        {step === 4 && "Creative Setup"}
                    </h2>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`h-2 w-12 rounded-full transition-all ${i <= step ? 'bg-gradient-to-r from-brand-pink to-brand-purple' : 'bg-surface-border'}`}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Wizard Body */}
            <div className="p-8 flex-1 overflow-y-auto">
                {step === 1 && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-white mb-2">Where do you want to appear?</h3>
                            <p className="text-slate-400">Select one or multiple channels for this campaign.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <ChannelCard
                                id="social"
                                title="Social Feed"
                                icon={<Facebook className="w-8 h-8" />}
                                description="Meta (FB/IG) & TikTok"
                                selected={selectedChannels.includes('social')}
                                onClick={() => toggleChannel('social')}
                            />
                            <ChannelCard
                                id="search"
                                title="Paid Search"
                                icon={<Search className="w-8 h-8" />}
                                description="Google Search Ads"
                                selected={selectedChannels.includes('search')}
                                onClick={() => toggleChannel('search')}
                            />
                            <ChannelCard
                                id="tv"
                                title="Streaming TV"
                                icon={<Tv className="w-8 h-8" />}
                                description="Hulu, ESPN, Disney+"
                                selected={selectedChannels.includes('tv')}
                                onClick={() => toggleChannel('tv')}
                                isNew
                            />
                        </div>

                        {selectedChannels.includes('tv') && (
                            <div className="max-w-xl mx-auto bg-brand-purple/10 border border-brand-purple/30 rounded-lg p-4 flex items-start gap-3 animate-in fade-in zoom-in-95">
                                <div className="mt-1 bg-brand-purple text-white p-1 rounded">
                                    <Target className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">TV Retargeting Active</h4>
                                    <p className="text-sm text-slate-300">We will automatically show TV ads to people who have visited your website in the last 30 days (CRM Targeting).</p>
                                </div>
                                <div className="ml-auto">
                                    <div className="w-10 h-6 bg-brand-purple rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {step === 2 && (
                    <div className="h-full flex flex-col animate-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                            <div className="lg:col-span-2 bg-slate-800 rounded-xl relative overflow-hidden group border border-surface-border">
                                {/* Mock Map */}
                                <div className="absolute inset-0 bg-slate-700 opacity-50 flex items-center justify-center">
                                    <span className="text-slate-500">Map Interface Loading...</span>
                                </div>
                                {/* Visual styling for "fake" map */}
                                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Map_of_Los_Angeles_%28neighborhoods%29.svg/2000px-Map_of_Los_Angeles_%28neighborhoods%29.svg.png')] bg-cover bg-center grayscale opacity-20"></div>

                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="w-64 h-64 border-4 border-brand-purple/30 rounded-full flex items-center justify-center animate-pulse bg-brand-purple/10">
                                        <div className="w-32 h-32 border-2 border-brand-purple rounded-full flex items-center justify-center bg-brand-purple/20">
                                            <MapPin className="w-8 h-8 text-brand-purple drop-shadow-lg" />
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-6 left-6 right-6 bg-surface-card/90 backdrop-blur p-4 rounded-xl border border-surface-border shadow-2xl">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-bold text-slate-300 whitespace-nowrap">Target Radius: 5 miles</span>
                                        <input type="range" className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-brand-purple" />
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur border border-white/20 p-2 rounded-lg text-xs font-bold text-white flex items-center gap-2 cursor-pointer hover:bg-white/20 transition-colors">
                                    <MapPin className="w-4 h-4 text-brand-pink" /> Drop Rooftop Pin
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                        <Users className="w-5 h-5 text-brand-gold" /> Audience Segments
                                    </h3>
                                    <div className="space-y-3">
                                        {['Household Income > $100k', 'Interest in Marketing', 'Small Business Owners', 'Lookalike (1%)'].map((seg) => (
                                            <label key={seg} className="flex items-center gap-3 p-3 rounded-lg bg-surface-card border border-surface-border hover:border-brand-purple cursor-pointer transition-colors group">
                                                <div className="w-5 h-5 rounded border border-slate-500 group-hover:border-brand-purple flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-brand-purple rounded-sm opacity-0 group-hover:opacity-50"></div>
                                                </div>
                                                <span className="text-sm text-slate-300">{seg}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                    <h4 className="font-bold text-blue-400 text-sm mb-2">Vibe Rooftop Targeting</h4>
                                    <p className="text-xs text-slate-400">Target specific buildings by dropping a pin. Ideal for competitor locations or conference centers.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="max-w-4xl mx-auto animate-in slide-in-from-right-4 duration-300">
                        <h3 className="text-2xl font-bold text-white mb-6">TV Inventory Selection</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {TV_INVENTORY.map((inv) => (
                                <div key={inv.id} className="bg-surface-card border border-surface-border p-6 rounded-xl flex items-start gap-4 hover:border-brand-purple transition-all cursor-pointer group">
                                    <div className="w-6 h-6 rounded border-2 border-slate-500 mt-1 flex items-center justify-center group-hover:border-brand-purple group-hover:bg-brand-purple transition-colors">
                                        <CheckCircle className="w-4 h-4 text-white opacity-0 group-hover:opacity-100" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">{inv.name}</h4>
                                        <p className="text-slate-400 text-sm mb-2">{inv.description}</p>
                                        <span className="inline-block bg-surface-dark border border-surface-border px-2 py-1 rounded text-xs font-mono text-brand-gold">CPM: ${inv.cpm}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="max-w-4xl mx-auto animate-in slide-in-from-right-4 duration-300">
                        <h3 className="text-2xl font-bold text-white mb-6">The Creative Bay</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="aspect-video bg-surface-card border-2 border-dashed border-surface-border rounded-xl flex flex-col items-center justify-center p-8 hover:bg-surface-hover hover:border-brand-purple transition-all cursor-pointer group">
                                <div className="w-16 h-16 bg-surface-dark rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <LayoutDashboard className="w-8 h-8 text-slate-400 group-hover:text-brand-purple" />
                                </div>
                                <h4 className="font-bold text-white text-lg">Select from Creative Studio</h4>
                                <p className="text-slate-500 text-center text-sm mt-2">Use an existing asset from your approved library.</p>
                            </div>

                            <div className="aspect-video bg-gradient-to-br from-brand-purple/20 to-brand-pink/20 border-2 border-brand-pink/50 rounded-xl flex flex-col items-center justify-center p-8 hover:scale-[1.02] transition-transform cursor-pointer shadow-lg shadow-brand-pink/10 relative overflow-hidden">
                                <div className="absolute inset-0 bg-noise opacity-10"></div>
                                <div className="w-16 h-16 bg-brand-pink rounded-full flex items-center justify-center mb-4 shadow-lg shadow-brand-pink/40 animate-pulse">
                                    <Play className="w-8 h-8 text-white ml-1" />
                                </div>
                                <h4 className="font-bold text-white text-lg">Generate with Google Flow</h4>
                                <p className="text-brand-pink/80 text-center text-sm mt-2 px-8">Auto-reformat approved scripts to 16:9 TV Commercials with QR Codes.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Wizard Footer */}
            <div className="p-6 border-t border-surface-border bg-surface-dark flex justify-between">
                <button
                    onClick={() => step > 1 && setStep(s => s - 1)}
                    className={`px-6 py-2 rounded-lg font-bold text-slate-400 hover:text-white transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                >
                    Back
                </button>
                <button
                    onClick={() => {
                        if (step < 4) setStep(s => s + 1);
                        else alert("Campaign Launched! (Demo)");
                    }}
                    className="px-8 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-lg shadow-lg hover:shadow-brand-purple/25 transition-all flex items-center gap-2"
                >
                    {step === 4 ? 'Launch Campaign' : 'Next Step'} <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

// --- Screen 3: TV Lift Analytics ---
const AnalyticsView = () => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Path to Purchase Visualizer */}
                <div className="bg-surface-dark border border-surface-border rounded-xl p-6">
                    <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-brand-gold" /> Path to Purchase Funnel
                    </h3>

                    <div className="space-y-6 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-brand-purple via-brand-pink to-green-400 -z-10 opacity-50"></div>

                        <FunnelStep
                            icon={<Tv className="w-5 h-5 text-white" />}
                            color="bg-brand-purple"
                            label="TV Impressions"
                            count="45,000"
                            desc="Households reached via ESPN/Hulu"
                        />
                        <FunnelStep
                            icon={<Globe className="w-5 h-5 text-white" />}
                            color="bg-brand-pink"
                            label="Site Visits (Lift)"
                            count="1,200"
                            desc="Mobile visit within 24h of Ad"
                            percentage="2.6%"
                        />
                        <FunnelStep
                            icon={<DollarSign className="w-5 h-5 text-white" />}
                            color="bg-green-500"
                            label="Conversions"
                            count="85"
                            desc="Purchases attributed to TV Lift"
                            percentage="7.1%"
                        />
                    </div>
                </div>

                {/* Channel Performance Heatmap */}
                <div className="bg-surface-dark border border-surface-border rounded-xl p-6">
                    <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-400" /> Channel Performance Heatmap
                    </h3>
                    <div className="space-y-6">
                        <PerformanceBar
                            channel="Streaming TV"
                            cpa={42}
                            cpm={22}
                            color="bg-purple-500"
                        />
                        <PerformanceBar
                            channel="Meta (FB/IG)"
                            cpa={58}
                            cpm={15}
                            color="bg-blue-500"
                        />
                        <PerformanceBar
                            channel="LinkedIn"
                            cpa={120}
                            cpm={85}
                            color="bg-blue-700"
                        />
                        <PerformanceBar
                            channel="Google Search"
                            cpa={65}
                            cpm={45}
                            color="bg-green-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Sub-components ---

const KPIWidget = ({ title, value, change, icon, subtext }: any) => (
    <div className="bg-surface-dark border border-brand-purple rounded-xl p-5 hover:border-brand-purple transition-colors cursor-default group">
        <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-surface-card rounded-lg border border-surface-border group-hover:bg-surface-hover transition-colors">
                {icon}
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded ${change.includes('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {change}
            </span>
        </div>
        <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</h4>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <p className="text-xs text-slate-500">{subtext}</p>
    </div>
);

const PlatformBadge = ({ platform }: { platform: string }) => {
    switch (platform) {
        case 'meta': return <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20"><Facebook className="w-3 h-3" /> Meta</span>;
        case 'tv': return <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-brand-pink/10 text-brand-pink text-xs font-bold border border-brand-pink/20"><Tv className="w-3 h-3" /> Vibe TV</span>;
        case 'google': return <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20"><Globe className="w-3 h-3" /> Google</span>;
        default: return <span className="text-xs text-slate-500">{platform}</span>;
    }
};

const ChannelCard = ({ title, icon, description, selected, onClick, isNew }: any) => (
    <div
        onClick={onClick}
        className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center text-center gap-4 group ${selected ? 'bg-brand-purple/10 border-brand-purple shadow-lg shadow-brand-purple/10' : 'bg-surface-card border-surface-border hover:border-slate-500'}`}
    >
        {isNew && <span className="absolute top-3 right-3 bg-brand-gold text-surface-dark text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">New</span>}
        <div className={`p-4 rounded-full transition-colors ${selected ? 'bg-brand-purple text-white' : 'bg-surface-dark text-slate-400 group-hover:text-white'}`}>
            {icon}
        </div>
        <div>
            <h4 className={`font-bold text-lg ${selected ? 'text-white' : 'text-slate-300'}`}>{title}</h4>
            <p className="text-sm text-slate-500">{description}</p>
        </div>
    </div>
);

const FunnelStep = ({ icon, color, label, count, desc, percentage }: any) => (
    <div className="flex items-center gap-4 relative z-0">
        <div className={`w-12 h-12 rounded-full ${color} shadow-lg flex items-center justify-center border-4 border-surface-dark shrink-0`}>
            {icon}
        </div>
        <div className="flex-1 bg-surface-card border border-surface-border p-4 rounded-xl flex justify-between items-center group hover:bg-surface-hover transition-colors">
            <div>
                <h4 className="font-bold text-white">{label}</h4>
                <p className="text-xs text-slate-400">{desc}</p>
            </div>
            <div className="text-right">
                <div className="text-xl font-bold text-white">{count}</div>
                {percentage && <div className="text-xs font-bold text-brand-gold">{percentage} Conv.</div>}
            </div>
        </div>
    </div>
);

const PerformanceBar = ({ channel, cpa, cpm, color }: any) => (
    <div>
        <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-white">{channel}</span>
            <div className="text-xs text-slate-400 flex gap-4">
                <span>CPA: <b className="text-white">${cpa}</b></span>
                <span>CPM: <b className="text-white">${cpm}</b></span>
            </div>
        </div>
        <div className="h-2 bg-surface-hover rounded-full overflow-hidden flex">
            {/* Visual representation - not exact scale, just for effect */}
            <div className={`h-full ${color} opacity-80`} style={{ width: `${Math.min(cpa, 100)}%` }} title="CPA Metric"></div>
            <div className={`h-full ${color} opacity-40`} style={{ width: `${Math.min(cpm / 2, 50)}%` }} title="CPM Metric"></div>
        </div>
    </div>
);

export default PaidMedia;
