import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    BookOpen, FileText, Wrench, Map, ArrowRight,
    Shield, Terminal, Lock, Globe, Cpu, ChevronRight,
    GraduationCap, Lightbulb, Star, TrendingUp
} from 'lucide-react';
import { Routes } from '@config/constants';

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const learningCategories = [
    {
        path: Routes.PLAYGROUND_LEARNING_WRITEUPS,
        label: 'CTF Write-ups',
        icon: FileText,
        color: 'from-violet-500 to-purple-600',
        borderColor: 'border-violet-500/20',
        bgColor: 'bg-violet-500/5',
        iconColor: 'text-violet-400',
        description: 'In-depth analysis of CTF challenge solutions. Learn techniques, methodologies, and hidden tricks across various challenge categories.',
        stats: '120+ Write-ups',
        badge: 'Popular',
        badgeColor: 'bg-violet-500/20 text-violet-300',
    },
    {
        path: Routes.PLAYGROUND_LEARNING_TOOLS,
        label: 'Tools & Cheatsheets',
        icon: Wrench,
        color: 'from-cyan-500 to-blue-600',
        borderColor: 'border-cyan-500/20',
        bgColor: 'bg-cyan-500/5',
        iconColor: 'text-cyan-400',
        description: 'A complete collection of cybersecurity tools, command cheatsheets, and quick references for penetration testing and forensics.',
        stats: '50+ Tools',
        badge: 'New',
        badgeColor: 'bg-cyan-500/20 text-cyan-300',
    },
    {
        path: Routes.PLAYGROUND_LEARNING_ROADMAP,
        label: 'Learning Roadmap',
        icon: Map,
        color: 'from-emerald-500 to-teal-600',
        borderColor: 'border-emerald-500/20',
        bgColor: 'bg-emerald-500/5',
        iconColor: 'text-emerald-400',
        description: 'Structured learning paths from beginner to expert. Follow roadmaps designed by cybersecurity professionals.',
        stats: '8 Learning Paths',
        badge: 'Guided',
        badgeColor: 'bg-emerald-500/20 text-emerald-300',
    },
];

const featuredTopics = [
    { icon: Shield, label: 'Network Security', count: '24 lessons', color: 'text-blue-400' },
    { icon: Terminal, label: 'Linux & Shell', count: '18 lessons', color: 'text-green-400' },
    { icon: Lock, label: 'Cryptography', count: '15 lessons', color: 'text-yellow-400' },
    { icon: Globe, label: 'Web Exploitation', count: '32 lessons', color: 'text-red-400' },
    { icon: Cpu, label: 'Reverse Engineering', count: '12 lessons', color: 'text-purple-400' },
    { icon: GraduationCap, label: 'Ethical Hacking', count: '40 lessons', color: 'text-cyan-400' },
];

const stats = [
    { icon: BookOpen, value: '200+', label: 'Learning Materials' },
    { icon: Star, value: '4.9', label: 'Avg. Rating' },
    { icon: TrendingUp, value: '8', label: 'Learning Paths' },
    { icon: Lightbulb, value: '50+', label: 'Tools & References' },
];

export default function PlaygroundLearning() {
    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">

                {/* Hero */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="w-20 h-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 mx-auto mb-8 rounded-full" />

                    <div className="inline-flex p-4 rounded-xl border border-violet-500/20 bg-violet-500/5 mb-6">
                        <BookOpen className="w-12 h-12 text-violet-400" />
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-white/90">Deep </span>
                        <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                            Learning Hub
                        </span>
                    </h1>

                    <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
                        Your deep learning center for cybersecurity. From CTF write-ups and tool references
                        to structured roadmaps — everything you need to level up your skills.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                        {[
                            { icon: Shield, label: 'Curated Content', color: 'text-violet-400' },
                            { icon: GraduationCap, label: 'Structured Learning', color: 'text-cyan-400' },
                            { icon: TrendingUp, label: 'Progressive Difficulty', color: 'text-emerald-400' },
                        ].map(({ icon: Icon, label, color }) => (
                            <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5">
                                <Icon className={`w-4 h-4 ${color}`} />
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {stats.map(({ icon: Icon, value, label }) => (
                        <motion.div
                            key={label}
                            variants={staggerItem}
                            className="text-center p-6 rounded-xl border border-white/5 bg-white/[0.02]"
                        >
                            <Icon className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-white mb-1">{value}</div>
                            <div className="text-xs text-gray-500">{label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Categories */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {learningCategories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <motion.div key={cat.path} variants={staggerItem}>
                                <Link to={cat.path} className="group block h-full">
                                    <div className={`relative h-full rounded-2xl border ${cat.borderColor} ${cat.bgColor} p-7 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden`}>
                                        {/* Top gradient bar */}
                                        <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                        {/* Badge */}
                                        <div className="flex items-start justify-between mb-5">
                                            <div className={`p-3 rounded-xl border ${cat.borderColor} bg-white/[0.03]`}>
                                                <Icon className={`w-7 h-7 ${cat.iconColor}`} />
                                            </div>
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cat.badgeColor}`}>
                                                {cat.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                                            {cat.label}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                            {cat.description}
                                        </p>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
                                            <span className="text-xs text-gray-500 font-mono">{cat.stats}</span>
                                            <div className={`flex items-center gap-1 text-xs font-semibold ${cat.iconColor} group-hover:gap-2 transition-all duration-200`}>
                                                Explore <ArrowRight className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Featured Topics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">Featured Topics</h2>
                        <Link
                            to={Routes.PLAYGROUND_LEARNING_ROADMAP}
                            className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                        >
                            View All Paths <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {featuredTopics.map(({ icon: Icon, label, count, color }) => (
                            <Link
                                key={label}
                                to={Routes.PLAYGROUND_LEARNING_ROADMAP}
                                className="group flex flex-col items-center text-center p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200"
                            >
                                <div className="p-3 rounded-lg bg-white/[0.04] border border-white/5 mb-3 group-hover:scale-110 transition-transform duration-200">
                                    <Icon className={`w-5 h-5 ${color}`} />
                                </div>
                                <span className="text-white text-xs font-semibold mb-1">{label}</span>
                                <span className="text-gray-600 text-[10px]">{count}</span>
                            </Link>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
