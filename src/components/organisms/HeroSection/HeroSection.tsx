import { motion } from 'framer-motion';
import { ArrowRight, Shield, Lock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@components/atoms/Button';
import TypewriterText from '@components/atoms/TypewriterText';
import { fadeIn, slideUp, staggerContainer, staggerItem } from '@utils/animations';
import { Routes, COMPANY_INFO } from '@config/constants';

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] sm:min-h-[700px] md:h-[85vh] flex items-center justify-center overflow-hidden py-12 sm:py-16 md:py-0">
      {/* Animated Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 md:w-[600px] md:h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="container-custom relative z-10 py-16">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={staggerItem} className="inline-flex items-center gap-2 glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">Enterprise-Grade Cyber Security</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={slideUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-4 sm:px-0"
          >
            <span className="text-white">{COMPANY_INFO.tagline}</span>
            <br />
            <span className="inline-flex items-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-2 overflow-hidden min-h-[1.2em]">
              <TypewriterText 
                texts={[
                  'Engineering Secure IT Systems',
                  'Protecting Digital Assets',
                  'Building Cyber Resilience',
                  'Advancing Security Innovation'
                ]}
                className="text-gradient"
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={3000}
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeIn}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6 md:px-0"
          >
            {COMPANY_INFO.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
          >
            <Link to={Routes.CONTACT} className="flex-1 sm:flex-initial max-w-[180px] sm:max-w-none">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />} className="w-full">
                Get Started
              </Button>
            </Link>
            <Link to={Routes.CYBER_SECURITY} className="flex-1 sm:flex-initial max-w-[180px] sm:max-w-none">
              <Button variant="outline" size="lg" className="w-full">
                Our Services
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={staggerItem}
            className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto px-4 sm:px-0"
          >
            {[
              { icon: Shield, label: '500+ Projects Secured', color: 'text-primary' },
              { icon: Lock, label: '99.9% Uptime SLA', color: 'text-secondary' },
              { icon: Zap, label: '24/7 Threat Monitoring', color: 'text-accent' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="flex flex-row sm:flex-col items-center gap-3 sm:gap-2 justify-center"
              >
                <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 flex-shrink-0">
                  <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} />
                </div>
                <p className="text-xs sm:text-xs text-gray-300 sm:text-gray-400 text-left sm:text-center font-medium sm:font-normal">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="hidden md:block absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}
      >
        <div className="relative backdrop-blur-sm bg-white/5 rounded-full p-2">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
