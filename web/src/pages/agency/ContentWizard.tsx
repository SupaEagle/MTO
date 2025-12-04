import { useState } from 'react';

const ContentWizard = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        platform: '',
        topic: '',
        tone: '',
        additionalInstructions: '',
    });

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerate = () => {
        console.log('Generating content with:', formData);
        // TODO: Call Firebase Function to generate content
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Content Studio</h1>
            <p className="text-gray-400 mb-8">Create viral-worthy content in seconds using AI.</p>

            {/* Progress Bar */}
            <div className="flex items-center mb-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= i ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'
                            }`}>
                            {i}
                        </div>
                        {i < 3 && (
                            <div className={`w-24 h-1 mx-2 ${step > i ? 'bg-purple-600' : 'bg-gray-700'
                                }`}></div>
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white">Step 1: Choose Platform</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Instagram', 'LinkedIn', 'Twitter', 'Facebook'].map((platform) => (
                                <button
                                    key={platform}
                                    onClick={() => setFormData(prev => ({ ...prev, platform }))}
                                    className={`p-4 rounded-lg border transition-all ${formData.platform === platform
                                            ? 'border-purple-500 bg-purple-500/10 text-white'
                                            : 'border-gray-600 hover:border-gray-500 text-gray-300'
                                        }`}
                                >
                                    {platform}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleNext}
                                disabled={!formData.platform}
                                className="px-6 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white">Step 2: Topic & Tone</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">What is this post about?</label>
                            <textarea
                                name="topic"
                                value={formData.topic}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="e.g. 5 tips for sustainable living..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Tone of Voice</label>
                            <select
                                name="tone"
                                value={formData.tone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                            >
                                <option value="">Select a tone</option>
                                <option value="Professional">Professional</option>
                                <option value="Witty">Witty</option>
                                <option value="Inspirational">Inspirational</option>
                                <option value="Educational">Educational</option>
                            </select>
                        </div>
                        <div className="flex justify-between">
                            <button onClick={handleBack} className="text-gray-400 hover:text-white">Back</button>
                            <button
                                onClick={handleNext}
                                disabled={!formData.topic || !formData.tone}
                                className="px-6 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white">Step 3: Review & Generate</h2>
                        <div className="bg-gray-900 p-4 rounded-lg space-y-3">
                            <p><span className="text-gray-500">Platform:</span> <span className="text-white">{formData.platform}</span></p>
                            <p><span className="text-gray-500">Topic:</span> <span className="text-white">{formData.topic}</span></p>
                            <p><span className="text-gray-500">Tone:</span> <span className="text-white">{formData.tone}</span></p>
                        </div>
                        <div className="flex justify-between">
                            <button onClick={handleBack} className="text-gray-400 hover:text-white">Back</button>
                            <button
                                onClick={handleGenerate}
                                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg shadow-lg shadow-purple-900/20 transition-all transform hover:scale-[1.02]"
                            >
                                ✨ Generate Magic
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentWizard;
