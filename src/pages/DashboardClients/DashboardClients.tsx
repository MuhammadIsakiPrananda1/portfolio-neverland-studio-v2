import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building2,
  MapPin,
  DollarSign,
  AlertCircle,
  X,
  Globe,
} from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface Client {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  location: string;
  industry: string;
  projects: number;
  activeProjects: number;
  revenue: number;
  joinDate: string;
  status: 'active' | 'inactive' | 'prospect';
  avatar: string;
  bgColor: string;
}

const STORAGE_KEY = 'dashboard_clients';

const defaultClients: Client[] = [
  { id: 1, name: 'TechCorp Inc.', contact: 'John Anderson', email: 'john@techcorp.com', phone: '+1 (555) 123-4567', location: 'San Francisco, CA', industry: 'Technology', projects: 5, activeProjects: 2, revenue: 125000, joinDate: '2025-06-15', status: 'active', avatar: 'TC', bgColor: 'bg-blue-500' },
  { id: 2, name: 'FinanceHub', contact: 'Sarah Mitchell', email: 'sarah@financehub.com', phone: '+1 (555) 234-5678', location: 'New York, NY', industry: 'Finance', projects: 8, activeProjects: 3, revenue: 245000, joinDate: '2024-11-20', status: 'active', avatar: 'FH', bgColor: 'bg-purple-500' },
  { id: 3, name: 'DataSecure Ltd.', contact: 'Michael Brown', email: 'michael@datasecure.com', phone: '+1 (555) 345-6789', location: 'Austin, TX', industry: 'Security', projects: 3, activeProjects: 1, revenue: 78000, joinDate: '2025-01-10', status: 'active', avatar: 'DS', bgColor: 'bg-emerald-500' },
  { id: 4, name: 'CloudFirst Co.', contact: 'Emma Wilson', email: 'emma@cloudfirst.com', phone: '+1 (555) 456-7890', location: 'Seattle, WA', industry: 'Cloud Services', projects: 6, activeProjects: 2, revenue: 156000, joinDate: '2024-08-05', status: 'active', avatar: 'CF', bgColor: 'bg-amber-500' },
  { id: 5, name: 'StartupXYZ', contact: 'David Lee', email: 'david@startupxyz.com', phone: '+1 (555) 567-8901', location: 'Los Angeles, CA', industry: 'Startups', projects: 2, activeProjects: 0, revenue: 45000, joinDate: '2025-12-01', status: 'inactive', avatar: 'SX', bgColor: 'bg-pink-500' },
  { id: 6, name: 'InnovaTech', contact: 'Lisa Chen', email: 'lisa@innovatech.com', phone: '+1 (555) 678-9012', location: 'Boston, MA', industry: 'Technology', projects: 4, activeProjects: 1, revenue: 98000, joinDate: '2025-03-22', status: 'active', avatar: 'IT', bgColor: 'bg-cyan-500' },
  { id: 7, name: 'GovTech Agency', contact: 'Robert Taylor', email: 'robert@govtech.go.id', phone: '+62844556677', location: 'Jakarta, Indonesia', industry: 'Government', projects: 0, activeProjects: 0, revenue: 0, joinDate: '2026-02-01', status: 'prospect', avatar: 'GT', bgColor: 'bg-orange-500' },
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

const industries = ['Technology', 'Finance', 'Security', 'Cloud Services', 'Startups', 'Government', 'Healthcare', 'Retail'];

export default function DashboardClients() {
  const [clients, setClients] = useState<Client[]>(() => loadFromStorage(STORAGE_KEY, defaultClients));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState<Partial<Client>>({});

  useEffect(() => {
    saveToStorage(STORAGE_KEY, clients);
  }, [clients]);

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.contact.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSave = () => {
    if (editingClient) {
      setClients(prev => prev.map(c => c.id === editingClient.id ? { ...c, ...formData } as Client : c));
    } else {
      setClients(prev => [...prev, {
        id: Date.now(),
        ...formData,
        projects: 0,
        activeProjects: 0,
        revenue: 0,
        joinDate: new Date().toISOString().split('T')[0],
        avatar: formData.name?.substring(0, 2).toUpperCase() || 'NC',
        bgColor: 'bg-primary',
      } as Client]);
    }
    setShowAddModal(false);
    setEditingClient(null);
    setFormData({});
  };

  const handleDelete = () => {
    if (deletingClient) {
      setClients(prev => prev.filter(c => c.id !== deletingClient.id));
      setDeletingClient(null);
    }
  };

  const handleStatusChange = (id: number, status: string) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, status: status as any } : c));
  };

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    revenue: clients.reduce((sum, c) => sum + c.revenue, 0),
    prospects: clients.filter(c => c.status === 'prospect').length,
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                  <Users className="w-3 h-3 text-accent" />
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">Clients</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black mb-2">
                <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                  Client Management
                </span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base max-w-xl">
                Manage your client relationships and track their projects and revenue.
              </p>
            </div>

            <button
              onClick={() => { setShowAddModal(true); setEditingClient(null); setFormData({}); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent to-primary text-white font-semibold text-sm hover:shadow-lg hover:shadow-accent/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Client
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
            <Users className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-white">{stats.total}</h3>
          <p className="text-sm text-gray-400">Total Clients</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <Building2 className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{stats.active}</h3>
          <p className="text-sm text-gray-400">Active Clients</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">${(stats.revenue / 1000).toFixed(0)}K</h3>
          <p className="text-sm text-gray-400">Total Revenue</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <Globe className="w-5 h-5 text-orange-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{stats.prospects}</h3>
          <p className="text-sm text-gray-400">Prospects</p>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 w-64"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-accent/50"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="prospect">Prospect</option>
          </select>
        </div>
        <p className="text-sm text-gray-500">{filteredClients.length} clients found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredClients.map((client) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass rounded-xl border border-white/10 overflow-hidden hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full ${client.bgColor} flex items-center justify-center text-white font-bold text-sm`}>
                      {client.avatar}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-accent transition-colors">{client.name}</h3>
                      <p className="text-xs text-gray-500">{client.contact}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => { setEditingClient(client); setFormData(client); setShowAddModal(true); }}
                      className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-accent transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingClient(client)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{client.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <select
                    value={client.status}
                    onChange={(e) => handleStatusChange(client.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs font-medium border bg-transparent cursor-pointer ${
                      client.status === 'active' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                      client.status === 'inactive' ? 'bg-gray-500/10 border-gray-500/30 text-gray-400' :
                      'bg-orange-500/10 border-orange-500/30 text-orange-400'
                    }`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="prospect">Prospect</option>
                  </select>
                  <span className="text-xs text-gray-500">{client.industry}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-white/5">
                  <div>
                    <p className="text-xs text-gray-500">Projects</p>
                    <p className="text-sm font-bold text-white">{client.projects}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="text-sm font-bold text-white">${(client.revenue / 1000).toFixed(0)}K</p>
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
            onClick={() => { setShowAddModal(false); setEditingClient(null); }}
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
                  {editingClient ? 'Edit Client' : 'Add New Client'}
                </h3>
                <button
                  onClick={() => { setShowAddModal(false); setEditingClient(null); }}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Contact Person</label>
                    <input
                      type="text"
                      value={formData.contact || ''}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone</label>
                    <input
                      type="text"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                      placeholder="+1 555 123-4567"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location || ''}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Industry</label>
                    <select
                      value={formData.industry || ''}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-accent/50"
                    >
                      <option value="">Select Industry</option>
                      {industries.map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Status</label>
                  <select
                    value={formData.status || 'prospect'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-accent/50"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="prospect">Prospect</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => { setShowAddModal(false); setEditingClient(null); }}
                  className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-primary text-white font-medium hover:shadow-lg hover:shadow-accent/20 transition-all"
                >
                  {editingClient ? 'Save Changes' : 'Add Client'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deletingClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeletingClient(null)}
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
                  <h3 className="text-lg font-bold text-white">Delete Client?</h3>
                  <p className="text-gray-400 text-sm">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete <span className="text-white font-medium">{deletingClient.name}</span>?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingClient(null)}
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
