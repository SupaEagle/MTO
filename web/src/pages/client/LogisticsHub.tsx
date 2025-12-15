import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Calendar as CalendarIcon,
    Grid,
    Plus,
    X,
    Instagram,
    Linkedin,
    Facebook,
    Youtube,
    RefreshCw,
    Image as ImageIcon,
    Check,
    Wand2,
    Edit2
} from 'lucide-react';

const LogisticsHub = () => {
    const location = useLocation();
    const [activeView, setActiveView] = useState<'calendar' | 'grid'>('calendar');
    const [showComposer, setShowComposer] = useState(false);
    const [showRecycler, setShowRecycler] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>('instagram');
    const [incomingAsset, setIncomingAsset] = useState<any>(null);

    useEffect(() => {
        if (location.state?.incomingAsset) {
            setIncomingAsset(location.state.incomingAsset);
            setShowComposer(true);
        }
    }, [location.state]);

    return (
        <div className="space-y-6 relative h-[calc(100vh-140px)] flex flex-col">
            {/* Header / Controls */}
            <div className="flex justify-between items-center bg-surface-card p-4 rounded-xl border border-surface-border">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-white">Logistics Hub</h2>
                    <div className="h-8 w-px bg-surface-border"></div>
                    <div className="flex bg-surface-dark p-1 rounded-lg border border-surface-border">
                        <button
                            onClick={() => setActiveView('calendar')}
                            className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-bold transition-all ${activeView === 'calendar' ? 'bg-surface-card text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            <CalendarIcon className="w-4 h-4" /> Calendar
                        </button>
                        <button
                            onClick={() => setActiveView('grid')}
                            className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-bold transition-all ${activeView === 'grid' ? 'bg-surface-card text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Grid className="w-4 h-4" /> Visual Grid
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Platform Toggles */}
                    <div className="flex items-center gap-2 mr-4">
                        <PlatformToggle icon={<Instagram className="w-4 h-4" />} active={selectedPlatform === 'instagram'} onClick={() => setSelectedPlatform('instagram')} color="text-pink-500" />
                        <PlatformToggle icon={<Linkedin className="w-4 h-4" />} active={selectedPlatform === 'linkedin'} onClick={() => setSelectedPlatform('linkedin')} color="text-blue-500" />
                        <PlatformToggle icon={<XIcon className="w-3.5 h-3.5" />} active={selectedPlatform === 'twitter'} onClick={() => setSelectedPlatform('twitter')} color="text-white" />
                        <PlatformToggle icon={<Facebook className="w-4 h-4" />} active={selectedPlatform === 'facebook'} onClick={() => setSelectedPlatform('facebook')} color="text-blue-600" />
                        <PlatformToggle icon={<Youtube className="w-4 h-4" />} active={selectedPlatform === 'youtube'} onClick={() => setSelectedPlatform('youtube')} color="text-red-600" />
                        <PlatformToggle icon={<PinterestIcon className="w-4 h-4" />} active={selectedPlatform === 'pinterest'} onClick={() => setSelectedPlatform('pinterest')} color="text-red-500" />
                    </div>

                    <button
                        onClick={() => setShowRecycler(!showRecycler)}
                        className={`p-2 rounded-lg border transition-colors ${showRecycler ? 'bg-brand-gold/10 border-brand-gold text-brand-gold' : 'bg-surface-dark border-surface-border text-slate-400 hover:text-white'}`}
                        title="Smart Recycling Engine"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setShowComposer(true)}
                        className="px-6 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-lg shadow-lg hover:shadow-brand-purple/20 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" /> Create Post
                    </button>
                </div>
            </div>

            {/* Main Canvas */}
            <div className="flex-1 bg-surface-card border border-surface-border rounded-xl overflow-hidden relative">
                {activeView === 'calendar' ? <PredictiveCalendar setShowComposer={setShowComposer} /> : <VisualGridPlanner />}

                {/* Smart Recycling Drawer */}
                <div className={`absolute top-0 right-0 bottom-0 w-80 bg-surface-dark border-l border-surface-border transform transition-transform duration-300 z-20 ${showRecycler ? 'translate-x-0' : 'translate-x-full'}`}>
                    <SmartRecyclingEngine onClose={() => setShowRecycler(false)} />
                </div>
            </div>

            {/* Omni-Composer Modal */}
            {showComposer && <OmniComposer onClose={() => setShowComposer(false)} initialAsset={incomingAsset} />}
        </div>
    );
};

