import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Palette, CheckCircle, ArrowRight, Layout, Smartphone, Eye, 
  Users, MousePointer, Sparkles, TrendingUp, Award, Clock, Target
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function UIUXDesignPage() {
  const features = [
    {
      icon: Layout,
      title: 'User Interface Design',
      description: 'Beautiful, intuitive interfaces that users love with modern design principles.',
    },
    {
      icon: Eye,
      title: 'User Experience',
      description: 'Research-driven UX strategies that enhance user satisfaction and engagement.',
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Designs that adapt perfectly to any screen size and device type.',
    },
    {
      icon: MousePointer,
      title: 'Interactive Prototypes',
      description: 'Clickable prototypes to test and validate designs before development.',
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: 'User Research',
      description: 'In-depth user research and personas to understand your target audience.',
    },
    {
      icon: Sparkles,
      title: 'Design Systems',
      description: 'Scalable design systems with reusable components and style guides.',
    },
    {
      icon: Target,
      title: 'Usability Testing',
      description: 'Comprehensive testing to ensure optimal user experience and conversion.',
    },
    {
      icon: TrendingUp,
      title: 'Conversion Optimization',
      description: 'Data-driven design decisions to maximize conversions and engagement.',
    },
  ];

  const stats = [
    { value: '300+', label: 'Designs Created' },
    { value: '85%', label: 'Conversion Increase' },
    { value: '95%', label: 'User Satisfaction' },
    { value: '150+', label: 'Happy Clients' },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mb-8 rounded-full" />
          
          <div className="inline-flex p-4 rounded-xl border border-pink-500/20 bg-pink-500/5 mb-6">
            <Palette className="w-12 h-12 text-pink-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              UI/UX Design
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Create stunning user interfaces and exceptional experiences. 
            We blend aesthetics with functionality to deliver designs that users love.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start Your Design
              </Button>
            </Link>
            <Link to={Routes.HOME}>
              <Button variant="outline" size="lg" className="border-white/10 hover:border-pink-500/30">
                View All Services
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-xl p-6 text-center border border-white/5 hover:border-pink-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] group"
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
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-rose-500 group-hover:w-3/4 transition-all duration-500" />
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
            subtitle="Design Services"
            title="Comprehensive UI/UX Design Solutions"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="inline-flex p-3 rounded-lg bg-pink-500/5 border border-pink-500/10 mb-4">
                  <feature.icon className="w-6 h-6 text-pink-400" />
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
            subtitle="Our Approach"
            title="What Makes Our Designs Exceptional"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 border border-white/5 border-l-2 border-l-pink-500/30 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-lg bg-pink-500/5 border border-pink-500/10">
                    <benefit.icon className="w-5 h-5 text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
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
                Why Choose Neverland Studio?
              </h2>
              <div className="space-y-4">
                {[
                  'Award-winning design team with 10+ years experience',
                  'User-centered design methodology',
                  'Modern design tools (Figma, Sketch, Adobe XD)',
                  'Accessibility and inclusive design focus',
                  'Fast turnaround with iterative feedback',
                  'Design handoff with developer collaboration'
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
                <Award className="w-10 h-10 text-pink-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Award Winning</h4>
                <p className="text-gray-500 text-xs">300+ designs</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Clock className="w-10 h-10 text-rose-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Fast Delivery</h4>
                <p className="text-gray-500 text-xs">2-3 weeks average</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-pink-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">High Impact</h4>
                <p className="text-gray-500 text-xs">85% conversion boost</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Users className="w-10 h-10 text-rose-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">150+ Clients</h4>
                <p className="text-gray-500 text-xs">Satisfied worldwide</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="relative border border-white/5 rounded-2xl p-12 lg:p-16 text-center bg-gradient-to-b from-white/[0.02] to-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/5">
              <Palette className="w-3.5 h-3.5 text-pink-400" />
              <span className="text-xs font-semibold text-pink-300 uppercase tracking-widest">Design Better</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Ready to Create</span>
                <br />
                <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                  Amazing Experiences?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Let's design beautiful, user-friendly interfaces that delight users and drive business results.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Start Your Design Project
                </Button>
              </Link>
              <Link to={Routes.WEB_DEVELOPMENT}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-pink-500/30">
                  Explore Web Development
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
