
import { useState } from 'react';

export interface Post {
    id: number;
    platform: string;
    content: string;
    image?: string | null;
    [key: string]: any;
}

interface PostEditorProps {
    post: Post;
    onSave: (updatedPost: Post) => void;
    onCancel: () => void;
}

const PostEditor = ({ post, onSave, onCancel }: PostEditorProps) => {
    const [content, setContent] = useState(post.content);

    const handleSave = () => {
        onSave({ ...post, content });
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl max-w-2xl w-full border border-slate-700 shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Edit Post</h3>
                    <button onClick={onCancel} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="p-6 flex gap-6">
                    {/* Preview Side */}
                    <div className="w-1/3 space-y-4">
                        <div className="aspect-square bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center">
                            {post.image ? (
                                <img src={post.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-4xl">📝</span>
                            )}
                        </div>
                        <div className="text-xs text-center text-slate-500">
                            Posting to <span className="text-slate-300 font-medium">{post.platform}</span>
                        </div>
                    </div>

                    {/* Edit Side */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Caption / Content</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={8}
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                            />
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostEditor;
