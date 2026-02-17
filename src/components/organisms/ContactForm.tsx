import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Building2, Phone, MessageSquare, CheckCircle2, Send, Loader2 } from 'lucide-react';
import contactService, { ContactFormData } from '@services/contact.service';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message_type: 'general',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const messageTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'security', label: 'Security Services' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
   const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await contactService.submitContact(formData);
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message_type: 'general',
          message: '',
        });
        setIsSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center"
      >
        <div className="inline-flex p-4 rounded-full bg-emerald-500/10 mb-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-gray-400">Thank you for contacting us. We'll get back to you soon.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/30 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/30 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Company & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/30 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/30 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Message Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Inquiry Type</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <select
              name="message_type"
              value={formData.message_type}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-white focus:outline-none focus:border-blue-500/30 transition-all appearance-none cursor-pointer"
            >
              {messageTypes.map((type) => (
                <option key={type.value} value={type.value} className="bg-dark-900 text-white">
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Tell us about your project or inquiry..."
            className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/30 transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Send Message
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}
