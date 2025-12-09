import { useState } from 'react';

const BrandPersona = () => {
    const [formData, setFormData] = useState({
        personaType: '',
        voiceIntensity: 5,
        readingLevel: '',
        forbiddenWords: '',
        requiredTerminology: '',
        emojiUsage: '',
        hookStyle: '',
        link1: '',
        link2: '',
        link3: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6">
            <div className="bg-surface-card p-8 rounded-2xl border border-surface-border">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">AI Voice Calibration</h2>
                    <p className="text-slate-400">Configuration for the AI to "think" and "write" like the specific brand.</p>
                </div>

                <form className="space-y-8">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Persona Model</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">20. Brand Persona Type</label>
                                <input
                                    type="text"
                                    name="personaType"
                                    value={formData.personaType}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="e.g., Witty, Professional, Authoritative"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">22. Reading Level Target</label>
                                <input
                                    type="text"
                                    name="readingLevel"
                                    value={formData.readingLevel}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="e.g., 3rd Grade, 8th Grade"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">21. Voice Intensity Slider (1-10)</label>
                            <div className="flex items-center gap-4">
                                <span className="text-xs text-slate-500">Subtle</span>
                                <input
                                    type="range"
                                    name="voiceIntensity"
                                    min="1"
                                    max="10"
                                    value={formData.voiceIntensity}
                                    onChange={handleChange}
                                    className="w-full accent-brand-purple cursor-pointer"
                                />
                                <span className="text-xs text-slate-500">Extreme</span>
                                <span className="font-bold text-brand-gold w-8 text-center">{formData.voiceIntensity}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">23. Forbidden Words</label>
                                <textarea
                                    name="forbiddenWords"
                                    value={formData.forbiddenWords}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="List of negative keywords or slang to strictly avoid"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">24. Required Terminology</label>
                                <textarea
                                    name="requiredTerminology"
                                    value={formData.requiredTerminology}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Industry-specific terms that must be used correctly"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">25. Emoji Usage Preference</label>
                                <select
                                    name="emojiUsage"
                                    value={formData.emojiUsage}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all appearance-none"
                                >
                                    <option value="">Select preferences...</option>
                                    <option value="None">None</option>
                                    <option value="Minimal">Minimal</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="Heavy">Heavy</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">26. Hook Style Preference</label>
                                <input
                                    type="text"
                                    name="hookStyle"
                                    value={formData.hookStyle}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="e.g., Question, Shock Statement, Story"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-slate-300">Past Successful Posts (Style Mimicry)</label>

                            <div className="space-y-2">
                                <label className="text-xs text-slate-500">27. Link 1</label>
                                <input
                                    type="url"
                                    name="link1"
                                    value={formData.link1}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-slate-500">28. Link 2</label>
                                <input
                                    type="url"
                                    name="link2"
                                    value={formData.link2}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-slate-500">29. Link 3</label>
                                <input
                                    type="url"
                                    name="link3"
                                    value={formData.link3}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-surface-border flex justify-end">
                        <button type="button" className="px-8 py-3 bg-gradient-to-r from-brand-pink to-brand-purple hover:from-brand-pink/90 hover:to-brand-purple/90 text-white font-bold rounded-lg shadow-lg hover:shadow-brand-purple/20 transition-all transform hover:scale-105">
                            Save Persona Calibration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BrandPersona;
