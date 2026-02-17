import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Search, 
  ExternalLink, 
  Clock, 
  AlertTriangle, 
  Bug, 
  Lock, 
  Eye,
  TrendingUp,
  RefreshCw,
  Filter,
  Rss
} from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface NewsItem {
  id: string;
  title: string;
  link: string;
  summary: string;
  published: string;
  source: string;
  category: 'breach' | 'vulnerability' | 'malware' | 'exploit' | 'ai' | 'revenue' | 'research' | 'general';
  imageUrl?: string;
  severity: 'high' | 'medium' | 'low';
}

const RSS_FEEDS = [
  { url: 'https://feeds.feedburner.com/TheHackersNews', source: 'The Hacker News', category: 'general' },
  { url: 'https://www.bleepingcomputer.com/feed/', source: 'BleepingComputer', category: 'general' },
  { url: 'https://krebsonsecurity.com/feed/', source: 'Krebs on Security', category: 'general' },
  { url: 'https://threatpost.com/feed/', source: 'Threatpost', category: 'general' },
  { url: 'https://www.zdnet.com/topic/security/rss.xml', source: 'ZDNet Security', category: 'general' },
  { url: 'https://www.cybersecuritydive.com/feeds/news/', source: 'Cybersecurity Dive', category: 'general' },
];

const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://api.codetabs.com/v1/proxy?quest=',
];

const getCategoryInfo = (title: string, summary: string): { category: NewsItem['category'], severity: NewsItem['severity'], icon: React.ReactNode } => {
  const text = (title + ' ' + summary).toLowerCase();
  
  if (text.includes('breach') || text.includes('leak') || text.includes('compromis')) {
    return { category: 'breach', severity: 'high', icon: <AlertTriangle className="w-3.5 h-3.5" /> };
  }
  if (text.includes('vulnerability') || text.includes('zero-day') || text.includes('cve-')) {
    return { category: 'vulnerability', severity: 'high', icon: <Bug className="w-3.5 h-3.5" /> };
  }
  if (text.includes('ransomware') || text.includes('malware') || text.includes('trojan')) {
    return { category: 'malware', severity: 'high', icon: <Lock className="w-3.5 h-3.5" /> };
  }
  if (text.includes('exploit') || text.includes('attack')) {
    return { category: 'exploit', severity: 'high', icon: <TrendingUp className="w-3.5 h-3.5" /> };
  }
  if (text.includes('ai') || text.includes('artificial intelligence') || text.includes('machine learning')) {
    return { category: 'ai', severity: 'low', icon: <Eye className="w-3.5 h-3.5" /> };
  }
  if (text.includes('revenue') || text.includes('funding') || text.includes('investment')) {
    return { category: 'revenue', severity: 'low', icon: <TrendingUp className="w-3.5 h-3.5" /> };
  }
  if (text.includes('research') || text.includes('study') || text.includes('report')) {
    return { category: 'research', severity: 'low', icon: <Shield className="w-3.5 h-3.5" /> };
  }
  return { category: 'general', severity: 'low', icon: <Rss className="w-3.5 h-3.5" /> };
};

const getCategoryColor = (category: NewsItem['category']) => {
  const colors: Record<string, string> = {
    breach: 'bg-red-500/10 border-red-500/30 text-red-400',
    vulnerability: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    malware: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    exploit: 'bg-red-600/10 border-red-600/30 text-red-500',
    ai: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    revenue: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    research: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    general: 'bg-gray-500/10 border-gray-500/30 text-gray-400',
  };
  return colors[category] || colors.general;
};

