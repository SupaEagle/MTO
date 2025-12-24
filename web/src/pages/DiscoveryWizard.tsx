import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Target, Heart, Mic, Upload, ArrowRight, ArrowLeft, CheckCircle, Search } from 'lucide-react';
import DNALoadingScreen from '../components/onboarding/DNALoadingScreen';
import VaultUploader from '../components/VaultUploader';

// --- Types ---
type WizardStep = 'footprint' | 'mission' | 'audience' | 'voice' | 'vault';

interface WizardData {
    // Step 1: Footprint
    website: string;
    socialHandle: string;
    // Step 2: Mission
    missionGoal: string; // 'awareness' | 'leads' | 'recruitment' | 'other'
    missionText: string;
    // Step 3: Audience
    homeRunClient: string;
    // Step 4: Voice
    adjectives: string[];
    antiStyle: string;
    // Step 5: Vault (Mocking file uploads for now)
    files: string[];
}

const ADJECTIVES_LIST = ['Professional', 'Witty', 'Bold', 'Empathetic', 'Authoritative', 'Minimalist', 'Energetic', 'Luxurious', 'Friendly', 'Tech-Forward'];

const LeanDiscoveryWizard = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<WizardStep>('footprint');
    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState<WizardData>({
        website: '',
        socialHandle: '',
        missionGoal: '',
        missionText: '',
        homeRunClient: '',
        adjectives: [],
        antiStyle: '',
        files: []
    });

    // New state for success view
    const [submitted, setSubmitted] = useState(false);

    // Auto-redirect effect
    useEffect(() => {
        if (submitted) {
            const timer = setTimeout(() => {
                // Set the active client context for the dashboard
                localStorage.setItem('mansa_sub_account_id', clientId);
                navigate('/client');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [submitted, navigate]);

    const queryParams = new URLSearchParams(window.location.search);
    const clientId = queryParams.get('client_id') || '00000000-0000-0000-0000-000000000000';

    // --- Navigation Helpers ---
    const nextStep = (next: WizardStep) => setStep(next);
    const prevStep = (prev: WizardStep) => setStep(prev);

    // --- Submission Handler ---
    const handleSubmit = async () => {
        setIsProcessing(true);
        try {
            // Send data to backend
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
            const res = await fetch(`${BACKEND_URL}/api/wizard/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rawAnswers: formData,
                    subAccountId: clientId,
                    timestamp: new Date().toISOString()
                })
            });

            if (!res.ok) throw new Error("Submission Failed");

            const data = await res.json();
            console.log("Wizard Success:", data);

            setIsProcessing(false);
            setSubmitted(true);

        } catch (error) {
            console.error("Submission failed", error);
            setIsProcessing(false);
            alert("Failed to submit wizard.");
        }
    };

    // If processing, show the DNA Loader
    if (isProcessing) {
        return <DNALoadingScreen />;
    }

    // If submitted, show Success View
    if (submitted) {
        return (
            <div className="min-h-screen bg-[#05050A] text-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
                <div className="w-24 h-24 bg-gradient-to-br from-[#E63946] to-[#FF00FF] rounded-full blur-[80px] absolute" />
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-[#E63946] to-[#FF00FF] mb-6 relative z-10">
                    Transformation Ignited.
                </h1>
                <p className="text-xl text-white/60 max-w-2xl mb-8 relative z-10">
                    Your Brand DNA has been successfully sequenced. Our engines are now generating your custom strategy.
                </p>
                <div className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm max-w-md w-full relative z-10">
                    <h3 className="text-lg font-semibold text-white mb-2">Redirecting...</h3>
                    <p className="text-sm text-white/50">Taking you to your new Headquarters.</p>
                </div>
                <button onClick={() => window.location.reload()} className="mt-12 text-white/30 hover:text-white transition-colors text-sm relative z-10">
                    Start Another Transformation
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl min-h-[600px]">

                {/* Left Sidebar: Progress & Context */}
                <div className="bg-slate-900 md:bg-slate-900/50 border-r border-slate-800 p-8 flex flex-col justify-between relative overflow-hidden">
                    <div className="z-10">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                Brand DNA
                            </h1>
                            <p className="text-slate-500 text-sm mt-2">The Lean Wizard</p>
                        </div>

                        {/* Steps Navigation */}
                        <div className="space-y-6">
                            <StepIndicator active={step === 'footprint'} label="Digital Footprint" icon={<Globe className="w-4 h-4" />} done={!!formData.website} />
                            <StepIndicator active={step === 'mission'} label="90-Day Mission" icon={<Target className="w-4 h-4" />} done={!!formData.missionText} />
                            <StepIndicator active={step === 'audience'} label="Home Run Client" icon={<Heart className="w-4 h-4" />} done={!!formData.homeRunClient} />
                            <StepIndicator active={step === 'voice'} label="Voice Calibration" icon={<Mic className="w-4 h-4" />} done={formData.adjectives.length > 0} />
                            <StepIndicator active={step === 'vault'} label="The Vault" icon={<Upload className="w-4 h-4" />} done={false} />
                        </div>
                    </div>

                    {/* AI Context Box */}
                    <div className="z-10 bg-indigo-900/10 border border-indigo-500/20 p-4 rounded-xl mt-8">
                        <p className="text-indigo-300 text-xs leading-relaxed">
                            <strong>🤖 Gemini 3.0:</strong> "Give me the seed, I'll grow the tree. I'll scrape your site and analyze your answers to build your full strategy."
                        </p>
                    </div>

                    {/* Decorative Blob */}
                    <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none" />
                </div>

                {/* Right Content: The Form */}
                <div className="md:col-span-2 p-8 md:p-12 flex flex-col relative">

                    <div className="flex-1">
                        {/* Step 1: Digital Footprint */}
                        {step === 'footprint' && (
                            <div className="space-y-6 animate-fadeIn">
                                <Header title="The Digital Footprint" subtitle="Where do you currently exist online? Gemini will start crawling." />

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Company Website URL</label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-3.5 w-5 h-5 text-indigo-400" />
                                        <input
                                            type="text"
                                            placeholder="www.example.com"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            value={formData.website}
                                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Main Social Handle</label>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-indigo-400" />
                                        <input
                                            type="text"
                                            placeholder="@example_official"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            value={formData.socialHandle}
                                            onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">We'll detect your colors, basic tone, and industry from these links.</p>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Mission */}
                        {step === 'mission' && (
                            <div className="space-y-6 animate-fadeIn">
                                <Header title="The 90-Day Mission" subtitle="What is the single most important goal for the next 3 months?" />

                                <div className="grid grid-cols-3 gap-3">
                                    {['Brand Awareness', 'Lead Generation', 'Recruitment'].map((goal) => (
                                        <button
                                            key={goal}
                                            onClick={() => setFormData({ ...formData, missionGoal: goal })}
                                            className={`p-3 rounded-lg border text-sm font-medium transition-all ${formData.missionGoal === goal
                                                ? 'bg-indigo-600 border-indigo-500 text-white'
                                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                                                }`}
                                        >
                                            {goal}
                                        </button>
                                    ))}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Specifics (e.g. "20 new dental implants")</label>
                                    <input
                                        type="text"
                                        placeholder="We need to sell 500 units of X..."
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        value={formData.missionText}
                                        onChange={(e) => setFormData({ ...formData, missionText: e.target.value })}
                                        autoFocus
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 3: Audience */}
                        {step === 'audience' && (
                            <div className="space-y-6 animate-fadeIn">
                                <Header title="The Home Run Client" subtitle="Describe your absolute favorite client story. Who were they, what was wrong, and how did you fix it?" />

                                <textarea
                                    className="w-full h-40 bg-slate-950 border border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                    placeholder="e.g. Mrs. Jones came in with a broken tooth and was terrified of dentists. We used our sedation protocol..."
                                    value={formData.homeRunClient}
                                    onChange={(e) => setFormData({ ...formData, homeRunClient: e.target.value })}
                                    autoFocus
                                />
                                <p className="text-xs text-slate-500">
                                    Gemini will extract demographics, pain points, and desires from this narrative.
                                </p>
                            </div>
                        )}

                        {/* Step 4: Voice */}
                        {step === 'voice' && (
                            <div className="space-y-6 animate-fadeIn">
                                <Header title="Voice Calibration" subtitle="Pick 3 adjectives that describe your brand." />

                                <div className="flex flex-wrap gap-2">
                                    {ADJECTIVES_LIST.map((adj) => (
                                        <button
                                            key={adj}
                                            onClick={() => {
                                                const current = formData.adjectives;
                                                const isSelected = current.includes(adj);
                                                if (isSelected) {
                                                    setFormData({ ...formData, adjectives: current.filter(a => a !== adj) });
                                                } else if (current.length < 3) {
                                                    setFormData({ ...formData, adjectives: [...current, adj] });
                                                }
                                            }}
                                            className={`px-3 py-1.5 rounded-full text-sm border transition-all ${formData.adjectives.includes(adj)
                                                ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                                                }`}
                                        >
                                            {adj}
                                        </button>
                                    ))}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">The "Anti-Style" (Guardrails)</label>
                                    <input
                                        type="text"
                                        placeholder="What do you HATE? (e.g. No emoji overload, No slang)"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-red-500/50 outline-none transition-all"
                                        value={formData.antiStyle}
                                        onChange={(e) => setFormData({ ...formData, antiStyle: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 5: Vault */}
                        {step === 'vault' && (
                            <div className="space-y-6 animate-fadeIn">
                                <Header title="The Vault" subtitle="Upload any existing assets (PDFs, Decks) to ground the AI." />
                                <VaultUploader
                                    subAccountId={clientId}
                                    onUploadComplete={(url: string) => {
                                        console.log("Asset secured:", url);
                                        setFormData(prev => ({ ...prev, files: [...prev.files, url] }));
                                    }}
                                />
                            </div>
                        )}

                    </div>

                    {/* Footer / Controls */}
                    <div className="pt-8 flex items-center justify-between border-t border-slate-800/50 mt-8">
                        {step !== 'footprint' ? (
                            <button
                                onClick={() => {
                                    if (step === 'mission') prevStep('footprint');
                                    if (step === 'audience') prevStep('mission');
                                    if (step === 'voice') prevStep('audience');
                                    if (step === 'vault') prevStep('voice');
                                }}
                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                        ) : (
                            <div /> // Spacer
                        )}

                        <button
                            onClick={() => {
                                if (step === 'footprint') nextStep('mission');
                                else if (step === 'mission') nextStep('audience');
                                else if (step === 'audience') nextStep('voice');
                                else if (step === 'voice') nextStep('vault');
                                else if (step === 'vault') handleSubmit();
                            }}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all"
                        >
                            {step === 'vault' ? 'Ignite Transformation' : 'Next Step'} <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

const Header = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div>
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        <p className="text-slate-400 text-lg leading-relaxed">{subtitle}</p>
    </div>
);

const StepIndicator = ({ active, label, icon, done }: { active: boolean, label: string, icon: React.ReactNode, done: boolean }) => (
    <div className={`flex items-center gap-3 ${active ? 'opacity-100' : 'opacity-40'} transition-opacity`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${active ? 'bg-indigo-600 border-indigo-500 text-white' :
            done ? 'bg-green-500/20 border-green-500 text-green-400' :
                'bg-slate-900 border-slate-700 text-slate-500'
            }`}>
            {done && !active ? <CheckCircle className="w-4 h-4" /> : icon}
        </div>
        <span className={`font-medium text-sm ${active ? 'text-white' : 'text-slate-400'}`}>{label}</span>
    </div>
);

export default LeanDiscoveryWizard;
