import { useState } from 'react';
import {
    Search, Filter, Shield,
    CreditCard, Users, LogIn, ExternalLink, Mail, Phone,
    CheckCircle, AlertTriangle, XCircle,
    Monitor, Layout, PhoneCall, Plus
} from 'lucide-react';

const ClientDirectory = () => {
    // State for filtering and view mode
    const [viewMode, setViewMode] = useState<'all' | 'onboarding'>('all');
    const [selectedClient, setSelectedClient] = useState<number | null>(null);

    // Mock Data for Clients
    const clients = [
        {
            id: 1,
            name: "Acme Dental",
            domain: "acmedental.com",
            logo: "https://ui-avatars.com/api/?name=AD&background=0D8ABC&color=fff",
            status: "Active",
            plan: "Growth - $2.5k/mo",
            health: 92,
            manager: { name: "Sarah J.", avatar: "https://ui-avatars.com/api/?name=SJ&background=6d28d9&color=fff" },
            lastActive: "2h ago",
            techStack: { vibe: true, meta: true, retell: false },
            onboardingStep: 5 // Completed
        },
        {
            id: 2,
            name: "Legal Eagles",
            domain: "legaleagleslaw.com",
            logo: "https://ui-avatars.com/api/?name=LE&background=ffd700&color=000",
            status: "Onboarding",
            plan: "Starter - $1k/mo",
            health: 78,
            manager: { name: "Mike T.", avatar: "https://ui-avatars.com/api/?name=MT&background=10b981&color=fff" },
            lastActive: "1d ago",
            techStack: { vibe: false, meta: true, retell: false },
            onboardingStep: 3 // Stuck at Brand DNA
        },
        {
            id: 3,
            name: "Pizza Palace",
            domain: "pizzapalace.io",
            logo: "https://ui-avatars.com/api/?name=PP&background=ef4444&color=fff",
            status: "Paused",
            plan: "Dominance - $5k/mo",
            health: 45,
            manager: { name: "Sarah J.", avatar: "https://ui-avatars.com/api/?name=SJ&background=6d28d9&color=fff" },
            lastActive: "5d ago",
            techStack: { vibe: true, meta: false, retell: true },
            onboardingStep: 5
        },
    ];

    // Mock quick-view details
    const clientDetails = {
        name: "Acme Dental",
        contact: { name: "Dr. John Smith", email: "john@acmedental.com", phone: "+1 (555) 123-4567" },
        notes: "Client prefers update calls on Tuesdays after 2 PM. Very particular about logo usage.",
        alerts: ["Facebook Token Expiring Soon", "2 Pending Approvals"],
        contractUrl: "#"
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Client Directory</h1>
                    <p className="text-slate-400 text-sm">Manage your entire agency portfolio from one switchboard.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setViewMode('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'all' ? 'bg-white text-surface-dark' : 'text-slate-400 hover:text-white'}`}
                    >
                        All Clients
                    </button>
                    <button
                        onClick={() => setViewMode('onboarding')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${viewMode === 'onboarding' ? 'bg-white text-surface-dark' : 'text-slate-400 hover:text-white'}`}
                    >
                        Onboarding <span className="px-1.5 py-0.5 bg-brand-gold text-surface-dark text-[10px] rounded-full">2</span>
                    </button>
                    <button className="px-4 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 transition-all">
                        <Plus className="w-4 h-4" /> Add Client
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">

                {/* Client Table List */}
                <div className="lg:col-span-3 bg-surface-dark border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-white/5 flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search by name, domain, or owner..."
                                className="w-full pl-10 pr-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-brand-purple transition-all"
                            />
                        </div>
                        <button className="p-2 text-slate-400 hover:text-white border border-white/10 rounded-lg transition-colors">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-white/5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <div className="col-span-4">Client Entity</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Health</div>
                        <div className="col-span-2">Integrations</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-white/5">
                        {clients.filter(c => viewMode === 'all' || (viewMode === 'onboarding' && c.status === 'Onboarding')).map((client) => (
                            <div
                                key={client.id}
                                onClick={() => setSelectedClient(client.id)}
                                className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/5 transition-colors cursor-pointer group ${selectedClient === client.id ? 'bg-white/5 border-l-2 border-brand-purple' : 'border-l-2 border-transparent'}`}
                            >
                                {/* Client Entity */}
                                <div className="col-span-4 flex items-center gap-3">
                                    <img src={client.logo} alt={client.name} className="w-10 h-10 rounded-lg" />
                                    <div>
                                        <h3 className="text-white font-bold text-sm group-hover:text-brand-purple transition-colors">{client.name}</h3>
                                        <a href={`https://${client.domain}`} target="_blank" rel="noreferrer" className="text-slate-500 text-xs hover:underline flex items-center gap-1">
                                            {client.domain} <ExternalLink className="w-2 h-2" />
                                        </a>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="col-span-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${client.status === 'Active' ? 'bg-green-500/10 text-green-400 ring-green-500/20' :
                                        client.status === 'Onboarding' ? 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/20' :
                                            client.status === 'Paused' ? 'bg-red-500/10 text-red-400 ring-red-500/20' :
                                                'bg-slate-500/10 text-slate-400 ring-slate-500/20'
                                        }`}>
                                        {client.status}
                                    </span>
                                    {client.status === 'Onboarding' && (
                                        <div className="mt-2 w-20 bg-surface-card h-1 rounded-full overflow-hidden">
                                            <div
                                                className="bg-brand-gold h-full rounded-full"
                                                style={{ width: `${(client.onboardingStep / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                    )}
                                </div>

                                {/* Health Score */}
                                <div className="col-span-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`text-lg font-black ${client.health >= 90 ? 'text-green-400' :
                                            client.health >= 70 ? 'text-yellow-400' : 'text-red-400'
                                            }`}>
                                            {client.health}
                                        </div>
                                        <div className="text-[10px] text-slate-500 leading-tight">
                                            AI Score <br /> (Engagement)
                                        </div>
                                    </div>
                                </div>

                                {/* Integrations Scanner */}
                                <div className="col-span-2 flex items-center gap-2">
                                    <div className={`p-1.5 rounded-md border ${client.techStack.vibe ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400 opacity-50'}`} title="Vibe.co">
                                        <Monitor className="w-3 h-3" />
                                    </div>
                                    <div className={`p-1.5 rounded-md border ${client.techStack.meta ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400 opacity-50'}`} title="Meta Ads">
                                        <Layout className="w-3 h-3" />
                                    </div>
                                    <div className={`p-1.5 rounded-md border ${client.techStack.retell ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400 opacity-50'}`} title="Retell AI">
                                        <PhoneCall className="w-3 h-3" />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        className="p-2 bg-brand-purple text-white rounded-lg hover:bg-brand-purple/80 transition-colors shadow-lg shadow-brand-purple/20"
                                        title="Impersonate (Login As)"
                                    >
                                        <LogIn className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors">
                                        <CreditCard className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick-View Drawer */}
                <div className={`lg:col-span-1 bg-surface-dark border border-white/5 rounded-2xl p-6 transition-all duration-300 ${selectedClient ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-4 pointer-events-none grayscale'}`}>
                    {selectedClient ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white">Quick View</h3>
                                <button onClick={() => setSelectedClient(null)} className="text-slate-500 hover:text-white"><XCircle className="w-5 h-5" /></button>
                            </div>

                            {/* Contact Card */}
                            <div className="bg-surface-card p-4 rounded-xl space-y-3">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                                        {clientDetails.contact.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{clientDetails.contact.name}</p>
                                        <p className="text-xs text-slate-400">Primary Contact</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-300">
                                    <Mail className="w-3 h-3" /> {clientDetails.contact.email}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-300">
                                    <Phone className="w-3 h-3" /> {clientDetails.contact.phone}
                                </div>
                            </div>

                            {/* Internal Notes */}
                            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">
                                <h4 className="text-xs font-bold text-yellow-500 uppercase flex items-center gap-2 mb-2">
                                    <Shield className="w-3 h-3" /> Internal Notes
                                </h4>
                                <p className="text-xs text-yellow-200/80 leading-relaxed italic">
                                    "{clientDetails.notes}"
                                </p>
                            </div>

                            {/* Alerts */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Recent Alerts</h4>
                                <div className="space-y-2">
                                    {clientDetails.alerts.map((alert, idx) => (
                                        <div key={idx} className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400">
                                            <AlertTriangle className="w-3 h-3 shrink-0" />
                                            {alert}
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-2 p-2 bg-green-500/10 border border-green-500/20 rounded-lg text-xs text-green-400">
                                        <CheckCircle className="w-3 h-3 shrink-0" />
                                        Monthly Retainer Paid
                                    </div>
                                </div>
                            </div>

                            {/* Full Profile Button */}
                            <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 border border-white/10">
                                View Full Profile <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 p-4">
                            <Users className="w-12 h-12 mb-4 opacity-50" />
                            <p className="font-bold">Select a Client</p>
                            <p className="text-xs">Click on any row to view detailed contact info and alerts.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientDirectory;
