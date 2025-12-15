import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Target,
    Calendar,
    Rocket,
    TrendingUp,
    AlertCircle,

    Activity,
    Zap,
    Instagram,
    Linkedin,
    Twitter
} from 'lucide-react';

const StrategyEngine = () => {
    const navigate = useNavigate();

    // State
    const [goal, setGoal] = useState('revenue');
    const [timeframe, setTimeframe] = useState('30');
    const [keyEvents, setKeyEvents] = useState('');
    const [isGenerated, setIsGenerated] = useState(false);
    const [isThinking, setIsThinking] = useState(false);

    // Mock Data for Audit (Would come from backend)
    const auditData = {
        winningPillars: [
            { name: 'Social Proof', value: 80, type: 'win' },
            { name: 'Founder Story', value: 65, type: 'win' },
            { name: 'Educational', value: 20, type: 'loss' },
        ],
        platformRanking: [
            { name: 'LinkedIn', score: 9.2, status: 'MVP', icon: <Linkedin className="w-4 h-4" /> },
            { name: 'Twitter/X', score: 7.5, status: 'Strong', icon: <Twitter className="w-4 h-4" /> },
            { name: 'Instagram', score: 4.1, status: 'Weak', icon: <Instagram className="w-4 h-4" /> },
        ],
        competitorInsight: "Competitor X started posting 3x daily. We should increase frequency to match share-of-voice."
    };

    const handleGenerate = () => {
        setIsThinking(true);
        // Simulate AI processing
        setTimeout(() => {
            setIsThinking(false);
            setIsGenerated(true);
        }, 2000);
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">The Strategy Engine (CMO)</h2>
                <p className="text-slate-400">AI-driven Virtual CMO that bridges past performance with future action planning.</p>
            </div>

            {/* Section A: The Setup */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                            <Target className="w-4 h-4 text-brand-pink" /> Primary Goal
                        </label>
                        <select
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className="w-full bg-surface-dark border border-brand-purple/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none appearance-none"
                        >
                            <option value="revenue">Maximize Revenue</option>
                            <option value="audience">Grow Audience (Followers)</option>
                            <option value="engagement">Increase Engagement</option>
                            <option value="awareness">Brand Awareness</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-brand-gold" /> Timeframe
                        </label>
                        <div className="flex bg-surface-dark rounded-xl p-1 border border-brand-purple/30">
                            <button
                                onClick={() => setTimeframe('30')}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${timeframe === '30' ? 'bg-brand-purple text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                30 Days
                            </button>
                            <button
                                onClick={() => setTimeframe('90')}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${timeframe === '90' ? 'bg-brand-purple text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                90 Days
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                            <Rocket className="w-4 h-4 text-green-400" /> Key Event (Crucial)
                        </label>
                        <input
                            type="text"
                            className="w-full bg-surface-dark border border-brand-purple/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none placeholder:text-slate-600"
                            placeholder="e.g. Black Friday, Product Launch..."
                            value={keyEvents}
                            onChange={(e) => setKeyEvents(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isThinking}
                        className="w-full h-[50px] bg-gradient-to-r from-brand-pink to-brand-purple hover:from-brand-pink/90 hover:to-brand-purple/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isThinking ? (
                            <>
                                <Activity className="w-5 h-5 animate-spin" /> Analyzing Data...
                            </>
                        ) : (
                            <>
                                <Zap className="w-5 h-5" /> Generate Strategy
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {isGenerated && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-5 duration-700">

                    {/* Section B: The Audit (Left Col) */}
                    <div className="space-y-6">
                        <div className="bg-surface-card border border-surface-border rounded-xl p-6 relative overflow-hidden group hover:border-brand-purple/30 transition-colors">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-brand-gold" /> The Audit
                            </h3>

                            {/* Insight Summary */}
                            <div className="bg-brand-purple/10 border border-brand-purple/20 p-4 rounded-lg mb-6">
                                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                                    "Your audience is ignoring generic advice but responding heavily to <span className="text-brand-pink">client success stories</span>. We need to pivot your content mix to focus on 'Results' rather than 'How-To'."
                                </p>
                            </div>

                            {/* Winning/Losing Pillars */}
                            <div className="space-y-4 mb-8">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pillar Performance</h4>
                                {auditData.winningPillars.map((pillar, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-white flex items-center gap-1">
                                                {pillar.type === 'win' ? '🔥' : '❄️'} {pillar.name}
                                            </span>
                                            <span className={pillar.type === 'win' ? "text-green-400" : "text-red-400"}>
                                                {pillar.type === 'win' ? 'High Impact' : 'Low Engagement'}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-surface-dark rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${pillar.type === 'win' ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-slate-700'}`}
                                                style={{ width: `${pillar.value}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Platform Power Ranking */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Platform Power Ranking</h4>
                                <div className="space-y-3">
                                    {auditData.platformRanking.map((p, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-surface-dark rounded-lg border border-surface-border">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-md ${p.status === 'MVP' ? 'bg-blue-500/20 text-blue-400' : p.status === 'Weak' ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-white'}`}>
                                                    {p.icon}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white">{p.name}</p>
                                                    <p className="text-[10px] text-slate-400">{p.status === 'MVP' ? 'Most Valuable Platform' : p.status === 'Weak' ? 'Underperforming' : 'Steady Growth'}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-lg font-black ${p.status === 'MVP' ? 'text-brand-gold' : 'text-slate-500'}`}>{p.score}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Competitor Context */}
                            <div className="mt-6 flex items-start gap-3 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                                <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                                <p className="text-xs text-blue-200">
                                    <span className="font-bold">Competitor Alert:</span> {auditData.competitorInsight}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section C: The Blueprint (Right Col - Spans 2 cols) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-surface-card border border-surface-border rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Layout className="w-5 h-5 text-brand-purple" /> The Strategic Blueprint ({timeframe} Day Plan)
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                {/* Content Mix Chart (Simulated Pie) */}
                                <div className="bg-surface-dark p-6 rounded-xl border border-surface-border flex flex-col items-center justify-center relative">
                                    <h4 className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase">Recommended Mix</h4>
                                    <div className="w-48 h-48 rounded-full bg-[conic-gradient(var(--color-brand-purple)_0deg_250deg,var(--color-brand-pink)_250deg_320deg,var(--color-brand-gold)_320deg_360deg)] relative flex items-center justify-center shadow-lg shadow-brand-purple/10">
                                        <div className="w-32 h-32 bg-surface-dark rounded-full flex flex-col items-center justify-center z-10">
                                            <span className="text-2xl font-black text-white">70%</span>
                                            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Case Studies</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 mt-6 text-xs">
                                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-brand-purple rounded-full"></div> Case Studies</div>
                                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-brand-pink rounded-full"></div> Education</div>
                                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-brand-gold rounded-full"></div> Sales</div>
                                    </div>
                                </div>

                                {/* Platform Strategy Cards */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase">Channel Directives</h4>
                                    <div className="p-4 bg-brand-purple/5 border-l-4 border-brand-purple rounded-r-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Linkedin className="w-4 h-4 text-brand-purple" />
                                            <span className="text-sm font-bold text-white">LinkedIn (Primary)</span>
                                        </div>
                                        <p className="text-xs text-slate-300">Post daily. Focus on Founder Stories and long-form breakdowns of client wins.</p>
                                    </div>
                                    <div className="p-4 bg-brand-pink/5 border-l-4 border-brand-pink rounded-r-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Instagram className="w-4 h-4 text-brand-pink" />
                                            <span className="text-sm font-bold text-white">Instagram</span>
                                        </div>
                                        <p className="text-xs text-slate-300">Reduce frequency. Switch to Reels only. Repurpose LinkedIn wins into visual hooks.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Campaign Arc Timeline */}
                            <div className="mt-8">
                                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">Campaign Timeline: Launch Sequence</h4>
                                <div className="relative pt-8 pb-4">
                                    {/* Line */}
                                    <div className="absolute top-10 left-0 right-0 h-1 bg-surface-dark">
                                        <div className="h-full bg-gradient-to-r from-brand-pink via-brand-purple to-brand-gold w-full opacity-50"></div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 relative">
                                        <div className="text-center group">
                                            <div className="w-6 h-6 rounded-full bg-brand-pink border-4 border-surface-card mx-auto mb-3 shadow-[0_0_10px_rgba(236,72,153,0.5)] z-10 relative"></div>
                                            <h5 className="text-sm font-bold text-white mb-1">Phase 1: Warm Up</h5>
                                            <p className="text-[10px] text-slate-400 px-4"> Weeks 1-2<br />High-value, low-ask content to build trust.</p>
                                        </div>
                                        <div className="text-center group">
                                            <div className="w-6 h-6 rounded-full bg-brand-purple border-4 border-surface-card mx-auto mb-3 shadow-[0_0_10px_rgba(124,58,237,0.5)] z-10 relative"></div>
                                            <h5 className="text-sm font-bold text-white mb-1">Phase 2: The Hook</h5>
                                            <p className="text-[10px] text-slate-400 px-4"> Week 3<br />Agitate the problem (Misery Mapping).</p>
                                        </div>
                                        <div className="text-center group">
                                            <div className="w-6 h-6 rounded-full bg-surface-dark border-4 border-brand-gold mx-auto mb-3 z-10 relative"></div>
                                            <h5 className="text-sm font-bold text-white mb-1">Phase 3: The Ask</h5>
                                            <p className="text-[10px] text-slate-400 px-4"> Week 4<br />Heavy Call-to-Action focused on "{keyEvents || 'Launch'}".</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* Section D: Execution Dock */}
            {isGenerated && (
                <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-4 bg-surface-dark/90 backdrop-blur-xl border-t border-surface-border z-40 animate-in slide-in-from-bottom-full duration-500 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Strategy Ready</p>
                            <p className="text-[10px] text-slate-400">Approved by Virtual CMO</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button
                            onClick={() => navigate('/client/strategy/persona')}
                            className="flex-1 md:flex-none px-4 py-2 bg-surface-card border border-surface-border hover:bg-surface-hover text-slate-300 text-sm font-bold rounded-lg transition-colors"
                        >
                            Update Brand DNA
                        </button>
                        <button
                            onClick={() => navigate('/client/creative-studio')}
                            className="flex-1 md:flex-none px-4 py-2 bg-surface-card border border-surface-border hover:bg-surface-hover text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
                        >
                            Launch Creative Studio
                        </button>
                        <button
                            onClick={() => navigate('/client/calendar')}
                            className="flex-1 md:flex-none px-6 py-2 bg-brand-gold hover:bg-brand-gold/90 text-black text-sm font-bold rounded-lg shadow-lg shadow-brand-gold/20 transition-all transform hover:scale-105 flex items-center gap-2"
                        >
                            <Calendar className="w-4 h-4" /> Populate Calendar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StrategyEngine;
