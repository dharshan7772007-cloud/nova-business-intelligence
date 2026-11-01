import React, { useState } from 'react';
import {
  Settings,
  Building,
  DollarSign,
  Calendar,
  Palette,
  Database,
  RotateCcw,
  Trash2,
  Download,
  Save,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useBusinessData } from '../context/BusinessDataContext';
import { SAMPLE_CSV_TEMPLATE } from '../data/sampleData';

export const SettingsPage: React.FC = () => {
  const {
    userPreferences,
    updateUserPreferences,
    transactions,
    resetToDefaultData,
    clearAllData,
    currentUser,
    loginDemoUser
  } = useBusinessData();

  const [businessName, setBusinessName] = useState(userPreferences.businessName);
  const [currency, setCurrency] = useState(userPreferences.currency);
  const [dateFormat, setDateFormat] = useState(userPreferences.dateFormat);
  const [themeAccent, setThemeAccent] = useState(userPreferences.themeAccent);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserPreferences({
      businessName,
      currency,
      dateFormat,
      themeAccent
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(transactions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `nova_database_export_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadSample = () => {
    const blob = new Blob([SAMPLE_CSV_TEMPLATE], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'nova_sample_business_transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title */}
      <div className="pb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
            Settings & Preferences
          </h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#8B5CF6]/20 text-[#22D3EE] border border-[#8B5CF6]/30">
            Configuration
          </span>
        </div>
        <p className="text-xs text-[#94A3B8] mt-1">
          Customize corporate brand identity, currency denomination, and operational data storage.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 text-xs text-[#22C55E] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Preferences saved and applied across all analytics workspaces!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="nova-card rounded-2xl p-6 space-y-5">
        <h2 className="font-heading text-base font-bold text-white flex items-center gap-2">
          <Building className="w-4 h-4 text-[#22D3EE]" />
          <span>Business Profile</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1">
              Company / Legal Entity Name
            </label>
            <input
              type="text"
              required
              value={businessName}
              onChange={e => setBusinessName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#111827] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-[#22D3EE]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1">
              Reporting Currency
            </label>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#111827] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-[#22D3EE]"
            >
              <option value="$">USD ($) — United States Dollar</option>
              <option value="€">EUR (€) — Euro</option>
              <option value="£">GBP (£) — British Pound</option>
              <option value="¥">JPY (¥) — Japanese Yen</option>
              <option value="₹">INR (₹) — Indian Rupee</option>
              <option value="C$">CAD (C$) — Canadian Dollar</option>
              <option value="A$">AUD (A$) — Australian Dollar</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1">
              Date Formatting
            </label>
            <select
              value={dateFormat}
              onChange={e => setDateFormat(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-[#111827] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-[#22D3EE]"
            >
              <option value="YYYY-MM-DD">ISO Standard (2026-10-29)</option>
              <option value="MM/DD/YYYY">US Format (10/29/2026)</option>
              <option value="DD/MM/YYYY">International (29/10/2026)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1">
              Theme Glow Accent
            </label>
            <select
              value={themeAccent}
              onChange={e => setThemeAccent(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-[#111827] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-[#22D3EE]"
            >
              <option value="cyan">Electric Cyan (Default)</option>
              <option value="purple">Quantum Purple</option>
              <option value="emerald">Emerald Vitality</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-white/[0.06]">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-xs font-semibold text-white shadow-lg shadow-[#8B5CF6]/20 hover:opacity-95 transition-opacity"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>

      {/* Data Management Section */}
      <div className="nova-card rounded-2xl p-6 space-y-5">
        <h2 className="font-heading text-base font-bold text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-[#8B5CF6]" />
          <span>Local Data Lifecycle & Storage</span>
        </h2>
        <p className="text-xs text-[#94A3B8]">
          Manage your active browser database. Changes persist automatically via LocalStorage.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Action 1: Reset Default */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
            <h3 className="font-bold text-white text-xs">Reset to Baseline Sample Data</h3>
            <p className="text-[11px] text-[#94A3B8]">
              Restores the default 50 transaction records spanning May to October 2026.
            </p>
            <button
              type="button"
              onClick={resetToDefaultData}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Restore Baseline Data</span>
            </button>
          </div>

          {/* Action 2: Export JSON */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
            <h3 className="font-bold text-white text-xs">Export Active Database</h3>
            <p className="text-[11px] text-[#94A3B8]">
              Download full JSON payload of current {transactions.length} transactions.
            </p>
            <button
              type="button"
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Export Database (JSON)</span>
            </button>
          </div>

          {/* Action 3: Download Sample CSV */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
            <h3 className="font-bold text-white text-xs">Sample CSV Schema</h3>
            <p className="text-[11px] text-[#94A3B8]">
              Get the official CSV template formatted for zero-friction schema mapping.
            </p>
            <button
              type="button"
              onClick={handleDownloadSample}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Download Template</span>
            </button>
          </div>

          {/* Action 4: Clear Data */}
          <div className="p-4 rounded-xl bg-[#EF4444]/5 border border-[#EF4444]/20 space-y-3">
            <h3 className="font-bold text-[#EF4444] text-xs">Clear Local Data</h3>
            <p className="text-[11px] text-[#94A3B8]">
              Empties all recorded transactions from active session storage.
            </p>
            <button
              type="button"
              onClick={clearAllData}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#EF4444]/15 hover:bg-[#EF4444]/25 text-xs text-[#EF4444] font-medium transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Purge Active Database</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
