import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '@components/atoms/Logo';
import { Routes, COMPANY_INFO, SOCIAL_LINKS, CERTIFICATIONS } from '@config/constants';

const footerLinks = {
  company: [
    { label: 'About Us', path: Routes.ABOUT },
    { label: 'Projects', path: Routes.PROJECTS },
    { label: 'Blog', path: Routes.BLOG },
  ],
  services: [
    { label: 'Penetration Testing', path: '/services/penetration-testing' },
    { label: 'Security Audit', path: '/services/security-audit' },
    { label: 'Network Security', path: '/services/network-security' },
    { label: 'Cloud Monitoring', path: '/services/cloud-security' },
  ],
  support: [
    { label: 'Contact Us', path: Routes.CONTACT },
    { label: 'Help Center', path: Routes.CONTACT },
    { label: 'Privacy Policy', path: '/' },
    { label: 'Terms of Service', path: '/' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-dark-900/50 border-t border-white/5">
      {/* Main Footer Content */}
      <div className="container-custom py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Company Info - Takes more space */}
          <div className="lg:col-span-4">
            <Logo size="lg" clickable={false} />
            <p className="mt-6 text-gray-400 leading-relaxed text-sm">
              {COMPANY_INFO.description}
            </p>
            
            {/* Contact Info */}
            <div className="mt-8 space-y-4">
              <a 
                href={`mailto:${COMPANY_INFO.email}`} 
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-200 group"
              >
                <div className="p-2 rounded-lg bg-dark-800 group-hover:bg-purple-500/10 transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">{COMPANY_INFO.email}</span>
              </a>
              
              <a 
                href={`tel:${COMPANY_INFO.phone}`} 
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-200 group"
              >
                <div className="p-2 rounded-lg bg-dark-800 group-hover:bg-purple-500/10 transition-colors duration-200">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">{COMPANY_INFO.phone}</span>
              </a>
              
              <div className="flex items-start gap-3 text-gray-400">
                <div className="p-2 rounded-lg bg-dark-800">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm pt-2">{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm inline-flex items-center group"
                  >
                    <span className="w-0 h-px bg-purple-400 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm inline-flex items-center group"
                  >
                    <span className="w-0 h-px bg-blue-400 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm inline-flex items-center group"
                  >
                    <span className="w-0 h-px bg-purple-400 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-16 pt-12 border-t border-white/5">
          <div className="text-center mb-8">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">
              Certifications & Compliance
            </h4>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mx-auto" />
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div 
                key={cert} 
                className="px-5 py-2.5 rounded-lg border border-white/10 bg-dark-800/50 hover:border-purple-500/30 transition-colors duration-200"
              >
                <span className="text-xs text-gray-300 font-semibold tracking-wide">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-dark-950/50">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="text-gray-500 text-sm order-2 md:order-1">
              © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 order-1 md:order-2">
              <span className="text-xs text-gray-500 mr-2">Follow Us:</span>
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit our LinkedIn page" 
                className="p-2.5 rounded-lg bg-dark-800 hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30 transition-all duration-200 group"
              >
                <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors duration-200" />
              </a>
              <a 
                href={SOCIAL_LINKS.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit our Twitter page" 
                className="p-2.5 rounded-lg bg-dark-800 hover:bg-blue-500/10 border border-white/5 hover:border-blue-500/30 transition-all duration-200 group"
              >
                <Twitter className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
              </a>
              <a 
                href={SOCIAL_LINKS.github} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit our GitHub page" 
                className="p-2.5 rounded-lg bg-dark-800 hover:bg-gray-500/10 border border-white/5 hover:border-gray-500/30 transition-all duration-200 group"
              >
                <Github className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors duration-200" />
              </a>
              <a 
                href={SOCIAL_LINKS.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page" 
                className="p-2.5 rounded-lg bg-dark-800 hover:bg-blue-600/10 border border-white/5 hover:border-blue-600/30 transition-all duration-200 group"
              >
                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
