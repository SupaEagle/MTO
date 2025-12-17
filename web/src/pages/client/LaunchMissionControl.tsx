import React, { useState } from 'react';
import {
    Clock,
    Users,
    Flame,
    Target,
    Rocket,
    Box,
    MonitorPlay,
    Code,
    ChevronRight,
    CheckCircle,
    AlertTriangle,
    FileText,
    Calendar as CalendarIcon,
    Zap
} from 'lucide-react';

const LaunchMissionControl = () => {
    const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
    const [activePhase, setActivePhase] = useState<number>(1);
    const [panicMode, setPanicMode] = useState(false);

    // Mock Data for "War Room"
    const vitalSigns = {
        waitlist: 4521,
        warmthScore: 78,
        revenueGoal: 100000,
        revenueCurrent: 0,
        daysUntilLaunch: 12
    };

    const archetypes = [
        {
            id: 'plf',
            name: 'The "Jeff Walker" PLF',
            icon: MonitorPlay,
            bestFor: 'Digital Courses',
            desc: '3 Educational Videos -> Open Cart Sequence.'
        },
        {
            id: 'drop',
            name: 'The "Drop" Model',
            icon: Box,
            bestFor: 'Physical / Merch',
            desc: 'High scarcity, 24-hour buy window.'
        },
        {
            id: 'webinar',
            name: 'The "Webinar" Funnel',
            icon: Users,
            bestFor: 'High-Ticket Services',
            desc: 'Live training session pitching the offer.'
        },
        {
            id: 'beta',
            name: 'The "Beta" Launch',
            icon: Code,
            bestFor: 'Software / SaaS',
            desc: 'Discounted entry for early adopters & feedback.'
        }
    ];

    const phases = [
        {
            id: 1,
            title: 'Phase 1: The Runway',
            timeline: 'T-Minus 30 Days',
            goal: 'Hype & Waitlist Collection',
            tasks: [
                { id: 'p1-1', name: 'Deploy Waitlist Landing Page', status: 'done' },
                { id: 'p1-2', name: 'Schedule 10 Mystery/Teaser Posts', status: 'in-progress' },
                { id: 'p1-3', name: 'Setup Waitlist Gamification (Referrals)', status: 'pending' }
            ]
        },
        {
            id: 2,
            title: 'Phase 2: The Warm-Up',
            timeline: 'T-Minus 7 Days',
            goal: 'Agitation & Education',
            tasks: [
                { id: 'p2-1', name: 'Script "Problem/Solution" Email Sequence', status: 'pending' },
                { id: 'p2-2', name: 'Run "Objection Crusher" Analysis', status: 'pending', ai: true }
            ]
        },
        {
            id: 3,
            title: 'Phase 3: The Launch',
            timeline: 'Cart Open - 5 Days',
            goal: 'Sales & Scarcity',
            tasks: [
                { id: 'p3-1', name: 'Auto-schedule "Cart Open" Email', status: 'pending' },
                { id: 'p3-2', name: 'Queue "50% Sold Out" Updates', status: 'pending' },
                { id: 'p3-3', name: 'Prepare "Closing in 4 Hours" Warning', status: 'pending' }
            ]
        },
        {
            id: 4,
            title: 'Phase 4: The Post-Mortem',
            timeline: 'T-Plus 7 Days',
            goal: 'Retention & Testimonials',
            tasks: [
                { id: 'p4-1', name: 'Script Onboarding Sequence', status: 'pending' },
                { id: 'p4-2', name: 'Deploy "Non-Buyer" Survey', status: 'pending' }
            ]
        }
    ];

    return (
        <div className="space-y-8 pb-24 relative">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                    <Rocket className="w-8 h-8 text-brand-purple" /> Launch Mission Control
                </h2>
                <p className="text-slate-400">Coordinate every aspect of your product release from teaser to sold out.</p>
            </div>

            {/* ZONE 1: THE WAR ROOM DASHBOARD */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Countdown Timer */}
                <div className="lg:col-span-1 bg-gradient-to-br from-brand-purple/20 to-black border border-brand-purple/30 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20">
                        <Clock className="w-24 h-24 text-brand-purple" />
                    </div>
                    <span className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">T-Minus</span>
                    <div className="text-5xl font-black text-white mb-1">
                        {vitalSigns.daysUntilLaunch}<span className="text-lg text-slate-500 font-bold ml-1">DAYS</span>
                    </div>
                    <span className="text-brand-pink text-sm font-bold animate-pulse">To Cart Open</span>
                </div>

                {/* Vital Signs */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Waitlist Size */}
                    <div className="bg-surface-dark border border-white/10 rounded-2xl p-5 relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-slate-400 text-xs font-bold uppercase mb-1">Waitlist Size</div>
                                <div className="text-3xl font-bold text-white group-hover:text-brand-purple transition-colors">
                                    {vitalSigns.waitlist.toLocaleString()}
                                </div>
                            </div>
                            <div className="p-2 bg-brand-purple/10 rounded-lg">
                                <Users className="w-5 h-5 text-brand-purple" />
                            </div>
                        </div>
                        <div className="text-xs text-green-400 font-bold flex items-center gap-1">
                            <Zap className="w-3 h-3" /> +12% this week
                        </div>
                    </div>

                    {/* Warmth Score */}
                    <div className="bg-surface-dark border border-white/10 rounded-2xl p-5 relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-slate-400 text-xs font-bold uppercase mb-1">Warmth Score</div>
                                <div className="text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                                    Highlight
                                </div>
                            </div>
                            <div className="p-2 bg-yellow-500/10 rounded-lg">
                                <Flame className="w-5 h-5 text-yellow-400" />
                            </div>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-full w-[78%]"></div>
                        </div>
                        <div className="text-xs text-slate-400 mt-2">40% open rate on last email</div>
                    </div>

                    {/* Revenue Goal */}
                    <div className="bg-surface-dark border border-white/10 rounded-2xl p-5 relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-slate-400 text-xs font-bold uppercase mb-1">Projected Revenue</div>
                                <div className="text-3xl font-bold text-white group-hover:text-green-400 transition-colors">
                                    $0 <span className="text-base text-slate-600">/ $100k</span>
                                </div>
                            </div>
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <Target className="w-5 h-5 text-green-400" />
                            </div>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-600 to-green-400 h-full w-[0%]"></div>
                        </div>
                        <div className="text-xs text-slate-400 mt-2">Goal: Sold Out</div>
                    </div>
                </div>
            </div>

            {/* ZONE 2: STRATEGY SELECTOR */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-brand-pink" />
                        Launch Playbook Selector
                    </h3>
                    {selectedArchetype && (
                        <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors" onClick={() => setSelectedArchetype(null)}>
                            Change Strategy
                        </button>
                    )}
                </div>

                {!selectedArchetype ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {archetypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setSelectedArchetype(type.id)}
                                className="flex flex-col items-start p-5 bg-surface-dark border border-white/5 rounded-xl hover:border-brand-purple/50 hover:bg-brand-purple/5 transition-all group text-left h-full"
                            >
                                <div className="p-3 bg-black/30 rounded-lg mb-4 text-slate-400 group-hover:text-brand-purple transition-colors">
                                    <type.icon className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-white mb-1 group-hover:text-brand-purple transition-colors">{type.name}</h4>
                                <div className="text-xs font-bold text-brand-pink bg-brand-pink/10 px-2 py-0.5 rounded mb-2 inline-block">
                                    {type.bestFor}
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">{type.desc}</p>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 bg-brand-purple/10 border border-brand-purple/20 rounded-xl flex items-center justify-between animate-in fade-in zoom-in-95">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-brand-purple rounded-xl text-white shadow-lg shadow-brand-purple/20">
                                {React.createElement(archetypes.find(a => a.id === selectedArchetype)?.icon || Box, { className: "w-8 h-8" })}
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-1">
                                    {archetypes.find(a => a.id === selectedArchetype)?.name}
                                </h4>
                                <p className="text-slate-300 text-sm">
                                    Strategy active. Asset generation ready.
                                </p>
                            </div>
                        </div>
                        <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            <Zap className="w-4 h-4 fill-black" /> Generate All Launch Assets
                        </button>
                    </div>
                )}
            </div>

            {/* ZONE 3: PHASE MANAGER timeline */}
            {selectedArchetype && (
                <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-500">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-blue-400" /> Mission Timeline
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">Scarcity Sync:</span>
                            <div className="flex items-center gap-1 text-green-400 text-xs font-bold bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                                <CheckCircle className="w-3 h-3" /> Active
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {phases.map((phase) => (
                            <div
                                key={phase.id}
                                onClick={() => setActivePhase(phase.id)}
                                className={`
                                    cursor-pointer relative overflow-hidden rounded-xl border p-4 transition-all
                                    ${activePhase === phase.id
                                        ? 'bg-surface-dark border-brand-purple ring-1 ring-brand-purple'
                                        : 'bg-surface-dark/50 border-white/5 hover:border-white/10 hover:bg-surface-dark'
                                    }
                                `}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activePhase === phase.id ? 'bg-brand-purple text-white' : 'bg-slate-800 text-slate-400'}`}>
                                        Step {phase.id}
                                    </span>
                                    {activePhase === phase.id && <ChevronRight className="w-4 h-4 text-brand-purple" />}
                                </div>
                                <h4 className={`text-sm font-bold mb-1 ${activePhase === phase.id ? 'text-white' : 'text-slate-300'}`}>
                                    {phase.title}
                                </h4>
                                <div className="text-[10px] text-slate-500 font-bold uppercase mb-2">{phase.timeline}</div>
                                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-purple w-1/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Active Phase Details */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">{phases[activePhase - 1].title}</h2>
                                <p className="text-slate-400 flex items-center gap-2">
                                    <Target className="w-4 h-4 text-brand-pink" />
                                    Goal: <span className="text-white">{phases[activePhase - 1].goal}</span>
                                </p>
                            </div>

                            {/* PANIC BUTTON for Launch Phase */}
                            {activePhase === 3 && (
                                <button
                                    onClick={() => setPanicMode(!panicMode)}
                                    className={`
                                        px-6 py-3 rounded-xl font-bold border transition-all flex items-center gap-2
                                        ${panicMode
                                            ? 'bg-red-500 text-white border-red-400 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.4)]'
                                            : 'bg-surface-dark text-red-400 border-red-500/30 hover:bg-red-500/10'
                                        }
                                    `}
                                >
                                    <AlertTriangle className="w-5 h-5" />
                                    {panicMode ? 'PRODUCING EMERGENCY OFFER...' : 'PANIC BUTTON'}
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            {phases[activePhase - 1].tasks.map((task) => (
                                <div key={task.id} className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl hover:border-white/10 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={`
                                            w-6 h-6 rounded-full border-2 flex items-center justify-center
                                            ${task.status === 'done' ? 'bg-green-500 border-green-500 text-white' : 'border-slate-600 text-transparent'}
                                        `}>
                                            <CheckCircle className="w-3 h-3" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm group-hover:text-brand-purple transition-colors">{task.name}</div>
                                            {task.status === 'in-progress' && (
                                                <div className="text-xs text-yellow-400 flex items-center gap-1 mt-1">
                                                    <Clock className="w-3 h-3" /> In Scheduling
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {'ai' in task && (
                                            <span className="text-[10px] font-bold bg-brand-purple/20 text-brand-purple px-2 py-1 rounded border border-brand-purple/20">
                                                AI AGENT
                                            </span>
                                        )}
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {panicMode && activePhase === 3 && (
                            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl animate-in slide-in-from-top-4 fade-in">
                                <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                                    <Zap className="w-4 h-4" /> Emergency Bonus Generated
                                </h4>
                                <p className="text-sm text-slate-300 mb-4">
                                    Sales are tracking 20% below target. Recommending "Fast Action Bonus" email trigger.
                                </p>
                                <div className="bg-black/30 p-4 rounded-lg border border-red-500/20 mb-4">
                                    <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Subject Line:</span>
                                    <span className="text-white font-medium">Wait... I forgot to mention this (Expires at midnight)</span>
                                </div>
                                <div className="flex gap-4">
                                    <button className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg text-sm">
                                        Send Emergency Email
                                    </button>
                                    <button onClick={() => setPanicMode(false)} className="px-4 py-2 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-bold rounded-lg text-sm">
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LaunchMissionControl;
