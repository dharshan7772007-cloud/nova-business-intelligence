import React from 'react';
import {
  LayoutDashboard,
  LineChart,
  FileSpreadsheet,
  Sparkles,
  TrendingUp,
  Activity,
  AlertOctagon,
  ArrowRightLeft,
  Users,
  Package,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Compass,
  Globe
} from 'lucide-react';
import { useBusinessData, AppView } from '../../context/BusinessDataContext';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile
}) => {
  const { activeView, setActiveView, anomalies, healthScore } = useBusinessData();

  const navItems: {
    id: AppView;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'csv-import', label: 'CSV Intelligence', icon: FileSpreadsheet, badge: 'Smart' },
    { id: 'nova-ai', label: 'NOVA Intelligence', icon: Sparkles, badge: 'AI', badgeColor: 'bg-[#8B5CF6]/20 text-[#22D3EE] border-[#8B5CF6]/30' },
    { id: 'forecasting', label: 'Forecasting', icon: TrendingUp },
    { id: 'health-score', label: 'Health Score', icon: Activity, badge: `${healthScore.totalScore}/100` },
    { id: 'anomalies', label: 'Anomalies', icon: AlertOctagon, badge: anomalies.length > 0 ? anomalies.length : undefined, badgeColor: 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30' },
    { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen bg-[#080B14] border-r border-white/[0.06] transition-all duration-300 flex flex-col justify-between ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Top Branding Section */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.06]">
            <button
              type="button"
              onClick={() => {
                setActiveView('landing');
                onCloseMobile();
              }}
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              {/* NOVA Brand Icon */}
              <div className="relative h-9 w-9 rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#6366F1] to-[#22D3EE] p-[1.5px] shadow-lg shadow-[#8B5CF6]/20 group-hover:shadow-[#22D3EE]/30 transition-shadow">
                <div className="h-full w-full bg-[#080B14] rounded-[10.5px] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm shadow-white" />
                  </div>
                </div>
              </div>

              {!collapsed && (
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading text-lg font-bold tracking-wider text-white">
                      NOVA
                    </span>
                    <span className="text-[10px] text-[#22D3EE] font-mono tracking-widest uppercase">
                      BI
                    </span>
                  </div>
                  <p className="text-[10px] text-[#94A3B8] tracking-tight">See Beyond Your Numbers</p>
                </div>
              )}
            </button>

            {/* Desktop Collapse Toggle */}
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-colors"
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)]">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveView(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#8B5CF6]/20 to-[#22D3EE]/10 text-white border border-[#8B5CF6]/30 shadow-sm shadow-[#8B5CF6]/10'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.04]'
                  } ${collapsed ? 'justify-center' : 'justify-between'}`}
                  title={collapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#22D3EE]' : 'text-[#94A3B8]'}`} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!collapsed && item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                        item.badgeColor || 'bg-white/[0.06] text-[#94A3B8] border-white/[0.08]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom External & Landing Link */}
        <div className="p-3 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={() => {
              setActiveView('landing');
              onCloseMobile();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.04] transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
            title="Public Landing Page"
          >
            <Globe className="w-4 h-4 text-[#8B5CF6]" />
            {!collapsed && <span>Public Landing Page</span>}
          </button>

          {!collapsed && (
            <div className="mt-2 pt-2 border-t border-white/[0.04] px-1 flex items-center justify-between text-[10px] text-[#94A3B8]/60">
              <span>D7 Studio Portfolio</span>
              <span>v2.4 Pro</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
