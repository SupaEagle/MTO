import { useState } from 'react';

const GoalSetting = () => {
    const [goals, setGoals] = useState({
        revenue: '',
        leads: '',
        brandAwareness: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setGoals(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Goals submitted:', goals);
        // TODO: Save to Firestore
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Goal Setting</h1>
            <p className="text-gray-400 mb-8">Define clear, measurable objectives for your marketing campaigns.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Revenue Goal */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <label className="block text-lg font-medium text-white mb-2">
                        Revenue Target (Monthly)
                    </label>
                    <p className="text-sm text-gray-400 mb-4">What is the specific revenue milestone you want to hit?</p>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                            type="number"
                            name="revenue"
                            value={goals.revenue}
                            onChange={handleChange}
                            className="w-full pl-8 pr-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            placeholder="50,000"
                        />
                    </div>
                </div>

                {/* Lead Generation Goal */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <label className="block text-lg font-medium text-white mb-2">
                        Lead Generation Target
                    </label>
                    <p className="text-sm text-gray-400 mb-4">How many qualified leads do you need to generate?</p>
                    <input
                        type="number"
                        name="leads"
                        value={goals.leads}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="100"
                    />
                </div>

                {/* Qualitative Goals */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <label className="block text-lg font-medium text-white mb-2">
                        Brand Awareness & Positioning
                    </label>
                    <p className="text-sm text-gray-400 mb-4">Describe the qualitative shift you want to see in the market.</p>
                    <textarea
                        name="brandAwareness"
                        value={goals.brandAwareness}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g. Become the #1 thought leader in sustainable packaging..."
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg shadow-lg shadow-purple-900/20 transition-all transform hover:scale-[1.02]"
                    >
                        Save Goals
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GoalSetting;
