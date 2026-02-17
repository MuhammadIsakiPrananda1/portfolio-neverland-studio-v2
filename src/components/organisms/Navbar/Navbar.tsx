import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Home, Briefcase, Users, FolderOpen, BookOpen, Mail, Shield,
  ChevronDown, HelpCircle, Code, CloudCog, Settings, Network,
  FileSearch, Cloud, Target, Server, Flag, Globe, ShoppingCart, Zap,
  Palette, Box, ArrowUpCircle, FileCode, TrendingDown, Headphones,
  Database, HardDrive, Layers, Activity, LogOut, Swords, MessageSquare, Library,
  Terminal, Lock, Cpu, Rss
} from 'lucide-react';
import Logo from '@components/atoms/Logo';
import AuthModal from '@components/organisms/AuthModal';
import { Routes } from '@config/constants';
import logoImage from '@/assets/logo.png';
import { useAuthState } from '@/hooks/useAuthState';
import { authService } from '@/services/auth.service';

interface NavItem {
  path: string;
  label: string;
  icon: any;
  subItems?: NavItem[];
}

const mainNavItems: NavItem[] = [
  { path: Routes.HOME, label: 'Home', icon: Home },
  {
    path: '#',
    label: 'Services',
    icon: Briefcase,
    subItems: [
      {
        path: '/services/cyber-security',
        label: 'Cyber Security',
        icon: Shield,
        subItems: [
          { path: '/services/cyber-security', label: 'Overview', icon: Shield },
          { path: '/services/penetration-testing', label: 'Penetration Testing', icon: Target },
          { path: '/services/security-audit', label: 'Security Audit', icon: FileSearch },
          { path: '/services/network-security', label: 'Network Security', icon: Network },
          { path: '/services/cloud-security', label: 'Cloud Monitoring', icon: Cloud },
          { path: '/services/ctf', label: 'CTF Training', icon: Flag },
        ]
      },
      {
        path: '/services/web-development',
        label: 'Web Development',
        icon: Code,
        subItems: [
          { path: '/services/web-development', label: 'Overview', icon: Code },
          { path: '/services/custom-web-apps', label: 'Custom Web Apps', icon: Globe },
          { path: '/services/ecommerce', label: 'E-Commerce', icon: ShoppingCart },
          { path: '/services/pwa', label: 'Progressive Web Apps', icon: Zap },
          { path: '/services/api-development', label: 'API Development', icon: Box },
          { path: '/services/ui-ux-design', label: 'UI/UX Design', icon: Palette },
        ]
      },
      {
        path: '/services/cloud-solutions',
        label: 'Cloud Solutions',
        icon: CloudCog,
        subItems: [
          { path: '/services/cloud-solutions', label: 'Overview', icon: Cloud },
          { path: '/services/cloud-migration', label: 'Cloud Migration', icon: ArrowUpCircle },
          { path: '/services/infrastructure-as-code', label: 'Infrastructure as Code', icon: FileCode },
          { path: '/services/cloud-security-solutions', label: 'Cloud Security', icon: Shield },
          { path: '/services/cost-optimization', label: 'Cost Optimization', icon: TrendingDown },
          { path: '/services/managed-services', label: 'Managed Services', icon: Headphones },
        ]
      },
      {
        path: '/services/it-infrastructure',
        label: 'IT Infrastructure',
        icon: Server,
        subItems: [
          { path: '/services/it-infrastructure', label: 'Overview', icon: Server },
          { path: '/services/server-management', label: 'Server Management', icon: HardDrive },
          { path: '/services/network-infrastructure', label: 'Network Infrastructure', icon: Network },
          { path: '/services/storage-solutions', label: 'Storage Solutions', icon: Database },
          { path: '/services/virtualization', label: 'Virtualization', icon: Layers },
          { path: '/services/monitoring-maintenance', label: 'Monitoring & Maintenance', icon: Activity },
        ]
      },
      {
        path: '/services/consulting',
        label: 'IT Consulting',
        icon: Users,
        subItems: [
          { path: '/services/consulting', label: 'Overview', icon: Briefcase },
          { path: '/services/it-strategy-planning', label: 'IT Strategy & Planning', icon: Target },
          { path: '/services/technology-assessment', label: 'Technology Assessment', icon: FileSearch },
          { path: '/services/digital-transformation', label: 'Digital Transformation', icon: Zap },
          { path: '/services/it-governance', label: 'IT Governance', icon: Shield },
          { path: '/services/vendor-management', label: 'Vendor Management', icon: Users },
        ]
      },
    ]
  },
  { path: Routes.ABOUT, label: 'About', icon: Globe },
  { path: Routes.TEAM, label: 'Our Team', icon: Users },
  { path: Routes.PROJECTS, label: 'Projects', icon: FolderOpen },
  { path: Routes.CYBER_NEWS, label: 'Cyber News', icon: Rss },
  { path: Routes.TESTIMONIALS, label: 'Testimonials', icon: MessageSquare },
  { path: Routes.BLOG, label: 'Blog', icon: BookOpen },
  { path: Routes.CONTACT, label: 'Contact', icon: Mail },
];

