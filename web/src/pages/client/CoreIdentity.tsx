import { useState } from 'react';

const CoreIdentity = () => {
    const [isEditing, setIsEditing] = useState(false);
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

    const handleSave = () => {
        setIsEditing(false);
        console.log('Saved:', formData);
        // Implement actual save logic here
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset logic if needed
    };

    return (
        <div className="space-y-6">
            <div className="glass-panel p-8 rounded-2xl">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Core Identity & Basics</h2>
                        <p className="text-slate-400">Foundational data to establish the brand entity within the system.</p>
                    </div>
                </div>

                <form className="space-y-8">
                    {/* Section 1: Business Basics */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Business Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="The official name of the business entity"
                                />
                                <p className="text-xs text-slate-500">For legal and official documentation.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Website URL</label>
                                <input
                                    type="url"
                                    name="websiteUrl"
                                    value={formData.websiteUrl}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="https://example.com"
                                />
                                <p className="text-xs text-slate-500">Primary domain for AI scraping and calibration.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Industry / Niche</label>
                                <input
                                    type="text"
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="e.g. Healthcare, Real Estate"
                                />
                                <p className="text-xs text-slate-500">Specific market sector for template matching.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Company Physical Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
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
                            <label className="text-sm font-medium text-white">Brand Logo</label>
                            <div className={`border-2 border-dashed border-surface-border rounded-xl p-8 text-center transition-colors bg-surface-dark/50 ${isEditing ? 'hover:border-brand-purple cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}>
                                <span className="text-4xl mb-2 block">🖼️</span>
                                <span className="text-slate-400">High-resolution upload (PNG/SVG)</span>
                                <p className="text-xs text-slate-500 mt-2">For smart template generation.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Primary Brand Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        name="primaryColor"
                                        value={formData.primaryColor}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="h-12 w-12 rounded border-none cursor-pointer bg-transparent disabled:cursor-not-allowed"
                                    />
                                    <input
                                        type="text"
                                        name="primaryColor"
                                        value={formData.primaryColor}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="flex-1 bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white font-mono uppercase disabled:cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Secondary Brand Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        name="secondaryColor"
                                        value={formData.secondaryColor}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="h-12 w-12 rounded border-none cursor-pointer bg-transparent disabled:cursor-not-allowed"
                                    />
                                    <input
                                        type="text"
                                        name="secondaryColor"
                                        value={formData.secondaryColor}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="flex-1 bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white font-mono uppercase disabled:cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Accent Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        name="accentColor"
                                        value={formData.accentColor}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="h-12 w-12 rounded border-none cursor-pointer bg-transparent disabled:cursor-not-allowed"
                                    />
                                    <input
                                        type="text"
                                        name="accentColor"
                                        value={formData.accentColor}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="flex-1 bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white font-mono uppercase disabled:cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Fonts / Typography</label>
                            <div className="border border-surface-border rounded-lg p-4 bg-surface-dark/50">
                                <input
                                    type="text"
                                    name="typography"
                                    value={formData.typography}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-transparent border-none text-white focus:ring-0 placeholder-slate-600 mb-2 disabled:cursor-not-allowed"
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
                            <label className="text-sm font-medium text-white">Mission Statement</label>
                            <textarea
                                name="missionStatement"
                                value={formData.missionStatement}
                                onChange={handleChange}
                                rows={3}
                                disabled={!isEditing}
                                className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none disabled:cursor-not-allowed"
                                placeholder="The organization's purpose (Why, Who, How)"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Vision Statement</label>
                            <textarea
                                name="visionStatement"
                                value={formData.visionStatement}
                                onChange={handleChange}
                                rows={3}
                                disabled={!isEditing}
                                className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none disabled:cursor-not-allowed"
                                placeholder="The long-term aspiration of the brand"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Brand Promise</label>
                            <textarea
                                name="brandPromise"
                                value={formData.brandPromise}
                                onChange={handleChange}
                                rows={2}
                                disabled={!isEditing}
                                className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none disabled:cursor-not-allowed"
                                placeholder="The solidified expectation customers have of the brand"
                            />
                        </div>
                    </div>

                    {/* Section 4: Narrative */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Narrative</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Founder / Spokesperson Name</label>
                                <input
                                    type="text"
                                    name="founderName"
                                    value={formData.founderName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="For personal branding or 'Founder's Voice'"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Origin Story</label>
                            <textarea
                                name="originStory"
                                value={formData.originStory}
                                onChange={handleChange}
                                rows={6}
                                disabled={!isEditing}
                                className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none disabled:cursor-not-allowed"
                                placeholder="The narrative background of how the business started (Authentic Storytelling)"
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-surface-border flex justify-end gap-3">
                        {!isEditing ? (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="px-8 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105"
                            >
                                Edit Identity
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-6 py-3 bg-surface-dark border border-surface-border hover:bg-surface-hover text-slate-300 font-bold rounded-lg transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="px-8 py-3 bg-gradient-to-r from-brand-pink to-brand-purple hover:from-brand-pink/90 hover:to-brand-purple/90 text-white font-bold rounded-lg shadow-lg hover:shadow-brand-purple/20 transition-all transform hover:scale-105"
                                >
                                    Save Changes
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CoreIdentity;
