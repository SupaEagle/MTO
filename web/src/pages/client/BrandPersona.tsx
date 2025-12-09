import { useState } from 'react';

const BrandPersona = () => {
    const [isEditing, setIsEditing] = useState(false);
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

    const handleSave = () => {
        setIsEditing(false);
        console.log('Saved:', formData);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div className="glass-panel p-8 rounded-2xl">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">AI Voice Calibration</h2>
                    <p className="text-slate-400">Configuration for the AI to "think" and "write" like the specific brand.</p>
                </div>

                <form className="space-y-8">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Persona Model</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Brand Persona Type</label>
                                <input
                                    type="text"
                                    name="personaType"
                                    value={formData.personaType}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="e.g., Witty, Professional, Authoritative"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Reading Level Target</label>
                                <input
                                    type="text"
                                    name="readingLevel"
                                    value={formData.readingLevel}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="e.g., 3rd Grade, 8th Grade"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Voice Intensity Slider (1-10)</label>
                            <div className={`flex items-center gap-4 ${!isEditing ? 'opacity-50' : ''}`}>
                                <span className="text-xs text-slate-500">Subtle</span>
                                <input
                                    type="range"
                                    name="voiceIntensity"
                                    min="1"
                                    max="10"
                                    value={formData.voiceIntensity}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full accent-brand-purple cursor-pointer disabled:cursor-not-allowed"
                                />
                                <span className="text-xs text-slate-500">Extreme</span>
                                <span className="font-bold text-brand-gold w-8 text-center">{formData.voiceIntensity}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Forbidden Words</label>
                                <textarea
                                    name="forbiddenWords"
                                    value={formData.forbiddenWords}
                                    onChange={handleChange}
                                    rows={3}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="List of negative keywords or slang to strictly avoid"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Required Terminology</label>
                                <textarea
                                    name="requiredTerminology"
                                    value={formData.requiredTerminology}
                                    onChange={handleChange}
                                    rows={3}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Industry-specific terms that must be used correctly"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Emoji Usage Preference</label>
                                <select
                                    name="emojiUsage"
                                    value={formData.emojiUsage}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option value="">Select preferences...</option>
                                    <option value="None">None</option>
                                    <option value="Minimal">Minimal</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="Heavy">Heavy</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Hook Style Preference</label>
                                <input
                                    type="text"
                                    name="hookStyle"
                                    value={formData.hookStyle}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="e.g., Question, Shock Statement, Story"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-white">Past Successful Posts (Style Mimicry)</label>

                            <div className="space-y-2">
                                <label className="text-xs text-slate-500">Link 1</label>
                                <input
                                    type="url"
                                    name="link1"
                                    value={formData.link1}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-slate-500">Link 2</label>
                                <input
                                    type="url"
                                    name="link2"
                                    value={formData.link2}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-slate-500">Link 3</label>
                                <input
                                    type="url"
                                    name="link3"
                                    value={formData.link3}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-surface-border flex justify-end gap-3">
                        {!isEditing ? (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="px-8 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105"
                            >
                                Edit Persona
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

export default BrandPersona;
