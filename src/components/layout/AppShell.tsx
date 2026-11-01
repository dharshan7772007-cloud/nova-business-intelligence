import React, { useState } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { useBusinessData } from '../../context/BusinessDataContext';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { AddTransactionModal } from '../modals/AddTransactionModal';
import { OverviewPage } from '../../pages/OverviewPage';
import { AnalyticsPage } from '../../pages/AnalyticsPage';
import { CsvIntelligencePage } from '../../pages/CsvIntelligencePage';
import { NovaAiPage } from '../../pages/NovaAiPage';
import { ForecastingPage } from '../../pages/ForecastingPage';
import { HealthScorePage } from '../../pages/HealthScorePage';
import { AnomaliesPage } from '../../pages/AnomaliesPage';
import { TransactionsPage } from '../../pages/TransactionsPage';
import { CustomersPage } from '../../pages/CustomersPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { ReportsPage } from '../../pages/ReportsPage';
import { SettingsPage } from '../../pages/SettingsPage';
import { AuthPage } from '../../pages/AuthPage';

export const AppShell: React.FC = () => {
  const { activeView } = useBusinessData();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080B14] flex">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar toggle button */}
        <div className="lg:hidden h-14 bg-[#080B14] border-b border-white/[0.06] px-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.05]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-white text-base">NOVA</span>
            <span className="text-[10px] text-[#22D3EE] font-mono">BI</span>
          </div>
          <div className="w-8" />
        </div>

        {/* Global Navbar */}
        <Navbar onOpenAddModal={() => setAddModalOpen(true)} />

        {/* Dynamic View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeView === 'overview' && <OverviewPage onOpenAddModal={() => setAddModalOpen(true)} />}
          {activeView === 'analytics' && <AnalyticsPage />}
          {activeView === 'csv-import' && <CsvIntelligencePage />}
          {activeView === 'nova-ai' && <NovaAiPage />}
          {activeView === 'forecasting' && <ForecastingPage />}
          {activeView === 'health-score' && <HealthScorePage />}
          {activeView === 'anomalies' && <AnomaliesPage />}
          {activeView === 'transactions' && <TransactionsPage onOpenAddModal={() => setAddModalOpen(true)} />}
          {activeView === 'customers' && <CustomersPage />}
          {activeView === 'products' && <ProductsPage />}
          {activeView === 'reports' && <ReportsPage />}
          {activeView === 'settings' && <SettingsPage />}
          {activeView === 'auth' && <AuthPage />}
        </main>
      </div>

      {/* Record Demo Transaction Modal */}
      <AddTransactionModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
    </div>
  );
};