const playgroundItems: NavItem[] = [
  {
    path: Routes.PLAYGROUND,
    label: 'Playground Hub',
    icon: Swords,
    subItems: [
      { path: Routes.PLAYGROUND, label: 'All Challenges', icon: Swords },
      { path: Routes.PLAYGROUND_SQL, label: 'SQL Injection', icon: Database },
      { path: Routes.PLAYGROUND_WEB, label: 'Web Security (XSS)', icon: Code },
      { path: Routes.PLAYGROUND_SYSTEM, label: 'System Security', icon: Terminal },
      { path: Routes.PLAYGROUND_CRYPTO, label: 'Cryptography', icon: Lock },
      { path: Routes.PLAYGROUND_VM, label: 'Virtual Machine', icon: Cpu },
    ]
  },
];

const resourceItems: NavItem[] = [
  { path: Routes.RESOURCES, label: 'Resources', icon: Library },
  { path: '/help', label: 'Help Center', icon: HelpCircle },
  { path: Routes.SETTINGS, label: 'Settings', icon: Settings },
];

interface MenuItemProps {
  item: NavItem;
  index: number;
  isActive: boolean;
  isMobile?: boolean;
  depth?: number;
  expandedItems?: string[];
  onToggle?: (path: string, parentPath?: string) => void;
}

