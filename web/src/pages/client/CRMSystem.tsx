import { useState } from 'react';

const CRMSystem = () => {
    const [view, setView] = useState<'pipeline' | 'list'>('pipeline');

    const stages = [
        { id: 'new', title: 'New Lead', color: 'border-blue-500' },
        { id: 'contacted', title: 'Contacted', color: 'border-yellow-500' },
        { id: 'proposal', title: 'Proposal Sent', color: 'border-purple-500' },
        { id: 'closed', title: 'Closed Won', color: 'border-green-500' },
    ];

    const deals = [
        { id: 1, name: 'Acme Corp', value: '$5,000', stage: 'new', contact: 'John Doe' },
        { id: 2, name: 'Stark Ind', value: '$12,000', stage: 'proposal', contact: 'Tony S.' },
        { id: 3, name: 'Wayne Ent', value: '$8,500', stage: 'contacted', contact: 'Bruce W.' },
        { id: 4, name: 'Cyberdyne', value: '$15,000', stage: 'closed', contact: 'Sarah C.' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Sales Pipeline</h2>
                <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
                    <button
                        onClick={() => setView('pipeline')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'pipeline' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        Board
                    </button>
                    <button
                        onClick={() => setView('list')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'list' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        List
                    </button>
                </div>
            </div>

            {view === 'pipeline' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[600px] overflow-x-auto">
                    {stages.map((stage) => (
                        <div key={stage.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex flex-col h-full">
                            <div className={`border-t-4 ${stage.color} pt-2 mb-4`}>
                                <h3 className="font-bold text-white flex justify-between">
                                    {stage.title}
                                    <span className="bg-slate-700 text-xs px-2 py-0.5 rounded-full text-slate-300">
                                        {deals.filter(d => d.stage === stage.id).length}
                                    </span>
                                </h3>
                            </div>
                            <div className="space-y-3 flex-1 overflow-y-auto">
                                {deals.filter(d => d.stage === stage.id).map((deal) => (
                                    <div key={deal.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-sm hover:border-teal-500/50 transition-colors cursor-pointer group">
                                        <h4 className="font-bold text-white mb-1">{deal.name}</h4>
                                        <p className="text-sm text-slate-400 mb-2">{deal.contact}</p>
                                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-700/50">
                                            <span className="font-medium text-teal-400">{deal.value}</span>
                                            <button className="opacity-0 group-hover:opacity-100 text-xs text-slate-500 hover:text-white transition-opacity">
                                                Edit →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-2 border border-dashed border-slate-600 rounded-lg text-slate-500 hover:text-white hover:border-slate-400 text-sm transition-colors">
                                    + Add Deal
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Deal Name</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Stage</th>
                                <th className="px-6 py-4">Value</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {deals.map((deal) => (
                                <tr key={deal.id} className="hover:bg-slate-700/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{deal.name}</td>
                                    <td className="px-6 py-4 text-slate-300">{deal.contact}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${deal.stage === 'closed' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-300'
                                            }`}>
                                            {stages.find(s => s.id === deal.stage)?.title}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white">{deal.value}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-teal-400 hover:text-teal-300 text-sm">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CRMSystem;
