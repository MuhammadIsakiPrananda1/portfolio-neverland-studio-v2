import { motion } from 'framer-motion';
import { Award, Linkedin, Twitter, Github, Briefcase } from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

const leadership = [
    {
        name: 'Alexander Sterling',
        role: 'Chief Executive Officer',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
        bio: 'Visionary leader with 15 years in cybersecurity. Former CISO at major fintech firm.',
        socials: { linkedin: '#', twitter: '#' }
    },
    {
        name: 'Elena Vance',
        role: 'Chief Technology Officer',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
        bio: 'Architect of our core security infrastructure. Holds multiple patents in encryption technology.',
        socials: { linkedin: '#', github: '#' }
    },
    {
        name: 'Marcus Chen',
        role: 'Chief Information Security Officer',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
        bio: 'Expert in threat intelligence and incident response. Leads our 24/7 SOC operations.',
        socials: { linkedin: '#', twitter: '#' }
    }
];

const team = [
    {
        name: 'Sarah Jenkins',
        role: 'Lead Penetration Tester',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300',
        cert: 'OSCP, CISSP'
    },
    {
        name: 'David Okafor',
        role: 'Cloud Security Architect',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300&h=300',
        cert: 'AWS Security Specialty'
    },
    {
        name: 'Emily Wong',
        role: 'Security Analyst',
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=300&h=300',
        cert: 'CEH, CompTIA Security+'
    },
    {
        name: 'James Miller',
        role: 'DevSecOps Engineer',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
        cert: 'CISM'
    }
];

export default function Team() {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-dark-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[100px]" />
            </div>

            <div className="container-custom relative z-10 px-4 mx-auto max-w-7xl">
                {/* Hero Section - About/Testimonials Style */}
                <motion.div
                    className="text-center mb-24"
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Accent Line */}
                    <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />

                    <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 text-white">
                        Meet The <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Guardians</span>
                    </h1>

                    <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        We are a collective of security experts, ethical hackers, and engineers united by a single mission:
                        to protect your digital world.
                    </p>
                </motion.div>

                {/* Leadership Section */}
                <motion.div
                    className="mb-24"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-2">Leadership Team</h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {leadership.map((leader, index) => (
                            <motion.div
                                key={leader.name}
                                className="group relative rounded-xl p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 hover:-translate-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {/* Image Container */}
                                <div className="relative w-40 h-40 mx-auto mb-6 rounded-full p-1 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500">
                                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-dark-900">
                                        <img
                                            src={leader.image}
                                            alt={leader.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{leader.name}</h3>
                                    <div className="text-blue-400 font-medium text-sm mb-4 uppercase tracking-wider">{leader.role}</div>
                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">{leader.bio}</p>

                                    {/* Social Links */}
                                    <div className="flex justify-center gap-4">
                                        {leader.socials.linkedin && (
                                            <a href={leader.socials.linkedin} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                        {leader.socials.twitter && (
                                            <a href={leader.socials.twitter} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                                <Twitter className="w-5 h-5" />
                                            </a>
                                        )}
                                        {leader.socials.github && (
                                            <a href={leader.socials.github} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Security Experts Grid */}
                <motion.div
                    className="mb-24"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-2">Security Experts</h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                className="rounded-xl p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group hover:-translate-y-1 text-center"
                                variants={staggerItem}
                            >
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full p-0.5 bg-gradient-to-br from-emerald-500/50 to-purple-500/50">
                                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-dark-900">
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{member.name}</h4>
                                <p className="text-gray-400 text-sm mb-3">{member.role}</p>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 mx-auto">
                                    <Award className="w-3 h-3 text-emerald-400" />
                                    <span>{member.cert}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Join Us CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 text-center"
                >
                    <div className="p-1 rounded-2xl bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 inline-block">
                        <div className="bg-dark-900 rounded-xl px-8 py-12 md:px-20 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-50" />
                            <div className="relative z-10">
                                <Briefcase className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
                                <h2 className="text-3xl font-bold mb-4 text-white">Join Our Mission</h2>
                                <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                                    We are always looking for talented individuals who are passionate about cybersecurity.
                                    Ready to make an impact?
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button className="px-8 py-3 rounded-xl bg-white text-dark-900 font-bold hover:bg-gray-200 transition-colors shadow-lg hover:shadow-white/20">
                                        View Open Positions
                                    </button>
                                    <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-colors">
                                        Contact HR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
