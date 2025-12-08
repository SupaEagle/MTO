import React from "react";

const KeenPlexLanding: React.FC = () => {
    return (
        <div className="radix-page-bg text-slate-100 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
                {/* Top banner */}
                <div className="flex justify-center">
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 rounded-full border pill-gold px-3 py-1 text-xs sm:text-sm text-brand-gold shadow-sm hover:bg-brand-gold/25 transition"
                    >
                        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-brand-gold" />
                        <span className="font-medium text-brand-gold">New</span>
                        <span className="text-slate-200">AI-powered UI components</span>
                        <span className="hidden sm:inline text-brand-gold">→</span>
                    </a>
                </div>

                {/* Nav */}
                <header className="mt-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center text-xs font-bold shadow-lg shadow-brand-soft">
                            KP
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="font-semibold tracking-tight text-slate-50">
                                KeenPlex UI
                            </span>
                            <span className="text-[11px] text-slate-400">
                                AI-first component system
                            </span>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
                        <a href="#" className="hover:text-slate-50">
                            Features
                        </a>
                        <a href="#" className="hover:text-slate-50">
                            Components
                        </a>
                        <a href="#" className="hover:text-slate-50">
                            AI Employees
                        </a>
                        <a href="#" className="hover:text-slate-50">
                            Pricing
                        </a>
                        <span className="h-4 w-px bg-slate-700" />
                        <a href="#" className="hover:text-slate-50">
                            Docs
                        </a>
                        <a href="#" className="hover:text-slate-50">
                            Playground
                        </a>
                    </nav>

                    <div className="flex items-center gap-2">
                        <button className="hidden sm:inline-flex rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-brand-purple hover:text-slate-50">
                            Sign in
                        </button>
                        <button className="rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-3 py-1.5 text-xs font-medium text-white shadow-md shadow-brand-soft hover:opacity-95">
                            Get demo
                        </button>
                    </div>
                </header>

                {/* Main grid */}
                <main className="mt-12 lg:mt-16 grid gap-10 lg:gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
                    {/* Left: Hero */}
                    <section>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-50 leading-tight">
                            Ship bold,
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-purple to-brand-gold">
                                on-brand UIs
                            </span>
                            in days, not months.
                        </h1>

                        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl">
                            KeenPlex UI combines battle-tested primitives with your magenta–purple–gold palette,
                            so every screen feels custom-designed without the design-tax on your engineering team.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-5 py-2.5 text-sm font-medium text-white shadow-brand-soft hover:shadow-brand-strong hover:translate-y-[0.5px] transition">
                                Launch the playground
                            </button>
                            <button className="inline-flex items-center justify-center rounded-full border border-brand-gold/80 bg-black/20 px-5 py-2.5 text-sm font-medium text-brand-gold hover:bg-brand-gold/10">
                                View components
                            </button>
                        </div>

                        <p className="mt-3 text-xs text-slate-400">
                            TypeScript-native · Dark-mode first · Drop-in theming with your brand colors
                        </p>

                        {/* Code block */}
                        <div className="mt-8 rounded-2xl code-gradient p-4 sm:p-5 shadow-xl glass">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-brand-pink/90" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-brand-gold/90" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-brand-purple/90" />
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                                    keenplex-ui.tsx
                                </span>
                            </div>
                            <pre className="text-xs sm:text-sm text-slate-100 overflow-x-auto">
                                <code>{`import { Theme, Button } from "@keenplex/ui";

export function App() {
  return (
    <Theme
      appearance="dark"
      accentColor="magenta"
      brand={{
        primary: "#FF3EA5",
        secondary: "#9D4EDD",
        accent: "#FFD700",
        accentDeep: "#C5A000",
      }}
    >
      <Button variant="solid">
        Book an AI employee demo
      </Button>
    </Theme>
  );
}`}</code>
                            </pre>
                        </div>
                    </section>

                    {/* Right: Cards */}
                    <section className="space-y-4 sm:space-y-5">
                        {/* AI Employee card */}
                        <div className="glass rounded-2xl p-4 sm:p-5 shadow-xl">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h2 className="text-sm font-medium text-slate-100">
                                        AI employee status
                                    </h2>
                                    <p className="text-[11px] text-slate-400">
                                        Real-time calls, routed and logged automatically.
                                    </p>
                                </div>
                                <span className="inline-flex items-center gap-1 rounded-full bg-brand-pink/15 border border-brand-pink/40 px-2 py-1 text-[11px] text-brand-pink">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    Live
                                </span>
                            </div>
                            <ul className="space-y-2 text-xs text-slate-200">
                                <li className="flex items-center justify-between">
                                    <span className="flex flex-col">
                                        <span className="text-slate-200">Inbound calls</span>
                                        <span className="text-[11px] text-slate-400">Today</span>
                                    </span>
                                    <span className="text-sm font-semibold text-brand-gold">37</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="flex flex-col">
                                        <span className="text-slate-200">Booked appointments</span>
                                        <span className="text-[11px] text-slate-400">Conversion</span>
                                    </span>
                                    <span className="text-sm font-semibold text-emerald-400">62%</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="flex flex-col">
                                        <span className="text-slate-200">Missed human transfers</span>
                                        <span className="text-[11px] text-slate-400">Last 7 days</span>
                                    </span>
                                    <span className="text-sm font-semibold text-slate-400 line-through">
                                        14
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Brand tokens card */}
                        <div className="glass rounded-2xl p-4 sm:p-5 shadow-xl">
                            <h2 className="text-sm font-medium text-slate-100 mb-3">
                                Brand token preview
                            </h2>
                            <div className="grid grid-cols-4 gap-3 text-[11px]">
                                <div className="flex flex-col items-center gap-1">
                                    <span className="h-8 w-8 rounded-full bg-brand-pink shadow-brand-soft" />
                                    <span className="text-slate-300">Primary</span>
                                    <span className="text-[10px] text-slate-500">#FF3EA5</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="h-8 w-8 rounded-full bg-brand-purple shadow-brand-soft" />
                                    <span className="text-slate-300">Secondary</span>
                                    <span className="text-[10px] text-slate-500">#9D4EDD</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="h-8 w-8 rounded-full bg-brand-gold shadow-brand-soft" />
                                    <span className="text-slate-300">Accent</span>
                                    <span className="text-[10px] text-slate-500">#FFD700</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="h-8 w-8 rounded-full bg-brand-goldDeep shadow-brand-soft" />
                                    <span className="text-slate-300">Accent+</span>
                                    <span className="text-[10px] text-slate-500">#C5A000</span>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-300">
                                <span>Synced to Tailwind &amp; Radix tokens.</span>
                                <button className="rounded-full border border-slate-700 px-2 py-1 hover:border-brand-purple hover:text-slate-50">
                                    Copy theme.ts
                                </button>
                            </div>
                        </div>

                        {/* Pricing / CTA card */}
                        <div className="glass rounded-2xl p-4 sm:p-5 shadow-xl">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-sm font-medium text-slate-100">
                                    Plans for real businesses
                                </h2>
                                <span className="text-[11px] text-slate-400">
                                    No setup fee · Cancel anytime
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-xs">
                                <button className="rounded-xl border border-slate-700 bg-slate-900/70 px-2.5 py-2 text-left text-slate-200 hover:border-brand-purple/70">
                                    <div className="font-medium">Starter</div>
                                    <div className="text-[11px] text-slate-400">Free</div>
                                    <div className="mt-1 text-[11px] text-slate-400">1 AI employee</div>
                                </button>

                                <button className="rounded-xl border border-brand-pink/80 bg-brand-pink/15 px-2.5 py-2 text-left text-slate-50 shadow-brand-soft">
                                    <div className="font-medium">Growth</div>
                                    <div className="text-[11px] text-slate-100">$49 / mo</div>
                                    <div className="mt-1 text-[11px] text-slate-100">Up to 3 teams</div>
                                </button>

                                <button className="rounded-xl border border-brand-gold/80 bg-brand-gold/10 px-2.5 py-2 text-left text-brand-gold hover:bg-brand-gold/15">
                                    <div className="font-medium">Partners</div>
                                    <div className="text-[11px] text-brand-gold">Talk to us</div>
                                    <div className="mt-1 text-[11px] text-brand-gold">White-label</div>
                                </button>
                            </div>

                            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-300">
                                <div className="flex flex-col">
                                    <span>Average onboarding:</span>
                                    <span className="text-brand-gold">7–10 business days</span>
                                </div>
                                <button className="rounded-full bg-black/40 border border-slate-700 px-3 py-1.5 hover:border-brand-gold hover:text-brand-gold">
                                    Download pricing PDF
                                </button>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="mt-12 border-t border-slate-800/70 pt-6 text-xs text-slate-500 flex justify-between items-center flex-wrap gap-3">
                    <span>
                        Designed around your #FF3EA5 · #9D4EDD · #FFD700 · #C5A000 palette.
                    </span>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-slate-300">
                            GitHub
                        </a>
                        <a href="#" className="hover:text-slate-300">
                            Docs
                        </a>
                        <a href="#" className="hover:text-slate-300">
                            Status
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default KeenPlexLanding;
