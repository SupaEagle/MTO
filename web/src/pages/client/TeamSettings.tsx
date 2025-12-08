const TeamSettings = () => {
    const team = [
        { name: 'Sarah Johnson', role: 'Admin', email: 'sarah@example.com', status: 'Active' },
        { name: 'Mike Chen', role: 'Editor', email: 'mike@example.com', status: 'Active' },
        { name: 'Jessica Lee', role: 'Viewer', email: 'jessica@example.com', status: 'Pending' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Team Management</h2>
                        <p className="text-slate-400">Manage access and roles for your workspace.</p>
                    </div>
                    <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition-colors">
                        + Invite Member
                    </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-700">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900 text-slate-400 text-xs uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 bg-slate-800">
                            {team.map((member, i) => (
                                <tr key={i} className="hover:bg-slate-700/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-white font-medium">{member.name}</p>
                                            <p className="text-xs text-slate-400">{member.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-slate-700 rounded text-sm text-slate-300 border border-slate-600">
                                            {member.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${member.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-slate-400 hover:text-white text-sm">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeamSettings;
