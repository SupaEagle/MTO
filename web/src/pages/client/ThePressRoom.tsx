import { useState } from 'react';
import {
    Newspaper,
    Zap,
    PenTool,
    Send,
    Globe,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Clock,
    Mail,
    Search,
    Filter,
    Edit3,
    Layout,
    Users,
    ArrowRight
} from 'lucide-react';

const ThePressRoom = () => {
    // Current Workflow Step
    const [activeZone, setActiveZone] = useState<1 | 2 | 3 | 4>(1);

    // State for Zone 1: Monitor
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    // State for Zone 2: Strategy
    const [selectedHotTake, setSelectedHotTake] = useState<string | null>(null);

    // State for Zone 3: Draft
    const [emailSubject, setEmailSubject] = useState("The IRS just came for your Bitcoin (Here's the fix)");
    const [emailBody, setEmailBody] = useState("Most crypto investors think they are safe. They aren't.\n\nThe new ruling (Letter 2025-A) changes everything specifically for staking rewards.\n\nBut here is the silver lining...");

    // Mock Data: News Items
    const newsItems = [
        {
            id: 1,
            source: 'TechCrunch',
            title: 'New Tax Law: IRS targets staking rewards in 2025 update',
            relevance: 'High',
            sentiment: 'Anxiety',
            timestamp: '2h ago'
        },
        {
            id: 2,
            source: 'Wall Street Journal',
            title: 'Bitcoin surges past $120k as ETFs see record inflows',
            relevance: 'Medium',
            sentiment: 'Excitement',
            timestamp: '45m ago'
        },
        {
            id: 3,
            source: 'CoinDesk',
            title: 'Major exchange freezes withdrawals due to "technical" glitch',
            relevance: 'High',
            sentiment: 'Fear',
            timestamp: '15m ago'
        }
    ];

    // Mock Data: Hot Takes
    const hotTakes = [
        {
            id: 'curator',
            type: 'The Curator',
            title: '5 links you need to see',
            desc: 'Quick summary of the chaos + our specific advice.'
        },
        {
            id: 'deep-dive',
            type: 'The Deep Dive',
            title: 'Why everyone is wrong',
            desc: 'Contrarian take: This ruling is actually good for long-term holders.'
        },
        {
            id: 'case-study',
            type: 'The Case Study',
            title: 'How we handled this',
            desc: 'Showcase a client who pre-empted this last month.'
        }
    ];

    const handleZoneChange = (zone: 1 | 2 | 3 | 4) => {
        setActiveZone(zone);
    };

    return (
        <div className="space-y-8 pb-20 relative">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                        <Newspaper className="w-8 h-8 text-brand-purple" /> The Press Room
                    </h2>
                    <p className="text-slate-400">Always-On Editor-in-Chief. Monitor, Curate, and Publish.</p>
                </div>
                {/* News-Jacking Alert System */}
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 font-bold animate-pulse hover:bg-red-500/20 transition-all"
                    onClick={() => alert("🚨 TRIGGERING NEWS-JACKING MODE: Skipping to Draft with 'Emergency' Template.")}
                >
                    <Zap className="w-4 h-4 fill-red-400" /> Emergency Opportunity Active
                </button>
            </div>

            {/* Workflow Stepper */}
            <div className="flex items-center gap-2 bg-surface-dark p-2 rounded-xl border border-white/10 w-fit">
                {[
                    { id: 1, name: 'Monitor', icon: Globe },
                    { id: 2, name: 'Curate', icon: Filter },
                    { id: 3, name: 'Draft', icon: PenTool },
                    { id: 4, name: 'Distribute', icon: Send },
                ].map((step) => (
                    <button
                        key={step.id}
                        onClick={() => handleZoneChange(step.id as any)}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all
                            ${activeZone === step.id
                                ? 'bg-brand-purple text-white shadow-lg'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }
                        `}
                    >
                        <step.icon className="w-4 h-4" /> {step.name}
                    </button>
                ))}
            </div>

            {/* ZONE 1: THE NEWS DESK */}
            {activeZone === 1 && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                        {/* Feed Source Config */}
                        <div className="lg:col-span-1 bg-surface-dark border border-white/10 rounded-2xl p-6 flex flex-col">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Search className="w-5 h-5 text-brand-purple" /> Industry Watchdog
                            </h3>
                            <div className="space-y-4 mb-6">
                                <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Active Sources</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['TechCrunch', 'WSJ', 'CoinDesk', 'IRS.gov'].map(s => (
                                            <span key={s} className="text-xs bg-slate-800 text-white px-2 py-1 rounded border border-white/10">{s}</span>
                                        ))}
                                        <button className="text-xs text-brand-purple px-2 py-1">+ Add</button>
                                    </div>
                                </div>
                                <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Misery/Miracle Filters</label>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20">Tax Anxiety</span>
                                        <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20">Wealth Protection</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto p-4 bg-brand-purple/10 border border-brand-purple/20 rounded-xl">
                                <h4 className="text-sm font-bold text-white mb-1">24/7 Monitoring Active</h4>
                                <p className="text-xs text-slate-400">AI is scanning 142 articles per hour for relevance.</p>
                            </div>
                        </div>

                        {/* Recent News Feed */}
                        <div className="lg:col-span-2 space-y-4 overflow-y-auto">
                            {newsItems.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedTopic(item.title)}
                                    className={`
                                        p-5 rounded-xl border cursor-pointer group transition-all
                                        ${selectedTopic === item.title
                                            ? 'bg-brand-purple/10 border-brand-purple'
                                            : 'bg-glass border-white/10 hover:border-brand-purple/50'
                                        }
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-slate-400 uppercase">{item.source}</span>
                                            <span className="text-[10px] text-slate-600">• {item.timestamp}</span>
                                        </div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${item.sentiment === 'Fear' || item.sentiment === 'Anxiety' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                                            {item.sentiment}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-brand-purple transition-colors">{item.title}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs bg-white/5 text-white px-2 py-1 rounded border border-white/10">Relevance: {item.relevance}</span>
                                        {selectedTopic === item.title && (
                                            <span className="text-xs font-bold text-brand-purple animate-pulse ml-auto">Selected for Curating</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {selectedTopic && (
                        <div className="flex justify-end">
                            <button
                                onClick={() => handleZoneChange(2)}
                                className="px-6 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center gap-2"
                            >
                                Curate This Topic <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ZONE 2: TOPIC ARCHITECT */}
            {activeZone === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                    <div className="bg-surface-dark border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-brand-purple/20 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-brand-purple" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">The "Hot Take" Generator</h3>
                                <p className="text-slate-400">Selected Topic: <span className="text-white font-medium">{selectedTopic || "Overview"}</span></p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {hotTakes.map((take) => (
                                <div
                                    key={take.id}
                                    onClick={() => setSelectedHotTake(take.id)}
                                    className={`
                                        p-6 rounded-xl border cursor-pointer transition-all relative overflow-hidden
                                        ${selectedHotTake === take.id
                                            ? 'bg-brand-purple text-white border-brand-purple ring-1 ring-white/20'
                                            : 'bg-glass border-white/10 hover:bg-surface-dark hover:border-white/20'
                                        }
                                    `}
                                >
                                    <div className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">{take.type}</div>
                                    <h4 className="text-lg font-bold mb-2">{take.title}</h4>
                                    <p className={`text-sm ${selectedHotTake === take.id ? 'text-white/80' : 'text-slate-400'}`}>{take.desc}</p>

                                    {selectedHotTake === take.id && (
                                        <div className="absolute top-2 right-2">
                                            <CheckCircle className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => handleZoneChange(3)}
                                disabled={!selectedHotTake}
                                className={`
                                    px-6 py-3 font-bold rounded-xl shadow-lg transition-colors flex items-center gap-2
                                    ${selectedHotTake ? 'bg-brand-purple text-white hover:bg-brand-purple/90' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
                                `}
                            >
                                Enter Drafting Table <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ZONE 3: DRAFTING TABLE */}
            {activeZone === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[650px]">
                        {/* Left: AI Writer */}
                        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col h-full">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Edit3 className="w-5 h-5 text-brand-purple" /> AI Editor
                            </h3>

                            {/* Subject Line Dojo */}
                            <div className="mb-4">
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Subject Line (Dojo Prediction: 42% Open Rate)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={emailSubject}
                                        onChange={(e) => setEmailSubject(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white font-bold focus:outline-none focus:border-brand-purple"
                                    />
                                    <button className="absolute right-2 top-2 p-1.5 bg-surface-dark border border-white/10 rounded hover:text-white text-slate-400">
                                        <Zap className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Body Editor */}
                            <div className="flex-1">
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Body Content</label>
                                <textarea
                                    value={emailBody}
                                    onChange={(e) => setEmailBody(e.target.value)}
                                    className="w-full h-full bg-black/20 border border-white/10 rounded-xl p-4 text-slate-300 leading-relaxed resize-none focus:outline-none focus:border-brand-purple font-serif"
                                />
                            </div>

                            {/* Spam Assassin */}
                            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0" />
                                <div>
                                    <h4 className="text-xs font-bold text-yellow-400">Spam Assassin Alert</h4>
                                    <p className="text-xs text-yellow-200/70">
                                        The phrase "Silver Lining" might trigger filters in Finance category. Consider "Opportunity".
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Visual Builder */}
                        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col h-full">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Layout className="w-5 h-5 text-brand-pink" /> Visual Preview
                            </h3>

                            <div className="flex-1 bg-white rounded-xl overflow-hidden shadow-2xl relative">
                                {/* Simulated Email Preview */}
                                <div className="h-40 bg-slate-200 relative overflow-hidden group">
                                    {/* Nano Banana Integration Header */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 flex items-center justify-center">
                                        <div className="text-center">
                                            <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">CRYPTO TAX <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">ALERT</span></h1>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2">
                                        <button className="text-xs bg-black/50 text-white px-2 py-1 rounded backdrop-blur">
                                            Regenerate Art
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-slate-900 mb-2">{emailSubject}</h2>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-slate-300"></div>
                                        <div className="text-xs text-slate-500 font-bold">Mansa Tina • Editor-in-Chief</div>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                                        {emailBody}
                                    </p>

                                    {/* Smart Blocks */}
                                    <div className="mt-6 p-4 bg-slate-100 rounded-lg border border-slate-200 text-center">
                                        <span className="text-xs font-bold text-slate-400 uppercase mb-2 block">Dynamic Block</span>
                                        <h4 className="text-lg font-bold text-slate-800">Need specific help?</h4>
                                        <button className="mt-2 px-6 py-2 bg-blue-600 text-white font-bold rounded">
                                            Book a Consult
                                        </button>
                                        <p className="text-[10px] text-slate-400 mt-2">*Visible to "Leads" only</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={() => handleZoneChange(4)}
                            className="px-6 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center gap-2"
                        >
                            Finalize & Distribute <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* ZONE 4: DISTRIBUTION CENTER */}
            {activeZone === 4 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                    <div className="max-w-2xl mx-auto glass-panel p-8 rounded-2xl border border-white/10 text-center">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Send className="w-8 h-8 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Ready to Publish?</h2>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">
                            The "News-Jacking" window is open. Speed is key.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
                            <div className="p-4 bg-surface-dark border border-white/5 rounded-xl">
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Smart Segment</label>
                                <div className="flex items-center gap-2 text-white font-bold">
                                    <Users className="w-4 h-4 text-brand-purple" /> High Openers (Active)
                                </div>
                            </div>
                            <div className="p-4 bg-surface-dark border border-white/5 rounded-xl">
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Smart Send Time</label>
                                <div className="flex items-center gap-2 text-white font-bold">
                                    <Clock className="w-4 h-4 text-brand-pink" /> Tuesday @ 9:45 AM
                                </div>
                                <p className="text-[10px] text-green-400 mt-1">AI Prediction: Highest engagement</p>
                            </div>
                        </div>

                        <div className="mt-4 p-4 bg-brand-purple/5 border border-brand-purple/10 rounded-xl mb-6 text-left">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-brand-purple" />
                                <span className="text-sm font-bold text-white">Dynamic DNA Check</span>
                            </div>
                            <ul className="text-xs text-slate-400 space-y-1 ml-6 list-disc">
                                <li>Leads see "Book Demo" CTA.</li>
                                <li>Customers see "Refer Friend" CTA.</li>
                            </ul>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => handleZoneChange(3)}
                                className="px-6 py-3 bg-transparent hover:bg-white/5 text-slate-400 font-bold rounded-xl border border-white/10 transition-colors"
                            >
                                Back to Edit
                            </button>
                            <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center gap-2">
                                <Mail className="w-4 h-4" /> Schedule Newsletter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThePressRoom;
