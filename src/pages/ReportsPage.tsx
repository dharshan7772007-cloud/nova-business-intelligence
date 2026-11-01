import React, { useRef } from 'react';
import {
  FileText,
  Printer,
  Download,
  Calendar,
  Sparkles,
  TrendingUp,
  DollarSign,
  Activity,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { useBusinessData } from '../context/BusinessDataContext';

export const ReportsPage: React.FC = () => {
  const {
    metrics,
    productSummaries,
    customerSummaries,
    healthScore,
    userPreferences,
    filteredTransactions,
    formatCurrency,
    activePreset
  } = useBusinessData();

  const printAreaRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExportSummaryCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'METRIC,VALUE',
        `Business Name,"${userPreferences.businessName}"`,
        `Generated Date,"${new Date().toISOString()}"`,
        `Total Revenue,${metrics.totalRevenue}`,
        `Period Change,${metrics.revenueChange}%`,
        `Total Orders,${metrics.totalOrders}`,
        `Average Order Value,${metrics.averageOrderValue}`,
        `Active Customers,${metrics.totalCustomers}`,
        `Health Score,${healthScore.totalScore}/100`,
        `Health Grade,${healthScore.grade}`,
        '',
        'TOP PRODUCTS,REVENUE,UNITS',
        ...productSummaries.slice(0, 5).map(p => `"${p.name}",${p.revenue},${p.unitsSold}`),
        '',
        'KEY RECOMMENDATIONS',
        ...healthScore.recommendations.map(r => `"${r}"`)
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nova_executive_brief_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
              Business Report Generator
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20">
              Audit Ready
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Export printable briefings and executive summaries driven by active ledger records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportSummaryCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] text-xs text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Download CSV Digest</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-xs font-semibold text-white shadow-lg shadow-[#8B5CF6]/20 hover:opacity-95 transition-opacity"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div
        ref={printAreaRef}
        className="nova-card rounded-2xl p-8 space-y-6 print:bg-white print:text-black print:border-none"
      >
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] p-[1px]">
              <div className="h-full w-full bg-[#151C2C] rounded-[9px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#22D3EE]" />
              </div>
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-white tracking-wide">
                {userPreferences.businessName}
              </h2>
              <p className="text-xs text-[#94A3B8]">NOVA Executive Intelligence Briefing</p>
            </div>
          </div>

          <div className="text-right text-xs text-[#94A3B8] space-y-0.5">
            <p>Generated: <strong className="text-white">{new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}</strong></p>
            <p>Evaluation Scope: <strong className="text-[#22D3EE]">{filteredTransactions.length} records ({activePreset})</strong></p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-[#22D3EE]">
            1. Executive Performance Digest
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            During the evaluated window, {userPreferences.businessName} generated <strong>{formatCurrency(metrics.totalRevenue)}</strong> across <strong>{metrics.totalOrders}</strong> confirmed transactions, with an Average Order Value of <strong>{formatCurrency(metrics.averageOrderValue)}</strong>. Overall commercial vitality is rated at <strong>{healthScore.totalScore}/100 (Grade {healthScore.grade})</strong>, reflecting {healthScore.status.toLowerCase()}.
          </p>
        </div>

        {/* 4 KPIs Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 border-y border-white/[0.06]">
          <div className="p-3 rounded-xl bg-white/[0.02]">
            <span className="text-[11px] text-[#94A3B8]">Gross Revenue</span>
            <p className="font-heading text-xl font-bold text-white mt-0.5">{formatCurrency(metrics.totalRevenue)}</p>
            <span className={`text-[10px] ${metrics.revenueChange >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
              {metrics.revenueChange >= 0 ? '+' : ''}{metrics.revenueChange}% variance
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02]">
            <span className="text-[11px] text-[#94A3B8]">Completed Orders</span>
            <p className="font-heading text-xl font-bold text-white mt-0.5">{metrics.totalOrders}</p>
            <span className="text-[10px] text-[#22D3EE]">{metrics.completedRate}% fulfill rate</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02]">
            <span className="text-[11px] text-[#94A3B8]">Average Ticket Size</span>
            <p className="font-heading text-xl font-bold text-white mt-0.5">{formatCurrency(metrics.averageOrderValue)}</p>
            <span className="text-[10px] text-[#94A3B8]">Per transaction</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02]">
            <span className="text-[11px] text-[#94A3B8]">Health Index</span>
            <p className="font-heading text-xl font-bold text-[#C084FC] mt-0.5">{healthScore.totalScore} / 100</p>
            <span className="text-[10px] text-[#22C55E]">Grade {healthScore.grade}</span>
          </div>
        </div>

        {/* Top Product Drivers */}
        <div className="space-y-3">
          <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-[#22D3EE]">
            2. Core Product Revenue Drivers
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-[#94A3B8] text-[10px] uppercase">
                  <th className="pb-2">Offering</th>
                  <th className="pb-2">Category</th>
                  <th className="pb-2">Units Sold</th>
                  <th className="pb-2">Avg Unit Price</th>
                  <th className="pb-2 text-right">Gross Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {productSummaries.slice(0, 5).map(prod => (
                  <tr key={prod.id}>
                    <td className="py-2 font-medium text-white">{prod.name}</td>
                    <td className="py-2 text-[#94A3B8]">{prod.category}</td>
                    <td className="py-2 font-mono text-white">{prod.unitsSold}</td>
                    <td className="py-2 font-mono text-[#94A3B8]">{formatCurrency(prod.avgPrice)}</td>
                    <td className="py-2 text-right font-mono font-bold text-white">{formatCurrency(prod.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-3 pt-2">
          <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-[#22D3EE]">
            3. Prioritized Strategic Playbooks
          </h3>
          <div className="space-y-2">
            {healthScore.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#F8FAFC]">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="pt-6 border-t border-white/[0.06] text-[11px] text-[#94A3B8]/70 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Generated by NOVA AI Business Intelligence Platform • D7 Studio Portfolio</span>
          <span>Confidential internal briefing</span>
        </div>
      </div>
    </div>
  );
};
