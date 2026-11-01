import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Info,
  CheckCircle2,
  ShieldCheck,
  Search,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Layers
} from 'lucide-react';
import { useBusinessData } from '../context/BusinessDataContext';

export const AnomaliesPage: React.FC = () => {
  const { anomalies, filteredTransactions, setActiveView } = useBusinessData();

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
              Smart Anomaly Detection
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30">
              Automated Sentinel
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Statistical deviation monitoring flagging sudden contractions, catalog concentration risks, and ticket outliers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <span>Real-time Sentinel Active ({filteredTransactions.length} evaluated txs)</span>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="p-5 rounded-2xl bg-[#151C2C] border border-white/[0.06] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#8B5CF6]/15 text-[#22D3EE]">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Deviation Status
            </h3>
            <p className="text-sm font-semibold text-[#F8FAFC] mt-0.5">
              {anomalies.length > 0
                ? `${anomalies.length} Notable Pattern Deviations Flagged`
                : 'Zero Statistical Anomalies Detected'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveView('nova-ai')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 border border-[#8B5CF6]/30 text-xs font-medium text-white transition-all"
        >
          <span>Audit in NOVA AI</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#22D3EE]" />
        </button>
      </div>

      {/* Anomaly Cards Grid */}
      <div className="space-y-4">
        {anomalies.length === 0 ? (
          <div className="nova-card rounded-2xl p-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#22C55E] mx-auto" />
            <h3 className="font-heading text-lg font-bold text-white">All Metrics Within Normal Variance</h3>
            <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
              No atypical revenue contractions, catalog imbalance, or outlier volume deviations have crossed statistical thresholds.
            </p>
          </div>
        ) : (
          anomalies.map(anom => {
            const isCritical = anom.severity === 'critical';
            const isWarning = anom.severity === 'warning';

            return (
              <div
                key={anom.id}
                className={`nova-card rounded-2xl p-6 space-y-4 border ${
                  isCritical
                    ? 'border-[#EF4444]/30 bg-[#EF4444]/5'
                    : isWarning
                    ? 'border-[#F59E0B]/30 bg-[#F59E0B]/5'
                    : 'border-[#22D3EE]/30 bg-[#22D3EE]/5'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    {isCritical ? (
                      <AlertOctagon className="w-5 h-5 text-[#EF4444]" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                    ) : (
                      <Info className="w-5 h-5 text-[#22D3EE]" />
                    )}
                    <h3 className="font-heading text-base font-bold text-white">
                      {anom.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        isCritical
                          ? 'bg-[#EF4444]/20 text-[#EF4444]'
                          : isWarning
                          ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                          : 'bg-[#22D3EE]/20 text-[#22D3EE]'
                      }`}
                    >
                      {anom.severity}
                    </span>
                    <span className="text-[11px] text-[#94A3B8] font-mono">{anom.dateRange}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-[#94A3B8] block text-[11px]">Affected Metric</span>
                    <span className="font-semibold text-white mt-0.5 block">{anom.affectedMetric}</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8] block text-[11px]">Measured Change</span>
                    <span className="font-semibold text-[#22D3EE] font-mono mt-0.5 block">{anom.measuredChange}</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8] block text-[11px]">Statistical Trigger</span>
                    <span className="font-semibold text-white mt-0.5 block">Threshold exceeded by &gt; 2.2σ</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-[#94A3B8] leading-relaxed">
                  <p><strong>Explanation:</strong> {anom.explanation}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-xs text-[#C084FC] flex items-start gap-2.5">
                  <Search className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Suggested Investigation Playbook: </strong>
                    <span>{anom.suggestedInvestigation}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
