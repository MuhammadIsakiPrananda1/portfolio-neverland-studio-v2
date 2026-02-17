import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Mail,
  Phone,
  Clock,
  Shield,
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
        <div className="relative border border-white/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5">
                  <Shield className="w-3 h-3 text-blue-400" />
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Team</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black mb-2">
                <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                  Team Management
                </span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base max-w-xl">
                Manage your team members, roles, and responsibilities.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-4" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <Shield className="w-5 h-5 text-primary mb-3" />
          <h3 className="text-2xl font-bold text-white">{stats.total}</h3>
          <p className="text-sm text-gray-400">Total Members</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{stats.active}</h3>
          <p className="text-sm text-gray-400">Active</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{stats.away}</h3>
          <p className="text-sm text-gray-400">Away</p>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search team..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 w-64" />
          </div>
          <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none">
            <option value="all">All Departments</option>
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="away">Away</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <p className="text-sm text-gray-500">{filteredTeam.length} members found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeam.map((member) => (
          <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-300">
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{member.name}</h3>
                    <p className={`text-xs ${getDeptColor(member.department)}`}>{member.department}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-3">{member.role}</p>
              <div className="space-y-2 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" /><span className="truncate">{member.email}</span></div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>{member.phone}</span></div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>Joined {new Date(member.joinDate).toLocaleDateString()}</span></div>
              </div>
              <div className="flex flex-wrap gap-1">
                {member.skills.map(skill => (
                  <span key={skill} className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-gray-400 border border-white/5">{skill}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
