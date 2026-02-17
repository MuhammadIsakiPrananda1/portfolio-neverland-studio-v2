import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, User, Clock, ArrowRight, BookOpen, X, 
  Tag, Share2, MessageCircle 
} from 'lucide-react';
import Button from '@components/atoms/Button';
import { Routes } from '@config/constants';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

// Blog post type
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  tags: string[];
  image: string;
}

// Blog posts data with full content
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Top 10 Cyber Security Threats in 2026',
    excerpt: 'Explore the most critical security threats facing organizations this year and how to protect against them.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
    content: `
# Top 10 Cyber Security Threats in 2026

The cyber security landscape continues to evolve at a rapid pace. As we navigate through 2026, organizations face increasingly sophisticated threats that require constant vigilance and adaptive defense strategies.

## 1. AI-Powered Attacks
Cybercriminals are leveraging artificial intelligence to create more sophisticated and targeted attacks. Machine learning algorithms help attackers identify vulnerabilities faster and craft convincing phishing campaigns.

## 2. Ransomware Evolution
Modern ransomware attacks have evolved beyond simple encryption. Attackers now employ triple extortion tactics, threatening to leak data, disrupt operations, and notify customers.

## 3. Supply Chain Vulnerabilities
Third-party software and service providers continue to be a major attack vector, with cascading effects across entire industry sectors.

## 4. Cloud Security Misconfigurations
As organizations migrate to cloud infrastructure, misconfigurations remain a leading cause of data breaches and security incidents.

## 5. IoT Device Exploitation
The proliferation of Internet of Things devices creates an expanded attack surface, with many devices lacking proper security controls.

## Protection Strategies
- Implement zero-trust architecture
- Regular security audits and penetration testing
- Employee security awareness training
- Multi-layered defense approach
- Incident response planning

Stay vigilant and proactive in your security approach to protect against these evolving threats.
    `,
    author: 'Sarah Johnson',
    date: '2026-02-01',
    category: 'Threat Intelligence',
    readTime: 8,
    tags: ['Security', 'Threats', 'Best Practices'],
  },
  {
    id: 2,
    title: 'Zero Trust Architecture: A Comprehensive Guide',
    excerpt: 'Learn how implementing zero trust security can dramatically improve your organization\'s security posture.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop',
    content: `
# Zero Trust Architecture: A Comprehensive Guide

Zero Trust is not just a buzzword—it's a fundamental shift in how we approach cybersecurity. The principle is simple: "Never trust, always verify."

## Understanding Zero Trust

Traditional security models operated on the assumption that everything inside an organization's network should be trusted. Zero Trust eliminates this assumption, treating every access request as if it originates from an untrusted network.

## Core Principles

1. **Verify Explicitly**: Always authenticate and authorize based on all available data points
2. **Least Privilege Access**: Limit user access with just-in-time and just-enough-access (JIT/JEA)
3. **Assume Breach**: Minimize blast radius and segment access

## Implementation Steps

### 1. Identify Your Protect Surface
Focus on critical data, applications, assets, and services (DAAS) that need protection.

### 2. Map the Transaction Flows
Understand how traffic moves across your network and where sensitive data flows.

### 3. Build a Zero Trust Architecture
Implement micro-segmentation and create secure zones around your protect surface.

### 4. Create Zero Trust Policy
Develop policies based on the Kipling Method: who, what, when, where, why, and how.

## Benefits
- Reduced attack surface
- Improved visibility and monitoring
- Better compliance posture
- Enhanced data protection

Zero Trust is a journey, not a destination. Start small and iterate based on your organization's unique needs.
    `,
    author: 'Michael Chen',
    date: '2026-01-28',
    category: 'Cloud Security',
    readTime: 12,
    tags: ['Zero Trust', 'Cloud', 'Architecture'],
  },
  {
    id: 3,
    title: 'The Importance of Regular Penetration Testing',
    excerpt: 'Discover why continuous security testing is crucial for maintaining robust defenses against cyber attacks.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
    content: `
# The Importance of Regular Penetration Testing

Penetration testing is your organization's best defense against the unknown. It simulates real-world attacks to identify vulnerabilities before malicious actors can exploit them.

## Why Regular Testing Matters

Cyber threats evolve constantly. A test conducted six months ago may miss newly discovered vulnerabilities or changes in your infrastructure.

## Types of Penetration Testing

### Black Box Testing
Simulates an external attacker with no prior knowledge of your systems.

### White Box Testing
Comprehensive testing with full knowledge of infrastructure and source code.

### Gray Box Testing
Balanced approach with limited knowledge, simulating an insider threat.

## Testing Frequency

- **Critical Systems**: Quarterly testing minimum
- **Standard Infrastructure**: Bi-annual testing
- **After Major Changes**: Always test after significant deployments

## What We Test

- Network infrastructure
- Web applications
- Mobile applications
- Cloud environments
- Physical security
- Social engineering vulnerabilities

## The Testing Process

1. **Planning & Reconnaissance**: Define scope and gather intelligence
2. **Scanning**: Identify potential entry points
3. **Gaining Access**: Exploit vulnerabilities
4. **Maintaining Access**: Test persistence mechanisms
5. **Analysis & Reporting**: Document findings and recommendations

Regular penetration testing isn't just about compliance—it's about protecting your business, customers, and reputation in an increasingly hostile digital landscape.
    `,
    author: 'Emma Davis',
    date: '2026-01-25',
    category: 'Penetration Testing',
    readTime: 6,
    tags: ['Pentest', 'Security Testing', 'Best Practices'],
  },
  {
    id: 4,
    title: 'Securing Cloud Infrastructure with DevSecOps',
    excerpt: 'Integrate security seamlessly into your CI/CD pipeline with modern DevSecOps practices.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    content: `
# Securing Cloud Infrastructure with DevSecOps

DevSecOps represents the evolution of DevOps, embedding security into every phase of the development lifecycle rather than treating it as an afterthought.

## The DevSecOps Philosophy

Security is everyone's responsibility. By shifting security left in the development process, we catch vulnerabilities early when they're cheaper and easier to fix.

## Key Practices

### 1. Security as Code
Treat security policies and configurations as code—version controlled, peer-reviewed, and automated.

### 2. Automated Security Testing
- Static Application Security Testing (SAST)
- Dynamic Application Security Testing (DAST)
- Software Composition Analysis (SCA)
- Container scanning

### 3. Infrastructure as Code Security
Scan infrastructure templates for misconfigurations before deployment.

### 4. Continuous Monitoring
Real-time security monitoring and threat detection in production environments.

## Implementation Roadmap

**Phase 1: Assessment**
- Evaluate current security posture
- Identify gaps in existing pipeline
- Define security requirements

**Phase 2: Integration**
- Implement security scanning tools
- Automate security testing
- Create security gates in CI/CD

**Phase 3: Optimization**
- Tune security policies
- Reduce false positives
- Improve response times

**Phase 4: Culture**
- Train development teams
- Foster collaboration
- Celebrate security wins

## Tools & Technologies

- Container Security: Trivy, Anchore
- SAST: SonarQube, Checkmarx
- DAST: OWASP ZAP, Burp Suite
- IaC Security: Checkov, Terraform Sentinel

DevSecOps isn't just about tools—it's about culture, collaboration, and continuous improvement.
    `,
    author: 'David Kumar',
    date: '2026-01-20',
    category: 'DevSecOps',
    readTime: 10,
    tags: ['DevSecOps', 'Cloud', 'Automation'],
  },
  {
    id: 5,
    title: 'Compliance Made Simple: ISO 27001 & SOC 2',
    excerpt: 'Navigate the complexities of security compliance frameworks with this practical guide.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    content: `
# Compliance Made Simple: ISO 27001 & SOC 2

Security compliance doesn't have to be overwhelming. This guide breaks down two critical frameworks: ISO 27001 and SOC 2.

## ISO 27001: Information Security Management

ISO 27001 provides a systematic approach to managing sensitive company information, ensuring it remains secure.

### Key Components

1. **Risk Assessment**: Identify and evaluate information security risks
2. **Risk Treatment**: Implement controls to mitigate identified risks
3. **ISMS Implementation**: Establish an Information Security Management System
4. **Continuous Improvement**: Regular monitoring and review

### Benefits
- Enhanced security posture
- Competitive advantage
- Customer trust
- Legal compliance

## SOC 2: Service Organization Control

SOC 2 focuses on controls relevant to security, availability, processing integrity, confidentiality, and privacy.

### Trust Service Criteria

- **Security**: Protection against unauthorized access
- **Availability**: System accessibility as agreed
- **Processing Integrity**: Complete, valid, accurate processing
- **Confidentiality**: Protection of confidential information
- **Privacy**: Personal information collection and usage

## Getting Started

### Step 1: Gap Analysis
Assess current state against framework requirements.

### Step 2: Scope Definition
Determine which systems and processes will be included.

### Step 3: Control Implementation
Deploy necessary technical and organizational controls.

### Step 4: Documentation
Create policies, procedures, and evidence of compliance.

### Step 5: Audit
Undergo formal assessment by certified auditors.

## Common Challenges

- Resource constraints
- Lack of executive buy-in
- Complex documentation requirements
- Ongoing maintenance

## Best Practices

- Start with a clear roadmap
- Assign dedicated resources
- Leverage automation where possible
- Treat compliance as ongoing process

Remember: Compliance is not just about passing audits—it's about building a robust security foundation that protects your organization and builds trust with customers.
    `,
    author: 'Jessica Martinez',
    date: '2026-01-15',
    category: 'Compliance',
    readTime: 9,
    tags: ['Compliance', 'ISO 27001', 'SOC 2'],
  },
  {
    id: 6,
    title: 'Ransomware Defense Strategies for 2026',
    excerpt: 'Protect your organization from ransomware attacks with these proven defense strategies.',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&h=400&fit=crop',
    content: `
# Ransomware Defense Strategies for 2026

Ransomware remains one of the most significant cyber threats facing organizations today. Here's how to protect your business.

## Understanding Modern Ransomware

Today's ransomware attacks are sophisticated, targeted, and increasingly destructive. Attackers don't just encrypt data—they steal it, threaten to leak it, and target your business partners.

## Prevention Strategies

### 1. Robust Backup Solution
- Follow the 3-2-1 rule: 3 copies, 2 different media, 1 offsite
- Regular backup testing
- Immutable backups
- Air-gapped storage

### 2. Email Security
- Advanced spam filtering
- Email authentication (SPF, DKIM, DMARC)
- Attachment sandboxing
- User awareness training

### 3. Access Control
- Implement least privilege
- Multi-factor authentication
- Network segmentation
- Regular access reviews

### 4. Patch Management
- Automated patch deployment
- Virtual patching for legacy systems
- Regular vulnerability scanning

## Detection & Response

### Early Warning Signs
- Unusual file extensions
- Suspicious network traffic
- Unexpected system slowdowns
- Failed backup jobs

### Incident Response Plan

**Immediate Actions:**
1. Isolate infected systems
2. Identify the ransomware variant
3. Assess data impact
4. Notify stakeholders

**Recovery Phase:**
1. Eradicate malware
2. Restore from backups
3. Verify system integrity
4. Resume operations

### Post-Incident
- Conduct thorough investigation
- Document lessons learned
- Update security controls
- Enhance monitoring

## Should You Pay the Ransom?

**Generally, no.** Here's why:
- No guarantee of data recovery
- Funds criminal operations
- May face legal consequences
- Marks you as a willing payer

## Building Resilience

The best defense against ransomware is a combination of:
- Strong preventive controls
- Robust detection capabilities
- Well-tested recovery procedures
- Security-aware culture

Don't wait for an attack to happen. Prepare now, because it's not a matter of if, but when.
    `,
    author: 'Robert Lee',
    date: '2026-01-10',
    category: 'Threat Prevention',
    readTime: 7,
    tags: ['Ransomware', 'Defense', 'Incident Response'],
  },
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section - Modern */}
        <motion.div
          className="text-center mb-20"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          {/* Accent Line */}
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
          
          {/* Icon Badge */}
          <div className="inline-flex p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 mb-6">
            <BookOpen className="w-12 h-12 text-emerald-400" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white/90">Insights &</span>{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Knowledge Hub
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest trends, best practices, and expert insights in cyber security and IT infrastructure.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { value: '100+', label: 'Articles' },
            { value: '50K+', label: 'Readers' },
            { value: 'Weekly', label: 'Updates' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center p-4 rounded-xl border border-white/5 bg-white/[0.02]"
              variants={staggerItem}
            >
              <div className="text-2xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              className="rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 overflow-hidden group cursor-pointer"
              variants={staggerItem}
              onClick={() => setSelectedPost(post)}
              whileHover={{ y: -4 }}
            >
              {/* Header Image */}
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-sm">
                    <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime} min read</span>
                  <span>•</span>
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-400">{post.author}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="relative border border-white/5 rounded-2xl p-12 lg:p-16 text-center bg-gradient-to-b from-white/[0.02] to-transparent mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-widest">Get Started</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white/90">Need Security</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Expertise?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Our team of certified professionals is ready to help protect your business from cyber threats.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Contact Us Today
                </Button>
              </Link>
              <Link to={Routes.HOME}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-emerald-500/30">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-white/10 rounded-2xl shadow-2xl scrollbar-hide"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-white/10 p-6">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 mb-4">
                  <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                    {selectedPost.category}
                  </span>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">
                  {selectedPost.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{selectedPost.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(selectedPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedPost.readTime} min read</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <div className="prose prose-invert prose-emerald max-w-none">
                  {selectedPost.content.split('\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('# ')) {
                      return (
                        <h1 key={idx} className="text-3xl font-bold text-white mb-6 mt-8">
                          {paragraph.replace('# ', '')}
                        </h1>
                      );
                    }
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={idx} className="text-2xl font-bold text-white mb-4 mt-6">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={idx} className="text-xl font-bold text-white mb-3 mt-5">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      return (
                        <li key={idx} className="text-gray-300 ml-6 mb-2">
                          {paragraph.replace('- ', '')}
                        </li>
                      );
                    }
                    if (paragraph.trim() === '') {
                      return null;
                    }
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <p key={idx} className="text-white font-bold mb-3">
                          {paragraph.replace(/\*\*/g, '')}
                        </p>
                      );
                    }
                    return (
                      <p key={idx} className="text-gray-300 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm border border-emerald-500/20 bg-emerald-500/5 text-emerald-300"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="mt-6 flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-300">
                    <Share2 className="w-4 h-4" />
                    Share Article
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-300">
                    <MessageCircle className="w-4 h-4" />
                    Discuss
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
