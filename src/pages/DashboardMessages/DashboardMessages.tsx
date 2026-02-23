import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Archive,
  Sparkles,
} from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface Message {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  message: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}

const STORAGE_KEY = 'dashboard_messages';

const defaultMessages: Message[] = [
  { id: 1, name: 'Ahmad Rizki', email: 'ahmad@techcorp.com', company: 'TechCorp Indonesia', phone: '+62812345678', status: 'new', message: 'Interested in penetration testing services for our e-commerce platform. Please provide quote.', type: 'security-audit', priority: 'high', created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
  { id: 2, name: 'Sarah Chen', email: 'sarah@cloudasia.io', company: 'CloudAsia', phone: '+62898765432', status: 'new', message: 'Need cloud security assessment and compliance review for our AWS infrastructure.', type: 'cloud-security', priority: 'medium', created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: 3, name: 'Budi Santoso', email: 'budi@startup.id', company: 'StartupID', phone: '+62811223344', status: 'read', message: 'Web application security audit request for our fintech product. Urgently needed.', type: 'penetration-testing', priority: 'high', created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: 4, name: 'Lisa Wang', email: 'lisa@megadata.com', company: 'MegaData Solutions', phone: '+62855667788', status: 'replied', message: 'Follow up on infrastructure monitoring proposal sent last week. Would like to schedule a call.', type: 'consulting', priority: 'low', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: 5, name: 'Dimas Prasetyo', email: 'dimas@fintech.co.id', company: 'FinTech Co', phone: '+62899887766', status: 'new', message: 'PCI DSS compliance consultation for our payment system. Need certification help.', type: 'compliance', priority: 'high', created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString() },
  { id: 6, name: 'Ayu Lestari', email: 'ayu@govtech.go.id', company: 'GovTech Agency', phone: '+62844556677', status: 'read', message: 'Government network security assessment RFP. Attached terms of reference.', type: 'network-security', priority: 'medium', created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
  { id: 7, name: 'Kevin Tan', email: 'kevin@ecom.sg', company: 'E-Com Singapore', phone: '+651234567', status: 'archived', message: 'E-commerce platform security review completed. Thank you for the service.', type: 'security-audit', priority: 'low', created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() },
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

const messageTypes = ['general', 'security-audit', 'penetration-testing', 'cloud-security', 'consulting', 'compliance', 'network-security'];

export default function DashboardMessages() {
  const [messages, setMessages] = useState<Message[]>(() => loadFromStorage(STORAGE_KEY, defaultMessages));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [deletingMessage, setDeletingMessage] = useState<Message | null>(null);
  const [formData, setFormData] = useState<Partial<Message>>({});

  useEffect(() => {
    saveToStorage(STORAGE_KEY, messages);
  }, [messages]);

  const filteredMessages = messages.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.email.toLowerCase().includes(searchTerm.toLowerCase()) || m.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || m.status === filterStatus;
    const matchesType = filterType === 'all' || m.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSave = () => {
    if (editingMessage) {
      setMessages(prev => prev.map(m => m.id === editingMessage.id ? { ...m, ...formData } as Message : m));
    } else {
      setMessages(prev => [{
        id: Date.now(),
        ...formData,
        created_at: new Date().toISOString(),
      } as Message, ...prev]);
    }
    setShowAddModal(false);
    setEditingMessage(null);
    setFormData({});
  };

  const handleDelete = () => {
    if (deletingMessage) {
      setMessages(prev => prev.filter(m => m.id !== deletingMessage.id));
      setDeletingMessage(null);
    }
  };

  const handleStatusChange = (id: number, status: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: status as any } : m));
  };

  const getTimeSince = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-primary/10 border-primary/30 text-primary',
      'read': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
      'replied': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      'archived': 'bg-gray-500/10 border-gray-500/30 text-gray-400',
    };
    return colors[status] || colors['new'];
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'high': 'text-red-400',
      'medium': 'text-yellow-400',
      'low': 'text-gray-400',
    };
    return colors[priority] || colors['low'];
  };

  const stats = {
    total: messages.length,
    new: messages.filter(m => m.status === 'new').length,
    read: messages.filter(m => m.status === 'read').length,
    replied: messages.filter(m => m.status === 'replied').length,
  };

  return (
    <div className="space-y-6">
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <div className="relative border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-10 overflow-hidden glass shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-secondary/5 via-transparent to-accent/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-70" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-purple-400/20 bg-purple-500/5 backdrop-blur-sm shadow-lg shadow-purple-500/5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">Inbox</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-4 tracking-tight">
                <span className="text-white drop-shadow-md">
                  Message{' '}
                </span>
                <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent filter drop-shadow-lg">
                  Center
                </span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                Manage, filter, and respond to incoming inquiries from your clients and prospects.
              </p>
            </div>

            <button
              onClick={() => { setShowAddModal(true); setEditingMessage(null); setFormData({}); }}
              className="group relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-secondary to-accent text-white font-bold text-sm hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300 overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Plus className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
              <span className="relative z-10">Compose Message</span>
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-primary/20 border border-primary/30 shadow-inner group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">{stats.total}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Total Messages</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <AlertCircle className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded-md">{stats.new} NEW</span>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">{stats.new}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Unread</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">{stats.replied}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Replied</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gray-500/20 border border-gray-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <Archive className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">{messages.filter(m => m.status === 'archived').length}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Archived</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/[0.02] p-4 rounded-2xl border border-white/5 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-secondary transition-colors z-10" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="relative pl-11 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-secondary/50 focus:bg-white/[0.05] w-64 md:w-80 transition-all duration-300"
            />
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="relative px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-secondary/50 focus:bg-white/[0.05] appearance-none transition-all duration-300 pr-10 cursor-pointer"
            >
              <option value="all" className="bg-dark-900">All Status</option>
              <option value="new" className="bg-dark-900">New</option>
              <option value="read" className="bg-dark-900">Read</option>
              <option value="replied" className="bg-dark-900">Replied</option>
              <option value="archived" className="bg-dark-900">Archived</option>
            </select>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="relative px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-secondary/50 focus:bg-white/[0.05] appearance-none transition-all duration-300 pr-10 cursor-pointer"
            >
              <option value="all" className="bg-dark-900">All Types</option>
              {messageTypes.map(type => (
                <option key={type} value={type} className="bg-dark-900">{type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5">{filteredMessages.length} messages found</p>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {filteredMessages.map((message) => (
            <motion.div
              layout
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`glass rounded-2xl border p-5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:bg-white/[0.02] relative overflow-hidden ${message.status === 'new' ? 'border-secondary/50 hover:border-secondary' : 'border-white/10 hover:border-secondary/30'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="flex items-start justify-between gap-6 relative z-10">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border shadow-sm uppercase tracking-wider ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                    <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-white/5 bg-black/20 ${getPriorityColor(message.priority)}`}>
                      {message.priority} PRIORITY
                    </span>
                    <span className="text-gray-600 font-bold">•</span>
                    <span className="text-xs font-bold text-gray-400 capitalize tracking-wider">{message.type.replace('-', ' ')}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors mb-1 truncate">{message.name}</h3>
                  <p className="text-sm font-medium text-gray-400 mb-3 truncate flex items-center gap-2">
                    <span className="text-gray-300">{message.company}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-500 font-mono text-xs bg-white/5 px-2 py-0.5 rounded">{message.email}</span>
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed max-w-4xl line-clamp-2 pr-12 group-hover:text-white transition-colors">{message.message}</p>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
                    <Clock className="w-3.5 h-3.5" />
                    {getTimeSince(message.created_at)}
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {message.status === 'new' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleStatusChange(message.id, 'read'); }}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-secondary/20 hover:border-secondary/30 text-gray-400 hover:text-secondary transition-all shadow-sm"
                        title="Mark as read"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); setEditingMessage(message); setFormData(message); setShowAddModal(true); }}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-accent/20 hover:border-accent/30 text-gray-400 hover:text-accent transition-all shadow-sm"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeletingMessage(message); }}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 text-gray-400 hover:text-red-400 transition-all shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {(showAddModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => { setShowAddModal(false); setEditingMessage(null); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass rounded-2xl border border-white/10 p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">
                  {editingMessage ? 'Edit Message' : 'New Message'}
                </h3>
                <button
                  onClick={() => { setShowAddModal(false); setEditingMessage(null); }}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-secondary/50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-secondary/50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company || ''}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-secondary/50"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone</label>
                    <input
                      type="text"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-secondary/50"
                      placeholder="+62812345678"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Status</label>
                    <select
                      value={formData.status || 'new'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-secondary/50"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Type</label>
                    <select
                      value={formData.type || 'general'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-secondary/50"
                    >
                      {messageTypes.map(type => (
                        <option key={type} value={type}>{type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Priority</label>
                    <select
                      value={formData.priority || 'low'}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-secondary/50"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea
                    value={formData.message || ''}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-secondary/50"
                    placeholder="Enter message..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => { setShowAddModal(false); setEditingMessage(null); }}
                  className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-accent text-white font-medium hover:shadow-lg hover:shadow-secondary/20 transition-all"
                >
                  {editingMessage ? 'Save Changes' : 'Add Message'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deletingMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeletingMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass rounded-2xl border border-white/10 p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Delete Message?</h3>
                  <p className="text-gray-400 text-sm">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete the message from <span className="text-white font-medium">{deletingMessage.name}</span>?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingMessage(null)}
                  className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500/80 text-white font-medium hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
