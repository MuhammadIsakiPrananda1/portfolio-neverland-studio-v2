import { motion } from 'framer-motion';
import { Shield, Sparkles, Target, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSection from '@components/organisms/HeroSection';
import ServiceCard from '@components/molecules/ServiceCard';
import Button from '@components/atoms/Button';
import { Routes, COMPANY_STATS, SERVICES_DATA } from '@config';
import { staggerContainer, staggerItem, slideUp } from '@utils';

export default function Home() {
  // Show only top 3 services on home page
  const featuredServices = SERVICES_DATA.slice(0, 3);

  return (
    <div className="relative">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-purple-500/10 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-blue-500/10 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-16 sm:pt-20">
        <HeroSection />
      </div>

      {/* Company Stats - Clean & Modern */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20">
        <div className="container-custom px-4 sm:px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {COMPANY_STATS.map((stat, index) => (
              <motion.div
                key={index}
                className="group"
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-center border border-white/5 hover:border-purple-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05]">
                  {/* Number */}
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                    {stat.prefix ?? ''}{stat.value}{stat.suffix ?? ''}
                  </div>
                  
                  {/* Label */}
                  <div className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                  
                  {/* Accent Line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-3/4 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Preview - Enhanced */}
      <section className="relative z-10 py-16 sm:py-20 md:py-24 overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 sm:bg-[length:50px_50px]" 
               style={{
                 backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
                 backgroundSize: '30px 30px'
               }}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-transparent to-dark-900/50" />

        <div className="container-custom relative z-10 px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2.5 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 border border-purple-400/20 mb-8 sm:mb-12 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                <span className="text-xs sm:text-sm font-bold text-purple-300 tracking-widest uppercase">Our Core Services</span>
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
              </div>

              {/* Main Title with Glow Effect */}
              <div className="mb-6 sm:mb-8">
                <h2 className="relative inline-block">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-2 sm:mb-3">
                    <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                      Enterprise Security
                    </span>
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black">
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Solutions
                    </span>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 blur-[100px] bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 -z-10" />
                </h2>
              </div>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-10 px-4">
                Comprehensive cyber security services tailored to protect your business from evolving digital threats
              </p>

              {/* Decorative Line */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="w-12 sm:w-20 md:w-32 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-purple-500/60" />
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
                <div className="w-12 sm:w-20 md:w-32 h-px bg-gradient-to-l from-transparent via-purple-500/40 to-purple-500/60" />
              </div>
            </motion.div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative">
            {/* Decorative Corner Elements */}
            <div className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-24 h-24 sm:w-40 sm:h-40 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 sm:-bottom-20 -right-10 sm:-right-20 w-24 h-24 sm:w-40 sm:h-40 bg-blue-500/10 rounded-full blur-3xl" />
            
            {featuredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Clean & Modern */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20">
        <div className="container-custom px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Simple Badge */}
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-blue-500/30 mb-4 sm:mb-6">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                <span className="text-xs sm:text-sm font-semibold text-blue-300 uppercase tracking-wider">Why Choose Us</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white px-4">
                Trusted Security Partner
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
                Delivering excellence in cyber security with proven expertise and cutting-edge solutions
              </p>
            </motion.div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <div className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-purple-500/10 mb-4 sm:mb-6 group-hover:bg-purple-500/20 transition-colors duration-300">
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Proven Excellence</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Over 10 years delivering enterprise-grade security solutions with 99.9% client satisfaction
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-blue-500/10 mb-4 sm:mb-6 group-hover:bg-blue-500/20 transition-colors duration-300">
                  <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Elite Expertise</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Team of certified security professionals with industry-leading certifications and experience
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <div className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-emerald-500/10 mb-4 sm:mb-6 group-hover:bg-emerald-500/20 transition-colors duration-300">
                  <Rocket className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Cutting-Edge Solutions</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Latest security technologies and methodologies to stay ahead of emerging threats
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Ultra Clean & Modern */}
      <section className="relative z-10 py-16 sm:py-20 md:py-24">
        <div className="container-custom px-4 sm:px-6">
          <motion.div
            className="relative max-w-5xl mx-auto"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Clean Container */}
            <div className="relative border border-white/5 rounded-xl sm:rounded-2xl p-8 sm:p-12 md:p-16 lg:p-20 text-center overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
              {/* Subtle Top Accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
              
              <div className="space-y-6 sm:space-y-8">
                {/* Small Badge */}
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                  <span className="text-[10px] sm:text-xs font-semibold text-emerald-300 uppercase tracking-widest">Ready to Start</span>
                </div>
                
                {/* Title */}
                <div className="space-y-3 sm:space-y-4">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                    <span className="text-white/90">Secure Your</span>
                    <br />
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Digital Future
                    </span>
                  </h2>
                  
                  {/* Subtitle */}
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto px-4 sm:px-0">
                    Partner with industry-leading security experts to protect your business from evolving cyber threats
                  </p>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4">
                  <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500/50" />
                  <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
                  <Link to={Routes.CONTACT}>
                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                      rightIcon={<Rocket className="w-5 h-5" />}
                    >
                      Start Free Consultation
                    </Button>
                  </Link>
                  <Link to={Routes.CYBER_SECURITY}>
                    <Button variant="outline" size="lg" className="border-white/10 hover:border-emerald-500/30">
                      Explore Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
