import { lazy } from 'react';
import { Routes as AppRoutes } from './constants';

// Lazy load components for code splitting
const lazyLoad = (importFn: () => Promise<any>) => lazy(importFn);

// Main pages
export const Home = lazyLoad(() => import('@pages/Home'));
export const CyberNews = lazyLoad(() => import('@pages/CyberNews/CyberNews'));
export const About = lazyLoad(() => import('@pages/About'));
export const Projects = lazyLoad(() => import('@pages/Projects'));
export const Team = lazyLoad(() => import('@pages/Team/Team'));
export const Resources = lazyLoad(() => import('@pages/Resources/Resources'));
export const Blog = lazyLoad(() => import('@pages/Blog'));
export const Testimonials = lazyLoad(() => import('@pages/Testimonials/Testimonials'));
export const Playground = lazyLoad(() => import('@pages/Playground'));
export const PlaygroundSQL = lazyLoad(() => import('@pages/PlaygroundSQL'));
export const PlaygroundWeb = lazyLoad(() => import('@pages/PlaygroundWeb'));
export const PlaygroundSystem = lazyLoad(() => import('@pages/PlaygroundSystem'));
export const PlaygroundCrypto = lazyLoad(() => import('@/pages/PlaygroundCrypto'));
export const PlaygroundVM = lazyLoad(() => import('@pages/PlaygroundVM'));
export const Contact = lazyLoad(() => import('@pages/Contact'));
export const Help = lazyLoad(() => import('@pages/Help'));
export const Settings = lazyLoad(() => import('@pages/Settings'));
export const NotFound = lazyLoad(() => import('@pages/NotFound'));

// Service pages - Cyber Security
export const CyberSecurity = lazyLoad(() => import('@pages/CyberSecurity'));
export const PenetrationTesting = lazyLoad(() => import('@pages/PenetrationTesting'));
export const SecurityAudit = lazyLoad(() => import('@pages/SecurityAudit'));
export const NetworkSecurity = lazyLoad(() => import('@pages/NetworkSecurity'));
export const CloudSecurity = lazyLoad(() => import('@pages/CloudSecurity'));
export const CTF = lazyLoad(() => import('@pages/CTF'));

// Service pages - Web Development
export const WebDevelopment = lazyLoad(() => import('@pages/WebDevelopment'));
export const CustomWebApps = lazyLoad(() => import('@pages/CustomWebApps'));
export const ECommerce = lazyLoad(() => import('@pages/ECommerce'));
export const PWA = lazyLoad(() => import('@pages/PWA'));
export const APIDevelopment = lazyLoad(() => import('@pages/APIDevelopment'));
export const UIUXDesign = lazyLoad(() => import('@pages/UIUXDesign'));

// Service pages - Cloud Solutions
export const CloudSolutions = lazyLoad(() => import('@pages/CloudSolutions'));
export const CloudMigration = lazyLoad(() => import('@pages/CloudMigration'));
export const InfrastructureAsCode = lazyLoad(() => import('@pages/InfrastructureAsCode'));
export const CloudSecuritySolutions = lazyLoad(() => import('@pages/CloudSecuritySolutions'));
export const CostOptimization = lazyLoad(() => import('@pages/CostOptimization'));
export const ManagedServices = lazyLoad(() => import('@pages/ManagedServices'));

// Service pages - Consulting
export const Consulting = lazyLoad(() => import('@pages/Consulting'));
export const ITStrategyPlanning = lazyLoad(() => import('@pages/ITStrategyPlanning'));
export const TechnologyAssessment = lazyLoad(() => import('@pages/TechnologyAssessment'));
export const DigitalTransformation = lazyLoad(() => import('@pages/DigitalTransformation'));
export const ITGovernance = lazyLoad(() => import('@pages/ITGovernance'));
export const VendorManagement = lazyLoad(() => import('@pages/VendorManagement'));

// Service pages - IT Infrastructure
export const ITInfrastructure = lazyLoad(() => import('@pages/ITInfrastructure'));
export const ServerManagement = lazyLoad(() => import('@pages/ServerManagement'));
export const NetworkInfrastructure = lazyLoad(() => import('@pages/NetworkInfrastructure'));
export const StorageSolutions = lazyLoad(() => import('@pages/StorageSolutions'));
export const Virtualization = lazyLoad(() => import('@pages/Virtualization'));
export const MonitoringMaintenance = lazyLoad(() => import('@pages/MonitoringMaintenance'));

// Dashboard pages
export const Dashboard = lazyLoad(() => import('@pages/Dashboard'));
export const DashboardProjects = lazyLoad(() => import('@pages/DashboardProjects'));
export const DashboardAnalytics = lazyLoad(() => import('@pages/DashboardAnalytics'));
export const DashboardMessages = lazyLoad(() => import('@pages/DashboardMessages'));
export const DashboardClients = lazyLoad(() => import('@pages/DashboardClients'));
export const DashboardReports = lazyLoad(() => import('@pages/DashboardReports'));
export const DashboardSettings = lazyLoad(() => import('@pages/DashboardSettings'));
export const DashboardTeam = lazyLoad(() => import('@pages/DashboardTeam'));
export const DashboardServices = lazyLoad(() => import('@pages/DashboardServices'));
export const DashboardTasks = lazyLoad(() => import('@pages/DashboardTasks'));
export const DashboardInvoices = lazyLoad(() => import('@pages/DashboardInvoices'));
export const DashboardCalendar = lazyLoad(() => import('@pages/DashboardCalendar'));
export const DashboardResources = lazyLoad(() => import('@pages/DashboardResources'));

