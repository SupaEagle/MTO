import { useState } from 'react';
import {
    Palette, Globe, Mail, LifeBuoy, Upload,
    CheckCircle, AlertCircle, Sparkles, Smartphone,
    Layout, Type, Shield, ExternalLink, Save,
    Monitor, Image as ImageIcon
} from 'lucide-react';

const WhiteLabel = () => {
    const [activeTab, setActiveTab] = useState<'identity' | 'domain' | 'comm' | 'support'>('identity');
    const [themeColor, setThemeColor] = useState('#9D4EDD');
    const [secondaryColor, setSecondaryColor] = useState('#FF3EA5');
    const [dnsStatus, setDnsStatus] = useState<'pending' | 'verified'>('pending');

    const zones = [
        { id: 'identity', label: 'Visual Identity', icon: Palette, desc: 'Logo, colors, and themes' },
        { id: 'domain', label: 'Domain Controller', icon: Globe, desc: 'Custom domain and SSL' },
        { id: 'comm', label: 'Communication', icon: Mail, desc: 'Email and signatures' },
        { id: 'support', label: 'Support & Nav', icon: LifeBuoy, desc: 'Help widget and links' },
    ];

    const IdentityZone = () => (
        <div className="space-y-8">
            {/* Logo Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-brand-purple" /> Desktop Assets
                    </h3>
                    <div className="space-y-4">
                        <div className="p-6 border-2 border-dashed border-slate-600 rounded-xl hover:border-brand-purple/50 transition-colors cursor-pointer group text-center">
                            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <Upload className="w-6 h-6 text-slate-400 group-hover:text-brand-purple" />
                            </div>
                            <p className="text-sm font-medium text-white">Light Mode Logo</p>
                            <p className="text-xs text-slate-500">PNG or SVG, min 200px wide</p>
                        </div>
                        <div className="p-6 border-2 border-dashed border-slate-600 rounded-xl hover:border-brand-purple/50 transition-colors cursor-pointer group text-center bg-black/20">
                            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <Upload className="w-6 h-6 text-slate-400 group-hover:text-brand-purple" />
                            </div>
                            <p className="text-sm font-medium text-white">Dark Mode Logo</p>
                            <p className="text-xs text-slate-500">PNG or SVG, transparent background</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-brand-pink" /> Mobile & PWA
                    </h3>
                    <div className="space-y-4">
                        <div className="flex gap-4 items-start">
                            <div className="w-20 h-20 rounded-2xl bg-brand-purple flex items-center justify-center shrink-0 shadow-lg cursor-pointer hover:opacity-90">
                                <img src="/logo-icon.png" alt="" className="w-12 h-12 opacity-50" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-white">App Icon</h4>
                                <p className="text-xs text-slate-400 mb-3">Used for mobile home screen and browser favicons.</p>
                                <button className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg transition-colors">
                                    Replace Icon
                                </button>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-300">PWA Manifest</span>
                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Active</span>
                            </div>
                            <p className="text-xs text-slate-500">Your custom app is ready to be installed on iOS and Android.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Theme Engine */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Layout className="w-5 h-5 text-brand-gold" /> The Theme Engine
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-400">Primary Brand Color</label>
                        <div className="flex gap-3 items-center">
                            <div className="w-12 h-12 rounded-lg shadow-lg border-2 border-white/10" style={{ backgroundColor: themeColor }}></div>
                            <input
                                type="text"
                                value={themeColor}
                                onChange={(e) => setThemeColor(e.target.value)}
                                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white font-mono w-full focus:outline-none focus:border-brand-purple"
                            />
                        </div>
                        <p className="text-xs text-slate-500">Buttons, links, and primary actions.</p>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-400">Secondary Accent</label>
                        <div className="flex gap-3 items-center">
                            <div className="w-12 h-12 rounded-lg shadow-lg border-2 border-white/10" style={{ backgroundColor: secondaryColor }}></div>
                            <input
                                type="text"
                                value={secondaryColor}
                                onChange={(e) => setSecondaryColor(e.target.value)}
                                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white font-mono w-full focus:outline-none focus:border-brand-purple"
                            />
                        </div>
                        <p className="text-xs text-slate-500">Sidebars, badges, and gradients.</p>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-400">Typography</label>
                        <div className="relative">
                            <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white appearance-none focus:outline-none focus:border-brand-purple">
                                <option>Inter (Default)</option>
                                <option>Roboto</option>
                                <option>Poppins</option>
                                <option>Outfit</option>
                                <option value="custom">+ Upload Custom Font</option>
                            </select>
                            <Type className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                        <p className="text-xs text-slate-500">Select Google Fonts or upload WOFF2.</p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                    <label className="text-sm font-bold text-slate-400 mb-2 block">Advanced CSS Injection</label>
                    <textarea
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-xs text-brand-gold h-32 focus:outline-none focus:border-brand-purple/50"
                        placeholder="/* Override specific styles here */&#10;.btn-primary { border-radius: 0px !important; }"
                    ></textarea>
                </div>
            </div>
        </div>
    );

    const DomainZone = () => (
        <div className="space-y-8">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row gap-8 justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-brand-purple" /> Custom Domain
                        </h3>
                        <p className="text-slate-400 text-sm">Where should your clients log in?</p>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-900 rounded-xl p-1 border border-slate-700/50">
                        <span className="px-3 py-1.5 text-slate-500 text-sm font-medium">https://</span>
                        <input
                            type="text"
                            defaultValue="app.growthlab.com"
                            className="bg-transparent text-white font-medium focus:outline-none w-48 md:w-64"
                        />
                        <button
                            onClick={() => setDnsStatus(prev => prev === 'pending' ? 'verified' : 'pending')}
                            className="bg-brand-purple text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-lg hover:bg-brand-purple/90 transition-colors"
                        >
                            Verify
                        </button>
                    </div>
                </div>

                {/* DNS Wizard */}
                <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-700/50 relative overflow-hidden">
                    {dnsStatus === 'verified' && (
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
                    )}

                    <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${dnsStatus === 'verified' ? 'bg-green-500/10' : 'bg-yellow-500/10'
                            }`}>
                            {dnsStatus === 'verified' ? (
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                                <AlertCircle className="w-6 h-6 text-yellow-500 animate-pulse" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-white mb-1">
                                {dnsStatus === 'verified' ? 'Domain Active & Secured' : 'DNS Configuration Pending'}
                            </h4>
                            <p className="text-sm text-slate-400 mb-4">
                                {dnsStatus === 'verified'
                                    ? 'Your custom domain is live with an auto-renewing SSL certificate via Let\'s Encrypt.'
                                    : 'Please add the following CNAME record to your DNS provider (GoDaddy, Cloudflare, etc).'
                                }
                            </p>

                            {dnsStatus !== 'verified' && (
                                <div className="grid grid-cols-3 gap-1 text-xs font-mono bg-black/40 rounded-lg overflow-hidden border border-slate-700">
                                    <div className="p-3 text-slate-500 bg-slate-800/50 border-r border-slate-700">Type</div>
                                    <div className="p-3 text-slate-500 bg-slate-800/50 border-r border-slate-700">Name</div>
                                    <div className="p-3 text-slate-500 bg-slate-800/50">Value</div>

                                    <div className="p-3 text-white">CNAME</div>
                                    <div className="p-3 text-white">app</div>
                                    <div className="p-3 text-brand-gold">whitelabel.mansatina.io</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Screen Designer */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-brand-pink" /> Login Screen Setup
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-slate-400 mb-1 block">Headline</label>
                            <input type="text" defaultValue="Welcome to the GrowthLab Portal" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:border-brand-purple focus:outline-none" />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-slate-400 mb-1 block">Background Image</label>
                            <div className="h-40 border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-purple/50 bg-black/20 group">
                                <ImageIcon className="w-8 h-8 text-slate-500 mb-2 group-hover:text-brand-purple" />
                                <span className="text-sm text-slate-400 group-hover:text-white">Upload HD Wallpaper</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="support_link" className="w-4 h-4 rounded border-slate-600 text-brand-purple bg-slate-700 focus:ring-brand-purple" defaultChecked />
                            <label htmlFor="support_link" className="text-sm text-slate-300">Show "Contact Support" link</label>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-slate-900 rounded-xl border border-slate-700 p-4 relative aspect-video flex items-center justify-center overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
                        <div className="relative z-10 w-64 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl">
                            <div className="w-8 h-8 bg-brand-purple rounded-lg mb-4 mx-auto"></div>
                            <div className="h-2 w-3/4 bg-white/20 rounded mx-auto mb-2"></div>
                            <div className="h-8 bg-slate-800 rounded mb-2"></div>
                            <div className="h-8 bg-brand-purple rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const CommZone = () => (
        <div className="space-y-8">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-brand-purple" /> Email Settings (SMTP)
                </h3>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-blue-400">White Label Emailing</h4>
                        <p className="text-xs text-slate-400">By default, emails come from `noreply@mansatina.com`. Configure SMTP to send from your own domain.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-slate-400 mb-1 block">Sender Name</label>
                            <input type="text" defaultValue="GrowthLab Team" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:border-brand-purple focus:outline-none" />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-400 mb-1 block">From Email</label>
                            <input type="text" defaultValue="support@growthlab.com" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:border-brand-purple focus:outline-none" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-slate-400 mb-1 block">SMTP Host</label>
                            <input type="text" placeholder="smtp.sendgrid.net" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:border-brand-purple focus:outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-bold text-slate-400 mb-1 block">Port</label>
                                <input type="text" defaultValue="587" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:border-brand-purple focus:outline-none" />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-slate-400 mb-1 block">API Key / Pass</label>
                                <input type="password" value="••••••••••••" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:border-brand-purple focus:outline-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Type className="w-5 h-5 text-brand-pink" /> System Signature
                </h3>
                <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-400">Footer Text</label>
                    <textarea
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white h-24 focus:border-brand-purple focus:outline-none"
                        defaultValue="Sent with ❤️ by the GrowthLab Team | Unsubscribe"
                    ></textarea>

                    <div className="flex gap-4">
                        <input type="text" placeholder="Privacy Policy URL" className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm" />
                        <input type="text" placeholder="Terms of Service URL" className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm" />
                    </div>
                </div>
            </div>
        </div>
    );

    const SupportZone = () => (
        <div className="space-y-8">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <LifeBuoy className="w-5 h-5 text-brand-gold" /> Help Widget
                </h3>
                <div className="space-y-4">
                    <p className="text-sm text-slate-400">Replace the default support chat with your own Intercom, Drift, or HubSpot script.</p>
                    <textarea
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-xs text-green-400 h-32 focus:outline-none focus:border-brand-purple/50"
                        placeholder="<!-- Start of Intercom Code -->&#10;<script>&#10;  window.intercomSettings = { ... };&#10;</script>"
                    ></textarea>
                </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-brand-purple" /> Custom Menu Links
                </h3>

                <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-700">
                        <div className="w-8 h-8 rounded bg-slate-600 flex items-center justify-center text-white font-bold">1</div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <input type="text" defaultValue="Book Strategy Call" className="bg-slate-800 border-none rounded px-3 py-1 text-white text-sm" />
                            <input type="text" defaultValue="https://calendly.com/growthlab/strategy" className="bg-slate-800 border-none rounded px-3 py-1 text-slate-400 text-sm" />
                        </div>
                        <button className="text-red-400 hover:text-red-300">
                            <Layout className="w-4 h-4 rotate-45" />
                        </button>
                    </div>

                    <button className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 hover:border-brand-purple hover:text-brand-purple transition-colors text-sm font-bold">
                        + Add Sidebar Link
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                        Identity Core <span className="text-xs bg-brand-purple px-2 py-1 rounded text-white font-bold tracking-wide">MODULE 0.5</span>
                    </h1>
                    <p className="text-slate-400">The White Label Engine. Make this software fully your own.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-2.5 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                        Discard
                    </button>
                    <button className="px-6 py-2.5 bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold rounded-xl shadow-lg hover:shadow-brand-purple/20 hover:scale-105 transition-all flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-3 space-y-2">
                    {zones.map((zone) => (
                        <button
                            key={zone.id}
                            onClick={() => setActiveTab(zone.id as any)}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group relative overflow-hidden ${activeTab === zone.id
                                    ? 'bg-slate-800 border-brand-purple/50 shadow-lg'
                                    : 'bg-slate-800/20 border-transparent hover:bg-slate-800/50'
                                }`}
                        >
                            <div className="flex items-start gap-4 relative z-10">
                                <div className={`p-2 rounded-lg ${activeTab === zone.id ? 'bg-brand-purple text-white' : 'bg-slate-700 text-slate-400 group-hover:text-white'}`}>
                                    <zone.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className={`font-bold ${activeTab === zone.id ? 'text-white' : 'text-slate-300'}`}>{zone.label}</h3>
                                    <p className="text-xs text-slate-500 mt-1">{zone.desc}</p>
                                </div>
                            </div>
                            {activeTab === zone.id && (
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/5 to-transparent pointer-events-none"></div>
                            )}
                        </button>
                    ))}

                    <div className="mt-8 p-4 bg-gradient-to-br from-brand-purple/20 to-brand-pink/20 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-white font-bold mb-2">
                            <Sparkles className="w-4 h-4 text-brand-gold" /> Pro Tip
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Uploading a high-res Favicon (512x512) automatically generates PWA icons for your clients' home screens.
                        </p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-9">
                    {activeTab === 'identity' && <IdentityZone />}
                    {activeTab === 'domain' && <DomainZone />}
                    {activeTab === 'comm' && <CommZone />}
                    {activeTab === 'support' && <SupportZone />}
                </div>
            </div>
        </div>
    );
};

export default WhiteLabel;