const sampleNews: NewsItem[] = [
  {
    id: '1',
    title: 'Critical Zero-Day Vulnerability Discovered in Popular Software',
    link: 'https://thehackernews.com/',
    summary: 'Security researchers have identified a critical zero-day vulnerability affecting millions of users worldwide. The vulnerability allows remote code execution and is being actively exploited in the wild.',
    published: '17 Feb 2026, 14:30',
    source: 'The Hacker News',
    category: 'vulnerability',
    severity: 'high'
  },
  {
    id: '2',
    title: 'Major Ransomware Attack Targets Healthcare Organizations',
    link: 'https://www.bleepingcomputer.com/',
    summary: 'A sophisticated ransomware campaign is targeting healthcare institutions globally, encrypting patient records and disrupting medical services. Security experts urge immediate patching.',
    published: '17 Feb 2026, 12:15',
    source: 'BleepingComputer',
    category: 'malware',
    severity: 'high'
  },
  {
    id: '3',
    title: 'AI-Powered Phishing Attacks Surge in 2026',
    link: 'https://krebsonsecurity.com/',
    summary: 'Cybercriminals are increasingly using artificial intelligence to create highly convincing phishing emails that bypass traditional security filters.',
    published: '17 Feb 2026, 10:00',
    source: 'Krebs on Security',
    category: 'ai',
    severity: 'medium'
  },
  {
    id: '4',
    title: 'Tech Giants Invest Billions in Cybersecurity',
    link: 'https://zdnet.com/',
    summary: 'Leading technology companies announce massive investments in cybersecurity research and development, responding to escalating threat landscape.',
    published: '16 Feb 2026, 18:45',
    source: 'ZDNet Security',
    category: 'revenue',
    severity: 'low'
  },
  {
    id: '5',
    title: 'New Supply Chain Attack Compromises Open Source Packages',
    link: 'https://threatpost.com/',
    summary: 'Security researchers discover a sophisticated supply chain attack that has compromised multiple popular open source packages in the npm registry.',
    published: '16 Feb 2026, 15:30',
    source: 'Threatpost',
    category: 'exploit',
    severity: 'high'
  },
  {
    id: '6',
    title: 'Government Agencies Issue New Cybersecurity Guidelines',
    link: 'https://www.cybersecuritydive.com/',
    summary: 'CISA and international partners release updated cybersecurity guidelines for critical infrastructure protection.',
    published: '16 Feb 2026, 11:20',
    source: 'Cybersecurity Dive',
    category: 'research',
    severity: 'low'
  },
];

