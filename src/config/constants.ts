// Application constants and configuration

export const COMPANY_INFO = {
  name: 'Neverland Studio',
  tagline: 'Securing the Digital Future',
  secondaryTagline: 'Engineering Secure IT Systems',
  description: 'Empowering businesses with cutting-edge cyber security solutions and robust IT infrastructure to safeguard your digital assets and drive innovation.',
  email: 'Arlianto032@gmail.com',
  phone: '+6281252254886',
  address: 'Jl. Ki Ageng Gribig No.28, Madyopuro, Kec. Kedungkandang, Kota Malang, Jawa Timur 65139',
  founded: '2020',
} as const;

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/neverland-studio',
  twitter: 'https://twitter.com/neverlandstudio',
  github: 'https://github.com/neverland-studio',
  facebook: 'https://facebook.com/neverlandstudio',
} as const;

// Navigation routes
export enum Routes {
  HOME = '/',
  CYBER_SECURITY = '/services/cyber-security',
  WEB_DEVELOPMENT = '/services/web-development',
  CUSTOM_WEB_APPS = '/services/custom-web-apps',
  ECOMMERCE = '/services/ecommerce',
  PWA = '/services/pwa',
  API_DEVELOPMENT = '/services/api-development',
  UI_UX_DESIGN = '/services/ui-ux-design',
  CLOUD_SOLUTIONS = '/services/cloud-solutions',
  CLOUD_MIGRATION = '/services/cloud-migration',
  INFRASTRUCTURE_AS_CODE = '/services/infrastructure-as-code',
  CLOUD_SECURITY_SOLUTIONS = '/services/cloud-security-solutions',
  COST_OPTIMIZATION = '/services/cost-optimization',
  MANAGED_SERVICES = '/services/managed-services',
  CONSULTING = '/services/consulting',
  CTF = '/services/ctf',
  ABOUT = '/about',
  PROJECTS = '/projects',
  BLOG = '/blog',
  PLAYGROUND = '/playground',
  PLAYGROUND_SQL = '/playground/sql-injection',
  PLAYGROUND_WEB = '/playground/web-security',
  PLAYGROUND_SYSTEM = '/playground/system-exploitation',
  PLAYGROUND_CRYPTO = '/playground/cryptography',
  PLAYGROUND_VM = '/playground/virtual-machine',
  CONTACT = '/contact',
  TEAM = '/team',
  RESOURCES = '/resources',
  TESTIMONIALS = '/testimonials',
  HELP = '/help',
  SETTINGS = '/settings',

  // Dashboard Routes
  DASHBOARD = '/dashboard',
  DASHBOARD_PROJECTS = '/dashboard/projects',
  DASHBOARD_ANALYTICS = '/dashboard/analytics',
  DASHBOARD_MESSAGES = '/dashboard/messages',
  DASHBOARD_CLIENTS = '/dashboard/clients',
  DASHBOARD_REPORTS = '/dashboard/reports',
  DASHBOARD_SETTINGS = '/dashboard/settings',
  DASHBOARD_TEAM = '/dashboard/team',
  DASHBOARD_SERVICES = '/dashboard/services',
  DASHBOARD_TASKS = '/dashboard/tasks',
  DASHBOARD_INVOICES = '/dashboard/invoices',
  DASHBOARD_CALENDAR = '/dashboard/calendar',
  DASHBOARD_RESOURCES = '/dashboard/resources',

  // Main Routes
  CYBER_NEWS = '/cyber-news',
}

// Service IDs
export enum ServiceId {
  PENETRATION_TESTING = 'penetration-testing',
  SECURITY_AUDIT = 'security-audit',
  NETWORK_SECURITY = 'network-security',
  CLOUD_SECURITY = 'cloud-security',
  IT_INFRASTRUCTURE = 'it-infrastructure',
}

// Message types for contact form
export enum MessageType {
  GENERAL = 'general',
  SECURITY_AUDIT = 'security-audit',
  PENETRATION_TESTING = 'penetration-testing',
  CONSULTING = 'consulting',
  SUPPORT = 'support',
}

// Company statistics
export const COMPANY_STATS: ReadonlyArray<{
  readonly label: string;
  readonly value: string;
  readonly suffix?: string;
  readonly prefix?: string;
}> = [
    { label: 'Projects', value: '500', suffix: '+' },
    { label: 'Clients', value: '150', suffix: '+' },
    { label: 'Experts', value: '50', suffix: '+' },
    { label: 'Countries', value: '25', suffix: '+' },
    { label: 'Years', value: '10', suffix: '+' },
    { label: 'Uptime', value: '99.9', suffix: '%' },
  ];

// Trust badges/certifications
export const CERTIFICATIONS = [
  'ISO 27001',
  'SOC 2 Type II',
  'PCI DSS',
  'CISSP',
  'CEH',
  'OSCP',
] as const;

// SEO Configuration
export const SEO = {
  defaultTitle: 'Neverland Studio - Cyber Security & IT Solutions',
  titleTemplate: '%s | Neverland Studio',
  description: 'Enterprise-grade cyber security and IT infrastructure solutions. Penetration testing, security audits, network security, cloud security, and IT consulting.',
  keywords: [
    'cyber security',
    'penetration testing',
    'security audit',
    'network security',
    'cloud security',
    'IT infrastructure',
    'enterprise security',
    'cybersecurity consulting',
  ],
} as const;
