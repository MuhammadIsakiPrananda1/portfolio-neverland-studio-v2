import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Mail,
  FolderKanban,
  Clock,
  RefreshCw,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Target,
  Wallet,
  BarChart3,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  FileText,
  Globe,
  Zap,
  X,
} from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';
import { Link } from 'react-router-dom';
import { Routes } from '@config/constants';

interface Project {
  id: number;
  name: string;
  client: string;
  status: 'active' | 'completed' | 'pending' | 'on-hold';
  progress: number;
  budget: number;
  deadline: string;
  category: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  message: string;
  type: string;
  created_at: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  status: 'active' | 'inactive' | 'prospect';
  totalProjects: number;
  totalSpent: number;
  joined: string;
  avatar?: string;
}

interface AnalyticsData {
  visitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversions: number;
  revenue: number;
  updatedAt: string;
}

const STORAGE_KEYS = {
  PROJECTS: 'dashboard_projects',
  CONTACTS: 'dashboard_contacts',
  CLIENTS: 'dashboard_clients',
  ANALYTICS: 'dashboard_analytics',
};

const defaultProjects: Project[] = [
  { id: 1, name: 'E-Commerce Security Audit', client: 'Tokopedia', status: 'active', progress: 75, budget: 15000, deadline: '2026-03-15', category: 'Security' },
  { id: 2, name: 'Cloud Migration', client: 'Gojek', status: 'active', progress: 45, budget: 50000, deadline: '2026-04-20', category: 'Cloud' },
  { id: 3, name: 'Network Infrastructure', client: 'Bank BTN', status: 'pending', progress: 0, budget: 75000, deadline: '2026-05-01', category: 'Infrastructure' },
  { id: 4, name: 'Penetration Testing', client: 'Traveloka', status: 'completed', progress: 100, budget: 12000, deadline: '2026-02-10', category: 'Security' },
  { id: 5, name: 'Mobile App Development', client: 'Grab', status: 'on-hold', progress: 30, budget: 45000, deadline: '2026-06-15', category: 'Development' },
  { id: 6, name: 'Compliance Audit', client: 'Bank Mandiri', status: 'active', progress: 60, budget: 25000, deadline: '2026-03-30', category: 'Compliance' },
];

