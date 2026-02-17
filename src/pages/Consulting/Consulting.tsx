import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, Target, FileSearch, Zap, Shield, Users,
  CheckCircle, ArrowRight, Award, Clock, TrendingUp, BarChart, Briefcase
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function ConsultingPage() {
  const stats = [
    { value: '200+', label: 'Consulting Projects' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '60%', label: 'Avg. Efficiency Gain' },
    { value: '24/7', label: 'Expert Support' },
  ];

  const services = [
    {
      icon: Target,
      title: 'IT Strategy & Planning',
      description: 'Align technology initiatives with business goals through strategic planning.',
      path: '/services/it-strategy-planning',
    },
    {
      icon: FileSearch,
      title: 'Technology Assessment',
      description: 'Comprehensive evaluation of your technology landscape and opportunities.',
      path: '/services/technology-assessment',
    },
    {
      icon: Zap,
      title: 'Digital Transformation',
      description: 'Transform your business with modern technologies and optimized processes.',
      path: '/services/digital-transformation',
    },
    {
      icon: Shield,
      title: 'IT Governance',
      description: 'Establish robust governance frameworks for compliance and risk management.',
      path: '/services/it-governance',
    },
    {
      icon: Users,
      title: 'Vendor Management',
      description: 'Optimize vendor relationships and contracts to reduce costs.',
      path: '/services/vendor-management',
    },
    {
      icon: BarChart,
      title: 'Process Optimization',
      description: 'Streamline operations and improve efficiency with best practices.',
      path: '#',
    },
  ];

  const features = [
    {
      icon: Lightbulb,
      title: 'Expert Insights',
      description: '10+ years of industry experience across multiple sectors and technologies.',
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      description: 'Measurable improvements in efficiency, ROI, and business value delivery.',
    },
    {
      icon: Users,
      title: 'Collaborative Approach',
      description: 'Working closely with your team for lasting impact and knowledge transfer.',
    },
    {
      icon: Briefcase,
      title: 'Industry Expertise',
      description: 'Deep domain knowledge across finance, healthcare, retail, and tech sectors.',
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
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full" />
          
          {/* Icon Badge - Minimal */}
          <div className="inline-flex p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 mb-6">
            <Lightbulb className="w-12 h-12 text-purple-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              IT Consulting Services
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Transform your business with strategic IT consulting. We help organizations optimize technology, 
            reduce costs, and achieve their digital transformation goals.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Get Started Today
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-xl p-6 text-center border border-white/5 hover:border-purple-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] group"
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
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-3/4 transition-all duration-500" />
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
            subtitle="Our Consulting Services"
            title="Comprehensive IT Consulting Solutions"
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
                  <div className="inline-flex p-3 rounded-lg bg-purple-500/5 border border-purple-500/10 mb-4 group-hover:bg-purple-500/10 transition-colors">
                    <service.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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
            subtitle="Why Choose Us"
            title="Our Consulting Approach"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 border border-white/5 border-l-2 border-l-purple-500/30 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/10">
                    <feature.icon className="w-5 h-5 text-purple-400" />
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

        {/* Consulting Process Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Process"
            title="Consulting Methodology"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Discovery', desc: 'Understand challenges' },
              { step: '02', title: 'Analysis', desc: 'Assess current state' },
              { step: '03', title: 'Strategy', desc: 'Develop recommendations' },
              { step: '04', title: 'Implementation', desc: 'Guide execution' },
              { step: '05', title: 'Optimization', desc: 'Continuous improvement' },
            ].map((phase, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="text-2xl font-bold text-purple-400 mb-2">{phase.step}</div>
                <h3 className="text-lg font-bold text-white mb-1">{phase.title}</h3>
                <p className="text-gray-500 text-xs">{phase.desc}</p>
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
                Why Choose Our IT Consulting Services?
              </h2>
              <div className="space-y-4">
                {[
                  '200+ successful consulting projects delivered',
                  'Experienced consultants with diverse industry expertise',
                  'Proven methodologies and frameworks',
                  'Focus on measurable business value and ROI',
                  'Collaborative approach with knowledge transfer',
                  'Ongoing support through implementation'
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
                <h4 className="text-lg font-bold text-white mb-1">Expert Team</h4>
                <p className="text-gray-500 text-xs">10+ years experience</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Clock className="w-10 h-10 text-pink-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Fast Results</h4>
                <p className="text-gray-500 text-xs">4-6 weeks typical</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Briefcase className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">200+ Projects</h4>
                <p className="text-gray-500 text-xs">Successfully delivered</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-pink-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">60% Growth</h4>
                <p className="text-gray-500 text-xs">Efficiency gain</p>
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
              <Lightbulb className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">IT Consulting</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Ready to Transform</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Your IT Strategy?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Schedule a consultation to discuss your business challenges and discover how we can help.
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
                  Schedule a Consultation
                </Button>
              </Link>
              <Link to={Routes.HOME}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-purple-500/30">
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
