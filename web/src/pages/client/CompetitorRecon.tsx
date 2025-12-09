import { useState } from 'react';

const CompetitorRecon = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        comp1Name: '',
        comp1Url: '',
        comp2Name: '',
        comp2Url: '',
        comp3Name: '',
        comp3Url: '',
        comp4Name: '',
        comp5Name: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <div className="glass-panel p-8 rounded-2xl border border-surface-border">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Competitor Reconnaissance</h2>
                    <p className="text-slate-400">Inputs for the AI to monitor and reverse-engineer.</p>
                </div>

                <form className="space-y-8">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Primary Competitors</h3>

                        {/* Competitor 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-dark border border-surface-border p-6 rounded-xl">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Competitor 1 Name (Top Direct)</label>
                                <input
                                    type="text"
                                    name="comp1Name"
                                    value={formData.comp1Name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-card border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="e.g., Competitor A"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Website/Social URL</label>
                                <input
                                    type="url"
                                    name="comp1Url"
                                    value={formData.comp1Url}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-card border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        {/* Competitor 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-dark border border-surface-border p-6 rounded-xl">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Competitor 2 Name (Secondary)</label>
                                <input
                                    type="text"
                                    name="comp2Name"
                                    value={formData.comp2Name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-card border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="e.g., Competitor B"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Website/Social URL</label>
                                <input
                                    type="url"
                                    name="comp2Url"
                                    value={formData.comp2Url}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-card border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        {/* Competitor 3 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-dark border border-surface-border p-6 rounded-xl">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Competitor 3 Name (Tertiary)</label>
                                <input
                                    type="text"
                                    name="comp3Name"
                                    value={formData.comp3Name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-card border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="e.g., Competitor C"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Website/Social URL</label>
                                <input
                                    type="url"
                                    name="comp3Url"
                                    value={formData.comp3Url}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-card border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Additional Players (Optional)</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Competitor 4 Name</label>
                                <input
                                    type="text"
                                    name="comp4Name"
                                    value={formData.comp4Name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Optional"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Competitor 5 Name</label>
                                <input
                                    type="text"
                                    name="comp5Name"
                                    value={formData.comp5Name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Optional"
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
                                Edit Competitors
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

export default CompetitorRecon;
