import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, Sparkles,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Routes } from '@config/constants';

function formatRupiah(num: number): string {
    return 'Rp ' + num.toLocaleString('id-ID');
}

export default function CartDrawer() {
    const {
        items,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalSavings,
        isCartOpen,
        setIsCartOpen,
        lastAddedItem,
    } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0c1222] border-l border-white/10 z-[80] flex flex-col shadow-2xl"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                    <ShoppingCart className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-white">Shopping Cart</h2>
                                    <p className="text-xs text-gray-500">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                                    <ShoppingCart className="w-16 h-16 text-gray-700 mb-4" />
                                    <h3 className="text-base font-semibold text-gray-400 mb-2">Cart is Empty</h3>
                                    <p className="text-sm text-gray-600 mb-6">No services added yet</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="px-6 py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-all"
                                    >
                                        Browse Services
                                    </button>
                                </div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 40, scale: 0.95 }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                scale: 1,
                                                ...(lastAddedItem === item.id
                                                    ? { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' }
                                                    : {}),
                                            }}
                                            exit={{ opacity: 0, x: 40, scale: 0.95 }}
                                            transition={{ type: 'spring', damping: 20 }}
                                            className={`relative rounded-xl p-4 border transition-all duration-300 ${lastAddedItem === item.id
                                                ? 'border-primary/40 bg-primary/5'
                                                : 'border-white/5 bg-white/[0.02]'
                                                }`}
                                        >
                                            {/* Just added indicator */}
                                            {lastAddedItem === item.id && (
                                                <motion.div
                                                    className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-green-500 text-[10px] font-bold text-white"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                >
                                                    ✓ Added
                                                </motion.div>
                                            )}

                                            <div className="flex items-start gap-3">
                                                {/* Icon */}
                                                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${item.gradient} flex-shrink-0`}>
                                                    <ShoppingCart className="w-4 h-4 text-white" />
                                                </div>

                                                {/* Details */}
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-white font-semibold text-sm truncate">{item.name}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-gray-500 text-xs line-through">
                                                            {formatRupiah(item.originalPrice)}
                                                        </span>
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 font-bold">
                                                            -{item.discountPercent}%
                                                        </span>
                                                    </div>
                                                    <div className="text-primary font-bold text-sm mt-0.5">
                                                        {formatRupiah(item.discountedPrice)}
                                                        <span className="text-gray-600 font-normal text-xs"> {item.period}</span>
                                                    </div>
                                                </div>

                                                {/* Remove button */}
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            {/* Quantity controls */}
                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                                                <span className="text-xs text-gray-500">Qty:</span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
                                                    >
                                                        <Minus className="w-3 h-3 text-gray-400" />
                                                    </button>
                                                    <motion.span
                                                        key={item.quantity}
                                                        initial={{ scale: 1.3, color: '#818cf8' }}
                                                        animate={{ scale: 1, color: '#fff' }}
                                                        className="w-8 text-center text-sm font-bold"
                                                    >
                                                        {item.quantity}
                                                    </motion.span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
                                                    >
                                                        <Plus className="w-3 h-3 text-gray-400" />
                                                    </button>
                                                </div>
                                                <span className="text-white font-bold text-sm">
                                                    {formatRupiah(item.discountedPrice * item.quantity)}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer - Summary & Checkout */}
                        {items.length > 0 && (
                            <div className="border-t border-white/10 p-5 space-y-4 bg-[#0a0f1a]">
                                {/* Savings badge */}
                                {totalSavings > 0 && (
                                    <motion.div
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/5 border border-green-500/20"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <Sparkles className="w-4 h-4 text-green-400" />
                                        <span className="text-xs text-green-300 font-medium">
                                            You saved {formatRupiah(totalSavings)}! 🎉
                                        </span>
                                    </motion.div>
                                )}

                                {/* Price breakdown */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-400">Total ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                                        <span className="text-white font-bold text-lg">{formatRupiah(totalPrice)}</span>
                                    </div>
                                </div>

                                {/* Checkout button */}
                                <Link
                                    to={Routes.IT_SERVICES_CHECKOUT}
                                    onClick={() => setIsCartOpen(false)}
                                    className="block w-full"
                                >
                                    <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                                        <Tag className="w-4 h-4" />
                                        Checkout Now
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>

                                {/* Clear cart */}
                                <button
                                    onClick={clearCart}
                                    className="w-full py-2.5 rounded-xl text-gray-500 hover:text-red-400 text-xs font-medium hover:bg-red-500/5 transition-all"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
