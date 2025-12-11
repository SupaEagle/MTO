
import { useState, useEffect } from 'react';

// Mock Data Structure
interface Script {
    id: number;
    hook: string;
    body: string;
    cta: string;
    objective: string;
    importance: string;
    visualDescription: string;
    status: 'pending' | 'approve' | 'veto' | 'redo';
    feedback?: string;
}

const INITIAL_SCRIPTS: Script[] = [
    {
        id: 1,
        hook: "Stop scrolling if you want to scale your agency to $50k/mo without paid ads.",
        body: "Most agency owners think they need more leads. They don't. They need a better offer. \n\nWhen your offer is irresistible, you don't need to chase clients. They come to you. Here's the 3-step framework we used to fix our churn...",
        cta: "Comment \"SCALE\"",
        objective: "Agitate the pain point of 'lead poverty' and pivot to 'offer quality' as the solution.",
        importance: "Shifting the belief system of the viewer builds authority. The $50k/mo claim acts as a strong anchor.",
        visualDescription: "Speaker speaking directly to camera, slightly zoomed in. Background is blurred modern office. Text overlays appear for 'Leads' (crossed out) and 'Offer' (highlighted).",
        status: 'pending'
    },
    {
        id: 2,
        hook: "They told you cold outreach was dead. They lied.",
        body: "Cold outreach isn't dead, your scripts are. \n\nI sent 100 DMs yesterday and booked 5 calls. The secret? I didn't pitch. I asked a specific question about their biggest bottleneck.",
        cta: "DM me \"SCRIPTS\"",
        objective: "Challenge a common industry myth (outreach is dead) to grab attention immediately.",
        importance: "Controversial takes get high engagement. providing recent proof (5 calls yesterday) validates the claim.",
        visualDescription: "Split screen: Left side shows '0 Replies' email inbox, Right side shows calendar filling up. Speaker in casual setting.",
        status: 'pending'
    },
    {
        id: 3,
        hook: "3 tools that replaced my entire marketing team.",
        body: "I used to spend $15k/mo on salaries. Now I spend $200/mo on AI. \n\n1. Tool A for copy\n2. Tool B for visuals\n3. Tool C for automation.\n\nHere is exact stack...",
        cta: "Link in Bio",
        objective: "Provide high value/utility content that is save-able and share-able.",
        importance: "Listicles with 'secret tools' have high viral potential. The cost saving contrast ($15k vs $200) is the emotional hook.",
        visualDescription: "Green screen video with the tools' websites appearing behind the speaker as they point to them. Fast paced cuts.",
        status: 'pending'
    }
];

