import { useState } from 'react';
import PostEditor, { type Post } from '../../components/PostEditor';

// Mock Data
const MOCK_POSTS = [
    {
        id: 1,
        platform: 'Instagram',
        content: 'Did you know that 80% of businesses fail because they ignore their customer avatar? #marketing #business',
        image: 'https://via.placeholder.com/400',
        status: 'pending'
    },
    {
        id: 2,
        platform: 'LinkedIn',
        content: 'Leadership is not about being in charge. It is about taking care of those in your charge. Here are 3 ways to lead better...',
        image: null,
        status: 'pending'
    },
    {
        id: 3,
        platform: 'Twitter',
        content: 'Stop overthinking your content strategy. Just start. 🚀',
        image: null,
        status: 'pending'
    }
];

const ApprovalLoop = () => {
    const [posts] = useState(MOCK_POSTS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    const currentPost = posts[currentIndex];

    const handleSaveEdit = (updatedPost: Post) => {
        console.log('Saved post:', updatedPost);
        // TODO: Update local state or Firestore
        setIsEditing(false);
    };

    const handleApprove = () => {
        // TODO: Update status in Firestore
        console.log('Approved post:', currentPost.id);
        nextPost();
    };

    const handleReject = () => {
        // TODO: Update status in Firestore or open edit modal
        console.log('Rejected post:', currentPost.id);
        nextPost();
    };

    const nextPost = () => {
        if (currentIndex < posts.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            alert('All caught up! Great job.');
        }
    };

    if (!currentPost) return <div className="text-white">No pending posts.</div>;

    return (
        <div className="max-w-2xl mx-auto h-[calc(100vh-140px)] flex flex-col justify-center">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-white">Approval Loop</h1>
                <p className="text-teal-200">Swipe right to approve, left to revise.</p>
            </div>

            {/* Card */}
            <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 relative flex-1 flex flex-col">
                <div className="absolute top-4 right-4 px-3 py-1 bg-slate-900/80 rounded-full text-xs font-medium text-white border border-slate-600">
                    {currentPost.platform}
                </div>

                {currentPost.image ? (
                    <div className="h-64 bg-slate-700 flex items-center justify-center overflow-hidden">
                        <img src={currentPost.image} alt="Post visual" className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className="h-32 bg-slate-700 flex items-center justify-center">
                        <span className="text-slate-400 text-sm">Text Only Post</span>
                    </div>
                )}

                <div className="p-8 flex-1 flex flex-col">
                    <p className="text-lg text-slate-200 leading-relaxed whitespace-pre-wrap flex-1">
                        {currentPost.content}
                    </p>

                    <div className="mt-8 flex items-center justify-center gap-8">
                        <button
                            onClick={handleReject}
                            className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors text-sm font-medium"
                        >
                            Edit
                        </button>

                        <button
                            onClick={handleApprove}
                            className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all transform hover:scale-110"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-center mt-6 text-slate-500 text-sm">
                {posts.length - currentIndex} posts remaining
            </div>

            {isEditing && (
                <PostEditor
                    post={currentPost}
                    onSave={handleSaveEdit}
                    onCancel={() => setIsEditing(false)}
                />
            )}
        </div>
    );
};

export default ApprovalLoop;
