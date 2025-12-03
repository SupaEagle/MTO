import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<'agency' | 'client'>('agency');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login
        if (mode === 'agency') {
            navigate('/agency');
        } else {
            navigate('/client');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
                            Mansa Tina
                        </h1>
                        <p className="text-gray-400">Sign in to your account</p>
                    </div>

                    <div className="flex bg-gray-700 rounded-lg p-1 mb-6">
                        <button
                            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${mode === 'agency'
                                    ? 'bg-gray-600 text-white shadow-sm'
                                    : 'text-gray-400 hover:text-gray-200'
                                }`}
                            onClick={() => setMode('agency')}
                        >
                            Agency
                        </button>
                        <button
                            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${mode === 'client'
                                    ? 'bg-gray-600 text-white shadow-sm'
                                    : 'text-gray-400 hover:text-gray-200'
                                }`}
                            onClick={() => setMode('client')}
                        >
                            Client
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all ${mode === 'agency'
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'
                                    : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500'
                                }`}
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
