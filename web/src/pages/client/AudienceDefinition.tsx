import { useState, useEffect } from 'react';

const AudienceDefinition = () => {
    const [isEditing, setIsEditing] = useState(false);
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
                    if (data.audience_persona && data.audience_persona.primary_persona) {
                        const persona = data.audience_persona.primary_persona;
                        setFormData(prev => ({
                            ...prev,
                            icaName: persona.name || '',
                            demographics: persona.demographics || '',
                            psychographics: persona.psychographics || '',
                            marketDescription: prev.marketDescription, // No direct map, keep manual or previous
                            misery1: persona.pain_points?.[0] || '',
                            misery2: persona.pain_points?.[1] || '',
                            misery3: persona.pain_points?.[2] || ''
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
                    <h2 className="text-3xl font-bold text-white mb-2">Audience Definition</h2>
                    <p className="text-slate-400">Deep psychographic profiling to replace standard demographic targeting.</p>
                </div>

                <form className="space-y-8">
                    {/* Audience Profile */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Ideal Client Avatar (ICA)</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Ideal Client Avatar Name</label>
                            <input
                                type="text"
                                name="icaName"
                                value={formData.icaName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                placeholder="e.g., Busy Bob, Corporate Carla"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Target Market Description</label>
                            <textarea
                                name="marketDescription"
                                value={formData.marketDescription}
                                onChange={handleChange}
                                rows={2}
                                disabled={!isEditing}
                                className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none disabled:cursor-not-allowed"
                                placeholder="Broad definition of the market segment"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Audience Demographics</label>
                                <textarea
                                    name="demographics"
                                    value={formData.demographics}
                                    onChange={handleChange}
                                    rows={3}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none disabled:cursor-not-allowed"
                                    placeholder="Age, Gender, Income, Location data"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Audience Psychographics</label>
                                <textarea
                                    name="psychographics"
                                    value={formData.psychographics}
                                    onChange={handleChange}
                                    rows={3}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none disabled:cursor-not-allowed"
                                    placeholder="Values, beliefs, and lifestyle traits"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Misery Mapping */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Misery & Miracle Mapping</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Customer Misery 1 (Fear)</label>
                            <input
                                type="text"
                                name="misery1"
                                value={formData.misery1}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                placeholder="The primary fear the customer wants to avoid"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Customer Misery 2 (Pain)</label>
                            <input
                                type="text"
                                name="misery2"
                                value={formData.misery2}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                placeholder="The active pain point they are experiencing now"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Customer Misery 3 (Problem)</label>
                            <input
                                type="text"
                                name="misery3"
                                value={formData.misery3}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                placeholder="The specific problem they are trying to escape"
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
                                Edit Audience
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

export default AudienceDefinition;
