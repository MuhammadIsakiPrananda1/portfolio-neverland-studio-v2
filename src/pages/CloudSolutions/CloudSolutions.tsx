import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Cloud, Server, Database, Shield,
  CheckCircle, ArrowRight, Lock,
  RefreshCw, TrendingUp, Award, Clock, BarChart, Users, Layers
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function CloudSolutionsPage() {
  const services = [
    {
      icon: Cloud,
      title: 'Cloud Migration',
      description: 'Seamlessly migrate your infrastructure to the cloud with zero downtime and optimized performance.',
    },
    {
      icon: Server,
      title: 'Infrastructure as Code',
      description: 'Automate your infrastructure with Terraform, CloudFormation, and Ansible for consistency.',
    },
    {
      icon: Database,
      title: 'Cloud Database Solutions',
      description: 'Managed database services with high availability, automatic backups, and scaling.',
    },
    {
      icon: Shield,
      title: 'Cloud Security',
      description: 'Comprehensive security solutions to protect your cloud infrastructure and data.',
    },
  ];

  const features = [
    {
      icon: BarChart,
      title: 'Monitoring & Analytics',
      description: 'Real-time monitoring and analytics for optimal performance and cost management.',
    },
    {
      icon: RefreshCw,
      title: 'Auto-Scaling',
      description: 'Dynamic resource allocation to handle traffic spikes efficiently and cost-effectively.',
    },
    {
      icon: Layers,
      title: 'Multi-Cloud Strategy',
      description: 'Leverage multiple cloud providers for redundancy, performance, and cost optimization.',
    },
    {
      icon: Lock,
      title: 'Compliance & Governance',
      description: 'Ensure compliance with industry standards and implement governance policies.',
    },
  ];

  const cloudPlatforms = [
    { name: 'AWS', description: 'Amazon Web Services' },
    { name: 'Azure', description: 'Microsoft Azure' },
    { name: 'GCP', description: 'Google Cloud Platform' },
    { name: 'Digital Ocean', description: 'Cloud Hosting' },
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '80+', label: 'Cloud Projects' },
    { value: '45%', label: 'Avg. Cost Reduction' },
    { value: '24/7', label: 'Support & Monitoring' },
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
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-8 rounded-full" />
          
          {/* Icon Badge - Minimal */}
          <div className="inline-flex p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 mb-6">
            <Cloud className="w-12 h-12 text-cyan-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Cloud Solutions
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Transform your business with scalable, secure, and cost-effective cloud infrastructure. 
            We help you leverage AWS, Azure, and Google Cloud Platform to accelerate innovation.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Get Started Today
              </Button>
            </Link>
            <Link to={Routes.HOME}>
              <Button variant="outline" size="lg" className="border-white/10 hover:border-cyan-500/30">
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
              className="relative rounded-xl p-6 text-center border border-white/5 hover:border-cyan-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] group"
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
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-3/4 transition-all duration-500" />
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
            title="Comprehensive Cloud Services"
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
                <div className="inline-flex p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10 mb-4">
                  <service.icon className="w-6 h-6 text-cyan-400" />
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
            title="Enterprise-Grade Cloud Features"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 border border-white/5 border-l-2 border-l-cyan-500/30 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
                    <feature.icon className="w-5 h-5 text-cyan-400" />
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

        {/* Cloud Platforms Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Supported Platforms"
            title="Multi-Cloud Expertise"
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cloudPlatforms.map((platform, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{platform.name}</h3>
                <p className="text-gray-500 text-xs">{platform.description}</p>
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
                Why Choose Neverland Studio?
              </h2>
              <div className="space-y-4">
                {[
                  'AWS, Azure, and GCP certified cloud architects',
                  'Proven track record with 80+ successful migrations',
                  'Cost optimization strategies saving up to 45%',
                  'Zero-downtime migration expertise',
                  '24/7 monitoring and support services',
                  'Compliance with industry standards and regulations'
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
                <Award className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Certified Team</h4>
                <p className="text-gray-500 text-xs">Multi-cloud experts</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Clock className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">24/7 Support</h4>
                <p className="text-gray-500 text-xs">Always available</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Cost Savings</h4>
                <p className="text-gray-500 text-xs">45% average reduction</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Users className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">80+ Clients</h4>
                <p className="text-gray-500 text-xs">Trusted worldwide</p>
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5">
              <Cloud className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-widest">Cloud Ready</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Ready to Move</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  to the Cloud?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Get a free cloud assessment and discover how we can help optimize your infrastructure, reduce costs, and improve performance.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Schedule Free Assessment
                </Button>
              </Link>
              <Link to={Routes.HOME}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-cyan-500/30">
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
