import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CreditCard, DollarSign, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
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
        <div className="relative border border-white/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5">
                  <CreditCard className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Invoices</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black mb-2">
                <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                  Invoice Management
                </span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base max-w-xl">
                Track and manage all your invoices and payments.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <DollarSign className="w-5 h-5 text-white mb-3" />
          <h3 className="text-2xl font-bold text-white">${(stats.total / 1000).toFixed(0)}K</h3>
          <p className="text-sm text-gray-400">Total Amount</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <CheckCircle className="w-5 h-5 text-emerald-400 mb-3" />
          <h3 className="text-2xl font-bold text-white">${(stats.paid / 1000).toFixed(0)}K</h3>
          <p className="text-sm text-gray-400">Paid</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <Clock className="w-5 h-5 text-yellow-400 mb-3" />
          <h3 className="text-2xl font-bold text-white">${(stats.pending / 1000).toFixed(0)}K</h3>
          <p className="text-sm text-gray-400">Pending</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <XCircle className="w-5 h-5 text-red-400 mb-3" />
          <h3 className="text-2xl font-bold text-white">${(stats.overdue / 1000).toFixed(0)}K</h3>
          <p className="text-sm text-gray-400">Overdue</p>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search invoices..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 w-64" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none">
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <p className="text-sm text-gray-500">{filteredInvoices.length} invoices found</p>
      </div>

      <div className="glass rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Invoice</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Project</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-white font-medium">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{invoice.client}</td>
                  <td className="px-6 py-4 text-gray-400">{invoice.project}</td>
                  <td className="px-6 py-4 text-white font-medium">${invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
