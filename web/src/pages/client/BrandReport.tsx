import { useState } from 'react';

const BrandReport = () => {
    return (
        <div className="space-y-6">
            <div className="glass-panel p-8 rounded-2xl">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Brand DNA Report</h2>
                    <p className="text-slate-400">Generate comprehensive strategic documents based on your Brand DNA inputs.</p>
                </div>

                <div className="space-y-8">
                    {/* Category 1: Strategic Alignment & Internal Culture */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Category 1: Strategic Alignment & Internal Culture</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ReportCard
                                number="1"
                                title='"Brand Bible" Manifest'
                                description="A comprehensive, design-ready PDF compiling the Mission, Vision, Core Values, and Origin Story into an employee handbook."
                            />
                            <ReportCard
                                number="2"
                                title='The Investor "One-Pager"'
                                description="A high-level summary condensing the Market Gap, USP, Business Model, and Growth Strategy into a single sheet for stakeholders or banks."
                            />
                            <ReportCard
                                number="3"
                                title='Visual Identity "Stress Test"'
                                description="A mock-up report showing the Primary/Secondary colors and Fonts applied to 5 different social templates to ensure they look good together."
                            />
                            <ReportCard
                                number="4"
                                title='"Values-First" Compliance Scan'
                                description="A report that cross-references Key Messages against the Ethical Guidelines to ensure no marketing claims violate the brand's social responsibility stance."
                            />
                        </div>
                    </div>

                    {/* Category 2: Audience & Psychology */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Category 2: Audience & Psychology (The "Nano Banana" Brain)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ReportCard
                                number="5"
                                title='"Misery to Miracle" Messaging Map'
                                description='A 2-column strategy document linking every specific "Customer Misery" (Fear/Pain) to a specific marketing hook and "Miracle" solution.'
                            />
                            <ReportCard
                                number="6"
                                title='Customer Empathy Profile'
                                description='A narrative "Day in the Life" story of the Ideal Client Avatar (ICA), derived from the Psychographics and Demographics data, helping copywriters "feel" the customer.'
                            />
                            <ReportCard
                                number="7"
                                title='The "Anti-Persona" Report'
                                description="A report defining exactly who the brand is NOT targeting (the opposite of the ICA) to help the sales team disqualify bad leads."
                            />
                            <ReportCard
                                number="8"
                                title='"Value Equation" Scorecard'
                                description="A quantitative analysis of your Offer, scoring it 1-10 on Dream Outcome, Likelihood of Achievement, Speed, and Effort."
                            />
                        </div>
                    </div>

                    {/* Category 3: Content Strategy & Execution */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-brand-gold border-b border-surface-border pb-2">Category 3: Content Strategy & Execution</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ReportCard
                                number="9"
                                title='The 90-Day Content Mix Roadmap'
                                description="A calendar visualization showing how the 4 Content Pillars will be balanced over the next quarter to hit the Posting Frequency Goal."
                            />
                            <ReportCard
                                number="10"
                                title='The "Hook Bank" Generator'
                                description='Generates 50 sample hooks (headlines) customized to the brand&apos;s "Hook Style Preference" (e.g., Shock vs. Question).'
                            />
                            <ReportCard
                                number="11"
                                title='Platform-Specific Voice Guide'
                                description='A manual showing how the "Brand Voice" should adapt for LinkedIn (Professional) vs. TikTok (Casual) while remaining consistent.'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReportCard = ({ number, title, description }: { number: string; title: string; description: string }) => {
    return (
        <div className="bg-surface-dark border border-brand-purple p-6 rounded-xl transition-colors group">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-card border border-surface-border text-brand-pink font-bold text-sm">
                        {number}
                    </span>
                    <h4 className="text-lg font-bold text-white group-hover:text-brand-purple transition-colors">{title}</h4>
                </div>
            </div>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {description}
            </p>
            <button className="w-full py-2 bg-surface-card hover:bg-brand-purple hover:text-white border border-surface-border hover:border-brand-purple text-slate-300 rounded-lg transition-all text-sm font-semibold">
                Generate Report
            </button>
        </div>
    );
};

export default BrandReport;
