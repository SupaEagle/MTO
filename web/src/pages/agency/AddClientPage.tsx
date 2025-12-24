import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Globe, Shield, Zap } from 'lucide-react'; // Lucide Icons

const INDUSTRIES = ['Healthcare / Dental', 'Real Estate', 'Legal', 'E-Commerce'];


export default function AddClientPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: '',
        industry: '',
        primaryContact: '',
        email: '',
        tier: 'growth', // 'starter', 'growth', 'scale'
        website: '',
        address: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Use direct fetch to bypass client-side auth check for "God Mode"
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
            const res = await fetch(`${BACKEND_URL}/api/agency/clients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-agency-id': 'mock-agency-id'
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Onboarding failed");

            const data = await res.json();
            console.log("Client created:", data);

            if (data.redirectUrl) {
                // Redirect to the wizard using the URL provided by backend
                // remove the leading slash if needed, or just use it
                navigate(data.redirectUrl);
            } else {
                alert('Client onboarded successfully!');
            }
        } catch (error) {
            console.error("Creation failed:", error);
            alert('Failed to onboard client.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COL: The Input Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                            Onboard New Client
                        </h1>
                        <p className="text-slate-400">Create a dedicated workspace and Brand DNA vault.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-2xl">

                        {/* Section 1: Company Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Globe className="w-5 h-5 text-indigo-400" /> Company Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Acme Dental"
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        value={formData.companyName}
                                    />
                                </div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Industry</label>
                                <select
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === 'Other') {
                                            setFormData({ ...formData, industry: '' }); // Clear for custom input
                                        } else {
                                            setFormData({ ...formData, industry: val });
                                        }
                                    }}
                                    value={INDUSTRIES.includes(formData.industry) ? formData.industry : 'Other'}
                                >
                                    <option value="" disabled>Select Industry...</option>
                                    {INDUSTRIES.map(ind => (
                                        <option key={ind}>{ind}</option>
                                    ))}
                                    <option>Other</option>
                                </select>

                                {/* Custom Industry Input */}
                                {(!INDUSTRIES.includes(formData.industry) && formData.industry !== 'Select Industry...') && (
                                    // If it's not a standard industry, show the input. 
                                    // Initial state is '' -> handled by value="" disabled option
                                    // If user selects "Other", onChange sets it to '', so this input appears.
                                    <div className="mt-2 animate-fadeIn">
                                        <input
                                            type="text"
                                            placeholder="Enter custom industry..."
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                            value={formData.industry}
                                            autoFocus
                                        />
                                    </div>
                                )}


                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Company Website</label>
                                    <input
                                        type="text"
                                        placeholder="https://www.acmedental.com"
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        value={(formData as any).website || ''}
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-slate-800" />

                        {/* Section 2: Contact Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Mail className="w-5 h-5 text-indigo-400" /> Contact & Address
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Point of Contact</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Dr. John Doe"
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        onChange={(e) => setFormData({ ...formData, primaryContact: e.target.value })}
                                        value={formData.primaryContact}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Client Admin Email</label>
                                    <input
                                        type="email"
                                        placeholder="client@company.com"
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        value={formData.email}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Business Address</label>
                                    <input
                                        type="text"
                                        placeholder="123 Main St, Suite 400"
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        value={(formData as any).address || ''}
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-slate-500">
                                * Note: The user will receive a "Magic Link" to set their password.
                            </p>
                        </div>

                        <hr className="border-slate-800" />

                        {/* Section 3: Subscription Tier (Magic Minutes) */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Zap className="w-5 h-5 text-indigo-400" /> Service Tier
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {['Starter', 'Growth', 'Scale'].map((tier) => (
                                    <div
                                        key={tier}
                                        onClick={() => setFormData({ ...formData, tier: tier.toLowerCase() })}
                                        className={`cursor-pointer rounded-xl p-4 border transition-all ${formData.tier === tier.toLowerCase()
                                            ? 'bg-indigo-900/20 border-indigo-500 ring-1 ring-indigo-500'
                                            : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                                            }`}
                                    >
                                        <div className="font-bold text-white">{tier}</div>
                                        <div className="text-xs text-slate-400 mt-1">
                                            {tier === 'Starter' ? '60 Magic Mins' : tier === 'Growth' ? '300 Magic Mins' : '1,000 Magic Mins'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 flex items-center justify-end gap-4">
                            <button type="button" className="text-slate-400 hover:text-white transition">Cancel</button>
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
                            >
                                <Shield className="w-4 h-4" /> Create
                            </button>
                        </div>

                    </form>
                </div>

                {/* RIGHT COL: The "What They See" Preview */}
                <div className="hidden lg:block">
                    <div className="sticky top-8">
                        <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Portal Preview</h3>

                        {/* The Preview Card */}
                        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl opacity-90">
                            {/* Mock Browser Header */}
                            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <div className="ml-4 bg-slate-900 rounded-md px-3 py-1 text-xs text-slate-500 w-full font-mono">
                                    app.mansatina.io/{formData.companyName ? formData.companyName.toLowerCase().replace(/\s/g, '') : 'client'}
                                </div>
                            </div>

                            {/* Mock Dashboard Body */}
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold">
                                        {formData.companyName ? formData.companyName[0] : 'C'}
                                    </div>
                                    <div>
                                        <div className="h-4 w-32 bg-slate-700 rounded mb-2"></div>
                                        <div className="h-3 w-20 bg-slate-800 rounded"></div>
                                    </div>
                                </div>

                                <div className="h-24 bg-slate-800/50 rounded-xl border border-dashed border-slate-700 flex items-center justify-center text-slate-600 text-xs">
                                    Sub-Account Dashboard
                                </div>

                                <div className="bg-green-900/20 border border-green-800 rounded-lg p-3">
                                    <p className="text-green-400 text-xs font-mono">
                                        ✓ Tier: {formData.tier.toUpperCase()} <br />
                                        ✓ White Label: ACTIVE
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-indigo-900/10 border border-indigo-900/50 rounded-lg">
                            <p className="text-indigo-300 text-sm">
                                <strong>💡 Pro Tip:</strong> After adding them, you can click "Impersonate" to set up their Brand DNA before they even log in.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
