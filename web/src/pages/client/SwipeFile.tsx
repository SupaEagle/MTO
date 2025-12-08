import { useState } from 'react';

const SwipeFile = () => {
    const [filter, setFilter] = useState('All');

    const ideas = [
        { id: 1, type: 'Hook', content: '"Stop doing [Common Mistake] if you want [Desired Result]."', category: 'Educational' },
        { id: 2, type: 'Story', content: 'Share a "Behind the Scenes" photo of your workspace.', category: 'Personal' },
        { id: 3, type: 'Question', content: '"What\'s the one tool you couldn\'t live without?"', category: 'Engagement' },
        { id: 4, type: 'Framework', content: 'The "Problem-Agitate-Solve" framework explained.', category: 'Educational' },
        { id: 5, type: 'Meme', content: 'Expectation vs Reality of [Industry Task].', category: 'Humor' },
    ];

    const filteredIdeas = filter === 'All' ? ideas : ideas.filter(idea => idea.category === filter);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Content Inspiration Swipe File</h2>
                <div className="flex gap-2">
                    {['All', 'Educational', 'Personal', 'Engagement', 'Humor'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filter === cat
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-slate-800 text-slate-400 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIdeas.map((idea) => (
                    <div key={idea.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-md uppercase tracking-wide font-bold">
                                {idea.type}
                            </span>
                            <button className="text-slate-500 hover:text-teal-400">
                                🔖
                            </button>
                        </div>
                        <p className="text-lg text-white font-medium mb-6">
                            {idea.content}
                        </p>
                        <button className="w-full py-2 bg-slate-700 group-hover:bg-teal-600 text-slate-300 group-hover:text-white rounded-lg transition-colors text-sm font-medium">
                            Use This Idea
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SwipeFile;
