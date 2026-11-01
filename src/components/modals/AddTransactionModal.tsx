import React, { useState } from 'react';
import { X, Plus, Sparkles, Check } from 'lucide-react';
import { useBusinessData } from '../../context/BusinessDataContext';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose }) => {
  const { addTransaction, formatCurrency } = useBusinessData();

  const [customer, setCustomer] = useState('');
  const [product, setProduct] = useState('');
  const [category, setCategory] = useState('Hardware & Devices');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(2500);
  const [channel, setChannel] = useState<'Online Store' | 'B2B Wholesale' | 'Direct Sales' | 'Marketplace'>('Direct Sales');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<'completed' | 'processing' | 'refunded' | 'pending'>('completed');

  if (!isOpen) return null;

  const totalRevenue = quantity * unitPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.trim() || !product.trim()) return;

    addTransaction({
      customer: customer.trim(),
      customerEmail: `${customer.toLowerCase().replace(/[^a-z0-9]/g, '')}@enterprise.io`,
      product: product.trim(),
      category,
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
      revenue: totalRevenue,
      channel,
      date,
      status,
    });

    onClose();
    // reset form
    setCustomer('');
    setProduct('');
    setQuantity(1);
    setUnitPrice(2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#111827] border border-[#8B5CF6]/30 shadow-2xl p-6 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 text-[#22D3EE]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Record Transaction</h3>
              <p className="text-xs text-[#94A3B8]">Immediately recomputes all dashboard KPIs & AI insights</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">Customer / Organization</label>
              <input
                type="text"
                required
                placeholder="e.g. Acme Quantum Corp"
                value={customer}
                onChange={e => setCustomer(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#151C2C] border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">Product Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Apex Quantum Server"
                value={product}
                onChange={e => setProduct(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#151C2C] border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">Product Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#151C2C] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-[#22D3EE]"
              >
                <option value="Hardware & Devices">Hardware & Devices</option>
                <option value="Cloud Services">Cloud Services</option>
                <option value="SaaS Subscriptions">SaaS Subscriptions</option>
                <option value="Consulting & Retainers">Consulting & Retainers</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">Sales Channel</label>
              <select
                value={channel}
                onChange={e => setChannel(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-[#151C2C] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-[#22D3EE]"
              >
                <option value="Direct Sales">Direct Sales</option>
                <option value="Online Store">Online Store</option>
                <option value="B2B Wholesale">B2B Wholesale</option>
                <option value="Marketplace">Marketplace</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 rounded-lg bg-[#151C2C] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-[#22D3EE]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">Unit Price ($)</label>
              <input
                type="number"
                min="1"
                required
                value={unitPrice}
                onChange={e => setUnitPrice(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-lg bg-[#151C2C] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-[#22D3EE]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#151C2C] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-[#22D3EE]"
              />
            </div>
          </div>

          {/* Computed Gross Preview Banner */}
          <div className="p-3 rounded-xl bg-[#151C2C] border border-white/[0.08] flex items-center justify-between">
            <span className="text-xs text-[#94A3B8]">Computed Gross Revenue:</span>
            <span className="text-sm font-bold text-[#22D3EE] font-mono">
              {formatCurrency(totalRevenue)}
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] hover:opacity-90 text-xs font-semibold text-white shadow-lg shadow-[#8B5CF6]/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Record & Compute</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
