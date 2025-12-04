import { useState } from 'react';

const MOCK_CONVERSATIONS = [
    {
        id: 1,
        user: 'Sarah Jenkins',
        platform: 'Instagram',
        avatar: 'https://via.placeholder.com/150',
        lastMessage: 'Love this product! When will it be back in stock?',
        time: '2m ago',
        unread: true,
    },
    {
        id: 2,
        user: 'Mike Ross',
        platform: 'LinkedIn',
        avatar: null,
        lastMessage: 'Great insights on the latest post. Would love to connect.',
        time: '1h ago',
        unread: false,
    },
    {
        id: 3,
        user: 'TechDaily',
        platform: 'Twitter',
        avatar: null,
        lastMessage: 'Can we feature this on our blog?',
        time: '3h ago',
        unread: false,
    },
];

const MOCK_MESSAGES = [
    { id: 1, sender: 'user', text: 'Love this product! When will it be back in stock?', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Hi Sarah! We are restocking next Tuesday. Stay tuned!', time: '10:35 AM' },
];

const Inbox = () => {
    const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
    const [reply, setReply] = useState('');

    const activeChat = MOCK_CONVERSATIONS.find(c => c.id === selectedConversation);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sending reply:', reply);
        setReply('');
        // TODO: Send to Firestore/API
    };

    return (
        <div className="h-[calc(100vh-100px)] flex bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            {/* Sidebar List */}
            <div className="w-1/3 border-r border-slate-700 flex flex-col">
                <div className="p-4 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white mb-4">Inbox</h2>
                    <div className="flex gap-2">
                        <button className="flex-1 py-1.5 bg-slate-700 text-white rounded text-sm font-medium">All</button>
                        <button className="flex-1 py-1.5 hover:bg-slate-700 text-slate-400 hover:text-white rounded text-sm font-medium transition-colors">Unread</button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {MOCK_CONVERSATIONS.map((conv) => (
                        <div
                            key={conv.id}
                            onClick={() => setSelectedConversation(conv.id)}
                            className={`p-4 border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/30 transition-colors ${selectedConversation === conv.id ? 'bg-slate-700/50' : ''
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-600 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                    {conv.avatar ? (
                                        <img src={conv.avatar} alt={conv.user} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-slate-300 font-bold">{conv.user[0]}</span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className={`text-sm font-medium truncate ${conv.unread ? 'text-white' : 'text-slate-300'}`}>
                                            {conv.user}
                                        </h3>
                                        <span className="text-xs text-slate-500">{conv.time}</span>
                                    </div>
                                    <p className={`text-sm truncate ${conv.unread ? 'text-slate-200 font-medium' : 'text-slate-500'}`}>
                                        {conv.lastMessage}
                                    </p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${conv.platform === 'Instagram' ? 'border-pink-500/30 text-pink-400' :
                                                conv.platform === 'LinkedIn' ? 'border-blue-500/30 text-blue-400' :
                                                    'border-sky-500/30 text-sky-400'
                                            }`}>
                                            {conv.platform}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-900/50">
                {activeChat ? (
                    <>
                        {/* Header */}
                        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800">
                            <div className="flex items-center gap-3">
                                <h3 className="font-bold text-white">{activeChat.user}</h3>
                                <span className="text-xs text-slate-400">via {activeChat.platform}</span>
                            </div>
                            <button className="text-slate-400 hover:text-white">
                                ⋮
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-6">
                            {MOCK_MESSAGES.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${msg.sender === 'me'
                                            ? 'bg-teal-600 text-white rounded-br-none'
                                            : 'bg-slate-700 text-slate-200 rounded-bl-none'
                                        }`}>
                                        <p className="text-sm">{msg.text}</p>
                                        <span className={`text-[10px] block mt-1 ${msg.sender === 'me' ? 'text-teal-200' : 'text-slate-400'
                                            }`}>
                                            {msg.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-slate-800 border-t border-slate-700">
                            <form onSubmit={handleSend} className="flex gap-4">
                                <input
                                    type="text"
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    placeholder="Type a reply..."
                                    className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={!reply.trim()}
                                    className="px-6 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-500">
                        Select a conversation to start chatting
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inbox;