const CreativeStudio = () => {
    const [currentStage, setCurrentStage] = useState(1);
    const [scripts, setScripts] = useState<Script[]>(INITIAL_SCRIPTS);
    const [selectedScript, setSelectedScript] = useState<Script | null>(null);

    // Redo / Feedback State
    const [redoMode, setRedoMode] = useState(false);
    const [feedbackText, setFeedbackText] = useState("");

    // Reset redo state when opening a new script
    useEffect(() => {
        setRedoMode(false);
        setFeedbackText("");
    }, [selectedScript]);

    const handleScriptUpdate = (id: number, field: keyof Script, value: any) => {
        setScripts(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
        if (selectedScript && selectedScript.id === id) {
            setSelectedScript(prev => prev ? { ...prev, [field]: value } : null);
        }
    };

    const handleRegenerate = () => {
        // Mock regeneration logic
        if (!selectedScript) return;

        handleScriptUpdate(selectedScript.id, 'status', 'redo');
        handleScriptUpdate(selectedScript.id, 'feedback', feedbackText);

        // Simulate agent thinking then updating (mock for now)
        setTimeout(() => {
            alert(`Compiling feedback for Agent: "${feedbackText}"\n\n(This would trigger the LLM regeneration pipeline in a real app)`);
            setRedoMode(false);
            setFeedbackText("");
        }, 500);
    };

    return (
        <div className="space-y-6">
            <div className="glass-panel p-8 rounded-2xl border border-brand-purple relative">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Creative Studio</h2>
                    <p className="text-slate-400">The Script-First production workflow: Text controls the Media.</p>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center justify-between mb-12 relative">
                    <div className="absolute top-5 left-16 right-16 h-1 bg-surface-border -z-10 transform -translate-y-1/2"></div>
                    {[1, 2, 3].map((stage) => (
                        <button
                            key={stage}
                            onClick={() => setCurrentStage(stage)}
                            className={`flex flex-col items-center gap-2 px-4 transition-colors ${currentStage >= stage ? 'text-brand-purple' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${currentStage >= stage ? 'bg-brand-purple text-white border-brand-purple' : 'bg-white border-white text-brand-purple'}`}>
                                {stage}
                            </div>
                            <span className="text-sm font-semibold">
                                {stage === 1 && "Strategy"}
                                {stage === 2 && "Script Lab"}
                                {stage === 3 && "Production Floor"}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Stage Rendering */}
                <div className="min-h-[400px]">
                    {currentStage === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Stage 1: Production Agent (Strategic Setup)</h3>
                                <p className="text-slate-400 text-sm mt-1">Chat with the Production Agent to define your strategy. It uses your Brand Vector DB for context.</p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[500px]">
                                {/* Chat Interface */}
                                <div className="lg:col-span-2 flex flex-col bg-surface-dark border border-surface-border rounded-xl overflow-hidden">
                                    {/* Chat History (Mock) */}
                                    <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-white font-bold text-xs">AI</div>
                                            <div className="bg-surface-card p-4 rounded-r-xl rounded-bl-xl border border-surface-border text-slate-300 text-sm max-w-[80%]">
                                                I've analyzed your <span className="text-brand-pink font-bold">Brand DNA</span> and recent performance. What are we building today?
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-surface-card border-t border-surface-border">
                                        <div className="relative">
                                            <textarea
                                                className="w-full bg-surface-dark border border-surface-border rounded-xl p-4 pr-12 text-white placeholder-slate-500 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all resize-none h-32"
                                                placeholder="Describe your campaign (e.g., 'Create 5 LinkedIn posts about our new pricing model, aiming for engagement')..."
                                            ></textarea>
                                            <div className="absolute bottom-3 right-3 flex gap-2">
                                                <button className="p-2 hover:bg-surface-hover rounded-lg text-slate-400 hover:text-white transition-colors" title="Attach File">📎</button>
                                                <button className="p-2 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-lg transition-all shadow-lg shadow-brand-purple/20">⬆</button>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex justify-between items-center px-1">
                                            <div className="flex gap-2">
                                                <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-1 rounded border border-brand-purple/20 flex items-center gap-1">⚡ Vector DB Active</span>
                                                <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20 flex items-center gap-1">🌐 Multimodal</span>
                                            </div>
                                            <span className="text-xs text-slate-500">Press Enter to send</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-surface-dark border border-surface-border p-4 rounded-xl h-full flex flex-col">
                                        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><span>📂</span> Context & Assets</h4>
                                        <div className="flex-1 border-2 border-dashed border-surface-border rounded-lg flex flex-col items-center justify-center p-6 text-center hover:bg-surface-card/50 transition-colors cursor-pointer group">
                                            <div className="w-12 h-12 rounded-full bg-surface-card group-hover:bg-brand-purple/20 flex items-center justify-center mb-3 transition-colors">
                                                <span className="text-2xl text-slate-400 group-hover:text-brand-purple">+</span>
                                            </div>
                                            <p className="text-slate-300 font-bold text-sm">Upload Source Files</p>
                                            <p className="text-slate-500 text-xs mt-1">Images, PDFs, or Voice Notes</p>
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Active Knowledge</div>
                                            <div className="text-xs text-slate-400 bg-surface-card p-2 rounded border border-surface-border flex items-center gap-2"><span>🧬</span> Core_Identity.json</div>
                                            <div className="text-xs text-slate-400 bg-surface-card p-2 rounded border border-surface-border flex items-center gap-2"><span>🎯</span> Audience_Personas.pdf</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <button onClick={() => setCurrentStage(2)} className="px-8 py-3 bg-gradient-to-r from-brand-pink to-brand-purple hover:from-brand-pink/90 hover:to-brand-purple/90 text-white font-bold rounded-lg shadow-lg hover:shadow-brand-purple/25 transition-all transform hover:scale-105">
                                    Complete Strategy & Go to Lab →
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStage === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-end border-b border-surface-border pb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-brand-gold mb-1">Stage 2: The Script Lab (Text & Logic)</h3>
                                    <p className="text-slate-400 text-sm">Review, Edit, and Approve the text before media generation.</p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="px-4 py-2 bg-surface-card border border-surface-border hover:border-brand-purple rounded-lg text-xs font-bold text-white transition-all">⚡ Make Hooks Aggressive</button>
                                    <button className="px-4 py-2 bg-surface-card border border-surface-border hover:border-brand-purple rounded-lg text-xs font-bold text-white transition-all">🔗 Set all CTAs to "Link in Bio"</button>
                                </div>
                            </div>

                            {/* Spreadsheet Grid Headers */}
                            <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-surface-dark border-y border-surface-border text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <div className="col-span-3">Hook (Headline)</div>
                                <div className="col-span-6">Script (Body)</div>
                                <div className="col-span-2">Call to Action</div>
                                <div className="col-span-1 text-right">Actions</div>
                            </div>

                            {/* Grid Rows */}
                            <div className="space-y-2">
                                {scripts.map((script) => (
                                    <div
                                        key={script.id}
                                        onClick={() => setSelectedScript(script)}
                                        className="grid grid-cols-12 gap-4 p-4 bg-surface-card border border-surface-border rounded-lg group hover:border-brand-pink/50 transition-all cursor-pointer hover:bg-brand-pink/10"
                                    >
                                        <div className="col-span-3 pointer-events-none">
                                            <p className="text-white font-bold text-sm line-clamp-3">{script.hook}</p>
                                        </div>
                                        <div className="col-span-6 pointer-events-none">
                                            <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 whitespace-pre-wrap">{script.body}</p>
                                        </div>
                                        <div className="col-span-2 flex items-start pointer-events-none">
                                            <div className="bg-brand-purple/10 border border-brand-purple/20 rounded px-2 py-1 text-xs text-brand-purple font-mono w-full text-center">
                                                {script.cta}
                                            </div>
                                        </div>
                                        <div className="col-span-1 flex justify-end gap-2 items-start">
                                            {/* Status Indicator bubble */}
                                            {script.status === 'approve' && <span className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></span>}
                                            {script.status === 'veto' && <span className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></span>}
                                            {script.status === 'redo' && <span className="w-3 h-3 rounded-full bg-brand-gold shadow-lg shadow-brand-gold/50"></span>}
                                            {script.status === 'pending' && <span className="text-xs text-slate-500 group-hover:text-brand-pink transition-colors">Edit &gt;</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between pt-8 border-t border-surface-border">
                                <button onClick={() => setCurrentStage(1)} className="px-6 py-2 border border-surface-border text-slate-300 rounded-lg hover:bg-surface-hover transition-all">← Back to Wizard</button>
                                <div className="flex gap-4">
                                    <span className="flex items-center text-slate-400 text-sm">{scripts.filter(s => s.status === 'approve').length} Scripts Approved</span>
                                    <button onClick={() => setCurrentStage(3)} className="px-8 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-lg shadow-lg hover:shadow-brand-purple/20 transition-all transform hover:scale-105">Approve & Send to Production →</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStage === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Stage 3: The Production Floor</h3>
                            <p className="text-slate-400 text-sm">The "Factory" where approved scripts become media.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-surface-dark border border-surface-border rounded-xl overflow-hidden group hover:border-brand-purple transition-all">
                                    <div className="p-4 border-b border-surface-border bg-surface-card flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">📱</span>
                                            <h4 className="font-bold text-white">Social Content</h4>
                                        </div>
                                        <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded border border-green-500/20">Active Node</span>
                                    </div>
                                    <div className="p-6">
                                        <div className="aspect-square bg-surface-card rounded-lg flex items-center justify-center border border-dashed border-surface-border mb-4 group-hover:bg-surface-hover/50 transition-colors">
                                            <div className="text-center">
                                                <p className="text-brand-purple font-mono mb-2">Processing Batch #4092</p>
                                                <p className="text-slate-500 text-xs">Generating 5 Visual Assets...</p>
                                            </div>
                                        </div>
                                        <button className="w-full py-3 bg-surface-card border border-surface-border hover:bg-brand-purple hover:text-white rounded-lg text-slate-300 font-bold transition-all">
                                            View Image Gallery
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-surface-dark border border-surface-border rounded-xl overflow-hidden group hover:border-brand-purple transition-all">
                                    <div className="p-4 border-b border-surface-border bg-surface-card flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">🎥</span>
                                            <h4 className="font-bold text-white">Video Content</h4>
                                        </div>
                                        <span className="text-xs bg-brand-gold/10 text-brand-gold px-2 py-1 rounded border border-brand-gold/20">Standby</span>
                                    </div>
                                    <div className="p-6">
                                        <div className="aspect-video bg-surface-card rounded-lg flex items-center justify-center border border-dashed border-surface-border mb-4 group-hover:bg-surface-hover/50 transition-colors">
                                            <div className="text-center">
                                                <p className="text-slate-400 font-mono mb-2">Awaiting Image Inputs...</p>
                                                <p className="text-slate-500 text-xs">Video generation starts after visual approval.</p>
                                            </div>
                                        </div>
                                        <button className="w-full py-3 bg-surface-card border border-surface-border hover:bg-brand-purple hover:text-white rounded-lg text-slate-300 font-bold transition-all">
                                            Configure Video Render
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-surface-hover rounded-xl border border-surface-border mt-8 flex justify-between items-center">
                                <div>
                                    <h5 className="font-bold text-white mb-1">Production Queue</h5>
                                    <p className="text-slate-400 text-xs">Job ID: #CS-2024-001 • Est. Completion: 2 mins</p>
                                </div>
                                <div className="flex gap-4">
                                    <button className="px-6 py-2 border border-surface-border text-slate-300 rounded-lg hover:bg-surface-card transition-all">
                                        Pause
                                    </button>
                                    <button className="px-6 py-2 bg-white text-surface-dark font-bold rounded-lg hover:bg-slate-200 transition-all">
                                        Download Assets
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between pt-8 border-t border-surface-border">
                                <button onClick={() => setCurrentStage(2)} className="px-6 py-2 border border-surface-border text-slate-300 rounded-lg hover:bg-surface-hover transition-all">
                                    ← Back to Script Lab
                                </button>
                                <button onClick={() => setCurrentStage(1)} className="px-6 py-2 border border-surface-border text-slate-300 rounded-lg hover:bg-surface-hover transition-all">
                                    Start New Campaign
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Script Detailed Modal */}
                {selectedScript && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <div
                            className="bg-surface-dark border border-surface-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-start p-6 border-b border-surface-border sticky top-0 bg-surface-dark/95 backdrop-blur z-10">
                                <div>
                                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                        Script Review
                                        <span className="text-xs font-normal text-slate-400 bg-surface-border px-2 py-1 rounded">ID: #{selectedScript.id}</span>
                                    </h3>
                                    <p className="text-slate-400 text-sm mt-1">Review the logic, objective, and visual direction.</p>
                                </div>
                                <button
                                    onClick={() => setSelectedScript(null)}
                                    className="p-2 hover:bg-surface-hover rounded-full transition-colors text-slate-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column: The Script Content */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-xs font-bold text-brand-pink uppercase tracking-wider mb-2 block">Hook (Headline)</label>
                                        <textarea
                                            value={selectedScript.hook}
                                            onChange={(e) => handleScriptUpdate(selectedScript.id, 'hook', e.target.value)}
                                            className="w-full bg-surface-card border border-surface-border rounded-lg p-3 text-white font-bold text-lg focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all resize-none"
                                            rows={2}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 block">Script Body</label>
                                        <textarea
                                            value={selectedScript.body}
                                            onChange={(e) => handleScriptUpdate(selectedScript.id, 'body', e.target.value)}
                                            className="w-full bg-surface-card border border-surface-border rounded-lg p-3 text-slate-300 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all resize-none leading-relaxed"
                                            rows={8}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-brand-purple uppercase tracking-wider mb-2 block">Call To Action</label>
                                        <input
                                            type="text"
                                            value={selectedScript.cta}
                                            onChange={(e) => handleScriptUpdate(selectedScript.id, 'cta', e.target.value)}
                                            className="w-full bg-surface-card border border-surface-border rounded-lg p-3 text-brand-purple font-mono focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Right Column: Context & Actions */}
                                <div className="space-y-6">

                                    {/* Strategic Context Box */}
                                    <div className="bg-surface-card/50 rounded-xl p-5 border border-surface-border space-y-4">
                                        <div>
                                            <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                                                <span>🎯</span> Objective
                                            </h4>
                                            <p className="text-slate-400 text-sm leading-relaxed">{selectedScript.objective}</p>
                                        </div>
                                        <div className="h-px bg-surface-border"></div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                                                <span>⭐</span> Why It's Important
                                            </h4>
                                            <p className="text-slate-400 text-sm leading-relaxed">{selectedScript.importance}</p>
                                        </div>
                                    </div>

                                    {/* Visual Direction Box */}
                                    <div className="bg-surface-card/50 rounded-xl p-5 border border-surface-border">
                                        <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                                            <span>🎥</span> Visual & Video Direction
                                        </h4>
                                        <textarea
                                            value={selectedScript.visualDescription}
                                            onChange={(e) => handleScriptUpdate(selectedScript.id, 'visualDescription', e.target.value)}
                                            className="w-full bg-surface-dark border border-surface-border rounded-lg p-3 text-slate-300 text-sm focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all resize-none"
                                            rows={4}
                                        />
                                    </div>

                                    {/* Action Section */}
                                    <div className="pt-4">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Approval Actions</label>

                                        {!redoMode ? (
                                            <div className="flex gap-2 p-1 bg-surface-border/30 rounded-lg border border-surface-border">
                                                <button
                                                    onClick={() => handleScriptUpdate(selectedScript.id, 'status', 'approve')}
                                                    className={`flex-1 py-3 px-4 rounded-md font-bold text-sm transition-all flex items-center justify-center gap-2 ${selectedScript.status === 'approve' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'hover:bg-surface-hover text-slate-400'}`}
                                                >
                                                    <span>✅</span> Approve
                                                </button>
                                                <button
                                                    onClick={() => handleScriptUpdate(selectedScript.id, 'status', 'veto')}
                                                    className={`flex-1 py-3 px-4 rounded-md font-bold text-sm transition-all flex items-center justify-center gap-2 ${selectedScript.status === 'veto' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'hover:bg-surface-hover text-slate-400'}`}
                                                >
                                                    <span>✕</span> Veto
                                                </button>
                                                <button
                                                    onClick={() => setRedoMode(true)}
                                                    className={`flex-1 py-3 px-4 rounded-md font-bold text-sm transition-all flex items-center justify-center gap-2 ${selectedScript.status === 'redo' ? 'bg-brand-gold/90 text-white shadow-lg shadow-brand-gold/20' : 'hover:bg-surface-hover text-slate-400'}`}
                                                >
                                                    <span>↻</span> Redo
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                <textarea
                                                    value={feedbackText}
                                                    onChange={(e) => setFeedbackText(e.target.value)}
                                                    className="w-full bg-surface-card border border-brand-gold/50 rounded-lg p-3 text-white text-sm focus:ring-1 focus:ring-brand-gold focus:border-brand-gold transition-all"
                                                    placeholder="Describe what needs to change..."
                                                    autoFocus
                                                    rows={3}
                                                />
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => setRedoMode(false)}
                                                        className="px-4 py-2 text-slate-400 text-sm hover:text-white"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleRegenerate}
                                                        className="flex-1 bg-brand-gold hover:bg-brand-gold/90 text-white font-bold py-2 px-4 rounded-lg shadow-lg shadow-brand-gold/20 flex items-center justify-center gap-2"
                                                    >
                                                        <span>🤖</span> Regenerate with Agent
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-4 flex justify-end">
                                            <button
                                                onClick={() => setSelectedScript(null)}
                                                className="text-slate-400 hover:text-white text-sm underline"
                                            >
                                                Close & Return to Lab
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreativeStudio;
