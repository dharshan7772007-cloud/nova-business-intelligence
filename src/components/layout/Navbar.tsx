import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  ChevronDown,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Info,
  UserCheck,
  LogOut,
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useBusinessData, AppView } from '../../context/BusinessDataContext';
import { DateRangePreset } from '../../types';

interface NavbarProps {
  onOpenAddModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAddModal }) => {
  const {
    activePreset,
    setActivePreset,
    filteredTransactions,
    transactions,
    currentUser,
    loginDemoUser,
    logout,
    notifications,
    markNotificationRead,
    clearAllNotifications,
    userPreferences,
    setActiveView
  } = useBusinessData();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPresetDropdown, setShowPresetDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const presetLabels: Record<DateRangePreset, string> = {
    all: 'All Time Records',
    last7: 'Last 7 Days',
    last30: 'Last 30 Days',
    last90: 'Last 90 Days',
    last365: 'Last 365 Days'
  };

  const isCustomDataset = transactions.length !== 50; // default length

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-white/[0.06] bg-[#080B14]/85 backdrop-blur-xl px-4 lg:px-6 flex items-center justify-between gap-4">
      {/* Left Workspace Indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] p-[1px] shadow-sm shadow-[#8B5CF6]/20">
            <div className="h-full w-full bg-[#151C2C] rounded-[7px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#22D3EE]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-wide text-[#F8FAFC]">
                {userPreferences.businessName}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30">
                PRO
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              <span>{filteredTransactions.length} active records</span>
              {isCustomDataset && (
                <span className="text-[#22D3EE] bg-[#22D3EE]/10 px-1 rounded text-[10px]">Custom Data</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Date Range Selector */}
      <div className="hidden md:flex items-center gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPresetDropdown(!showPresetDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#151C2C] hover:bg-[#1C263B] border border-white/[0.08] text-xs font-medium text-[#F8FAFC] transition-colors shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>{presetLabels[activePreset]}</span>
            <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
          </button>

          {showPresetDropdown && (
            <div className="absolute top-full mt-1 left-0 w-44 rounded-lg bg-[#151C2C] border border-white/[0.08] py-1 shadow-2xl z-50">
              {(Object.keys(presetLabels) as DateRangePreset[]).map(key => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActivePreset(key);
                    setShowPresetDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                    activePreset === key ? 'bg-[#8B5CF6]/20 text-[#22D3EE]' : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {presetLabels[key]}
                  {activePreset === key && <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Add Demo Transaction Button */}
        <button
          type="button"
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          title="Add a sample transaction to test real-time recalculation"
        >
          <Plus className="w-3.5 h-3.5 text-[#22D3EE]" />
          <span>Add Transaction</span>
        </button>

        {/* Import CSV shortcut */}
        <button
          type="button"
          onClick={() => setActiveView('csv-import')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/25 border border-[#8B5CF6]/30 text-xs text-[#C084FC] transition-colors"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Import CSV</span>
        </button>
      </div>

      {/* Right User & Utility Controls */}
      <div className="flex items-center gap-2.5">
        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-[#151C2C] hover:bg-[#1C263B] border border-white/[0.08] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
            title="System Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#8B5CF6] text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-[#151C2C] border border-white/[0.08] shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06]">
                <span className="text-xs font-semibold text-[#F8FAFC] uppercase tracking-wider">
                  Live Insights & Alerts
                </span>
                <button
                  type="button"
                  onClick={clearAllNotifications}
                  className="text-[11px] text-[#94A3B8] hover:text-white"
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-xs text-[#94A3B8] py-4 text-center">No active notifications</p>
                ) : (
                  notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-2 rounded-lg text-xs transition-colors cursor-pointer border ${
                        notif.read
                          ? 'bg-transparent border-transparent opacity-60'
                          : 'bg-white/[0.03] border-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {notif.type === 'alert' && <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 mt-0.5" />}
                        {notif.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />}
                        {notif.type === 'info' && <Info className="w-3.5 h-3.5 text-[#22D3EE] shrink-0 mt-0.5" />}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#F8FAFC]">{notif.title}</p>
                          <p className="text-[11px] text-[#94A3B8] line-clamp-2 mt-0.5">{notif.desc}</p>
                          <span className="text-[10px] text-[#94A3B8]/70 mt-1 block">{notif.time}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Auth Profile Menu */}
        <div className="relative">
          {currentUser ? (
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-lg bg-[#151C2C] hover:bg-[#1C263B] border border-white/[0.08] transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left text-xs pr-1">
                <span className="block font-medium text-[#F8FAFC] leading-none">{currentUser.name}</span>
                <span className="text-[10px] text-[#22D3EE] leading-none">Demo User</span>
              </div>
              <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => loginDemoUser()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-medium transition-colors shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Demo Login</span>
            </button>
          )}

          {showUserMenu && currentUser && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[#151C2C] border border-white/[0.08] shadow-2xl p-2 z-50">
              <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                <p className="text-xs font-semibold text-[#F8FAFC]">{currentUser.name}</p>
                <p className="text-[11px] text-[#94A3B8] truncate">{currentUser.email}</p>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-[#22D3EE] bg-[#22D3EE]/10 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Demonstration Mode Active</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowUserMenu(false);
                  setActiveView('settings');
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.04] rounded-md transition-colors"
              >
                Settings & Preferences
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUserMenu(false);
                  logout();
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-[#EF4444] hover:bg-[#EF4444]/10 rounded-md transition-colors flex items-center gap-2 mt-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
