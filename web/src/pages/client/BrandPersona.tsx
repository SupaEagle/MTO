import { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface PersonaModel {
    personaType: string;

    readingLevel: string;
    forbiddenWords: string;
    requiredTerminology: string;
    emojiUsage: string;
    hookStyle: string;
    link1: string;
    link2: string;
    link3: string;
}

const DEFAULT_PERSONA: PersonaModel = {
    personaType: '',

    readingLevel: '',
    forbiddenWords: '',
    requiredTerminology: '',
    emojiUsage: '',
    hookStyle: '',
    link1: '',
    link2: '',
    link3: ''
};

const BrandPersona = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [personas, setPersonas] = useState<PersonaModel[]>([{ ...DEFAULT_PERSONA }]);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    const handlePersonaChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPersonas(prev => {
            const newPersonas = [...prev];
            newPersonas[index] = { ...newPersonas[index], [name]: value };
            return newPersonas;
        });
    };

    const addPersona = () => {
        setPersonas(prev => [...prev, { ...DEFAULT_PERSONA }]);
        setExpandedIndex(personas.length); // Expand the new one
    };

    const removePersona = (index: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent accordion toggle
        if (personas.length === 1) return; // Prevent deleting the last one
        setPersonas(prev => prev.filter((_, i) => i !== index));
        if (expandedIndex === index) setExpandedIndex(null);
    };

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
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
                    if (data.voice_guide) {
                        const voice = data.voice_guide;

                        // Map AI Voice Guide to First Persona
                        const aiPersona: PersonaModel = {
                            personaType: Array.isArray(voice.tone_keywords) ? voice.tone_keywords.join(', ') : (voice.tone_keywords || 'AI Generated'),
                            readingLevel: voice.reading_level || 'Grade 8',
                            forbiddenWords: Array.isArray(voice.do_not_say) ? voice.do_not_say.join(', ') : (voice.do_not_say || ''),
                            requiredTerminology: Array.isArray(voice.vocabulary_list) ? voice.vocabulary_list.join(', ') : (voice.vocabulary_list || ''),
                            emojiUsage: voice.emoji_usage || 'Moderate',
                            hookStyle: 'Story-driven & Engaging', // Default for now if not in AI output
                            link1: '',
                            link2: '',
                            link3: ''
                        };

                        setPersonas([aiPersona]);
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
        console.log('Saved Personas:', personas);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // In a real app, you might revert to original state here
    };

    return (
        <div className="space-y-6">
            <div className="glass-panel p-8 rounded-2xl">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">AI Voice Calibration</h2>
                    <p className="text-slate-400">Configuration for the AI to "think" and "write" like the specific brand.</p>
                </div>

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4">
                        {personas.map((persona, index) => (
                            <div key={index} className="border border-white/20 rounded-xl overflow-hidden bg-surface-dark/30">
                                {/* Accordion Header */}
                                <div
                                    onClick={() => toggleExpand(index)}
                                    className={`p-4 flex justify-between items-center cursor-pointer transition-colors ${expandedIndex === index ? 'bg-surface-card border-b border-surface-border' : 'hover:bg-surface-hover'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">
                                                {persona.personaType || `Persona Model ${index + 1}`}
                                            </h3>
                                            {!persona.personaType && <p className="text-xs text-slate-500">Undefined Persona</p>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {isEditing && personas.length > 1 && (
                                            <button
                                                onClick={(e) => removePersona(index, e)}
                                                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                title="Remove Model"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                        {expandedIndex === index ? (
                                            <ChevronUp className="w-5 h-5 text-slate-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-slate-400" />
                                        )}
                                    </div>
                                </div>

                                {/* Accordion Body */}
                                {expandedIndex === index && (
                                    <div className="p-6 animate-in slide-in-from-top-2 duration-200">
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-white">Brand Persona Type</label>
                                                    <input
                                                        type="text"
                                                        name="personaType"
                                                        value={persona.personaType}
                                                        onChange={(e) => handlePersonaChange(index, e)}
                                                        disabled={!isEditing}
                                                        className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                                        placeholder="e.g., Witty, Professional, Authoritative"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-white">Reading Level Target</label>
                                                    <input
                                                        type="text"
                                                        name="readingLevel"
                                                        value={persona.readingLevel}
                                                        onChange={(e) => handlePersonaChange(index, e)}
                                                        disabled={!isEditing}
                                                        className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                                        placeholder="e.g., 3rd Grade, 8th Grade"
                                                    />
                                                </div>
                                            </div>



                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-white">Forbidden Words</label>
                                                    <textarea
                                                        name="forbiddenWords"
                                                        value={persona.forbiddenWords}
                                                        onChange={(e) => handlePersonaChange(index, e)}
                                                        rows={3}
                                                        disabled={!isEditing}
                                                        className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none disabled:cursor-not-allowed"
                                                        placeholder="List of negative keywords or slang to strictly avoid"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-white">Required Terminology</label>
                                                    <textarea
                                                        name="requiredTerminology"
                                                        value={persona.requiredTerminology}
                                                        onChange={(e) => handlePersonaChange(index, e)}
                                                        rows={3}
                                                        disabled={!isEditing}
                                                        className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none disabled:cursor-not-allowed"
                                                        placeholder="Industry-specific terms that must be used correctly"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-white">Emoji Usage Preference</label>
                                                    <select
                                                        name="emojiUsage"
                                                        value={persona.emojiUsage}
                                                        onChange={(e) => handlePersonaChange(index, e)}
                                                        disabled={!isEditing}
                                                        className="w-full bg-surface-dark border border-surface-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all appearance-none disabled:cursor-not-allowed"
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
                                                        value={persona.hookStyle}
                                                        onChange={(e) => handlePersonaChange(index, e)}
                                                        disabled={!isEditing}
                                                        className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
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
                                                        value={persona.link1}
                                                        onChange={(e) => handlePersonaChange(index, e)}
                                                        disabled={!isEditing}
                                                        className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs text-slate-500">Link 2</label>
                                                    <input
                                                        type="url"
                                                        name="link2"
                                                        value={persona.link2}
                                                        onChange={(e) => handlePersonaChange(index, e)}
                                                        disabled={!isEditing}
                                                        className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:cursor-not-allowed"
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs text-slate-500">Link 3</label>
                                                    <input
                                                        type="url"
                                                        name="link3"
                                                        value={persona.link3}
                                                        onChange={(e) => handlePersonaChange(index, e)}
                                                        disabled={!isEditing}
                                                        className="w-full bg-surface-dark border border-brand-purple rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {isEditing && (
                        <button
                            type="button"
                            onClick={addPersona}
                            className="w-full py-4 border-2 border-dashed border-surface-border rounded-xl text-slate-400 hover:text-white hover:border-brand-purple hover:bg-brand-purple/5 transition-all flex items-center justify-center gap-2 font-bold"
                        >
                            <Plus className="w-5 h-5" /> Add New Persona Model
                        </button>
                    )}

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
