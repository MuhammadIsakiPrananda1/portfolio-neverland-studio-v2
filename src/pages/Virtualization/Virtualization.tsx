import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, Server, Cloud, Cpu, Zap, Box, ArrowRight, Award, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function VirtualizationPage() {
  const stats = [
    { value: '70%', label: 'Cost Reduction' },
    { value: '500+', label: 'VMs Deployed' },
    { value: '99.9%', label: 'VM Uptime' },
    { value: '24/7', label: 'Management' },
  ];

  const services = [
    {
      icon: Server,
      title: 'Server Virtualization',
      description: 'VMware vSphere and Hyper-V enterprise virtualization platforms.',
    },
    {
      icon: Box,
      title: 'Containerization',
      description: 'Docker and Kubernetes container platforms for modern applications.',
    },
    {
      icon: Cloud,
      title: 'Desktop Virtualization',
      description: 'VDI solutions for secure and flexible remote desktop access.',
    },
    {
      icon: Layers,
      title: 'VM Management',
      description: 'Centralized management and monitoring of virtual infrastructure.',
    },
  ];

  const features = [
    {
      icon: Cpu,
      title: 'Resource Optimization',
      description: 'Dynamic resource allocation and load balancing for maximum efficiency.',
    },
    {
      icon: Zap,
      title: 'High Availability',
      description: 'Clustering and failover capabilities for zero-downtime infrastructure.',
    },
    {
      icon: Server,
      title: 'Live Migration',
      description: 'Move virtual machines between hosts without service interruption.',
    },
    {
      icon: Cloud,
      title: 'Snapshot & Backup',
      description: 'Instant snapshots and automated backup for quick recovery.',
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
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mb-8 rounded-full" />
          
          {/* Icon Badge - Minimal */}
          <div className="inline-flex p-4 rounded-xl border border-violet-500/20 bg-violet-500/5 mb-6">
            <Layers className="w-12 h-12 text-violet-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Virtualization
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Maximize resource utilization and reduce costs with enterprise virtualization solutions including 
            VMware, Hyper-V, and containerization technologies.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Get Started Today
              </Button>
            </Link>
            <Link to={Routes.HOME}>
              <Button variant="outline" size="lg" className="border-white/10 hover:border-violet-500/30">
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
              className="relative rounded-xl p-6 text-center border border-white/5 hover:border-violet-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] group"
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
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-violet-500 to-fuchsia-500 group-hover:w-3/4 transition-all duration-500" />
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
            subtitle="What We Offer"
            title="Comprehensive Virtualization Services"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="inline-flex p-3 rounded-lg bg-violet-500/5 border border-violet-500/10 mb-4">
                  <service.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
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
            subtitle="Advanced Capabilities"
            title="Enterprise-Grade Virtualization Features"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 border border-white/5 border-l-2 border-l-violet-500/30 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-lg bg-violet-500/5 border border-violet-500/10">
                    <feature.icon className="w-5 h-5 text-violet-400" />
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

        {/* Technologies Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Supported Platforms"
            title="Virtualization Technologies"
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Server, title: 'VMware vSphere', desc: 'Enterprise virtualization' },
              { icon: Cloud, title: 'Microsoft Hyper-V', desc: 'Windows virtualization' },
              { icon: Box, title: 'Docker', desc: 'Container platform' },
              { icon: Layers, title: 'Kubernetes', desc: 'Container orchestration' },
            ].map((tech, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-violet-500/5 border border-violet-500/10 flex items-center justify-center">
                  <tech.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{tech.title}</h3>
                <p className="text-gray-500 text-xs">{tech.desc}</p>
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
                Why Choose Our Virtualization Solutions?
              </h2>
              <div className="space-y-4">
                {[
                  'Reduce hardware costs by up to 70%',
                  'VMware and Microsoft certified engineers',
                  'Rapid VM deployment in minutes',
                  'High availability with automated failover',
                  'Simplified backup and disaster recovery',
                  'Efficient resource utilization and scaling'
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
                <Award className="w-10 h-10 text-violet-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Certified Team</h4>
                <p className="text-gray-500 text-xs">VMware & Hyper-V</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Clock className="w-10 h-10 text-fuchsia-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Rapid Deploy</h4>
                <p className="text-gray-500 text-xs">Minutes not weeks</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Layers className="w-10 h-10 text-violet-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">500+ VMs</h4>
                <p className="text-gray-500 text-xs">Successfully deployed</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-fuchsia-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">70% Savings</h4>
                <p className="text-gray-500 text-xs">Cost reduction</p>
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
          
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-semibold text-violet-300 uppercase tracking-widest">Virtualization</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Transform Your Infrastructure</span>
                <br />
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  with Virtualization
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Reduce costs, improve efficiency, and increase agility with our virtualization solutions.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Start Your Virtualization Journey
                </Button>
              </Link>
              <Link to={Routes.HOME}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-violet-500/30">
                  Explore More Services
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
