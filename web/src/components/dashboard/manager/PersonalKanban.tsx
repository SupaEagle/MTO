const PersonalKanban = () => {
    const tasks = {
        todo: [
            { id: 1, title: 'Draft Q3 Strategy for Acme', priority: 'high' },
            { id: 2, title: 'Review Competitor Analysis', priority: 'medium' },
        ],
        inProgress: [
            { id: 3, title: 'Content Calendar Approval', priority: 'high' },
        ],
        done: [
            { id: 4, title: 'Onboarding Call with Stark Ind', priority: 'normal' },
        ]
    };

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full">
            <h3 className="text-lg font-bold text-white mb-4">My Tasks</h3>
            <div className="grid grid-cols-3 gap-4 h-[calc(100%-2rem)]">
                {/* To Do */}
                <div className="bg-slate-900/50 p-3 rounded-lg">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex justify-between">
                        To Do <span className="bg-slate-700 px-2 rounded-full text-white">{tasks.todo.length}</span>
                    </h4>
                    <div className="space-y-2">
                        {tasks.todo.map(task => (
                            <div key={task.id} className="bg-slate-800 p-3 rounded border border-slate-700 shadow-sm hover:border-purple-500/50 transition-colors cursor-pointer">
                                <p className="text-sm font-medium text-white">{task.title}</p>
                                <span className={`text-[10px] mt-2 inline-block px-2 py-0.5 rounded-full ${task.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                                    }`}>{task.priority}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* In Progress */}
                <div className="bg-slate-900/50 p-3 rounded-lg">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex justify-between">
                        In Progress <span className="bg-slate-700 px-2 rounded-full text-white">{tasks.inProgress.length}</span>
                    </h4>
                    <div className="space-y-2">
                        {tasks.inProgress.map(task => (
                            <div key={task.id} className="bg-slate-800 p-3 rounded border border-slate-700 shadow-sm hover:border-purple-500/50 transition-colors cursor-pointer">
                                <p className="text-sm font-medium text-white">{task.title}</p>
                                <span className="text-[10px] mt-2 inline-block px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">
                                    In Progress
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Done */}
                <div className="bg-slate-900/50 p-3 rounded-lg">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex justify-between">
                        Done <span className="bg-slate-700 px-2 rounded-full text-white">{tasks.done.length}</span>
                    </h4>
                    <div className="space-y-2">
                        {tasks.done.map(task => (
                            <div key={task.id} className="bg-slate-800 p-3 rounded border border-slate-700 opacity-60">
                                <p className="text-sm font-medium text-white line-through">{task.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalKanban;
