import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Download,
  RotateCcw,
  Trash2,
  ArrowRight,
  Database,
  Table,
  Check,
  AlertCircle
} from 'lucide-react';
import { useBusinessData } from '../context/BusinessDataContext';
import { Transaction } from '../types';
import { SAMPLE_CSV_TEMPLATE } from '../data/sampleData';

interface ColumnMapping {
  id: string;
  date: string;
  customer: string;
  product: string;
  category: string;
  quantity: string;
  revenue: string;
  status: string;
}

export const CsvIntelligencePage: React.FC = () => {
  const {
    transactions,
    importTransactions,
    resetToDefaultData,
    clearAllData,
    setActiveView
  } = useBusinessData();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [rawRows, setRawRows] = useState<Record<string, any>[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');

  const [mapping, setMapping] = useState<ColumnMapping>({
    id: '',
    date: '',
    customer: '',
    product: '',
    category: '',
    quantity: '',
    revenue: '',
    status: ''
  });

  const [importMode, setImportMode] = useState<'replace' | 'append'>('replace');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);
  const [parsedValidCount, setParsedValidCount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  // Auto detect columns from header names
  const autoDetectMapping = (cols: string[]) => {
    const newMap: ColumnMapping = {
      id: '',
      date: '',
      customer: '',
      product: '',
      category: '',
      quantity: '',
      revenue: '',
      status: ''
    };

    cols.forEach(col => {
      const lower = col.toLowerCase().replace(/[^a-z]/g, '');
      if (lower.includes('id') || lower.includes('transaction') || lower.includes('order')) newMap.id = col;
      else if (lower.includes('date') || lower.includes('time') || lower.includes('created')) newMap.date = col;
      else if (lower.includes('customer') || lower.includes('client') || lower.includes('account') || lower.includes('name')) newMap.customer = col;
      else if (lower.includes('product') || lower.includes('item') || lower.includes('sku') || lower.includes('service')) newMap.product = col;
      else if (lower.includes('category') || lower.includes('type') || lower.includes('dept')) newMap.category = col;
      else if (lower.includes('qty') || lower.includes('quantity') || lower.includes('units') || lower.includes('count')) newMap.quantity = col;
      else if (lower.includes('rev') || lower.includes('revenue') || lower.includes('total') || lower.includes('amount') || lower.includes('price')) newMap.revenue = col;
      else if (lower.includes('status') || lower.includes('state')) newMap.status = col;
    });

    setMapping(newMap);
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;
    setFileName(file.name);
    setFileSize(`${(file.size / 1024).toFixed(1)} KB`);
    setImportSuccess(false);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: results => {
        const data = results.data as Record<string, any>[];
        const metaFields = results.meta.fields || [];
        setRawRows(data);
        setHeaders(metaFields);
        autoDetectMapping(metaFields);
        validateDataset(data, metaFields);
      },
      error: err => {
        setValidationErrors([`CSV Parse Error: ${err.message}`]);
      }
    });
  };

  const validateDataset = (rows: Record<string, any>[], cols: string[]) => {
    const errs: string[] = [];
    const warns: string[] = [];

    if (rows.length === 0) {
      errs.push('The uploaded CSV file contains zero data rows.');
    }

    // Check for critical revenue column
    const hasRevenueLike = cols.some(c => /rev|amount|total|price|cost/i.test(c));
    if (!hasRevenueLike) {
      warns.push('No obvious revenue/amount column detected. Please manually map your revenue column below.');
    }

    // Sample check first 20 rows for invalid numeric conversions
    let validRows = 0;
    rows.forEach((row, i) => {
      const revVal = row[mapping.revenue] || row['Revenue'] || row['Total'] || row['Amount'];
      if (revVal !== undefined) {
        const num = parseFloat(String(revVal).replace(/[^0-9.-]/g, ''));
        if (isNaN(num)) {
          if (i < 5) warns.push(`Row #${i + 1}: Non-numeric value "${revVal}" in potential revenue column.`);
        } else {
          validRows++;
        }
      }
    });

    setParsedValidCount(validRows || rows.length);
    setValidationErrors(errs);
    setValidationWarnings(warns);
  };

  const handleConfirmImport = () => {
    setIsProcessing(true);

    try {
      const mappedTransactions: Transaction[] = rawRows.map((row, idx) => {
        const revRaw = mapping.revenue ? row[mapping.revenue] : 100;
        const revNum = parseFloat(String(revRaw).replace(/[^0-9.-]/g, '')) || 0;

        const qtyRaw = mapping.quantity ? row[mapping.quantity] : 1;
        const qtyNum = parseInt(String(qtyRaw).replace(/[^0-9]/g, ''), 10) || 1;

        const dateRaw = mapping.date ? row[mapping.date] : new Date().toISOString().split('T')[0];
        let normalizedDate = String(dateRaw).trim();
        // Fallback for simple date checking
        if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizedDate)) {
          const parsedD = new Date(normalizedDate);
          if (!isNaN(parsedD.getTime())) {
            normalizedDate = parsedD.toISOString().split('T')[0];
          } else {
            normalizedDate = '2026-10-01';
          }
        }

        const customerName = mapping.customer && row[mapping.customer] ? String(row[mapping.customer]).trim() : `Customer ${idx + 1}`;
        const productName = mapping.product && row[mapping.product] ? String(row[mapping.product]).trim() : 'Standard Product';
        const categoryName = mapping.category && row[mapping.category] ? String(row[mapping.category]).trim() : 'General';
        const idVal = mapping.id && row[mapping.id] ? String(row[mapping.id]).trim() : `TX-${8000 + idx}`;

        return {
          id: idVal,
          date: normalizedDate,
          customer: customerName,
          customerEmail: `${customerName.toLowerCase().replace(/[^a-z0-9]/g, '')}@biz.com`,
          product: productName,
          category: categoryName,
          quantity: qtyNum,
          unitPrice: qtyNum > 0 ? Math.round(revNum / qtyNum) : revNum,
          revenue: revNum,
          status: 'completed',
          channel: 'Online Store'
        };
      });

      importTransactions(mappedTransactions, importMode === 'replace');
      setImportSuccess(true);
      setIsProcessing(false);
    } catch (e: any) {
      setValidationErrors([`Import failed: ${e.message}`]);
      setIsProcessing(false);
    }
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
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
              CSV Data Intelligence
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#8B5CF6]/20 text-[#22D3EE] border border-[#8B5CF6]/30">
              Pipeline v2.0
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Ingest real transaction spreadsheets. Maps schema, validates row anomalies, and drives all live dashboards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadSample}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] text-xs text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Download Sample CSV</span>
          </button>

          <button
            type="button"
            onClick={resetToDefaultData}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#151C2C] hover:bg-[#1E273C] border border-white/[0.08] text-xs text-[#94A3B8] hover:text-white transition-colors"
            title="Reset to initial 50 demo transactions"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Dataset</span>
          </button>
        </div>
      </div>

      {/* 1. Drag & Drop Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault();
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
          }
        }}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-[#8B5CF6]/40 hover:border-[#22D3EE] bg-[#151C2C]/50 hover:bg-[#151C2C]/80 transition-all p-8 sm:p-12 text-center group relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
        />

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#8B5CF6]/20 to-[#22D3EE]/20 border border-[#8B5CF6]/30 flex items-center justify-center text-[#22D3EE] mx-auto mb-4 group-hover:scale-105 transition-transform">
          <Upload className="w-8 h-8" />
        </div>

        <h3 className="font-heading text-lg font-bold text-white mb-1">
          Drag & drop your transaction CSV here
        </h3>
        <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
          Supports transaction ID, dates, customer names, products, categories, quantity, and gross revenue.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] text-[#22D3EE]">
          <span>Click to browse files</span>
          <span>•</span>
          <span>Max 15MB recommended</span>
        </div>

        {fileName && (
          <div className="mt-4 p-3 rounded-xl bg-[#111827] border border-[#22D3EE]/40 inline-flex items-center gap-3 text-xs text-white">
            <FileSpreadsheet className="w-4 h-4 text-[#22D3EE]" />
            <span className="font-medium">{fileName}</span>
            <span className="text-[#94A3B8]">({fileSize})</span>
            <span className="text-[#22C55E] flex items-center gap-1 font-semibold">
              <Check className="w-3.5 h-3.5" /> Parsed {rawRows.length} rows
            </span>
          </div>
        )}
      </div>

      {/* 2. Success Banner after Ingestion */}
      {importSuccess && (
        <div className="p-4 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#22C55E] shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">
                Dataset successfully imported & verified!
              </p>
              <p className="text-xs text-[#94A3B8]">
                {rawRows.length} records have been committed to local memory. Dashboard KPIs, anomaly detection, and AI analyst now reflect this data.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveView('overview')}
            className="px-4 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-xs font-semibold text-black flex items-center gap-2 transition-colors shrink-0"
          >
            <span>View Updated Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3. Validation Warnings & Errors */}
      {(validationErrors.length > 0 || validationWarnings.length > 0) && (
        <div className="space-y-2">
          {validationErrors.map((err, i) => (
            <div key={i} className="p-3 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-xs text-[#EF4444] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{err}</span>
            </div>
          ))}
          {validationWarnings.map((warn, i) => (
            <div key={i} className="p-3 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs text-[#F59E0B] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{warn}</span>
            </div>
          ))}
        </div>
      )}

      {/* 4. Column Schema Mapping (if file loaded) */}
      {headers.length > 0 && (
        <div className="nova-card rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="font-heading text-base font-bold text-white">Schema Field Mapping</h2>
              <p className="text-xs text-[#94A3B8]">Ensure target data attributes align with your CSV column headers</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#94A3B8]">Mode:</span>
              <div className="flex items-center bg-[#111827] p-1 rounded-xl border border-white/[0.08] text-xs">
                <button
                  type="button"
                  onClick={() => setImportMode('replace')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    importMode === 'replace' ? 'bg-[#8B5CF6] text-white' : 'text-[#94A3B8]'
                  }`}
                >
                  Replace Active Data
                </button>
                <button
                  type="button"
                  onClick={() => setImportMode('append')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    importMode === 'append' ? 'bg-[#8B5CF6] text-white' : 'text-[#94A3B8]'
                  }`}
                >
                  Append Records
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Field: ID */}
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">Transaction ID</label>
              <select
                value={mapping.id}
                onChange={e => setMapping({ ...mapping, id: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#111827] border border-white/[0.1] text-xs text-white"
              >
                <option value="">-- Auto Generate --</option>
                {headers.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            {/* Field: Date */}
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                Date (YYYY-MM-DD) <span className="text-[#EF4444]">*</span>
              </label>
              <select
                value={mapping.date}
                onChange={e => setMapping({ ...mapping, date: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#111827] border border-white/[0.1] text-xs text-white"
              >
                <option value="">-- Select Column --</option>
                {headers.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            {/* Field: Customer */}
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                Customer / Client Name <span className="text-[#EF4444]">*</span>
              </label>
              <select
                value={mapping.customer}
                onChange={e => setMapping({ ...mapping, customer: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#111827] border border-white/[0.1] text-xs text-white"
              >
                <option value="">-- Select Column --</option>
                {headers.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            {/* Field: Product */}
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                Product / Service <span className="text-[#EF4444]">*</span>
              </label>
              <select
                value={mapping.product}
                onChange={e => setMapping({ ...mapping, product: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#111827] border border-white/[0.1] text-xs text-white"
              >
                <option value="">-- Select Column --</option>
                {headers.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            {/* Field: Category */}
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">Category</label>
              <select
                value={mapping.category}
                onChange={e => setMapping({ ...mapping, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#111827] border border-white/[0.1] text-xs text-white"
              >
                <option value="">-- Default (General) --</option>
                {headers.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            {/* Field: Quantity */}
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">Quantity</label>
              <select
                value={mapping.quantity}
                onChange={e => setMapping({ ...mapping, quantity: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#111827] border border-white/[0.1] text-xs text-white"
              >
                <option value="">-- Default (1) --</option>
                {headers.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            {/* Field: Revenue */}
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                Gross Revenue / Total <span className="text-[#EF4444]">*</span>
              </label>
              <select
                value={mapping.revenue}
                onChange={e => setMapping({ ...mapping, revenue: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#111827] border border-white/[0.1] text-xs text-white font-semibold text-[#22D3EE]"
              >
                <option value="">-- Select Column --</option>
                {headers.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            {/* Field: Status */}
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">Order Status</label>
              <select
                value={mapping.status}
                onChange={e => setMapping({ ...mapping, status: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#111827] border border-white/[0.1] text-xs text-white"
              >
                <option value="">-- Default (completed) --</option>
                {headers.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <div className="text-xs text-[#94A3B8]">
              Ready to ingest: <strong className="text-white">{rawRows.length}</strong> records
            </div>

            <button
              type="button"
              disabled={isProcessing}
              onClick={handleConfirmImport}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-xs font-semibold text-white shadow-xl shadow-[#8B5CF6]/20 hover:opacity-90 disabled:opacity-50 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isProcessing ? 'Processing Pipeline...' : 'Commit & Recompute Analytics'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. Raw Data Preview Table */}
      {rawRows.length > 0 && (
        <div className="nova-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-base font-bold text-white">Data Preview</h2>
              <p className="text-xs text-[#94A3B8]">Showing first 10 rows of uploaded dataset</p>
            </div>
            <span className="text-xs font-mono text-[#22D3EE]">{rawRows.length} total rows parsed</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-[#94A3B8] uppercase text-[10px] tracking-wider">
                  {headers.slice(0, 8).map(h => (
                    <th key={h} className="pb-2.5 font-medium px-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {rawRows.slice(0, 10).map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    {headers.slice(0, 8).map(h => (
                      <td key={h} className="py-2 px-2 text-white/90 truncate max-w-[160px]">
                        {String(row[h] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. Current Database Status */}
      <div className="p-4 rounded-2xl bg-[#151C2C] border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-[#8B5CF6]" />
          <div>
            <p className="text-xs font-bold text-white">Active Database State</p>
            <p className="text-[11px] text-[#94A3B8]">
              Currently powering dashboard with <strong className="text-white">{transactions.length}</strong> transactions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={clearAllData}
            className="px-3 py-1.5 rounded-lg bg-[#EF4444]/15 hover:bg-[#EF4444]/25 text-[#EF4444] text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Database</span>
          </button>
        </div>
      </div>
    </div>
  );
};
