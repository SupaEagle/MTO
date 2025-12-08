import { useState } from 'react';

const VisualAssets = () => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => setIsGenerating(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-2">Visual Assets Studio</h2>
                <p className="text-slate-400 mb-8">Generate stunning visuals for your campaigns using AI.</p>

                <div className="flex gap-4 mb-8">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the image you want to create..."
                        className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={!prompt || isGenerating}
                        className="px-6 py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
                    >
                        {isGenerating ? 'Generating...' : 'Generate Art'}
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-slate-700/50 rounded-xl border border-slate-600 flex items-center justify-center group relative overflow-hidden">
                            <span className="text-slate-500">Generated Image {i}</span>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button className="p-2 bg-white rounded-full text-slate-900 hover:bg-teal-50">⬇️</button>
                                <button className="p-2 bg-teal-500 rounded-full text-white hover:bg-teal-400">✨</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Brand Asset Library</h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {['Logo', 'Icon', 'Banner', 'Product 1', 'Product 2', 'Team'].map((item, i) => (
                        <div key={i} className="aspect-square bg-slate-900 rounded-lg border border-slate-700 flex flex-col items-center justify-center p-2 hover:border-teal-500 transition-colors cursor-pointer">
                            <div className="w-8 h-8 bg-slate-700 rounded mb-2"></div>
                            <span className="text-xs text-slate-400">{item}</span>
                        </div>
                    ))}
                    <button className="aspect-square border-2 border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center text-slate-500 hover:text-white hover:border-slate-400 transition-colors">
                        <span className="text-2xl mb-1">+</span>
                        <span className="text-xs">Upload</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VisualAssets;
