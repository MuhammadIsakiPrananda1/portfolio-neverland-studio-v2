import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { staggerContainer, staggerItem } from '@utils/animations';

interface AnalyticsStats {
  totalRevenue: number;
  newClients: number;
  projectsSold: number;
  pageViews: number;
  revenueChange: number;
  clientsChange: number;
  projectsChange: number;
  pageViewsChange: number;
}

interface RevenueData {
  month: string;
  revenue: number;
  projects: number;
}

interface TopService {
  name: string;
  revenue: number;
  projects: number;
  growth: number;
  color: string;
}

const STORAGE_KEY = 'dashboard_analytics';

const defaultStats: AnalyticsStats = {
  totalRevenue: 145231,
  newClients: 2456,
  projectsSold: 145,
  pageViews: 89200,
  revenueChange: 20.1,
  clientsChange: 12.5,
  projectsChange: 8.2,
  pageViewsChange: -3.4,
};

const defaultRevenueData: RevenueData[] = [
  { month: 'Jan', revenue: 45000, projects: 12 },
  { month: 'Feb', revenue: 52000, projects: 15 },
  { month: 'Mar', revenue: 48000, projects: 13 },
  { month: 'Apr', revenue: 61000, projects: 18 },
  { month: 'May', revenue: 55000, projects: 16 },
  { month: 'Jun', revenue: 68000, projects: 20 },
];

const defaultTopServices: TopService[] = [
  { name: 'Web Development', revenue: 45230, projects: 28, growth: 15, color: 'blue' },
  { name: 'Cyber Security', revenue: 38450, projects: 22, growth: 22, color: 'purple' },
  { name: 'Cloud Solutions', revenue: 32100, projects: 18, growth: 18, color: 'emerald' },
  { name: 'IT Consulting', revenue: 28890, projects: 25, growth: 12, color: 'amber' },
];

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
  }
  return defaultValue;
};

const saveToStorage = <T,>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
};

export default function DashboardAnalytics() {
  const [stats, setStats] = useState<AnalyticsStats>(() => loadFromStorage(STORAGE_KEY, defaultStats));
  const [revenueData] = useState<RevenueData[]>(defaultRevenueData);
  const [topServices] = useState<TopService[]>(defaultTopServices);

  useEffect(() => {
    saveToStorage(STORAGE_KEY, stats);
  }, [stats]);

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const statsCards = [
    {
      label: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      change: `${stats && typeof stats.revenueChange === 'number' ? (stats.revenueChange > 0 ? '+' : '') + stats.revenueChange.toFixed(1) + '%' : '-'}`,
      trend: stats.revenueChange >= 0 ? 'up' : 'down',
      icon: DollarSign,
      bgColor: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
      changeColor: stats.revenueChange >= 0 ? 'text-emerald-400' : 'text-red-400'
    },
    {
      label: 'New Clients',
      value: formatNumber(stats.newClients),
      change: `${stats.clientsChange > 0 ? '+' : ''}${stats.clientsChange.toFixed(1)}%`,
      trend: stats.clientsChange >= 0 ? 'up' : 'down',
      icon: Users,
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      changeColor: stats.clientsChange >= 0 ? 'text-blue-400' : 'text-red-400'
    },
    {
      label: 'Projects Sold',
      value: stats.projectsSold.toString(),
      change: `${stats.projectsChange > 0 ? '+' : ''}${stats.projectsChange.toFixed(1)}%`,
      trend: stats.projectsChange >= 0 ? 'up' : 'down',
      icon: ShoppingCart,
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
      changeColor: stats.projectsChange >= 0 ? 'text-purple-400' : 'text-red-400'
    },
    {
      label: 'Page Views',
      value: formatNumber(stats.pageViews),
      change: `${stats.pageViewsChange > 0 ? '+' : ''}${stats.pageViewsChange.toFixed(1)}%`,
      trend: stats.pageViewsChange >= 0 ? 'up' : 'down',
      icon: Eye,
      bgColor: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
      changeColor: stats.pageViewsChange >= 0 ? 'text-amber-400' : 'text-red-400'
    },
  ];

  const revenueGrowth = ((revenueData[revenueData.length - 1].revenue - revenueData[0].revenue) / revenueData[0].revenue * 100).toFixed(1);
  const clientRetention = 94.2;
  const avgProjectValue = 12500;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <BarChart3 className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Track your business performance</p>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {statsCards.map((stat) => (
          <motion.div
            key={stat.label}
            variants={staggerItem}
            className={`relative rounded-xl p-6 border border-white/5 ${stat.bgColor} group`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-white/5 border border-white/5`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${stat.changeColor}`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Revenue Overview</h2>
              <p className="text-sm text-gray-500">Monthly revenue and project count</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-all duration-300">
              This Year
            </button>
          </div>

          <div className="space-y-4">
            {revenueData.map((data, index) => (
              <div key={data.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 font-medium w-12">{data.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="h-8 bg-white/5 rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(data.revenue / 70000) * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="h-full bg-blue-500 flex items-center justify-end pr-3"
                      >
                        <span className="text-xs font-bold text-white">
                          ${(data.revenue / 1000).toFixed(0)}K
                        </span>
                      </motion.div>
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs w-16 text-right">{data.projects} projects</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <h2 className="text-lg font-bold text-white mb-1">Top Services</h2>
          <p className="text-sm text-gray-500 mb-6">Best performing services</p>

          <div className="space-y-4">
            {topServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white mb-1">{service.name}</h3>
                    <p className="text-xs text-gray-500">{service.projects} projects</p>
                  </div>
                  <span className="text-emerald-400 text-xs font-bold">+{service.growth}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white">${formatCurrency(service.revenue)}</span>
                  <div className={`w-2 h-2 rounded-full bg-${service.color}-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-white/5 bg-emerald-500/10 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-semibold text-gray-400">Revenue Growth</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-400 mb-1">+{revenueGrowth}%</p>
          <p className="text-xs text-gray-500">Compared to last month</p>
        </div>

        <div className="rounded-xl border border-white/5 bg-blue-500/10 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-sm font-semibold text-gray-400">Client Retention</h3>
          </div>
          <p className="text-3xl font-bold text-blue-400 mb-1">{clientRetention}%</p>
          <p className="text-xs text-gray-500">Currently active clients</p>
        </div>

        <div className="rounded-xl border border-white/5 bg-purple-500/10 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <ShoppingCart className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-sm font-semibold text-gray-400">Avg Project Value</h3>
          </div>
          <p className="text-3xl font-bold text-purple-400 mb-1">${formatCurrency(avgProjectValue)}</p>
          <p className="text-xs text-gray-500">Per completed project</p>
        </div>
      </div>
    </div>
  );
}
