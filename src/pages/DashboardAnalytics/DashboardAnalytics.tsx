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
  const [stats] = useState<AnalyticsStats>(() => loadFromStorage(STORAGE_KEY, defaultStats));
  const [revenueData] = useState<RevenueData[]>(defaultRevenueData);
  const [topServices] = useState<TopService[]>(defaultTopServices);

  useEffect(() => {
    saveToStorage(STORAGE_KEY, stats);
  }, [stats]);

  const formatCurrency = (value: number | undefined | null) => {
    if (value === undefined || value === null) return '$0';
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  const formatNumber = (value: number | undefined | null) => {
    if (value === undefined || value === null) return '0';
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const statsCards = [
    {
      label: 'Total Revenue',
      value: formatCurrency(stats?.totalRevenue),
      change: `${stats && typeof stats.revenueChange === 'number' ? (stats.revenueChange > 0 ? '+' : '') + stats.revenueChange.toFixed(1) + '%' : '-'}`,
      trend: (stats?.revenueChange ?? 0) >= 0 ? 'up' : 'down',
      icon: DollarSign,
      bgColor: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
      changeColor: (stats?.revenueChange ?? 0) >= 0 ? 'text-emerald-400' : 'text-red-400'
    },
    {
      label: 'New Clients',
      value: formatNumber(stats?.newClients),
      change: `${(stats?.clientsChange ?? 0) > 0 ? '+' : ''}${(stats?.clientsChange ?? 0).toFixed(1)}%`,
      trend: (stats?.clientsChange ?? 0) >= 0 ? 'up' : 'down',
      icon: Users,
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      changeColor: (stats?.clientsChange ?? 0) >= 0 ? 'text-blue-400' : 'text-red-400'
    },
    {
      label: 'Projects Sold',
      value: (stats?.projectsSold ?? 0).toString(),
      change: `${(stats?.projectsChange ?? 0) > 0 ? '+' : ''}${(stats?.projectsChange ?? 0).toFixed(1)}%`,
      trend: (stats?.projectsChange ?? 0) >= 0 ? 'up' : 'down',
      icon: ShoppingCart,
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
      changeColor: (stats?.projectsChange ?? 0) >= 0 ? 'text-purple-400' : 'text-red-400'
    },
    {
      label: 'Page Views',
      value: formatNumber(stats?.pageViews),
      change: `${(stats?.pageViewsChange ?? 0) > 0 ? '+' : ''}${(stats?.pageViewsChange ?? 0).toFixed(1)}%`,
      trend: (stats?.pageViewsChange ?? 0) >= 0 ? 'up' : 'down',
      icon: Eye,
      bgColor: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
      changeColor: (stats?.pageViewsChange ?? 0) >= 0 ? 'text-amber-400' : 'text-red-400'
    },
  ];

  const revenueGrowth = ((revenueData[revenueData.length - 1].revenue - revenueData[0].revenue) / revenueData[0].revenue * 100).toFixed(1);
  const clientRetention = 94.2;
  const avgProjectValue = 12500;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 shadow-lg shadow-purple-500/10">
            <BarChart3 className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-heading font-black text-white tracking-tight">Analytics <span className="text-primary">Overview</span></h1>
            <p className="text-gray-400 mt-1">Track your business performance and growth metrics</p>
          </div>
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
            className={`relative rounded-2xl p-6 glass border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl group overflow-hidden`}
          >
            <div className={`absolute inset-0 opacity-10 ${stat.bgColor} group-hover:opacity-20 transition-opacity duration-300`} />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-black/20 border border-white/5 backdrop-blur-md ${stat.changeColor} shadow-sm group-hover:shadow-md transition-shadow`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-3xl lg:text-4xl font-heading font-black text-white mb-2 drop-shadow-md tracking-tight">{stat.value}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl glass border border-white/10 shadow-2xl p-6 lg:p-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-transparent opacity-50" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xl font-heading font-bold text-white mb-1">Revenue Overview</h2>
              <p className="text-sm text-gray-400">Monthly revenue compared to project count</p>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 text-white font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white/[0.05]">
              This Year
            </button>
          </div>

          <div className="space-y-5">
            {revenueData.map((data, index) => (
              <div key={data.month} className="group/bar relative">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 font-semibold w-12 group-hover/bar:text-white transition-colors">{data.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="h-10 bg-black/20 rounded-xl overflow-hidden shadow-inner border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(data.revenue / 70000) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1, type: "spring", bounce: 0.2 }}
                        className="h-full bg-gradient-to-r from-primary/80 to-secondary flex items-center justify-end pr-4 rounded-r-xl relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/bar:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                        <span className="text-sm font-bold text-white drop-shadow-md z-10">
                          ${(data.revenue / 1000).toFixed(0)}K
                        </span>
                      </motion.div>
                    </div>
                  </div>
                  <span className="text-gray-500 font-medium text-sm w-20 text-right group-hover/bar:text-gray-300 transition-colors bg-white/5 px-2 py-1 rounded-lg">{data.projects} proj.</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 rounded-2xl glass border border-white/10 shadow-2xl p-6 lg:p-8">
          <h2 className="text-xl font-heading font-bold text-white mb-1">Top Services</h2>
          <p className="text-sm text-gray-400 mb-8">Best performing revenue streams</p>

          <div className="space-y-4">
            {topServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.04] group shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white mb-1 group-hover:text-primary transition-colors">{service.name}</h3>
                    <p className="text-xs font-medium text-gray-400 bg-black/20 inline-block px-2 py-0.5 rounded-md">{service.projects} projects</p>
                  </div>
                  <span className="text-emerald-400 text-xs font-black bg-emerald-400/10 px-2 py-1 rounded-lg border border-emerald-400/20 shadow-sm">+{service.growth}%</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-2">
                  <span className="text-xl font-heading font-bold text-white tracking-tight">${formatCurrency(service.revenue)}</span>
                  <div className="relative">
                    <div className={`absolute inset-0 bg-${service.color}-500 blur-sm rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />
                    <div className={`w-3 h-3 rounded-full bg-${service.color}-500 relative z-10 border border-white/20`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl glass border border-white/10 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Revenue Growth</h3>
            </div>
            <p className="text-4xl font-heading font-black text-emerald-400 mb-1 drop-shadow-md">+{revenueGrowth}%</p>
            <p className="text-xs font-medium text-emerald-500/80 bg-emerald-500/10 inline-block px-2 py-1 rounded-md">Compared to last month</p>
          </div>
        </div>

        <div className="rounded-2xl glass border border-white/10 bg-blue-500/5 hover:bg-blue-500/10 transition-colors p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Client Retention</h3>
            </div>
            <p className="text-4xl font-heading font-black text-blue-400 mb-1 drop-shadow-md">{clientRetention}%</p>
            <p className="text-xs font-medium text-blue-500/80 bg-blue-500/10 inline-block px-2 py-1 rounded-md">Currently active clients</p>
          </div>
        </div>

        <div className="rounded-2xl glass border border-white/10 bg-purple-500/5 hover:bg-purple-500/10 transition-colors p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Avg Project Value</h3>
            </div>
            <p className="text-4xl font-heading font-black text-purple-400 mb-1 drop-shadow-md">${formatCurrency(avgProjectValue)}</p>
            <p className="text-xs font-medium text-purple-500/80 bg-purple-500/10 inline-block px-2 py-1 rounded-md">Per completed project</p>
          </div>
        </div>
      </div>
    </div>
  );
}
