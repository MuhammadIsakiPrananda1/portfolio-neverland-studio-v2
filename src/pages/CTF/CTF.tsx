import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Flag, Target, Lock, Code, FileCode, 
  Binary, Network, Zap,
  Award, Users, CheckCircle,
  ArrowRight, Lightbulb,
  Shield, GraduationCap, TrendingUp
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { staggerContainer } from '@utils/animations';
import { Routes } from '@config/constants';

export default function CTFPage() {
  const stats = [
    { value: '500+', label: 'Global CTF Events/Year' },
    { value: '100K+', label: 'Active Participants' },  
    { value: '85%', label: 'Skill Improvement' },
    { value: 'Top 10', label: 'Career Booster Skill' },
  ];

  const benefits = [
    {
      icon: Target,
      title: 'Practical Experience',
      description: 'Learn by doing - solve real-world security challenges in a safe, controlled environment.',
    },
    {
      icon: GraduationCap,
      title: 'Skill Development',
      description: 'Build expertise in penetration testing, cryptography, and vulnerability analysis through hands-on practice.',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Enhance your cybersecurity career with practical problem-solving experience valued by employers.',
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Join a global community of security professionals and enthusiasts, share knowledge and grow together.',
    },
  ];

  const categories = [
    { 
      id: 'web', 
      name: 'Web Exploitation', 
      icon: Code,
      description: 'Master web vulnerabilities including SQL injection, XSS, CSRF, and authentication bypass techniques.',
    },
    { 
      id: 'crypto', 
      name: 'Cryptography', 
      icon: Lock,
      description: 'Learn to break ciphers, understand encryption mechanisms, and analyze cryptographic protocols.',
    },
    { 
      id: 'forensics', 
      name: 'Digital Forensics', 
      icon: FileCode,
      description: 'Analyze files, memory dumps, network captures, and uncover hidden information in digital artifacts.',
    },
    { 
      id: 'reverse', 
      name: 'Reverse Engineering', 
      icon: Binary,
      description: 'Understand compiled binaries, malware analysis, and assembly code reverse engineering.',
    },
    { 
      id: 'pwn', 
      name: 'Binary Exploitation', 
      icon: Target,
      description: 'Exploit memory corruption vulnerabilities including buffer overflows, ROP chains, and format strings.',
    },
    { 
      id: 'network', 
      name: 'Network Security', 
      icon: Network,
      description: 'Master packet analysis, protocol exploitation, and network-based attack techniques.',
    },
  ];

  const whyCTF = [
    {
      icon: Shield,
      title: 'Build Defense Skills',
      description: 'Understanding attack vectors helps you build better defenses. CTF challenges teach you to think like an attacker to protect like a defender.',
    },
    {
      icon: Lightbulb,
      title: 'Problem-Solving Excellence',
      description: 'Develop critical thinking and creative problem-solving skills that are essential for cybersecurity professionals in real-world scenarios.',
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'CTF participation is highly valued by employers and demonstrates practical security knowledge beyond theoretical certifications.',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Learning',
      description: 'Stay updated with the latest attack techniques and security trends through challenging scenarios that mirror real-world threats.',
    },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section - Clean & Modern */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtle Accent Line */}
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8 rounded-full" />
          
          {/* Icon Badge - Minimal */}
          <div className="inline-flex p-4 rounded-xl border border-orange-500/20 bg-orange-500/5 mb-6">
            <Flag className="w-12 h-12 text-orange-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Capture The Flag Training
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Learn cybersecurity through hands-on challenges. CTF competitions test your ability 
            to find and exploit vulnerabilities in a safe, legal environment.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start Learning
              </Button>
            </Link>
            <Link to={Routes.CYBER_SECURITY}>
              <Button variant="outline" size="lg" className="border-white/10 hover:border-orange-500/30">
                View All Services
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Section - Clean Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-xl p-6 text-center border border-white/5 hover:border-orange-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-3/4 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* What is CTF Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Introduction"
            title="What is Capture The Flag?"
            className="mb-12"
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-xl p-8 lg:p-10 border border-white/5 bg-white/[0.02]">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-orange-500 to-red-500 rounded-l-xl" />
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                CTF (Capture The Flag) is a cybersecurity competition where participants solve security challenges 
                to find hidden "flags". Each challenge tests different skills - from web exploitation and cryptography 
                to reverse engineering and forensics.
              </p>
              <p className="text-gray-400 leading-relaxed">
                These competitions simulate real-world security scenarios in a safe, legal environment, making them 
                perfect for learning offensive security techniques, testing your skills, and understanding how attackers 
                think. Whether you're just starting in cybersecurity or are an experienced professional, CTFs offer 
                valuable hands-on experience that complements theoretical knowledge.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Why Learn CTF"
            title="Key Benefits of CTF Training"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex-shrink-0 p-2.5 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/10 inline-flex mb-4">
                  <benefit.icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Challenge Types"
            title="CTF Categories & Disciplines"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, idx) => (
              <motion.div
                key={category.id}
                className="relative rounded-xl p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 p-2.5 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/10 group-hover:scale-110 transition-transform">
                    <category.icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white pt-1">
                    {category.name}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why CTF Matters Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Impact"
            title="Why CTF Training Matters"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyCTF.map((item, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/10">
                    <item.icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="relative rounded-2xl p-10 lg:p-14 border border-white/5 bg-gradient-to-br from-orange-500/5 to-red-500/5 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-500/10 to-transparent" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 mb-6">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-wide">Get Started</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Start Your CTF Journey?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl">
              Join our cybersecurity training program and learn CTF skills from industry experts. 
              We offer comprehensive training, expert mentoring, and practical challenges to accelerate your growth.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to={Routes.CONTACT}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Get Started Today
                </Button>
              </Link>
              <Link to={Routes.CYBER_SECURITY}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-orange-500/30">
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white mb-1">Expert Mentors</div>
                  <div className="text-xs text-gray-400">Learn from experienced professionals</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white mb-1">Hands-On Practice</div>
                  <div className="text-xs text-gray-400">Real challenges in safe environments</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white mb-1">Industry Certification</div>
                  <div className="text-xs text-gray-400">Recognized credentials to boost your career</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
