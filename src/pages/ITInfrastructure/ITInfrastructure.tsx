import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Server, Network, Database, Layers, Activity, Shield, Zap, CheckCircle, ArrowRight, Award, Clock, TrendingUp } from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function ITInfrastructurePage() {
  const stats = [
    { value: '99.9%', label: 'Infrastructure Uptime' },
    { value: '500+', label: 'Systems Managed' },
    { value: '<30min', label: 'Response Time' },
    { value: '24/7', label: 'Support & Monitoring' },
  ];

  const services = [
    {
      icon: Server,
      title: 'Server Management',
      description: 'Enterprise server deployment, configuration, and 24/7 management.',
      path: '/services/server-management',
    },
    {
      icon: Network,
      title: 'Network Infrastructure',
      description: 'Design and implement secure, scalable network architectures.',
      path: '/services/network-infrastructure',
    },
    {
      icon: Database,
      title: 'Storage Solutions',
      description: 'SAN, NAS, and cloud storage with high availability and backup.',
      path: '/services/storage-solutions',
    },
    {
      icon: Layers,
      title: 'Virtualization',
      description: 'VMware, Hyper-V, and container platforms for resource optimization.',
      path: '/services/virtualization',
    },
    {
      icon: Activity,
      title: 'Monitoring & Maintenance',
      description: 'Proactive 24/7 monitoring and preventive maintenance services.',
      path: '/services/monitoring-maintenance',
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Infrastructure security hardening and compliance management.',
      path: '#',
    },
  ];

  const features = [
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized infrastructure for maximum performance and minimal latency.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Multi-layered security with encryption, firewalls, and access controls.',
    },
    {
      icon: Layers,
      title: 'Scalable Architecture',
      description: 'Infrastructure that grows seamlessly with your business needs.',
    },
    {
      icon: CheckCircle,
      title: 'Disaster Recovery',
      description: 'Comprehensive backup and disaster recovery planning and implementation.',
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
          <div className="w-20 h-1 bg-gradient-to-r from-sky-500 to-blue-500 mx-auto mb-8 rounded-full" />
          
          {/* Icon Badge - Minimal */}
          <div className="inline-flex p-4 rounded-xl border border-sky-500/20 bg-sky-500/5 mb-6">
            <Server className="w-12 h-12 text-sky-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
              IT Infrastructure
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Build and maintain robust, scalable IT infrastructure with enterprise-grade reliability, security, 
            and performance. From design to ongoing management.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Get Started Today
              </Button>
            </Link>
            <Link to={Routes.HOME}>
              <Button variant="outline" size="lg" className="border-white/10 hover:border-sky-500/30">
                View All Services
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
              className="relative rounded-xl p-6 text-center border border-white/5 hover:border-sky-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] group"
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
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-sky-500 to-blue-500 group-hover:w-3/4 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Services Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our IT Infrastructure Services"
            title="Comprehensive Infrastructure Solutions"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <Link key={idx} to={service.path}>
                <motion.div
                  className="relative rounded-xl p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="inline-flex p-3 rounded-lg bg-sky-500/5 border border-sky-500/10 mb-4 group-hover:bg-sky-500/10 transition-colors">
                    <service.icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-sky-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Core Capabilities"
            title="Enterprise-Grade Infrastructure Features"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 border border-white/5 border-l-2 border-l-sky-500/30 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-lg bg-sky-500/5 border border-sky-500/10">
                    <feature.icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Infrastructure Stack Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Technology Stack"
            title="Complete Infrastructure Components"
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Server, title: 'Physical Servers', desc: 'Enterprise hardware' },
              { icon: Layers, title: 'Virtualization', desc: 'VMware, Hyper-V' },
              { icon: Network, title: 'Networking', desc: 'Switches, routers' },
              { icon: Database, title: 'Storage', desc: 'SAN, NAS, cloud' },
            ].map((component, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-sky-500/5 border border-sky-500/10 flex items-center justify-center">
                  <component.icon className="w-6 h-6 text-sky-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{component.title}</h3>
                <p className="text-gray-500 text-xs">{component.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          className="border border-white/5 rounded-2xl p-8 lg:p-12 mb-24 bg-gradient-to-b from-white/[0.02] to-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">
                Why Choose Our IT Infrastructure Services?
              </h2>
              <div className="space-y-4">
                {[
                  '99.9% infrastructure uptime guarantee',
                  'Certified infrastructure engineers',
                  'Scalable solutions for any business size',
                  '24/7 monitoring and support',
                  'Future-proof technology stack',
                  'Comprehensive disaster recovery planning'
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
                <Award className="w-10 h-10 text-sky-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Expert Team</h4>
                <p className="text-gray-500 text-xs">Certified engineers</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Clock className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">&lt;30 Minutes</h4>
                <p className="text-gray-500 text-xs">Response time</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Server className="w-10 h-10 text-sky-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">500+ Systems</h4>
                <p className="text-gray-500 text-xs">Under management</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">99.9% Uptime</h4>
                <p className="text-gray-500 text-xs">Guaranteed SLA</p>
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
          
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/20 bg-sky-500/5">
              <Server className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-widest">IT Infrastructure</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Build Your Foundation</span>
                <br />
                <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                  For Digital Success
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Let us help you design, deploy, and manage enterprise-grade IT infrastructure tailored to your business needs.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Schedule a Consultation
                </Button>
              </Link>
              <Link to={Routes.HOME}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-sky-500/30">
                  Explore All Services
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
