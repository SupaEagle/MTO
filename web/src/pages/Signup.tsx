import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Tier & Credentials
        tier: 'Growth (Pro)', // Default to Growth
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Agency Owner',

        // Step 2: Agency Info
        agencyName: '',
        agencyAddress: '',
        agencyWebsite: '',
        teamSize: '1-5',

        // Step 3: Confirmation (Implicit)
        agreedToTerms: false
    });

    const updateFormData = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step === 1 && formData.tier === 'Starter (Solo)') {
            setStep(3); // Skip Agency Identification for Solo
        } else {
            setStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (step === 3 && formData.tier === 'Starter (Solo)') {
            setStep(1);
        } else {
            setStep(prev => prev - 1);
        }
    };

    const handleActivate = () => {
        // Here you would trigger the backend account creation
        console.log('Activating account with data:', formData);
        setStep(4); // Move to Success
    };

    const handleStartSetup = () => {
        if (formData.tier === 'Starter (Solo)') {
            navigate('/discovery');
        } else {
            navigate('/client/strategy/voice'); // Direct to Brand DNA setup
        }
    };

    return (
        <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6 font-sans text-slate-100">
            <div className="w-full max-w-2xl bg-[#0f1016] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative">

                {/* Progress Bar */}
                {step < 4 && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                        <div
                            className="h-full bg-gradient-to-r from-brand-pink to-brand-purple transition-all duration-300"
                            style={{ width: `${(step / 3) * 100}%` }}
                        ></div>
                    </div>
                )}

                <div className="p-8 md:p-12">
                    {/* Header */}
                    {step < 4 && (
                        <div className="mb-8 text-center relative">
                            {/* Home Button (Step 1 only) */}
                            {step === 1 && (
                                <button
                                    onClick={() => navigate('/')}
                                    className="absolute top-1 left-0 text-slate-500 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Home
                                </button>
                            )}
                            <h2 className="text-2xl font-bold text-white mb-2">Create Your Account</h2>
                            <p className="text-slate-400 text-sm">Step {step} of 3</p>
                        </div>
                    )}

                    {/* Step 1: Tier & Credentials */}
                    {step === 1 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Your Plan</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {['Starter (Solo)', 'Growth (Pro)', 'Agency (CMO)'].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => updateFormData('tier', t)}
                                            className={`p-4 rounded-xl border text-left transition-all ${formData.tier === t
                                                ? 'border-brand-purple bg-brand-purple/10 ring-1 ring-brand-purple'
                                                : 'border-white/10 hover:border-white/20 bg-white/5'
                                                }`}
                                        >
                                            <div className={`w-4 h-4 rounded-full border mb-3 flex items-center justify-center ${formData.tier === t ? 'border-brand-purple' : 'border-slate-500'}`}>
                                                {formData.tier === t && <div className="w-2 h-2 rounded-full bg-brand-purple"></div>}
                                            </div>
                                            <span className="text-sm font-bold text-white block">{t.split('(')[0].trim()}</span>
                                            <span className="text-xs text-slate-400 block mt-1">{t.split('(')[1].replace(')', '')}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => updateFormData('email', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
                                        placeholder="you@agency.com"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => updateFormData('password', e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Confirm Password</label>
                                        <input
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Your Role</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => updateFormData('role', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors appearance-none"
                                    >
                                        <option>Agency Owner</option>
                                        <option>Manager</option>
                                        <option>Team Member</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Agency Identification */}
                    {step === 2 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-lg p-4 mb-6">
                                <p className="text-sm text-brand-purple font-medium">Agency Setup Required</p>
                                <p className="text-xs text-slate-400 mt-1">Since you selected a pro tier, we need your agency details for white-label configuration.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Agency Name</label>
                                <input
                                    type="text"
                                    value={formData.agencyName}
                                    onChange={(e) => updateFormData('agencyName', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors"
                                    placeholder="Acme Digital"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Agency Address (HQ)</label>
                                <input
                                    type="text"
                                    value={formData.agencyAddress}
                                    onChange={(e) => updateFormData('agencyAddress', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors"
                                    placeholder="123 Market St, San Francisco, CA"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Agency Website <span className="text-slate-500 font-normal">(Optional)</span></label>
                                    <input
                                        type="url"
                                        value={formData.agencyWebsite}
                                        onChange={(e) => updateFormData('agencyWebsite', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors"
                                        placeholder="https://"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Team Size</label>
                                    <select
                                        value={formData.teamSize}
                                        onChange={(e) => updateFormData('teamSize', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors appearance-none"
                                    >
                                        <option>1-5 Employees</option>
                                        <option>6-20 Employees</option>
                                        <option>21-50 Employees</option>
                                        <option>50+ Employees</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Confirmation & Billing */}
                    {step === 3 && (
                        <div className="space-y-8 animate-fadeIn">
                            <div className="glass p-6 rounded-xl border border-brand-gold/30">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                                    Plan Summary
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between py-2 border-b border-white/10">
                                        <span className="text-slate-400">Selected Tier</span>
                                        <span className="font-bold text-white">{formData.tier}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-white/10">
                                        <span className="text-slate-400">Monthly Cost</span>
                                        <span className="font-bold text-white">
                                            {formData.tier.includes('Starter') ? '$99/mo' :
                                                formData.tier.includes('Growth') ? '$299/mo' : '$999/mo'}
                                        </span>
                                    </div>
                                    <div className="pt-2">
                                        <span className="text-slate-400 block mb-2">Included Features:</span>
                                        <ul className="list-disc pl-4 space-y-1 text-slate-300">
                                            {formData.tier.includes('Starter') ? (
                                                <>
                                                    <li>1 User Account</li>
                                                    <li>3 Client Profiles</li>
                                                </>
                                            ) : (
                                                <>
                                                    <li>Unlimited Client Accounts</li>
                                                    <li>White Labeling Enabled</li>
                                                    <li>Full Approval Loop</li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.agreedToTerms}
                                        onChange={(e) => updateFormData('agreedToTerms', e.target.checked)}
                                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-500 bg-black/20 checked:border-brand-green checked:bg-brand-green transition-all"
                                    />
                                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                    I agree to the <a href="#" className="text-brand-purple hover:underline">Terms of Service</a> and <a href="#" className="text-brand-purple hover:underline">Privacy Policy</a>.
                                </span>
                            </label>
                        </div>
                    )}

                    {/* Step 4: Success */}
                    {step === 4 && (
                        <div className="text-center animate-fadeIn py-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-brand-pink to-brand-purple rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-pink/30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Welcome onboard!</h2>
                            <p className="text-slate-400 max-w-md mx-auto mb-8">
                                Your agency account for <span className="text-white font-bold">{formData.agencyName || 'your team'}</span> is ready. Let's get your first client set up.
                            </p>

                            <div className="bg-surface-card border border-white/5 rounded-xl p-6 mb-8 max-w-sm mx-auto text-left">
                                <p className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Next Task</p>
                                <p className="text-white font-medium">Configure Client Brand DNA</p>
                                <p className="text-xs text-slate-500 mt-1">Required to calibrate AI content generation.</p>
                            </div>

                            <button
                                onClick={handleStartSetup}
                                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all shadow-lg transform hover:-translate-y-1"
                            >
                                Start Client Setup Wizard
                            </button>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    {step < 4 && (
                        <div className="mt-10 flex justify-between items-center border-t border-white/5 pt-6">
                            {step > 1 ? (
                                <button
                                    onClick={handleBack}
                                    className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                                >
                                    Back
                                </button>
                            ) : (
                                <div></div>
                            )}

                            {step < 3 ? (
                                <button
                                    onClick={handleNext}
                                    className="px-6 py-2.5 bg-gradient-to-r from-brand-pink to-brand-purple text-white font-bold text-sm rounded-full hover:opacity-90 transition-all shadow-lg shadow-brand-pink/20"
                                >
                                    Next Step
                                </button>
                            ) : (
                                <button
                                    onClick={handleActivate}
                                    disabled={!formData.agreedToTerms}
                                    className={`px-8 py-3 bg-brand-gold text-black font-bold text-sm rounded-full transition-all shadow-lg ${formData.agreedToTerms
                                        ? 'hover:bg-brand-goldDeep hover:scale-105 shadow-brand-gold/20'
                                        : 'opacity-50 cursor-not-allowed'
                                        }`}
                                >
                                    Activate Account
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
