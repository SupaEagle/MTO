import { useState } from 'react';

const CoreIdentity = () => {
    // State to hold form data (simulating data that will be auto-generated later)
    const [formData, setFormData] = useState({
        companyName: '',
        websiteUrl: '',
        industry: '',
        logo: null,
        primaryColor: '#FF3EA5',
        secondaryColor: '#9D4EDD',
        accentColor: '#FFD700',
        typography: '',
        missionStatement: '',
        visionStatement: '',
        brandPromise: '',
        address: '',
        founderName: '',
        originStory: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6">
            <div className="bg-surface-card p-8 rounded-2xl border border-surface-border">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Core Identity & Basics</h2>
                    <p className="text-slate-400">Foundational data to establish the brand entity within the system.</p>
                </div>

                <form className="space-y-8">
                    {/* Section 1: Business Basics */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Business Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">1. Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="The official name of the business entity"
                                />
                                <p className="text-xs text-slate-500">For legal and official documentation.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">2. Website URL</label>
                                <input
                                    type="url"
                                    name="websiteUrl"
                                    value={formData.websiteUrl}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="https://example.com"
                                />
                                <p className="text-xs text-slate-500">Primary domain for AI scraping and calibration.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">3. Industry / Niche</label>
                                <input
                                    type="text"
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. Healthcare, Real Estate"
                                />
                                <p className="text-xs text-slate-500">Specific market sector for template matching.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">12. Company Physical Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="HQ Location"
                                />
                                <p className="text-xs text-slate-500">For local SEO and map services.</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Visual Identity */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Visual Identity</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">4. Brand Logo</label>
                            <div className="border-2 border-dashed border-surface-border rounded-xl p-8 text-center hover:border-brand-purple transition-colors cursor-pointer bg-surface-dark/50">
                                <span className="text-4xl mb-2 block">🖼️</span>
                                <span className="text-slate-400">High-resolution upload (PNG/SVG)</span>
                                <p className="text-xs text-slate-500 mt-2">For smart template generation.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">5. Primary Brand Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        name="primaryColor"
                                        value={formData.primaryColor}
                                        onChange={handleChange}
                                        className="h-12 w-12 rounded border-none cursor-pointer bg-transparent"
                                    />
                                    <input
                                        type="text"
                                        name="primaryColor"
                                        value={formData.primaryColor}
                                        onChange={handleChange}
                                        className="flex-1 bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white font-mono uppercase"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">6. Secondary Brand Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        name="secondaryColor"
                                        value={formData.secondaryColor}
                                        onChange={handleChange}
                                        className="h-12 w-12 rounded border-none cursor-pointer bg-transparent"
                                    />
                                    <input
                                        type="text"
                                        name="secondaryColor"
                                        value={formData.secondaryColor}
                                        onChange={handleChange}
                                        className="flex-1 bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white font-mono uppercase"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">7. Accent Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        name="accentColor"
                                        value={formData.accentColor}
                                        onChange={handleChange}
                                        className="h-12 w-12 rounded border-none cursor-pointer bg-transparent"
                                    />
                                    <input
                                        type="text"
                                        name="accentColor"
                                        value={formData.accentColor}
                                        onChange={handleChange}
                                        className="flex-1 bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white font-mono uppercase"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">8. Fonts / Typography</label>
                            <div className="border border-surface-border rounded-lg p-4 bg-surface-dark/50">
                                <input
                                    type="text"
                                    name="typography"
                                    value={formData.typography}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-none text-white focus:ring-0 placeholder-slate-600 mb-2"
                                    placeholder="Header and Body font names"
                                />
                                <div className="flex gap-4 text-sm text-slate-500 border-t border-surface-border pt-2">
                                    <span className="font-sans">Sans-serif Preview</span>
                                    <span className="font-serif">Serif Preview</span>
                                    <span className="font-mono">Mono Preview</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Brand Core */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Brand Core</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">9. Mission Statement</label>
                            <textarea
                                name="missionStatement"
                                value={formData.missionStatement}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none"
                                placeholder="The organization's purpose (Why, Who, How)"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">10. Vision Statement</label>
                            <textarea
                                name="visionStatement"
                                value={formData.visionStatement}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none"
                                placeholder="The long-term aspiration of the brand"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">11. Brand Promise</label>
                            <textarea
                                name="brandPromise"
                                value={formData.brandPromise}
                                onChange={handleChange}
                                rows={2}
                                className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none"
                                placeholder="The solidified expectation customers have of the brand"
                            />
                        </div>
                    </div>

                    {/* Section 4: Narrative */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Narrative</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">13. Founder / Spokesperson Name</label>
                                <input
                                    type="text"
                                    name="founderName"
                                    value={formData.founderName}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="For personal branding or 'Founder's Voice'"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">14. Origin Story</label>
                            <textarea
                                name="originStory"
                                value={formData.originStory}
                                onChange={handleChange}
                                rows={6}
                                className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none"
                                placeholder="The narrative background of how the business started (Authentic Storytelling)"
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-surface-border flex justify-end">
                        <button type="button" className="px-8 py-3 bg-gradient-to-r from-brand-pink to-brand-purple hover:from-brand-pink/90 hover:to-brand-purple/90 text-white font-bold rounded-lg shadow-lg hover:shadow-brand-purple/20 transition-all transform hover:scale-105">
                            Save Core Identity
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CoreIdentity;
