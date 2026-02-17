import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Routes } from '@config/constants';
import logoImage from '@/assets/logo.png';

// Hardcoded admin credentials - fully isolated from backend
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  email: 'admin@neverland.studio',
  name: 'Admin Neverland',
};

export default function DashboardLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    if (
      (username === ADMIN_CREDENTIALS.username || username === ADMIN_CREDENTIALS.email) &&
      password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem('dashboardLoggedIn', 'true');
      localStorage.setItem('dashboardUserEmail', ADMIN_CREDENTIALS.email);
      localStorage.setItem('dashboardUserName', ADMIN_CREDENTIALS.name);

      if (remember) {
        localStorage.setItem('dashboardRemember', 'true');
      }

      window.dispatchEvent(new Event('dashboardLoginChanged'));
      navigate(Routes.DASHBOARD);
    } else {
      setError('Invalid credentials. Use username "admin" and password "admin123"');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background - using primary/secondary theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[200px]" />
      </div>

      {/* Cyber Grid Pattern - matching main site */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(Routes.HOME)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </motion.button>

        {/* Login Card - glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative rounded-2xl glass backdrop-blur-2xl overflow-hidden shadow-2xl"
        >
          {/* Top gradient accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-80" />

          <div className="p-8">
            {/* Header with logo */}
            <div className="text-center mb-8">
              <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-4 relative group">
                <img src={logoImage} alt="Neverland" className="w-10 h-10 object-contain" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-white mb-2">Dashboard Login</h1>
              <p className="text-gray-400 text-sm">Sign in to access the admin dashboard</p>
            </div>

            {/* Credentials Hint */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20 text-primary/80 text-xs mb-6">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Username: <strong className="text-primary">admin</strong> | Password: <strong className="text-primary">admin123</strong></span>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Enter username or email"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] focus:shadow-lg focus:shadow-primary/5 transition-all duration-300 text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] focus:shadow-lg focus:shadow-primary/5 transition-all duration-300 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-4 h-4 rounded border border-white/10 bg-white/5 peer-checked:bg-primary peer-checked:border-primary transition-all duration-200 flex items-center justify-center">
                      {remember && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                    Remember me
                  </span>
                </label>
              </div>

              {/* Submit Button - gradient from primary to secondary */}
              <button
                type="submit"
                disabled={loading}
                className="w-full group relative overflow-hidden py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-primary/30"
              >
                <div className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      Sign In to Dashboard
                    </>
                  )}
                </div>
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
                </div>
              </button>
            </form>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-1.5 mt-6 text-[10px] text-gray-500">
              <ShieldCheck className="w-3 h-3" />
              <span>Isolated admin authentication</span>
            </div>
          </div>

          {/* Bottom gradient bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-30" />
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          This is an isolated admin panel.{' '}
          <button
            onClick={() => navigate(Routes.HOME)}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Return to site
          </button>
        </motion.p>
      </div>
    </div>
  );
}
