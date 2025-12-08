
import { Outlet, Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const ClientLayout = () => {
    const location = useLocation();

    const navSections = [
        {
            title: 'Strategy',
            icon: '🎯',
            items: [
                { title: 'Brand Voice', path: '/client/strategy/voice' },
                { title: 'Value Prop', path: '/client/strategy/value-prop' },
                { title: 'Scaling & Focus', path: '/client/strategy/scaling' },
            ]
        },
        {
            title: 'Content',
            icon: '🎨',
            items: [
                { title: 'AI Wizard', path: '/client/content-wizard' },
                { title: 'Visual Assets', path: '/client/creative/visuals' },
                { title: 'Video Tools', path: '/client/creative/video' },
                { title: 'Swipe File', path: '/client/creative/swipe' },
                { title: 'Calendar', path: '/client/calendar' },
                { title: 'Inbox', path: '/client/inbox' },
                { title: 'Platforms', path: '/client/engagement/platforms' },
                { title: 'Automation', path: '/client/engagement/automation' },
            ]
        },
        {
            title: 'Growth',
            icon: '📈',
            items: [
                { title: 'Funnel Analysis', path: '/client/analytics/funnel' },
                { title: 'Competitor Spy', path: '/client/analytics/competitors' },
            ]
        },
        {
            title: 'Paid Media',
            icon: '💸',
            items: [
                { title: 'Campaign Builder', path: '/client/ads/campaigns' },
                { title: 'Budget Optimizer', path: '/client/ads/budget' },
            ]
        },
        {
            title: 'Sales',
            icon: '🤝',
            items: [
                { title: 'CRM Pipeline', path: '/client/crm' },
            ]
        },
        {
            title: 'Account',
            icon: '⚙️',
            items: [
                { title: 'Team', path: '/client/settings/team' },
                { title: 'Support', path: '/client/support' },
            ]
        }
    ];

    return (
        <div className="flex h-screen bg-surface-dark text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-20 lg:w-64 bg-surface-card border-r border-surface-border flex flex-col z-50 transition-all duration-300">
                <div className="h-20 flex items-center justify-center border-b border-surface-border">
                    <img src={logo} alt="Mansa Tina" className="h-10 object-contain" />
                </div>

                <nav className="flex-1 py-6 space-y-2 overflow-visible">
                    {/* Overview - Single Link */}
                    <div className="px-3">
                        <Link
                            to="/client"
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${location.pathname === '/client'
                                    ? 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20 shadow-[0_0_15px_rgba(157,78,221,0.15)]'
                                    : 'hover:bg-surface-hover text-slate-400 hover:text-white'
                                }`}
                        >
                            <span className="text-xl">🏠</span>
                            <span className="font-medium hidden lg:block">Overview</span>

                            {/* Tooltip for collapsed state */}
                            <div className="absolute left-16 lg:hidden ml-2 px-2 py-1 bg-surface-card border border-surface-border text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                                Overview
                            </div>
                        </Link>
                    </div>

                    {/* Sections with Flyouts */}
                    {navSections.map((section) => (
                        <div key={section.title} className="px-3 relative group">
                            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-surface-hover transition-colors text-slate-400 hover:text-white group-hover:text-white">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{section.icon}</span>
                                    <span className="font-medium hidden lg:block">{section.title}</span>
                                </div>
                                <span className="text-xs opacity-0 lg:opacity-50 group-hover:opacity-100 transition-opacity text-brand-gold">▶</span>
                            </button>

                            {/* Flyout Menu */}
                            <div className="absolute left-[calc(100%-0.5rem)] top-0 w-56 bg-surface-card border border-surface-border rounded-xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-x-2 group-hover:translate-x-4 z-50">
                                <div className="px-3 py-2 border-b border-surface-border mb-2">
                                    <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">{section.title}</span>
                                </div>
                                <div className="space-y-1">
                                    {section.items.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${location.pathname === item.path
                                                    ? 'bg-brand-pink/10 text-brand-pink'
                                                    : 'text-slate-300 hover:bg-surface-hover hover:text-white'
                                                }`}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-surface-border bg-surface-card">
                    <div className="bg-surface-dark p-4 rounded-xl border border-surface-border">
                        <div className="flex justify-between items-end mb-2">
                            <p className="text-xs font-bold text-slate-400">Referral Status</p>
                            <p className="text-xs font-bold text-brand-gold">66%</p>
                        </div>
                        <div className="w-full bg-surface-hover h-1.5 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-brand-gold to-brand-gold-dark h-full w-2/3 shadow-[0_0_10px_rgba(255,215,0,0.3)]"></div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-surface-dark relative z-0">
                <header className="h-20 border-b border-surface-border flex items-center justify-between px-8 bg-surface-dark/80 backdrop-blur-xl sticky top-0 z-40">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            {navSections.flatMap(s => s.items).find(i => i.path === location.pathname)?.title || 'Overview'}
                        </h2>
                        <p className="text-sm text-slate-400">Welcome back, Sarah</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="px-5 py-2.5 bg-gradient-to-r from-brand-pink to-brand-purple hover:from-brand-pink/90 hover:to-brand-purple/90 rounded-lg text-sm font-bold text-white shadow-lg shadow-brand-purple/20 transition-all hover:scale-105 active:scale-95 border border-white/10">
                            + New Post
                        </button>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-gold to-brand-gold-dark border-2 border-surface-card shadow-lg"></div>
                    </div>
                </header>
                <div className="p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default ClientLayout;
