import { Outlet, Link } from 'react-router-dom';

const AgencyLayout = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        Mansa Tina
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">Agency Command Center</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/agency" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white">
                        Dashboard
                    </Link>
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
