import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Activity, Server, Cloud, Code } from 'lucide-react';
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
        <div className="relative border border-white/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5">
                  <Activity className="w-3 h-3 text-purple-400" />
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Services</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black mb-2">
                <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                  Service Management
                </span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base max-w-xl">
                Manage your services, pricing, and offerings.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-4" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <Activity className="w-5 h-5 text-purple-400 mb-3" />
          <h3 className="text-2xl font-bold text-white">{stats.total}</h3>
          <p className="text-sm text-gray-400">Total Services</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <Shield className="w-5 h-5 text-emerald-400 mb-3" />
          <h3 className="text-2xl font-bold text-white">{stats.active}</h3>
          <p className="text-sm text-gray-400">Active Services</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
            <span className="text-sm font-bold">$</span>
          </div>
          <h3 className="text-2xl font-bold text-white">${(stats.totalRevenue / 1000).toFixed(0)}K</h3>
          <p className="text-sm text-gray-400">Total Value</p>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search services..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 w-64" />
          </div>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none">
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <p className="text-sm text-gray-500">{filteredServices.length} services found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl border border-white/10 p-5 hover:border-purple-500/30 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-white/5">
                {getCategoryIcon(service.category)}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${service.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-gray-400'}`}>
                {service.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{service.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{service.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-purple-400 font-semibold">${service.price.toLocaleString()}</span>
              <span className="text-gray-500">{service.clients} clients</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
