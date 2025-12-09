import { useState } from 'react';

const StrategicDifferentiation = () => {
    const [formData, setFormData] = useState({
        usp: '',
        marketGap: '',
        dreamOutcome: '',
        likelihoodAchievement: '',
        timeDelay: '',
        effortSacrifice: '',
        pricingStrategy: '',
        freeOffer: '',
        growthStrategy: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6">
            <div className="bg-surface-card p-8 rounded-2xl border border-surface-border">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Strategic Differentiation (USP)</h2>
                    <p className="text-slate-400">Defining why the brand wins in the market.</p>
                </div>

                <form className="space-y-8">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Value Proposition</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">42. Unique Selling Proposition (USP)</label>
                            <textarea
                                name="usp"
                                value={formData.usp}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none"
                                placeholder="The assertive, defensible statement of difference."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">43. Market Gap Identified</label>
                            <textarea
                                name="marketGap"
                                value={formData.marketGap}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none"
                                placeholder="The specific opportunity missed by competitors."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">44. Dream Outcome</label>
                                <input
                                    type="text"
                                    name="dreamOutcome"
                                    value={formData.dreamOutcome}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="The 'Value Equation' variable defining the perfect result."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">45. Perceived Likelihood of Achievement</label>
                                <input
                                    type="text"
                                    name="likelihoodAchievement"
                                    value={formData.likelihoodAchievement}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="Proof points that the result is attainable."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">46. Time Delay</label>
                                <input
                                    type="text"
                                    name="timeDelay"
                                    value={formData.timeDelay}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="Speed of result (How fast will they get it?)."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">47. Effort & Sacrifice</label>
                                <input
                                    type="text"
                                    name="effortSacrifice"
                                    value={formData.effortSacrifice}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="Ease of use (How hard do they have to work?)."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Market Position</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">48. Pricing Strategy</label>
                                <input
                                    type="text"
                                    name="pricingStrategy"
                                    value={formData.pricingStrategy}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="e.g., Premium, Economy"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">49. Free/Low-Price Offer</label>
                                <input
                                    type="text"
                                    name="freeOffer"
                                    value={formData.freeOffer}
                                    onChange={handleChange}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                                    placeholder="Introductory offer strategy (Lead Magnet)."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">50. Growth Strategy Decision</label>
                            <select
                                name="growthStrategy"
                                value={formData.growthStrategy}
                                onChange={handleChange}
                                className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all appearance-none"
                            >
                                <option value="">Select strategy...</option>
                                <option value="Optimization">Optimization ("Better")</option>
                                <option value="Volume">Volume ("More")</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-surface-border flex justify-end">
                        <button type="button" className="px-8 py-3 bg-gradient-to-r from-brand-pink to-brand-purple hover:from-brand-pink/90 hover:to-brand-purple/90 text-white font-bold rounded-lg shadow-lg hover:shadow-brand-purple/20 transition-all transform hover:scale-105">
                            Save Differentiation Strategy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StrategicDifferentiation;
