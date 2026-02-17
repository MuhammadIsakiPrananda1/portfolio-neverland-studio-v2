import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  project: string;
}

const defaultTasks: Task[] = [
  { id: 1, title: 'Complete Security Audit Report', description: 'Finalize the security audit report for Tokopedia', status: 'in-progress', priority: 'high', assignee: 'Sarah Melinda', dueDate: '2026-02-20', project: 'E-Commerce Security' },
  { id: 2, title: 'Deploy Cloud Infrastructure', description: 'Set up AWS infrastructure for Gojek migration', status: 'todo', priority: 'high', assignee: 'Budi Santoso', dueDate: '2026-02-25', project: 'Cloud Migration' },
  { id: 3, title: 'UI Design Review', description: 'Review new dashboard design mockups', status: 'review', priority: 'medium', assignee: 'Lisa Pertiwi', dueDate: '2026-02-18', project: 'Dashboard Redesign' },
  { id: 4, title: 'API Documentation', description: 'Update API docs for new endpoints', status: 'done', priority: 'low', assignee: 'Rendy Prakoso', dueDate: '2026-02-15', project: 'API Development' },
  { id: 5, title: 'Penetration Testing', description: 'Conduct penetration testing for Traveloka', status: 'done', priority: 'high', assignee: 'Sarah Melinda', dueDate: '2026-02-10', project: 'Penetration Testing' },
  { id: 6, title: 'Client Meeting Preparation', description: 'Prepare slides for Bank Mandiri meeting', status: 'todo', priority: 'medium', assignee: 'Arlianto', dueDate: '2026-02-22', project: 'Compliance Audit' },
];

const STORAGE_KEY = 'dashboard_tasks';

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error(`Error loading ${key}:`, e); }
  return defaultValue;
};

export default function DashboardTasks() {
  const [tasks] = useState<Task[]>(() => loadFromStorage(STORAGE_KEY, defaultTasks));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'todo': 'bg-gray-500/10 border-gray-500/30 text-gray-400',
      'in-progress': 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      'review': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
      'done': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    };
    return colors[status];
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') return <AlertTriangle className="w-4 h-4 text-red-400" />;
    if (priority === 'medium') return <Clock className="w-4 h-4 text-yellow-400" />;
    return <CheckCircle className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="space-y-6">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="relative">
        <div className="relative border border-white/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Tasks</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black mb-2">
                <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                  Task Management
                </span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base max-w-xl">
                Track and manage all your project tasks in one place.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <Shield className="w-5 h-5 text-primary mb-3" />
          <h3 className="text-2xl font-bold text-white">{stats.total}</h3>
          <p className="text-sm text-gray-400">Total Tasks</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <Clock className="w-5 h-5 text-gray-400 mb-3" />
          <h3 className="text-2xl font-bold text-white">{stats.todo}</h3>
          <p className="text-sm text-gray-400">To Do</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <div className="w-5 h-5 rounded-full border-2 border-blue-400 mb-3" />
          <h3 className="text-2xl font-bold text-white">{stats.inProgress}</h3>
          <p className="text-sm text-gray-400">In Progress</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <CheckCircle className="w-5 h-5 text-emerald-400 mb-3" />
          <h3 className="text-2xl font-bold text-white">{stats.done}</h3>
          <p className="text-sm text-gray-400">Completed</p>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search tasks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 w-64" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none">
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
        </div>
        <p className="text-sm text-gray-500">{filteredTasks.length} tasks found</p>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl border border-white/10 p-4 hover:border-primary/30 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">{getPriorityIcon(task.priority)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                    <span className="text-xs text-gray-500">{task.project}</span>
                  </div>
                  <h3 className="text-white font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gray-400">{task.assignee}</p>
                <p className="text-xs text-gray-500 mt-1">Due {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
