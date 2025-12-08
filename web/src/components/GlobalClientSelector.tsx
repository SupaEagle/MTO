import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GlobalClientSelector = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<string | null>(null);

    const clients = [
        { id: '1', name: 'Acme Corp', industry: 'Tech' },
        { id: '2', name: 'Stark Industries', industry: 'Defense' },
        { id: '3', name: 'Wayne Enterprises', industry: 'Finance' },
    ];

    const handleSelect = (client: typeof clients[0]) => {
        setSelectedClient(client.name);
        setIsOpen(false);
        // In a real app, this would switch the global context
        // For now, we'll navigate to the client dashboard as a preview
        navigate('/client');
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-purple-500 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                        {selectedClient ? selectedClient[0] : 'A'}
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-medium text-white">{selectedClient || 'Select Client'}</p>
                        <p className="text-[10px] text-slate-400">Context Switcher</p>
                    </div>
                </div>
                <span className="text-slate-400">▼</span>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="p-2">
                        <input
                            type="text"
                            placeholder="Search clients..."
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                        {clients.map(client => (
                            <button
                                key={client.id}
                                onClick={() => handleSelect(client)}
                                className="w-full flex items-center gap-3 p-3 hover:bg-slate-700 transition-colors text-left"
                            >
                                <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs text-white">
                                    {client.name[0]}
                                </div>
                                <div>
                                    <p className="text-sm text-white">{client.name}</p>
                                    <p className="text-[10px] text-slate-400">{client.industry}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                    <div className="p-2 border-t border-slate-700">
                        <button className="w-full py-2 text-xs text-purple-400 hover:text-white font-medium">
                            + Add New Client
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalClientSelector;
