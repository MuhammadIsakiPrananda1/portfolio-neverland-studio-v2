import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowUpCircle, Server, Database, Zap, Shield, Clock, 
  CheckCircle, ArrowRight, Network, Users, TrendingUp, FileCheck 
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function CloudMigration() {
  const stats = [
    { value: '200+', label: 'Successful Migrations' },
    { value: '99.9%', label: 'Migration Success Rate' },
    { value: '< 1hr', label: 'Average Downtime' },
    { value: '24/7', label: 'Migration Support' },
  ];

  const features = [
    {
      icon: FileCheck,
      title: 'Assessment & Planning',
      description: 'Comprehensive analysis of your current infrastructure, dependencies, and migration requirements to create a detailed roadmap.'
    },
    {
      icon: Server,
      title: 'Infrastructure Preparation',
      description: 'Set up and configure cloud infrastructure optimized for your workloads with proper security and networking.'
    },
    {
      icon: Database,
      title: 'Data Migration',
      description: 'Secure and efficient data transfer with minimal downtime using industry-standard migration tools and best practices.'
    },
    {
      icon: Zap,
      title: 'Application Migration',
      description: 'Migrate applications with minimal refactoring or modernize them for cloud-native architecture as needed.'
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Improved Performance',
      description: 'Experience faster application response times and better scalability with cloud infrastructure.'
    },
    {
      icon: Shield,
      title: 'Enhanced Security',
      description: 'Benefit from enterprise-grade security features and compliance certifications of major cloud providers.'
    },
    {
      icon: Clock,
      title: 'Reduced Downtime',
      description: 'Our proven migration strategies ensure minimal disruption to your business operations.'
    },
    {
      icon: Network,
      title: 'Seamless Integration',
      description: 'Maintain connectivity with existing systems during and after the migration process.'
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
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-purple-500 mx-auto mb-8 rounded-full" />
          
          {/* Icon Badge - Minimal */}
          <div className="inline-flex p-4 rounded-xl border border-violet-500/20 bg-violet-500/5 mb-6">
            <ArrowUpCircle className="w-12 h-12 text-violet-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Cloud Migration
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Seamlessly transition your infrastructure to the cloud with zero-risk, minimal downtime migration strategies. 
            We handle the complexity while you focus on your business.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start Your Migration
              </Button>
            </Link>
            <Link to={Routes.CLOUD_SOLUTIONS}>
              <Button variant="outline" size="lg" className="border-white/10 hover:border-violet-500/30">
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
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-violet-500 to-purple-500 group-hover:w-3/4 transition-all duration-500" />
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
            subtitle="Migration Process"
            title="Proven Migration Methodology"
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
                <div className="inline-flex p-3 rounded-lg bg-violet-500/5 border border-violet-500/10 mb-4">
                  <feature.icon className="w-6 h-6 text-violet-400" />
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
            subtitle="Migration Benefits"
            title="Why Migrate to the Cloud?"
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
                <div className="inline-flex p-3 rounded-lg bg-violet-500/5 border border-violet-500/10 mb-4">
                  <benefit.icon className="w-6 h-6 text-violet-400" />
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
                Why Choose Our Migration Services?
              </h2>
              <div className="space-y-4">
                {[
                  'Certified cloud migration specialists',
                  'Proven zero-risk migration methodology',
                  'Minimal downtime with rollback plan',
                  'Post-migration optimization included',
                  '24/7 support during migration',
                  'Fixed-price migration packages'
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
                <Server className="w-10 h-10 text-violet-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Zero Downtime</h4>
                <p className="text-gray-500 text-xs">Live migration</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Shield className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Data Security</h4>
                <p className="text-gray-500 text-xs">Encrypted transfer</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-violet-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Cost Savings</h4>
                <p className="text-gray-500 text-xs">40% reduction</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Users className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Expert Team</h4>
                <p className="text-gray-500 text-xs">Cloud specialists</p>
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
              <ArrowUpCircle className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-semibold text-violet-300 uppercase tracking-widest">Migration Ready</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Ready to Migrate</span>
                <br />
                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  to the Cloud?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Get a free migration assessment and detailed roadmap. Our experts will analyze your infrastructure and provide a comprehensive migration plan.
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
                  Get Migration Assessment
                </Button>
              </Link>
              <Link to={Routes.CLOUD_SOLUTIONS}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-violet-500/30">
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
