import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Shield, Lock, Bug, Target, FileText } from 'lucide-react';
import Button from '@components/atoms/Button';
import { Routes } from '@config/constants';
import { slideUp, staggerContainer, staggerItem } from '@utils/animations';

export default function PenetrationTestingPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Service Header - Clean & Modern */}
        <motion.div
          className="text-center mb-20"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          {/* Accent Line */}
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8 rounded-full" />
          
          {/* Icon Badge */}
          <div className="inline-flex p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 mb-6">
            <Shield className="w-12 h-12 text-purple-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Penetration Testing
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Comprehensive ethical hacking services to identify vulnerabilities before malicious actors do. 
            Our expert team simulates real-world attacks to test your defenses.
          </p>
        </motion.div>

        {/* Key Features Section - Clean Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Features List */}
          <motion.div
            className="border border-white/5 rounded-xl p-8 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
            variants={staggerItem}
          >
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              Key Features
            </h2>
            <div className="space-y-3">
              {[
                'External & Internal Network Testing',
                'Web Application Security Assessment',
                'Mobile Application Testing',
                'Social Engineering Simulations',
                'Red Team Operations',
                'Detailed Remediation Reports',
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3"
                  variants={staggerItem}
                >
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            className="border border-white/5 rounded-xl p-8 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
            variants={staggerItem}
          >
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              Why Choose This Service
            </h2>
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-400">
                  Identify Vulnerabilities Early
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Discover security weaknesses before hackers do, allowing you to patch vulnerabilities proactively.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-400">
                  Real-World Attack Simulations
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Our certified ethical hackers use the same techniques as cybercriminals to test your defenses.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-400">
                  Compliance & Peace of Mind
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Meet regulatory requirements and gain confidence in your security posture with professional testing.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Methodology Section - Clean */}
        <motion.div
          className="border border-white/5 rounded-xl p-8 lg:p-12 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center text-white">
            Our Testing Methodology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Target, title: 'Reconnaissance', desc: 'Gather information about target systems' },
              { icon: Bug, title: 'Vulnerability Scanning', desc: 'Identify potential security weaknesses' },
              { icon: Lock, title: 'Exploitation', desc: 'Attempt to exploit discovered vulnerabilities' },
              { icon: FileText, title: 'Reporting', desc: 'Comprehensive documentation with remediation steps' },
            ].map((phase, idx) => (
              <div key={idx} className="text-center group">
                <div className="inline-flex p-3 rounded-lg bg-purple-500/5 border border-purple-500/10 mb-4 group-hover:bg-purple-500/10 transition-all duration-300">
                  <phase.icon className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {phase.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            ))}
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
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Security Testing</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Ready to Test</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Your Defenses?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Schedule a free consultation to discuss your penetration testing needs and get a customized proposal.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <Link to={Routes.CONTACT}>
              <Button variant="primary" size="lg">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
