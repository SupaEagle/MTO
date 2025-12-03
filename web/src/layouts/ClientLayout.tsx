import { Outlet, Link } from 'react-router-dom';

const ClientLayout = () => {
    return (
        <div className="flex h-screen bg-slate-900 text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
                <div className="p-6 border-b border-slate-700">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-600 bg-clip-text text-transparent">
                        Mansa Tina
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Client Workspace</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/client" className="block px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white">
                        Overview
                    </Link>
                    <Link to="/client/approval" className="block px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white">
                        Approval Loop
                    </Link>
                    <Link to="/client/calendar" className="block px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white">
                        Calendar
                    </Link>
                    <Link to="/client/inbox" className="block px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white">
                        Inbox
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-700">
                    <div className="bg-slate-700/50 p-3 rounded-lg">
                        <p className="text-xs text-slate-400 mb-1">Referral Status</p>
                        <div className="w-full bg-slate-600 h-2 rounded-full overflow-hidden">
                            <div className="bg-teal-500 h-full w-2/3"></div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 text-right">2/3 Months</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-slate-900">
                <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                    <h2 className="text-lg font-semibold text-slate-200">Overview</h2>
                    <div className="flex items-center gap-4">
                        <button className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 rounded-full text-sm font-medium transition-colors">
                            New Post
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-500"></div>
                    </div>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default ClientLayout;
