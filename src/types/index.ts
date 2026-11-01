export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  customer: string;
  customerEmail?: string;
  product: string;
  category: string;
  quantity: number;
  unitPrice: number;
  revenue: number;
  status: 'completed' | 'processing' | 'refunded' | 'pending';
  channel: 'Online Store' | 'B2B Wholesale' | 'Direct Sales' | 'Marketplace';
}

export interface ProductSummary {
  id: string;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
  avgPrice: number;
  trend: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Backordered';
}

export interface CustomerSummary {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  ordersCount: number;
  lastOrderDate: string;
  segment: 'Champion' | 'Loyal' | 'At-Risk' | 'New';
  avgOrderValue: number;
}

export interface BusinessMetrics {
  totalRevenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  averageOrderValue: number;
  aovChange: number;
  totalCustomers: number;
  customersChange: number;
  completedRate: number;
}

export interface HealthFactor {
  score: number;
  max: number;
  label: string;
  status: 'optimal' | 'good' | 'warning' | 'critical';
  detail: string;
}

export interface HealthScore {
  totalScore: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';
  status: string;
  factors: {
    revenueTrend: HealthFactor;
    orderConsistency: HealthFactor;
    customerRetention: HealthFactor;
    averageOrderValue: HealthFactor;
    productPerformance: HealthFactor;
  };
  recommendations: string[];
}

export interface Anomaly {
  id: string;
  type: 'spike' | 'drop' | 'margin' | 'volume' | 'customer';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  affectedMetric: string;
  dateRange: string;
  measuredChange: string;
  explanation: string;
  suggestedInvestigation: string;
}

export interface ForecastPoint {
  date: string;
  historical?: number;
  forecast?: number;
  lowerBound?: number;
  upperBound?: number;
}

export interface UserPreferences {
  businessName: string;
  currency: string;
  dateFormat: 'YYYY-MM-DD' | 'MM/DD/YYYY' | 'DD/MM/YYYY';
  themeAccent: 'cyan' | 'purple' | 'emerald';
}

export type DateRangePreset = 'all' | 'last7' | 'last30' | 'last90' | 'last365';

export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  role: string;
  isDemo: boolean;
}
