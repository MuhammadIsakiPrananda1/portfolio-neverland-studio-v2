import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Mail,
  Phone,
  Clock,
  Shield,
  Sparkles,
} from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'away';
  avatar: string;
  skills: string[];
  joinDate: string;
}

const STORAGE_KEY = 'dashboard_team';

const defaultTeam: TeamMember[] = [
  { id: 1, name: 'Arlianto', email: 'arli@neverlandstudio.id', phone: '+6281252254886', role: 'CEO & Founder', department: 'Executive', status: 'active', avatar: 'AR', skills: ['Leadership', 'Security', 'Strategy'], joinDate: '2020-01-15' },
  { id: 2, name: 'Ahmad Fauzi', email: 'fauzi@neverlandstudio.id', phone: '+6281234567890', role: 'Lead Developer', department: 'Development', status: 'active', avatar: 'AF', skills: ['React', 'Node.js', 'Security'], joinDate: '2021-03-20' },
  { id: 3, name: 'Sarah Melinda', email: 'sarah@neverlandstudio.id', phone: '+6289876543210', role: 'Security Analyst', department: 'Security', status: 'active', avatar: 'SM', skills: ['Penetration Testing', 'SOC', 'CEH'], joinDate: '2021-06-10' },
  { id: 4, name: 'Budi Santoso', email: 'budi@neverlandstudio.id', phone: '+6281122334455', role: 'DevOps Engineer', department: 'Infrastructure', status: 'away', avatar: 'BS', skills: ['AWS', 'Kubernetes', 'Terraform'], joinDate: '2022-01-05' },
  { id: 5, name: 'Lisa Pertiwi', email: 'lisa@neverlandstudio.id', phone: '+6285566778899', role: 'UI/UX Designer', department: 'Design', status: 'active', avatar: 'LP', skills: ['Figma', 'UI Design', 'User Research'], joinDate: '2022-04-18' },
  { id: 6, name: 'Rendy Prakoso', email: 'rendy@neverlandstudio.id', phone: '+6289988776655', role: 'Backend Developer', department: 'Development', status: 'active', avatar: 'RP', skills: ['Python', 'Go', 'PostgreSQL'], joinDate: '2022-08-22' },
  { id: 7, name: 'Dewi Ayu', email: 'dewi@neverlandstudio.id', phone: '+6284455667788', role: 'Project Manager', department: 'Management', status: 'inactive', avatar: 'DA', skills: ['Agile', 'Scrum', 'Communication'], joinDate: '2023-02-14' },
];

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error(`Error loading ${key}:`, e); }
  return defaultValue;
};

const saveToStorage = <T,>(key: string, value: T): void => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.error(`Error saving ${key}:`, e); }
};

const departments = ['Executive', 'Development', 'Security', 'Infrastructure', 'Design', 'Management', 'Marketing'];

export default function DashboardTeam() {
  const [team] = useState<TeamMember[]>(() => loadFromStorage(STORAGE_KEY, defaultTeam));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => { saveToStorage(STORAGE_KEY, team); }, [team]);

  const filteredTeam = team.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'all' || m.department === filterDept;
    const matchesStatus = filterStatus === 'all' || m.status === filterStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const stats = {
    total: team.length,
    active: team.filter(m => m.status === 'active').length,
    away: team.filter(m => m.status === 'away').length,
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      'away': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
      'inactive': 'bg-gray-500/10 border-gray-500/30 text-gray-400',
    };
    return colors[status];
  };

  const getDeptColor = (dept: string) => {
    const colors: Record<string, string> = {
      'Executive': 'text-purple-400',
      'Development': 'text-blue-400',
      'Security': 'text-red-400',
      'Infrastructure': 'text-orange-400',
      'Design': 'text-pink-400',
      'Management': 'text-cyan-400',
      'Marketing': 'text-green-400',
    };
    return colors[dept] || 'text-gray-400';
  };

  return (
    <div className="space-y-6">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="relative">
        <div className="relative border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-10 overflow-hidden glass shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-purple-400/20 bg-purple-500/5 backdrop-blur-sm shadow-lg shadow-purple-500/5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">Team Workspace</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-4 tracking-tight">
                <span className="text-white drop-shadow-md">
                  Team{' '}
                </span>
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent filter drop-shadow-lg">
                  Management
                </span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                Manage your team members, roles, departments, and monitor their status and skills.
              </p>
            </div>

            <button
              className="group relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Search className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="relative z-10">Add Member</span>
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">{stats.total}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Total Members</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">{stats.active}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Active</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="glass rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-yellow-500/20 border border-yellow-500/30 shadow-inner group-hover:scale-110 transition-transform flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">{stats.away}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Away</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/[0.02] p-4 rounded-2xl border border-white/5 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors z-10" />
            <input type="text" placeholder="Search team..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="relative pl-11 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] w-64 transition-all duration-300" />
          </div>
          <div className="relative group flex-1 md:flex-none">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="relative w-full md:w-auto px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] appearance-none transition-all duration-300 pr-10 cursor-pointer">
              <option value="all" className="bg-dark-900">All Departments</option>
              {departments.map(d => <option key={d} value={d} className="bg-dark-900">{d}</option>)}
            </select>
          </div>
          <div className="relative group flex-1 md:flex-none">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="relative w-full md:w-auto px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] appearance-none transition-all duration-300 pr-10 cursor-pointer">
              <option value="all" className="bg-dark-900">All Status</option>
              <option value="active" className="bg-dark-900">Active</option>
              <option value="away" className="bg-dark-900">Away</option>
              <option value="inactive" className="bg-dark-900">Inactive</option>
            </select>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5">{filteredTeam.length} members found</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTeam.map((member) => (
          <motion.div key={member.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 hover:shadow-2xl transition-all duration-300 group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="p-6 relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg ring-2 ring-white/10 group-hover:ring-blue-500/50 transition-all duration-300">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">{member.name}</h3>
                    <p className={`text-xs font-bold uppercase tracking-wider mt-1 ${getDeptColor(member.department)}`}>{member.department}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-300 mb-4 bg-white/5 py-2 px-3 rounded-lg border border-white/5 inline-block">{member.role}</p>
                <div className="space-y-3 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-3 group/item">
                    <Mail className="w-4 h-4 text-gray-500 group-hover/item:text-blue-400 transition-colors shrink-0" />
                    <span className="truncate group-hover/item:text-gray-300 transition-colors">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-3 group/item">
                    <Phone className="w-4 h-4 text-gray-500 group-hover/item:text-blue-400 transition-colors shrink-0" />
                    <span className="group-hover/item:text-gray-300 transition-colors">{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 group/item">
                    <Clock className="w-4 h-4 text-gray-500 group-hover/item:text-blue-400 transition-colors shrink-0" />
                    <span className="group-hover/item:text-gray-300 transition-colors">Joined {new Date(member.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {member.skills.map(skill => (
                    <span key={skill} className="px-2.5 py-1 text-[10px] font-medium rounded-md bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 transition-colors cursor-default">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
