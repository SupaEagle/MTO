import { useState } from 'react';
import {
    Activity,
    ArrowUp,
    ArrowDown,
    AlertTriangle,
    CheckCircle,
    Search,
    FileText,
    MapPin,
    Link as LinkIcon,
    Monitor,
    Settings,
    BarChart3,
    Globe,
    Zap,
    RefreshCw,
    AlertOctagon,
    LayoutTemplate,
    Download
} from 'lucide-react';

const SEOCommandCenter = () => {
    const [activeTab, setActiveTab] = useState('health');

    return (
        <div className="space-y-8 pb-20 relative">
            {/* Header: The SEO Pulse */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Health Score */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/20 rounded-full blur-[50px] pointer-events-none group-hover:bg-brand-purple/30 transition-all"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-slate-400 font-medium text-sm">Global SEO Health</h3>
                            <p className="text-3xl font-bold text-white mt-1">87<span className="text-lg text-slate-500 font-normal">/100</span></p>
                        </div>
                        <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
                            <Activity className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="w-full bg-surface-dark h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 w-[87%] shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div>
                    </div>
                    <div className="mt-4 flex gap-4 text-xs text-slate-400">
                        <span>Technical: <span className="text-green-400 font-bold">92</span></span>
                        <span>Content: <span className="text-yellow-400 font-bold">78</span></span>
                        <span>Authority: <span className="text-brand-purple font-bold">85</span></span>
                    </div>
                </div>

                {/* Traffic Trend */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/20 rounded-full blur-[50px] pointer-events-none group-hover:bg-brand-pink/30 transition-all"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-slate-400 font-medium text-sm">Organic Traffic (30d)</h3>
                            <p className="text-3xl font-bold text-white mt-1">12.4k <span className="text-sm font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">+18%</span></p>
                        </div>
                        <div className="p-3 bg-brand-pink/10 rounded-xl text-brand-pink">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                    </div>
                    {/* Mock Sparkline */}
                    <div className="h-12 flex items-end gap-1">
                        {[40, 35, 45, 50, 48, 55, 60, 58, 65, 70, 68, 75, 80, 78, 85].map((h, i) => (
                            <div key={i} className="flex-1 bg-brand-pink/30 rounded-t-sm hover:bg-brand-pink transition-colors" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                </div>

                {/* Keyword Movement */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full blur-[50px] pointer-events-none group-hover:bg-brand-gold/30 transition-all"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-slate-400 font-medium text-sm">Keyword Movement (24h)</h3>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-2 text-green-400">
                                    <ArrowUp className="w-5 h-5" />
                                    <span className="text-2xl font-bold">3</span>
                                    <span className="text-xs font-medium text-green-400/70 uppercase">Up</span>
                                </div>
                                <div className="w-px h-8 bg-white/10"></div>
                                <div className="flex items-center gap-2 text-red-400">
                                    <ArrowDown className="w-5 h-5" />
                                    <span className="text-2xl font-bold">1</span>
                                    <span className="text-xs font-medium text-red-400/70 uppercase">Down</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 bg-brand-gold/10 rounded-xl text-brand-gold">
                            <Search className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="space-y-2 mt-2">
                        <div className="flex justify-between text-xs items-center p-2 bg-white/5 rounded-lg border border-white/5">
                            <span className="text-white">"vegan bakery tampa"</span>
                            <span className="text-green-400 font-bold flex items-center gap-1">#3 <ArrowUp className="w-3 h-3" /></span>
                        </div>
                        <div className="flex justify-between text-xs items-center p-2 bg-white/5 rounded-lg border border-white/5">
                            <span className="text-white">"gluten free cakes"</span>
                            <span className="text-red-400 font-bold flex items-center gap-1">#8 <ArrowDown className="w-3 h-3" /></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/10 pb-1 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('health')}
                    className={`pb-3 px-4 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'health' ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-slate-400 hover:text-white'}`}
                >
                    Health & Technical
                </button>
                <button
                    onClick={() => setActiveTab('research')}
                    className={`pb-3 px-4 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'research' ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-slate-400 hover:text-white'}`}
                >
                    Research & Strategy
                </button>
                <button
                    onClick={() => setActiveTab('content')}
                    className={`pb-3 px-4 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'content' ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-slate-400 hover:text-white'}`}
                >
                    On-Page & Content
                </button>
                <button
                    onClick={() => setActiveTab('growth')}
                    className={`pb-3 px-4 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'growth' ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-slate-400 hover:text-white'}`}
                >
                    Growth & Local
                </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {/* Tab 1: Health & Technical */}
                {activeTab === 'health' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Website Audit */}
                        <div className="glass-panel p-6 rounded-2xl border border-white/10">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2"><Monitor className="w-5 h-5 text-brand-purple" /> Website Audit</h3>
                                <button className="text-xs bg-brand-purple/20 text-brand-purple px-3 py-1.5 rounded-lg font-bold hover:bg-brand-purple/30 transition-colors flex items-center gap-1">
                                    <RefreshCw className="w-3 h-3" /> Run Scan
                                </button>
                            </div>
                            <div className="space-y-3">
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                                    <AlertOctagon className="w-5 h-5 text-red-500 mt-0.5" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-white">3 Critical Errors</h4>
                                        <p className="text-xs text-slate-400 mt-1">404 Broken Links detected on pricing page.</p>
                                    </div>
                                    <button className="text-xs text-red-400 underline font-bold">Fix</button>
                                </div>
                                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-white">5 Warnings</h4>
                                        <p className="text-xs text-slate-400 mt-1">Missing Alt Tags on 5 recent blog images.</p>
                                    </div>
                                    <button className="text-xs text-yellow-400 underline font-bold">View</button>
                                </div>
                                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-white">Good Job</h4>
                                        <p className="text-xs text-slate-400 mt-1">Mobile load speed improved by 12%.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Monitoring & Alerts */}
                        <div className="glass-panel p-6 rounded-2xl border border-white/10">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-brand-pink" /> Monitoring & Alerts</h3>
                            <div className="mb-6 p-4 bg-surface-dark rounded-xl border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-sm font-bold text-white">System Operational</span>
                                </div>
                                <span className="text-xs font-mono text-green-400">99.9% Uptime</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-3 items-start">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 border border-white/5 box-content">
                                        <Settings className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-300"><span className="text-white font-bold">Robots.txt</span> was modified.</p>
                                        <p className="text-xs text-slate-500">Yesterday at 2:45 PM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 border border-white/5 box-content">
                                        <Globe className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-300"><span className="text-white font-bold">Sitemap.xml</span> re-submitted successfully.</p>
                                        <p className="text-xs text-slate-500">2 days ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Migration Checklist (Full Width) */}
                        <div className="col-span-1 md:col-span-2 glass-panel p-6 rounded-2xl border border-white/10">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2"><LayoutTemplate className="w-5 h-5 text-brand-gold" /> Website Migration Safety Net</h3>
                                <span className="text-xs text-slate-400">Project Progress</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 h-2 bg-surface-dark rounded-full overflow-hidden">
                                        <div className="h-full bg-brand-gold w-[60%]"></div>
                                    </div>
                                    <span className="text-sm font-bold text-brand-gold">60%</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <label className="flex items-center gap-3 p-3 bg-surface-dark rounded-lg border border-white/5 cursor-pointer hover:border-brand-gold/50 transition-colors">
                                        <input type="checkbox" checked readOnly className="rounded border-gray-600 text-brand-gold focus:ring-brand-gold bg-transparent" />
                                        <span className="text-sm text-slate-300">301 Redirect Map</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 bg-surface-dark rounded-lg border border-white/5 cursor-pointer hover:border-brand-gold/50 transition-colors">
                                        <input type="checkbox" checked readOnly className="rounded border-gray-600 text-brand-gold focus:ring-brand-gold bg-transparent" />
                                        <span className="text-sm text-slate-300">XML Sitemap</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 bg-surface-dark rounded-lg border border-white/5 cursor-pointer hover:border-brand-gold/50 transition-colors">
                                        <input type="checkbox" className="rounded border-gray-600 text-brand-gold focus:ring-brand-gold bg-transparent" />
                                        <span className="text-sm text-slate-300">Schema Markup Validation</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2: Research & Strategy */}
                {activeTab === 'research' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                        <div className="glass-panel p-8 rounded-2xl border border-white/10">
                            <div className="max-w-xl mx-auto text-center mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">Keyword Oracle</h3>
                                <p className="text-slate-400">Discover what your market is actually searching for.</p>
                            </div>

                            <div className="relative max-w-2xl mx-auto mb-10">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type="text"
                                    className="w-full bg-surface-dark border border-brand-purple/30 rounded-xl py-4 pl-12 pr-24 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none shadow-lg"
                                    placeholder="Enter a broad topic (e.g. 'Vegan Bakery')..."
                                />
                                <button className="absolute right-2 top-2 bottom-2 bg-brand-purple hover:bg-brand-purple/90 text-white px-4 rounded-lg font-bold text-sm transition-colors">
                                    Research
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Keyword</th>
                                            <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Volume</th>
                                            <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Difficulty</th>
                                            <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Intent</th>
                                            <th className="text-right py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        <tr className="group hover:bg-white/5 transition-colors">
                                            <td className="py-4 px-4 text-sm font-medium text-white">best vegan cupcakes tampa</td>
                                            <td className="py-4 px-4 text-sm text-slate-300">1,200</td>
                                            <td className="py-4 px-4">
                                                <span className="px-2 py-1 rounded text-xs font-bold bg-green-500/20 text-green-400">24 (Low)</span>
                                            </td>
                                            <td className="py-4 px-4 text-sm text-slate-300">Transactional</td>
                                            <td className="py-4 px-4 text-right">
                                                <button className="text-xs bg-surface-dark hover:bg-brand-purple hover:text-white border border-white/10 text-slate-300 px-3 py-1.5 rounded transition-colors">
                                                    + Add to Plan
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-white/5 transition-colors">
                                            <td className="py-4 px-4 text-sm font-medium text-white">vegan baking recipes</td>
                                            <td className="py-4 px-4 text-sm text-slate-300">14,500</td>
                                            <td className="py-4 px-4">
                                                <span className="px-2 py-1 rounded text-xs font-bold bg-red-500/20 text-red-400">86 (Hard)</span>
                                            </td>
                                            <td className="py-4 px-4 text-sm text-slate-300">Informational</td>
                                            <td className="py-4 px-4 text-right">
                                                <button className="text-xs bg-surface-dark hover:bg-brand-purple hover:text-white border border-white/10 text-slate-300 px-3 py-1.5 rounded transition-colors">
                                                    + Add to Plan
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-white/5 transition-colors">
                                            <td className="py-4 px-4 text-sm font-medium text-white">gluten free bakery near me</td>
                                            <td className="py-4 px-4 text-sm text-slate-300">3,400</td>
                                            <td className="py-4 px-4">
                                                <span className="px-2 py-1 rounded text-xs font-bold bg-yellow-500/20 text-yellow-400">52 (Med)</span>
                                            </td>
                                            <td className="py-4 px-4 text-sm text-slate-300">Navigational</td>
                                            <td className="py-4 px-4 text-right">
                                                <button className="text-xs bg-surface-dark hover:bg-brand-purple hover:text-white border border-white/10 text-slate-300 px-3 py-1.5 rounded transition-colors">
                                                    + Add to Plan
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 3: On-Page & Content */}
                {activeTab === 'content' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Page Optimizer (List) */}
                        <div className="col-span-1 glass-panel p-6 rounded-2xl border border-white/10">
                            <h3 className="text-lg font-bold text-white mb-4">Top Pages</h3>
                            <div className="space-y-2">
                                {[
                                    { title: 'Home Page', url: '/', score: 92 },
                                    { title: 'Menu / Pricing', url: '/menu', score: 65 },
                                    { title: 'About Us', url: '/about', score: 88 },
                                    { title: 'Blog: Vegan Tips', url: '/blog/tips', score: 45 },
                                ].map((page, i) => (
                                    <div key={i} className={`p-3 rounded-lg border cursor-pointer hover:bg-surface-hover transition-colors ${i === 1 ? 'bg-brand-purple/10 border-brand-purple/30' : 'bg-surface-dark border-transparent'}`}>
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="text-sm font-bold text-white truncate">{page.title}</h4>
                                            <span className={`text-xs font-bold ${page.score > 80 ? 'text-green-400' : page.score > 60 ? 'text-yellow-400' : 'text-red-400'}`}>{page.score}/100</span>
                                        </div>
                                        <p className="text-xs text-slate-500 truncate">{page.url}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Editor Panel */}
                        <div className="col-span-1 md:col-span-2 glass-panel p-6 rounded-2xl border border-white/10">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2"><Settings className="w-5 h-5 text-brand-pink" /> Page Optimizer: Menu</h3>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs font-bold">Needs Improvement</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Target Keyword</label>
                                    <input type="text" value="vegan bakery menu tampa" className="w-full bg-surface-dark border border-white/10 rounded-lg p-3 text-white text-sm focus:border-brand-pink outline-none" />
                                </div>

                                <div className="p-4 bg-surface-dark rounded-xl border border-white/5 space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Meta Title</label>
                                        <input type="text" value="Vegan Bakery Menu | Best Cupcakes in Tampa" className="w-full bg-transparent border-b border-white/10 py-1 text-white font-medium focus:border-brand-pink outline-none" />
                                        <p className="text-xs text-green-400 mt-1">Perfect Length (45 chars)</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Meta Description</label>
                                        <textarea rows={2} className="w-full bg-transparent border-b border-white/10 py-1 text-slate-300 text-sm focus:border-brand-pink outline-none resize-none">Explore our delicious range of gluten-free and vegan treats. From cupcakes to wedding cakes, we serve the greater Tampa area.</textarea>
                                        <p className="text-xs text-yellow-400 mt-1">Warning: Keyword "Menu" appears only once.</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">AI Content Templates</h4>
                                    <div className="grid grid-cols-3 gap-3">
                                        <button className="p-3 bg-surface-dark border border-white/10 hover:border-brand-pink/50 rounded-lg text-left transition-colors group">
                                            <Zap className="w-4 h-4 text-brand-pink mb-2" />
                                            <p className="text-xs font-bold text-white group-hover:text-brand-pink">Skyscraper Post</p>
                                        </button>
                                        <button className="p-3 bg-surface-dark border border-white/10 hover:border-brand-pink/50 rounded-lg text-left transition-colors group">
                                            <MapPin className="w-4 h-4 text-brand-pink mb-2" />
                                            <p className="text-xs font-bold text-white group-hover:text-brand-pink">Local Service Page</p>
                                        </button>
                                        <button className="p-3 bg-surface-dark border border-white/10 hover:border-brand-pink/50 rounded-lg text-left transition-colors group">
                                            <FileText className="w-4 h-4 text-brand-pink mb-2" />
                                            <p className="text-xs font-bold text-white group-hover:text-brand-pink">Product Description</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 4: Growth & Local */}
                {activeTab === 'growth' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Local Map Pack */}
                        <div className="glass-panel p-6 rounded-2xl border border-white/10">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><MapPin className="w-5 h-5 text-brand-gold" /> Local SEO (GBP)</h3>

                            <div className="space-y-6">
                                <div className="p-4 bg-brand-gold/5 border border-brand-gold/20 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-sm font-bold text-brand-gold">NAP Consistency Audit</h4>
                                        <span className="text-xs font-bold text-green-400">98% Match</span>
                                    </div>
                                    <p className="text-xs text-slate-400">Name, Address, and Phone match across 50+ major directories (Yelp, YellowPages, Bing).</p>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Review Manager</h4>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-surface-dark rounded-lg border border-white/5">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-bold text-white">Sarah J.</span>
                                                <div className="flex text-brand-gold text-xs">★★★★★</div>
                                            </div>
                                            <p className="text-xs text-slate-300 italic mb-2">"Best cupcakes in Tampa! Loved the vegan options."</p>
                                            <button className="w-full py-1.5 bg-white/5 hover:bg-white/10 rounded text-xs text-brand-purple font-bold transition-colors">
                                                AI Reply: "Thanks for visiting our Tampa bakery..."
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Link Building */}
                        <div className="glass-panel p-6 rounded-2xl border border-white/10">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><LinkIcon className="w-5 h-5 text-blue-400" /> Link Building CRM</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-surface-dark rounded-lg border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center font-bold text-xs">DR</div>
                                        <div>
                                            <p className="text-sm font-bold text-white">TampaFoodies.com</p>
                                            <p className="text-xs text-slate-400">Domain Rating: 45</p>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded hover:bg-blue-600 transition-colors">Pitch Sent</button>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-surface-dark rounded-lg border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center font-bold text-xs">DR</div>
                                        <div>
                                            <p className="text-sm font-bold text-white">VeganLifeMag.com</p>
                                            <p className="text-xs text-slate-400">Domain Rating: 72</p>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 bg-surface-hover text-slate-300 border border-white/10 text-xs font-bold rounded hover:text-white transition-colors">Compose</button>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-3 border-2 border-dashed border-white/10 rounded-xl text-slate-400 text-sm font-bold hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2">
                                + Find New Opportunities
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Floating Report Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <button className="bg-white text-brand-purple hover:bg-slate-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95">
                    <Download className="w-5 h-5" /> Generate White Label Report
                </button>
            </div>
        </div>
    );
};

export default SEOCommandCenter;
