import { useState } from 'react';

const Calendar = () => {
    const [currentDate] = useState(new Date());

    // Mock scheduled posts
    const scheduledPosts = [
        { id: 1, date: 5, title: 'Product Launch', platform: 'Instagram', type: 'image' },
        { id: 2, date: 8, title: 'Weekly Tips', platform: 'LinkedIn', type: 'text' },
        { id: 3, date: 12, title: 'Customer Story', platform: 'Twitter', type: 'text' },
        { id: 4, date: 15, title: 'Behind the Scenes', type: 'video', platform: 'TikTok' },
        { id: 5, date: 22, title: 'Promo Offer', platform: 'Instagram', type: 'image' },
    ];

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-white">Content Calendar</h1>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700">Previous</button>
                    <button className="px-4 py-2 bg-slate-800 text-white font-medium rounded-lg">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</button>
                    <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700">Next</button>
                </div>
            </div>

            <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col">
                {/* Days Header */}
                <div className="grid grid-cols-7 border-b border-slate-700 bg-slate-900/50">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-4 text-center text-sm font-medium text-slate-400">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                    {emptyDays.map(i => (
                        <div key={`empty-${i}`} className="bg-slate-800/50 border-b border-r border-slate-700/50"></div>
                    ))}

                    {days.map(day => {
                        const postsForDay = scheduledPosts.filter(p => p.date === day);
                        return (
                            <div key={day} className="border-b border-r border-slate-700/50 p-2 min-h-[100px] relative group hover:bg-slate-700/30 transition-colors">
                                <span className={`text-sm ${postsForDay.length > 0 ? 'text-white font-bold' : 'text-slate-500'}`}>
                                    {day}
                                </span>
                                <div className="mt-2 space-y-1">
                                    {postsForDay.map(post => (
                                        <div
                                            key={post.id}
                                            className={`text-xs p-1.5 rounded truncate cursor-pointer hover:opacity-80 ${post.platform === 'Instagram' ? 'bg-pink-500/20 text-pink-300' :
                                                    post.platform === 'LinkedIn' ? 'bg-blue-500/20 text-blue-300' :
                                                        post.platform === 'TikTok' ? 'bg-purple-500/20 text-purple-300' :
                                                            'bg-slate-600 text-slate-300'
                                                }`}
                                        >
                                            {post.title}
                                        </div>
                                    ))}
                                </div>
                                <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-600 rounded text-slate-400 hover:text-white transition-all">
                                    +
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
