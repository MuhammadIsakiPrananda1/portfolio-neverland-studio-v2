import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Shield, Bell, Wrench, LineChart, Clock, CheckCircle, ArrowRight, Award, TrendingUp, Zap } from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function MonitoringMaintenancePage() {
  const stats = [
    { value: '99.9%', label: 'Monitoring Uptime' },
    { value: '<5min', label: 'Alert Response' },
    { value: '200+', label: 'Systems Monitored' },
    { value: '24/7', label: 'Support' },
  ];

  const services = [
    {
      icon: Activity,
      title: 'Proactive Monitoring',
      description: '24/7 real-time monitoring of all infrastructure components and services.',
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Immediate notification system for critical incidents and anomalies.',
    },
    {
      icon: Wrench,
      title: 'Preventive Maintenance',
      description: 'Scheduled maintenance to prevent issues before they impact operations.',
    },
    {
      icon: Shield,
      title: 'Incident Management',
      description: 'Rapid response and resolution for security and performance incidents.',
    },
  ];

  const features = [
    {
      icon: LineChart,
      title: 'Performance Analytics',
      description: 'Detailed metrics and dashboards for infrastructure health monitoring.',
    },
    {
      icon: Clock,
      title: 'Health Checks',
      description: 'Regular automated health checks for servers, networks, and applications.',
    },
    {
      icon: Zap,
      title: 'Auto-Remediation',
      description: 'Automated fixes for common issues to minimize manual intervention.',
    },
    {
      icon: CheckCircle,
      title: 'Compliance Tracking',
      description: 'Monitor and maintain compliance with industry standards and regulations.',
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
          <div className="w-20 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mb-8 rounded-full" />
          
          {/* Icon Badge - Minimal */}
          <div className="inline-flex p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 mb-6">
            <Activity className="w-12 h-12 text-rose-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              Monitoring & Maintenance
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Ensure maximum uptime and optimal performance with our 24/7 proactive monitoring 
            and preventive maintenance services.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Get Started Today
              </Button>
            </Link>
            <Link to={Routes.HOME}>
              <Button variant="outline" size="lg" className="border-white/10 hover:border-rose-500/30">
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
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-3/4 transition-all duration-500" />
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
            title="Comprehensive Monitoring & Maintenance Services"
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
                <div className="inline-flex p-3 rounded-lg bg-rose-500/5 border border-rose-500/10 mb-4">
                  <service.icon className="w-6 h-6 text-rose-400" />
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
            title="Proactive Infrastructure Management Features"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 border border-white/5 border-l-2 border-l-rose-500/30 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/10">
                    <feature.icon className="w-5 h-5 text-rose-400" />
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

        {/* Monitoring Tools Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Monitoring Stack"
            title="Enterprise Monitoring Tools"
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: LineChart, title: 'Prometheus', desc: 'Metrics & alerting' },
              { icon: Activity, title: 'Grafana', desc: 'Visualization' },
              { icon: Bell, title: 'Nagios', desc: 'Infrastructure monitoring' },
              { icon: Shield, title: 'Zabbix', desc: 'Network monitoring' },
            ].map((tool, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-rose-500/5 border border-rose-500/10 flex items-center justify-center">
                  <tool.icon className="w-6 h-6 text-rose-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{tool.title}</h3>
                <p className="text-gray-500 text-xs">{tool.desc}</p>
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
                Why Choose Our Monitoring & Maintenance?
              </h2>
              <div className="space-y-4">
                {[
                  'Real-time monitoring with instant alerts',
                  'Experienced DevOps and SRE team',
                  'Proactive issue detection and resolution',
                  'Comprehensive dashboards and reporting',
                  'Automated maintenance and patching',
                  '99.9% monitoring uptime guarantee'
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
                <Award className="w-10 h-10 text-rose-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Certified Pros</h4>
                <p className="text-gray-500 text-xs">DevOps experts</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Clock className="w-10 h-10 text-pink-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">&lt;5 Minutes</h4>
                <p className="text-gray-500 text-xs">Alert response</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Activity className="w-10 h-10 text-rose-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">200+ Systems</h4>
                <p className="text-gray-500 text-xs">Under monitoring</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-pink-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">99.9% Uptime</h4>
                <p className="text-gray-500 text-xs">Monitoring reliability</p>
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
              <Activity className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-xs font-semibold text-rose-300 uppercase tracking-widest">24/7 Monitoring</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Keep Your Systems Running</span>
                <br />
                <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                  With Proactive Monitoring
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Detect and resolve issues before they impact your business with our 24/7 monitoring services.
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
                  Start Monitoring Today
                </Button>
              </Link>
              <Link to={Routes.HOME}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-rose-500/30">
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
