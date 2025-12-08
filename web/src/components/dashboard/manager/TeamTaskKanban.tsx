const TeamTaskKanban = () => {
    const teamTasks = [
        { member: 'Sarah', task: 'Strategy Doc', status: 'In Progress', due: 'Today' },
        { member: 'Mike', task: 'Email Copy', status: 'Review', due: 'Tomorrow' },
        { member: 'Jessica', task: 'Social Assets', status: 'To Do', due: 'Fri' },
    ];

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Team Workload</h3>
                <button className="text-xs text-purple-400">View Board</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-slate-400 text-xs border-b border-slate-700">
                            <th className="pb-2 font-medium">Member</th>
                            <th className="pb-2 font-medium">Current Task</th>
                            <th className="pb-2 font-medium">Status</th>
                            <th className="pb-2 font-medium">Due</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {teamTasks.map((item, i) => (
                            <tr key={i} className="border-b border-slate-700/50 last:border-0">
                                <td className="py-3 text-white font-medium">{item.member}</td>
                                <td className="py-3 text-slate-300">{item.task}</td>
                                <td className="py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                                            item.status === 'Review' ? 'bg-purple-500/20 text-purple-400' :
                                                'bg-slate-700 text-slate-400'
                                        }`}>{item.status}</span>
                                </td>
                                <td className="py-3 text-slate-400 text-xs">{item.due}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamTaskKanban;
