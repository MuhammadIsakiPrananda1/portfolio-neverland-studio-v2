import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    BookOpen, FileText, Download, Wrench, ChevronDown, ChevronUp,
    Search, Zap, Library, Mail, X
} from 'lucide-react';
import { slideUp, staggerContainer, staggerItem } from '@utils/animations';
import { Routes } from '@config/constants';
import Button from '@components/atoms/Button';

const generateMockContent = (category: string, count: number) => {
    const topics = [
        'Zero Trust Architecture', 'AI-Driven Threat Detection', 'Cloud Native Security',
        'Ransomware Defense Strategies', 'Identity & Access Management', 'DevSecOps Pipelines',
        'IoT Vulnerability Scanning', 'Blockchain Forensics', 'Quantum Cryptography',
        'Phishing Prevention', 'Network Segmentation', 'Compliance Automation',
        'Endpoint Protection', 'Data Loss Prevention', 'API Security Best Practices',
        'Social Engineering Attacks', 'Cyber Insurance Trends', 'Incident Response Playbooks',
        'Supply Chain Risk Management', 'Container Security', 'Kubernetes Hardening',
        'Dark Web Monitoring', 'Insider Threat Detection', 'Biometric Authentication',
        'Adaptive Access Control', 'Security Awareness Training', 'Forensic Analysis',
        'Threat Hunting Techniques', 'Vulnerability Assessment', 'Patch Management',
        'Cloud Security Posture Management', 'Secrets Management', 'Hardware Security Modules',
        'Mobile Device Management', 'Email Security Gateway', 'Web Application Firewall',
        'DDoS Mitigation Strategies', 'SOC 2 Compliance Checklist', 'ISO 27001 Implementation',
        'GDPR Data Privacy', 'CCPA Consumer Rights', 'PCI-DSS Requirements',
        'HIPAA Security Rule', 'NIST Cybersecurity Framework', 'MITRE ATT&CK Matrix',
        'OWASP Top 10 Risks', 'SANS Critical Controls', 'CIS Benchmarks',
        'Red Teaming Exercises', 'Blue Teaming Strategies', 'Purple Teaming Collaboration',
        'Digital Forensics', 'Reverse Engineering Malware', 'Exploit Development',
        'Zero-Day Vulnerability Research', 'Bug Bounty Hunting', 'Ethical Hacking Tools',
        'Penetration Testing Methodologies', 'Security Orchestration (SOAR)', 'SIEM Optimization'
    ];

    const prefixes = [
        'The Future of', 'Advanced', 'Essential Guide to', 'Mastering', 'State of', 'Securing',
        'Optimizing', 'Implementing', 'Defending', 'Understanding', 'Navigating', 'Analyzing',
        'Breaking Down', 'Simplifying', 'Demystifying', 'Accelerating', 'Transforming', 'Protecting'
    ];
    const suffixes = [
        'in 2024', 'for Enterprise', 'Case Study', 'Best Practices', 'Framework', 'Analysis',
        'Checklist', 'Whitepaper', 'Report', 'Insights', 'Strategies', 'Roadmap', 'Blueprint',
        'Handbook', 'Manual', 'Protocol', 'Standard', 'Methodology'
    ];

    return Array.from({ length: count }).map((_, i) => {
        let type = 'Article';
        let action = 'Read Now';

        // Generate Random Title
        const topic = topics[i % topics.length];
        const prefix = prefixes[i % prefixes.length];
        const suffix = suffixes[i % suffixes.length];
        const title = `${prefix} ${topic} ${suffix}`;

        // Generate "Real-time" meta
        const timeAgo = i === 0 ? 'Just now' : i < 5 ? `${i * 10} mins ago` : i < 12 ? `${i} hours ago` : `${Math.floor(i / 5)} days ago`;
        let meta = `5 min read • ${timeAgo}`;

        if (category.includes('Whitepapers')) {
            type = 'Whitepaper';
            action = 'Download';
            meta = `PDF • ${(Math.random() * 5 + 1).toFixed(1)} MB • ${timeAgo}`;
        }
        else if (category.includes('Case')) {
            type = 'Case Study';
            action = 'View Case';
            meta = `Banking • Security • ${timeAgo}`;
        }
        else if (category.includes('Tools')) {
            type = 'Utility';
            action = 'Open Tool';
            meta = `Browser-based • v${(Math.random() * 2 + 1).toFixed(1)}`;
        }

        return {
            title,
            meta,
            type,
            action,
            url: `https://www.google.com/search?q=${encodeURIComponent(title + ' cybersecurity')}`
        };
    });
};

const RESOURCE_CONTENT: Record<string, Array<{ title: string; meta: string; type: string; action: string; url: string }>> = {
    'Blog & Articles': generateMockContent('Blog', 142),
    'Whitepapers': generateMockContent('Whitepapers', 24),
    'Case Studies': generateMockContent('Case Studies', 56),
    'Security Tools': generateMockContent('Security Tools', 12)
};

