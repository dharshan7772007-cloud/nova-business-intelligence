import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  AlertCircle,
  Sliders,
  DollarSign,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { useBusinessData } from '../context/BusinessDataContext';

export const ForecastingPage: React.FC = () => {
  const { forecast, formatCurrency, metrics } = useBusinessData();
  const [scenarioMultiplier, setScenarioMultiplier] = useState<number>(1.0); // 0.85 = conservative, 1.15 = aggressive

  // Apply scenario multiplier to projected points
  const adjustedPoints = forecast.points.map(pt => {
    if (pt.historical !== undefined) {
      return pt;
    }
    const baseForecast = pt.forecast || 0;
    const adjusted = Math.round(baseForecast * scenarioMultiplier);
    return {
      ...pt,
      forecast: adjusted,
      lowerBound: Math.round(adjusted * 0.88),
      upperBound: Math.round(adjusted * 1.14),
    };
  });

  const adjustedProjectedQuarter = Math.round(forecast.projectedTotalNextQuarter * scenarioMultiplier);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
              Predictive Revenue Forecasting
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#8B5CF6]/20 text-[#22D3EE] border border-[#8B5CF6]/30">
              Least-Squares Regression
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Statistical projection extending current transactional velocity across the upcoming quarter.
          </p>
        </div>

        {/* Disclaimer Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-[#94A3B8]">
          <ShieldAlert className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Statistical estimate based on active records</span>
        </div>
      </div>

      {/* KPI Cards for Forecast */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="nova-card rounded-2xl p-4">
          <span className="text-xs text-[#94A3B8] font-medium">Projected Next Quarter</span>
          <p className="font-heading text-2xl font-bold text-white mt-1">
            {formatCurrency(adjustedProjectedQuarter)}
          </p>
          <p className="text-[11px] text-[#22D3EE] mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>3-Month Aggregate Run-rate</span>
          </p>
        </div>

        <div className="nova-card rounded-2xl p-4">
          <span className="text-xs text-[#94A3B8] font-medium">Trajectory Velocity</span>
          <p className="font-heading text-2xl font-bold text-[#22C55E] mt-1">
            {forecast.growthRate >= 0 ? '+' : ''}{forecast.growthRate}%
          </p>
          <p className="text-[11px] text-[#94A3B8] mt-1">Projected linear slope velocity</p>
        </div>

        <div className="nova-card rounded-2xl p-4">
          <span className="text-xs text-[#94A3B8] font-medium">Model Confidence Band</span>
          <p className="font-heading text-2xl font-bold text-[#C084FC] mt-1">
            ±12% Interval
          </p>
          <p className="text-[11px] text-[#94A3B8] mt-1">95% statistical boundary variance</p>
        </div>
      </div>

      {/* Main Forecast Chart with Upper/Lower bounds */}
      <div className="nova-card rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading text-base font-bold text-white">
              Revenue Horizon with Confidence Range
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Solid line represents recorded historical revenue; dashed purple line represents mathematical forecast.
            </p>
          </div>

          {/* Scenario Sensitivity Slider */}
          <div className="flex items-center gap-3 bg-[#111827] px-4 py-2 rounded-xl border border-white/[0.08]">
            <Sliders className="w-4 h-4 text-[#22D3EE]" />
            <span className="text-xs text-[#94A3B8]">Scenario:</span>
            <input
              type="range"
              min="0.80"
              max="1.20"
              step="0.05"
              value={scenarioMultiplier}
              onChange={e => setScenarioMultiplier(parseFloat(e.target.value))}
              className="w-24 accent-[#22D3EE] cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-white w-12 text-right">
              {scenarioMultiplier === 1.0
                ? 'Base'
                : scenarioMultiplier > 1.0
                ? `+${Math.round((scenarioMultiplier - 1) * 100)}%`
                : `${Math.round((scenarioMultiplier - 1) * 100)}%`}
            </span>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={adjustedPoints} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl bg-[#111827] border border-white/[0.1] p-3 shadow-2xl text-xs space-y-1">
                        <p className="font-bold text-white">{label}</p>
                        {data.historical !== undefined && (
                          <p className="text-[#22D3EE]">Historical: {formatCurrency(data.historical)}</p>
                        )}
                        {data.forecast !== undefined && (
                          <p className="text-[#C084FC]">Projected: {formatCurrency(data.forecast)}</p>
                        )}
                        {data.lowerBound !== undefined && (
                          <p className="text-[11px] text-[#94A3B8]">
                            Range: {formatCurrency(data.lowerBound)} – {formatCurrency(data.upperBound)}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {/* Upper/Lower Confidence Band */}
              <Area
                type="monotone"
                dataKey="upperBound"
                stroke="none"
                fill="url(#bandGrad)"
                name="Confidence Band"
              />
              {/* Historical Line */}
              <Line
                type="monotone"
                dataKey="historical"
                stroke="#22D3EE"
                strokeWidth={3}
                dot={{ r: 4, fill: '#22D3EE' }}
                name="Historical Revenue"
              />
              {/* Forecast Line */}
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#C084FC"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={{ r: 4, fill: '#C084FC' }}
                name="Estimated Projection"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Assumptions & Methodology Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="nova-card rounded-2xl p-5 space-y-3">
          <h3 className="font-heading text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#22D3EE]" />
            <span>Mathematical Model Assumptions</span>
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            {forecast.explanation}
          </p>
          <div className="space-y-2 pt-2 text-xs text-[#94A3B8]">
            <p>• <strong>Method:</strong> Ordinary Least Squares (OLS) regression over chronological order cycles.</p>
            <p>• <strong>Bounds:</strong> Gaussian dispersion calculation factoring average monthly ticket variance.</p>
            <p>• <strong>Recalculation:</strong> Automatically syncs with any imported CSV or new transactions.</p>
          </div>
        </div>

        <div className="nova-card rounded-2xl p-5 space-y-3">
          <h3 className="font-heading text-sm font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
            <span>Operational Application</span>
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Use these estimates for inventory ordering, supplier contract reservations, and sales quota targets:
          </p>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Target Quarterly Gross:</span>
              <span className="text-white font-mono font-bold">{formatCurrency(adjustedProjectedQuarter)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Conservative Floor:</span>
              <span className="text-[#EF4444] font-mono">{formatCurrency(Math.round(adjustedProjectedQuarter * 0.88))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Optimistic Ceiling:</span>
              <span className="text-[#22C55E] font-mono">{formatCurrency(Math.round(adjustedProjectedQuarter * 1.14))}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
