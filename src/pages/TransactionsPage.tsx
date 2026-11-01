import React, { useState, useMemo } from 'react';
import {
  ArrowRightLeft,
  Search,
  Filter,
  Download,
  Plus,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useBusinessData } from '../context/BusinessDataContext';
import { Transaction } from '../types';

interface TransactionsPageProps {
  onOpenAddModal: () => void;
}

export const TransactionsPage: React.FC<TransactionsPageProps> = ({ onOpenAddModal }) => {
  const { filteredTransactions, formatCurrency } = useBusinessData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Transaction>('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filtered and sorted transactions
  const processedTransactions = useMemo(() => {
    return filteredTransactions
      .filter(tx => {
        const matchesSearch =
          tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.product.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCat = selectedCategory === 'all' || tx.category === selectedCategory;
        const matchesStatus = selectedStatus === 'all' || tx.status === selectedStatus;

        return matchesSearch && matchesCat && matchesStatus;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (typeof valA === 'string') {
          return sortAsc ? (valA as string).localeCompare(valB as string) : (valB as string).localeCompare(valA as string);
        }
        return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
  }, [filteredTransactions, searchTerm, selectedCategory, selectedStatus, sortField, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(processedTransactions.length / pageSize));
  const paginatedRows = processedTransactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const categories = Array.from(new Set(filteredTransactions.map(t => t.category)));

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Transaction ID,Date,Customer,Product,Category,Quantity,Revenue,Status,Channel']
        .concat(
          processedTransactions.map(
            t => `"${t.id}","${t.date}","${t.customer}","${t.product}","${t.category}",${t.quantity},${t.revenue},"${t.status}","${t.channel}"`
          )
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nova_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
              Transaction Records
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20">
              {processedTransactions.length} Verified
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Browse, filter, and audit all processed business transactions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-xs font-semibold text-white shadow-lg shadow-[#8B5CF6]/20 hover:opacity-95 transition-opacity"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Transaction</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#151C2C] hover:bg-[#1E273C] border border-white/[0.08] text-xs text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="nova-card rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, customer, product..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#111827] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE]"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={e => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-[#111827] border border-white/[0.08] text-xs text-[#94A3B8] focus:text-white focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={e => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-[#111827] border border-white/[0.08] text-xs text-[#94A3B8] focus:text-white focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="nova-card rounded-2xl p-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-[#94A3B8] uppercase text-[10px] tracking-wider select-none">
                <th
                  onClick={() => handleSort('id')}
                  className="pb-3 font-medium cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Tx ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('date')}
                  className="pb-3 font-medium cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Date</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('customer')}
                  className="pb-3 font-medium cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Customer</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="pb-3 font-medium">Product & Category</th>
                <th className="pb-3 font-medium">Channel</th>
                <th className="pb-3 font-medium">Qty</th>
                <th
                  onClick={() => handleSort('revenue')}
                  className="pb-3 font-medium text-right cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Revenue</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="pb-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[#94A3B8]">
                    No transactions match your query.
                  </td>
                </tr>
              ) : (
                paginatedRows.map(tx => (
                  <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-mono font-medium text-[#22D3EE]">{tx.id}</td>
                    <td className="py-3 text-[#94A3B8] font-mono text-[11px]">{tx.date}</td>
                    <td className="py-3 font-medium text-white max-w-[150px] truncate">{tx.customer}</td>
                    <td className="py-3">
                      <div className="max-w-[160px]">
                        <p className="text-white truncate font-medium">{tx.product}</p>
                        <p className="text-[10px] text-[#94A3B8] truncate">{tx.category}</p>
                      </div>
                    </td>
                    <td className="py-3 text-[#94A3B8] text-[11px]">{tx.channel || 'Direct Sales'}</td>
                    <td className="py-3 font-mono text-white">{tx.quantity}</td>
                    <td className="py-3 text-right font-mono font-bold text-white">
                      {formatCurrency(tx.revenue)}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          tx.status === 'completed'
                            ? 'bg-[#22C55E]/15 text-[#22C55E]'
                            : tx.status === 'processing'
                            ? 'bg-[#22D3EE]/15 text-[#22D3EE]'
                            : tx.status === 'pending'
                            ? 'bg-[#F59E0B]/15 text-[#F59E0B]'
                            : 'bg-[#EF4444]/15 text-[#EF4444]'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/[0.06] text-xs text-[#94A3B8]">
          <span>
            Page {currentPage} of {totalPages} ({processedTransactions.length} records)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg bg-[#111827] border border-white/[0.08] disabled:opacity-40 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg bg-[#111827] border border-white/[0.08] disabled:opacity-40 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
