import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  FolderKanban,
  Eye,
  BarChart3
} from 'lucide-react';
import { staggerContainer, staggerItem } from '@utils/animations';

const reports = [
  {
    id: 1,
    title: 'Monthly Revenue Report',
    description: 'Detailed revenue breakdown for February 2026',
    type: 'Financial',
    date: '2026-02-01',
    size: '2.4 MB',
    status: 'Ready',
    icon: DollarSign,
    bgColor: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400'
  },
  {
    id: 2,
    title: 'Client Activity Report',
    description: 'Client engagement and project status overview',
    type: 'Analytics',
    date: '2026-02-05',
    size: '1.8 MB',
    status: 'Ready',
    icon: Users,
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-400'
  },
  {
    id: 3,
    title: 'Project Performance',
    description: 'Q1 2026 project completion and timeline analysis',
    type: 'Operations',
    date: '2026-02-10',
    size: '3.2 MB',
    status: 'Ready',
    icon: FolderKanban,
    bgColor: 'bg-purple-500/10',
    iconColor: 'text-purple-400'
  },
  {
    id: 4,
    title: 'Traffic Analytics',
    description: 'Website traffic and user behavior metrics',
    type: 'Analytics',
    date: '2026-02-12',
    size: '1.5 MB',
    status: 'Processing',
    icon: TrendingUp,
    bgColor: 'bg-amber-500/10',
    iconColor: 'text-amber-400'
  },
  {
    id: 5,
    title: 'Sales Summary Report',
    description: 'Monthly sales performance and conversion rates',
    type: 'Financial',
    date: '2026-02-08',
    size: '2.1 MB',
    status: 'Ready',
    icon: BarChart3,
    bgColor: 'bg-pink-500/10',
    iconColor: 'text-pink-400'
  },
  {
    id: 6,
    title: 'Team Productivity Report',
    description: 'Team performance metrics and efficiency analysis',
    type: 'Operations',
    date: '2026-02-11',
    size: '1.9 MB',
    status: 'Ready',
    icon: Users,
    bgColor: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400'
  },
];

const quickStats = [
  {
    label: 'Total Reports',
    value: '48',
    icon: FileText,
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-400'
  },
  {
    label: 'This Month',
    value: '12',
    icon: Calendar,
    bgColor: 'bg-purple-500/10',
    iconColor: 'text-purple-400'
  },
  {
    label: 'Downloads',
    value: '234',
    icon: Download,
    bgColor: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400'
  },
];

export default function DashboardReports() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Reports</h1>
          </div>
          <p className="text-gray-400">Access your business reports and analytics</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105">
          <FileText className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {quickStats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={staggerItem as any}
            className={`relative rounded-xl p-6 border border-white/5 ${stat.bgColor}`}
          >
            <stat.icon className={`w-5 h-5 ${stat.iconColor} mb-3`} />
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-medium transition-all duration-300">
            All Reports
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-white/10 text-sm font-medium transition-all duration-300">
            Financial
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-white/10 text-sm font-medium transition-all duration-300">
            Analytics
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-white/10 text-sm font-medium transition-all duration-300">
            Operations
          </button>
        </div>
        <button className="px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-white/10 transition-all duration-300 flex items-center gap-2 sm:ml-auto">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 transition-all duration-300 group"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              {/* Icon */}
              <div className={`p-3 rounded-xl ${report.bgColor} border border-white/5`}>
                <report.icon className={`w-6 h-6 ${report.iconColor}`} />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                      {report.title}
                    </h3>
                    <p className="text-sm text-gray-500">{report.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.02] border border-white/5">
                    {report.type}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <span>{report.size}</span>
                  <span className={`px-2 py-0.5 rounded-md font-medium ${
                    report.status === 'Ready'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {report.status}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-white/10 transition-all duration-300 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Preview</span>
                </button>
                <button className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all duration-300 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
