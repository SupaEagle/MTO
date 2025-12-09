import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="radix-page-bg text-slate-100 min-h-screen font-sans selection:bg-brand-pink selection:text-white">
            {/* Top Banner */}
            <div className="flex justify-center pt-4 sticky top-0 z-50">
                <div className="inline-flex items-center gap-2 rounded-full border pill-gold px-3 py-1 text-xs sm:text-sm text-brand-gold shadow-sm backdrop-blur-md bg-black/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
                    <span className="font-medium text-brand-gold">New</span>
                    <span className="text-slate-200">
                        The <strong>Agency OS 2.0</strong> is here
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-40">
                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center shadow-lg shadow-brandSoft">
                        {/* Placeholder for Logo if image fails, or use the image */}
                        <img src={logo} alt="MT" className="h-6 w-6 object-contain brightness-0 invert" onError={(e) => e.currentTarget.style.display = 'none'} />
                        <span className="text-xs font-bold text-white absolute" style={{ opacity: 0 }}>MT</span>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-lg font-bold tracking-tight text-white">Mansa Tina</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">Marketing ERP</span>
                    </div>
                </div>

                <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
                    <a href="#problem" className="hover:text-white transition-colors">Why Us</a>
                    <a href="#approval-loop" className="hover:text-white transition-colors">The Loop</a>
                    <a href="#features" className="hover:text-white transition-colors">Platform</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                </div>

                <div className="flex gap-4">
                    <button className="hidden md:block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Log In
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-6 py-2 bg-gradient-to-r from-brand-pink to-brand-purple text-white text-sm font-bold rounded-full hover:opacity-90 transition-all shadow-lg shadow-brandSoft"
                    >
                        Sign Up
                    </button>
                </div>
            </nav>

            {/* 1. Hero Section */}
            <header className="container mx-auto px-6 pt-16 pb-24 text-center relative z-10">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-white">
                        The Marketing ERP for Agencies.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-purple to-brand-gold">
                            Scale Your Client Capacity.
                        </span><br />
                        Protect Your Margins.
                    </h1>
                    <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Mansa Tina replaces 80% of your manual content tasks, speeds up client approvals by 5X, and enables true White Label service for unlimited growth.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
                        <button className="px-8 py-4 bg-white text-surface-dark font-bold rounded-full hover:bg-slate-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] text-lg text-black">
                            Request Agency Demo
                        </button>
                        <button className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-colors text-lg flex items-center justify-center gap-2 border border-white/10">
                            <span className="text-brand-gold">▶</span> Watch "Approval Loop" Demo
                        </button>
                    </div>

                    {/* Visual: Approval Loop / Mobile Mockup */}
                    <div className="relative mx-auto max-w-4xl">
                        <div className="absolute inset-0 bg-brand-purple/20 blur-[100px] rounded-full -z-10"></div>
                        <div className="glass rounded-2xl border border-white/10 p-2 shadow-2xl">
                            <div className="bg-[#0c0118] rounded-xl overflow-hidden aspect-[16/9] relative flex items-center justify-center border border-white/5">
                                {/* Abstract representation of the dashboard */}
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-brand-pink/5"></div>
                                <div className="text-center z-10 p-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">Agency Dashboard</h3>
                                    <p className="text-slate-500 mb-8">White Label Interface • Client Approval Queue • Real-time Analytics</p>

                                    {/* Mock Cards */}
                                    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
                                        <div className="glass p-4 rounded-lg border-l-2 border-brand-pink">
                                            <p className="text-xs text-slate-400">Pending Approvals</p>
                                            <p className="text-2xl font-bold text-white">12</p>
                                        </div>
                                        <div className="glass p-4 rounded-lg border-l-2 border-brand-purple">
                                            <p className="text-xs text-slate-400">Active Clients</p>
                                            <p className="text-2xl font-bold text-white">42</p>
                                        </div>
                                        <div className="glass p-4 rounded-lg border-l-2 border-brand-gold">
                                            <p className="text-xs text-slate-400">MRR</p>
                                            <p className="text-2xl font-bold text-white">$184k</p>
                                        </div>
                                    </div>

                                    {/* Mobile Floating Element */}
                                    <div className="absolute -right-8 -bottom-12 w-48 bg-black border border-slate-700 rounded-[2rem] p-3 shadow-2xl transform -rotate-6 hidden md:block">
                                        <div className="bg-slate-900 rounded-xl h-64 flex flex-col items-center justify-center relative overflow-hidden">
                                            <div className="absolute top-0 w-full h-1 bg-brand-gold shadow-[0_0_10px_#FFD700]"></div>
                                            <p className="text-[10px] text-brand-gold uppercase tracking-widest mb-2">Client View</p>
                                            <div className="text-4xl">👍</div>
                                            <p className="text-xs text-white mt-4 text-center px-4">Swipe to Approve<br />Week 4 Content</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. The Problem & Solution */}
            <section id="problem" className="py-24 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Stop managing tasks for 10 clients.<br />
                            <span className="text-brand-purple">Start leading strategy for 30.</span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            Mansa Tina is designed to help your agency manage 3X more clients with the same headcount.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                pain: "Eroding Margins",
                                solution: "AI Content Studio",
                                impact: "Cuts creation time by 60-80%",
                                color: "text-red-400",
                                border: "hover:border-red-400/50"
                            },
                            {
                                pain: "Slow Client Approvals",
                                solution: "The Approval Loop",
                                impact: "Days to minutes cycle time",
                                color: "text-brand-gold",
                                border: "hover:border-brand-gold/50"
                            },
                            {
                                pain: "Capacity Ceiling",
                                solution: "Predictive Scheduling",
                                impact: "Frees up Community Managers",
                                color: "text-brand-pink",
                                border: "hover:border-brand-pink/50"
                            },
                            {
                                pain: "Inconsistent Branding",
                                solution: "Brand Strategy DNA",
                                impact: "100% Brand Compliance",
                                color: "text-brand-purple",
                                border: "hover:border-brand-purple/50"
                            }
                        ].map((item, i) => (
                            <div key={i} className={`glass p-8 rounded-2xl border border-white/5 transition-all duration-300 ${item.border} group`}>
                                <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${item.color}`}>{item.pain}</p>
                                <h3 className="text-xl font-bold text-white mb-4">{item.solution}</h3>
                                <div className="h-px w-full bg-white/10 mb-4"></div>
                                <p className="text-sm text-slate-300">{item.impact}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Deep Dive: The Approval Loop */}
            <section id="approval-loop" className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/5 to-transparent"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <div className="inline-block px-4 py-1 rounded-full border border-brand-pink/30 bg-brand-pink/10 text-brand-pink text-xs font-bold uppercase tracking-wider mb-6">
                                The Killer Feature
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                                The Approval Loop:<br />
                                <span className="text-white">Total Client Control.</span><br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-white">Zero Delay.</span>
                            </h2>
                            <p className="text-lg text-slate-300 mb-10">
                                Slow client approvals are the #1 killer of agency profit. We fixed it. Guaranteed client retention and profit protection by eliminating bottlenecks.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { step: 1, title: "AI Generates", desc: "Every Sunday night, a full week of optimized content is auto-generated based on Client DNA." },
                                    { step: 2, title: "Mobile Notification", desc: "Your client gets a push: 'Your Week is Ready for Approval' (White Labeled)." },
                                    { step: 3, title: "Swipe to Approve", desc: "Client swipes right to approve, left to regenerate. Done in seconds." }
                                ].map((item) => (
                                    <div key={item.step} className="flex gap-5">
                                        <div className="w-12 h-12 rounded-full bg-surface-card border border-white/10 flex items-center justify-center text-xl font-bold text-brand-gold shadow-lg shadow-brandSoft flex-shrink-0">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                            <p className="text-slate-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            {/* Abstract Phone/App Visual */}
                            <div className="relative mx-auto w-80 h-[600px] bg-black rounded-[3rem] border-8 border-slate-800 shadow-2xl flex flex-col overflow-hidden">
                                <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-brand-pink/20 to-transparent pointer-events-none"></div>
                                <div className="mt-12 px-6 text-center">
                                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Agency Notification</p>
                                    <h3 className="text-white text-xl font-bold">Weekly Review</h3>
                                </div>
                                <div className="flex-1 m-4 bg-surface-card rounded-2xl border border-white/10 relative overflow-hidden group">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">📸</div>
                                            <p className="text-white font-bold">Post #1</p>
                                            <p className="text-xs text-slate-400">Monday Motivation</p>
                                        </div>
                                    </div>
                                    {/* Swipe indicators */}
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                                        <div className="w-12 h-12 rounded-full border border-red-500/50 flex items-center justify-center text-red-500">✕</div>
                                        <div className="w-12 h-12 rounded-full border border-green-500/50 flex items-center justify-center text-green-500">✓</div>
                                    </div>
                                </div>
                                <div className="h-20 bg-slate-900 flex items-center justify-center">
                                    <div className="w-32 h-1 bg-slate-800 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Feature Showcase (9 Pillars) */}
            <section id="features" className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Scalable Marketing Operating System</h2>
                        <p className="text-slate-400">The 9 core modules to run your entire client roster.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[
                            "Brand Strategy & DNA",
                            "Creative Studio",
                            "Content Calendar",
                            "Channels & Engagement",
                            "CMO Analytics & ROI",
                            "Paid Media & Ads",
                            "Lead Management",
                            "Settings & Admin",
                            "Global Dashboard"
                        ].map((title, i) => (
                            <div key={i} className="glass p-6 rounded-xl border border-white/5 hover:border-brand-purple/50 transition-colors group relative">
                                <div className="text-brand-gold text-4xl font-black absolute top-4 right-4">
                                    0{i + 1}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                                <p className="text-sm text-slate-400">
                                    {i === 0 && "Define and audit every client's unique voice and target customer."}
                                    {i === 1 && "Automated, compliant content that scales with client volume."}
                                    {i === 2 && "Manage all clients' content globally in one predictive dashboard."}
                                    {i === 3 && "Centralized API management and Unified Inbox."}
                                    {i === 4 && "Generate C-Suite-ready reports with actionable insights."}
                                    {i === 5 && "Manage and optimize ad spend in a single view."}
                                    {i === 6 && "Automate lead nurturing workflows for sales teams."}
                                    {i === 7 && "White Label setup, Multi-Client Admin and Permissions."}
                                    {i === 8 && "Real-time visibility across all clients' performance."}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Pricing */}
            <section id="pricing" className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Pricing Built for Scale</h2>
                        <p className="text-slate-400">Choose the plan that fits your agency's growth stage.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                        {/* Starter */}
                        <div className="glass p-8 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                            <p className="text-slate-400 text-sm mb-6">Solo consultants</p>
                            <p className="text-3xl font-bold text-white mb-6">$99<span className="text-sm text-slate-500 font-normal">/mo</span></p>
                            <button className="w-full py-3 border border-white/20 rounded-lg text-white font-bold hover:bg-white/5 transition-colors mb-6">
                                Start Trial
                            </button>
                            <ul className="text-sm text-slate-300 space-y-3">
                                <li>✓ 1 User</li>
                                <li>✓ 3 Client Accounts</li>
                            </ul>
                        </div>

                        {/* Growth */}
                        <div className="glass p-8 rounded-2xl border border-brand-purple shadow-brandSoft transform scale-105 relative z-10">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-brand-purple text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                Standard
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
                            <p className="text-slate-400 text-sm mb-6">Growing agencies</p>
                            <p className="text-3xl font-bold text-white mb-6">$299<span className="text-sm text-slate-500 font-normal">/mo</span></p>
                            <button className="w-full py-3 bg-gradient-to-r from-brand-pink to-brand-purple rounded-lg text-white font-bold hover:opacity-90 transition-colors mb-6">
                                Start Growth Trial
                            </button>
                            <ul className="text-sm text-slate-300 space-y-3">
                                <li className="font-bold text-brand-gold">✓ The Approval Loop</li>
                                <li>✓ 5 Users & 15 Clients</li>
                                <li>✓ Full Analytics</li>
                            </ul>
                        </div>

                        {/* Agency */}
                        <div className="glass p-8 rounded-2xl border border-brand-gold/50">
                            <h3 className="text-xl font-bold text-white mb-2">Agency</h3>
                            <p className="text-slate-400 text-sm mb-6">Scaling firms</p>
                            <p className="text-3xl font-bold text-white mb-6">$999<span className="text-sm text-slate-500 font-normal">/mo</span></p>
                            <button className="w-full py-3 border border-brand-gold/50 text-brand-gold rounded-lg font-bold hover:bg-brand-gold/10 transition-colors mb-6">
                                Contact Sales
                            </button>
                            <ul className="text-sm text-slate-300 space-y-3">
                                <li className="font-bold text-brand-gold">✓ White Labeling</li>
                                <li>✓ Unlimited Clients</li>
                                <li>✓ Dedicated Manager</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Social Proof & Footer */}
            <section className="py-24 border-t border-white/5 bg-black/40 text-center">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                        <div className="glass p-6 rounded-xl text-left">
                            <p className="text-slate-300 italic mb-4">"We doubled our client roster in 3 months without hiring a single new account manager. The Approval Loop is a game changer."</p>
                            <p className="text-white font-bold">- Sarah Jenkins, Founder Apex Digital</p>
                        </div>
                        <div className="glass p-6 rounded-xl text-left">
                            <p className="text-slate-300 italic mb-4">"Finally, an ERP that actually understands how agencies work. The White Label features make us look huge to our clients."</p>
                            <p className="text-white font-bold">- Marcus Thorne, CEO Thorne Media</p>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold mb-6 text-white">Stop Servicing. Start Scaling.</h2>
                    <p className="text-xl text-slate-400 mb-10">Join the top 1% of agencies using AI to dominate their niche.</p>
                    <button className="px-10 py-5 bg-white text-surface-dark font-bold rounded-full hover:bg-slate-100 transition-colors text-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] text-black">
                        Request Your Agency Demo Today
                    </button>

                    <div className="mt-20 pt-8 border-t border-white/10 text-slate-600 text-sm flex flex-col md:flex-row justify-between items-center">
                        <p>&copy; 2025 Mansa Tina Marketing. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-white">Privacy</a>
                            <a href="#" className="hover:text-white">Terms</a>
                            <a href="#" className="hover:text-white">Status</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
