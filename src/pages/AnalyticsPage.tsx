import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Filter,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as PieIcon,
  Activity,
  Layers,
  ChevronDown
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';
import { useBusinessData } from '../context/BusinessDataContext';

export const AnalyticsPage: React.FC = () => {
  const {
    revenueTimeline,
    salesByCategory,
    customerAcquisition,
    productSummaries,
    formatCurrency,
    metrics,
    activePreset,
    setActivePreset
  } = useBusinessData();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'revenue' | 'volume' | 'cohorts'>('revenue');

  // Filtered products if category selected
  const displayedProducts = selectedCategory === 'all'
    ? productSummaries
    : productSummaries.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
              In-Depth Analytics
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20">
              Multi-Dimensional
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Comparative performance, unit velocity, category contribution, and customer acquisition.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#151C2C] border border-white/[0.08] text-xs">
            <Filter className="w-3.5 h-3.5 text-[#22D3EE]" />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="bg-transparent text-white text-xs focus:outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {salesByCategory.map(c => (
                <option key={c.name} value={c.name} className="bg-[#151C2C] text-white">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
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
                {preset === 'all' ? 'All' : preset === 'last30' ? '30D' : '90D'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Analytics Visualization */}
      <div className="nova-card rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-base font-bold text-white">
              Revenue & Order Cadence Analysis
            </h2>
            <p className="text-xs text-[#94A3B8]">Dual-axis correlation of sales revenue vs transaction frequency</p>
          </div>

          <div className="flex items-center bg-[#111827] p-1 rounded-xl border border-white/[0.08] text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('revenue')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                activeTab === 'revenue' ? 'bg-[#8B5CF6] text-white' : 'text-[#94A3B8]'
              }`}
            >
              Revenue Line
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('volume')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                activeTab === 'volume' ? 'bg-[#8B5CF6] text-white' : 'text-[#94A3B8]'
              }`}
            >
              Order Bars
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cohorts')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                activeTab === 'cohorts' ? 'bg-[#8B5CF6] text-white' : 'text-[#94A3B8]'
              }`}
            >
              New vs Returning
            </button>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === 'revenue' ? (
              <AreaChart data={revenueTimeline}>
                <defs>
                  <linearGradient id="areaRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="label" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-xl bg-[#111827] border border-white/[0.1] p-3 shadow-2xl text-xs space-y-1">
                          <p className="font-bold text-white">{label}</p>
                          <p className="text-[#22D3EE]">Revenue: {formatCurrency(data.revenue)}</p>
                          <p className="text-[#C084FC]">Average Ticket: {formatCurrency(data.aov)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#22D3EE" strokeWidth={2.5} fill="url(#areaRev)" />
              </AreaChart>
            ) : activeTab === 'volume' ? (
              <BarChart data={revenueTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="label" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-xl bg-[#111827] border border-white/[0.1] p-3 shadow-2xl text-xs space-y-1">
                          <p className="font-bold text-white">{label}</p>
                          <p className="text-[#22D3EE]">Total Orders: {data.orders}</p>
                          <p className="text-[#94A3B8]">Gross: {formatCurrency(data.revenue)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="orders" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : (
              <BarChart data={customerAcquisition}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="label" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-xl bg-[#111827] border border-white/[0.1] p-3 shadow-2xl text-xs space-y-1">
                          <p className="font-bold text-white">{label}</p>
                          <p className="text-[#22D3EE]">New Customers: {data.newCustomers}</p>
                          <p className="text-[#8B5CF6]">Returning Accounts: {data.returningCustomers}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="newCustomers" fill="#22D3EE" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="returningCustomers" fill="#8B5CF6" stackId="a" radius={[6, 6, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Performance Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {salesByCategory.map(cat => (
          <div key={cat.name} className="nova-card rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-white truncate">{cat.name}</span>
                <span className="text-[#22D3EE] font-mono font-bold">{cat.percentage}%</span>
              </div>
              <p className="font-heading text-xl font-bold text-white">
                {formatCurrency(cat.revenue)}
              </p>
              <p className="text-[11px] text-[#94A3B8] mt-1">{cat.units} total units purchased</p>
            </div>

            <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden mt-4">
              <div
                className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] h-full rounded-full"
                style={{ width: `${cat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
