import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  CreditCard,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Upload,
  FileText,
  Plus,
  ArrowRight,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useBusinessData } from '../context/BusinessDataContext';

interface OverviewPageProps {
  onOpenAddModal: () => void;
}

const CATEGORY_COLORS = ['#8B5CF6', '#22D3EE', '#3B82F6', '#10B981', '#F59E0B', '#EC4899'];

export const OverviewPage: React.FC<OverviewPageProps> = ({ onOpenAddModal }) => {
  const {
    metrics,
    revenueTimeline,
    salesByCategory,
    customerAcquisition,
    productSummaries,
    filteredTransactions,
    formatCurrency,
    setActiveView,
    activePreset,
    setActivePreset,
    healthScore,
    userPreferences
  } = useBusinessData();

  const recentTransactions = filteredTransactions.slice(0, 6);
  const topProducts = productSummaries.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
              Executive Overview
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20">
              Live Pipeline
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Analyzing commercial momentum, orders, and customer trends for <strong className="text-white">{userPreferences.businessName}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Preset Pill Filter */}
          <div className="flex items-center bg-[#151C2C] p-1 rounded-xl border border-white/[0.08] text-xs">
            {(['all', 'last30', 'last90'] as const).map(preset => (
              <button
                key={preset}
                type="button"
                onClick={() => setActivePreset(preset)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  activePreset === preset
                    ? 'bg-[#8B5CF6] text-white shadow-sm'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {preset === 'all' ? 'All Time' : preset === 'last30' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] text-xs text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Add Transaction</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('csv-import')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 border border-[#8B5CF6]/30 text-xs text-[#C084FC] transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('reports')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#151C2C] hover:bg-[#1E273C] border border-white/[0.08] text-xs text-[#94A3B8] hover:text-white transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 2. Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Revenue */}
        <div className="nova-card rounded-2xl p-4 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-2">
            <span className="font-medium">Total Revenue</span>
            <div className="p-2 rounded-xl bg-[#8B5CF6]/15 text-[#C084FC]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="font-heading text-2xl font-bold text-white tracking-tight">
            {formatCurrency(metrics.totalRevenue)}
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span
              className={`inline-flex items-center font-medium ${
                metrics.revenueChange >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'
              }`}
            >
              {metrics.revenueChange >= 0 ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {metrics.revenueChange >= 0 ? '+' : ''}{metrics.revenueChange}%
            </span>
            <span className="text-[11px] text-[#94A3B8]/80">vs preceding period</span>
          </div>
        </div>

        {/* KPI 2: Total Orders */}
        <div className="nova-card rounded-2xl p-4 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-2">
            <span className="font-medium">Total Orders</span>
            <div className="p-2 rounded-xl bg-[#22D3EE]/15 text-[#22D3EE]">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <p className="font-heading text-2xl font-bold text-white tracking-tight">
            {metrics.totalOrders.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span
              className={`inline-flex items-center font-medium ${
                metrics.ordersChange >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'
              }`}
            >
              {metrics.ordersChange >= 0 ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {metrics.ordersChange >= 0 ? '+' : ''}{metrics.ordersChange}%
            </span>
            <span className="text-[11px] text-[#94A3B8]/80">{metrics.completedRate}% completed</span>
          </div>
        </div>

        {/* KPI 3: Average Order Value */}
        <div className="nova-card rounded-2xl p-4 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-2">
            <span className="font-medium">Average Order Value (AOV)</span>
            <div className="p-2 rounded-xl bg-[#3B82F6]/15 text-[#60A5FA]">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="font-heading text-2xl font-bold text-white tracking-tight">
            {formatCurrency(metrics.averageOrderValue)}
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span
              className={`inline-flex items-center font-medium ${
                metrics.aovChange >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'
              }`}
            >
              {metrics.aovChange >= 0 ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {metrics.aovChange >= 0 ? '+' : ''}{metrics.aovChange}%
            </span>
            <span className="text-[11px] text-[#94A3B8]/80">ticket size quality</span>
          </div>
        </div>

        {/* KPI 4: Total Customers */}
        <div className="nova-card rounded-2xl p-4 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-2">
            <span className="font-medium">Active Customer Accounts</span>
            <div className="p-2 rounded-xl bg-[#10B981]/15 text-[#34D399]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="font-heading text-2xl font-bold text-white tracking-tight">
            {metrics.totalCustomers.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span
              className={`inline-flex items-center font-medium ${
                metrics.customersChange >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'
              }`}
            >
              {metrics.customersChange >= 0 ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {metrics.customersChange >= 0 ? '+' : ''}{metrics.customersChange}%
            </span>
            <span className="text-[11px] text-[#94A3B8]/80">client diversity</span>
          </div>
        </div>
      </div>

      {/* 3. AI Insight Preview Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#151C2C] via-[#1A2236] to-[#151C2C] border border-[#8B5CF6]/30 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 text-[#22D3EE] shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#22D3EE] uppercase tracking-wider font-mono">
                NOVA Autonomous Intelligence
              </span>
              <span className="px-2 py-0.2 rounded text-[10px] bg-[#8B5CF6]/20 text-[#C084FC]">
                Health Score: {healthScore.totalScore}/100 ({healthScore.grade})
              </span>
            </div>
            <p className="text-xs text-[#F8FAFC] font-medium mt-1">
              {metrics.revenueChange >= 0
                ? `Revenue is expanding at +${metrics.revenueChange}%, driven by steady demand in ${productSummaries[0]?.category || 'Hardware'}.`
                : `Observed revenue contracted by ${Math.abs(metrics.revenueChange)}%. Recommended focus: Enterprise retainer renewals.`}
            </p>
            <p className="text-[11px] text-[#94A3B8] mt-0.5">
              {healthScore.recommendations[0] || 'Catalog diversification remains balanced.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveView('nova-ai')}
          className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 border border-[#8B5CF6]/30 text-xs font-semibold text-white transition-all"
        >
          <span>Ask NOVA Intelligence</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#22D3EE]" />
        </button>
      </div>

      {/* 4. Main Charts Section (Revenue Over Time + Sales by Category) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Over Time (Area Chart) */}
        <div className="lg:col-span-8 nova-card rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading text-base font-bold text-white">Revenue Trajectory</h2>
              <p className="text-xs text-[#94A3B8]">Gross sales volume progression across evaluated periods</p>
            </div>
            <span className="text-xs text-[#22D3EE] font-mono font-medium">
              {revenueTimeline.length} Time Nodes
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTimeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="label"
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                />
                <YAxis
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                  tickFormatter={val => `$${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-xl bg-[#111827] border border-white/[0.1] p-3 shadow-2xl text-xs space-y-1">
                          <p className="font-bold text-white">{label}</p>
                          <p className="text-[#22D3EE]">Revenue: {formatCurrency(data.revenue)}</p>
                          <p className="text-[#94A3B8]">Orders: {data.orders}</p>
                          <p className="text-[#C084FC]">AOV: {formatCurrency(data.aov)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8B5CF6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category (Donut + Breakdown) */}
        <div className="lg:col-span-4 nova-card rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="font-heading text-base font-bold text-white">Category Mix</h2>
              <p className="text-xs text-[#94A3B8]">Gross revenue distribution by line</p>
            </div>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesByCategory}
                  dataKey="revenue"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                >
                  {salesByCategory.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-xl bg-[#111827] border border-white/[0.1] p-2.5 shadow-2xl text-xs">
                          <p className="font-semibold text-white">{data.name}</p>
                          <p className="text-[#22D3EE]">{formatCurrency(data.revenue)} ({data.percentage}%)</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 mt-2 pt-2 border-t border-white/[0.06]">
            {salesByCategory.slice(0, 4).map((cat, idx) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[idx % CATEGORY_COLORS.length] }}
                  />
                  <span className="text-[#94A3B8] truncate">{cat.name}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-white font-medium">{formatCurrency(cat.revenue)}</span>
                  <span className="text-[#94A3B8] text-[10px] w-7 text-right">{cat.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Additional Operational Sections: Top Products & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top-Selling Products */}
        <div className="lg:col-span-5 nova-card rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading text-base font-bold text-white">Top Performing Products</h2>
              <p className="text-xs text-[#94A3B8]">Ranked by total revenue generation</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveView('products')}
              className="text-xs text-[#22D3EE] hover:underline flex items-center gap-1"
            >
              <span>Catalog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {topProducts.map((prod, idx) => (
              <div
                key={prod.id}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-colors flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-5 h-5 rounded-lg bg-[#8B5CF6]/15 text-[#C084FC] flex items-center justify-center font-bold text-[11px] shrink-0">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{prod.name}</p>
                    <p className="text-[11px] text-[#94A3B8] truncate">{prod.category} • {prod.unitsSold} sold</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-bold text-white font-mono">{formatCurrency(prod.revenue)}</p>
                  <p className="text-[10px] text-[#22C55E]">Avg ${prod.avgPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="lg:col-span-7 nova-card rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading text-base font-bold text-white">Recent Transactions</h2>
              <p className="text-xs text-[#94A3B8]">Latest recorded orders from active database</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveView('transactions')}
              className="text-xs text-[#22D3EE] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-[#94A3B8] uppercase text-[10px] tracking-wider">
                  <th className="pb-2.5 font-medium">Tx ID</th>
                  <th className="pb-2.5 font-medium">Customer</th>
                  <th className="pb-2.5 font-medium">Product</th>
                  <th className="pb-2.5 font-medium">Date</th>
                  <th className="pb-2.5 font-medium text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {recentTransactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 font-mono text-[#22D3EE] font-medium">{tx.id}</td>
                    <td className="py-2.5 font-medium text-white truncate max-w-[130px]">{tx.customer}</td>
                    <td className="py-2.5 text-[#94A3B8] truncate max-w-[140px]">{tx.product}</td>
                    <td className="py-2.5 text-[#94A3B8] text-[11px]">{tx.date}</td>
                    <td className="py-2.5 text-right font-mono font-semibold text-white">
                      {formatCurrency(tx.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
