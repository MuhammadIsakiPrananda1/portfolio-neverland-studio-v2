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
        <div className="relative border border-white/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/20 bg-secondary/5">
                  <Mail className="w-3 h-3 text-secondary" />
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Messages</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black mb-2">
                <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                  Message Center
                </span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base max-w-xl">
                Manage and respond to all incoming inquiries from your contact form.
              </p>
            </div>

            <button
              onClick={() => { setShowAddModal(true); setEditingMessage(null); setFormData({}); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-accent text-white font-semibold text-sm hover:shadow-lg hover:shadow-secondary/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              New Message
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-white">{stats.total}</h3>
          <p className="text-sm text-gray-400">Total Messages</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <AlertCircle className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs text-primary font-medium">{stats.new} new</span>
          </div>
          <h3 className="text-2xl font-bold text-white">{stats.new}</h3>
          <p className="text-sm text-gray-400">Unread</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{stats.replied}</h3>
          <p className="text-sm text-gray-400">Replied</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <Archive className="w-5 h-5 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{messages.filter(m => m.status === 'archived').length}</h3>
          <p className="text-sm text-gray-400">Archived</p>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-secondary/50 w-64"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-secondary/50"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-secondary/50"
          >
            <option value="all">All Types</option>
            {messageTypes.map(type => (
              <option key={type} value={type}>{type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-500">{filteredMessages.length} messages found</p>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {filteredMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`glass rounded-xl border p-4 hover:border-secondary/30 transition-all duration-300 ${message.status === 'new' ? 'border-l-4 border-l-primary' : 'border-white/10'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                    <span className={`text-xs ${getPriorityColor(message.priority)}`}>
                      {message.priority.toUpperCase()}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className="text-xs text-gray-500 capitalize">{message.type.replace('-', ' ')}</span>
                  </div>
                  <h3 className="text-white font-medium truncate">{message.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{message.company} - {message.email}</p>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">{message.message}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {getTimeSince(message.created_at)}
                  </span>
                  <div className="flex gap-1">
                    {message.status === 'new' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleStatusChange(message.id, 'read'); }}
                        className="p-2 rounded-lg hover:bg-primary/10 text-gray-400 hover:text-primary transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); setEditingMessage(message); setFormData(message); setShowAddModal(true); }}
                      className="p-2 rounded-lg hover:bg-secondary/10 text-gray-400 hover:text-secondary transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeletingMessage(message); }}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
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
