import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  Transaction,
  BusinessMetrics,
  ProductSummary,
  CustomerSummary,
  HealthScore,
  Anomaly,
  UserPreferences,
  DateRangePreset,
  User
} from '../types';
import { INITIAL_TRANSACTIONS } from '../data/sampleData';
import {
  filterTransactionsByDate,
  calculateBusinessMetrics,
  getRevenueTimeline,
  getSalesByCategory,
  getCustomerAcquisitionData,
  getProductSummaries,
  getCustomerSummaries,
  calculateBusinessHealthScore,
  detectAnomalies,
  calculateRevenueForecast
} from '../services/analyticsEngine';

export type AppView =
  | 'landing'
  | 'overview'
  | 'analytics'
  | 'csv-import'
  | 'nova-ai'
  | 'forecasting'
  | 'health-score'
  | 'anomalies'
  | 'transactions'
  | 'customers'
  | 'products'
  | 'reports'
  | 'settings'
  | 'auth';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  type: 'info' | 'alert' | 'success';
}

interface BusinessDataContextType {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  activePreset: DateRangePreset;
  setActivePreset: (preset: DateRangePreset) => void;
  metrics: BusinessMetrics;
  productSummaries: ProductSummary[];
  customerSummaries: CustomerSummary[];
  healthScore: HealthScore;
  anomalies: Anomaly[];
  revenueTimeline: ReturnType<typeof getRevenueTimeline>;
  salesByCategory: ReturnType<typeof getSalesByCategory>;
  customerAcquisition: ReturnType<typeof getCustomerAcquisitionData>;
  forecast: ReturnType<typeof calculateRevenueForecast>;
  userPreferences: UserPreferences;
  updateUserPreferences: (prefs: Partial<UserPreferences>) => void;
  importTransactions: (newTx: Transaction[], replace: boolean) => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  resetToDefaultData: () => void;
  clearAllData: () => void;
  currentUser: User | null;
  loginDemoUser: (email?: string, name?: string) => void;
  logout: () => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  formatCurrency: (amount: number) => string;
}

const STORAGE_KEY_TX = 'nova_business_transactions_v1';
const STORAGE_KEY_PREFS = 'nova_business_prefs_v1';
const STORAGE_KEY_USER = 'nova_business_user_v1';

const DEFAULT_PREFS: UserPreferences = {
  businessName: 'Nova Enterprise Inc.',
  currency: '$',
  dateFormat: 'YYYY-MM-DD',
  themeAccent: 'cyan',
};

const DEFAULT_USER: User = {
  id: 'usr-demo-01',
  name: 'Alex Rivera',
  email: 'alex.rivera@novabi.io',
  businessName: 'Nova Enterprise Inc.',
  role: 'Founder & CEO',
  isDemo: true,
};

const BusinessDataContext = createContext<BusinessDataContextType | undefined>(undefined);

