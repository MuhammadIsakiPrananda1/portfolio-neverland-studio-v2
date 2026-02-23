import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, DollarSign, Clock, CheckCircle, XCircle, FileText, Sparkles } from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface Invoice {
  id: string;
  client: string;
  project: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  issueDate: string;
  dueDate: string;
}

const defaultInvoices: Invoice[] = [
  { id: 'INV-001', client: 'Tokopedia', project: 'Security Audit', amount: 15000, status: 'paid', issueDate: '2026-01-15', dueDate: '2026-02-15' },
  { id: 'INV-002', client: 'Gojek', project: 'Cloud Migration', amount: 50000, status: 'pending', issueDate: '2026-02-01', dueDate: '2026-03-01' },
  { id: 'INV-003', client: 'Bank BTN', project: 'Network Infrastructure', amount: 75000, status: 'pending', issueDate: '2026-02-10', dueDate: '2026-03-10' },
  { id: 'INV-004', client: 'Traveloka', project: 'Penetration Testing', amount: 12000, status: 'paid', issueDate: '2026-01-20', dueDate: '2026-02-20' },
  { id: 'INV-005', client: 'Bank Mandiri', project: 'Compliance Audit', amount: 25000, status: 'overdue', issueDate: '2026-01-05', dueDate: '2026-02-05' },
  { id: 'INV-006', client: 'Grab', project: 'Mobile App', amount: 45000, status: 'paid', issueDate: '2026-01-25', dueDate: '2026-02-25' },
];

const STORAGE_KEY = 'dashboard_invoices';

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error(`Error loading ${key}:`, e); }
  return defaultValue;
};

export default function DashboardInvoices() {
  const [invoices] = useState<Invoice[]>(() => loadFromStorage(STORAGE_KEY, defaultInvoices));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredInvoices = invoices.filter(i => {
    const matchesSearch = i.client.toLowerCase().includes(searchTerm.toLowerCase()) || i.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || i.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: invoices.reduce((sum, i) => sum + i.amount, 0),
    paid: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0),
    pending: invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0),
    overdue: invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0),
  };

  const getStatusIcon = (status: string) => {
    if (status === 'paid') return <CheckCircle className="w-4 h-4 text-emerald-400" />;
    if (status === 'pending') return <Clock className="w-4 h-4 text-yellow-400" />;
    return <XCircle className="w-4 h-4 text-red-400" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'paid') return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
    if (status === 'pending') return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
    return 'bg-red-500/10 border-red-500/30 text-red-400';
  };

  return (
    <div className="space-y-6">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="relative">
        <div className="relative border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-10 overflow-hidden glass shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-70" />
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-purple-400/20 bg-purple-500/5 backdrop-blur-sm shadow-lg shadow-purple-500/5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">Invoices</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-4 tracking-tight">
                <span className="text-white drop-shadow-md">
                  Finance &{' '}
                </span>
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent filter drop-shadow-lg">
                  Billing
                </span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                Track payments, manage pending invoices, and monitor your agency's cash flow.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <DollarSign className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">${(stats.total / 1000).toFixed(0)}K</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Total Amount</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">${(stats.paid / 1000).toFixed(0)}K</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Paid Invoices</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-yellow-500/20 border border-yellow-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">${(stats.pending / 1000).toFixed(0)}K</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Pending</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">${(stats.overdue / 1000).toFixed(0)}K</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Overdue</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/[0.02] p-4 rounded-2xl border border-white/5 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-emerald-400 transition-colors z-10" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="relative pl-11 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] w-64 md:w-80 transition-all duration-300"
            />
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="relative px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] appearance-none transition-all duration-300 pr-10 cursor-pointer"
            >
              <option value="all" className="bg-dark-900">All Status</option>
              <option value="paid" className="bg-dark-900">Paid</option>
              <option value="pending" className="bg-dark-900">Pending</option>
              <option value="overdue" className="bg-dark-900">Overdue</option>
            </select>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5">{filteredInvoices.length} invoices found</p>
      </div>

      <div className="glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Invoice ID</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Client</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Project</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Amount</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-white/[0.04] transition-colors group cursor-pointer">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-white font-bold group-hover:text-emerald-400 transition-colors">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-300 font-medium group-hover:text-white transition-colors">{invoice.client}</td>
                  <td className="px-6 py-5 text-gray-400 font-medium">{invoice.project}</td>
                  <td className="px-6 py-5 text-white font-heading font-bold tracking-tight text-lg">${invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      <span className="uppercase tracking-wider">{invoice.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-5 text-gray-500 font-medium group-hover:text-gray-300 transition-colors">
                    {new Date(invoice.dueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
