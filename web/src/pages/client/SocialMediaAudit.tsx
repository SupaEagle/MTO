import { useState } from 'react';
import {
    Search,
    Instagram,
    Youtube,
    Hash,
    Type,
    Image as ImageIcon,
    CheckCircle,
    AlertTriangle,
    RefreshCw,
    Eye,
    Copy,
    Smartphone,
    Users,
    Link as LinkIcon,
    Lightbulb
} from 'lucide-react';

// Custom TikTok Icon since it's not in Lucide regular set often, or we reuse the one we made before if accessible, 
// but for a standalone page it's safer to re-declare or use a generic if not exported.
// I'll declare it locally to be safe and consistent.
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const SocialMediaAudit = () => {
    const [activeTab, setActiveTab] = useState<'audit' | 'research' | 'optimize'>('audit');
    const [keywordInput, setKeywordInput] = useState('');
    const [researchResult, setResearchResult] = useState(false);
    const [profileUrl, setProfileUrl] = useState('https://instagram.com/mansatina');

    // Mock Data
    const profileAudit = {
        score: 72,
        issues: [
            { id: 1, type: 'critical', field: 'Name Field', current: 'Mansa Tina', recommended: 'Mansa Tina | Marketing Strategy', reason: 'Instagram indexes the Name field for search.' },
            { id: 2, type: 'warning', field: 'Bio Keywords', current: 'We help you grow.', recommended: 'Growth Agency for Dentists & Realtors...', reason: 'Missing core "Money Keywords" for indexing.' },
            { id: 3, type: 'check', field: 'Link-in-Bio', current: 'linktr.ee/mansatina', recommended: 'Optimized', reason: 'Link text matches search intent.' }
        ]
    };

    const suggestions = [
        { id: 1, title: 'Update Name Field', desc: 'Add "Marketing Strategy" to your name to appear in search results.', impact: 'High' },
        { id: 2, title: 'Rewrite Bio', desc: 'Include keywords like "Growth Agency", "Dentists", and "Realtors" in your bio.', impact: 'Medium' },
    ];

    const researchData = {
        tiktok: [
            { term: 'Luxury travel on a budget 2025', volume: 'High', type: 'Suggestion' },
            { term: 'Cheap luxury hotels', volume: 'Medium', type: 'Related' },
            { term: 'Hidden gem destinations', volume: 'High', type: 'Trend' },
        ],
        instagram: [
            { term: '#LuxuryTravel', count: '10M+', type: 'Broad' },
            { term: '#BudgetLuxury', count: '150k', type: 'Niche' },
            { term: '#TravelHacks2025', count: '5k', type: 'Opportunity' },
        ],
        youtube: [
            { term: 'How to travel luxury for cheap', difficulty: 'Low', views: '50k avg' },
            { term: 'Best luxury resorts 2025', difficulty: 'Med', views: '120k avg' },
        ]
    };

    const handleSearch = () => {
        if (!keywordInput) return;
        setResearchResult(true);
    };

    return (
        <div className="space-y-8 pb-20 relative">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Social Media Audit</h2>
                <p className="text-slate-400">Optimize social profiles to rank for search terms on TikTok, Instagram, and YouTube.</p>
            </div>

            {/* Profile URL Input */}
            <div className="bg-surface-dark p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-4 items-end md:items-center">
                <div className="flex-1 w-full">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Social Media Profile Link</label>
                    <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                        <LinkIcon className="w-5 h-5 text-brand-purple" />
                        <input
                            type="text"
                            value={profileUrl}
                            onChange={(e) => setProfileUrl(e.target.value)}
                            className="bg-transparent text-white font-bold w-full focus:outline-none"
                            placeholder="https://instagram.com/yourusername"
                        />
                    </div>
                </div>
                <button className="px-6 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap">
                    <RefreshCw className="w-4 h-4" /> Run Audit
                </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <button
                    onClick={() => setActiveTab('audit')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'audit' ? 'bg-brand-purple text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    Profile Optimizer
                </button>
                <button
                    onClick={() => setActiveTab('research')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'research' ? 'bg-brand-purple text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    Keyword Research
                </button>
                <button
                    onClick={() => setActiveTab('optimize')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'optimize' ? 'bg-brand-purple text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    Metadata & Alt-Text
                </button>
            </div>

            {/* CONTENT ZONES */}

            {/* ZONE 1: PROFILE OPTIMIZER */}
            {activeTab === 'audit' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Visual Profile Audit */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Users className="w-5 h-5 text-brand-purple" /> Profile "On-Page" Audit
                            </h3>
                            <div className="text-2xl font-bold text-yellow-400">{profileAudit.score}/100</div>
                        </div>

                        <div className="space-y-4">
                            {profileAudit.issues.map((issue) => (
                                <div key={issue.id} className="p-4 bg-surface-dark rounded-xl border border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            {issue.type === 'critical' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                                            {issue.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                                            {issue.type === 'check' && <CheckCircle className="w-4 h-4 text-green-400" />}
                                            <span className="text-sm font-bold text-white">{issue.field}</span>
                                        </div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${issue.type === 'critical' ? 'bg-red-500/10 text-red-400' : issue.type === 'warning' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-green-500/10 text-green-400'}`}>
                                            {issue.type === 'critical' ? 'Action Needed' : issue.type === 'warning' ? 'Improvement' : 'Optimized'}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                                        <div>
                                            <span className="block text-[10px] uppercase text-slate-500 font-bold">Current</span>
                                            <span className="text-red-300 line-through decoration-red-500/50">{issue.current}</span>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] uppercase text-slate-500 font-bold">Recommended</span>
                                            <span className="text-green-400 font-bold">{issue.recommended}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-400 italic">Why: {issue.reason}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Suggestions + Competitor Spy */}
                    <div className="space-y-8">
                        {/* Actionable Suggestions */}
                        <div className="glass-panel p-6 rounded-2xl border border-white/10">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                                <Lightbulb className="w-5 h-5 text-yellow-400" /> Strategic Suggestions
                            </h3>
                            <div className="space-y-3">
                                {suggestions.map((rec) => (
                                    <div key={rec.id} className="flex gap-4 p-4 bg-surface-dark rounded-xl border border-white/5 hover:border-brand-purple/30 transition-colors cursor-pointer group">
                                        <div className="mt-1">
                                            <div className="w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple text-xs font-bold group-hover:bg-brand-purple group-hover:text-white transition-colors">
                                                {rec.id}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-sm font-bold text-white">{rec.title}</h4>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${rec.impact === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                    {rec.impact} Impact
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-400">{rec.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Competitor Keyword Spy */}
                        <div className="glass-panel p-6 rounded-2xl border border-white/10">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                                <Eye className="w-5 h-5 text-brand-purple" /> Competitor Keyword Spy
                            </h3>
                            <div className="p-4 bg-brand-purple/10 border border-brand-purple/20 rounded-xl mb-6">
                                <h4 className="text-sm font-bold text-white mb-2">Gap Analysis Insight</h4>
                                <p className="text-sm text-slate-300">
                                    The top 3 ranking accounts for "Miami Realtor" all use the word <span className="text-white font-bold bg-brand-purple/50 px-1 rounded">Strategist</span> in their name field. You should add it.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-slate-400 uppercase">Top Ranking Profiles Analyzed</h4>
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-surface-dark rounded-lg">
                                        <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                                        <div>
                                            <div className="text-sm font-bold text-white">Competitor {i}</div>
                                            <div className="text-xs text-slate-400">Uses "Strategist" • "Market Expert"</div>
                                        </div>
                                        <div className="ml-auto text-green-400 text-xs font-bold">Rank #{i}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ZONE 2: PLATFORM KEYWORD RESEARCH */}
            {activeTab === 'research' && (
                <div className="space-y-6">
                    {/* Search Bar */}
                    <div className="flex items-center gap-4 bg-surface-dark p-4 rounded-xl border border-white/10">
                        <Search className="w-6 h-6 text-slate-400" />
                        <input
                            type="text"
                            value={keywordInput}
                            onChange={(e) => setKeywordInput(e.target.value)}
                            className="flex-1 bg-transparent text-white font-bold text-lg focus:outline-none placeholder:text-slate-600"
                            placeholder="Type a topic (e.g. 'Luxury Travel', 'Skin Care')"
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button
                            onClick={handleSearch}
                            className="px-6 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-lg transition-colors"
                        >
                            Find Keywords
                        </button>
                    </div>

                    {researchResult ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
                            {/* TikTok Column */}
                            <div className="glass-panel p-5 rounded-xl border border-white/10">
                                <div className="flex items-center gap-2 mb-4 text-white">
                                    <TikTokIcon className="w-5 h-5" />
                                    <h3 className="font-bold">TikTok Search</h3>
                                </div>
                                <div className="space-y-3">
                                    {researchData.tiktok.map((item, i) => (
                                        <div key={i} className="group p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-white/5">
                                            <div className="flex justify-between items-start">
                                                <span className="text-sm text-slate-200 font-medium group-hover:text-brand-pink transition-colors">{item.term}</span>
                                                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">{item.volume}</span>
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1">{item.type}</div>
                                        </div>
                                    ))}
                                </div>
                                {/* TikTok Search Bar Injection Tip */}
                                <div className="mt-6 p-3 bg-black/40 rounded-lg border border-white/10">
                                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase">
                                        <Type className="w-3 h-3" /> On-Screen Text Tip
                                    </div>
                                    <p className="text-xs text-slate-300 italic">
                                        "Add text overlay: '<span className="text-white not-italic font-bold">How to find luxury travel deals</span>' for the first 3 seconds."
                                    </p>
                                </div>
                            </div>

                            {/* Instagram Column */}
                            <div className="glass-panel p-5 rounded-xl border border-white/10">
                                <div className="flex items-center gap-2 mb-4 text-pink-400">
                                    <Instagram className="w-5 h-5" />
                                    <h3 className="font-bold">Instagram Topics</h3>
                                </div>
                                <div className="space-y-3">
                                    {researchData.instagram.map((item, i) => (
                                        <div key={i} className="group p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-white/5">
                                            <div className="flex justify-between items-start">
                                                <span className="text-sm text-slate-200 font-medium group-hover:text-pink-400 transition-colors">{item.term}</span>
                                                <span className="text-[10px] bg-pink-500/10 text-pink-400 px-2 py-0.5 rounded">{item.count}</span>
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1">{item.type}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* YouTube Column */}
                            <div className="glass-panel p-5 rounded-xl border border-white/10">
                                <div className="flex items-center gap-2 mb-4 text-red-500">
                                    <Youtube className="w-5 h-5" />
                                    <h3 className="font-bold">YouTube Trends</h3>
                                </div>
                                <div className="space-y-3">
                                    {researchData.youtube.map((item, i) => (
                                        <div key={i} className="group p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-white/5">
                                            <div className="flex justify-between items-start">
                                                <span className="text-sm text-slate-200 font-medium group-hover:text-red-400 transition-colors">{item.term}</span>
                                                <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded">{item.difficulty} Comp</span>
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1">{item.views}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-surface-dark/50 rounded-2xl border border-dashed border-white/10">
                            <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Discovery Engine Idle</h3>
                            <p className="text-slate-400 max-w-md mx-auto">
                                Type a topic above to scrape TikTok, Instagram, and YouTube search bars for real-time trending keywords.
                            </p>
                        </div>
                    )}

                    {researchResult && (
                        <div className="flex justify-end">
                            <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                <Copy className="w-4 h-4" /> Create Content Plan
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ZONE 3: META & ALT TEXT */}
            {activeTab === 'optimize' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Hashtag Ladder */}
                    <div className="lg:col-span-1 glass-panel p-6 rounded-2xl border border-white/10">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                            <Hash className="w-5 h-5 text-brand-purple" /> Hashtag Ladder
                        </h3>
                        <p className="text-xs text-slate-400 mb-4">
                            Optimized mix to maximize reach on Explore pages.
                        </p>

                        <div className="space-y-4">
                            <div className="p-3 bg-surface-dark rounded-lg border border-white/5">
                                <div className="text-xs font-bold text-slate-500 uppercase mb-2">Broad Tags (1M+)</div>
                                <div className="flex flex-wrap gap-2">
                                    {['#RealEstate', '#LuxuryLife', '#HomeDecor'].map(t => (
                                        <span key={t} className="text-xs bg-slate-800 text-white px-2 py-1 rounded">{t}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-3 bg-surface-dark rounded-lg border border-white/5">
                                <div className="text-xs font-bold text-brand-purple uppercase mb-2">Niche Tags (50k-500k)</div>
                                <div className="flex flex-wrap gap-2">
                                    {['#MiamiCondos', '#WaterfrontLiving', '#InvestInMiami'].map(t => (
                                        <span key={t} className="text-xs bg-brand-purple/20 text-brand-purple px-2 py-1 rounded border border-brand-purple/30">{t}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-3 bg-surface-dark rounded-lg border border-white/5">
                                <div className="text-xs font-bold text-green-400 uppercase mb-2">Location/Specific</div>
                                <div className="flex flex-wrap gap-2">
                                    {['#BrickellLiving', '#DowntownMiami', '#Zip33131'].map(t => (
                                        <span key={t} className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description & Alt Text Generator */}
                    <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                            <ImageIcon className="w-5 h-5 text-brand-purple" /> Invisible SEO Generator
                        </h3>

                        <div className="flex gap-6">
                            {/* Image Preview (Mock) */}
                            <div className="w-1/3 aspect-[9/16] bg-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <span className="relative z-10 text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                    <Smartphone className="w-4 h-4" /> Preview
                                </span>
                            </div>

                            {/* Generation Controls */}
                            <div className="flex-1 space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-bold text-white">Generated Alt-Text</label>
                                        <span className="text-[10px] text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/20">Computer Vision Analysis</span>
                                    </div>
                                    <div className="p-3 bg-surface-dark rounded-lg border border-white/10 text-sm text-slate-300">
                                        Woman applying moisturizing cream for dry skin in a bright bathroom with marble countertops.
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">
                                        *Helps algorithm categorize content.
                                    </p>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-bold text-white">Hidden Keywords (Caption Footer)</label>
                                        <button className="text-xs text-white hover:text-brand-purple transition-colors flex items-center gap-1">
                                            <RefreshCw className="w-3 h-3" /> Regenerate
                                        </button>
                                    </div>
                                    <div className="p-3 bg-surface-dark rounded-lg border border-white/10 text-xs text-slate-400 font-mono">
                                        ...<br />
                                        <span className="text-slate-600">
                                            Keywords: skincare routine, dry skin tips, winter skincare, best moisturizer 2025, glass skin hack
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/10 transition-colors">
                                    Apply to All Drafts
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialMediaAudit;