export const BusinessDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation View
  const [activeView, setActiveView] = useState<AppView>('landing');

  // Transactions State with localStorage fallback
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TX);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback if storage blocked
    }
    return INITIAL_TRANSACTIONS;
  });

  // User Preferences
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PREFS);
      if (stored) return { ...DEFAULT_PREFS, ...JSON.parse(stored) };
    } catch {}
    return DEFAULT_PREFS;
  });

  // Demo User Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEFAULT_USER; // Default to demo user for seamless test access
  });

  // Date Filter Preset
  const [activePreset, setActivePreset] = useState<DateRangePreset>('all');

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Anomaly Detected',
      desc: 'Significant upward revenue surge detected in recent transactions.',
      time: '12m ago',
      read: false,
      type: 'alert'
    },
    {
      id: 'notif-2',
      title: 'Health Score Calculated',
      desc: 'NOVA updated your Business Vitality score to 84/100.',
      time: '1h ago',
      read: false,
      type: 'info'
    },
    {
      id: 'notif-3',
      title: 'CSV Pipeline Ready',
      desc: 'Real-time schema mapping and column validation is active.',
      time: '3h ago',
      read: true,
      type: 'success'
    }
  ]);

  // Persist transactions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TX, JSON.stringify(transactions));
    } catch {}
  }, [transactions]);

  // Persist preferences
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(userPreferences));
    } catch {}
  }, [userPreferences]);

  // Persist user auth
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch {}
  }, [currentUser]);

  // Filtered transactions based on active preset
  const filteredTransactions = useMemo(() => {
    return filterTransactionsByDate(transactions, activePreset);
  }, [transactions, activePreset]);

  // Computed Business Metrics
  const metrics = useMemo(() => {
    return calculateBusinessMetrics(filteredTransactions);
  }, [filteredTransactions]);

  // Computed Chart Timelines
  const revenueTimeline = useMemo(() => {
    return getRevenueTimeline(filteredTransactions);
  }, [filteredTransactions]);

  const salesByCategory = useMemo(() => {
    return getSalesByCategory(filteredTransactions);
  }, [filteredTransactions]);

  const customerAcquisition = useMemo(() => {
    return getCustomerAcquisitionData(filteredTransactions);
  }, [filteredTransactions]);

  const productSummaries = useMemo(() => {
    return getProductSummaries(filteredTransactions);
  }, [filteredTransactions]);

  const customerSummaries = useMemo(() => {
    return getCustomerSummaries(filteredTransactions);
  }, [filteredTransactions]);

  const healthScore = useMemo(() => {
    return calculateBusinessHealthScore(filteredTransactions);
  }, [filteredTransactions]);

  const anomalies = useMemo(() => {
    return detectAnomalies(filteredTransactions);
  }, [filteredTransactions]);

  const forecast = useMemo(() => {
    return calculateRevenueForecast(filteredTransactions);
  }, [filteredTransactions]);

  // Currency formatter
  const formatCurrency = (amount: number): string => {
    const sym = userPreferences.currency || '$';
    return `${sym}${amount.toLocaleString()}`;
  };

  // Actions
  const updateUserPreferences = (prefs: Partial<UserPreferences>) => {
    setUserPreferences(prev => ({ ...prev, ...prefs }));
  };

  const importTransactions = (newTx: Transaction[], replace: boolean) => {
    if (replace) {
      setTransactions(newTx);
    } else {
      setTransactions(prev => [...newTx, ...prev]);
    }
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Dataset Imported Successfully',
        desc: `${newTx.length} records processed and synced to analytics engine.`,
        time: 'Just now',
        read: false,
        type: 'success'
      },
      ...prev
    ]);
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setTransactions(prev => [newTx, ...prev]);
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Transaction Recorded',
        desc: `${newTx.id} (${newTx.customer}) for ${formatCurrency(newTx.revenue)}`,
        time: 'Just now',
        read: false,
        type: 'info'
      },
      ...prev
    ]);
  };

  const resetToDefaultData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    setUserPreferences(DEFAULT_PREFS);
    setActivePreset('all');
  };

  const clearAllData = () => {
    setTransactions([]);
  };

  const loginDemoUser = (email = 'alex.rivera@novabi.io', name = 'Alex Rivera') => {
    setCurrentUser({
      id: 'usr-demo-01',
      name,
      email,
      businessName: userPreferences.businessName,
      role: 'Founder & CEO',
      isDemo: true
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <BusinessDataContext.Provider
      value={{
        transactions,
        filteredTransactions,
        activePreset,
        setActivePreset,
        metrics,
        productSummaries,
        customerSummaries,
        healthScore,
        anomalies,
        revenueTimeline,
        salesByCategory,
        customerAcquisition,
        forecast,
        userPreferences,
        updateUserPreferences,
        importTransactions,
        addTransaction,
        resetToDefaultData,
        clearAllData,
        currentUser,
        loginDemoUser,
        logout,
        notifications,
        markNotificationRead,
        clearAllNotifications,
        activeView,
        setActiveView,
        formatCurrency,
      }}
    >
      {children}
    </BusinessDataContext.Provider>
  );
};

export const useBusinessData = () => {
  const context = useContext(BusinessDataContext);
  if (!context) {
    throw new Error('useBusinessData must be used within a BusinessDataProvider');
  }
  return context;
};
