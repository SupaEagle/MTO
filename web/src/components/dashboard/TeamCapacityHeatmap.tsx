

const TeamCapacityHeatmap = () => {
    const team = [
        { name: 'Sarah', role: 'Strategist', load: 85, tasks: 12 },
        { name: 'Mike', role: 'Copywriter', load: 92, tasks: 15 },
        { name: 'Jessica', role: 'Designer', load: 45, tasks: 4 },
        { name: 'David', role: 'Video Editor', load: 60, tasks: 7 },
    ];

    return (
        <div className="glass-panel p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Team Capacity</h3>
                <button className="text-sm text-purple-400 hover:text-purple-300">Manage Team</button>
            </div>

            <div className="space-y-4">
                {team.map((member, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-white font-medium">{member.name} <span className="text-slate-500 font-normal">- {member.role}</span></span>
                            <span className={`${member.load > 90 ? 'text-red-400' :
                                member.load > 75 ? 'text-yellow-400' :
                                    'text-green-400'
                                }`}>{member.load}% Load</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${member.load > 90 ? 'bg-red-500' :
                                    member.load > 75 ? 'bg-yellow-500' :
                                        'bg-green-500'
                                    }`}
                                style={{ width: `${member.load}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-slate-500 text-right">{member.tasks} active tasks</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamCapacityHeatmap;
