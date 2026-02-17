import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useSidebarState } from '@hooks';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isSidebarOpen = useSidebarState();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!showScrollTop) return null;

  const buttonPositionClass = isSidebarOpen ? 'left-[264px]' : 'left-8';

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 lg:left-[296px] w-12 h-12 rounded-full bg-dark-800 border border-white/10 hover:border-purple-500/30 hover:bg-dark-700 transition-all duration-300 shadow-lg hover:scale-110 flex items-center justify-center z-40 group ${buttonPositionClass}`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
      
      {/* Tooltip */}
      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-dark-800 rounded-lg border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <span className="text-sm text-white font-medium">Back to Top</span>
      </div>
    </button>
  );
}