// Route configuration interface
interface RouteConfig {
  path: string;
  element: React.ComponentType;
}

// Main application routes
export const mainRoutes: RouteConfig[] = [
  { path: '/', element: Home },
  { path: AppRoutes.CYBER_NEWS, element: CyberNews },
  { path: AppRoutes.ABOUT, element: About },
  { path: AppRoutes.TEAM, element: Team },
  { path: AppRoutes.RESOURCES, element: Resources },
  { path: AppRoutes.PROJECTS, element: Projects },
  { path: AppRoutes.BLOG, element: Blog },
  { path: AppRoutes.TESTIMONIALS, element: Testimonials },
  { path: AppRoutes.PLAYGROUND, element: Playground },
  { path: AppRoutes.PLAYGROUND_SQL, element: PlaygroundSQL },
  { path: AppRoutes.PLAYGROUND_WEB, element: PlaygroundWeb },
  { path: AppRoutes.PLAYGROUND_SYSTEM, element: PlaygroundSystem },
  { path: AppRoutes.PLAYGROUND_CRYPTO, element: PlaygroundCrypto },
  { path: AppRoutes.PLAYGROUND_VM, element: PlaygroundVM },
  { path: AppRoutes.CONTACT, element: Contact },
  { path: AppRoutes.HELP, element: Help },
  { path: AppRoutes.SETTINGS, element: Settings },
];

// Service routes configuration
export const serviceRoutes: RouteConfig[] = [
  // Cyber Security
  { path: AppRoutes.CYBER_SECURITY, element: CyberSecurity },
  { path: '/services/penetration-testing', element: PenetrationTesting },
  { path: '/services/security-audit', element: SecurityAudit },
  { path: '/services/network-security', element: NetworkSecurity },
  { path: '/services/cloud-security', element: CloudSecurity },
  { path: AppRoutes.CTF, element: CTF },

  // Web Development
  { path: AppRoutes.WEB_DEVELOPMENT, element: WebDevelopment },
  { path: AppRoutes.CUSTOM_WEB_APPS, element: CustomWebApps },
  { path: AppRoutes.ECOMMERCE, element: ECommerce },
  { path: AppRoutes.PWA, element: PWA },
  { path: AppRoutes.API_DEVELOPMENT, element: APIDevelopment },
  { path: AppRoutes.UI_UX_DESIGN, element: UIUXDesign },

  // Cloud Solutions
  { path: AppRoutes.CLOUD_SOLUTIONS, element: CloudSolutions },
  { path: AppRoutes.CLOUD_MIGRATION, element: CloudMigration },
  { path: AppRoutes.INFRASTRUCTURE_AS_CODE, element: InfrastructureAsCode },
  { path: AppRoutes.CLOUD_SECURITY_SOLUTIONS, element: CloudSecuritySolutions },
  { path: AppRoutes.COST_OPTIMIZATION, element: CostOptimization },
  { path: AppRoutes.MANAGED_SERVICES, element: ManagedServices },

  // Consulting
  { path: AppRoutes.CONSULTING, element: Consulting },
  { path: '/services/it-strategy-planning', element: ITStrategyPlanning },
  { path: '/services/technology-assessment', element: TechnologyAssessment },
  { path: '/services/digital-transformation', element: DigitalTransformation },
  { path: '/services/it-governance', element: ITGovernance },
  { path: '/services/vendor-management', element: VendorManagement },

  // IT Infrastructure
  { path: '/services/it-infrastructure', element: ITInfrastructure },
  { path: '/services/server-management', element: ServerManagement },
  { path: '/services/network-infrastructure', element: NetworkInfrastructure },
  { path: '/services/storage-solutions', element: StorageSolutions },
  { path: '/services/virtualization', element: Virtualization },
  { path: '/services/monitoring-maintenance', element: MonitoringMaintenance },
];

// Dashboard routes configuration
export const dashboardRoutes: RouteConfig[] = [
  { path: '/dashboard', element: Dashboard },
  { path: '/dashboard/projects', element: DashboardProjects },
  { path: '/dashboard/analytics', element: DashboardAnalytics },
  { path: '/dashboard/messages', element: DashboardMessages },
  { path: '/dashboard/clients', element: DashboardClients },
  { path: '/dashboard/reports', element: DashboardReports },
  { path: '/dashboard/settings', element: DashboardSettings },
  { path: '/dashboard/team', element: DashboardTeam },
  { path: '/dashboard/services', element: DashboardServices },
  { path: '/dashboard/tasks', element: DashboardTasks },
  { path: '/dashboard/invoices', element: DashboardInvoices },
  { path: '/dashboard/calendar', element: DashboardCalendar },
  { path: '/dashboard/resources', element: DashboardResources },
];
