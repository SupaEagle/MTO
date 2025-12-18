import { useState } from 'react';
import {
    Search, Folder, FileImage, FileText, Plus,
    Layers, PenTool, Layout, CheckCircle, Users, Send,
    ArrowRight, RefreshCw, Eye, Grid, List as ListIcon
} from 'lucide-react';

// Mock Data
const FOLDERS = [
    { id: 'real-estate', name: 'Real Estate Packs', count: 12 },
    { id: 'dentist', name: 'Dentist Ads', count: 8 },
    { id: 'holidays', name: 'Holiday Specials', count: 15 },
    { id: 'gym', name: 'Gym / Fitness', count: 6 },
];

const ASSETS = [
    { id: 1, title: 'Black Friday Standard', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&h=400&fit=crop', tags: ['Retail', 'Sale'], status: 'Ready' },
    { id: 2, title: 'Dental Implant Promo', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=400&fit=crop', tags: ['Dentist', 'High Value'], status: 'Draft' },
    { id: 3, title: 'New Year Resolution', type: 'text', thumbnail: null, tags: ['General', 'Q1'], status: 'Ready' },
    { id: 4, title: 'Open House Story', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop', tags: ['Real Estate', 'Story'], status: 'Ready' },
];

const CLIENTS = [
    { id: 1, name: 'Acme Dental', logo: 'AD', color: 'bg-blue-500' },
    { id: 2, name: 'Smile Pros', logo: 'SP', color: 'bg-green-500' },
    { id: 3, name: 'City Dentist', logo: 'CD', color: 'bg-purple-500' },
];

const GlobalLibrary = () => {
    const [activeTab, setActiveTab] = useState<'vault' | 'editor' | 'deploy'>('vault');
    const [selectedAsset, setSelectedAsset] = useState<any>(null);
    const [simulationClient, setSimulationClient] = useState(0);

    // --- SUB-COMPONENTS ---

    const VaultView = () => (
        <div className="flex h-[calc(100vh-200px)]">
            {/* Sidebar / Folders */}
            <div className="w-64 border-r border-white/5 pr-6 hidden md:block">
                <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider">Asset Categories</h3>
                <div className="space-y-1">
                    {FOLDERS.map(folder => (
                        <button key={folder.id} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-colors group">
                            <div className="flex items-center gap-3">
                                <Folder className="w-4 h-4 text-brand-purple" />
                                <span className="text-sm font-medium">{folder.name}</span>
                            </div>
                            <span className="text-xs text-slate-600 group-hover:text-slate-400">{folder.count}</span>
                        </button>
                    ))}
                    <button className="w-full flex items-center gap-3 p-3 text-slate-500 hover:text-white transition-colors mt-4 border-t border-white/5 border-dashed">
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">New Category</span>
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 pl-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search master assets..."
                            className="w-full pl-10 pr-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-brand-purple transition-all"
                        />
                    </div>
                    <div className="flex gap-3">
                        <div className="flex bg-surface-dark border border-white/10 rounded-lg p-1">
                            <button className="p-2 text-white bg-white/10 rounded"><Grid className="w-4 h-4" /></button>
                            <button className="p-2 text-slate-500 hover:text-white"><ListIcon className="w-4 h-4" /></button>
                        </div>
                        <button
                            onClick={() => setActiveTab('editor')}
                            className="bg-brand-purple hover:bg-brand-purple/90 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-brand-purple/20 transition-all"
                        >
                            <Plus className="w-4 h-4" /> Create Master Asset
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {ASSETS.map(asset => (
                        <div key={asset.id} className="group bg-surface-dark border border-white/5 rounded-xl overflow-hidden hover:border-brand-purple/50 transition-all cursor-pointer">
                            <div className="h-40 bg-black/40 relative overflow-hidden">
                                {asset.thumbnail ? (
                                    <img src={asset.thumbnail} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                                        <FileText className="w-12 h-12 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] uppercase font-bold text-white border border-white/10">
                                    {asset.type}
                                </div>
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => { setSelectedAsset(asset); setActiveTab('editor'); }}
                                        className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform"
                                        title="Edit Template"
                                    >
                                        <PenTool className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => { setSelectedAsset(asset); setActiveTab('deploy'); }}
                                        className="p-2 bg-brand-purple text-white rounded-full hover:scale-110 transition-transform"
                                        title="Deploy"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h4 className="text-white font-bold text-sm mb-1 truncate">{asset.title}</h4>
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {asset.tags.map(tag => (
                                        <span key={tag} className="text-[10px] text-slate-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">{tag}</span>
                                    ))}
                                </div>
                                <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs text-slate-500">
                                    <span>Last edited 2d ago</span>
                                    {asset.status === 'Ready'
                                        ? <span className="flex items-center gap-1 text-green-400"><CheckCircle className="w-3 h-3" /> Ready</span>
                                        : <span className="flex items-center gap-1 text-yellow-400"><Layers className="w-3 h-3" /> Draft</span>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const EditorView = () => (
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            {/* Toolbar */}
            <div className="col-span-3 bg-surface-dark border border-white/5 rounded-2xl p-6">
                <div className="mb-6 pb-6 border-b border-white/5">
                    <button onClick={() => setActiveTab('vault')} className="text-xs flex items-center gap-1 text-slate-500 hover:text-white mb-4 transition-colors">
                        <ArrowRight className="w-3 h-3 rotate-180" /> Back to Vault
                    </button>
                    <h2 className="text-xl font-bold text-white mb-1">Nano Editor</h2>
                    <p className="text-xs text-slate-400">Define dynamic zones.</p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-brand-gold uppercase tracking-wider">Dynamic Variables</h3>

                    <button className="w-full p-3 bg-white/5 border border-white/10 rounded-xl hover:border-brand-purple/50 transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                                <FileImage className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-bold text-white">{`{client_logo}`}</div>
                                <div className="text-[10px] text-slate-500">Auto-insert PNG/SVG</div>
                            </div>
                        </div>
                        <Plus className="w-4 h-4 text-slate-500 group-hover:text-white" />
                    </button>

                    <button className="w-full p-3 bg-white/5 border border-white/10 rounded-xl hover:border-brand-purple/50 transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-pink-500/20 flex items-center justify-center text-pink-400 border border-pink-500/30">
                                <Layout className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-bold text-white">{`{brand_color}`}</div>
                                <div className="text-[10px] text-slate-500">Apply primary hex</div>
                            </div>
                        </div>
                        <Plus className="w-4 h-4 text-slate-500 group-hover:text-white" />
                    </button>

                    <button className="w-full p-3 bg-white/5 border border-white/10 rounded-xl hover:border-brand-purple/50 transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-yellow-500/20 flex items-center justify-center text-yellow-400 border border-yellow-500/30">
                                <FileText className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-bold text-white">{`{client_phone}`}</div>
                                <div className="text-[10px] text-slate-500">From CRM Data</div>
                            </div>
                        </div>
                        <Plus className="w-4 h-4 text-slate-500 group-hover:text-white" />
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg border border-white/10 transition-colors">
                        Upload Base Asset
                    </button>
                </div>
            </div>

            {/* Canvas */}
            <div className="col-span-9 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Grid Pattern Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                <div className="relative w-[500px] h-[500px] bg-slate-800 shadow-2xl rounded-lg overflow-hidden border border-white/10 group">
                    {/* Simulated Content */}
                    <img
                        src={selectedAsset?.thumbnail || "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&h=600&fit=crop"}
                        alt="Canvas"
                        className="w-full h-full object-cover opacity-50"
                    />

                    {/* Simulated Dynamic Zone Overlay */}
                    <div className="absolute top-10 left-10 w-24 h-24 border-2 border-dashed border-blue-400 bg-blue-400/20 flex items-center justify-center cursor-move hover:bg-blue-400/30 transition-colors">
                        <span className="text-xs font-bold text-white drop-shadow-md">{`{logo}`}</span>
                    </div>

                    <div className="absolute bottom-10 left-0 right-0 h-16 border-2 border-dashed border-pink-400 bg-pink-400/20 flex items-center justify-center cursor-move hover:bg-pink-400/30 transition-colors">
                        <span className="text-xs font-bold text-white drop-shadow-md">{`{brand_color} Overlay`}</span>
                    </div>
                </div>

                <div className="absolute bottom-6 right-6 flex gap-3">
                    <button onClick={() => setActiveTab('deploy')} className="px-6 py-3 bg-brand-purple text-white font-bold rounded-full shadow-lg hover:shadow-brand-purple/20 hover:scale-105 transition-all flex items-center gap-2">
                        Save & Configure Push <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    const DeployView = () => (
        <div className="h-[calc(100vh-200px)] flex flex-col">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <button onClick={() => setActiveTab('editor')} className="text-xs flex items-center gap-1 text-slate-500 hover:text-white mb-2 transition-colors">
                        <ArrowRight className="w-3 h-3 rotate-180" /> Back to Editor
                    </button>
                    <h2 className="text-2xl font-bold text-white">Scale Deployment</h2>
                </div>
                <div className="flex items-center gap-4 bg-surface-dark border border-white/5 px-4 py-2 rounded-lg">
                    <span className="text-sm font-bold text-slate-400">Targeting:</span>
                    <span className="text-sm font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20">42 Dentists</span>
                    <span className="text-sm text-slate-600">|</span>
                    <button className="text-sm font-bold text-white hover:text-brand-purple transition-colors">Edit Filters</button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-8">
                {/* Visualizer */}
                <div className="bg-surface-dark border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center relative">
                    <h3 className="absolute top-6 left-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Nano Banana Simulator</h3>

                    <div className="mb-8 flex items-center gap-4">
                        <button onClick={() => setSimulationClient((prev) => (prev + 1) % CLIENTS.length)} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                            <RefreshCw className="w-3 h-3 text-brand-purple" />
                            <span className="text-xs font-bold text-white">Simulate Next Client</span>
                        </button>
                        <span className="text-xs text-slate-500">Previewing: <b className="text-white">{CLIENTS[simulationClient].name}</b></span>
                    </div>

                    <div className="relative w-80 h-80 shadow-2xl rounded-xl overflow-hidden border-4 border-slate-800">
                        {/* Base Image */}
                        <img
                            src={selectedAsset?.thumbnail || "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&h=600&fit=crop"}
                            alt="Final Render"
                            className="w-full h-full object-cover block"
                        />
                        {/* Simulated Overlays */}
                        <div className="absolute top-5 left-5 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center text-black font-black text-xs border border-slate-200">
                            {CLIENTS[simulationClient].logo}
                        </div>
                        <div className={`absolute bottom-0 left-0 right-0 h-12 ${CLIENTS[simulationClient].color} opacity-90 flex items-center justify-center text-white text-sm font-bold`}>
                            {CLIENTS[simulationClient].name} Special
                        </div>
                    </div>
                </div>

                {/* Confirm & Push */}
                <div className="flex flex-col justify-center space-y-8 p-8">
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 border border-green-500/30">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">Asset Ready</h4>
                                <p className="text-sm text-slate-400">All dynamic variables mapped correctly.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">42 Sub-Accounts Targeted</h4>
                                <p className="text-sm text-slate-400">Includes all 'Active' clients with tag 'Dentist'.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0 border border-yellow-500/30">
                                <Eye className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">Review Mode</h4>
                                <p className="text-sm text-slate-400">Posts will be created as "Pending Approval" in client boards.</p>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-gradient-to-r from-brand-purple to-brand-pink hover:to-brand-purple text-white text-lg font-bold rounded-xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                        <Send className="w-6 h-6" />
                        Deploy to 42 Calendars
                    </button>
                    <p className="text-center text-xs text-slate-500">
                        This action uses 42 Credits from your monthly allowance.
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                    Global Asset Hub
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-gold text-surface-dark uppercase tracking-wide">Beta</span>
                </h1>
                <p className="text-slate-400 text-sm">Build once. Deploy to everyone. The engine of agency scalability.</p>
            </div>

            {/* Dynamic View Content */}
            <div className="min-h-[600px]">
                {activeTab === 'vault' && <VaultView />}
                {activeTab === 'editor' && <EditorView />}
                {activeTab === 'deploy' && <DeployView />}
            </div>
        </div>
    );
};

export default GlobalLibrary;
