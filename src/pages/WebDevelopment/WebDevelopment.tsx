import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code, Laptop, Smartphone, Zap, CheckCircle, 
  ArrowRight, Layers, Database, Globe, Cpu,
  Palette, Award, Clock, TrendingUp, Users
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';
import { slideUp, staggerContainer, staggerItem, fadeIn } from '@utils/animations';

export default function WebDevelopmentPage() {
  const services = [
    {
      icon: Laptop,
      title: 'Custom Web Applications',
      description: 'Tailored web solutions built from scratch to meet your unique business requirements and objectives.',
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Mobile-first designs that look stunning and function perfectly on all devices and screen sizes.',
    },
    {
      icon: Globe,
      title: 'E-Commerce Solutions',
      description: 'Complete online store development with secure payment integration and inventory management.',
    },
    {
      icon: Cpu,
      title: 'API Development',
      description: 'RESTful and GraphQL APIs for seamless data integration and third-party service communication.',
    },
  ];

  const technologies = [
    { name: 'React', icon: Code },
    { name: 'Next.js', icon: Zap },
    { name: 'TypeScript', icon: Code },
    { name: 'Node.js', icon: Database },
    { name: 'Tailwind CSS', icon: Palette },
    { name: 'MongoDB', icon: Database },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with modern frameworks and best practices for peak performance.',
    },
    {
      icon: Layers,
      title: 'Scalable Architecture',
      description: 'Build applications that grow with your business using clean, maintainable code.',
    },
    {
      icon: Palette,
      title: 'Beautiful Design',
      description: 'Pixel-perfect interfaces that provide exceptional user experience and engagement.',
    },
    {
      icon: Database,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and reliability with industry best practices.',
    },
  ];

  const stats = [
    { value: '200+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '150+', label: 'Happy Clients' },
    { value: '24/7', label: 'Support Available' },
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
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-8 rounded-full" />
          
          {/* Icon Badge - Minimal */}
          <div className="inline-flex p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 mb-6">
            <Code className="w-12 h-12 text-emerald-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Web Development
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Transform your ideas into powerful, scalable web applications. 
            We build modern, responsive websites that deliver exceptional user experiences.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start Your Project
              </Button>
            </Link>
            <Link to={Routes.HOME}>
              <Button variant="outline" size="lg" className="border-white/10 hover:border-emerald-500/30">
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
              className="relative rounded-xl p-6 text-center border border-white/5 hover:border-emerald-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] group"
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
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-3/4 transition-all duration-500" />
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
            title="Our Web Development Services"
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
                <div className="inline-flex p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 mb-4">
                  <service.icon className="w-6 h-6 text-emerald-400" />
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

        {/* Technologies Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Modern Stack"
            title="Technologies We Master"
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {technologies.map((tech, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <tech.icon className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
                <h3 className="text-white text-sm font-semibold">{tech.name}</h3>
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
            subtitle="Our Strengths"
            title="Why Choose Our Development Services"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 border border-white/5 border-l-2 border-l-emerald-500/30 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <feature.icon className="w-5 h-5 text-emerald-400" />
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
                  'Expert developers with 10+ years of experience',
                  'Custom solutions tailored to your business needs',
                  'Modern, scalable architecture and clean code',
                  'Responsive design that works on all devices',
                  'SEO-optimized for better search rankings',
                  'Ongoing support and maintenance included'
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
                <Award className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Expert Team</h4>
                <p className="text-gray-500 text-xs">10+ years experience</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Clock className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">24/7 Support</h4>
                <p className="text-gray-500 text-xs">Always available</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-teal-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Proven Results</h4>
                <p className="text-gray-500 text-xs">200+ projects delivered</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Users className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">150+ Clients</h4>
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5">
              <Code className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-widest">Let's Build</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Ready to Build</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Your Web App?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Let's turn your vision into reality. Schedule a free consultation to discuss your web development project and get a customized proposal.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Get Started Today
                </Button>
              </Link>
              <Link to={Routes.HOME}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-emerald-500/30">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
