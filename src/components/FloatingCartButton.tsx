import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useSidebarState } from '@hooks';

export default function FloatingCartButton() {
    const { totalItems, setIsCartOpen } = useCart();
    const isSidebarOpen = useSidebarState();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const storeSection = document.getElementById('store-section');

            if (storeSection) {
                const rect = storeSection.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Show button when store section is in view
                // Logic: Top of section is above bottom of viewport AND bottom of section is below top of viewport
                const isSectionVisible = rect.top < windowHeight - 100 && rect.bottom > 100;
                setIsVisible(isSectionVisible);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on mount

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const blurClass = isSidebarOpen
        ? 'blur-[2px] opacity-50 pointer-events-none lg:blur-none lg:opacity-100 lg:pointer-events-auto'
        : '';

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    onClick={() => setIsCartOpen(true)}
                    className={`fixed bottom-[4.5rem] right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center z-50 group ${blurClass}`}
                    aria-label="Shopping Cart"
                >
                    <ShoppingCart className="w-5 h-5 text-white" />

                    {/* Item count badge */}
                    <AnimatePresence>
                        {totalItems > 0 && (
                            <motion.div
                                key={totalItems}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg border-2 border-[#0a0a0a]"
                            >
                                {totalItems}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-dark-800 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
                        <span className="text-xs text-white font-medium">🛒 Cart{totalItems > 0 ? ` (${totalItems})` : ''}</span>
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
