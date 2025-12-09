import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// -- Questionnaire Data Structure --
const SECTIONS = [
    {
        id: 'core',
        title: 'Core Business Identity',
        description: 'Who you are, what you sell, and who runs the show.',
        color: 'from-blue-500 to-cyan-500',
        questions: [
            { id: 'businessName', label: 'Business Name', subtext: 'Legal name + Public-facing brand name.' },
            { id: 'industryNiche', label: 'Industry & Niche', subtext: 'Be specific. e.g., "High-end sustainable leather goods," not just "E-commerce".' },
            { id: 'coreOffering', label: 'Core Offering', subtext: 'One clear, concise sentence describing your main product/service.' },
            { id: 'contact', label: 'Internal Point of Contact', subtext: 'Name, Title, Email of the main approver.' }
        ]
    },
    {
        id: 'goals',
        title: 'Goals & Measurement',
        description: 'Turning aspirations into SMART goals.',
        color: 'from-green-500 to-emerald-500',
        questions: [
            { id: 'highLevelAim', label: 'High-Level Aim (12 Months)', subtext: 'The single biggest goal (Revenue, Market Share, etc.).' },
            { id: 'marketingRole', label: 'Marketing Contribution', subtext: 'Role of content? (Lead Gen, Brand Awareness, Retention).' },
            { id: 'kpis', label: 'Top 3 KPIs', subtext: 'e.g., SQLs, Traffic, Engagement Rate (beyond just sales).' },
            { id: 'baselineTarget', label: 'Baseline & Target (90 Days)', subtext: 'Current average vs. Specific target for next 90 days.' }
        ]
    },
    {
        id: 'audience',
        title: 'Audience & Psychographics',
        description: 'Deep dive into your Ideal Client Avatar (ICA).',
        color: 'from-purple-500 to-pink-500',
        questions: [
            { id: 'ica', label: 'Ideal Client Avatar', subtext: 'Clone your best customer. Demographics, Job Title, Age.' },
            { id: 'psychographics', label: 'Psychographics', subtext: 'Values, Beliefs, Identity. What do they believe about themselves?' },
            { id: 'misery', label: 'Customer Misery (Pains)', subtext: 'Top 3 fears/frustrations your product solves.' },
            { id: 'miracle', label: 'Customer Miracle (Wants)', subtext: 'Ultimate desired outcome/transformation.' }
        ]
    },
    {
        id: 'value',
        title: 'Value & Differentiation',
        description: 'Why you? Your Unique Selling Point and Value Equation.',
        color: 'from-amber-500 to-orange-500',
        questions: [
            { id: 'usp', label: 'Unique Selling Proposition (USP)', subtext: 'Why choose you? One thing you do better/different that is defensible.' },
            { id: 'competitors', label: 'Competitor Analysis', subtext: 'Top 3 competitors and their primary differentiation.' },
            { id: 'valueEq', label: 'Value Equation', subtext: 'Assess: Dream Outcome, Likelihood, Speed, and Effort.' },
            { id: 'uspReinforce', label: 'USP Reinforcement', subtext: '3 points in the journey where USP is explicitly stated.' }
        ]
    },
    {
        id: 'identity',
        title: 'Organizational Identity',
        description: 'Mission, Vision, and the Brand Promise.',
        color: 'from-indigo-500 to-blue-600',
        questions: [
            { id: 'mission', label: 'Mission Statement', subtext: 'Why do you exist? Who do you serve? How do you do it?' },
            { id: 'vision', label: 'Vision Statement', subtext: 'What does the world look like in 5-10 years if you succeed?' },
            { id: 'promise', label: 'Brand Promise', subtext: 'Non-negotiable commitment to every customer.' }
        ]
    },
    {
        id: 'scaling',
        title: 'Scaling & Constraints',
        description: 'Optimizing for growth and identifying bottlenecks.',
        color: 'from-red-500 to-rose-600',
        questions: [
            { id: 'powerLaw', label: 'Best Customers (Power Law)', subtext: '% of customers generating 80% of revenue. Describe them.' },
            { id: 'expansion', label: 'Future Market Strategy', subtext: 'Up market, Down market, or Adjacent categories?' },
            { id: 'bottleneck', label: 'Scaling Constraint', subtext: 'If sales 5x tomorrow, what breaks first?' }
        ]
    },
    {
        id: 'visuals',
        title: 'Visual Brand Identity',
        description: 'Colors, Fonts, and Aesthetics for the Creative Studio.',
        color: 'from-fuchsia-500 to-purple-600',
        questions: [
            { id: 'assets', label: 'Brand Assets', subtext: 'Do you have a Style Guide/PDF? (This is critical).' },
            { id: 'colors', label: 'Color Palette', subtext: 'HEX codes for Primary and Action/CTA colors.' },
            { id: 'typography', label: 'Typography', subtext: 'Primary (Headline) and Secondary (Body) font names.' },
            { id: 'logoRules', label: 'Logo Usage', subtext: 'Transparent logo available? Size/Watermark rules?' },
            { id: 'aesthetics', label: 'Imagery & Mood', subtext: 'Visual style (Modern, Earthy, etc.) & preferences.' },
            { id: 'legal', label: 'Legal & Compliance', subtext: 'Any mandatory disclaimers or usage rights?' }
        ]
    },
    {
        id: 'ai_calibration',
        title: 'AI & Content Calibration',
        description: 'Training the Brain. Tone, Voice, and Trends.',
        color: 'from-teal-400 to-emerald-600',
        questions: [
            { id: 'tone', label: 'Brand Tone & Personality', subtext: '3 Adjectives (e.g., Witty, Professional). How should they feel?' },
            { id: 'jargon', label: 'Vocabulary & Jargon', subtext: 'Terms to USE and terms to AVOID.' },
            { id: 'styleExamples', label: 'Style Examples', subtext: 'Links to About Us, Best Posts, or Aspirational brands.' },
            { id: 'stopWords', label: 'Stop Words / Guardrails', subtext: 'Topics or phrases the AI must NEVER use.' },
            { id: 'compHandles', label: 'Top 5 Competitors', subtext: 'Handles/URLs for tracking.' },
            { id: 'compStrengths', label: 'Competitor Strengths', subtext: 'What do they do well that you admire?' },
            { id: 'marketGap', label: 'Market Gap', subtext: 'One idea to steal/remix from competitors.' },
            { id: 'pillars', label: 'Content Pillars', subtext: 'Education, Culture, Sales, Proof, Inspiration?' },
            { id: 'mix', label: 'Ideal Content Mix', subtext: '% Breakdown (e.g., 40% value, 20% sales).' },
            { id: 'formats', label: 'Content Formats', subtext: 'Video vs Carousel vs Text. Detailed preference.' },
            { id: 'trendPlatform', label: 'Primary Trend Platform', subtext: 'TikTok, X, LinkedIn?' },
            { id: 'influencers', label: 'Niche Influencers', subtext: 'Who do you look to for inspiration?' },
            { id: 'trendThreshold', label: 'Trend Actionability', subtext: 'Minimum views/engagement to justify jumping on a trend.' }
        ]
    }
];

