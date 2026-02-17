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
        <div className="relative border border-white/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/20 bg-secondary/5">
                  <FolderKanban className="w-3 h-3 text-secondary" />
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Projects</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black mb-2">
                <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                  Project Management
                </span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base max-w-xl">
                Manage and track all your ongoing projects, milestones, and deliverables in one place.
              </p>
            </div>

            <button
              onClick={() => { setShowAddModal(true); setEditingProject(null); setFormData({}); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              New Project
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
            <FolderKanban className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-white">{stats.total}</h3>
          <p className="text-sm text-gray-400">Total Projects</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{stats.active}</h3>
          <p className="text-sm text-gray-400">Active Projects</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle2 className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{stats.completed}</h3>
          <p className="text-sm text-gray-400">Completed</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-purple-400">${(stats.totalSpent / 1000).toFixed(0)}K / ${(stats.totalBudget / 1000).toFixed(0)}K</span>
          </div>
          <h3 className="text-2xl font-bold text-white">{(stats.totalSpent / stats.totalBudget * 100).toFixed(0)}%</h3>
          <p className="text-sm text-gray-400">Budget Used</p>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
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
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-primary/50"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-500">{filteredProjects.length} projects found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass rounded-xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium ${getCategoryColor(project.category)}`}>{project.category}</span>
                      <span className="text-gray-600">•</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.client}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => { setEditingProject(project); setFormData(project); setShowAddModal(true); }}
                      className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-primary transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingProject(project)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/5 rounded-lg p-2">
                    <DollarSign className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                    <p className="text-xs text-white font-medium">${(project.budget / 1000).toFixed(0)}K</p>
                    <p className="text-[10px] text-gray-500">Budget</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <Calendar className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                    <p className="text-xs text-white font-medium">{new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    <p className="text-[10px] text-gray-500">Deadline</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <Users className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                    <p className="text-xs text-white font-medium">{Array.isArray(project.team) ? project.team.length : '-'}</p>
                    <p className="text-[10px] text-gray-500">Team</p>
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
            onClick={() => { setShowAddModal(false); setEditingProject(null); }}
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
            onClick={() => setDeletingProject(null)}
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
