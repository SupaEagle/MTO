import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingWizard = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        companyName: '',
        industry: '',
        goals: [] as string[],
    });

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            // Complete onboarding
            navigate('/client');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                        <span>Brand DNA</span>
                        <span>Goals</span>
                        <span>Connect</span>
                        <span>Launch</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
                            style={{ width: `${(step / 4) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="bg-slate-800 p-8 md:p-12 rounded-2xl border border-slate-700 shadow-2xl">
                    {step === 1 && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome to Mansa Tina</h2>
                            <p className="text-slate-400 mb-8">Let's start by defining your Brand DNA.</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                        placeholder="e.g. Acme Innovations"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Industry</label>
                                    <select
                                        value={formData.industry}
                                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                    >
                                        <option value="">Select an industry</option>
                                        <option value="tech">Technology / SaaS</option>
                                        <option value="ecommerce">E-Commerce</option>
                                        <option value="agency">Marketing Agency</option>
                                        <option value="consulting">Consulting</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold text-white mb-2">What are your goals?</h2>
                            <p className="text-slate-400 mb-8">Select all that apply.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Brand Awareness', 'Lead Generation', 'Thought Leadership', 'Sales / Revenue', 'Community Building', 'Talent Recruitment'].map((goal) => (
                                    <button
                                        key={goal}
                                        onClick={() => {
                                            const newGoals = formData.goals.includes(goal)
                                                ? formData.goals.filter(g => g !== goal)
                                                : [...formData.goals, goal];
                                            setFormData({ ...formData, goals: newGoals });
                                        }}
                                        className={`p-4 rounded-xl border text-left transition-all ${formData.goals.includes(goal)
                                                ? 'bg-purple-900/30 border-purple-500 text-white'
                                                : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'
                                            }`}
                                    >
                                        {goal}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold text-white mb-2">Connect your channels</h2>
                            <p className="text-slate-400 mb-8">Where do you want to post content?</p>

                            <div className="space-y-4">
                                {['LinkedIn', 'X (Twitter)', 'Instagram', 'Facebook'].map((platform) => (
                                    <div key={platform} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                                        <span className="font-bold text-white">{platform}</span>
                                        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors">
                                            Connect
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="animate-fade-in text-center">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                                🚀
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">You're all set!</h2>
                            <p className="text-slate-400 mb-8">
                                We've set up your workspace based on your profile. Let's create your first campaign.
                            </p>
                        </div>
                    )}

                    <div className="mt-10 flex justify-between items-center">
                        {step > 1 ? (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="text-slate-400 hover:text-white font-medium"
                            >
                                Back
                            </button>
                        ) : (
                            <div></div>
                        )}
                        <button
                            onClick={handleNext}
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-purple-900/20"
                        >
                            {step === 4 ? 'Enter Workspace' : 'Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingWizard;
