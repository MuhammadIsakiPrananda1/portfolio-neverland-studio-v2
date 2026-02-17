import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Globe } from 'lucide-react';
import ContactForm from '@components/organisms/ContactForm';
import { COMPANY_INFO } from '@config/constants';
import { slideUp, staggerContainer, staggerItem } from '@utils/animations';

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: COMPANY_INFO.email,
      link: `mailto:${COMPANY_INFO.email}`,
      color: 'blue',
      desc: 'For general inquiries and support'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: COMPANY_INFO.phone,
      link: `tel:${COMPANY_INFO.phone}`,
      color: 'emerald',
      desc: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: COMPANY_INFO.address,
      link: '#',
      color: 'purple',
      desc: 'Come say hello at our HQ'
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section - Modern */}
        <motion.div
          className="text-center mb-20"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          {/* Accent Line */}
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-8 rounded-full" />
          
          {/* Icon Badge */}
          <div className="inline-flex p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 mb-6">
            <MessageSquare className="w-12 h-12 text-blue-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white/90">Let's Start a</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Conversation
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Ready to strengthen your security posture? Our experts are standing by to help you 
            navigate the complex landscape of cyber security.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Contact Info */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactInfo.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.link}
                className="block p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 group"
                variants={staggerItem}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-${item.color}-500/10 border border-${item.color}-500/20 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 font-medium mb-1">{item.value}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Global Reach Card */}
            <motion.div 
              className="p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
              variants={staggerItem}
            >
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white">Global Reach</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                We work with clients worldwide. Our team is distributed across multiple time zones to ensure 24/7 coverage.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Operational Now
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            className="lg:col-span-2"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Decorative gradients behind form */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 space-y-8">
                <ContactForm />

                {/* Map Section */}
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] h-[300px] relative">
                    <iframe 
                      src="https://maps.google.com/maps?q=SMK+Negeri+6+Kota+Malang&t=&z=17&ie=UTF8&iwloc=&output=embed"
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="SMKN 6 Malang Map"
                    />
                    <div className="absolute inset-0 pointer-events-none ring-1 ring-white/10 rounded-2xl" />
                  </div>
                  
                  {/* Map Label */}
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">SMK Negeri 6 Kota Malang</h4>
                      <p className="text-xs text-gray-400">Jl. Ki Ageng Gribig No.28, Madyopuro, Kec. Kedungkandang, Kota Malang, Jawa Timur 65139</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>


      </div>
    </div>
  );
}