export default function CyberNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchWithProxy = async (url: string): Promise<string> => {
    for (const proxy of CORS_PROXIES) {
      try {
        const response = await fetch(`${proxy}${encodeURIComponent(url)}`, { 
          signal: AbortSignal.timeout(10000) 
        });
        if (response.ok) {
          return await response.text();
        }
      } catch (e) {
        console.log(`Proxy ${proxy} failed, trying next...`);
      }
    }
    throw new Error('All proxies failed');
  };

  const fetchNews = async () => {
    setLoading(true);
    const allNews: NewsItem[] = [];
    
    for (const feed of RSS_FEEDS) {
      try {
        const text = await fetchWithProxy(feed.url);
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');
        
        items.forEach((item, index) => {
          const title = item.querySelector('title')?.textContent || 'No title';
          const link = item.querySelector('link')?.textContent || '';
          const description = item.querySelector('description')?.textContent || '';
          const pubDate = item.querySelector('pubDate')?.textContent || '';
          const contentEncoded = item.getElementsByTagName('content:encoded')[0]?.textContent || '';
          
          const { category, severity } = getCategoryInfo(title, description);
          
          let imageUrl = '';
          const mediaContent = item.getElementsByTagName('media:content')[0];
          const enclosure = item.querySelector('enclosure');
          const ogImage = contentEncoded.match(/<meta property="og:image" content="([^"]+)"/);
          
          if (mediaContent) imageUrl = mediaContent.getAttribute('url') || '';
          else if (enclosure?.getAttribute('type')?.startsWith('image')) imageUrl = enclosure.getAttribute('url') || '';
          else if (ogImage) imageUrl = ogImage[1];
          
          const cleanSummary = description
            .replace(/<[^>]*>/g, '')
            .replace(/&[^;]+;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 300);

          allNews.push({
            id: `${feed.source}-${index}-${Date.now()}`,
            title,
            link,
            summary: cleanSummary,
            published: pubDate ? new Date(pubDate).toLocaleString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : 'Unknown',
            source: feed.source,
            category,
            severity,
            imageUrl
          });
        });
      } catch (error) {
        console.error(`Error fetching ${feed.source}:`, error);
      }
    }
    
    if (allNews.length === 0) {
      allNews.push(...sampleNews);
    }
    
    const sortedNews = allNews.sort((a, b) => {
      const dateA = new Date(a.published).getTime();
      const dateB = new Date(b.published).getTime();
      return dateB - dateA;
    });
    
    setNews(sortedNews);
    setFilteredNews(sortedNews);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading && news.length === 0) {
        setNews(sampleNews);
        setFilteredNews(sampleNews);
        setLoading(false);
        setLastUpdated(new Date());
      }
    }, 15000);

    fetchNews();

    const interval = setInterval(fetchNews, 300000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let filtered = news;
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }
    
    setFilteredNews(filtered);
  }, [searchTerm, filterCategory, news]);

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'breach', label: 'Breaches' },
    { value: 'vulnerability', label: 'Vulnerabilities' },
    { value: 'malware', label: 'Malware' },
    { value: 'exploit', label: 'Exploits' },
    { value: 'ai', label: 'AI & Tech' },
    { value: 'revenue', label: 'Business' },
    { value: 'research', label: 'Research' },
  ];

  const stats = {
    total: news.length,
    high: news.filter(n => n.severity === 'high').length,
    sources: [...new Set(news.map(n => n.source))].length,
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-purple-500/10 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-blue-500/10 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      <div className="relative z-10 py-12 sm:py-16 md:py-20">
        <div className="container-custom px-4 sm:px-6">
          {/* Header */}
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate="visible"
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 border border-purple-400/20 mb-6 sm:mb-10 backdrop-blur-sm">
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="text-xs sm:text-sm font-bold text-purple-300 tracking-widest uppercase">Cyber Threat Intelligence</span>
                <Shield className="w-4 h-4 text-blue-400" />
              </div>

              {/* Title */}
              <div className="mb-6 sm:mb-8">
                <h2 className="relative inline-block">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-2 sm:mb-3">
                    <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                      Latest Cyber
                    </span>
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black">
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Security News
                    </span>
                  </div>
                  <div className="absolute inset-0 blur-[100px] bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 -z-10" />
                </h2>
              </div>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-10 px-4">
                Real-time cybersecurity news from trusted sources worldwide. Stay informed about the latest threats, vulnerabilities, and security trends.
              </p>

              {/* Decorative Line */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="w-12 sm:w-20 md:w-32 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-purple-500/60" />
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
                <div className="w-12 sm:w-20 md:w-32 h-px bg-gradient-to-l from-transparent via-purple-500/40 to-purple-500/60" />
              </div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={staggerItem}
              className="group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-center border border-white/5 hover:border-purple-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05]">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                  {stats.total}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">
                  Total Articles
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-3/4 transition-all duration-500" />
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-center border border-white/5 hover:border-red-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05]">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-br from-red-400 to-orange-400 bg-clip-text text-transparent">
                  {stats.high}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">
                  High Severity
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-3/4 transition-all duration-500" />
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-center border border-white/5 hover:border-blue-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05]">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {stats.sources}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">
                  News Sources
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-3/4 transition-all duration-500" />
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="group col-span-2 md:col-span-1"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-center border border-white/5 hover:border-emerald-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05]">
                <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium">
                  {lastUpdated.toLocaleTimeString('id-ID')}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">
                  Last updated
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-3/4 transition-all duration-500" />
              </div>
            </motion.div>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 w-full md:w-72"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-8 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-purple-500/50 appearance-none"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={fetchNews}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="text-sm">Refresh</span>
            </button>
          </div>

          {/* Loading State */}
          {loading && news.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400">Loading latest security news...</p>
              </div>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No news found matching your criteria.</p>
            </div>
          ) : (
            /* News Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group block"
                >
                  <div className="relative rounded-xl border border-white/5 overflow-hidden hover:border-purple-500/30 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] h-full">
                    {/* Image */}
                    {item.imageUrl && (
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="p-5">
                      {/* Category & Severity */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                        {item.severity === 'high' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 border border-red-500/30 text-red-400">
                            HIGH
                          </span>
                        )}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                        {item.title}
                      </h3>
                      
                      {/* Summary */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {item.summary}
                      </p>
                      
                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/5">
                        <div className="flex items-center gap-1">
                          <Rss className="w-3 h-3" />
                          <span>{item.source}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.published}</span>
                        </div>
                      </div>
                      
                      {/* Read more indicator */}
                      <div className="flex items-center gap-1 mt-3 pt-3 text-purple-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Read more</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              News aggregated from multiple cybersecurity sources • Auto-refresh every 5 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
