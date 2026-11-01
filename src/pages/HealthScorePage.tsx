import React from 'react';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  Award,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { useBusinessData } from '../context/BusinessDataContext';

export const HealthScorePage: React.FC = () => {
  const { healthScore, metrics, userPreferences, setActiveView } = useBusinessData();
  const { factors, totalScore, grade, status, recommendations } = healthScore;

  // Grade badge styling
  const gradeColors = {
    'A+': 'text-[#22C55E] bg-[#22C55E]/15 border-[#22C55E]/30',
    'A': 'text-[#22C55E] bg-[#22C55E]/15 border-[#22C55E]/30',
    'B+': 'text-[#22D3EE] bg-[#22D3EE]/15 border-[#22D3EE]/30',
    'B': 'text-[#22D3EE] bg-[#22D3EE]/15 border-[#22D3EE]/30',
    'C': 'text-[#F59E0B] bg-[#F59E0B]/15 border-[#F59E0B]/30',
    'D': 'text-[#EF4444] bg-[#EF4444]/15 border-[#EF4444]/30',
  };

  // SVG Gauge Calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (totalScore / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
              Business Health Score
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
              Vitality Audit
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Explainable 5-pillar composite index assessing resilience, consistency, and margin quality.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-[#94A3B8]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#22D3EE]" />
          <span>Operational index • Non-credit diagnostic</span>
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className="nova-card rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left z-10">
          {/* Circular SVG Gauge */}
          <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#scoreGrad)"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
            </svg>

            {/* Score inside circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-heading text-4xl font-bold text-white tracking-tight">
                {totalScore}
              </span>
              <span className="text-[11px] text-[#94A3B8] font-mono">/ 100</span>
            </div>
          </div>

          {/* Score Assessment */}
          <div className="space-y-2">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span
                className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                  gradeColors[grade] || 'text-white'
                }`}
              >
                Grade {grade}
              </span>
              <span className="text-xs font-medium text-[#22D3EE] font-mono">
                {status}
              </span>
            </div>

            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              {userPreferences.businessName} Vitality
            </h2>

            <p className="text-xs text-[#94A3B8] max-w-md leading-relaxed">
              Derived from 5 objective operational factors. Your enterprise exhibits healthy order retention and robust ticket sizes, with optimization potential in catalog diversification.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveView('nova-ai')}
          className="shrink-0 z-10 flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-xs font-semibold text-white shadow-lg shadow-[#8B5CF6]/25 hover:opacity-95 transition-all"
        >
          <span>Ask NOVA for Score Lift Actions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5 Explainable Factors Breakdown */}
      <div className="space-y-4">
        <h3 className="font-heading text-base font-bold text-white">
          Explainable Diagnostic Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(factors).map(([key, factor]) => {
            const pct = Math.round((factor.score / factor.max) * 100);

            return (
              <div key={key} className="nova-card rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white text-sm">{factor.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-white font-bold">{factor.score} / {factor.max} pts</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        factor.status === 'optimal'
                          ? 'bg-[#22C55E]/15 text-[#22C55E]'
                          : factor.status === 'good'
                          ? 'bg-[#22D3EE]/15 text-[#22D3EE]'
                          : 'bg-[#F59E0B]/15 text-[#F59E0B]'
                      }`}
                    >
                      {factor.status}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] rounded-full transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {factor.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations & Playbooks */}
      <div className="nova-card rounded-2xl p-6 space-y-4">
        <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[#22D3EE]" />
          <span>Prioritized Recommendations to Elevate Health Score</span>
        </h3>

        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3 text-xs"
            >
              <div className="w-6 h-6 rounded-lg bg-[#8B5CF6]/20 text-[#22D3EE] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-[#F8FAFC] leading-relaxed">
                {rec}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
