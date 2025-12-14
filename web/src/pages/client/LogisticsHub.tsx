import { useState } from 'react';
import {
    Calendar as CalendarIcon,
    Grid,
    Plus,
    X,
    Instagram,
    Linkedin,
    Facebook,
    Twitter,
    Youtube,
    RefreshCw,
    Image as ImageIcon
} from 'lucide-react';

const LogisticsHub = () => {
    const [activeView, setActiveView] = useState<'calendar' | 'grid'>('calendar');
    const [showComposer, setShowComposer] = useState(false);
    const [showRecycler, setShowRecycler] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>('instagram');

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
                        <PlatformToggle icon={<Twitter className="w-4 h-4" />} active={selectedPlatform === 'twitter'} onClick={() => setSelectedPlatform('twitter')} color="text-sky-400" />
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
            {showComposer && <OmniComposer onClose={() => setShowComposer(false)} />}
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

const OmniComposer = ({ onClose }: { onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState('twitter');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-surface-dark border border-surface-border rounded-2xl w-full max-w-6xl h-[80vh] flex overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Left Panel: Master Input */}
                <div className="w-1/3 bg-surface-card p-6 border-r border-surface-border flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-6">Master Input</h3>
                    <div className="space-y-4 flex-1">
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Core Idea / Text</label>
                            <textarea
                                className="w-full h-40 bg-surface-dark border border-surface-border rounded-xl p-4 text-white resize-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all"
                                placeholder="What's on your mind? e.g. 'We just launched our new vanilla flavor'..."
                            ></textarea>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Master Media</label>
                            <div className="border-2 border-dashed border-surface-border rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:text-white hover:border-brand-purple hover:bg-brand-purple/5 transition-all cursor-pointer">
                                <ImageIcon className="w-8 h-8 mb-2" />
                                <span className="text-sm font-medium">Drop 4K Video or Image</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Platform Splitter */}
                <div className="w-2/3 flex flex-col bg-surface-dark">
                    <div className="flex border-b border-surface-border">
                        {[
                            { id: 'twitter', icon: Twitter, label: 'X Thread', color: 'text-sky-400' },
                            { id: 'instagram', icon: Instagram, label: 'Insta Reel', color: 'text-pink-500' },
                            { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: 'text-blue-500' },
                            { id: 'facebook', icon: Facebook, label: 'Facebook', color: 'text-blue-600' },
                            { id: 'youtube', icon: Youtube, label: 'YouTube Short', color: 'text-red-600' },
                            { id: 'pinterest', icon: PinterestIcon, label: 'Pinterest', color: 'text-red-500' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-bold border-b-2 transition-all ${activeTab === tab.id ? `border-brand-purple text-white bg-surface-card` : 'border-transparent text-slate-500 hover:text-white hover:bg-surface-hover'}`}
                            >
                                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? tab.color : ''}`} /> {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 p-8 overflow-y-auto">
                        {/* Mock AI Output */}
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="bg-surface-card border border-surface-border rounded-xl p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-brand-purple/20 rounded-full flex items-center justify-center text-brand-purple">
                                            <span className="text-xs font-bold">AI</span>
                                        </div>
                                        <span className="text-sm font-bold text-white">Generated Draft</span>
                                    </div>
                                    <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded border border-green-500/20 font-bold">Optimized for {activeTab}</span>
                                </div>

                                {activeTab === 'twitter' && (
                                    <div className="space-y-4">
                                        <div className="p-3 border-l-2 border-slate-600 pl-4">
                                            <p className="text-white text-lg">Stop scrolling. 🛑</p>
                                        </div>
                                        <div className="p-3 border-l-2 border-slate-600 pl-4">
                                            <p className="text-white text-lg">Our new vanilla flavor just dropped and it's changing the game. Here is why you need to try it: 🧵👇</p>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'instagram' && (
                                    <div className="space-y-4">
                                        <p className="text-white text-sm leading-relaxed">
                                            POV: You finally found the perfect vanilla coffee. 🍦☕️ <br /><br />
                                            We just launched the Vanilla Bean Dream and we can't keep it in stock. Tag a friend who needs this! 👇<br /><br />
                                            #CoffeeLover #NewDrop #VanillaDream #MorningRoutine
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-slate-400 bg-surface-dark p-2 rounded">
                                            <span>🎵 Suggested Audio:</span>
                                            <span className="text-white font-bold">"Espresso" by Sabrina Carpenter</span>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'linkedin' && (
                                    <div className="space-y-4">
                                        <p className="text-white text-sm leading-relaxed">
                                            Innovation isn't just about tech. It's about flavor.<br /><br />
                                            Today marks a huge milestone for our team. We spent 6 months perfecting our extraction process to create the most authentic Vanilla profile on the market.<br /><br />
                                            What's the one product launch that impressed you recently? Let's discuss in the comments. ⬇️
                                        </p>
                                    </div>
                                )}

                                {activeTab === 'youtube' && (
                                    <div className="space-y-4">
                                        <p className="text-white text-sm leading-relaxed">
                                            The BEST Vanilla Latex you'll ever taste! 🍦 We just dropped the new Vanilla Bean Dream. Link in bio! #Shorts #Coffee #NewDrop
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-slate-400 bg-surface-dark p-2 rounded">
                                            <span>🎵 Trending Sound:</span>
                                            <span className="text-white font-bold">"Coffee Shop Vibes" by ViralHitz</span>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'pinterest' && (
                                    <div className="space-y-4">
                                        <p className="text-white text-sm leading-relaxed">
                                            Aesthetic Coffee Morning Routine | Vanilla Bean Dream Launch 🍦✨ <br /><br />
                                            Get the perfect morning vibe with our new limited edition flavor. Click to shop now!
                                        </p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="bg-red-500/10 text-red-500 text-[10px] px-2 py-1 rounded border border-red-500/20">Idea Pin</span>
                                            <span className="bg-surface-dark text-slate-400 text-[10px] px-2 py-1 rounded border border-surface-border">Link: myshop.com/vanilla</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-3">
                                <button className="px-6 py-2 text-slate-400 hover:text-white font-medium">Regenerate</button>
                                <button className="px-6 py-2 bg-white text-surface-dark font-bold rounded-lg hover:bg-slate-200 transition-colors">Approve & Schedule</button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-surface-border bg-surface-card flex justify-between items-center">
                        <button onClick={onClose} className="text-slate-400 hover:text-white">Cancel</button>
                        <button className="px-8 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-lg shadow-lg hover:shadow-brand-purple/20 transition-all transform hover:scale-105">
                            Schedule All Platforms
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Icons ---

const PinterestIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 20l4-9" />
        <path d="M10.7 6C5.3 6 1 10.3 1 15.6c0 3.3 1.6 6.2 4.1 8l-.6-3.3s-1.5-6.2 3.1-6.2c1.5 0 2.6.9 2.6 2.1 0 1.3-.8 3.2-1.3 5" />
    </svg>
);

export default LogisticsHub;
