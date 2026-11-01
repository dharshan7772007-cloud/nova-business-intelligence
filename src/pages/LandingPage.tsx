import React from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  Activity,
  AlertOctagon,
  ShieldCheck,
  Zap,
  BarChart3,
  Layers,
  ChevronRight,
  CheckCircle2,
  Lock,
  Cpu,
  Database,
  LineChart
} from 'lucide-react';
import { useBusinessData } from '../context/BusinessDataContext';
import { HeroDataSphere } from '../components/three/HeroDataSphere';

export const LandingPage: React.FC = () => {
  const { setActiveView, loginDemoUser } = useBusinessData();

  const handleLaunchDashboard = () => {
    loginDemoUser();
    setActiveView('overview');
  };

  const handleLaunchAI = () => {
    loginDemoUser();
    setActiveView('nova-ai');
  };

  return (
    <div className="min-h-screen bg-[#080B14] text-[#F8FAFC] selection:bg-[#8B5CF6]/30 selection:text-[#22D3EE] overflow-x-hidden">
      {/* Background radial gradients for cinematic depth */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#8B5CF6]/15 via-[#22D3EE]/5 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-[800px] right-0 w-[600px] h-[600px] bg-[#8B5CF6]/10 blur-[120px] rounded-full" />
        <div className="absolute top-[1600px] left-0 w-[600px] h-[600px] bg-[#22D3EE]/8 blur-[140px] rounded-full" />
      </div>

      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#080B14]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#6366F1] to-[#22D3EE] p-[1.5px] shadow-lg shadow-[#8B5CF6]/25">
              <div className="h-full w-full bg-[#080B14] rounded-[10px] flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>
            </div>
            <div>
              <span className="font-heading text-xl font-bold tracking-wider text-white">
                NOVA
              </span>
              <span className="ml-1 text-[10px] font-mono text-[#22D3EE] uppercase tracking-widest">
                BI
              </span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#94A3B8]">
            <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#intelligence" className="hover:text-white transition-colors">NOVA Intelligence</a>
            <a href="#forecasting" className="hover:text-white transition-colors">Forecasting</a>
            <a href="#health-score" className="hover:text-white transition-colors">Health Score</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLaunchDashboard}
              className="px-4 py-2 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white transition-colors"
            >
              Demo Sign In
            </button>
            <button
              type="button"
              onClick={handleLaunchDashboard}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] hover:opacity-95 text-xs font-semibold text-white shadow-lg shadow-[#8B5CF6]/25 transition-all"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with 3D Data Sphere */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-[#8B5CF6]/30 text-xs text-[#22D3EE] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span className="font-medium">Next-Generation AI Business Intelligence</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="text-[#94A3B8]">v2.4 Live</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                See Beyond <br />
                <span className="text-gradient">Your Numbers.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#94A3B8] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                NOVA transforms fragmented spreadsheets into predictive clarity. Upload your business data to immediately uncover revenue momentum, detect hidden operational anomalies, and receive autonomous strategic counsel.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  type="button"
                  onClick={handleLaunchDashboard}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-sm font-semibold text-white shadow-xl shadow-[#8B5CF6]/25 hover:shadow-[#22D3EE]/30 transition-all group"
                >
                  <span>Launch Live Platform</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={handleLaunchAI}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#151C2C] hover:bg-[#1E273C] border border-white/[0.1] text-sm font-medium text-white transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-[#22D3EE]" />
                  <span>Discover Intelligence</span>
                </button>
              </div>

              {/* Feature pills */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#94A3B8]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>Real CSV Schema Mapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>Explainable Math Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>No Fake Data or Hallucinations</span>
                </div>
              </div>
            </div>

            {/* Right 3D Visual */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-[500px] h-[440px] rounded-3xl bg-gradient-to-b from-[#151C2C]/60 to-[#080B14]/80 border border-white/[0.08] shadow-2xl p-2 overflow-hidden flex flex-col justify-between">
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-[#080B14]/80 backdrop-blur-md border border-white/[0.08] text-[11px] text-[#22D3EE]">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Interactive 3D Data Lattice</span>
                </div>

                <HeroDataSphere className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trusted Insights Banner */}
      <section className="border-y border-white/[0.06] bg-[#111827]/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold tracking-wider text-[#94A3B8] uppercase mb-8">
            Engineered for Modern Small Businesses, SaaS, and High-Growth Commerce
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-heading text-3xl font-bold text-white">$4.2M+</p>
              <p className="text-xs text-[#94A3B8] mt-1">Processed Pipeline Value</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-bold text-[#22D3EE]">100%</p>
              <p className="text-xs text-[#94A3B8] mt-1">Transparent Math Logic</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-bold text-[#8B5CF6]">5-Factor</p>
              <p className="text-xs text-[#94A3B8] mt-1">Holistic Health Score</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-bold text-[#22C55E]">&lt; 300ms</p>
              <p className="text-xs text-[#94A3B8] mt-1">Instant In-Memory Ingestion</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Platform Capabilities */}
      <section id="capabilities" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold text-[#22D3EE] tracking-widest uppercase">
              Core Architecture
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Autonomous Intelligence Built on Measured Truth
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              NOVA avoids black-box guessing. Every chart, anomaly alert, and AI answer stems directly from mathematical formulas evaluated on your actual business records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Capability 1 */}
            <div className="p-6 rounded-2xl bg-[#151C2C] border border-white/[0.06] hover:border-[#8B5CF6]/40 transition-all shadow-lg hover:shadow-purple-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#22D3EE] mb-5 group-hover:scale-105 transition-transform">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">CSV Data Pipeline</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Drag and drop raw exports from Stripe, QuickBooks, Shopify, or custom ERPs. Intelligent schema detection matches columns with instant data validation.
              </p>
            </div>

            {/* Capability 2 */}
            <div className="p-6 rounded-2xl bg-[#151C2C] border border-white/[0.06] hover:border-[#22D3EE]/40 transition-all shadow-lg hover:shadow-cyan-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/15 border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] mb-5 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">Linear & Rolling Forecasts</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Project the next 3 months with statistical least-squares regression and dynamic confidence intervals. Understand future capacity and cash flow needs.
              </p>
            </div>

            {/* Capability 3 */}
            <div className="p-6 rounded-2xl bg-[#151C2C] border border-white/[0.06] hover:border-[#8B5CF6]/40 transition-all shadow-lg hover:shadow-purple-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#C084FC] mb-5 group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">5-Factor Health Score</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                A definitive business vitality score (0-100) weighting revenue momentum, order consistency, customer retention, AOV quality, and product balance.
              </p>
            </div>

            {/* Capability 4 */}
            <div className="p-6 rounded-2xl bg-[#151C2C] border border-white/[0.06] hover:border-[#EF4444]/40 transition-all shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444] mb-5 group-hover:scale-105 transition-transform">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">Smart Anomaly Detection</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Autonomous scans pinpoint sudden revenue contractions, catalog concentration risks, and outlier transaction spikes before they harm operational stability.
              </p>
            </div>

            {/* Capability 5 */}
            <div className="p-6 rounded-2xl bg-[#151C2C] border border-white/[0.06] hover:border-[#22D3EE]/40 transition-all shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/15 border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] mb-5 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">NOVA AI Business Analyst</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Ask conversational questions in plain English. Receive calculated metrics, root cause driver analyses, and tailored commercial recommendations.
              </p>
            </div>

            {/* Capability 6 */}
            <div className="p-6 rounded-2xl bg-[#151C2C] border border-white/[0.06] hover:border-white/20 transition-all shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white mb-5 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">Executive Reporting</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Generate clean, investor-ready executive summaries with one click. Export formatted CSV schedules or print-ready briefing documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NOVA Intelligence Showcase */}
      <section id="intelligence" className="py-20 bg-[#111827]/30 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-xs text-[#22D3EE]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flagship Analytical Innovation</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight">
                An AI Analyst That Works with Your Actual Data
              </h2>

              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                General AI chatbots generate fictional statistics because they lack real context. NOVA reads your exact transaction dataset, runs mathematical regressions, and delivers factual answers with verifiable drivers.
              </p>

              <div className="space-y-3 text-xs text-[#94A3B8]">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  <span><strong>Zero Hallucinations:</strong> Every number quoted is traced to your database.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  <span><strong>Root-Cause Attribution:</strong> Explains *why* revenue changed, not just what happened.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  <span><strong>Actionable Next Steps:</strong> Concrete commercial playbooks to improve sales.</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLaunchAI}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-xs font-semibold text-white shadow-lg shadow-[#8B5CF6]/20 hover:opacity-95 transition-opacity"
              >
                <span>Try Suggested Questions in AI Workspace</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated AI Chat Mockup */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#151C2C] border border-[#8B5CF6]/30 shadow-2xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                    <span className="text-xs font-semibold text-white">NOVA Intelligence Engine</span>
                  </div>
                  <span className="text-[10px] text-[#22D3EE] font-mono">CALCULATING REAL-TIME</span>
                </div>

                {/* User Prompt */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 px-4 py-2.5 text-xs text-white">
                    "Which product performs best and what actions should I take to improve sales?"
                  </div>
                </div>

                {/* AI Response Card */}
                <div className="rounded-xl bg-[#111827] border border-white/[0.08] p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#22D3EE]" />
                    <h4 className="text-xs font-bold text-white">Top Revenue Generator: Apex Quantum Server</h4>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Apex Quantum Server generated <strong className="text-white">$37,800</strong> across 9 recorded units (average selling price $4,200), driving 38% of your gross sales volume.
                  </p>
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/[0.06] text-center">
                    <div>
                      <p className="text-[10px] text-[#94A3B8]">Catalog Share</p>
                      <p className="text-xs font-bold text-[#22D3EE]">38%</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#94A3B8]">Units Sold</p>
                      <p className="text-xs font-bold text-white">9 Units</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#94A3B8]">Gross Contribution</p>
                      <p className="text-xs font-bold text-[#22C55E]">$37,800</p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[11px] text-[#C084FC]">
                    💡 <strong>Commercial Action:</strong> Bundle with high-margin accessories like Titan Fiber Bridge to lift AOV by an estimated 14%.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Sample Pricing Plans */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold text-[#22D3EE] tracking-widest uppercase">
              Transparent Pricing
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Predictable Plans for Every Stage of Growth
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Portfolio concept demonstration. All tier features are fully accessible in this prototype.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <div className="rounded-2xl bg-[#151C2C] border border-white/[0.08] p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-white">Starter</h3>
                <p className="text-xs text-[#94A3B8] mt-1">For single store owners and freelancers</p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-bold text-white">$29</span>
                  <span className="text-xs text-[#94A3B8]"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-[#94A3B8]">
                  <li className="flex items-center gap-2">✓ Up to 1,000 monthly transactions</li>
                  <li className="flex items-center gap-2">✓ Standard CSV Ingestion</li>
                  <li className="flex items-center gap-2">✓ Overview & Analytics Dashboards</li>
                  <li className="flex items-center gap-2">✓ 3-Factor Health Score</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={handleLaunchDashboard}
                className="mt-8 w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white transition-colors"
              >
                Launch Starter Demo
              </button>
            </div>

            {/* Plan 2 - Highlighted */}
            <div className="relative rounded-2xl bg-[#151C2C] border-2 border-[#8B5CF6] p-6 flex flex-col justify-between shadow-2xl shadow-[#8B5CF6]/15">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[10px] font-bold text-white uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white">Growth Pro</h3>
                <p className="text-xs text-[#94A3B8] mt-1">For fast-scaling online & B2B brands</p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-bold text-white">$79</span>
                  <span className="text-xs text-[#94A3B8]"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-[#94A3B8]">
                  <li className="flex items-center gap-2">✓ Unlimited transactions</li>
                  <li className="flex items-center gap-2">✓ Full CSV Mapping Pipeline</li>
                  <li className="flex items-center gap-2">✓ 3-Month Linear Forecasting</li>
                  <li className="flex items-center gap-2">✓ 5-Factor Business Health Score</li>
                  <li className="flex items-center gap-2">✓ Smart Anomaly Detection</li>
                  <li className="flex items-center gap-2">✓ NOVA AI Business Analyst</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={handleLaunchDashboard}
                className="mt-8 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-xs font-semibold text-white shadow-lg shadow-[#8B5CF6]/25 hover:opacity-95 transition-opacity"
              >
                Access Growth Pro Experience
              </button>
            </div>

            {/* Plan 3 */}
            <div className="rounded-2xl bg-[#151C2C] border border-white/[0.08] p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-white">Enterprise Scale</h3>
                <p className="text-xs text-[#94A3B8] mt-1">For multi-entity holding firms</p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-bold text-white">$199</span>
                  <span className="text-xs text-[#94A3B8]"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-[#94A3B8]">
                  <li className="flex items-center gap-2">✓ Multi-workspace consolidation</li>
                  <li className="flex items-center gap-2">✓ Automated API connectors</li>
                  <li className="flex items-center gap-2">✓ Custom regression models</li>
                  <li className="flex items-center gap-2">✓ Dedicated SLA & account audit</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={handleLaunchDashboard}
                className="mt-8 w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white transition-colors"
              >
                Explore Enterprise Features
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#151C2C] via-[#1E273C] to-[#151C2C] border border-[#8B5CF6]/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Ready to See Beyond Your Numbers?
            </h2>
            <p className="text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
              Explore the entire NOVA platform instantly with pre-loaded enterprise data, or import your own CSV transactions to see real-time updates.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleLaunchDashboard}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-sm font-semibold text-white shadow-xl shadow-[#8B5CF6]/25 hover:opacity-95 transition-opacity"
              >
                Explore Live Dashboard
              </button>
              <button
                type="button"
                onClick={() => {
                  loginDemoUser();
                  setActiveView('csv-import');
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-sm font-medium text-white transition-colors"
              >
                Test CSV Ingestion
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="border-t border-white/[0.06] bg-[#080B14] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] p-[1.5px]">
                <div className="h-full w-full bg-[#080B14] rounded-[6.5px] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6]" />
                </div>
              </div>
              <span className="font-heading text-base font-bold text-white">NOVA</span>
              <span className="text-xs text-[#94A3B8]">| D7 Studio Portfolio Project</span>
            </div>

            <div className="text-xs text-[#94A3B8] text-center md:text-right space-y-1">
              <p>© 2026 NOVA AI Business Intelligence. Fictional demo architecture.</p>
              <p className="text-[11px] text-[#94A3B8]/60">Data is processed client-side with optional server-side inference proxy.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
