import { useState } from 'react';

const PersonaBuilder = () => {
    const [persona, setPersona] = useState({
        name: '',
        demographics: '',
        psychographics: '',
        painPoints: '',
        goals: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPersona(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Persona submitted:', persona);
        // TODO: Save to Firestore
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Persona Builder</h1>
            <p className="text-gray-400 mb-8">Define your Ideal Client Avatar (ICA) to tailor your marketing.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <label className="block text-lg font-medium text-white mb-2">
                        Avatar Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={persona.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g. Marketing Mary"
                    />
                </div>

                {/* Demographics */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <label className="block text-lg font-medium text-white mb-2">
                        Demographics
                    </label>
                    <p className="text-sm text-gray-400 mb-4">Age, Location, Job Title, Income Level.</p>
                    <textarea
                        name="demographics"
                        value={persona.demographics}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="30-45, Urban, CMO or Marketing Director, $100k+"
                    />
                </div>

                {/* Psychographics */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <label className="block text-lg font-medium text-white mb-2">
                        Psychographics (Beliefs & Values)
                    </label>
                    <p className="text-sm text-gray-400 mb-4">What do they believe? What do they value?</p>
                    <textarea
                        name="psychographics"
                        value={persona.psychographics}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="Values data-driven decisions, believes in long-term brand building..."
                    />
                </div>

                {/* Pain Points */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <label className="block text-lg font-medium text-white mb-2">
                        Pain Points (Miseries)
                    </label>
                    <p className="text-sm text-gray-400 mb-4">What keeps them up at night?</p>
                    <textarea
                        name="painPoints"
                        value={persona.painPoints}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="Overwhelmed by data, struggling to prove ROI, managing too many tools..."
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg shadow-lg shadow-purple-900/20 transition-all transform hover:scale-[1.02]"
                    >
                        Save Persona
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PersonaBuilder;
