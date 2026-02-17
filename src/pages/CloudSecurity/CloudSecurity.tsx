import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Activity, Bell, LineChart, Eye, Database } from 'lucide-react';
import Button from '@components/atoms/Button';
import { Routes } from '@config/constants';
import { slideUp, staggerContainer, staggerItem } from '@utils/animations';

export default function CloudMonitoringPage() {
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
          <div className="inline-flex p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-6 shadow-glow-primary">
            <Activity className="w-16 h-16 text-primary" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gradient">
            Cloud Monitoring & Observability
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Gain complete visibility into your cloud infrastructure with real-time monitoring, logging, and observability solutions. 
            Detect issues before they impact your business.
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
            className="glass rounded-2xl p-8 border border-primary/20"
            variants={staggerItem}
          >
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-2 h-2 rounded-full text-primary"></span>
              Key Features
            </h2>
            <div className="space-y-4">
              {[
                'Real-time Infrastructure Monitoring',
                'Application Performance Monitoring (APM)',
                'Centralized Logging & Log Analytics',
                'Custom Metrics & Dashboards',
                'Intelligent Alerting & Notifications',
                'Distributed Tracing & Debugging',
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3"
                  variants={staggerItem}
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
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
              <span className="w-2 h-2 rounded-full text-primary"></span>
              Why Choose This Service
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Proactive Issue Detection
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Identify and resolve performance bottlenecks before they impact users with AI-powered anomaly detection.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Multi-Cloud Visibility
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Monitor AWS, Azure, GCP, and hybrid environments from a single unified platform with consistent insights.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Reduce MTTR
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Drastically reduce mean time to resolution with comprehensive logs, metrics, and traces in one place.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Monitoring Stack Section */}
        <motion.div
          className="glass rounded-2xl p-8 lg:p-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-white">
            Complete Observability Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: LineChart, title: 'Metrics', desc: 'Real-time performance metrics' },
              { icon: Database, title: 'Logs', desc: 'Centralized log aggregation' },
              { icon: Eye, title: 'Traces', desc: 'Distributed request tracing' },
              { icon: Bell, title: 'Alerts', desc: 'Intelligent notifications' },
            ].map((component, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-4">
                  <component.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {component.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {component.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tools & Technologies */}
        <motion.div
          className="glass rounded-2xl p-8 lg:p-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-white">
            Industry-Leading Tools
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              'Prometheus',
              'Grafana',
              'ELK Stack',
              'Datadog',
              'New Relic',
              'CloudWatch',
              'Azure Monitor',
              'Google Cloud Operations',
              'Jaeger',
              'Loki',
            ].map((tool, idx) => (
              <div
                key={idx}
                className="px-6 py-3 rounded-lg bg-dark-800/50 border border-primary/10 hover:border-primary/30 transition-colors"
              >
                <span className="text-gray-300 font-medium">{tool}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="glass rounded-3xl p-12 text-center border border-primary/20 shadow-glow-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Get Full Visibility Into Your Infrastructure
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Schedule a consultation to learn how our monitoring solutions can improve your system reliability and performance.
          </p>
          <Link to={Routes.CONTACT}>
            <Button variant="primary" size="lg">
              Start Monitoring Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
