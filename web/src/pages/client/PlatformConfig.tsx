import { useState } from 'react';

const PlatformConfig = () => {
    const [platforms, setPlatforms] = useState([
        { id: 'linkedin', name: 'LinkedIn', connected: true, account: 'Sarah Johnson' },
        { id: 'twitter', name: 'X (Twitter)', connected: true, account: '@sarahj_marketing' },
        { id: 'instagram', name: 'Instagram', connected: false, account: '' },
        { id: 'facebook', name: 'Facebook Page', connected: false, account: '' },
        { id: 'youtube', name: 'YouTube', connected: false, account: '' },
        { id: 'pinterest', name: 'Pinterest', connected: false, account: '' },
    ]);

    const toggleConnection = (id: string) => {
        setPlatforms(platforms.map(p =>
            p.id === id ? { ...p, connected: !p.connected } : p
        ));
    };

    return (
        <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-2">Social Platform Configuration</h2>
                <p className="text-slate-400 mb-8">Connect your accounts to enable auto-posting and analytics.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {platforms.map((platform) => (
                        <div key={platform.id} className="flex items-center justify-between p-6 bg-slate-900/50 rounded-xl border border-slate-700">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${platform.connected ? 'bg-teal-900/50 text-teal-400' : 'bg-slate-800 text-slate-500'
                                    }`}>
                                    {platform.name[0]}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">{platform.name}</h3>
                                    <p className="text-sm text-slate-400">
                                        {platform.connected ? `Connected as ${platform.account}` : 'Not connected'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleConnection(platform.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${platform.connected
                                    ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                    : 'bg-teal-600 text-white hover:bg-teal-500'
                                    }`}
                            >
                                {platform.connected ? 'Disconnect' : 'Connect'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlatformConfig;
