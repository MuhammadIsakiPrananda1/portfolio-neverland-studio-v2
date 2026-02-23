import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, ExternalLink, Tag, Clock, Shield, Globe, Lock, Terminal, Cpu, Eye } from 'lucide-react';

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

interface Writeup {
    id: string;
    title: string;
    event: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
    tags: string[];
    icon: any;
    readTime: string;
    date: string;
    description: string;
}

const WRITEUPS: Writeup[] = [
    { id: '1', title: 'SQL Injection Authentication Bypass', event: 'HackTheBox', category: 'Web', difficulty: 'Easy', tags: ['SQLi', 'Authentication', 'MySQL'], icon: Globe, readTime: '8 min', date: '2024-12', description: 'Classic authentication bypass technique using SQL Injection on an unprotected login form.' },
    { id: '2', title: 'Buffer Overflow – Ret2libc Attack', event: 'PicoCTF', category: 'Pwn', difficulty: 'Hard', tags: ['Buffer Overflow', 'Ret2libc', 'ASLR Bypass'], icon: Terminal, readTime: '15 min', date: '2024-11', description: 'Exploiting buffer overflow using return-to-libc technique to bypass NX protection on a 64-bit binary.' },
    { id: '3', title: 'RSA Low Public Exponent Attack', event: 'ImaginaryCTF', category: 'Crypto', difficulty: 'Medium', tags: ['RSA', 'Low Exponent', 'Number Theory'], icon: Lock, readTime: '10 min', date: '2024-11', description: 'Analysis of an attack on RSA implementations with public exponent e=3 using the Hastad Broadcast Attack.' },
    { id: '4', title: 'XSS to Admin Cookie Theft', event: 'CTFZone', category: 'Web', difficulty: 'Medium', tags: ['XSS', 'Cookie Stealing', 'CSP Bypass'], icon: Globe, readTime: '12 min', date: '2024-10', description: 'XSS exploit chain to steal admin session cookies by bypassing Content Security Policy.' },
    { id: '5', title: 'Linux Privilege Escalation via SUID', event: 'TryHackMe', category: 'Linux', difficulty: 'Easy', tags: ['Privesc', 'SUID', 'GTFOBins'], icon: Shield, readTime: '6 min', date: '2024-10', description: 'Privilege escalation to root using an exploitable SUID binary via GTFOBins.' },
    { id: '6', title: 'Reverse Engineering Obfuscated Binary', event: 'DEFCON CTF', category: 'Reversing', difficulty: 'Expert', tags: ['Reversing', 'Anti-Debug', 'Ghidra'], icon: Cpu, readTime: '20 min', date: '2024-09', description: 'Deep analysis of an obfuscated binary with anti-debugging tricks using Ghidra and GDB.' },
    { id: '7', title: 'Stego: Hidden Data in PNG Metadata', event: 'WeCTF', category: 'Forensics', difficulty: 'Easy', tags: ['Steganography', 'PNG', 'Metadata'], icon: Eye, readTime: '5 min', date: '2024-09', description: 'Extracting hidden data from PNG file metadata using exiftool and binwalk.' },
    { id: '8', title: 'JWT Algorithm Confusion Attack', event: 'PortSwigger', category: 'Web', difficulty: 'Hard', tags: ['JWT', 'RS256 to HS256', 'Auth Bypass'], icon: Globe, readTime: '14 min', date: '2024-08', description: 'Exploiting a JWT algorithm confusion attack to gain admin access without the private key.' },
];

const CATEGORIES = ['All', 'Web', 'Crypto', 'Pwn', 'Reversing', 'Forensics', 'Linux'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard', 'Expert'];

const diffColor: Record<string, string> = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Hard: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Expert: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function PlaygroundLearningWriteups() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [difficulty, setDifficulty] = useState('All');

    const filtered = WRITEUPS.filter(w => {
        const matchSearch = w.title.toLowerCase().includes(search.toLowerCase()) ||
            w.event.toLowerCase().includes(search.toLowerCase()) ||
            w.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
        const matchCat = category === 'All' || w.category === category;
        const matchDiff = difficulty === 'All' || w.difficulty === difficulty;
        return matchSearch && matchCat && matchDiff;
    });

    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">
                {/* Hero */}
                <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-purple-600 mx-auto mb-8 rounded-full" />
                    <div className="inline-flex p-4 rounded-xl border border-violet-500/20 bg-violet-500/5 mb-6">
                        <FileText className="w-12 h-12 text-violet-400" />
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-white/90">CTF </span>
                        <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Write-ups</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        In-depth analysis of CTF solutions from various competitions. Learn the techniques, tricks, and methodologies used by top players.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div className="flex flex-col gap-4 mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search write-ups, events, or tags..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(c => (
                            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${category === c ? 'bg-violet-500 text-white' : 'bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/10'}`}>{c}</button>
                        ))}
                        <div className="w-px h-6 bg-white/10 mx-1 self-center" />
                        {DIFFICULTIES.map(d => (
                            <button key={d} onClick={() => setDifficulty(d)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${difficulty === d ? 'bg-purple-500 text-white' : 'bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/10'}`}>{d}</button>
                        ))}
                    </div>
                </motion.div>

                {/* Grid */}
                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {filtered.map(w => {
                        const Icon = w.icon;
                        return (
                            <motion.div key={w.id} variants={staggerItem} className="group relative rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/20 transition-all p-6 cursor-pointer">
                                <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-violet-500 to-purple-600 rounded-tl-xl rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
                                            <Icon className="w-5 h-5 text-violet-400" />
                                        </div>
                                        <div>
                                            <span className="block text-xs font-semibold text-violet-400 mb-0.5">{w.event}</span>
                                            <span className="text-xs text-gray-500">{w.category} • {w.date}</span>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${diffColor[w.difficulty]}`}>{w.difficulty}</span>
                                </div>
                                <h3 className="text-base font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{w.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">{w.description}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex flex-wrap gap-1.5">
                                        {w.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="flex items-center gap-1 text-[10px] text-gray-500 bg-white/[0.04] border border-white/5 rounded-md px-2 py-0.5">
                                                <Tag className="w-2.5 h-2.5" />{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{w.readTime}</div>
                                        <div className="flex items-center gap-1 text-violet-400 group-hover:gap-2 transition-all"><ExternalLink className="w-3.5 h-3.5" />Read</div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <Search className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-white mb-2">No Results Found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
