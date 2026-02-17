import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, FileSearch, Shield, FileText, ClipboardList } from 'lucide-react';
import Button from '@components/atoms/Button';
import { Routes } from '@config/constants';
import { slideUp, staggerContainer, staggerItem } from '@utils/animations';

export default function SecurityAuditPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
{/* Service Header */}
        <motion.div
          className="text-center mb-16"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          <div className="inline-flex p-6 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 mb-6 shadow-glow-secondary">
            <FileSearch className="w-16 h-16 text-secondary" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gradient">
            Security Audit
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Thorough evaluation of your security posture, policies, and compliance status. We ensure your 
            organization meets industry standards and best practices.
          </p>
        </motion.div>

        {/* Key Features Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Features List */}
          <motion.div
            className="glass rounded-2xl p-8 border border-secondary/20"
            variants={staggerItem}
          >
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-2 h-2 rounded-full text-secondary"></span>
              Key Features
            </h2>
            <div className="space-y-4">
              {[
                'Compliance Assessment (ISO 27001, SOC 2, PCI DSS)',
                'Security Policy Review',
                'Access Control Audits',
                'Configuration Reviews',
                'Third-Party Risk Assessment',
                'Gap Analysis & Recommendations',
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3"
                  variants={staggerItem}
                >
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-gray-300 text-lg">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            className="glass rounded-2xl p-8"
            variants={staggerItem}
          >
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-2 h-2 rounded-full text-secondary"></span>
              Why Choose This Service
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">
                  Regulatory Compliance
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Ensure your organization meets all necessary compliance requirements and avoids costly penalties.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">
                  Comprehensive Assessment
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Get a complete picture of your security posture across all aspects of your organization.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">
                  Actionable Insights
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Receive detailed recommendations with priority rankings to improve your security program effectively.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Audit Process Section */}
        <motion.div
          className="glass rounded-2xl p-8 lg:p-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-white">
            Our Audit Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: ClipboardList, title: 'Scope Definition', desc: 'Identify audit objectives and boundaries' },
              { icon: FileSearch, title: 'Data Collection', desc: 'Gather policies, procedures, and evidence' },
              { icon: Shield, title: 'Assessment', desc: 'Evaluate controls and compliance status' },
              { icon: FileText, title: 'Reporting', desc: 'Deliver findings with remediation roadmap' },
            ].map((phase, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex p-4 rounded-xl bg-secondary/10 mb-4">
                  <phase.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {phase.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="glass rounded-3xl p-12 text-center border border-secondary/20 shadow-glow-secondary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Ready for a Security Audit?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Schedule a consultation to discuss your compliance and audit requirements with our security experts.
          </p>
          <Link to={Routes.CONTACT}>
            <Button variant="primary" size="lg">
              Contact Us Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
