import { useState, useEffect } from 'react';

const ContentPillars = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        pillar1: '',
        pillar2: '',
        pillar3: '',
        pillar4: '',
        postingFrequency: '',
        platformMix: '',
        trendTopics: '',
        evergreenTopics: ''
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

                    if (data.content_matrix && data.content_matrix.pillars) {
                        const pillars = data.content_matrix.pillars;
                        setFormData(prev => ({
                            ...prev,
                            pillar1: pillars[0]?.topic || '',
                            pillar2: pillars[1]?.topic || '',
                            pillar3: pillars[2]?.topic || '',
                            pillar4: pillars[3]?.topic || '',
                            // Infer or leave blank for user ref
                            // We could map rationale to evergreen topics if we wanted
                            evergreenTopics: pillars.map((p: any) => p.topic).join(', ')
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
                    <h2 className="text-3xl font-bold text-white mb-2">Content Pillars & Mix</h2>
                    <p className="text-slate-400">The recurring themes that the AI will schedule into the calendar.</p>
                </div>

                <form className="space-y-8">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Core Themes</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Content Pillar 1st</label>
                                <input
                                    type="text"
                                    name="pillar1"
                                    value={formData.pillar1}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="e.g., Education/How-to"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Content Pillar 2nd</label>
                                <input
                                    type="text"
                                    name="pillar2"
                                    value={formData.pillar2}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="e.g., Behind the Scenes/Culture"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Content Pillar 3rd</label>
                                <input
                                    type="text"
                                    name="pillar3"
                                    value={formData.pillar3}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="e.g., Social Proof/Testimonials"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Content Pillar 4th</label>
                                <input
                                    type="text"
                                    name="pillar4"
                                    value={formData.pillar4}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="e.g., Sales/Promotional"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Strategy & Mix</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Posting Frequency Goal</label>
                                <input
                                    type="text"
                                    name="postingFrequency"
                                    value={formData.postingFrequency}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="e.g., 1/day LinkedIn, 3/week IG"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Platform Mix</label>
                                <input
                                    type="text"
                                    name="platformMix"
                                    value={formData.platformMix}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                    placeholder="e.g., Instagram, LinkedIn, TikTok"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Trend-Jacking Topics</label>
                            <textarea
                                name="trendTopics"
                                value={formData.trendTopics}
                                onChange={handleChange}
                                rows={2}
                                disabled={!isEditing}
                                className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none disabled:cursor-not-allowed"
                                placeholder="Specific niches to monitor for viral audio/trends."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Evergreen Content Topics</label>
                            <textarea
                                name="evergreenTopics"
                                value={formData.evergreenTopics}
                                onChange={handleChange}
                                rows={2}
                                disabled={!isEditing}
                                className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none disabled:cursor-not-allowed"
                                placeholder="Subjects that remain relevant for recycling 6 months later."
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
                                Edit Content Strategy
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

export default ContentPillars;
