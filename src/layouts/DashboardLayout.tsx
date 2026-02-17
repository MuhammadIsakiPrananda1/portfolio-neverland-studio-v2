import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Bell,
  Search,
  ChevronDown,
  Home,
  BarChart3,
  FileText,
  Users,
  Clock,
  Briefcase,
  CheckSquare,
  CreditCard,
  Calendar,
  FolderOpen,
} from 'lucide-react';
import { Routes } from '@config/constants';
import DashboardLogin from '@pages/DashboardLogin';
import logoImage from '@/assets/logo.png';
import Logo from '@components/atoms/Logo';

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, path: '/dashboard/projects' },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare, path: '/dashboard/tasks' },
  { id: 'team', label: 'Team', icon: Users, path: '/dashboard/team' },
  { id: 'services', label: 'Services', icon: Briefcase, path: '/dashboard/services' },
  { id: 'clients', label: 'Clients', icon: User, path: '/dashboard/clients' },
  { id: 'invoices', label: 'Invoices', icon: CreditCard, path: '/dashboard/invoices' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, path: '/dashboard/calendar' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/dashboard/messages' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
  { id: 'reports', label: 'Reports', icon: FileText, path: '/dashboard/reports' },
  { id: 'resources', label: 'Resources', icon: FolderOpen, path: '/dashboard/resources' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem('dashboardLoggedIn') === 'true';
    const email = localStorage.getItem('dashboardUserEmail');
    const name = localStorage.getItem('dashboardUserName');
    const photo = localStorage.getItem('settings_profile_photo');

    setIsLoggedIn(loggedIn);
    if (email) setUserEmail(email);
    if (name) setUserName(name);
    setUserPhoto(photo);

    const handleLoginChange = () => {
      const isLoggedIn = localStorage.getItem('dashboardLoggedIn') === 'true';
      const email = localStorage.getItem('dashboardUserEmail');
      const name = localStorage.getItem('dashboardUserName');
      const photo = localStorage.getItem('settings_profile_photo');
      setIsLoggedIn(isLoggedIn);
      if (email) setUserEmail(email);
      if (name) setUserName(name);
      setUserPhoto(photo);
    };

    window.addEventListener('dashboardLoginChanged', handleLoginChange);
    return () => window.removeEventListener('dashboardLoginChanged', handleLoginChange);
  }, []);

  // Close mobile sidebar on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (!isLoggedIn) {
    return <DashboardLogin />;
  }

  const handleLogout = () => {
    localStorage.removeItem('dashboardLoggedIn');
    localStorage.removeItem('dashboardUserEmail');
    localStorage.removeItem('dashboardUserName');
    localStorage.removeItem('dashboardProfile');
    localStorage.removeItem('dashboardRemember');
    window.dispatchEvent(new Event('dashboardLoginChanged'));
    navigate(Routes.HOME);
  };

  const isActiveRoute = (path: string) => location.pathname === path;

  // Sidebar content (shared between desktop & mobile)
  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {/* Decorative top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-60" />

      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 group">
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
            <span className="text-xs text-gray-400 font-mono">Dashboard</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-4 space-y-6 overflow-y-auto custom-scrollbar">
        <div className="space-y-1">
          <div className="mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">Navigation</span>
          </div>
          {menuItems.map((item) => {
            const active = isActiveRoute(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
              >
                <div
                  className={`
                    relative flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg
                    transition-all duration-300 group cursor-pointer overflow-hidden
                    ${active
                      ? 'bg-gradient-to-r from-primary/20 via-secondary/15 to-primary/20 text-white shadow-lg shadow-primary/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 hover:shadow-md'
                    }
                  `}
                >
                  {/* Animated background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${active ? 'opacity-100' : ''}`} />

                  {/* Active indicator - left bar */}
                  {active && (
                    <motion.div
                      layoutId="dashActiveIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-gradient-to-b from-primary via-secondary to-primary rounded-r-full shadow-lg shadow-primary/50"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className={`relative z-10 flex-shrink-0 ${active ? 'text-primary' : ''} transition-colors duration-300`}>
                      <Icon className="w-4 h-4" />
                      {active && <div className="absolute inset-0 blur-md bg-primary/50 -z-10" />}
                    </div>
                    <span className="relative z-10 font-medium text-xs tracking-wide truncate">{item.label}</span>
                  </div>

                  <div className="relative z-10 flex-shrink-0">
                    {active ? (
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
            );
          })}
        </div>
      </nav>

      {/* Divider */}
      <div className="px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Footer buttons */}
      <div className="p-4 space-y-2">
        <Link
          to={Routes.HOME}
          onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <Home className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs font-medium tracking-wide">Back to Site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full group relative overflow-hidden px-4 py-3 rounded-xl bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-600 hover:to-red-700 border border-red-500/30 transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            <LogOut className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Logout</span>
          </div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
          </div>
        </button>
      </div>

      {/* Bottom gradient bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-20" />
    </>
  );

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen glass backdrop-blur-2xl border-r border-white/10 z-30 hidden lg:flex flex-col shadow-2xl transition-all duration-300 ${isSidebarOpen ? 'w-[280px]' : 'w-20'
          }`}
      >
        {isSidebarOpen ? (
          <SidebarContent />
        ) : (
          <>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-60" />
            <div className="p-4 border-b border-white/10 flex justify-center">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden">
                <img src={logoImage} alt="Logo" className="w-8 h-8 object-contain" />
              </div>
            </div>
            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const active = isActiveRoute(item.path);
                const Icon = item.icon;
                return (
                  <Link key={item.id} to={item.path} title={item.label}>
                    <div
                      className={`relative flex items-center justify-center p-2.5 rounded-lg transition-all duration-300 group ${active
                        ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      {active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gradient-to-b from-primary to-secondary rounded-r-full" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
            <div className="p-2 space-y-1 border-t border-white/10">
              <Link to={Routes.HOME} title="Back to Site">
                <div className="flex items-center justify-center p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                  <Home className="w-5 h-5" />
                </div>
              </Link>
              <button onClick={handleLogout} title="Logout" className="w-full flex items-center justify-center p-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-20" />
          </>
        )}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden fixed left-0 top-0 h-screen w-80 glass backdrop-blur-2xl border-r border-white/10 z-50 flex flex-col shadow-2xl overflow-y-auto"
            >
              <SidebarContent isMobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`lg:hidden fixed top-6 z-[60] p-3 rounded-xl glass backdrop-blur-xl border border-white/20 hover:bg-white/10 transition-all duration-300 shadow-lg ${isMobileMenuOpen ? 'left-[264px]' : 'left-6'
          }`}
        aria-label="Toggle sidebar"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-20'}`}>
        {/* Decorative Background - Same as Home Page */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] bg-purple-500/5 rounded-full blur-[100px] sm:blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 md:w-[350px] md:h-[350px] bg-blue-500/5 rounded-full blur-[80px] sm:blur-[100px]" />
        </div>

        {/* Top Bar */}
        <header className="sticky top-0 h-16 glass backdrop-blur-2xl border-b border-white/10 z-20">
          <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
            {/* Sidebar collapse button (desktop) */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Menu className="w-4 h-4 text-gray-400" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] focus:shadow-lg focus:shadow-primary/5 transition-all duration-300"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Last updated */}
              <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{lastUpdated.toLocaleTimeString()}</span>
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors group">
                <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg shadow-primary/50" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden border border-white/20">
                    {userPhoto ? (
                      <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-sm text-white hidden md:block font-medium">{userName || userEmail.split('@')[0]}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-56 glass backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                    >
                      <div className="p-3 border-b border-white/10">
                        <p className="text-sm font-medium text-white">{userName || 'Admin'}</p>
                        <p className="text-xs text-gray-400 mt-0.5 font-mono">{userEmail}</p>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/dashboard/settings"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
