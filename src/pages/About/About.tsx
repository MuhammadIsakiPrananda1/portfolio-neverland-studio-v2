import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target, Eye, Zap, Shield, Award, Users, Globe, 
  TrendingUp, Code, Server, Lock, ArrowRight,
  Lightbulb, Heart, Star, Clock, Briefcase, Database,
  Cloud, HardDrive, Network, Box, Cpu, Monitor,
  Layers, Package, Palette, Laptop
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { COMPANY_INFO, Routes } from '@config/constants';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

export default function About() {
  const companyStats = [
    { icon: Users, value: '50+', label: 'Expert Team Members', color: 'emerald' },
    { icon: Globe, value: '25+', label: 'Countries Served', color: 'blue' },
    { icon: Briefcase, value: '500+', label: 'Successful Projects', color: 'purple' },
    { icon: Award, value: '98%', label: 'Client Satisfaction', color: 'pink' },
  ];

  const coreValues = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Every decision we make prioritizes the safety and protection of our clients\' digital assets. Security isn\'t just what we do—it\'s who we are.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We constantly evolve our methods and technologies to stay ahead of emerging threats, ensuring our clients always have cutting-edge protection.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We deliver exceptional quality in every project, every time. Our commitment to excellence has earned us recognition as industry leaders.',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Clear communication and honest reporting in all our engagements. We believe trust is built through openness and accountability.',
    },
    {
      icon: Heart,
      title: 'Client Success',
      description: 'Your success is our success. We go beyond delivering services—we build partnerships that drive long-term business growth.',
    },
    {
      icon: Lightbulb,
      title: 'Continuous Learning',
      description: 'The cyber threat landscape evolves daily. We invest heavily in training and research to keep our team at the forefront of security knowledge.',
    },
  ];

  const achievements = [
    { year: COMPANY_INFO.founded, title: 'Company Founded', desc: 'Started with a vision to democratize enterprise security' },
    { year: '2020', title: 'Global Expansion', desc: 'Expanded operations to 25+ countries worldwide' },
    { year: '2022', title: 'Industry Recognition', desc: 'Awarded Best Cyber Security Firm by CyberTech Awards' },
    { year: '2024', title: 'Innovation Leader', desc: 'Launched AI-powered threat detection platform' },
  ];

  const techStack = [
    { name: 'Penetration Testing', icon: Lock },
    { name: 'Cloud Security', icon: Server },
    { name: 'Web Development', icon: Code },
    { name: 'Data Protection', icon: Database },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section - Modern */}
        <motion.div
          className="text-center mb-24"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          {/* Accent Line */}
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white/90">About</span>{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Neverland Studio
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Leading the future of cyber security and IT solutions with innovation, expertise, and unwavering commitment to protecting businesses in the digital age.
          </p>
        </motion.div>

        {/* Company Stats - Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {companyStats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-xl p-6 lg:p-8 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
              variants={staggerItem}
              whileHover={{ y: -4 }}
            >
              <stat.icon className={`w-10 h-10 mx-auto mb-3 text-${stat.color}-400`} />
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Story */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Story"
            title="Building a Safer Digital World"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div
              className="rounded-xl p-8 border border-white/5 bg-gradient-to-br from-emerald-500/5 to-transparent"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <Eye className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                To be the world's most trusted cyber security partner, empowering businesses to operate 
                fearlessly in the digital landscape. We envision a future where every organization, 
                regardless of size, has access to enterprise-grade security solutions that protect their 
                assets, reputation, and customer trust.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              className="rounded-xl p-8 border border-white/5 bg-gradient-to-br from-blue-500/5 to-transparent"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-4">
                <Target className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                To deliver cutting-edge security solutions that protect businesses from evolving cyber threats. 
                We combine technical expertise, innovative tools, and proven methodologies to safeguard our 
                clients' digital assets, ensure business continuity, and enable them to focus on growth without 
                fear of digital threats.
              </p>
            </motion.div>
          </div>

          {/* Detailed Description */}
          <motion.div
            className="mt-8 border border-white/5 rounded-2xl p-8 lg:p-12 bg-gradient-to-b from-white/[0.02] to-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Who We Are</h3>
            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <p>
                Founded in {COMPANY_INFO.founded}, <span className="text-white font-semibold">Neverland Studio</span> has grown from a small team of passionate 
                security enthusiasts to a globally recognized leader in cyber security and IT solutions. Our journey has been 
                driven by a singular mission: to make the digital world safer for businesses of all sizes.
              </p>
              <p>
                Today, we serve clients across <span className="text-white font-semibold">25+ countries</span>, protecting critical infrastructure, sensitive data, and 
                digital operations for enterprises in finance, healthcare, e-commerce, government, and technology sectors. Our 
                team of <span className="text-white font-semibold">50+ certified professionals</span> brings decades of combined experience in penetration testing, cloud 
                security, application development, and IT consulting.
              </p>
              <p>
                What sets us apart is our holistic approach to security. We don't just identify vulnerabilities—we partner with 
                our clients to build robust security cultures, implement best practices, and create resilient systems that can 
                withstand the most sophisticated attacks. Our <span className="text-white font-semibold">98% client satisfaction rate</span> and <span className="text-white font-semibold">500+ successful projects</span> 
                speak to our commitment to excellence and client success.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Values"
            title="What Drives Us Forward"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-white/5 mb-4">
                  <value.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-white">{value.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline / Achievements */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Journey"
            title="Key Milestones & Achievements"
            className="mb-12"
          />
          
          <div className="space-y-4">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                className="flex gap-4 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-white/5 flex items-center justify-center">
                  <span className="text-sm font-bold text-emerald-400">{achievement.year}</span>
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="text-lg font-bold text-white mb-1">{achievement.title}</h4>
                  <p className="text-gray-400 text-sm">{achievement.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology & Expertise */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Expertise"
            title="Core Technology Capabilities"
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl p-6 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <tech.icon className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
                <h4 className="text-sm font-semibold text-white">{tech.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Culture */}
        <motion.div
          className="border border-white/5 rounded-2xl p-8 lg:p-12 mb-24 bg-gradient-to-b from-white/[0.02] to-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Team"
            title="World-Class Security Professionals"
            className="mb-8"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-5 rounded-xl border border-white/5 bg-white/[0.02]">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white mb-1">Certified Experts</h4>
              <p className="text-gray-500 text-xs">CISSP, CEH, OSCP, AWS, Azure certified professionals</p>
            </div>
            <div className="text-center p-5 rounded-xl border border-white/5 bg-white/[0.02]">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white mb-1">24/7 Availability</h4>
              <p className="text-gray-500 text-xs">Round-the-clock support and monitoring</p>
            </div>
            <div className="text-center p-5 rounded-xl border border-white/5 bg-white/[0.02]">
              <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white mb-1">Proven Track Record</h4>
              <p className="text-gray-500 text-xs">Decades of combined industry experience</p>
            </div>
          </div>
        </motion.div>

        {/* Partners & Clients Section */}
        <motion.div
          className="mb-24 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Trusted By"
            title="Our Partners & Clients"
            className="mb-12"
          />
          
          {/* Infinite Marquee */}
          <div className="relative overflow-hidden">
            {/* Marquee Container */}
            <div 
              className="flex gap-8 hover:[animation-play-state:paused]"
              style={{
                animation: 'marquee-infinite 60s linear infinite',
                width: 'max-content'
              }}
            >
              {/* Render 3 sets for ultra smooth seamless loop */}
              {[...Array(3)].map((_, setIdx) => (
                <div key={`set-${setIdx}`} className="flex gap-8">
                  {[
                    { name: 'Microsoft Azure', icon: Cloud },
                    { name: 'Amazon AWS', icon: Server },
                    { name: 'Google Cloud', icon: Cloud },
                    { name: 'IBM Security', icon: Shield },
                    { name: 'Oracle', icon: Database },
                    { name: 'Cisco', icon: Network },
                    { name: 'VMware', icon: Layers },
                    { name: 'Red Hat', icon: Box },
                    { name: 'SAP', icon: Package },
                    { name: 'Salesforce', icon: Globe },
                    { name: 'Adobe', icon: Palette },
                    { name: 'Intel', icon: Cpu },
                    { name: 'Dell Technologies', icon: HardDrive },
                    { name: 'HP Enterprise', icon: Monitor },
                    { name: 'Lenovo', icon: Laptop },
                  ].map((partner, idx) => {
                    const Icon = partner.icon;
                    return (
                      <div
                        key={`partner-${setIdx}-${idx}`}
                        className="flip-card flex-shrink-0 w-48 h-24"
                      >
                        <div className="flip-card-inner">
                          {/* Front - Logo Only */}
                          <div className="flip-card-front flex items-center justify-center">
                            <Icon className="w-12 h-12 text-gray-400" />
                          </div>
                          
                          {/* Back - Company Name */}
                          <div className="flip-card-back flex items-center justify-center p-4">
                            <span className="text-emerald-400 text-sm font-semibold text-center">
                              {partner.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-gray-500 text-xs mt-8">
            Trusted by leading enterprises and technology partners worldwide
          </p>
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
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-widest">Join Us</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Ready to Work</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  With the Best?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Partner with Neverland Studio and experience the difference that true expertise, innovation, and commitment can make for your business security.
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
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