const resourceCategories = [
    {
        title: 'Blog & Articles',
        description: 'Latest insights, security trends, and technical guides from our experts.',
        icon: BookOpen,
        link: Routes.BLOG,
        color: 'emerald',
        count: '142 Articles'
    },
    {
        title: 'Whitepapers',
        description: 'In-depth research papers and strategic security frameworks.',
        icon: Download,
        link: '#',
        color: 'blue',
        count: '24 Papers'
    },
    {
        title: 'Case Studies',
        description: 'Real-world examples of how we helped clients secure their infrastructure.',
        icon: FileText,
        link: '#',
        color: 'purple',
        count: '56 Stories'
    },
    {
        title: 'Security Tools',
        description: 'Free utilities for password checking, header analysis, and more.',
        icon: Wrench,
        link: Routes.PLAYGROUND,
        color: 'pink',
        count: '12 Tools'
    }
];

const faqs = [
    {
        category: 'General',
        question: 'How often should I perform a penetration test?',
        answer: 'We recommend conducting penetration tests at least annually, or whenever significant changes are made to your infrastructure or applications. For high-risk industries, quarterly testing is advisable.'
    },
    {
        category: 'Services',
        question: 'What is the difference between a vulnerability scan and a penetration test?',
        answer: 'A vulnerability scan is an automated search for known weaknesses, while a penetration test simulates a real-world attack where extensive manual testing is performed to exploit those weaknesses and assess the business impact.'
    },
    {
        category: 'Security',
        question: 'Do you offer 24/7 security monitoring?',
        answer: 'Yes, our SOC (Security Operations Center) operates 24/7/365 to monitor, detect, and respond to threats in real-time.'
    },
    {
        category: 'Support',
        question: 'How does your incident response process work?',
        answer: 'Our incident response team follows a 6-step process: Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned. We can deploy immediately to mitigate active threats.'
    }
];

