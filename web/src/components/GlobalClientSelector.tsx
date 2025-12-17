import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Plus, Search } from 'lucide-react';

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
        navigate('/client');
    };

    const handleAgencyClick = () => {
        navigate('/agency');
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 bg-surface-dark/50 lg:bg-surface-dark rounded-xl border border-white/10 hover:border-brand-purple hover:bg-surface-dark transition-all group"
            >
                <div className="flex items-center gap-3 w-full">
                    {/* Avatar / Icon */}
                    <div className="w-10 h-10 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white font-bold text-xs shadow-lg shrink-0">
                        {selectedClient ? selectedClient[0] : 'A'}
                    </div>
                    {/* Text Details (Hidden on mobile sidebar unless generic usage) */}
                    <div className="text-left hidden lg:block overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">{selectedClient || 'Select Account'}</p>
                        <p className="text-[10px] text-slate-400 truncate">Switch Workspace</p>
                    </div>
                </div>
                {/* Chevron */}
                <span className="text-slate-400 text-xs hidden lg:block">▼</span>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 w-64 mt-2 bg-surface-card border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    {/* Agency HQ Option */}
                    <div className="p-2 border-b border-white/5">
                        <button
                            onClick={handleAgencyClick}
                            className="w-full flex items-center gap-3 p-3 bg-brand-purple/10 hover:bg-brand-purple/20 border border-brand-purple/20 rounded-lg transition-colors group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center">
                                <LayoutDashboard className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-white group-hover:text-brand-pink transition-colors">Agency HQ</p>
                                <p className="text-[10px] text-brand-purple">God Mode Access</p>
                            </div>
                        </button>
                    </div>

                    {/* Search */}
                    <div className="p-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Find client..."
                                className="w-full pl-8 pr-3 py-2 bg-black/20 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-brand-purple transition-colors"
                            />
                        </div>
                    </div>

                    {/* Client List */}
                    <div className="max-h-48 overflow-y-auto custom-scrollbar">
                        <p className="px-3 py-1 text-[10px] uppercase font-bold text-slate-500">My Accounts</p>
                        {clients.map(client => (
                            <button
                                key={client.id}
                                onClick={() => handleSelect(client)}
                                className="w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors text-left"
                            >
                                <div className="w-8 h-8 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-xs font-bold text-slate-300">
                                    {client.name[0]}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm text-slate-200 font-medium truncate">{client.name}</p>
                                    <p className="text-[10px] text-slate-500 truncate">{client.industry}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-2 border-t border-white/5 bg-surface-dark/50">
                        <button className="w-full py-2 flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-white font-medium hover:bg-white/5 rounded-lg transition-colors">
                            <Plus className="w-3 h-3" /> Connect New Account
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalClientSelector;
