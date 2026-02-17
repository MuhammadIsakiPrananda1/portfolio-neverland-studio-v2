import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, CheckCircle, ArrowRight, CreditCard, Package, 
  TrendingUp, Shield, Smartphone, Users, Award, Clock, DollarSign
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function ECommercePage() {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Shopping Cart',
      description: 'Advanced cart functionality with wishlist, quick checkout, and abandoned cart recovery.',
    },
    {
      icon: CreditCard,
      title: 'Payment Integration',
      description: 'Secure payment gateways supporting cards, digital wallets, and cryptocurrencies.',
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Real-time stock tracking, automated alerts, and multi-warehouse support.',
    },
    {
      icon: TrendingUp,
      title: 'Sales Analytics',
      description: 'Comprehensive insights into sales trends, customer behavior, and revenue metrics.',
    },
  ];

  const benefits = [
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Seamless shopping experience across all devices with mobile-first design.',
    },
    {
      icon: Shield,
      title: 'PCI Compliant',
      description: 'Enterprise-grade security meeting PCI DSS standards for payment processing.',
    },
    {
      icon: Users,
      title: 'Customer Management',
      description: 'CRM integration with order history, preferences, and loyalty programs.',
    },
    {
      icon: DollarSign,
      title: 'Multi-Currency',
      description: 'Support for multiple currencies and languages for global expansion.',
    },
  ];

  const stats = [
    { value: '50+', label: 'Stores Built' },
    { value: '99.99%', label: 'Payment Success' },
    { value: '< 3s', label: 'Checkout Time' },
    { value: '$10M+', label: 'Revenue Processed' },
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
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8 rounded-full" />
          
          <div className="inline-flex p-4 rounded-xl border border-green-500/20 bg-green-500/5 mb-6">
            <ShoppingCart className="w-12 h-12 text-green-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              E-Commerce Solutions
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Launch your online store with powerful e-commerce platforms. 
            From small shops to enterprise marketplaces, we build solutions that drive sales.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Launch Your Store
              </Button>
            </Link>
            <Link to={Routes.HOME}>
              <Button variant="outline" size="lg" className="border-white/10 hover:border-green-500/30">
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
              className="relative rounded-xl p-6 text-center border border-white/5 hover:border-green-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] group"
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
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-3/4 transition-all duration-500" />
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
            subtitle="Platform Features"
            title="Everything You Need to Sell Online"
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
                <div className="inline-flex p-3 rounded-lg bg-green-500/5 border border-green-500/10 mb-4">
                  <feature.icon className="w-6 h-6 text-green-400" />
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
            subtitle="Additional Benefits"
            title="Why Our E-Commerce Solutions Stand Out"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 border border-white/5 border-l-2 border-l-green-500/30 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-lg bg-green-500/5 border border-green-500/10">
                    <benefit.icon className="w-5 h-5 text-green-400" />
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
                  'Experience with major e-commerce platforms',
                  'Custom cart and checkout optimization',
                  'SEO-optimized product pages',
                  'Integration with shipping providers',
                  'Marketing automation tools',
                  'Ongoing maintenance and updates'
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
                <Award className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Proven Track Record</h4>
                <p className="text-gray-500 text-xs">50+ stores launched</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Clock className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Fast Launch</h4>
                <p className="text-gray-500 text-xs">4-6 weeks average</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">High Conversion</h4>
                <p className="text-gray-500 text-xs">Optimized checkout</p>
              </div>
              <div className="rounded-xl p-5 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                <Users className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">24/7 Support</h4>
                <p className="text-gray-500 text-xs">Always available</p>
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5">
              <ShoppingCart className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs font-semibold text-green-300 uppercase tracking-widest">Start Selling</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Ready to Launch Your</span>
                <br />
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Online Store?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Contact us today to discuss your e-commerce vision and get a custom quote for your online store.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Get Started Today
                </Button>
              </Link>
              <Link to={Routes.WEB_DEVELOPMENT}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-green-500/30">
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