function MenuItem({ item, index, isActive, isMobile = false, depth = 0, expandedItems = [], onToggle }: MenuItemProps) {
  const location = useLocation();
  const Icon = item.icon;
  const hasSubItems = item.subItems && item.subItems.length > 0;

  // Check if this item is expanded
  const isExpanded = expandedItems.includes(item.path);

  // Check if any sub-item is active recursively
  const checkSubItemActive = (items?: NavItem[]): boolean => {
    if (!items) return false;
    return items.some(sub =>
      location.pathname === sub.path || checkSubItemActive(sub.subItems)
    );
  };

  const isSubItemActive = hasSubItems && checkSubItemActive(item.subItems);
  const shouldHighlight = isActive || isSubItemActive;

  const handleClick = (e: React.MouseEvent) => {
    if (hasSubItems && onToggle) {
      e.preventDefault();
      onToggle(item.path);
    } else if (!hasSubItems && depth === 0) {
      // If navigating to a main menu item, close all expanded submenus
      if (onToggle) {
        onToggle('RESET_ALL');
      }
    }
  };

  return (
    <div>
      <Link to={hasSubItems ? '#' : item.path} onClick={handleClick}>
        <div
          className={`
            relative flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg
            transition-all duration-300 group cursor-pointer overflow-hidden
            ${shouldHighlight
              ? 'bg-gradient-to-r from-primary/20 via-secondary/15 to-primary/20 text-white shadow-lg shadow-primary/10'
              : 'text-gray-400 hover:text-white hover:bg-white/5 hover:shadow-md'
            }
          `}
        >
          {/* Animated background on hover */}
          <div className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${shouldHighlight ? 'opacity-100' : ''}`} />

          {/* Active indicator - left bar */}
          {shouldHighlight && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-gradient-to-b from-primary via-secondary to-primary rounded-r-full shadow-lg shadow-primary/50"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}

          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Icon with glow effect */}
            <div className={`relative z-10 flex-shrink-0 ${shouldHighlight ? 'text-primary' : ''} transition-colors duration-300`}>
              <Icon className="w-4 h-4" />
              {shouldHighlight && (
                <div className="absolute inset-0 blur-md bg-primary/50 -z-10" />
              )}
            </div>

            {/* Label */}
            <span className="relative z-10 font-medium text-xs tracking-wide truncate">
              {item.label}
            </span>
          </div>

          {/* Expand icon or active dot */}
          <div className="relative z-10 flex-shrink-0">
            {hasSubItems ? (
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              />
            ) : shouldHighlight ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/50"
              />
            ) : null}
          </div>

          {/* Hover shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
          </div>
        </div>
      </Link>

      {/* Sub-items */}
      <AnimatePresence>
        {hasSubItems && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`mt-1 space-y-1 border-l-2 border-white/10 ${depth === 0 ? 'ml-3 pl-3' : 'ml-2 pl-2'}`}>
              {item.subItems?.map((subItem) => {
                const SubIcon = subItem.icon;
                const isSubActive = location.pathname === subItem.path;
                const hasNestedSubItems = subItem.subItems && subItem.subItems.length > 0;

                // If the sub-item has its own sub-items, render it as another MenuItem
                if (hasNestedSubItems) {
                  return (
                    <MenuItem
                      key={subItem.path}
                      item={subItem}
                      index={0}
                      isActive={isSubActive}
                      isMobile={isMobile}
                      depth={depth + 1}
                      expandedItems={expandedItems}
                      onToggle={onToggle}
                    />
                  );
                }

                // Otherwise, render as a simple link
                return (
                  <Link key={subItem.path} to={subItem.path}>
                    <div
                      className={`
                        relative flex items-center gap-2 px-2.5 py-2 rounded-md
                        transition-all duration-200 group/sub cursor-pointer
                        ${isSubActive
                          ? 'bg-primary/10 text-white border border-primary/30'
                          : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      <SubIcon className={`w-3.5 h-3.5 flex-shrink-0 ${isSubActive ? 'text-primary' : ''}`} />
                      <span className="text-[11px] font-medium tracking-wide truncate">{subItem.label}</span>
                      {isSubActive && (
                        <div className="ml-auto w-1 h-1 rounded-full bg-primary" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { isAuthenticated } = useAuthState();
  const location = useLocation();

  // Recursive check for active state
  const checkActive = (item: NavItem): boolean => {
    if (item.path === location.pathname) return true;
    if (item.subItems) {
      return item.subItems.some(sub => checkActive(sub));
    }
    return false;
  };

  // Dispatch event when sidebar opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-sidebar-open');
      window.dispatchEvent(new CustomEvent('mobileSidebarChange', { detail: { isOpen: true } }));
    } else {
      document.body.classList.remove('mobile-sidebar-open');
      window.dispatchEvent(new CustomEvent('mobileSidebarChange', { detail: { isOpen: false } }));
    }
  }, [isOpen]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsOpen(false); // Close mobile sidebar
    } catch (error) {
      // Handle logout error silently
    }
  };

  // Get parent path (find which top-level item contains the current path)
  const getParentPath = (currentPath: string): string | null => {
    // Check main nav items
    for (const item of mainNavItems) {
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (subItem.path === currentPath || (subItem.subItems && subItem.subItems.some(s => s.path === currentPath))) {
            return item.path;
          }
        }
      }
    }
    
    // Check playground items
    for (const item of playgroundItems) {
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (subItem.path === currentPath || (subItem.subItems && subItem.subItems.some(s => s.path === currentPath))) {
            return item.path;
          }
        }
      }
    }
    
    // Check resource items
    for (const item of resourceItems) {
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (subItem.path === currentPath || (subItem.subItems && subItem.subItems.some(s => s.path === currentPath))) {
            return item.path;
          }
        }
      }
    }
    
    return null;
  };

  // Get nested parent path (find which nested item contains the current path)
  const getNestedParentPath = (currentPath: string): string | null => {
    // Check main nav items
    for (const item of mainNavItems) {
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (subItem.subItems && subItem.subItems.some(s => s.path === currentPath)) {
            return subItem.path;
          }
        }
      }
    }
    
    // Check playground items
    for (const item of playgroundItems) {
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (subItem.subItems && subItem.subItems.some(s => s.path === currentPath)) {
            return subItem.path;
          }
        }
      }
    }
    
    // Check resource items
    for (const item of resourceItems) {
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (subItem.subItems && subItem.subItems.some(s => s.path === currentPath)) {
            return subItem.path;
          }
        }
      }
    }
    
    return null;
  };

  // Handle toggle with accordion behavior for same-level items
  const handleToggle = (path: string) => {
    setExpandedItems(prev => {
      if (path === 'RESET_ALL') {
        return [];
      }
      const isCurrentlyExpanded = prev.includes(path);
      if (isCurrentlyExpanded) {
        // Close this item
        return prev.filter(p => p !== path);
      } else {
        // Find siblings (items at the same level with same parent)
        let siblings: string[] = [];
        // Check if it's a top-level Services item
        if (path === '#') {
          // Top level, keep as is
          return [...prev, path];
        }
        // Check if it's a nested item under Services
        const serviceItem = mainNavItems.find(item => item.path === '#');
        if (serviceItem?.subItems) {
          const isNestedUnderServices = serviceItem.subItems.some(sub => sub.path === path);
          if (isNestedUnderServices) {
            // Close other nested items under Services
            siblings = serviceItem.subItems.map(sub => sub.path);
            const filtered = prev.filter(p => !siblings.includes(p) || p === path);
            return [...filtered, path];
          }
        }
        // Default: just add it
        return [...prev, path];
      }
    });
  };

  // Auto-expand active menu on page load/navigation
  useEffect(() => {
    const parentPath = getParentPath(location.pathname);
    const nestedParentPath = getNestedParentPath(location.pathname);

    const toExpand: string[] = [];
    if (parentPath) toExpand.push(parentPath);
    if (nestedParentPath) toExpand.push(nestedParentPath);

    if (toExpand.length > 0) {
      // Only update if the current expanded items are different
      setExpandedItems(prev => {
        const prevSorted = [...prev].sort();
        const toExpandSorted = [...toExpand].sort();
        
        // If arrays are the same, don't update to prevent re-render
        if (JSON.stringify(prevSorted) === JSON.stringify(toExpandSorted)) {
          return prev;
        }
        
        return toExpand;
      });
    }
    // Don't close all menus if no parent found - user might have manually opened something
  }, [location.pathname]);

  // Close mobile sidebar on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const mobileSidebarVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0 },
  };

  return (
    <>
      {/* Mobile Menu Button - Fixed top-left */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden fixed top-6 z-[60] p-3 rounded-xl glass backdrop-blur-xl border border-white/20 hover:bg-white/10 transition-all duration-300 shadow-lg ${isOpen ? 'left-[264px]' : 'left-6'
          }`}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[45]"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - Always Open */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[280px] glass backdrop-blur-2xl border-r border-white/10 z-50 flex-col shadow-2xl">
        {/* Decorative top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-60" />

        {/* Logo Section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              {/* Animated ring */}
              <div className="absolute -inset-1 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Logo container */}
              <div className="relative w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shadow-lg overflow-hidden border border-white/10">
                <img
                  src={logoImage}
                  alt="Neverland Studio Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <Logo size="sm" clickable={false} />
              <span className="text-xs text-gray-400 font-mono">Security Solutions</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-4 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Main Navigation Section */}
          <div className="space-y-1">
            <div className="mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">Navigation</span>
            </div>
            {mainNavItems.map((item, index) => {
              const isActive = checkActive(item);
              return (
                <MenuItem key={item.path} item={item} index={index} isActive={isActive} expandedItems={expandedItems} onToggle={handleToggle} />
              );
            })}
          </div>

          {/* Divider */}
          <div className="mx-4 my-2 h-px bg-white/10" />

          {/* Playground Section */}
          <div className="space-y-1">
            <div className="mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">Playground</span>
            </div>
            {playgroundItems.map((item, index) => {
              const isActive = checkActive(item);
              return (
                <MenuItem key={item.path} item={item} index={index + mainNavItems.length} isActive={isActive} expandedItems={expandedItems} onToggle={handleToggle} />
              );
            })}
          </div>

          {/* Divider */}
          <div className="mx-4 my-2 h-px bg-white/10" />

          {/* Resources Section */}
          <div className="space-y-1">
            <div className="mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">Resources</span>
            </div>
            {resourceItems
              .filter(item => {
                // Only show Settings if user is logged in
                if (item.path === Routes.SETTINGS) {
                  return isAuthenticated;
                }
                return true;
              })
              .map((item, index) => {
                const isActive = checkActive(item);
                return (
                  <MenuItem key={item.path} item={item} index={index + mainNavItems.length} isActive={isActive} expandedItems={expandedItems} onToggle={handleToggle} />
                );
              })}
          </div>
        </nav>

        {/* Divider */}
        <div className="px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Footer - Login/Logout Button */}
        <div className="p-4">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="w-full group relative overflow-hidden px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border border-red-500/30 transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40">
              <div className="relative z-10 flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">Logout</span>
              </div>
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
              </div>
            </button>
          ) : (
            <button onClick={() => setIsAuthOpen(true)} className="w-full group relative overflow-hidden px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border border-primary/30 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40">
              <div className="relative z-10 flex items-center justify-center gap-2">
                <Users className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">Login</span>
              </div>
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
              </div>
            </button>
          )}
        </div>

        {/* Bottom gradient bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-20" />
      </aside >

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {
          isOpen && (
            <motion.aside
              className="lg:hidden fixed left-0 top-0 h-screen w-80 glass backdrop-blur-2xl border-r border-white/10 z-50 flex flex-col shadow-2xl overflow-y-auto"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileSidebarVariants}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {/* Decorative top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-60" />

              {/* Logo Section */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shadow-lg overflow-hidden border border-white/10">
                      <img
                        src={logoImage}
                        alt="Neverland Studio Logo"
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <Logo size="sm" clickable={false} />
                    <span className="text-xs text-gray-400 font-mono">Security Solutions</span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 py-4 px-4 space-y-4 overflow-y-auto custom-scrollbar min-h-0">
                {/* Main Navigation Section */}
                <div className="space-y-1">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">Navigation</span>
                  </div>
                  {mainNavItems.map((item, index) => {
                    const isActive = checkActive(item);
                    return (
                      <MenuItem key={item.path} item={item} index={index} isActive={isActive} isMobile={true} expandedItems={expandedItems} onToggle={handleToggle} />
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="mx-4 my-2 h-px bg-white/10" />

                {/* Playground Section */}
                <div className="space-y-1">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">Playground</span>
                  </div>
                  {playgroundItems.map((item, index) => {
                    const isActive = checkActive(item);
                    return (
                      <MenuItem key={item.path} item={item} index={index} isActive={isActive} isMobile={true} expandedItems={expandedItems} onToggle={handleToggle} />
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="mx-4 my-2 h-px bg-white/10" />

                {/* Resources Section */}
                <div className="space-y-1">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">Resources</span>
                  </div>
                  {resourceItems
                    .filter(item => {
                      // Only show Settings if user is logged in
                      if (item.path === Routes.SETTINGS) {
                        return isAuthenticated;
                      }
                      return true;
                    })
                    .map((item, index) => {
                      const isActive = checkActive(item);
                      return (
                        <MenuItem key={item.path} item={item} index={index} isActive={isActive} isMobile={true} expandedItems={expandedItems} onToggle={handleToggle} />
                      );
                    })}
                </div>
              </nav>

              {/* Divider */}
              <div className="px-4 flex-shrink-0">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              {/* Footer - Login/Logout Button */}
              <div className="p-4 flex-shrink-0 bg-[#0A0A0A]/50 backdrop-blur-sm">
                {isAuthenticated ? (
                  <button onClick={handleLogout} className="w-full group relative overflow-hidden px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border border-red-500/30 transition-all duration-300 shadow-lg shadow-red-500/20">
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      <LogOut className="w-4 h-4 text-white" />
                      <span className="text-sm font-semibold text-white">Logout</span>
                    </div>
                    {/* Shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
                    </div>
                  </button>
                ) : (
                  <button onClick={() => { setIsAuthOpen(true); setIsOpen(false); }} className="w-full group relative overflow-hidden px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border border-primary/30 transition-all duration-300 shadow-lg shadow-primary/20">
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      <Users className="w-4 h-4 text-white" />
                      <span className="text-sm font-semibold text-white">Login</span>
                    </div>
                    {/* Shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
                    </div>
                  </button>
                )}
              </div>

              {/* Bottom gradient bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-20" />
            </motion.aside >
          )
        }
      </AnimatePresence >

      {/* Auth Modal */}
      < AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)
      } />
    </>
  );
}