const defaultContacts: Contact[] = [
  { id: 1, name: 'Ahmad Rizki', email: 'ahmad@techcorp.com', company: 'TechCorp Indonesia', phone: '+62812345678', status: 'new', message: 'Interested in penetration testing services for our e-commerce platform', type: 'security-audit', created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
  { id: 2, name: 'Sarah Chen', email: 'sarah@cloudasia.io', company: 'CloudAsia', phone: '+62898765432', status: 'new', message: 'Need cloud security assessment and compliance review', type: 'cloud-security', created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: 3, name: 'Budi Santoso', email: 'budi@startup.id', company: 'StartupID', phone: '+62811223344', status: 'read', message: 'Web application security audit request for our fintech product', type: 'penetration-testing', created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: 4, name: 'Lisa Wang', email: 'lisa@megadata.com', company: 'MegaData Solutions', phone: '+62855667788', status: 'replied', message: 'Follow up on infrastructure monitoring proposal sent last week', type: 'consulting', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: 5, name: 'Dimas Prasetyo', email: 'dimas@fintech.co.id', company: 'FinTech Co', phone: '+62899887766', status: 'new', message: 'PCI DSS compliance consultation for our payment system', type: 'compliance', created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString() },
  { id: 6, name: 'Ayu Lestari', email: 'ayu@govtech.go.id', company: 'GovTech Agency', phone: '+62844556677', status: 'read', message: 'Government network security assessment RFP', type: 'network-security', created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
  { id: 7, name: 'Kevin Tan', email: 'kevin@ecom.sg', company: 'E-Com Singapore', phone: '+651234567', status: 'archived', message: 'E-commerce platform security review completed', type: 'security-audit', created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() },
];

const defaultClients: Client[] = [
  { id: 1, name: 'Ahmad Rizki', email: 'ahmad@techcorp.com', company: 'TechCorp Indonesia', phone: '+62812345678', industry: 'Technology', status: 'active', totalProjects: 3, totalSpent: 45000, joined: '2025-06-15' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@cloudasia.io', company: 'CloudAsia', phone: '+62898765432', industry: 'Cloud Services', status: 'active', totalProjects: 5, totalSpent: 125000, joined: '2025-03-20' },
  { id: 3, name: 'Budi Santoso', email: 'budi@startup.id', company: 'StartupID', phone: '+62811223344', industry: 'Startups', status: 'active', totalProjects: 2, totalSpent: 18000, joined: '2025-09-08' },
  { id: 4, name: 'Lisa Wang', email: 'lisa@megadata.com', company: 'MegaData Solutions', phone: '+62855667788', industry: 'Data Analytics', status: 'inactive', totalProjects: 1, totalSpent: 8000, joined: '2025-01-14' },
  { id: 5, name: 'Dimas Prasetyo', email: 'dimas@fintech.co.id', company: 'FinTech Co', phone: '+62899887766', industry: 'Financial Services', status: 'active', totalProjects: 4, totalSpent: 85000, joined: '2025-07-22' },
  { id: 6, name: 'Ayu Lestari', email: 'ayu@govtech.go.id', company: 'GovTech Agency', phone: '+62844556677', industry: 'Government', status: 'prospect', totalProjects: 0, totalSpent: 0, joined: '2026-02-01' },
  { id: 7, name: 'Kevin Tan', email: 'kevin@ecom.sg', company: 'E-Commerce Singapore', phone: '+651234567', industry: 'E-Commerce', status: 'active', totalProjects: 2, totalSpent: 24000, joined: '2025-11-18' },
];

const defaultAnalytics: AnalyticsData = {
  visitors: 12450,
  pageViews: 45670,
  bounceRate: 32.5,
  avgSessionDuration: 245,
  conversions: 187,
  revenue: 285000,
  updatedAt: new Date().toISOString(),
};

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

const quickActions = [
  { id: 'projects', label: 'New Project', icon: FolderKanban, color: 'from-primary to-secondary', path: Routes.DASHBOARD_PROJECTS },
  { id: 'contacts', label: 'Add Contact', icon: UserPlus, color: 'from-secondary to-accent', path: Routes.DASHBOARD_MESSAGES },
  { id: 'clients', label: 'Add Client', icon: Users, color: 'from-accent to-primary', path: Routes.DASHBOARD_CLIENTS },
  { id: 'reports', label: 'Generate Report', icon: FileText, color: 'from-emerald-500 to-teal-500', path: Routes.DASHBOARD_REPORTS },
];

const recentActivities = [
  { id: 1, type: 'project', message: 'New project "E-Commerce Security Audit" created', time: '2 min ago', icon: FolderKanban, color: 'text-primary' },
  { id: 2, type: 'contact', message: 'New contact request from Ahmad Rizki', time: '15 min ago', icon: Mail, color: 'text-secondary' },
  { id: 3, type: 'client', message: 'Client "CloudAsia" updated their profile', time: '1 hour ago', icon: Users, color: 'text-accent' },
  { id: 4, type: 'alert', message: 'Server CPU usage above 80%', time: '2 hours ago', icon: AlertCircle, color: 'text-red-400' },
  { id: 5, type: 'success', message: 'Project "Penetration Testing" completed', time: '3 hours ago', icon: CheckCircle2, color: 'text-emerald-400' },
];

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>(() => loadFromStorage(STORAGE_KEYS.PROJECTS, defaultProjects));
  const [contacts, setContacts] = useState<Contact[]>(() => loadFromStorage(STORAGE_KEYS.CONTACTS, defaultContacts));
  const [clients, setClients] = useState<Client[]>(() => loadFromStorage(STORAGE_KEYS.CLIENTS, defaultClients));
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => loadFromStorage(STORAGE_KEYS.ANALYTICS, defaultAnalytics));
  
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'contacts' | 'clients'>('overview');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date(analytics.updatedAt));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<{type: string; data: any} | null>(null);
  const [deletingItem, setDeletingItem] = useState<{type: string; id: number; name: string} | null>(null);
  const [formData, setFormData] = useState<any>({});

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentUserName = localStorage.getItem('dashboardUserName') || 'Admin';

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CONTACTS, contacts);
  }, [contacts]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CLIENTS, clients);
  }, [clients]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ANALYTICS, analytics);
  }, [analytics]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setLastUpdated(new Date());
    setAnalytics(prev => ({ ...prev, updatedAt: new Date().toISOString() }));
    setTimeout(() => setIsRefreshing(false), 500);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleMarkAsRead = (id: number) => {
    setContacts(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, status: 'replied' as const } : c);
      return updated;
    });
  };

  const handleDeleteContact = (id: number) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    setDeletingItem(null);
  };

  const handleDeleteProject = (id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setDeletingItem(null);
  };

  const handleDeleteClient = (id: number) => {
    setClients(prev => prev.filter(c => c.id !== id));
    setDeletingItem(null);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status: newStatus as any } : p));
  };

  const handleClientStatusChange = (id: number, newStatus: string) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, status: newStatus as any } : c));
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

  const getContactStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-primary/10 border-primary/30 text-primary',
      'read': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
      'replied': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      'archived': 'bg-gray-500/10 border-gray-500/30 text-gray-400',
    };
    return colors[status] || colors['new'];
  };

  const getProjectStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      'completed': 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      'pending': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
      'on-hold': 'bg-red-500/10 border-red-500/30 text-red-400',
    };
    return colors[status] || colors['pending'];
  };

  const getClientStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      'inactive': 'bg-gray-500/10 border-gray-500/30 text-gray-400',
      'prospect': 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    };
    return colors[status] || colors['prospect'];
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()) || c.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()) || c.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statCards = [
    {
      label: 'Total Visitors',
      value: analytics.visitors.toLocaleString(),
      icon: Globe,
      gradient: 'from-primary/20 via-secondary/10 to-primary/5',
      iconBg: 'bg-primary/10 border-primary/20',
      iconColor: 'text-primary',
    },
    {
      label: 'Page Views',
      value: analytics.pageViews.toLocaleString(),
      icon: Eye,
      gradient: 'from-secondary/20 via-accent/10 to-secondary/5',
      iconBg: 'bg-secondary/10 border-secondary/20',
      iconColor: 'text-secondary',
    },
    {
      label: 'Conversions',
      value: analytics.conversions.toString(),
      icon: Target,
      gradient: 'from-accent/20 via-primary/10 to-accent/5',
      iconBg: 'bg-accent/10 border-accent/20',
      iconColor: 'text-accent',
      suffix: '',
    },
    {
      label: 'Revenue',
      value: `$${(analytics.revenue / 1000).toFixed(0)}K`,
      icon: Wallet,
      gradient: 'from-emerald-500/20 via-primary/10 to-emerald-500/5',
      iconBg: 'bg-emerald-500/10 border-emerald-500/20',
      iconColor: 'text-emerald-400',
      prefix: '$',
    },
  ];

  return (
    <div className="relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] bg-purple-500/10 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 md:w-[350px] md:h-[350px] bg-blue-500/10 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      <div className="relative z-10 space-y-6">
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <div className="relative border border-white/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5">
                    <Zap className="w-3 h-3 text-primary" />
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Dashboard</span>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black mb-2">
                  <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                    Welcome back,{' '}
                  </span>
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    {currentUserName}
                  </span>
                </h1>
                <p className="text-gray-400 text-sm sm:text-base max-w-xl">
                  Here's an overview of your business metrics and recent activities.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>Updated {lastUpdated.toLocaleTimeString()}</span>
                </div>

                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/10 text-gray-400 hover:text-white hover:border-primary/30 transition-all disabled:opacity-50 group"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : 'group-hover:text-primary transition-colors'}`} />
                  <span className="text-sm">Refresh</span>
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex flex-wrap gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.id}
                      to={action.path}
                      className="group relative overflow-hidden px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      <div className="relative z-10 flex items-center gap-2">
                        <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                        <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">{action.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={staggerItem}
              className="group relative rounded-xl p-5 glass border border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-30`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${stat.iconBg} border backdrop-blur-sm`}>
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                </div>
                <motion.h3
                  className="text-3xl font-heading font-bold text-white mb-1"
                >
                  {stat.value}
                </motion.h3>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex gap-1 p-1 rounded-lg glass border border-white/10 w-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeTab === 'overview'
                ? 'bg-gradient-to-r from-primary/20 via-secondary/15 to-primary/20 text-white shadow-lg shadow-primary/10 border border-primary/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
          >
            <BarChart3 className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeTab === 'projects'
                ? 'bg-gradient-to-r from-primary/20 via-secondary/15 to-primary/20 text-white shadow-lg shadow-primary/10 border border-primary/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
          >
            <FolderKanban className="w-4 h-4" />
            Projects
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeTab === 'contacts'
                ? 'bg-gradient-to-r from-primary/20 via-secondary/15 to-primary/20 text-white shadow-lg shadow-primary/10 border border-primary/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
          >
            <Mail className="w-4 h-4" />
            Messages
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeTab === 'clients'
                ? 'bg-gradient-to-r from-primary/20 via-secondary/15 to-primary/20 text-white shadow-lg shadow-primary/10 border border-primary/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
          >
            <Users className="w-4 h-4" />
            Clients
          </button>
        </div>

        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-heading font-bold text-white">Projects</h3>
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <FolderKanban className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Active</span>
                    <span className="text-emerald-400 font-medium">{projects.filter(p => p.status === 'active').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Completed</span>
                    <span className="text-blue-400 font-medium">{projects.filter(p => p.status === 'completed').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Pending</span>
                    <span className="text-yellow-400 font-medium">{projects.filter(p => p.status === 'pending').length}</span>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-heading font-bold text-white">Messages</h3>
                  <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">New</span>
                    <span className="text-primary font-medium">{contacts.filter(c => c.status === 'new').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Read</span>
                    <span className="text-yellow-400 font-medium">{contacts.filter(c => c.status === 'read').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Replied</span>
                    <span className="text-emerald-400 font-medium">{contacts.filter(c => c.status === 'replied').length}</span>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-heading font-bold text-white">Clients</h3>
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Active</span>
                    <span className="text-emerald-400 font-medium">{clients.filter(c => c.status === 'active').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Inactive</span>
                    <span className="text-gray-400 font-medium">{clients.filter(c => c.status === 'inactive').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Prospects</span>
                    <span className="text-purple-400 font-medium">{clients.filter(c => c.status === 'prospect').length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass rounded-xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                    Activity
                  </h3>
                </div>
                <div className="divide-y divide-white/5">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="p-4 hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg bg-white/5 ${activity.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-300">{activity.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass rounded-xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                    Recent Projects
                  </h3>
                  <Link to={Routes.DASHBOARD_PROJECTS} className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="divide-y divide-white/5">
                  {projects.slice(0, 5).map((project) => (
                    <div key={project.id} className="p-4 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-white truncate">{project.name}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getProjectStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{project.client}</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 w-64"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-primary/50"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="on-hold">On Hold</option>
                </select>
              </div>
              <button
                onClick={() => setShowAddModal('project')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>

            <div className="glass rounded-xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Budget</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deadline</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <tr key={project.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium text-sm">{project.name}</p>
                            <p className="text-gray-500 text-xs">{project.category}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{project.client}</td>
                        <td className="px-6 py-4">
                          <select
                            value={project.status}
                            onChange={(e) => handleStatusChange(project.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium border bg-transparent ${getProjectStatusColor(project.status)}`}
                          >
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="on-hold">On Hold</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span className="text-gray-400 text-xs">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">${project.budget.toLocaleString()}</td>
                        <td className="px-6 py-4 text-gray-500 text-sm">{new Date(project.deadline).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setEditingItem({ type: 'project', data: project })}
                              className="p-2 rounded-lg hover:bg-primary/10 text-gray-400 hover:text-primary transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeletingItem({ type: 'project', id: project.id, name: project.name })}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'contacts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 w-64"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-primary/50"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <button
                onClick={() => setShowAddModal('contact')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Message
              </button>
            </div>

            <div className="glass rounded-xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium text-sm">{contact.name}</p>
                            <p className="text-gray-500 text-xs">{contact.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{contact.company}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm capitalize">{contact.type.replace('-', ' ')}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getContactStatusColor(contact.status)}`}>
                            {contact.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm">{getTimeSince(contact.created_at)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            {contact.status === 'new' && (
                              <button
                                onClick={() => handleMarkAsRead(contact.id)}
                                className="p-2 rounded-lg hover:bg-primary/10 text-gray-400 hover:text-primary transition-colors"
                                title="Mark as read"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => setEditingItem({ type: 'contact', data: contact })}
                              className="p-2 rounded-lg hover:bg-primary/10 text-gray-400 hover:text-primary transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeletingItem({ type: 'contact', id: contact.id, name: contact.name })}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'clients' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 w-64"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-primary/50"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="prospect">Prospect</option>
                </select>
              </div>
              <button
                onClick={() => setShowAddModal('client')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Client
              </button>
            </div>

            <div className="glass rounded-xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Industry</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client) => (
                      <tr key={client.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium text-sm">{client.name}</p>
                            <p className="text-gray-500 text-xs">{client.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{client.company}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{client.industry}</td>
                        <td className="px-6 py-4">
                          <select
                            value={client.status}
                            onChange={(e) => handleClientStatusChange(client.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium border bg-transparent ${getClientStatusColor(client.status)}`}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="prospect">Prospect</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{client.totalProjects}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm">${client.totalSpent.toLocaleString()}</td>
                        <td className="px-6 py-4 text-gray-500 text-sm">{new Date(client.joined).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setEditingItem({ type: 'client', data: client })}
                              className="p-2 rounded-lg hover:bg-primary/10 text-gray-400 hover:text-primary transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeletingItem({ type: 'client', id: client.id, name: client.name })}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAddModal(null)}
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
                    Add {showAddModal === 'project' ? 'Project' : showAddModal === 'contact' ? 'Message' : 'Client'}
                  </h3>
                  <button
                    onClick={() => setShowAddModal(null)}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {showAddModal === 'project' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Project Name</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                        placeholder="Enter project name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Client</label>
                        <input
                          type="text"
                          value={formData.client || ''}
                          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                          placeholder="Client name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Category</label>
                        <select
                          value={formData.category || ''}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-primary/50"
                        >
                          <option value="">Select category</option>
                          <option value="Security">Security</option>
                          <option value="Cloud">Cloud</option>
                          <option value="Infrastructure">Infrastructure</option>
                          <option value="Development">Development</option>
                          <option value="Compliance">Compliance</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Budget ($)</label>
                        <input
                          type="number"
                          value={formData.budget || ''}
                          onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Deadline</label>
                        <input
                          type="date"
                          value={formData.deadline || ''}
                          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-primary/50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {showAddModal === 'contact' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Name</label>
                        <input
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
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
                          className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Phone</label>
                        <input
                          type="text"
                          value={formData.phone || ''}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                          placeholder="+62812345678"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Message</label>
                      <textarea
                        value={formData.message || ''}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                        placeholder="Enter message..."
                      />
                    </div>
                  </div>
                )}

                {showAddModal === 'client' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Name</label>
                        <input
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
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
                          className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Industry</label>
                        <select
                          value={formData.industry || ''}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-primary/50"
                        >
                          <option value="">Select industry</option>
                          <option value="Technology">Technology</option>
                          <option value="Financial Services">Financial Services</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="E-Commerce">E-Commerce</option>
                          <option value="Government">Government</option>
                          <option value="Startups">Startups</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => { setShowAddModal(null); setFormData({}); }}
                    className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (showAddModal === 'project') {
                        setProjects(prev => [{
                          id: Date.now(),
                          name: formData.name || 'New Project',
                          client: formData.client || 'Unknown',
                          status: 'pending' as const,
                          progress: 0,
                          budget: formData.budget || 0,
                          deadline: formData.deadline || new Date().toISOString(),
                          category: formData.category || 'General',
                        }, ...prev]);
                      } else if (showAddModal === 'contact') {
                        setContacts(prev => [{
                          id: Date.now(),
                          name: formData.name || 'New Contact',
                          email: formData.email || '',
                          company: formData.company || '',
                          phone: formData.phone || '',
                          status: 'new' as const,
                          message: formData.message || '',
                          type: 'general',
                          created_at: new Date().toISOString(),
                        }, ...prev]);
                      } else if (showAddModal === 'client') {
                        setClients(prev => [{
                          id: Date.now(),
                          name: formData.name || 'New Client',
                          email: formData.email || '',
                          company: formData.company || '',
                          phone: formData.phone || '',
                          industry: formData.industry || 'Technology',
                          status: 'prospect' as const,
                          totalProjects: 0,
                          totalSpent: 0,
                          joined: new Date().toISOString(),
                        }, ...prev]);
                      }
                      setShowAddModal(null);
                      setFormData({});
                    }}
                    className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
                  >
                    Add
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {deletingItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setDeletingItem(null)}
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
                    <h3 className="text-lg font-bold text-white">Delete {deletingItem.type === 'project' ? 'Project' : deletingItem.type === 'contact' ? 'Message' : 'Client'}?</h3>
                    <p className="text-gray-400 text-sm">This action cannot be undone.</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete <span className="text-white font-medium">{deletingItem.name}</span>?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeletingItem(null)}
                    className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (deletingItem.type === 'project') handleDeleteProject(deletingItem.id);
                      else if (deletingItem.type === 'contact') handleDeleteContact(deletingItem.id);
                      else if (deletingItem.type === 'client') handleDeleteClient(deletingItem.id);
                    }}
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
    </div>
  );
}
