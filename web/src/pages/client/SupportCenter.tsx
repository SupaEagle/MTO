const SupportCenter = () => {
    const articles = [
        { title: 'How to connect your LinkedIn account', category: 'Getting Started' },
        { title: 'Understanding your analytics dashboard', category: 'Analytics' },
        { title: 'Best practices for video hooks', category: 'Content Strategy' },
        { title: 'Setting up lead automation rules', category: 'Automation' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">How can we help you today?</h2>
                <div className="max-w-xl mx-auto relative">
                    <input
                        type="text"
                        placeholder="Search for answers..."
                        className="w-full px-6 py-4 bg-slate-900 border border-slate-700 rounded-full text-white focus:ring-2 focus:ring-teal-500 outline-none pl-12"
                    />
                    <span className="absolute left-4 top-4 text-slate-500 text-xl">🔍</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4">Popular Articles</h3>
                    <div className="space-y-3">
                        {articles.map((article, i) => (
                            <a key={i} href="#" className="block p-3 bg-slate-900/50 rounded-lg hover:bg-slate-700 transition-colors">
                                <p className="text-teal-400 font-medium text-sm mb-1">{article.category}</p>
                                <p className="text-white">{article.title}</p>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4">Contact Support</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-900/50 rounded-lg flex items-center gap-4">
                            <div className="w-10 h-10 bg-teal-900/50 rounded-full flex items-center justify-center text-teal-400 text-xl">
                                💬
                            </div>
                            <div>
                                <p className="text-white font-bold">Live Chat</p>
                                <p className="text-sm text-slate-400">Available 9am - 5pm EST</p>
                            </div>
                            <button className="ml-auto px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold rounded-lg transition-colors">
                                Start Chat
                            </button>
                        </div>
                        <div className="p-4 bg-slate-900/50 rounded-lg flex items-center gap-4">
                            <div className="w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center text-purple-400 text-xl">
                                📧
                            </div>
                            <div>
                                <p className="text-white font-bold">Email Support</p>
                                <p className="text-sm text-slate-400">Response within 24 hours</p>
                            </div>
                            <button className="ml-auto px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold rounded-lg transition-colors">
                                Send Email
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportCenter;
