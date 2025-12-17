import { useState } from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import {
    ArrowUp,
    ArrowDown,
    ArrowLeft,
    FileText,
    Users,
    CheckCircle,
    Target,
    Bot,
    AlertTriangle
} from 'lucide-react';

const GrowthCompass = () => {
    const [selectedPath, setSelectedPath] = useState<string | null>(null);

    // Mock Data for Radar Chart
    const radarData = [
        { subject: 'Authority', A: 90, fullMark: 100 },
        { subject: 'Cash Flow', A: 65, fullMark: 100 },
        { subject: 'Capacity', A: 40, fullMark: 100 },
        { subject: 'Loyalty', A: 85, fullMark: 100 },
        { subject: 'Product Depth', A: 50, fullMark: 100 },
    ];

    const strategies = [
        {
            id: 'up_market',
            title: 'Up Market',
            subtitle: 'The Whale Hunt',
            icon: <ArrowUp className="w-8 h-8 text-green-400" />,
            color: 'green',
            description: 'Targeting fewer, higher-paying clients (Enterprise).',
            prediction: 'Requires rebranding to "Professional/Authoritative". Sales cycle will increase by 3 months. Revenue potential: +300%.',
            requirements: ['CRM for long sales cycles', 'Enterprise Case Studies', 'SLA Contracts'],
            risk: 'Medium',
            fit: 85
        },
        {
            id: 'down_market',
            title: 'Down Market',
            subtitle: 'The Mass Scale',
            icon: <ArrowDown className="w-8 h-8 text-blue-400" />,
            color: 'blue',
            description: 'Lowering price to acquire volume (Productized Service).',
            prediction: 'Requires high automation (Creative Studio). Margins will drop to 20%, but volume can 10x.',
            requirements: ['Automated "Approval Loop"', 'High-volume lead gen', 'Self-serve onboarding'],
            risk: 'High',
            fit: 30
        },
        {
            id: 'adjacent',
            title: 'Adjacent',
            subtitle: 'The Side Step',
            icon: <ArrowLeft className="w-8 h-8 text-purple-400" />,
            color: 'purple',
            description: 'Selling a new product to the same customers (Cross-sell).',
            prediction: 'Low risk. Your "Audience Loyalty" is high. Launching a "Course" or "Consulting" add-on has an 85% success probability.',
            requirements: ['Product Development', 'Email Marketing Sequence', 'Customer Surveys'],
            risk: 'Low',
            fit: 92
        },
        {
            id: 'niche',
            title: 'Narrower',
            subtitle: 'The Niche Down',
            icon: <Minimize2 className="w-8 h-8 text-yellow-400" />,
            color: 'yellow',
            description: 'Cutting 80% of offerings to dominate one specific micro-niche.',
            prediction: 'Fastest path to authority. Recommended if "Competitor Density" is high in your current broader market.',
            requirements: ['Updated Brand Persona', 'Specialized Content Plan', 'Niche-specific Case Studies'],
            risk: 'Medium',
            fit: 75
        },
        {
            id: 'broader',
            title: 'Broader',
            subtitle: 'The Empire',
            icon: <Maximize2 className="w-8 h-8 text-red-400" />,
            color: 'red',
            description: 'Entering completely new markets or industries.',
            prediction: '⚠️ High Risk. Requires significant capital and new Brand DNA calibration.',
            requirements: ['Significant Capital', 'New Market Research', 'Expanded Team'],
            risk: 'Critical',
            fit: 20
        },
    ];

    const activeStrategy = strategies.find(s => s.id === selectedPath);

    return (
        <div className="space-y-8 pb-20 relative">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">The Growth Compass</h2>
                <p className="text-slate-400">Strategic War Room: Simulate and choose your path to scale.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Zone 1: Market Position Radar (Left - 4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-brand-purple" /> Market Position
                        </h3>

                        <div className="h-[300px] w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="#334155" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Current Brand"
                                        dataKey="A"
                                        stroke="#8b5cf6"
                                        strokeWidth={3}
                                        fill="#8b5cf6"
                                        fillOpacity={0.3}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-4 p-4 bg-brand-purple/10 border border-brand-purple/20 rounded-xl">
                            <div className="flex items-start gap-3">
                                <Bot className="w-6 h-6 text-brand-purple mt-1" />
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-1">AI Insight</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        Your <strong>Authority</strong> is high (90/100), but <strong>Capacity</strong> is low (40/100).
                                        Going "Broader" now would break your fulfillment team. We recommend <strong>"Going Up Market"</strong> or <strong>"Adjacent"</strong> instead.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Simulation Console (Mobile/Desktop stacked on left when active, or below) */}
                    {activeStrategy && (
                        <div className="glass-panel p-6 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-right-4">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        {activeStrategy.icon} Simulation: {activeStrategy.subtitle}
                                    </h3>
                                    <div className={`mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${activeStrategy.fit > 80 ? 'bg-green-500/20 text-green-400' : activeStrategy.fit > 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                                        Compatibility Score: {activeStrategy.fit}%
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* AI Prediction */}
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase">Strategic Forecast</h4>
                                    <p className="text-sm text-slate-200 p-3 bg-surface-dark rounded-lg border border-white/5">
                                        {activeStrategy.prediction}
                                    </p>
                                </div>

                                {/* Gap Analysis */}
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase">Gap Analysis (Missing Assets)</h4>
                                    <ul className="space-y-2">
                                        {activeStrategy.requirements.map((req, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-red-300">
                                                <AlertTriangle className="w-4 h-4 text-red-400" />
                                                <span>Missing: {req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Resource Check */}
                                <div className="p-4 bg-surface-dark rounded-xl border border-white/5">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Resource Reality Check</h4>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-slate-300">Team Capacity Impact</span>
                                        <span className="text-xs font-bold text-red-400">High Strain</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
                                        <div className="h-full bg-red-500 w-[85%]"></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-300">Capital Requirement</span>
                                        <span className="text-xs font-bold text-yellow-400">Moderate</span>
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                    <FileText className="w-4 h-4" /> Generate Battle Plan PDF
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Zone 2: The 5 Strategic Paths (Right - 8 cols) */}
                <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        {/* Central Connector Lines (Visual Only) */}
                        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-purple/5 rounded-full blur-xl pointer-events-none z-0"></div>

                        {strategies.map((strategy) => (
                            <div
                                key={strategy.id}
                                onClick={() => setSelectedPath(strategy.id)}
                                className={`
                                    relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 group overflow-hidden
                                    ${selectedPath === strategy.id
                                        ? 'bg-brand-purple/20 border-brand-purple shadow-[0_0_30px_rgba(139,92,246,0.3)] scale-[1.02] z-10'
                                        : 'bg-surface-dark border-white/10 hover:border-brand-purple/50 hover:bg-surface-hover hover:scale-[1.01]'
                                    }
                                    ${strategy.id === 'broader' ? 'md:col-span-2 md:w-2/3 md:mx-auto' : ''}
                                `}
                            >
                                {/* Selection Indicator */}
                                {selectedPath === strategy.id && (
                                    <div className="absolute top-4 right-4 text-brand-purple animate-pulse">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                )}

                                <div className="flex items-start gap-4 mb-4 relative z-10">
                                    <div className={`p-3 rounded-xl bg-${strategy.color}-500/10 text-${strategy.color}-400 group-hover:bg-${strategy.color}-500/20 transition-colors`}>
                                        {strategy.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{strategy.title}</h3>
                                        <p className={`text-xs font-bold uppercase tracking-wider text-${strategy.color}-400`}>{strategy.subtitle}</p>
                                    </div>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed mb-4 relative z-10">
                                    {strategy.description}
                                </p>

                                {/* Mini Fit Indicator */}
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-surface-border rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${strategy.fit > 80 ? 'bg-green-500' : strategy.fit > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                            style={{ width: `${strategy.fit}%` }}
                                        ></div>
                                    </div>
                                    <span className={`text-xs font-bold ${strategy.fit > 80 ? 'text-green-400' : strategy.fit > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {strategy.fit}% Fit
                                    </span>
                                </div>

                                {/* Hover Glow */}
                                <div className={`absolute top-0 right-0 w-64 h-64 bg-${strategy.color}-500/10 rounded-full blur-[80px] pointer-events-none -z-0 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Brand DNA Updater Prompt (Only shows when fit is high) */}
                    {activeStrategy && activeStrategy.fit > 80 && (
                        <div className="mt-8 p-6 bg-brand-purple/10 border border-brand-purple/30 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center gap-4">
                                <Users className="w-8 h-8 text-brand-purple" />
                                <div>
                                    <h4 className="text-lg font-bold text-white">Update Brand DNA?</h4>
                                    <p className="text-sm text-slate-300">
                                        Since you are moving <strong>{activeStrategy.title}</strong>, should we update your persona to target
                                        <span className="text-brand-pink font-bold"> {activeStrategy.title === 'Up Market' ? 'Enterprise Decision Makers' : 'Existing Customers'}</span>?
                                    </p>
                                </div>
                            </div>
                            <button className="px-6 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-lg transition-colors shadow-lg shadow-brand-purple/20">
                                Yes, Auto-Calibrate
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GrowthCompass;
