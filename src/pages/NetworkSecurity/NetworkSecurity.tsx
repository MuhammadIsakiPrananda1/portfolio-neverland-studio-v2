import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Network, Shield, Activity, Lock, Eye } from 'lucide-react';
import Button from '@components/atoms/Button';
import { Routes } from '@config/constants';
import { slideUp, staggerContainer, staggerItem } from '@utils/animations';

export default function NetworkSecurityPage() {
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
          <div className="inline-flex p-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 mb-6 shadow-glow-accent">
            <Network className="w-16 h-16 text-accent" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gradient">
            Network Security
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Advanced network protection solutions to safeguard your infrastructure from unauthorized access, 
            attacks, and data breaches with 24/7 monitoring and response.
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
            className="glass rounded-2xl p-8 border border-accent/20"
            variants={staggerItem}
          >
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-2 h-2 rounded-full text-accent"></span>
              Key Features
            </h2>
            <div className="space-y-4">
              {[
                'Firewall Configuration & Management',
                'Intrusion Detection & Prevention Systems',
                'VPN & Secure Remote Access',
                'Network Segmentation',
                'DDoS Protection',
                '24/7 Network Monitoring',
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3"
                  variants={staggerItem}
                >
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
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
              <span className="w-2 h-2 rounded-full text-accent"></span>
              Why Choose This Service
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-accent">
                  Proactive Threat Detection
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Identify and block threats in real-time before they can compromise your network infrastructure.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-accent">
                  Always-On Protection
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Round-the-clock monitoring ensures your network is protected 24/7/365 against emerging threats.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-accent">
                  Scalable Solutions
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Our network security solutions grow with your business, from small offices to enterprise networks.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Security Layers Section */}
        <motion.div
          className="glass rounded-2xl p-8 lg:p-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-white">
            Multi-Layer Network Defense
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Perimeter Security', desc: 'Firewall and edge protection solutions' },
              { icon: Eye, title: 'Monitoring', desc: 'Real-time network traffic analysis' },
              { icon: Lock, title: 'Encryption', desc: 'Secure data in transit protection' },
              { icon: Activity, title: 'Response', desc: 'Rapid incident response and mitigation' },
            ].map((layer, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex p-4 rounded-xl bg-accent/10 mb-4">
                  <layer.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {layer.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {layer.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="glass rounded-3xl p-12 text-center border border-accent/20 shadow-glow-accent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Secure Your Network Today
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Get a free network security assessment and discover how we can protect your infrastructure.
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
