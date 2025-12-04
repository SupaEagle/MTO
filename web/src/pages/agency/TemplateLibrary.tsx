import { useState } from 'react';

const MOCK_TEMPLATES = [
    { id: 1, name: 'Viral Hook Video', type: 'Video', platform: 'TikTok/Reels' },
    { id: 2, name: 'Educational Carousel', type: 'Image', platform: 'Instagram/LinkedIn' },
    { id: 3, name: 'Contrarian Take', type: 'Text', platform: 'Twitter/LinkedIn' },
    { id: 4, name: 'Product Showcase', type: 'Video', platform: 'Instagram/TikTok' },
    { id: 5, name: 'Client Testimonial', type: 'Video', platform: 'All' },
    { id: 6, name: 'Behind the Scenes', type: 'Image', platform: 'Instagram Stories' },
];

const TemplateLibrary = () => {
    const [filter, setFilter] = useState('All');

    const filteredTemplates = filter === 'All'
        ? MOCK_TEMPLATES
        : MOCK_TEMPLATES.filter(t => t.type === filter);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Smart Templates</h1>
                    <p className="text-gray-400">AI-powered templates that adapt to your brand voice.</p>
                </div>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition-colors">
                    Create New Template
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {['All', 'Video', 'Image', 'Text'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === type
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                    <div key={template.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all group cursor-pointer">
                        <div className="h-40 bg-gray-700 flex items-center justify-center group-hover:bg-gray-600 transition-colors">
                            <span className="text-gray-500 text-4xl">
                                {template.type === 'Video' ? '▶️' : template.type === 'Image' ? '🖼️' : '📝'}
                            </span>
                        </div>
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">{template.name}</h3>
                                <span className="text-xs px-2 py-1 bg-gray-900 rounded text-gray-400">{template.type}</span>
                            </div>
                            <p className="text-sm text-gray-400 mb-4">Best for: {template.platform}</p>
                            <button className="w-full py-2 bg-gray-700 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors">
                                Use Template
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplateLibrary;
