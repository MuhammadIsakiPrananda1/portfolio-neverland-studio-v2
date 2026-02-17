import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Building, MessageSquare, X, Check, User, Briefcase } from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'CTO',
        company: 'TechFlow Solutions',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
        content: "Neverland Studio transformed our security infrastructure. Their penetration testing revealed critical vulnerabilities we hadn't even considered. Highly recommended for any enterprise serious about security.",
        rating: 5
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Director of Engineering',
        company: 'CloudScale Inc.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
        content: "The cloud migration strategy they implemented was flawless. We reduced costs by 40% while improving performance and security. A true partner in our digital transformation journey.",
        rating: 5
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'CISO',
        company: 'FinGuard Bank',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150',
        content: "In the financial sector, security is non-negotiable. Neverland Studio's audit was thorough and their recommendations were practical. They speak our language and understand compliance.",
        rating: 5
    },
    {
        id: 4,
        name: 'David Kim',
        role: 'Founder',
        company: 'Nexus Startups',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
        content: "As a startup, we needed a scalable and secure architecture from day one. Their team delivered beyond expectations, setting us up for rapid growth without compromising on security.",
        rating: 5
    },
    {
        id: 5,
        name: 'Lisa Patel',
        role: 'IT Manager',
        company: 'Global Health Systems',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150',
        content: "Their ongoing managed services have been a lifesaver. proactive monitoring means we catch issues before they impact operations. The peace of mind is invaluable.",
        rating: 4
    },
    {
        id: 6,
        name: 'James Wilson',
        role: 'VP of Operations',
        company: 'Logistics Pro',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
        content: "We engaged them for a custom web app with high security requirements. The result was a sleek, performant, and fortress-like application that our users love.",
        rating: 5
    }
];

export default function Testimonials() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            setSubmitSuccess(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setSubmitSuccess(false);
                setRating(5);
            }, 2000);
        }, 1000);
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-dark-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[100px]" />
            </div>

            <div className="container-custom relative z-10 px-4 mx-auto max-w-7xl">
                {/* Hero Section - Matching About.tsx style */}
                <motion.div
                    className="text-center mb-20"
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Accent Line */}
                    <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />

                    <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 text-white">
                        Client <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Success Stories</span>
                    </h1>

                    <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
                        See how we've helped businesses secure their digital assets and drive innovation.
                        Real stories from real clients who trust Neverland Studio.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold transition-all duration-300 backdrop-blur-md group"
                    >
                        <MessageSquare className="w-5 h-5 group-hover:text-emerald-400 transition-colors" />
                        Share Your Story
                    </motion.button>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            className="rounded-xl p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group flex flex-col h-full relative"
                            variants={staggerItem}
                            whileHover={{ y: -5 }}
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-8 text-white/5 group-hover:text-emerald-500/20 transition-colors duration-300">
                                <Quote className="w-10 h-10 rotate-12" />
                            </div>

                            {/* Profile Section */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-br from-emerald-500 to-blue-500">
                                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-dark-900">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                                        {testimonial.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <span>{testimonial.role}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                                        <div className="flex items-center gap-1 group-hover:text-blue-400 transition-colors duration-300">
                                            <Building className="w-3 h-3" />
                                            <span>{testimonial.company}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-500 text-yellow-500' : 'fill-gray-700 text-gray-700'}`}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-gray-300 leading-relaxed text-sm flex-grow italic">
                                "{testimonial.content}"
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 text-center"
                >
                    <div className="p-1 rounded-2xl bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 inline-block">
                        <div className="bg-dark-900 rounded-xl px-8 py-10 md:px-16 md:py-12 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-50" />
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-4 text-white">Ready to start your success story?</h2>
                                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                                    Join hundreds of satisfied clients who have secured their digital future with Neverland Studio.
                                </p>
                                <a
                                    href="/contact"
                                    className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300"
                                >
                                    Schedule Consultation
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Testimonial Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-lg bg-dark-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <h3 className="text-xl font-bold text-white">Share Your Story</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {submitSuccess ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
                                    <p className="text-gray-400">Your testimonial has been submitted successfully.</p>
                                </div>
                            ) : (
                                < >
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input id="name" name="name" required className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors" placeholder="Enter your full name" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="role" className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input id="role" name="role" required className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors" placeholder="Enter your role" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                                        <div className="relative">
                                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input id="company" name="company" required className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors" placeholder="Enter your company name" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="content" className="block text-sm font-medium text-gray-400 mb-2">Review</label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                                            <textarea id="content" name="content" required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors" placeholder="Enter your testimonial..." />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button type="button" key={star} onClick={() => setRating(star)} className="focus:outline-none group">
                                                    <Star className={`w-6 h-6 transition-colors ${star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600 group-hover:text-gray-400'}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all mt-4">
                                        Submit Testimonial
                                    </button>
                                </>
                            )}
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