export default function Resources() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedResource, setSelectedResource] = useState<typeof resourceCategories[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const openResourceModal = (resource: typeof resourceCategories[0]) => {
        setSelectedResource(resource);
        setIsModalOpen(true);
    };

    const closeResourceModal = () => {
        setIsModalOpen(false);
        setSelectedResource(null);
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-dark-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[100px]" />
                <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
            </div>

            <div className="container-custom relative z-10 px-4 mx-auto max-w-7xl">
                {/* Hero Section - Matching Help Center */}
                <motion.div
                    className="text-center mb-20"
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                        <Library className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Resources</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-white">
                        Knowledge Center
                    </h1>

                    <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
                        Empowering you with the knowledge, tools, and insights to stay ahead of cyber threats.
                    </p>

                    {/* Helper Center Style Search Bar */}
                    <div className="max-w-2xl mx-auto relative z-20">
                        <div className="relative flex items-center bg-dark-800/50 border border-white/10 rounded-xl p-1.5 hover:border-white/20 transition-all duration-200 backdrop-blur-md">
                            <Search className="w-5 h-5 text-gray-400 ml-4" />
                            <input
                                type="text"
                                placeholder="Search for articles, whitepapers, or tools..."
                                className="w-full bg-transparent border-none text-white placeholder-gray-500 px-4 py-3 focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button variant="primary" className="!py-2.5 !px-5 rounded-lg bg-emerald-500 hover:bg-emerald-600 border-none">
                                Search
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Resource Categories - Matching Help Center Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {resourceCategories.map((cat) => (
                        <motion.div
                            key={cat.title}
                            variants={staggerItem}
                        >
                            <button
                                onClick={() => openResourceModal(cat)}
                                className="w-full text-left block group h-full"
                            >
                                <div className="relative h-full rounded-xl p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/20 transition-all duration-300 group">

                                    <div className={`inline-flex p-3 rounded-lg bg-${cat.color}-500/5 border border-${cat.color}-500/10 mb-4 group-hover:bg-${cat.color}-500/10 transition-all`}>
                                        <cat.icon className={`w-6 h-6 text-${cat.color}-400`} />
                                    </div>

                                    <h3 className={`text-lg font-bold text-white mb-2 group-hover:text-${cat.color}-400 transition-colors`}>{cat.title}</h3>
                                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">{cat.description}</p>

                                    <div className="flex items-center gap-2 mt-auto">
                                        <BookOpen className="w-4 h-4 text-gray-500" />
                                        <span className="text-xs text-gray-500">{cat.count}</span>
                                    </div>

                                    {/* Accent Line */}
                                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-${cat.color}-500 to-emerald-500 group-hover:w-3/4 transition-all duration-500`} />
                                </div>
                            </button>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Modal for Resource Content */}
                <AnimatePresence>
                    {isModalOpen && selectedResource && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative w-full max-w-2xl bg-dark-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[101]"
                            >
                                {/* Modal Header */}
                                <div className="p-6 border-b border-white/10 flex items-start justify-between bg-white/5 relative overflow-hidden">
                                    {/* Top Accent */}
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${selectedResource.color}-500 to-emerald-500`} />

                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl bg-${selectedResource.color}-500/10 border border-${selectedResource.color}-500/20`}>
                                            <selectedResource.icon className={`w-6 h-6 text-${selectedResource.color}-400`} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{selectedResource.title}</h3>
                                            <p className="text-sm text-gray-400">{selectedResource.count}</p>
                                        </div>
                                    </div>
                                    <button onClick={closeResourceModal} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Modal Content List - Grid Layout */}
                                <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {RESOURCE_CONTENT[selectedResource.title]?.map((item, i) => (
                                            <div key={i} className="group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200 flex flex-col h-full">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className={`p-2 rounded-lg bg-${selectedResource.color}-500/5 group-hover:bg-${selectedResource.color}-500/10 transition-colors`}>
                                                        <FileText className={`w-4 h-4 text-${selectedResource.color}-400`} />
                                                    </div>
                                                    <span className="text-[10px] uppercase font-semibold text-gray-500 bg-white/5 px-2 py-1 rounded-full">{item.type}</span>
                                                </div>

                                                <h4 className="text-white text-sm font-medium mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">{item.title}</h4>
                                                <p className="text-xs text-gray-500 mb-4">{item.meta}</p>

                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`w-full mt-auto py-2 rounded-lg text-xs font-medium bg-${selectedResource.color}-500/10 text-${selectedResource.color}-400 hover:bg-${selectedResource.color}-500/20 transition-colors text-center block`}
                                                >
                                                    {item.action}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="p-4 border-t border-white/10 bg-white/[0.02] text-center">
                                    <p className="text-sm text-gray-500">Need something else? <Link to={Routes.CONTACT} className="text-emerald-400 hover:underline">Contact our team</Link></p>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Featured Resource - Horizontal Card */}
                <motion.div
                    className="mb-24"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="p-1 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20">
                        <div className="bg-dark-900 rounded-[22px] overflow-hidden relative border border-white/5">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6 w-fit">
                                        <Zap className="w-3 h-3" />
                                        <span>New Release</span>
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">State of Cyber Security 2024 Report</h2>
                                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                        Our comprehensive annual analysis of the global threat landscape, emerging trends, and predictive insights for the coming year.
                                    </p>
                                    <ul className="mb-8 space-y-3">
                                        {['Ransomware evolution analysis', 'AI in offensive and defensive security', 'Cloud infrastructure vulnerabilities'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-3" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-dark-900 font-bold hover:bg-gray-200 transition-colors w-fit">
                                        <Download className="w-4 h-4" />
                                        Download Report
                                    </button>
                                </div>
                                <div className="relative min-h-[300px] lg:min-h-full bg-gradient-to-br from-emerald-900/10 to-blue-900/10 p-12 flex items-center justify-center overflow-hidden">
                                    {/* Abstract Decorative Background */}
                                    <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]" />

                                    {/* Mock Report Cover */}
                                    <motion.div
                                        className="relative w-64 aspect-[3/4] bg-dark-800 rounded-lg shadow-2xl border border-white/10 p-6 flex flex-col justify-between group z-10"
                                        whileHover={{ rotate: 0, scale: 1.05 }}
                                        initial={{ rotate: 6 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-lg" />
                                        <div>
                                            <div className="w-8 h-8 rounded bg-emerald-500 mb-4" />
                                            <div className="h-4 w-3/4 bg-white/10 rounded mb-2" />
                                            <div className="h-4 w-1/2 bg-white/10 rounded" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 w-full bg-white/5 rounded" />
                                            <div className="h-2 w-full bg-white/5 rounded" />
                                            <div className="h-2 w-full bg-white/5 rounded" />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* FAQ Section - Matching Help Center Style */}
                <motion.div
                    className="max-w-4xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-3">Common Questions</h2>
                        <p className="text-gray-400">Quick answers to frequently asked questions</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className={`rounded-xl border transition-all duration-200 ${openFaq === index
                                    ? 'bg-dark-800 border-emerald-500/30'
                                    : 'bg-dark-800/50 border-white/10 hover:border-white/20'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full text-left p-6 flex items-start justify-between gap-4"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${openFaq === index
                                                ? 'bg-emerald-500/20 text-emerald-400'
                                                : 'bg-white/5 text-gray-500'
                                                }`}>
                                                {faq.category}
                                            </span>
                                        </div>
                                        <span className={`font-semibold text-base transition-colors ${openFaq === index ? 'text-emerald-400' : 'text-white'
                                            }`}>
                                            {faq.question}
                                        </span>
                                    </div>
                                    <div className={`p-2 rounded-lg flex-shrink-0 transition-colors ${openFaq === index
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-white/5 text-gray-400'
                                        }`}>
                                        {openFaq === index ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Need More Help / Newsletter Section */}
                <motion.div
                    className="rounded-2xl bg-dark-800/50 border border-white/10 p-10 text-center"
                    variants={slideUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="max-w-2xl mx-auto">
                        <div className="inline-flex p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-6">
                            <Mail className="w-8 h-8 text-blue-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                        <p className="text-gray-400 mb-8">
                            Get the latest security insights and resources delivered directly to your inbox.
                        </p>

                        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter your work email"
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                            <Button variant="primary" className="!py-3 !px-6 rounded-xl whitespace-nowrap">
                                Subscribe
                            </Button>
                        </form>
                        <p className="text-gray-600 text-xs mt-4">No spam. Unsubscribe at any time.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