// --- Sub-components ---

const PlatformToggle = ({ icon, active, onClick, color }: any) => (
    <button
        onClick={onClick}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border ${active ? `bg-surface-dark ${color} border-current ring-1 ring-current` : 'bg-surface-dark text-slate-600 border-transparent hover:bg-surface-hover'}`}
    >
        {icon}
    </button>
);

const PredictiveCalendar = ({ setShowComposer }: { setShowComposer: (v: boolean) => void }) => {
    // Mock days for calendar
    const days = Array.from({ length: 35 }, (_, i) => {
        const isHot = i === 12 || i === 18 || i === 25; // Random hot days
        const isGap = i === 15; // Random gap
        return {
            day: i + 1,
            status: isHot ? 'hot' : isGap ? 'gap' : 'normal',
            posts: i === 12 ? [{ title: 'Product Launch', type: 'IG' }] : []
        };
    });

    return (
        <div className="h-full flex flex-col">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 border-b border-surface-border">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="p-3 text-center text-xs font-bold text-slate-500 uppercase">{d}</div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                {days.map((day, idx) => (
                    <div
                        key={idx}
                        className={`
                            border-r border-b border-surface-border p-2 relative group transition-colors min-h-[100px]
                            ${day.status === 'hot' ? 'bg-brand-pink/5 hover:bg-brand-pink/10' : ''}
                            ${day.status === 'gap' ? 'bg-surface-dark/50' : ''}
                        `}
                    >
                        <span className={`text-sm font-medium ${day.status === 'hot' ? 'text-brand-pink' : 'text-slate-400'}`}>{(idx % 30) + 1}</span>

                        {day.status === 'hot' && (
                            <div className="absolute top-2 right-2 flex gap-1">
                                <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse"></span>
                            </div>
                        )}

                        {/* Existing Posts */}
                        {day.posts.map((post, pIdx) => (
                            <div key={pIdx} className="mt-2 text-xs bg-surface-dark border border-brand-purple/30 text-white p-2 rounded truncate cursor-move hover:border-brand-purple transition-colors">
                                {post.title}
                            </div>
                        ))}

                        {/* Ghost Slot */}
                        {day.status === 'gap' && (
                            <div
                                onClick={() => setShowComposer(true)}
                                className="mt-4 mx-2 border-2 border-dashed border-brand-gold/30 rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-gold/5 group/gap"
                            >
                                <span className="text-brand-gold text-xs font-bold group-hover/gap:scale-110 transition-transform">⚡ Fill Gap</span>
                            </div>
                        )}

                        {/* Hover Add */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                            {day.status === 'hot' && <span className="text-xs font-bold text-brand-pink bg-surface-dark px-2 py-1 rounded border border-brand-pink/50">Viral Time</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const VisualGridPlanner = () => {
    return (
        <div className="h-full flex items-center justify-center bg-surface-dark/50 p-8">
            <div className="flex gap-12 h-full">
                {/* Phone Simulator */}
                <div className="relative h-full aspect-[9/19] bg-black rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden">
                    {/* Status Bar */}
                    <div className="h-8 bg-black w-full flex justify-between items-center px-6 pt-2">
                        <span className="text-white text-[10px font-bold">9:41</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                    {/* App Header */}
                    <div className="bg-black text-white p-4 flex justify-between items-center border-b border-white/10">
                        <span className="font-bold">user_official</span>
                        <Grid className="w-5 h-5" />
                    </div>
                    {/* The Grid */}
                    <div className="grid grid-cols-3 gap-0.5 bg-black p-0.5 overflow-y-auto h-full pb-20 no-scrollbar">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="aspect-square bg-slate-800 relative group cursor-grab active:cursor-grabbing hover:opacity-90">
                                <img
                                    src={`https://picsum.photos/seed/${i + 45}/300/300`}
                                    alt="Post"
                                    className="w-full h-full object-cover"
                                />
                                {i === 0 && <div className="absolute top-1 right-1 bg-brand-pink text-[8px] font-bold text-white px-1 rounded">Scheduled</div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feed Controls */}
                <div className="flex flex-col justify-center space-y-6">
                    <div className="bg-surface-card border border-surface-border p-6 rounded-xl w-64">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            Feed Balancer
                        </h3>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                            <span className="text-green-500 font-bold">Great Mix</span>
                        </div>
                        <p className="text-xs text-slate-400">Your ratio of Reels, Carousels, and Static posts is optimized for engagement.</p>

                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-xs text-slate-300">
                                <span>Reels</span>
                                <span>40%</span>
                            </div>
                            <div className="h-1 bg-surface-dark rounded-full overflow-hidden">
                                <div className="h-full bg-pink-500 w-[40%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SmartRecyclingEngine = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-surface-border flex justify-between items-center bg-surface-card">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-brand-gold" /> The Vault
                </h3>
                <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <p className="text-xs text-slate-400 mb-4">Top performing content older than 6 months.</p>

                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-surface-card border border-surface-border rounded-lg p-3 group hover:border-brand-gold/50 transition-all">
                        <div className="flex gap-3 mb-3">
                            <div className="w-12 h-12 bg-slate-700 rounded-md overflow-hidden">
                                <img src={`https://picsum.photos/seed/${i + 100}/100/100`} alt="Thumb" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="text-white text-sm font-bold line-clamp-1">5 Ways to scale your...</h4>
                                <span className="text-[10px] text-brand-purple bg-brand-purple/10 px-1.5 py-0.5 rounded border border-brand-purple/20">Top 5% Engagement</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 py-1.5 bg-surface-dark hover:bg-surface-hover text-slate-300 text-xs rounded border border-surface-border transition-colors">
                                View
                            </button>
                            <button className="flex-1 py-1.5 bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold text-xs font-bold rounded border border-brand-gold/20 flex items-center justify-center gap-1 transition-colors">
                                <RefreshCw className="w-3 h-3" /> Fresh Paint
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const OmniComposer = ({ onClose, initialAsset }: { onClose: () => void, initialAsset?: any }) => {
    const [activeTab, setActiveTab] = useState('twitter');
    const [showPool, setShowPool] = useState(false);
    const [masterText, setMasterText] = useState("");
    const [masterMedia, setMasterMedia] = useState<string | null>(null);

    // New State for Scheduling & Editing
    const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set(['twitter', 'instagram', 'linkedin', 'facebook', 'youtube', 'pinterest']));
    const [schedules, setSchedules] = useState<Record<string, { date: string, time: string }>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [platformContent, setPlatformContent] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialAsset) {
            setMasterText(initialAsset.script);
            setMasterMedia(initialAsset.image);
        }
    }, [initialAsset]);

    // Initialize default schedule for all platforms (e.g., tomorrow at 9am)
    useEffect(() => {
        const initialSchedules: Record<string, { date: string, time: string }> = {};
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dateStr = tomorrow.toISOString().split('T')[0];

        ['twitter', 'instagram', 'linkedin', 'facebook', 'youtube', 'pinterest'].forEach(p => {
            initialSchedules[p] = { date: dateStr, time: "09:00" };
        });
        setSchedules(initialSchedules);
    }, []);

    const handlePoolSelect = (item: any) => {
        setMasterText(item.script);
        setMasterMedia(item.image);
        setShowPool(false);
    };

    const togglePlatform = (platformId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newSelected = new Set(selectedPlatforms);
        if (newSelected.has(platformId)) {
            newSelected.delete(platformId);
        } else {
            newSelected.add(platformId);
        }
        setSelectedPlatforms(newSelected);
    };

    const handleScheduleChange = (key: 'date' | 'time', value: string) => {
        setSchedules(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab],
                [key]: value
            }
        }));
    };

    const handleRegenerate = () => {
        setIsRegenerating(true);
        setTimeout(() => {
            setIsRegenerating(false);
            // Mock content change or just feedback
            alert(`Regenerated content for ${activeTab} using new AI context!`);
        }, 1500);
    };

    const handleApply = () => {
        // Collect all scheduled posts
        const payload = Array.from(selectedPlatforms).map(p => ({
            platform: p,
            content: platformContent[p] || masterText, // Fallback to master if no specific edit
            schedule: schedules[p],
            media: masterMedia
        }));

        console.log("Scheduling Payload:", payload);
        alert(`✅ Successfully Scheduled ${payload.length} posts!\n\nReturning to Calendar...`);
        onClose();
    };

    const platforms = [
        { id: 'twitter', icon: XIcon, label: 'X Post', color: 'text-white' },
        { id: 'instagram', icon: Instagram, label: 'Insta Reel', color: 'text-pink-500' },
        { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: 'text-blue-500' },
        { id: 'facebook', icon: Facebook, label: 'Facebook', color: 'text-blue-600' },
        { id: 'youtube', icon: Youtube, label: 'YouTube Short', color: 'text-red-600' },
        { id: 'pinterest', icon: PinterestIcon, label: 'Pinterest', color: 'text-red-500' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-surface-dark border border-surface-border rounded-2xl w-full max-w-6xl h-[85vh] flex overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 relative">

                {/* Content Pool Overlay */}
                {showPool && (
                    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-12 animate-in fade-in duration-300">
                        <div className="w-full max-w-4xl h-full flex flex-col">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-2">Creative Studio Content Vault</h2>
                                    <p className="text-slate-400">Select approved assets to schedule.</p>
                                </div>
                                <button onClick={() => setShowPool(false)} className="p-2 bg-surface-card rounded-full hover:bg-white/10 transition-colors"><X className="w-6 h-6 text-white" /></button>
                            </div>

                            <div className="grid grid-cols-3 gap-6 overflow-y-auto pb-20">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} onClick={() => handlePoolSelect({
                                        script: "Stop scrolling if you want to scale to $50k/mo. Most agency owners think they need leads, but they need a better offer. Here is the framework...",
                                        image: `https://picsum.photos/seed/${i + 200}/400/400`
                                    })} className="bg-surface-card border border-surface-border rounded-xl overflow-hidden group hover:border-brand-purple cursor-pointer transition-all hover:scale-[1.02]">
                                        <div className="aspect-video bg-slate-800 relative">
                                            <img src={`https://picsum.photos/seed/${i + 200}/400/400`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">APPROVED</div>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-white font-bold mb-2">Campaign Asset #{i}492</h4>
                                            <p className="text-xs text-slate-400 line-clamp-2">Stop scrolling if you want to scale to $50k/mo. Most agency owners think they need leads...</p>
                                            <div className="mt-3 flex gap-2">
                                                <span className="text-[10px] bg-brand-purple/10 text-brand-purple border border-brand-purple/20 px-2 py-0.5 rounded">Video</span>
                                                <span className="text-[10px] bg-surface-dark text-slate-400 border border-surface-border px-2 py-0.5 rounded">Ready</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Left Panel: Master Input */}
                <div className="w-1/3 bg-surface-card p-6 border-r border-surface-border flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-6">Master Input</h3>
                    <div className="space-y-4 flex-1">
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Core Idea / Text</label>
                            <textarea
                                value={masterText}
                                onChange={(e) => setMasterText(e.target.value)}
                                className="w-full h-40 bg-surface-dark border border-surface-border rounded-xl p-4 text-white resize-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all"
                                placeholder="What's on your mind? e.g. 'We just launched our new vanilla flavor'..."
                            ></textarea>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Master Media</label>
                                <button
                                    onClick={() => setShowPool(true)}
                                    className="text-xs font-bold text-brand-purple hover:text-white transition-colors flex items-center gap-1"
                                >
                                    <span>📂</span> Browse Vault
                                </button>
                            </div>

                            {masterMedia ? (
                                <div className="relative group rounded-xl overflow-hidden border border-brand-purple shadow-lg shadow-brand-purple/20">
                                    <img src={masterMedia} className="w-full h-48 object-cover" />
                                    <button
                                        onClick={() => setMasterMedia(null)}
                                        className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-red-500 rounded-lg text-white transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                        <p className="text-xs text-white font-bold">Selected from Vault</p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    onClick={() => setShowPool(true)}
                                    className="border-2 border-dashed border-surface-border rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:text-white hover:border-brand-purple hover:bg-brand-purple/5 transition-all cursor-pointer h-48"
                                >
                                    <ImageIcon className="w-8 h-8 mb-2" />
                                    <span className="text-sm font-medium">Drop 4K Video or Image</span>
                                    <span className="text-xs opacity-50 mt-1">or select from Vault</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Platform Splitter */}
                <div className="w-2/3 flex flex-col bg-surface-dark">
                    <div className="flex border-b border-surface-border overflow-x-auto no-scrollbar">
                        {platforms.map(tab => {
                            const isSelected = selectedPlatforms.has(tab.id);
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 min-w-[100px] py-4 flex items-center justify-center gap-2 text-sm font-bold relative transition-all group ${activeTab === tab.id ? `text-white bg-surface-card` : 'text-slate-500 hover:text-white hover:bg-surface-hover'} ${!isSelected ? 'opacity-50 grayscale' : ''}`}
                                >
                                    {/* Custom Bottom Border */}
                                    {activeTab === tab.id && (
                                        <span className="absolute bottom-2 left-0 right-0 h-0.5 bg-brand-purple z-10 mx-4 rounded-t-full shadow-[0_-2px_8px_rgba(124,58,237,0.5)]"></span>
                                    )}
                                    <div
                                        onClick={(e) => togglePlatform(tab.id, e)}
                                        className={`w-3 h-3 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-brand-gold border-brand-gold' : 'bg-transparent border-brand-purple hover:border-brand-gold'}`}
                                        title={`Toggle ${tab.label}`}
                                    >
                                        {isSelected && <Check className="w-2 h-2 text-black" />}
                                    </div>
                                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? tab.color : ''}`} />
                                    <span className="hidden lg:inline">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex-1 p-8 overflow-y-auto bg-surface-card/30">
                        {/* Mock AI Output */}
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">

                            {/* Editor Card */}
                            <div className="bg-surface-card border border-surface-border rounded-xl p-6 shadow-xl">
                                <div className="flex justify-between items-start mb-4 border-b border-surface-border pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-brand-purple/20 rounded-full flex items-center justify-center text-brand-purple ring-1 ring-brand-purple/50">
                                            <Wand2 className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold text-white block">Generated Draft</span>
                                            <span className="text-[10px] text-slate-400">Optimized for {platforms.find(p => p.id === activeTab)?.label}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold ${isEditing ? 'bg-brand-purple text-white' : 'bg-surface-dark text-slate-400 hover:text-white'}`}
                                        >
                                            <Edit2 className="w-3 h-3" /> {isEditing ? 'Done' : 'Edit'}
                                        </button>
                                        <button
                                            onClick={handleRegenerate}
                                            disabled={isRegenerating}
                                            className="p-2 bg-surface-dark text-slate-400 hover:text-white rounded-lg transition-colors"
                                            title="Regenerate"
                                        >
                                            <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin text-brand-gold' : ''}`} />
                                        </button>
                                    </div>
                                </div>

                                <div className="min-h-[120px]">
                                    {isEditing ? (
                                        <textarea
                                            className="w-full bg-surface-dark border border-surface-border rounded-lg p-3 text-white text-sm focus:ring-1 focus:ring-brand-purple focus:border-brand-purple h-32 leading-relaxed"
                                            value={platformContent[activeTab] || masterText}
                                            onChange={(e) => setPlatformContent(prev => ({ ...prev, [activeTab]: e.target.value }))}
                                        />
                                    ) : (
                                        <div className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                                            {platformContent[activeTab] || masterText || "Start typing in the Master Input to generate content..."}
                                            {!masterText && !platformContent[activeTab] && <span className="text-slate-500 italic"> waiting for input...</span>}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Scheduling Card */}
                            {selectedPlatforms.has(activeTab) && (
                                <div className="bg-surface-card border border-surface-border rounded-xl p-6 shadow-md animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                        <CalendarIcon className="w-4 h-4 text-brand-pink" />
                                        Schedule for {platforms.find(p => p.id === activeTab)?.label}
                                    </h4>
                                    <div className="flex gap-4">
                                        <div className="flex-1 space-y-2">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase">Date</label>
                                            <input
                                                type="date"
                                                className="w-full bg-surface-dark border border-surface-border rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-brand-pink focus:border-brand-pink"
                                                value={schedules[activeTab]?.date || ''}
                                                onChange={(e) => handleScheduleChange('date', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase">Time</label>
                                            <input
                                                type="time"
                                                className="w-full bg-surface-dark border border-surface-border rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-brand-pink focus:border-brand-pink"
                                                value={schedules[activeTab]?.time || ''}
                                                onChange={(e) => handleScheduleChange('time', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between p-3 bg-brand-pink/5 border border-brand-pink/20 rounded-lg">
                                        <span className="text-xs text-brand-pink flex items-center gap-2 font-bold">
                                            <span>✨</span> Best Time: {schedules[activeTab]?.time || '09:00'} (High Engagement)
                                        </span>
                                        <button className="text-[10px] text-slate-400 hover:text-white underline">Why this time?</button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    <div className="p-4 border-t border-surface-border bg-surface-card flex justify-between items-center z-10">
                        <button onClick={onClose} className="text-slate-400 hover:text-white font-medium px-4 py-2">Cancel</button>
                        <button
                            onClick={handleApply}
                            className="px-8 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-lg shadow-lg hover:shadow-brand-purple/20 transition-all transform hover:scale-105 flex items-center gap-2"
                        >
                            <CalendarIcon className="w-4 h-4" /> Apply Schedule ({selectedPlatforms.size})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Icons ---

// --- Icons ---

const XIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const PinterestIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M9.04 21.54c.96.29 1.93.46 2.96.46a10 10 0 0 0 10-10A10 10 0 0 0 12 2 10 10 0 0 0 2 12c0 4.25 2.67 7.9 6.42 9.48-.08-.83-.15-2.08.03-2.98.17-.74 1.11-4.72 1.11-4.72s-.28-.56-.28-1.39c0-1.31.76-2.29 1.7-2.29.8 0 1.19.6 1.19 1.32 0 .8-.51 2.01-.78 3.12-.22.93.47 1.69 1.39 1.69 1.67 0 2.95-1.76 2.95-4.3 0-2.25-1.61-3.82-3.92-3.82-2.85 0-4.53 2.14-4.53 4.35 0 .86.33 1.78.74 2.28.08.1.09.19.07.29l-.27 1.11c-.04.18-.14.22-.33.13-1.22-.57-1.98-2.35-1.98-3.79 0-3.08 2.24-5.91 6.46-5.91 3.39 0 6.03 2.42 6.03 5.66 0 3.38-2.13 6.1-5.09 6.1-1 0-1.93-.52-2.25-1.13l-.61 2.33c-.22.85-.82 1.91-1.22 2.56z" />
    </svg>
);

export default LogisticsHub;
