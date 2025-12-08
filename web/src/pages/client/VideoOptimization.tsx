const VideoOptimization = () => {
    return (
        <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-2">Video Optimization</h2>
                <p className="text-slate-400 mb-8">Turn long-form content into viral clips.</p>

                <div className="border-2 border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-teal-500 transition-colors cursor-pointer bg-slate-900/50">
                    <div className="text-4xl mb-4">📹</div>
                    <h3 className="text-lg font-bold text-white mb-2">Upload Video or Paste URL</h3>
                    <p className="text-sm text-slate-400">Supports MP4, MOV, or YouTube Links</p>
                    <button className="mt-6 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                        Select File
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4">Optimization Checklist</h3>
                    <ul className="space-y-3">
                        {[
                            'Add Captions (85% of video is watched on mute)',
                            'Create a "Hook" in the first 3 seconds',
                            'Optimize aspect ratio for 9:16 (Reels/TikTok)',
                            'Add trending audio',
                            'Include a clear Call to Action (CTA)'
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300">
                                <input type="checkbox" className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-teal-500 focus:ring-teal-500" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4">AI Clipper (Beta)</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Our AI analyzes your video to find the most engaging moments.
                    </p>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-700">
                                <div className="w-20 h-12 bg-slate-900 rounded"></div>
                                <div>
                                    <p className="text-sm font-medium text-white">Clip #{i}: The "Aha" Moment</p>
                                    <p className="text-xs text-slate-500">Duration: 0:45 • Viral Score: 92/100</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoOptimization;
