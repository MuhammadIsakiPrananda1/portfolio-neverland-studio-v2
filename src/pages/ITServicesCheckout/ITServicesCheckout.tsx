import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    ShoppingCart, ArrowLeft, Trash2, Plus, Minus, CreditCard,
    Send, User, Mail, Phone, MessageSquare, CheckCircle, Sparkles,
    Tag, Clock, Shield, AlertCircle
} from 'lucide-react';
import Button from '@components/atoms/Button';
import AuthModal from '@components/organisms/AuthModal';
import { Routes, COMPANY_INFO } from '@config/constants';
import { useCart } from '@/contexts/CartContext';
import { useAuthState } from '@/hooks/useAuthState';
import { slideUp } from '@utils/animations';

function formatRupiah(num: number): string {
    return 'Rp ' + num.toLocaleString('id-ID');
}

export default function ITServicesCheckoutPage() {
    const {
        items,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalSavings,
    } = useCart();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthState();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        notes: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const generateWhatsAppMessage = (): string => {
        let msg = `Hello Neverland Studio! 👋\n\nI would like to order the following IT services:\n\n`;
        msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;

        items.forEach((item, idx) => {
            msg += `${idx + 1}. *${item.name}*\n`;
            msg += `   Qty: ${item.quantity}x\n`;
            if (item.discountPercent > 0) {
                msg += `   Price: ~${formatRupiah(item.originalPrice)}~ → ${formatRupiah(item.discountedPrice)}\n`;
                msg += `   Discount: ${item.discountPercent}% OFF\n`;
            } else {
                msg += `   Price: ${formatRupiah(item.discountedPrice)}\n`;
            }
            msg += `   Subtotal: ${formatRupiah(item.discountedPrice * item.quantity)}\n\n`;
        });

        msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
        msg += `💰 *Total: ${formatRupiah(totalPrice)}*\n`;
        if (totalSavings > 0) {
            msg += `🎉 *Savings: ${formatRupiah(totalSavings)}*\n`;
        }
        msg += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

        msg += `📋 *Customer Details:*\n`;
        msg += `Name: ${formData.name}\n`;
        msg += `Email: ${formData.email}\n`;
        msg += `Phone/WA: ${formData.phone}\n`;
        if (formData.company) msg += `Company: ${formData.company}\n`;
        if (formData.notes) msg += `\nNotes: ${formData.notes}\n`;

        msg += `\nPlease provide more information and next steps. Thank you! 🙏`;

        return encodeURIComponent(msg);
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) return;

        // Require login before checkout
        if (!isAuthenticated) {
            setShowAuthModal(true);
            return;
        }

        const whatsappNumber = COMPANY_INFO.phone.replace(/[^0-9]/g, '');
        const message = generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        window.open(whatsappUrl, '_blank');
        setIsSubmitted(true);
    };

    const handleNewOrder = () => {
        clearCart();
        setIsSubmitted(false);
        navigate(Routes.IT_SERVICES_STORE);
    };

    // Success state
    if (isSubmitted) {
        return (
            <div className="pt-32 pb-20 min-h-screen">
                <div className="container-custom max-w-2xl">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        <motion.div
                            className="inline-flex p-6 rounded-full bg-green-500/10 border border-green-500/20 mb-8"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        >
                            <CheckCircle className="w-16 h-16 text-green-400" />
                        </motion.div>

                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Order Submitted! 🎉
                        </h1>
                        <p className="text-lg text-gray-400 mb-4 max-w-lg mx-auto">
                            Your order has been sent via WhatsApp. Our team will respond within <strong className="text-white">1 hour</strong>.
                        </p>

                        <div className="flex items-center justify-center gap-2 text-sm text-green-400/80 mb-8">
                            <Sparkles className="w-4 h-4" />
                            <span>You saved {formatRupiah(totalSavings)} with this promo!</span>
                        </div>

                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 mb-8 text-left">
                            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                Next Steps:
                            </h3>
                            <div className="space-y-2">
                                {[
                                    'Our team will review your order',
                                    'You will receive an official proposal & quotation',
                                    'Once approved, work begins immediately',
                                    'Progress updates via dashboard & WhatsApp',
                                ].map((step, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                                        <CheckCircle className="w-4 h-4 text-green-400/60 mt-0.5 flex-shrink-0" />
                                        <span>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={handleNewOrder}
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg hover:scale-[1.02] transition-all"
                            >
                                Order Again
                            </button>
                            <Link to={Routes.HOME}>
                                <Button variant="outline" size="lg" className="border-white/10 hover:border-primary/30">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container-custom max-w-5xl">

                {/* Header */}
                <motion.div
                    className="mb-12"
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                >
                    <Link
                        to={Routes.IT_SERVICES_STORE}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Store
                    </Link>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Checkout
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Review your order and submit via WhatsApp
                    </p>
                </motion.div>

                {items.length === 0 ? (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <ShoppingCart className="w-20 h-20 text-gray-700 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-400 mb-3">Cart is Empty</h2>
                        <p className="text-gray-600 mb-8">Please select services first</p>
                        <Link to={Routes.IT_SERVICES_STORE}>
                            <Button variant="primary" size="lg">
                                Go to Store
                            </Button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left: Cart Items + Form */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Cart Items */}
                            <motion.div
                                className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="p-5 border-b border-white/5 flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <ShoppingCart className="w-5 h-5 text-primary" />
                                        Order ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                                    </h2>
                                </div>

                                <div className="divide-y divide-white/5">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            className="p-5 flex items-start gap-4"
                                        >
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} flex-shrink-0`}>
                                                <CreditCard className="w-5 h-5 text-white" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                                                <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    {item.discountPercent > 0 && (
                                                        <span className="text-gray-500 text-xs line-through">
                                                            {formatRupiah(item.originalPrice)}
                                                        </span>
                                                    )}
                                                    <span className="text-primary font-bold text-sm">
                                                        {formatRupiah(item.discountedPrice)}
                                                    </span>
                                                    {item.discountPercent > 0 && (
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 font-bold">
                                                            -{item.discountPercent}%
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Quantity */}
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
                                                >
                                                    <Minus className="w-3.5 h-3.5 text-gray-400" />
                                                </button>
                                                <span className="w-8 text-center text-white font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
                                                >
                                                    <Plus className="w-3.5 h-3.5 text-gray-400" />
                                                </button>
                                            </div>

                                            {/* Subtotal */}
                                            <div className="text-right flex-shrink-0">
                                                <div className="text-white font-bold">
                                                    {formatRupiah(item.discountedPrice * item.quantity)}
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-xs text-gray-500 hover:text-red-400 transition-colors mt-1 flex items-center gap-1 ml-auto"
                                                >
                                                    <Trash2 className="w-3 h-3" /> Remove
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Customer Form */}
                            <motion.form
                                onSubmit={handleCheckout}
                                id="checkout-form"
                                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                    <User className="w-5 h-5 text-primary" />
                                    Customer Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-400 font-medium mb-2">Full Name *</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder-gray-600"
                                                placeholder="Muhammad Isaki"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs text-gray-400 font-medium mb-2">Email *</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder-gray-600"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs text-gray-400 font-medium mb-2">Phone / WhatsApp *</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder-gray-600"
                                                placeholder="08123456789"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs text-gray-400 font-medium mb-2">Company (optional)</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder-gray-600"
                                                placeholder="PT Neverland Studio"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-xs text-gray-400 font-medium mb-2">Additional Notes (optional)</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder-gray-600 resize-none"
                                            placeholder="Additional details about your project requirements..."
                                        />
                                    </div>
                                </div>
                            </motion.form>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sticky top-24"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-primary" />
                                    Order Summary
                                </h2>

                                <div className="space-y-3 mb-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400 truncate flex-1 mr-2">
                                                {item.name} × {item.quantity}
                                            </span>
                                            <span className="text-white font-medium flex-shrink-0">
                                                {formatRupiah(item.discountedPrice * item.quantity)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-white/5 pt-4 space-y-3">
                                    {totalSavings > 0 && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-green-400 flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" /> Total Savings
                                            </span>
                                            <span className="text-green-400 font-bold">-{formatRupiah(totalSavings)}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between text-lg">
                                        <span className="text-white font-bold">Total</span>
                                        <span className="text-white font-extrabold text-2xl">
                                            {formatRupiah(totalPrice)}
                                        </span>
                                    </div>
                                </div>

                                {/* Security note */}
                                <div className="mt-4 p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                                    <div className="flex items-start gap-2 text-xs text-green-400/80">
                                        <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                        <span>Payment and project details will be discussed further via WhatsApp.</span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    type="submit"
                                    form="checkout-form"
                                    className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    Submit Order via WhatsApp
                                </button>

                                <p className="mt-3 text-center text-[10px] text-gray-600 flex items-center justify-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    Order will be sent to Neverland Studio's WhatsApp
                                </p>
                            </motion.div>
                        </div>

                    </div>
                )}
            </div>

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </div>
    );
}
