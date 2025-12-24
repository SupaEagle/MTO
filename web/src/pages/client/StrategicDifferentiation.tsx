import { useState, useEffect } from 'react';

const StrategicDifferentiation = () => {
    const [isEditing, setIsEditing] = useState(false);
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

    // --- New Data Fetching Logic ---
    useEffect(() => {
        const fetchStrategy = async () => {
            try {
                const subAccountId = localStorage.getItem('mansa_sub_account_id');
                if (!subAccountId) return;

                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'}/api/strategy/${subAccountId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('mansa_token')}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();

                    // Map Competitor Intel
                    if (data.competitor_intel) {
                        setFormData(prev => ({
                            ...prev,
                            usp: data.competitor_intel.core_usp || '',
                            marketGap: data.competitor_intel.competitor_gap || '',
                            // Map generic market positioning if available
                            dreamOutcome: data.core_identity?.elevator_pitch || prev.dreamOutcome
                        }));
                    }
                }
            } catch (err) {
                console.error("Failed to load strategy", err);
            }
        };

        fetchStrategy();
    }, []);

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
                    <h2 className="text-3xl font-bold text-white mb-2">Strategic Differentiation (USP)</h2>
                    <p className="text-slate-400">Defining why the brand wins in the market.</p>
                </div>

                <form className="space-y-8">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Value Proposition</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Unique Selling Proposition (USP)</label>
                            <textarea
                                name="usp"
                                value={formData.usp}
                                onChange={handleChange}
                                rows={3}
                                disabled={!isEditing}
                                className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none disabled:cursor-not-allowed"
                                placeholder="The assertive, defensible statement of difference."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Market Gap Identified</label>
                            <textarea
                                name="marketGap"
                                value={formData.marketGap}
                                onChange={handleChange}
                                rows={3}
                                disabled={!isEditing}
                                className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none disabled:cursor-not-allowed"
                                placeholder="The specific opportunity missed by competitors."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Dream Outcome</label>
                                <input
                                    type="text"
                                    name="dreamOutcome"
                                    value={formData.dreamOutcome}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="The 'Value Equation' variable defining the perfect result."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Perceived Likelihood of Achievement</label>
                                <input
                                    type="text"
                                    name="likelihoodAchievement"
                                    value={formData.likelihoodAchievement}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="Proof points that the result is attainable."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Time Delay</label>
                                <input
                                    type="text"
                                    name="timeDelay"
                                    value={formData.timeDelay}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="Speed of result (How fast will they get it?)."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Effort & Sacrifice</label>
                                <input
                                    type="text"
                                    name="effortSacrifice"
                                    value={formData.effortSacrifice}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="Ease of use (How hard do they have to work?)."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Market Position</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Pricing Strategy</label>
                                <input
                                    type="text"
                                    name="pricingStrategy"
                                    value={formData.pricingStrategy}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="e.g., Premium, Economy"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Free/Low-Price Offer</label>
                                <input
                                    type="text"
                                    name="freeOffer"
                                    value={formData.freeOffer}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="Introductory offer strategy (Lead Magnet)."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Growth Strategy Decision</label>
                            <select
                                name="growthStrategy"
                                value={formData.growthStrategy}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all appearance-none disabled:cursor-not-allowed"
                            >
                                <option value="">Select strategy...</option>
                                <option value="Optimization">Optimization ("Better")</option>
                                <option value="Volume">Volume ("More")</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-surface-border flex justify-end gap-3">
                        {!isEditing ? (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="px-8 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105"
                            >
                                Edit Strategy
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

export default StrategicDifferentiation;
