import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, Lock, Eye, Zap, TrendingUp, Users, 
  CheckCircle, AlertTriangle, Server,
  ArrowRight, Award, Clock, Target
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';
import { slideUp, staggerContainer, staggerItem, fadeIn } from '@utils/animations';

export default function CyberSecurityPage() {
  const threats = [
    {
      icon: AlertTriangle,
      title: 'Ransomware Attacks',
      description: 'Malicious software that encrypts data and demands payment for decryption.',
      severity: 'Critical',
    },
    {
      icon: Eye,
      title: 'Data Breaches',
      description: 'Unauthorized access to sensitive information and customer data.',
      severity: 'High',
    },
    {
      icon: Server,
      title: 'DDoS Attacks',
      description: 'Distributed denial-of-service attacks that overwhelm systems.',
      severity: 'High',
    },
    {
      icon: Lock,
      title: 'Phishing & Social Engineering',
      description: 'Deceptive tactics to trick employees into revealing credentials.',
      severity: 'Medium',
    },
  ];

  const protections = [
    {
      icon: Shield,
      title: 'Proactive Defense',
      description: 'Stay ahead of threats with continuous monitoring and threat intelligence.',
    },
    {
      icon: Lock,
      title: 'Multi-Layer Security',
      description: 'Defense-in-depth strategy with multiple security controls.',
    },
    {
      icon: Zap,
      title: 'Rapid Response',
      description: '24/7 incident response team ready to mitigate threats immediately.',
    },
    {
      icon: Target,
      title: 'Risk Assessment',
      description: 'Comprehensive evaluation to identify and prioritize vulnerabilities.',
    },
  ];

  const stats = [
    { value: '99.9%', label: 'Threat Detection Rate' },
    { value: '< 15min', label: 'Average Response Time' },
    { value: '500+', label: 'Threats Neutralized' },
    { value: '150+', label: 'Protected Enterprises' },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section - Clean & Modern */}
        <motion.div
          className="text-center mb-24"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          {/* Subtle Accent Line */}
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8 rounded-full" />
          
          {/* Icon Badge - Minimal */}
          <div className="inline-flex p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 mb-6">
            <Shield className="w-12 h-12 text-purple-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Enterprise Cyber Security
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Protect your digital assets with cutting-edge security solutions. 
            We safeguard businesses from evolving cyber threats with proactive defense strategies.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Get Protected Today
              </Button>
            </Link>
            <Link to={Routes.HOME}>
              <Button variant="outline" size="lg" className="border-white/10 hover:border-purple-500/30">
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
              className="relative rounded-xl p-6 text-center border border-white/5 hover:border-purple-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] group"
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-3/4 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Threat Landscape Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Modern Threats"
            title="The Evolving Cyber Threat Landscape"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {threats.map((threat, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 border border-white/5 border-l-2 border-l-red-500/30 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-lg bg-red-500/5 border border-red-500/10">
                    <threat.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">
                        {threat.title}
                      </h3>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                        {threat.severity}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {threat.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Protection Strategies Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Approach"
            title="Comprehensive Protection Strategies"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {protections.map((protection, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="inline-flex p-3 rounded-lg bg-purple-500/5 border border-purple-500/10 mb-4">
                  <protection.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {protection.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {protection.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us Section - Clean */}
        <motion.div
          className="border border-white/5 rounded-2xl p-8 lg:p-12 mb-24 bg-gradient-to-b from-white/[0.02] to-transparent"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">
                Why Choose Neverland Studio?
              </h2>
              <div className="space-y-4">
                {[
                  'Certified security experts with 10+ years experience',
                  'Proven track record with 500+ successful projects',
                  '24/7 security operations center (SOC)',
                  'Compliance with international standards (ISO 27001, SOC 2)',
                  'Tailored solutions for your industry',
                  'Transparent reporting and continuous monitoring'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Award className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Certified Experts</h4>
                <p className="text-gray-500 text-xs">CISSP, CEH, OSCP certified</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Clock className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">24/7 Support</h4>
                <p className="text-gray-500 text-xs">Round-the-clock monitoring</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Proven Results</h4>
                <p className="text-gray-500 text-xs">99.9% threat detection</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Users className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">150+ Clients</h4>
                <p className="text-gray-500 text-xs">Trusted by enterprises</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section - Ultra Clean */}
        <motion.div
          className="relative border border-white/5 rounded-2xl p-12 lg:p-16 text-center bg-gradient-to-b from-white/[0.02] to-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Top Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Get Protected</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Ready to Secure</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Your Business?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Don't wait for a breach to happen. Contact us today for a free security assessment and discover how we can protect your digital assets.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link to={Routes.HOME}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-purple-500/30">
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
