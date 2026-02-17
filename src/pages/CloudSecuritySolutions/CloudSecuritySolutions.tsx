import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, Lock, Eye, Key, AlertTriangle, FileCheck, 
  CheckCircle, ArrowRight, Users, TrendingUp, Server 
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function CloudSecuritySolutions() {
  const stats = [
    { value: '99.99%', label: 'Security Uptime' },
    { value: '24/7', label: 'Threat Monitoring' },
    { value: '< 15min', label: 'Incident Response' },
    { value: '100%', label: 'Compliance Rate' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Advanced Threat Protection',
      description: 'Real-time threat detection and prevention using AI-powered security tools and continuous monitoring systems.'
    },
    {
      icon: Lock,
      title: 'Data Encryption',
      description: 'End-to-end encryption for data at rest and in transit with industry-standard encryption protocols and key management.'
    },
    {
      icon: Eye,
      title: 'Security Monitoring',
      description: '24/7 security operations center monitoring with automated alerts and incident response protocols.'
    },
    {
      icon: Key,
      title: 'Identity & Access Management',
      description: 'Comprehensive IAM solutions with multi-factor authentication, role-based access control, and privilege management.'
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Enhanced Protection',
      description: 'Multi-layered security architecture protecting against advanced threats and vulnerabilities.'
    },
    {
      icon: FileCheck,
      title: 'Compliance Assurance',
      description: 'Meet regulatory requirements with automated compliance monitoring and reporting.'
    },
    {
      icon: AlertTriangle,
      title: 'Threat Intelligence',
      description: 'Proactive threat hunting and intelligence gathering to stay ahead of emerging risks.'
    },
    {
      icon: Server,
      title: 'Infrastructure Security',
      description: 'Secure configuration and hardening of cloud infrastructure and network architecture.'
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
        >
          {/* Subtle Accent Line */}
          <div className="w-20 h-1 bg-gradient-to-r from-rose-500 to-red-500 mx-auto mb-8 rounded-full" />
          
          {/* Icon Badge - Minimal */}
          <div className="inline-flex p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 mb-6">
            <Shield className="w-12 h-12 text-rose-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text text-transparent">
              Cloud Security Solutions
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Protect your cloud infrastructure with enterprise-grade security solutions. 
            Comprehensive threat protection, compliance, and 24/7 monitoring for complete peace of mind.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Secure Your Cloud
              </Button>
            </Link>
            <Link to={Routes.CLOUD_SOLUTIONS}>
              <Button variant="outline" size="lg" className="border-white/10 hover:border-rose-500/30">
                View Cloud Solutions
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Section - Clean Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-xl p-6 text-center border border-white/5 hover:border-rose-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] group"
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
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-rose-500 to-red-500 group-hover:w-3/4 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Security Services"
            title="Complete Cloud Security Stack"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="inline-flex p-3 rounded-lg bg-rose-500/5 border border-rose-500/10 mb-4">
                  <feature.icon className="w-6 h-6 text-rose-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
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
            subtitle="Security Benefits"
            title="Why Cloud Security Matters"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="inline-flex p-3 rounded-lg bg-rose-500/5 border border-rose-500/10 mb-4">
                  <benefit.icon className="w-6 h-6 text-rose-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us Section - Clean */}
        <motion.div
          className="border border-white/5 rounded-2xl p-8 lg:p-12 mb-24 bg-gradient-to-b from-white/[0.02] to-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">
                Why Choose Our Security Services?
              </h2>
              <div className="space-y-4">
                {[
                  'Certified cloud security professionals',
                  'Zero-trust security architecture',
                  'Automated threat detection and response',
                  'Compliance with major standards (SOC 2, ISO 27001)',
                  '24/7 security operations center',
                  'Regular security audits and assessments'
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
                <Shield className="w-10 h-10 text-rose-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">24/7 Protection</h4>
                <p className="text-gray-500 text-xs">Always secured</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Eye className="w-10 h-10 text-red-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Real-time Monitoring</h4>
                <p className="text-gray-500 text-xs">Threat detection</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <FileCheck className="w-10 h-10 text-rose-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">100% Compliant</h4>
                <p className="text-gray-500 text-xs">Industry standards</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Users className="w-10 h-10 text-red-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Expert Team</h4>
                <p className="text-gray-500 text-xs">Security specialists</p>
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
          
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/5">
              <Shield className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-xs font-semibold text-rose-300 uppercase tracking-widest">Secure Now</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Ready to Secure</span>
                <br />
                <span className="bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text text-transparent">
                  Your Cloud?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Get a free security assessment and discover vulnerabilities in your cloud infrastructure. Our experts will provide actionable recommendations.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Get Security Assessment
                </Button>
              </Link>
              <Link to={Routes.CLOUD_SOLUTIONS}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-rose-500/30">
                  Explore Cloud Solutions
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