const DiscoveryWizard = () => {
    const navigate = useNavigate();
    const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isAnimating, setIsAnimating] = useState(false);

    const currentSection = SECTIONS[currentSectionIdx];
    const progress = ((currentSectionIdx + 1) / SECTIONS.length) * 100;

    // Persist to local storage demo
    useEffect(() => {
        const saved = localStorage.getItem('discovery_answers');
        if (saved) setAnswers(JSON.parse(saved));
    }, []);

    const handleInput = (id: string, value: string) => {
        setAnswers(prev => {
            const next = { ...prev, [id]: value };
            localStorage.setItem('discovery_answers', JSON.stringify(next));
            return next;
        });
    };

    const nextSection = () => {
        if (currentSectionIdx < SECTIONS.length - 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentSectionIdx(prev => prev + 1);
                setIsAnimating(false);
                window.scrollTo(0, 0);
            }, 300);
        } else {
            // Finish
            navigate('/client/strategy/voice?source=discovery_complete');
        }
    };

    const prevSection = () => {
        if (currentSectionIdx > 0) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentSectionIdx(prev => prev - 1);
                setIsAnimating(false);
                window.scrollTo(0, 0);
            }, 300);
        }
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden font-sans selection:bg-brand-pink selection:text-white">

            {/* Pulsating Animated Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className={`absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse-slow bg-gradient-to-r ${currentSection.color}`}></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slower bg-brand-purple"></div>
                <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full mix-blend-overlay filter blur-[80px] opacity-10 animate-blob bg-white"></div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                {/* AI Circuit Overlay (Only for AI Section) */}
                {currentSection.id === 'ai_calibration' && (
                    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                        <svg className="w-full h-full" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="circuit-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="transparent" />
                                    <stop offset="50%" stopColor="#10B981" /> {/* Emerald-500 */}
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {/* Circuit Lines */}
                            <g stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" fill="none">
                                {/* Top Left -> Center */}
                                <path d="M0,100 H100 L150,150 V300" className="circuit-path" />
                                <path d="M50,0 V100 L100,150 H300" className="circuit-path" style={{ animationDelay: '0.2s' }} />

                                {/* Top Right -> Center */}
                                <path d="M100%,100 H90% L85%,150 V300" className="circuit-path" style={{ animationDelay: '0.4s' }} />
                                <path d="M95%,0 V100 L90%,150 H70%" className="circuit-path" style={{ animationDelay: '0.6s' }} />

                                {/* Bottom Lines */}
                                <path d="M0,90% H100 L150,85% V70%" className="circuit-path" style={{ animationDelay: '0.3s' }} />
                                <path d="M100%,90% H90% L85%,85% V70%" className="circuit-path" style={{ animationDelay: '0.5s' }} />
                            </g>

                            {/* Pulsating Signals (circles moving along paths) */}
                            {/* We use basic CSS animations on circles matching the path shapes roughly or exact overlapping paths */}
                            <g filter="url(#glow)">
                                <circle r="3" fill="#34D399">
                                    <animateMotion
                                        dur="3s"
                                        repeatCount="indefinite"
                                        path="M0,100 H100 L150,150 V300"
                                    />
                                    <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                                </circle>
                                <circle r="3" fill="#34D399">
                                    <animateMotion
                                        dur="4s"
                                        begin="1s"
                                        repeatCount="indefinite"
                                        path="M100%,100 H90% L85%,150 V300"
                                    />
                                    <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
                                </circle>
                                <circle r="3" fill="#10B981">
                                    <animateMotion
                                        dur="2.5s"
                                        begin="0.5s"
                                        repeatCount="indefinite"
                                        path="M50,0 V100 L100,150 H300"
                                    />
                                    <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
                                </circle>
                                <circle r="4" fill="#6EE7B7">
                                    <animateMotion
                                        dur="5s"
                                        repeatCount="indefinite"
                                        path="M0,50% H100% M100%,50% H0" // Crossing
                                    />
                                    <animate attributeName="opacity" values="0;1;1;0" dur="5s" repeatCount="indefinite" />
                                </circle>
                            </g>
                        </svg>
                    </div>
                )}
            </div>

            {/* Left Vertical Art */}
            <div className="fixed left-0 top-0 bottom-0 w-24 hidden xl:flex flex-col justify-between py-12 items-center z-20 pointer-events-none">
                <div className="h-32 w-px bg-gradient-to-b from-transparent to-white/20"></div>
                <div className="flex-1 flex flex-col justify-center gap-12 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] [writing-mode:vertical-lr] rotate-180">
                    <span>Mansa Tina Ops</span>
                    <span className={`text-${currentSection.color.split(' ')[1]}`}>Discovery Mode</span>
                    <span>v2.0</span>
                </div>
                <div className="h-32 w-px bg-gradient-to-t from-transparent to-white/20"></div>
            </div>

            {/* Right Vertical Art */}
            <div className="fixed right-0 top-0 bottom-0 w-24 hidden xl:flex flex-col justify-between py-12 items-center z-20 pointer-events-none">
                <div className="h-full w-px bg-white/5 relative">
                    {/* Animated Progress indicator on the vertical line */}
                    <div
                        className={`absolute top-0 w-0.5 -left-px bg-gradient-to-b ${currentSection.color} transition-all duration-700 ease-out shadow-[0_0_15px_currentColor]`}
                        style={{ height: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className={`relative z-10 container mx-auto px-6 py-12 max-w-4xl transition-opacity duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>

                {/* Header / Nav */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <button onClick={() => navigate('/')} className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest mb-4 flex items-center gap-2 transition-colors">
                            <span className="text-xl">←</span> Exit Wizard
                        </button>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
                            {currentSection.title}
                        </h1>
                        <p className="text-xl text-brand-gold mt-2 font-medium">{currentSection.description}</p>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="text-6xl font-black text-white/5">{currentSectionIdx + 1}</div>
                        <div className="text-sm text-slate-500 uppercase tracking-widest">Part {currentSectionIdx + 1} of {SECTIONS.length}</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 w-full bg-white/10 rounded-full mb-16 overflow-hidden">
                    <div
                        className={`h-full bg-gradient-to-r ${currentSection.color} transition-all duration-700 ease-out`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Question Form */}
                <div className="space-y-12">
                    {currentSection.questions.map((q, idx) => (
                        <div key={q.id} className="group relative">
                            {/* Glowing border effect on focus-within */}
                            <div className={`absolute -inset-4 bg-gradient-to-r ${currentSection.color} rounded-2xl opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-500`}></div>

                            <div className="relative">
                                <label className="block text-2xl font-bold text-slate-200 mb-2 group-focus-within:text-white transition-colors">
                                    <span className="text-brand-gold/50 mr-2 text-lg align-top">{idx + 1}.</span>
                                    {q.label}
                                </label>
                                <p className="text-slate-400 mb-4 text-sm max-w-2xl">{q.subtext}</p>

                                <textarea
                                    value={answers[q.id] || ''}
                                    onChange={(e) => handleInput(q.id, e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-6 text-lg text-white placeholder-slate-600 focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all resize-y min-h-[120px] backdrop-blur-md shadow-inner"
                                    placeholder="Type your answer here..."
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Controls */}
                <div className="mt-20 flex justify-between items-center py-8 border-t border-white/10">
                    <button
                        onClick={prevSection}
                        disabled={currentSectionIdx === 0}
                        className={`px-8 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all ${currentSectionIdx === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        Previous
                    </button>

                    <button
                        onClick={nextSection}
                        className={`group relative px-10 py-4 rounded-full font-black text-lg tracking-wider uppercase overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all bg-white text-black`}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {currentSectionIdx === SECTIONS.length - 1 ? 'Finish Discovery' : 'Next Section'}
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <div className={`absolute inset-0 bg-gradient-to-r ${currentSection.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    </button>
                </div>

            </div>

            {/* CSS Animation Styles (Inline for simplicity/portability) */}
            <style>{`
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.1); opacity: 0.4; }
                }
                @keyframes pulse-slower {
                    0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.2; }
                    50% { transform: scale(1.2) translate(-20px, 20px); opacity: 0.3; }
                }
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-pulse-slow { animation: pulse-slow 8s infinite cubic-bezier(0.4, 0, 0.6, 1); }
                .animate-pulse-slower { animation: pulse-slower 12s infinite cubic-bezier(0.4, 0, 0.6, 1); }
                .animate-blob { animation: blob 20s infinite; }
                
                .circuit-path {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: circuit-draw 2s ease-out forwards;
                }
                .signal-pulse {
                    offset-path: path("M0,50 Q25,50 40,20 T80,20 T100,50");
                    animation: move-signal 3s linear infinite;
                }
                @keyframes circuit-draw {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes move-signal {
                    0% { offset-distance: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { offset-distance: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default DiscoveryWizard;
