import { Outlet, Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import GlobalClientSelector from '../components/GlobalClientSelector';
import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    Library,
    CreditCard,
    Settings,
    LogOut,
    Bell
} from 'lucide-react';

const AgencyLayout = () => {
    const location = useLocation();

    const navItems = [
        { name: 'God Mode HQ', path: '/agency', icon: LayoutDashboard },
        { name: 'Client Directory', path: '/agency/clients', icon: Users },
        { name: 'Team & Ops', path: '/agency/team', icon: ShieldCheck },
        { name: 'Global Library', path: '/agency/library', icon: Library },
        { name: 'Financials', path: '/agency/financials', icon: CreditCard },
        { name: 'White Label', path: '/agency/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-slate-900 text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col z-20">
                <div className="p-6 flex items-center justify-center border-b border-slate-700">
                    <img src={logo} alt="Mansa Tina" className="h-10 object-contain" />
                </div>

                <div className="px-4 pt-4 mb-2">
                    <GlobalClientSelector />
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                                    ${isActive
                                        ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20'
                                        : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                                    }
                                `}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-700">
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                    <div className="mt-4 text-xs text-center text-slate-600">
                        v2.4.0 • Agency Pro
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 relative">
                {/* Top Header */}
                <header className="h-20 flex items-center justify-between px-8 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-10 border-b border-white/5">
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">
                            {navItems.find(i => i.path === location.pathname)?.name || 'Agency Dashboard'}
                        </h2>
                        <p className="text-sm text-slate-500">Welcome back, Managing Director</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold text-green-400">System Stable</span>
                        </div>
                        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
                        </button>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-gold to-brand-gold-dark border-2 border-slate-700 shadow-lg"></div>
                    </div>
                </header>

                <div className="p-8 pb-20 max-w-[1600px] mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AgencyLayout;
