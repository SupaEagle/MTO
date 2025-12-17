
import { useState } from 'react';
import {
    Newspaper,
    PenTool,
    Globe,
} from 'lucide-react';

const ThePressRoom = () => {
    // Simple state to verify interactivity works
    const [count, setCount] = useState(0);

    return (
        <div className="p-8 text-white">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-brand-purple/20 rounded-xl">
                    <Newspaper className="w-8 h-8 text-brand-purple" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">The Press Room</h1>
                    <p className="text-slate-400">System Status: <span className="text-green-400 font-bold">ONLINE</span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-dark p-6 rounded-2xl border border-white/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-400" />
                        News Desk Monitor
                    </h3>
                    <p className="text-slate-400 mb-6">
                        The news feed is currently initializing. If you can see this, the routing and component mounting are successful.
                    </p>
                    <button
                        onClick={() => setCount(c => c + 1)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold transition-colors"
                    >
                        Test Interaction: {count}
                    </button>
                </div>

                <div className="bg-surface-dark p-6 rounded-2xl border border-white/10 opacity-50">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <PenTool className="w-5 h-5 text-slate-400" />
                        Coming Soon
                    </h3>
                    <p className="text-slate-400">
                        Advanced curation features are loading...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ThePressRoom;
