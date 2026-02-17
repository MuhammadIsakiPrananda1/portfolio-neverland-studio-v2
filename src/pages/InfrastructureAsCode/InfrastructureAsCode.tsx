import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileCode, GitBranch, Zap, Repeat, Shield, Clock, 
  CheckCircle, ArrowRight, Code, Users, TrendingUp 
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function InfrastructureAsCode() {
  const stats = [
    { value: '10x', label: 'Faster Deployment' },
    { value: '95%', label: 'Error Reduction' },
    { value: '< 5min', label: 'Provisioning Time' },
    { value: '100%', label: 'Reproducibility' },
  ];

  const features = [
    {
      icon: FileCode,
      title: 'Infrastructure Templates',
      description: 'Define your infrastructure as code using Terraform, CloudFormation, or ARM templates for version-controlled infrastructure.'
    },
    {
      icon: GitBranch,
      title: 'Version Control',
      description: 'Track infrastructure changes with Git, enabling rollbacks, code reviews, and collaborative infrastructure management.'
    },
    {
      icon: Zap,
      title: 'Automated Provisioning',
      description: 'Deploy consistent environments in minutes with automated provisioning pipelines and validation processes.'
    },
    {
      icon: Repeat,
      title: 'CI/CD Integration',
      description: 'Seamlessly integrate infrastructure deployment into your CI/CD pipeline for true DevOps automation.'
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Increased Efficiency',
      description: 'Automate repetitive tasks and deploy infrastructure 10x faster than manual processes.'
    },
    {
      icon: Shield,
      title: 'Enhanced Consistency',
      description: 'Eliminate configuration drift with standardized, repeatable infrastructure deployments.'
    },
    {
      icon: Clock,
      title: 'Rapid Recovery',
      description: 'Quickly recreate entire environments from code in case of disasters or failures.'
    },
    {
      icon: Code,
      title: 'Better Collaboration',
      description: 'Enable teams to collaborate on infrastructure using familiar development workflows.'
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
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-8 rounded-full" />
          
          {/* Icon Badge - Minimal */}
          <div className="inline-flex p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 mb-6">
            <FileCode className="w-12 h-12 text-amber-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Infrastructure as Code
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Automate infrastructure provisioning and management with version-controlled code. 
            Deploy consistent, repeatable environments in minutes instead of hours.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start Automation
              </Button>
            </Link>
            <Link to={Routes.CLOUD_SOLUTIONS}>
              <Button variant="outline" size="lg" className="border-white/10 hover:border-amber-500/30">
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
              className="relative rounded-xl p-6 text-center border border-white/5 hover:border-amber-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] group"
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
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-3/4 transition-all duration-500" />
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
            subtitle="Core Capabilities"
            title="Complete IaC Implementation"
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
                <div className="inline-flex p-3 rounded-lg bg-amber-500/5 border border-amber-500/10 mb-4">
                  <feature.icon className="w-6 h-6 text-amber-400" />
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
            subtitle="Key Advantages"
            title="Why Infrastructure as Code?"
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
                <div className="inline-flex p-3 rounded-lg bg-amber-500/5 border border-amber-500/10 mb-4">
                  <benefit.icon className="w-6 h-6 text-amber-400" />
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
                Why Choose Neverland Studio?
              </h2>
              <div className="space-y-4">
                {[
                  'Expert in Terraform, CloudFormation, and ARM',
                  'CI/CD pipeline integration specialists',
                  'Multi-cloud IaC implementation',
                  'Automated testing and validation',
                  'Complete documentation and training',
                  'Ongoing support and optimization'
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
                <FileCode className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Code-First</h4>
                <p className="text-gray-500 text-xs">Infrastructure as code</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <GitBranch className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Version Control</h4>
                <p className="text-gray-500 text-xs">Git integration</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Zap className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Fast Deploy</h4>
                <p className="text-gray-500 text-xs">Minutes not hours</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Users className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Expert Team</h4>
                <p className="text-gray-500 text-xs">DevOps specialists</p>
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5">
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest">Automate Now</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Ready to Automate</span>
                <br />
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Your Infrastructure?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Transform manual processes into automated workflows. Get a free consultation to discover how IaC can revolutionize your infrastructure management.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Get Free Consultation
                </Button>
              </Link>
              <Link to={Routes.CLOUD_SOLUTIONS}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-amber-500/30">
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
