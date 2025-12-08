import { Outlet, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import GlobalClientSelector from '../components/GlobalClientSelector';

const AgencyLayout = () => {
    return (
        <div className="flex h-screen bg-slate-900 text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
                <div className="p-6 flex items-center justify-center border-b border-slate-700">
                    <img src={logo} alt="Mansa Tina" className="h-12 object-contain" />
                </div>

                <div className="px-4 pt-4">
                    <GlobalClientSelector />
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/agency" className="block px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white">
                        Global Dashboard
                    </Link>
                    <Link to="/agency/manager" className="block px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white">
                        Manager Workspace
                    </Link>
                    <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Strategy
                    </div>
                    <Link to="/agency/clients" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white">
                        Clients
                    </Link>
                    <Link to="/agency/strategy" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white">
                        Strategy Engine
                    </Link>
                    <Link to="/agency/content" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white">
                        Content Studio
                    </Link>
                    <Link to="/agency/analytics" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white">
                        Analytics
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors">
                        Settings
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gray-900">
                <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
                    <h2 className="text-lg font-semibold text-gray-200">Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500"></div>
                    </div>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AgencyLayout;
