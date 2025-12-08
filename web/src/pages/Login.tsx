import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Login = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<'agency' | 'client'>('agency');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual Firebase login
        // try {
        //   await signInWithEmailAndPassword(auth, email, password);
        //   if (mode === 'agency') navigate('/agency');
        //   else navigate('/client');
        // } catch (error) {
        //   console.error(error);
        // }

        // For now, simulate login
        if (mode === 'agency') {
            navigate('/agency');
        } else {
            navigate('/client');
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${mode === 'agency' ? 'bg-slate-900' : 'bg-slate-900'
            }`}>
            <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Mansa Tina Ops" className="h-24 object-contain" />
                </div>

                <div className="flex bg-slate-700 p-1 rounded-lg mb-8">
                    <button
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${mode === 'agency'
                            ? 'bg-slate-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white'
                            }`}
                        onClick={() => setMode('agency')}
                    >
                        Agency
                    </button>
                    <button
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${mode === 'client'
                            ? 'bg-teal-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white'
                            }`}
                        onClick={() => setMode('client')}
                    >
                        Client
                    </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            placeholder="name@company.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg font-bold text-white transition-all transform hover:scale-[1.02] ${mode === 'agency'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'
                            : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400'
                            }`}
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
                        Forgot your password?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
