import React, { useState } from 'react';
import {
  Users,
  Award,
  TrendingUp,
  Mail,
  Calendar,
  Sparkles,
  Search,
  Filter,
  DollarSign
} from 'lucide-react';
import { useBusinessData } from '../context/BusinessDataContext';

export const CustomersPage: React.FC = () => {
  const { customerSummaries, formatCurrency, metrics } = useBusinessData();
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState<string>('all');

  const filteredCustomers = customerSummaries.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = segmentFilter === 'all' || c.segment === segmentFilter;
    return matchesSearch && matchesSegment;
  });

  // Segment counts
  const champions = customerSummaries.filter(c => c.segment === 'Champion').length;
  const loyal = customerSummaries.filter(c => c.segment === 'Loyal').length;
  const atRisk = customerSummaries.filter(c => c.segment === 'At-Risk').length;
  const newCust = customerSummaries.filter(c => c.segment === 'New').length;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
              Customer Intelligence
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20">
              RFM Segmentation
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Retention cohorts, customer lifetime value (LTV), and purchase frequency profiles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#94A3B8]">
            Total Customer Accounts: <strong className="text-white">{customerSummaries.length}</strong>
          </span>
        </div>
      </div>

      {/* Cohort Segments Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => setSegmentFilter(segmentFilter === 'Champion' ? 'all' : 'Champion')}
          className={`nova-card rounded-2xl p-4 cursor-pointer transition-all border ${
            segmentFilter === 'Champion' ? 'border-[#8B5CF6] bg-[#8B5CF6]/10' : 'hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-1">
            <span>Champions (High LTV)</span>
            <Award className="w-4 h-4 text-[#C084FC]" />
          </div>
          <p className="font-heading text-2xl font-bold text-white">{champions}</p>
          <p className="text-[10px] text-[#22D3EE] mt-1">&gt; 150% Average LTV</p>
        </div>

        <div
          onClick={() => setSegmentFilter(segmentFilter === 'Loyal' ? 'all' : 'Loyal')}
          className={`nova-card rounded-2xl p-4 cursor-pointer transition-all border ${
            segmentFilter === 'Loyal' ? 'border-[#22D3EE] bg-[#22D3EE]/10' : 'hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-1">
            <span>Loyal Accounts</span>
            <Users className="w-4 h-4 text-[#22D3EE]" />
          </div>
          <p className="font-heading text-2xl font-bold text-white">{loyal}</p>
          <p className="text-[10px] text-[#22C55E] mt-1">Multiple Repeat Orders</p>
        </div>

        <div
          onClick={() => setSegmentFilter(segmentFilter === 'New' ? 'all' : 'New')}
          className={`nova-card rounded-2xl p-4 cursor-pointer transition-all border ${
            segmentFilter === 'New' ? 'border-[#3B82F6] bg-[#3B82F6]/10' : 'hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-1">
            <span>New Acquisitions</span>
            <Sparkles className="w-4 h-4 text-[#60A5FA]" />
          </div>
          <p className="font-heading text-2xl font-bold text-white">{newCust}</p>
          <p className="text-[10px] text-[#94A3B8] mt-1">First-time Order Baseline</p>
        </div>

        <div
          onClick={() => setSegmentFilter(segmentFilter === 'At-Risk' ? 'all' : 'At-Risk')}
          className={`nova-card rounded-2xl p-4 cursor-pointer transition-all border ${
            segmentFilter === 'At-Risk' ? 'border-[#EF4444] bg-[#EF4444]/10' : 'hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-1">
            <span>At-Risk / Inactive</span>
            <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
          </div>
          <p className="font-heading text-2xl font-bold text-white">{atRisk}</p>
          <p className="text-[10px] text-[#EF4444] mt-1">Sub-threshold Spend</p>
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="nova-card rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search customer account or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#111827] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#94A3B8]">Filter:</span>
            <select
              value={segmentFilter}
              onChange={e => setSegmentFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#111827] border border-white/[0.08] text-xs text-white focus:outline-none"
            >
              <option value="all">All Segments</option>
              <option value="Champion">Champion</option>
              <option value="Loyal">Loyal</option>
              <option value="New">New</option>
              <option value="At-Risk">At-Risk</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-[#94A3B8] uppercase text-[10px] tracking-wider">
                <th className="pb-3 font-medium">Customer Account</th>
                <th className="pb-3 font-medium">Segment</th>
                <th className="pb-3 font-medium">Total Orders</th>
                <th className="pb-3 font-medium">Avg Order Value</th>
                <th className="pb-3 font-medium">Last Active</th>
                <th className="pb-3 font-medium text-right">Lifetime Spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredCustomers.map(cust => (
                <tr key={cust.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3">
                    <p className="font-semibold text-white">{cust.name}</p>
                    <p className="text-[11px] text-[#94A3B8] flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#22D3EE]" />
                      <span>{cust.email}</span>
                    </p>
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        cust.segment === 'Champion'
                          ? 'bg-[#8B5CF6]/20 text-[#C084FC] border border-[#8B5CF6]/30'
                          : cust.segment === 'Loyal'
                          ? 'bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/30'
                          : cust.segment === 'New'
                          ? 'bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/30'
                          : 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30'
                      }`}
                    >
                      {cust.segment}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-white">{cust.ordersCount} orders</td>
                  <td className="py-3 font-mono text-[#94A3B8]">{formatCurrency(cust.avgOrderValue)}</td>
                  <td className="py-3 font-mono text-[11px] text-[#94A3B8]">{cust.lastOrderDate}</td>
                  <td className="py-3 text-right font-mono font-bold text-white">
                    {formatCurrency(cust.totalSpent)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
