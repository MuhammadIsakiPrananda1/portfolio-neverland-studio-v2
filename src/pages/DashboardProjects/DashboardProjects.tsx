import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  FolderKanban,
  Calendar,
  DollarSign,
  Users,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
} from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface Project {
  id: number;
  name: string;
  client: string;
  status: 'active' | 'completed' | 'pending' | 'on-hold';
  progress: number;
  budget: number;
  spent: number;
  deadline: string;
  category: string;
  team: string[];
  description: string;
  created_at: string;
}

const STORAGE_KEY = 'dashboard_projects';

const defaultProjects: Project[] = [
  { id: 1, name: 'E-Commerce Security Audit', client: 'Tokopedia', status: 'active', progress: 75, budget: 15000, spent: 11250, deadline: '2026-03-15', category: 'Security', team: ['Alice', 'Bob'], description: 'Comprehensive security audit for e-commerce platform', created_at: '2026-01-15' },
  { id: 2, name: 'Cloud Migration', client: 'Gojek', status: 'active', progress: 45, budget: 50000, spent: 22500, deadline: '2026-04-20', category: 'Cloud', team: ['Charlie', 'David'], description: 'Migrate infrastructure to AWS cloud', created_at: '2026-01-20' },
  { id: 3, name: 'Network Infrastructure', client: 'Bank BTN', status: 'pending', progress: 0, budget: 75000, spent: 0, deadline: '2026-05-01', category: 'Infrastructure', team: [], description: 'Complete network infrastructure redesign', created_at: '2026-02-01' },
  { id: 4, name: 'Penetration Testing', client: 'Traveloka', status: 'completed', progress: 100, budget: 12000, spent: 12000, deadline: '2026-02-10', category: 'Security', team: ['Eve', 'Frank'], description: 'Full penetration testing for web applications', created_at: '2025-12-10' },
  { id: 5, name: 'Mobile App Development', client: 'Grab', status: 'on-hold', progress: 30, budget: 45000, spent: 13500, deadline: '2026-06-15', category: 'Development', team: ['Grace', 'Henry'], description: 'Native mobile app development', created_at: '2026-01-05' },
  { id: 6, name: 'Compliance Audit', client: 'Bank Mandiri', status: 'active', progress: 60, budget: 25000, spent: 15000, deadline: '2026-03-30', category: 'Compliance', team: ['Ivy', 'Jack'], description: 'PCI DSS compliance audit and remediation', created_at: '2026-01-25' },
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

const categories = ['Security', 'Cloud', 'Infrastructure', 'Development', 'Compliance', 'Consulting'];

export default function DashboardProjects() {
  const [projects, setProjects] = useState<Project[]>(() => loadFromStorage(STORAGE_KEY, defaultProjects));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});

  useEffect(() => {
    saveToStorage(STORAGE_KEY, projects);
  }, [projects]);

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSave = () => {
    if (editingProject) {
      setProjects(prev => prev.map(p => p.id === editingProject.id ? { ...p, ...formData } as Project : p));
    } else {
      setProjects(prev => [...prev, {
        id: Date.now(),
        ...formData,
        progress: formData.progress || 0,
        spent: 0,
        created_at: new Date().toISOString().split('T')[0],
        team: [],
      } as Project]);
    }
    setShowAddModal(false);
    setEditingProject(null);
    setFormData({});
  };

  const handleDelete = () => {
    if (deletingProject) {
      setProjects(prev => prev.filter(p => p.id !== deletingProject.id));
      setDeletingProject(null);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      'completed': 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      'pending': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
      'on-hold': 'bg-red-500/10 border-red-500/30 text-red-400',
    };
    return colors[status] || colors['pending'];
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Security': 'text-purple-400',
      'Cloud': 'text-blue-400',
      'Infrastructure': 'text-orange-400',
      'Development': 'text-green-400',
      'Compliance': 'text-cyan-400',
      'Consulting': 'text-pink-400',
    };
    return colors[category] || 'text-gray-400';
  };

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0),
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
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-purple-400/20 bg-purple-500/5 backdrop-blur-sm shadow-lg shadow-purple-500/5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">Projects</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-4 tracking-tight">
                <span className="text-white drop-shadow-md">
                  Project{' '}
                </span>
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent filter drop-shadow-lg">
                  Management
                </span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                Manage and track all your ongoing projects, milestones, deliverables, and budgets in one place.
              </p>
            </div>

            <button
              onClick={() => { setShowAddModal(true); setEditingProject(null); setFormData({}); }}
              className="group relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Plus className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
              <span className="relative z-10">New Project</span>
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
                <FolderKanban className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">{stats.total}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Total Projects</p>
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
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">{stats.active}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Active Projects</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">{stats.completed}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Completed</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <DollarSign className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md mb-2 truncate max-w-[120px]">${(stats.totalSpent / 1000).toFixed(0)}K / ${(stats.totalBudget / 1000).toFixed(0)}K</span>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">{(stats.totalSpent / stats.totalBudget * 100).toFixed(0)}%</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Budget Used</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/[0.02] p-4 rounded-2xl border border-white/5 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors z-10" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="relative pl-11 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] w-64 md:w-80 transition-all duration-300"
            />
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="relative px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] appearance-none transition-all duration-300 pr-10 cursor-pointer"
            >
              <option value="all" className="bg-dark-900">All Status</option>
              <option value="active" className="bg-dark-900">Active</option>
              <option value="completed" className="bg-dark-900">Completed</option>
              <option value="pending" className="bg-dark-900">Pending</option>
              <option value="on-hold" className="bg-dark-900">On Hold</option>
            </select>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="relative px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] appearance-none transition-all duration-300 pr-10 cursor-pointer"
            >
              <option value="all" className="bg-dark-900">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-dark-900">{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5">{filteredProjects.length} projects found</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="glass rounded-2xl border border-white/10 shadow-xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className={`text-xs font-bold uppercase tracking-widest ${getCategoryColor(project.category)}`}>{project.category}</span>
                      <span className="text-gray-600 font-bold">•</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border shadow-sm uppercase tracking-wider ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-heading font-black text-white group-hover:text-primary transition-colors leading-tight mb-2 line-clamp-2">{project.name}</h3>
                    <p className="text-sm font-medium text-gray-400 bg-white/5 inline-flex px-3 py-1 rounded-md">{project.client}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                    <button
                      onClick={() => { setEditingProject(project); setFormData(project); setShowAddModal(true); }}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/30 text-gray-400 hover:text-primary transition-all shadow-sm"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingProject(project)}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 text-gray-400 hover:text-red-400 transition-all shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-6 flex-1">
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    <span>Progress</span>
                    <span className="text-white bg-white/10 px-2 py-0.5 rounded">{project.progress}%</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner relative">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-secondary to-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-50" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center pt-4 border-t border-white/10">
                  <div className="bg-black/20 rounded-xl p-3 border border-white/5 shadow-inner">
                    <DollarSign className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                    <p className="text-sm font-heading font-black text-white">${(project.budget / 1000).toFixed(0)}K</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Budget</p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-3 border border-white/5 shadow-inner">
                    <Calendar className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                    <p className="text-sm font-heading font-black text-white">{new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Deadline</p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-3 border border-white/5 shadow-inner">
                    <Users className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                    <p className="text-sm font-heading font-black text-white">{Array.isArray(project.team) ? project.team.length : '-'}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Team</p>
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
                  {editingProject ? 'Edit Project' : 'New Project'}
                </h3>
                <button
                  onClick={() => { setShowAddModal(false); setEditingProject(null); }}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

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
                      value={formData.category || 'Security'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-primary/50"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Status</label>
                    <select
                      value={formData.status || 'pending'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-primary/50"
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="on-hold">On Hold</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Budget ($)</label>
                    <input
                      type="number"
                      value={formData.budget || ''}
                      onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                      placeholder="10000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Progress (%)</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.progress || 0}
                      onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-center text-white text-sm">{formData.progress || 0}%</div>
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
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                    placeholder="Project description..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => { setShowAddModal(false); setEditingProject(null); }}
                  className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deletingProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
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
                  <h3 className="text-lg font-bold text-white">Delete Project?</h3>
                  <p className="text-gray-400 text-sm">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete <span className="text-white font-medium">{deletingProject.name}</span>?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingProject(null)}
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
