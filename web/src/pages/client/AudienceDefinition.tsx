import { useState } from 'react';

const AudienceDefinition = () => {
    const [formData, setFormData] = useState({
        icaName: '',
        marketDescription: '',
        demographics: '',
        psychographics: '',
        misery1: '',
        misery2: '',
        misery3: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6">
            <div className="bg-surface-card p-8 rounded-2xl border border-surface-border">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Audience Definition</h2>
                    <p className="text-slate-400">Deep psychographic profiling to replace standard demographic targeting.</p>
                </div>

                <form className="space-y-8">
                    {/* Audience Profile */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Ideal Client Avatar (ICA)</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">30. Ideal Client Avatar Name</label>
                            <input
                                type="text"
                                name="icaName"
                                value={formData.icaName}
                                onChange={handleChange}
                                className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                placeholder="e.g., Busy Bob, Corporate Carla"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">31. Target Market Description</label>
                            <textarea
                                name="marketDescription"
                                value={formData.marketDescription}
                                onChange={handleChange}
                                rows={2}
                                className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none"
                                placeholder="Broad definition of the market segment"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">32. Audience Demographics</label>
                                <textarea
                                    name="demographics"
                                    value={formData.demographics}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Age, Gender, Income, Location data"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">33. Audience Psychographics</label>
                                <textarea
                                    name="psychographics"
                                    value={formData.psychographics}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Values, beliefs, and lifestyle traits"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Misery Mapping */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Misery & Miracle Mapping</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">34. Customer Misery 1 (Fear)</label>
                            <input
                                type="text"
                                name="misery1"
                                value={formData.misery1}
                                onChange={handleChange}
                                className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                placeholder="The primary fear the customer wants to avoid"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">35. Customer Misery 2 (Pain)</label>
                            <input
                                type="text"
                                name="misery2"
                                value={formData.misery2}
                                onChange={handleChange}
                                className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                placeholder="The active pain point they are experiencing now"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">36. Customer Misery 3 (Problem)</label>
                            <input
                                type="text"
                                name="misery3"
                                value={formData.misery3}
                                onChange={handleChange}
                                className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                placeholder="The specific problem they are trying to escape"
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-surface-border flex justify-end">
                        <button type="button" className="px-8 py-3 bg-gradient-to-r from-brand-pink to-brand-purple hover:from-brand-pink/90 hover:to-brand-purple/90 text-white font-bold rounded-lg shadow-lg hover:shadow-brand-purple/20 transition-all transform hover:scale-105">
                            Save Audience Definition
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AudienceDefinition;
