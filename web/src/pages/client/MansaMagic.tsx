import { useState } from 'react';
import {
    Sparkles, Upload, Wand2, Zap,
    Image as ImageIcon, CheckCircle, Share2,
    Play, Edit3
} from 'lucide-react';

const MansaMagic = () => {
    const [stage, setStage] = useState<'input' | 'processing' | 'reveal'>('input');
    const [intention, setIntention] = useState<'sales' | 'viral' | 'value'>('viral');
    const [loadingStatus, setLoadingStatus] = useState("Gemini is watching your video...");
    const [selectedClip, setSelectedClip] = useState<any>(null);

    // Mock Clips Data
    const GENERATED_CLIPS = [
        { id: 1, title: 'The Objection Handler', score: 94, duration: '0:45', type: 'Sales Magic', thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=600&fit=crop' },
        { id: 2, title: 'The Brand Story', score: 88, duration: '1:12', type: 'Viral Magic', thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=600&fit=crop' },
        { id: 3, title: 'Value Bomb #1', score: 91, duration: '0:58', type: 'Value Magic', thumbnail: 'https://images.unsplash.com/photo-1544716278-ca6e3f4fa98d?w=400&h=600&fit=crop' },
        { id: 4, title: 'Funny Outtake', score: 85, duration: '0:24', type: 'Viral Magic', thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=600&fit=crop' },
        { id: 5, title: 'Expert Tip', score: 82, duration: '0:38', type: 'Value Magic', thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop' },
    ];

    const startMagic = () => {
        setStage('processing');
        const statuses = [
            "Consulting your Brand DNA...",
            "Identifying the 'Money' moments...",
            "Polishing captions...",
            "Finalizing Virality Scores..."
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < statuses.length) {
                setLoadingStatus(statuses[i]);
                i++;
            } else {
                clearInterval(interval);
                setStage('reveal');
            }
        }, 800);
    };

    // --- SUB-COMPONENTS ---

    const MagicBox = () => (
        <div className="flex flex-col items-center justify-center min-h-[400px] animate-in fade-in zoom-in duration-500">
            <div className="w-full max-w-2xl bg-surface-dark border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-brand-pink/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="border-2 border-dashed border-white/20 rounded-2xl h-64 flex flex-col items-center justify-center mb-8 relative z-10 transition-colors group-hover:border-brand-purple/50">
                    <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                        <Upload className="w-8 h-8 text-brand-purple" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Drop your Zoom, Podcast, or YouTube link</h3>
                    <p className="text-sm text-slate-400">MP4, MOV, or URL</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-2 bg-black/20 p-1 rounded-lg border border-white/5">
                        <button
                            onClick={() => setIntention('sales')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${intention === 'sales' ? 'bg-brand-purple text-white shadow-lg' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Sales Magic
                        </button>
                        <button
                            onClick={() => setIntention('viral')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${intention === 'viral' ? 'bg-brand-pink text-white shadow-lg' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Viral Magic
                        </button>
                        <button
                            onClick={() => setIntention('value')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${intention === 'value' ? 'bg-brand-gold text-surface-dark shadow-lg' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Value Magic
                        </button>
                    </div>

                    <button
                        onClick={startMagic}
                        className="px-8 py-3 bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold rounded-xl shadow-xl hover:shadow-brand-purple/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <Wand2 className="w-5 h-5" /> Ignite
                    </button>
                </div>
            </div>
        </div>
    );

    const AlchemistLoader = () => (
        <div className="flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-500">
            <div className="relative w-32 h-32 mb-8">
                <div className="absolute inset-0 border-4 border-brand-purple/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-brand-pink animate-pulse" />
                </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 text-center animate-pulse">{loadingStatus}</h2>
            <p className="text-slate-400 text-sm">Transmuting footage into gold...</p>
        </div>
    );

    const RevealDeck = () => (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-brand-gold" /> The Magic Deck
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
                {GENERATED_CLIPS.map((clip, index) => (
                    <div
                        key={clip.id}
                        onClick={() => setSelectedClip(clip)}
                        className={`relative aspect-[9/16] bg-slate-800 rounded-xl cursor-pointer hover:-translate-y-2 transition-transform duration-300 group overflow-hidden border-2 ${selectedClip?.id === clip.id ? 'border-brand-purple shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'border-transparent'}`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <img src={clip.thumbnail} alt={clip.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />

                        {/* Score Badge */}
                        <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm border border-brand-gold/50 flex items-center justify-center text-brand-gold font-bold text-sm shadow-lg">
                            {clip.score}
                        </div>

                        {/* Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <h4 className="text-white font-bold text-sm leading-tight mb-1">{clip.title}</h4>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-slate-300 bg-white/10 px-1.5 py-0.5 rounded">{clip.type}</span>
                                <span className="text-[10px] text-slate-400 flex items-center gap-1"><Play className="w-2 h-2" /> {clip.duration}</span>
                            </div>
                        </div>

                        {/* Flip Reveal Animation Simulation */}
                        <div className="absolute inset-0 bg-brand-purple flex items-center justify-center backface-hidden transition-all duration-700 opacity-0 pointer-events-none">
                            <Wand2 className="w-12 h-12 text-white animate-spin-slow" />
                        </div>
                    </div>
                ))}
            </div>

            {/* EDITOR ZONE */}
            {selectedClip && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/10 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Zone 1: Quick Fix Player */}
                    <div className="lg:col-span-8 flex flex-col md:flex-row gap-8">
                        <div className="relative w-64 aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl shrink-0 border border-white/10 mx-auto md:mx-0">
                            <img src={selectedClip.thumbnail} className="w-full h-full object-cover opacity-80" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                                    <Play className="w-8 h-8 text-white fill-white" />
                                </div>
                            </div>
                            {/* Fake Captions Overlay */}
                            <div className="absolute bottom-20 left-4 right-4 text-center">
                                <span className="bg-black/60 text-white font-bold text-lg px-2 py-1 rounded-lg backdrop-blur-sm shadow-xl">
                                    "The number one mistake is..."
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    <Edit3 className="w-5 h-5 text-brand-purple" /> Quick Edit
                                </h3>
                                <div className="p-4 bg-surface-dark border border-white/10 rounded-xl space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Caption Correction</label>
                                        <div className="p-3 bg-black/20 rounded-lg text-white text-sm leading-relaxed border border-white/5 hover:border-brand-purple/30 transition-colors cursor-text">
                                            "The number one mistake is <span className="text-brand-pink underline decoration-dashed underline-offset-4 cursor-pointer">waiting</span> for the perfect moment."
                                        </div>
                                        <p className="text-[10px] text-slate-500">Click highlighted words to correct.</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                            <div className="flex items-center gap-2">
                                                <ImageIcon className="w-4 h-4 text-brand-gold" />
                                                <span className="text-sm font-medium text-slate-300">Watermark</span>
                                            </div>
                                            <div className="w-4 h-4 rounded border border-brand-purple bg-brand-purple flex items-center justify-center">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                            <div className="flex items-center gap-2">
                                                <Zap className="w-4 h-4 text-brand-pink" />
                                                <span className="text-sm font-medium text-slate-300">CTA Outro</span>
                                            </div>
                                            <div className="w-4 h-4 rounded border border-brand-purple bg-brand-purple flex items-center justify-center">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Zone 2: Export */}
                    <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
                        <div className="bg-surface-dark border border-white/10 rounded-xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-bl-full -mr-4 -mt-4"></div>
                            <h4 className="font-bold text-white mb-1">Virality Score: {selectedClip.score}</h4>
                            <p className="text-xs text-slate-400 mb-4">High probability of engagement on TikTok.</p>

                            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-6">
                                <div className="h-full bg-gradient-to-r from-brand-gold to-orange-500 w-[94%]"></div>
                            </div>

                            <button className="w-full py-4 bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold rounded-xl shadow-lg hover:shadow-brand-purple/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                <Share2 className="w-5 h-5" /> Send to Kanban
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-2">
                    Mansa Magic <span className="text-brand-purple text-lg font-normal">v1.2</span>
                </h1>
                <p className="text-slate-400">Turn 1 hour of rambling into 5 viral clips in 3 minutes.</p>
            </div>

            {stage === 'input' && <MagicBox />}
            {stage === 'processing' && <AlchemistLoader />}
            {stage === 'reveal' && <RevealDeck />}
        </div>
    );
};

export default MansaMagic;
