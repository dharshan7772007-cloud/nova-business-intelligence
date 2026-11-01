import React, { useState } from 'react';
import {
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Search,
  Filter,
  ArrowUpDown,
  Layers,
  Sparkles
} from 'lucide-react';
import { useBusinessData } from '../context/BusinessDataContext';
import { ProductSummary } from '../types';

export const ProductsPage: React.FC = () => {
  const { productSummaries, formatCurrency, metrics } = useBusinessData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof ProductSummary>('revenue');
  const [sortAsc, setSortAsc] = useState(false);

  const categories = Array.from(new Set(productSummaries.map(p => p.category)));

  const filtered = productSummaries
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'string') {
        return sortAsc ? (valA as string).localeCompare(valB as string) : (valB as string).localeCompare(valA as string);
      }
      return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });

  const handleSort = (field: keyof ProductSummary) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
              Product Performance
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#8B5CF6]/20 text-[#22D3EE] border border-[#8B5CF6]/30">
              {productSummaries.length} Offerings
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Commercial velocity, unit margins, and portfolio revenue concentration.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="nova-card rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search catalog item..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#111827] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#111827] border border-white/[0.08] text-xs text-[#94A3B8] focus:text-white focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="nova-card rounded-2xl p-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-[#94A3B8] uppercase text-[10px] tracking-wider select-none">
                <th className="pb-3 font-medium">Rank</th>
                <th
                  onClick={() => handleSort('name')}
                  className="pb-3 font-medium cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>Product Offering</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="pb-3 font-medium">Category</th>
                <th
                  onClick={() => handleSort('unitsSold')}
                  className="pb-3 font-medium cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>Units Sold</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('avgPrice')}
                  className="pb-3 font-medium cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>Avg Selling Price</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="pb-3 font-medium">Gross Share</th>
                <th
                  onClick={() => handleSort('revenue')}
                  className="pb-3 font-medium text-right cursor-pointer hover:text-white"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Gross Revenue</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((prod, idx) => {
                const sharePct = metrics.totalRevenue > 0
                  ? Math.round((prod.revenue / metrics.totalRevenue) * 100)
                  : 0;

                return (
                  <tr key={prod.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3">
                      <span className="w-5 h-5 rounded-md bg-[#8B5CF6]/15 text-[#C084FC] flex items-center justify-center font-bold text-[11px]">
                        {idx + 1}
                      </span>
                    </td>
                    <td className="py-3">
                      <p className="font-semibold text-white">{prod.name}</p>
                      <p className="text-[10px] text-[#22D3EE]">{prod.stockStatus}</p>
                    </td>
                    <td className="py-3 text-[#94A3B8]">{prod.category}</td>
                    <td className="py-3 font-mono text-white font-medium">{prod.unitsSold} units</td>
                    <td className="py-3 font-mono text-[#94A3B8]">{formatCurrency(prod.avgPrice)}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-white/[0.08] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#22D3EE] h-full" style={{ width: `${sharePct}%` }} />
                        </div>
                        <span className="text-[11px] font-mono text-[#94A3B8]">{sharePct}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-right font-mono font-bold text-white">
                      {formatCurrency(prod.revenue)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
