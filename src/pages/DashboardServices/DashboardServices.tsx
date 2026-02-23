import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Activity, Server, Cloud, Code, Sparkles } from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  status: 'active' | 'inactive';
  clients: number;
}

const defaultServices: Service[] = [
  { id: 1, name: 'Penetration Testing', description: 'Comprehensive ethical hacking services', category: 'Security', price: 15000, status: 'active', clients: 45 },
  { id: 2, name: 'Security Audit', description: 'Full security posture assessment', category: 'Security', price: 12000, status: 'active', clients: 38 },
  { id: 3, name: 'Cloud Infrastructure', description: 'AWS/Azure/GCP infrastructure setup', category: 'Cloud', price: 25000, status: 'active', clients: 28 },
  { id: 4, name: 'Network Security', description: 'Firewall & VPN configuration', category: 'Security', price: 18000, status: 'active', clients: 32 },
  { id: 5, name: 'Web Development', description: 'Custom web application development', category: 'Development', price: 20000, status: 'active', clients: 55 },
  { id: 6, name: 'API Development', description: 'RESTful & GraphQL APIs', category: 'Development', price: 12000, status: 'active', clients: 42 },
  { id: 7, name: 'Compliance Audit', description: 'ISO 27001, PCI DSS, SOC 2', category: 'Compliance', price: 22000, status: 'active', clients: 18 },
  { id: 8, name: '24/7 Monitoring', description: 'Real-time security monitoring', category: 'Services', price: 5000, status: 'inactive', clients: 0 },
];

const STORAGE_KEY = 'dashboard_services';

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error(`Error loading ${key}:`, e); }
  return defaultValue;
};

export default function DashboardServices() {
  const [services] = useState<Service[]>(() => loadFromStorage(STORAGE_KEY, defaultServices));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [...new Set(services.map(s => s.category))];

  const filteredServices = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || s.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: services.length,
    active: services.filter(s => s.status === 'active').length,
    totalRevenue: services.reduce((sum, s) => sum + (s.price * s.clients), 0),
  };

  const getCategoryIcon = (category: string) => {
    if (category === 'Security') return <Shield className="w-5 h-5 text-red-400" />;
    if (category === 'Cloud') return <Cloud className="w-5 h-5 text-blue-400" />;
    if (category === 'Development') return <Code className="w-5 h-5 text-purple-400" />;
    return <Server className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="space-y-6">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="relative">
        <div className="relative border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-10 overflow-hidden glass shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70" />
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-purple-400/20 bg-purple-500/5 backdrop-blur-sm shadow-lg shadow-purple-500/5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">Offerings</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-4 tracking-tight">
                <span className="text-white drop-shadow-md">
                  Service{' '}
                </span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent filter drop-shadow-lg">
                  Management
                </span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                Manage your agency's service offerings, pricing structures, and active client subscriptions.
              </p>
            </div>

            <button
              className="group relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Activity className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="relative z-10">Add Service</span>
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">{stats.total}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Total Services</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">{stats.active}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Active Services</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 shadow-inner group-hover:scale-110 transition-transform flex items-center justify-center">
                <span className="text-lg font-black text-blue-400">$</span>
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">${(stats.totalRevenue / 1000).toFixed(0)}K</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Total Value</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/[0.02] p-4 rounded-2xl border border-white/5 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors z-10" />
            <input type="text" placeholder="Search services..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="relative pl-11 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] w-64 md:w-80 transition-all duration-300" />
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="relative px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] appearance-none transition-all duration-300 pr-10 cursor-pointer">
              <option value="all" className="bg-dark-900">All Categories</option>
              {categories.map(c => <option key={c} value={c} className="bg-dark-900">{c}</option>)}
            </select>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5">{filteredServices.length} services found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl border border-white/10 p-6 hover:border-purple-500/30 hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform">
                {getCategoryIcon(service.category)}
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${service.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                {service.status}
              </span>
            </div>

            <div className="relative z-10 flex-1">
              <h3 className="text-xl font-heading font-black text-white group-hover:text-purple-400 transition-colors mb-2">{service.name}</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">{service.description}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-sm">${service.price.toLocaleString()}</span>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
                {service.clients} clients
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
