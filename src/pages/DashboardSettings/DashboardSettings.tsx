import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Settings as SettingsIcon,
  Building,
  Phone
} from 'lucide-react';

export default function DashboardSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const name = localStorage.getItem('dashboardUserName') || 'Admin Neverland';
    const email = localStorage.getItem('dashboardUserEmail') || 'admin@neverland.studio';
    const savedProfile = localStorage.getItem('dashboardProfile');

    let company = '';
    let phone = '';

    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        company = parsed.company || '';
        phone = parsed.phone || '';
      } catch { }
    }

    setProfileForm({ name, email, company, phone });
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    await new Promise(resolve => setTimeout(resolve, 800));

    localStorage.setItem('dashboardUserName', profileForm.name);
    localStorage.setItem('dashboardProfile', JSON.stringify({
      company: profileForm.company,
      phone: profileForm.phone,
    }));

    window.dispatchEvent(new Event('dashboardLoginChanged'));

    setSuccess('Profile updated successfully!');
    setIsSaving(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    if (passwordForm.password !== passwordForm.password_confirmation) {
      setError('Passwords do not match');
      setIsSaving(false);
      return;
    }

    if (passwordForm.password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsSaving(false);
      return;
    }

    if (passwordForm.current_password !== 'admin123') {
      setError('Current password is incorrect');
      setIsSaving(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    setSuccess('Password updated successfully!');
    setPasswordForm({
      current_password: '',
      password: '',
      password_confirmation: '',
    });
    setIsSaving(false);
  };

  // Shared input class
  const inputClass = "w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] focus:shadow-lg focus:shadow-primary/5 transition-all duration-300 text-sm";
  const inputClassPassword = "w-full pl-11 pr-12 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] focus:shadow-lg focus:shadow-primary/5 transition-all duration-300 text-sm";

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
          <SettingsIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading font-bold text-white">Settings</h1>
          <p className="text-sm text-gray-400">Manage your dashboard account settings</p>
        </div>
      </div>

      {/* Messages */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl glass border border-emerald-500/20 text-emerald-400 flex items-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm">{success}</span>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl glass border border-red-500/20 text-red-400 flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      {/* Tabs - pill style matching Dashboard.tsx */}
      <div className="flex gap-1 p-1 rounded-lg glass border border-white/10 w-fit">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'profile'
              ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white shadow-lg shadow-primary/10 border border-primary/20'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'password'
              ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white shadow-lg shadow-primary/10 border border-primary/20'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
        >
          Password
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl glass border border-white/10 p-6"
        >
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={profileForm.email}
                  disabled
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.01] border border-white/5 text-gray-500 cursor-not-allowed text-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                <div className="relative group">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    name="company"
                    value={profileForm.company}
                    onChange={handleProfileChange}
                    placeholder="Enter company name"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                  <input
                    type="tel"
                    name="phone"
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                    placeholder="Enter phone number"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full group relative overflow-hidden py-3 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm hover:from-primary/90 hover:to-secondary/90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 border border-primary/30"
            >
              <div className="relative z-10 flex items-center gap-2">
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
              </div>
            </button>
          </form>
        </motion.div>
      )}

      {/* Password Tab */}
      {activeTab === 'password' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl glass border border-white/10 p-6"
        >
          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword.current ? 'text' : 'password'}
                  name="current_password"
                  value={passwordForm.current_password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter current password"
                  className={inputClassPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  name="password"
                  value={passwordForm.password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter new password (min 8 characters)"
                  className={inputClassPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  name="password_confirmation"
                  value={passwordForm.password_confirmation}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Confirm new password"
                  className={inputClassPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full group relative overflow-hidden py-3 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm hover:from-primary/90 hover:to-secondary/90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 border border-primary/30"
            >
              <div className="relative z-10 flex items-center gap-2">
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Update Password
                  </>
                )}
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
              </div>
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
