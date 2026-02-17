import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FolderOpen, FileText, Download, Eye, Link as LinkIcon, Image, Video, Archive } from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface Resource {
  id: number;
  name: string;
  type: 'document' | 'image' | 'video' | 'archive' | 'link';
  category: string;
  size?: string;
  url?: string;
  date: string;
}

const defaultResources: Resource[] = [
  { id: 1, name: 'Security Policy Template', type: 'document', category: 'Templates', size: '2.4 MB', date: '2026-01-15' },
  { id: 2, name: 'Company Branding Guidelines', type: 'document', category: 'Brand', size: '5.1 MB', date: '2026-01-10' },
  { id: 3, name: 'Project Proposal Template', type: 'document', category: 'Templates', size: '1.2 MB', date: '2026-01-08' },
  { id: 4, name: 'Team Photos 2026', type: 'image', category: 'Media', size: '45.2 MB', date: '2026-01-20' },
  { id: 5, name: 'Product Demo Video', type: 'video', category: 'Media', size: '128.5 MB', date: '2026-01-18' },
  { id: 6, name: 'Client Presentation Q1', type: 'document', category: 'Presentations', size: '8.7 MB', date: '2026-02-01' },
  { id: 7, name: 'AWS Architecture Diagrams', type: 'image', category: 'Technical', size: '12.3 MB', date: '2026-01-25' },
  { id: 8, name: 'Backup Files Jan 2026', type: 'archive', category: 'Backups', size: '512 MB', date: '2026-01-31' },
];

const STORAGE_KEY = 'dashboard_resources';

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error(`Error loading ${key}:`, e); }
  return defaultValue;
};

export default function DashboardResources() {
  const [resources] = useState<Resource[]>(() => loadFromStorage(STORAGE_KEY, defaultResources));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || r.type === filterType;
    return matchesSearch && matchesType;
  });

  const stats = {
    total: resources.length,
    documents: resources.filter(r => r.type === 'document').length,
    images: resources.filter(r => r.type === 'image').length,
    videos: resources.filter(r => r.type === 'video').length,
  };

  const getTypeIcon = (type: string) => {
    if (type === 'document') return <FileText className="w-5 h-5 text-blue-400" />;
    if (type === 'image') return <Image className="w-5 h-5 text-purple-400" />;
    if (type === 'video') return <Video className="w-5 h-5 text-red-400" />;
    if (type === 'archive') return <Archive className="w-5 h-5 text-yellow-400" />;
    return <LinkIcon className="w-5 h-5 text-gray-400" />;
  };

  const getTypeColor = (type: string) => {
    if (type === 'document') return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
    if (type === 'image') return 'bg-purple-500/10 border-purple-500/20 text-purple-400';
    if (type === 'video') return 'bg-red-500/10 border-red-500/20 text-red-400';
    if (type === 'archive') return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
    return 'bg-gray-500/10 border-gray-500/20 text-gray-400';
  };

  return (
    <div className="space-y-6">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="relative">
        <div className="relative border border-white/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5">
                  <FolderOpen className="w-3 h-3 text-orange-400" />
                  <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Resources</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black mb-2">
                <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                  Resource Management
                </span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base max-w-xl">
                Manage and organize your files, documents, and resources.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <FolderOpen className="w-5 h-5 text-orange-400 mb-3" />
          <h3 className="text-2xl font-bold text-white">{stats.total}</h3>
          <p className="text-sm text-gray-400">Total Files</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <FileText className="w-5 h-5 text-blue-400 mb-3" />
          <h3 className="text-2xl font-bold text-white">{stats.documents}</h3>
          <p className="text-sm text-gray-400">Documents</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <Image className="w-5 h-5 text-purple-400 mb-3" />
          <h3 className="text-2xl font-bold text-white">{stats.images}</h3>
          <p className="text-sm text-gray-400">Images</p>
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-xl p-5 border border-white/10">
          <Video className="w-5 h-5 text-red-400 mb-3" />
          <h3 className="text-2xl font-bold text-white">{stats.videos}</h3>
          <p className="text-sm text-gray-400">Videos</p>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search resources..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 w-64" />
          </div>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none">
            <option value="all">All Types</option>
            <option value="document">Documents</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="archive">Archives</option>
          </select>
        </div>
        <p className="text-sm text-gray-500">{filteredResources.length} files found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource) => (
          <motion.div key={resource.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl border border-white/10 p-4 hover:border-orange-500/30 transition-all group">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                {getTypeIcon(resource.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate group-hover:text-orange-400 transition-colors">{resource.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <span>{resource.category}</span>
                  <span>•</span>
                  <span>{resource.size}</span>
                  <span>•</span>
                  <span>{new Date(resource.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
              <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs hover:bg-white/10 hover:text-white transition-colors">
                <Eye className="w-3 h-3" />
                Preview
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 text-xs hover:bg-orange-500/20 transition-colors">
                <Download className="w-3 h-3" />
                Download
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
