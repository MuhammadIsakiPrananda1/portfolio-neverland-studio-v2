import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Terminal, Power, Clock, Plus, AlertCircle,
  ArrowLeft, HardDrive, Shield, Key, Server
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import AuthModal from '@components/organisms/AuthModal';
import { useAuthState } from '@/hooks/useAuthState';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success';
  content: string;
  timestamp: Date;
}
const PlaygroundVM = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthState();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isVMActive, setIsVMActive] = useState(false);
  const [containerId, setContainerId] = useState<string>('');
  const [vmPassword, setVmPassword] = useState<string>('');
  const [vmOS, setVmOS] = useState<string>('');
  const [resources, setResources] = useState({ ram: '', storage: '', cpu: '' });

  // Session States
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour default
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);

  // Terminal States
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [commandsExecuted, setCommandsExecuted] = useState(0);
  const [currentDir, setCurrentDir] = useState('/root');

  // Tab Completion States
  const [tabSuggestions, setTabSuggestions] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(-1);
  const [originalCommand, setOriginalCommand] = useState('');

  // Backend URL - prefer explicit env var, otherwise use same-origin proxy (most reliable)
  const apiBase = import.meta.env.VITE_API_URL || '/api';

  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper functions - defined before useEffect to avoid reference errors
  const addTerminalLine = (type: TerminalLine['type'], content: string) => {
    setTerminalLines(prev => [...prev, { type, content, timestamp: new Date() }]);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // Format ls output in columns like real terminal
  const formatLsOutput = (output: string): string => {
    const items = output.split('\n').filter((item: string) => item.trim());
    if (items.length === 0) return '';

    // Sort items alphabetically (case-insensitive)
    const sortedItems = items.sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );

    // Calculate max width for column alignment
    const maxWidth = Math.max(...sortedItems.map(item => item.length));
    const columnWidth = maxWidth + 2; // Add padding
    const terminalWidth = 100; // Assume 100 chars width
    const columnsPerRow = Math.max(1, Math.floor(terminalWidth / columnWidth));

    // Build rows with aligned columns
    const rows: string[] = [];
    for (let i = 0; i < sortedItems.length; i += columnsPerRow) {
      const rowItems = sortedItems.slice(i, i + columnsPerRow);
      const rowText = rowItems
        .map(item => item.padEnd(columnWidth, ' '))
        .join('')
        .trimEnd();
      rows.push(rowText);
    }

    return rows.join('\n');
  };

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalLines]);

  // Focus input when terminal is active
  useEffect(() => {
    if (isVMActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVMActive, terminalLines]);

  // Restore session if exists
  useEffect(() => {
    const savedContainerId = localStorage.getItem('vm-container-id');
    const savedExpiresAt = localStorage.getItem('vm-expires-at');

    if (savedContainerId && savedExpiresAt) {
      const expiresDate = new Date(savedExpiresAt);
      const now = new Date();

      if (expiresDate > now) {
        // Session still valid
        setContainerId(savedContainerId);
        setExpiresAt(expiresDate);
        setIsVMActive(true);
        addTerminalLine('success', '✓ Session restored from previous connection');
        addTerminalLine('output', `Container ID: ${savedContainerId.substring(0, 12)}`);
      } else {
        // Session expired, clean up
        localStorage.removeItem('vm-container-id');
        localStorage.removeItem('vm-expires-at');
      }
    }
  }, []);

  // Countdown timer - moved after addTerminalLine definition
  useEffect(() => {
    if (!isVMActive || !expiresAt) return;

    const interval = setInterval(() => {
      const now = new Date();
      const remaining = Math.floor((expiresAt.getTime() - now.getTime()) / 1000);

      if (remaining <= 0) {
        addTerminalLine('error', '⏰ Session expired! VM akan dihapus...');
        setIsVMActive(false);
        setContainerId('');
        localStorage.removeItem('vm-container-id');
        localStorage.removeItem('vm-expires-at');
        return;
      }

      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVMActive, expiresAt]);

  const handleStartVM = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setTerminalLines([]);
    setIsStarting(true);

    try {
      console.log('[VM] Starting VM with apiBase:', apiBase);
      const response = await fetch(`${apiBase}/v1/vm/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          user_id: String(user?.id || 'guest'),
          username: String(user?.name || 'guest'),
          duration: 3600, // 1 hour
        }),
      });

      console.log('[VM] Response status:', response.status, 'ok:', response.ok);
      const contentType = response.headers.get('content-type') || '';
      console.log('[VM] Content-Type:', contentType);

      const raw = await response.text();
      console.log('[VM] Raw response:', raw.substring(0, 200));

      let data;
      try {
        data = JSON.parse(raw);
        console.log('[VM] Parsed data:', data);
      } catch (parseErr) {
        console.error('[VM] JSON parse error:', parseErr);
        data = null;
      }

      if (!response.ok) {
        console.error('[VM] Response not OK:', response.status, data?.message || raw);
        addTerminalLine('error', `❌ API Error: ${response.status} - ${data?.message || 'Unknown error'}`);
        return;
      }

      if (!data?.success) {
        console.error('[VM] Success field false:', data?.message || data);
        addTerminalLine('error', `❌ Server error: ${data?.message || 'VM gagal dibuat'}`);
        return;
      }

      // Save session info
      console.log('[VM] Creating VM with ID:', data.container_id);

      try {
        setContainerId(data.container_id);
        console.log('[VM] Set container ID');

        setVmPassword(data.password);
        console.log('[VM] Set password');

        setVmOS(data.os || 'Debian 13 (Trixie)');
        setResources(data.resources || { ram: '1 GB', storage: '20 GB', cpu: '1 Core' });
        console.log('[VM] Set OS and resources');

        const expiry = new Date(data.expires_at);
        setExpiresAt(expiry);
        console.log('[VM] Set expiry:', expiry);

        // Save to localStorage
        localStorage.setItem('vm-container-id', data.container_id);
        localStorage.setItem('vm-expires-at', expiry.toISOString());
        console.log('[VM] Saved to localStorage');

        // Clear terminal and show success message
        setTerminalLines([]);
        console.log('[VM] Cleared terminal lines');

        setTimeout(() => {
          addTerminalLine('success', `✓ VM created successfully!`);
          addTerminalLine('output', '');
          addTerminalLine('output', `📦 Container: ${data.container_id.substring(0, 12)}`);
          addTerminalLine('output', `🔑 Password: ${data.password}`);
          addTerminalLine('output', `⏰ Session: 1 hour (extendable)`);
          addTerminalLine('output', '');
          addTerminalLine('success', '✓ APT repositories configured (HTTPS)');
          addTerminalLine('success', '✓ Internet access enabled');
          addTerminalLine('output', '');
          addTerminalLine('output', '💡 Quick start:');
          addTerminalLine('output', '   apt update');
          addTerminalLine('output', '   apt install nano vim curl wget git');
          addTerminalLine('output', '');
          console.log('[VM] Added terminal messages');
        }, 100);

        // Set VM active LAST to ensure all state is ready
        setIsVMActive(true);
        console.log('[VM] Set VM active = true');

      } catch (stateError) {
        console.error('[VM] Error setting state:', stateError);
        addTerminalLine('error', `❌ Error initializing VM state: ${stateError}`);
      }

    } catch (err) {
      console.error('[VM] Fetch error:', err);
      const errMsg = err instanceof Error ? err.message : 'Unknown error';
      addTerminalLine('error', `❌ Error: ${errMsg}`);
    } finally {
      console.log('[VM] Finally block - setting isStarting = false');
      setIsStarting(false);
    }
  };

  const handleStopVM = async () => {
    if (!containerId) {
      setIsVMActive(false);
      return;
    }

    addTerminalLine('output', '');
    addTerminalLine('output', '⏳ Stopping Docker container...');

    try {
      await fetch(`${apiBase}/v1/vm/${containerId}/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      addTerminalLine('success', '✓ Container stopped and removed');
      addTerminalLine('success', '✓ All resources cleaned up');
      addTerminalLine('output', '');
      addTerminalLine('output', `📊 Session Summary:`);
      addTerminalLine('output', `   • Commands Executed: ${commandsExecuted}`);
      addTerminalLine('output', `   • Session Duration: ${formatTime(3600 - timeRemaining)}`);
      addTerminalLine('output', '');
      addTerminalLine('success', '👋 Thank you for using Neverland VM!');
    } catch (error) {
      addTerminalLine('error', '⚠️  Failed to stop container properly');
    }

    // Clean up states
    setIsVMActive(false);
    setContainerId('');
    setVmPassword('');
    setVmOS('');
    setResources({ ram: '', storage: '', cpu: '' });
    setTimeRemaining(3600);
    setExpiresAt(null);
    setCommandsExecuted(0);
    setCurrentDir('/root');

    // Clean up localStorage
    localStorage.removeItem('vm-container-id');
    localStorage.removeItem('vm-expires-at');
  };

  const handleExtendTime = async (hours: number) => {
    if (!containerId) return;

    try {
      const response = await fetch(`${apiBase}/v1/vm/${containerId}/extend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ hours }),
      });

      const data = await response.json();

      if (data.success) {
        const newExpiresAt = new Date(data.expires_at);
        setExpiresAt(newExpiresAt);
        localStorage.setItem('vm-expires-at', newExpiresAt.toISOString());

        addTerminalLine('success', `✓ Session extended by ${hours} hour(s)`);
        addTerminalLine('output', `New expiry: ${newExpiresAt.toLocaleTimeString()}`);
      } else {
        addTerminalLine('error', `❌ ${data.message}`);
      }
    } catch (error) {
      addTerminalLine('error', '❌ Failed to extend session');
    }
  };

  const executeCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const username = user?.name ? user.name.toLowerCase().replace(/\s+/g, '-') : 'neverland';
    const displayPath = currentDir === '/root' ? '~' : currentDir;
    addTerminalLine('input', `root@${username}:${displayPath}# ${trimmedCmd}`);
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setCommandsExecuted(prev => prev + 1);

    // Frontend-only commands
    if (trimmedCmd.toLowerCase() === 'clear') {
      setTerminalLines([]);
      return;
    }

    if (trimmedCmd.toLowerCase() === 'exit') {
      addTerminalLine('output', '');
      addTerminalLine('success', '👋 Goodbye! Stopping VM...');
      setTimeout(handleStopVM, 1000);
      return;
    }

    // Handle cd command separately - update currentDir state
    if (trimmedCmd.toLowerCase().startsWith('cd')) {
      const parts = trimmedCmd.split(/\s+/);
      if (parts.length >= 2) {
        const targetDir = parts[1];
        // Build command with proper current directory prefix and validate with pwd
        const cdCommand = `cd ${currentDir} && cd ${targetDir} && pwd`;

        if (!containerId) {
          addTerminalLine('error', '❌ No active container. Please start the VM first.');
          return;
        }

        setIsExecuting(true);
        try {
          const response = await fetch(`${apiBase}/v1/vm/${containerId}/execute`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              command: cdCommand,
            }),
          });

          const data = await response.json();
          if (data.success) {
            // Update current directory from pwd output
            const newDir = data.output?.trim() || currentDir;
            setCurrentDir(newDir);
            addTerminalLine('output', newDir);
          } else {
            addTerminalLine('error', `cd: ${data.message || 'Directory not found'}`);
          }
        } catch (err) {
          addTerminalLine('error', `❌ Error changing directory`);
        } finally {
          setIsExecuting(false);
        }
        return;
      }
    }

    // Execute in Docker container with current directory prefix
    if (!containerId) {
      addTerminalLine('error', '❌ No active container. Please start the VM first.');
      return;
    }

    setIsExecuting(true);

    // Show loading indicator in terminal
    const loadingLineIndex = terminalLines.length;
    addTerminalLine('output', `⏳ Executing: ${trimmedCmd}`);

    try {
      // Prefix command with cd to maintain directory context
      const prefixedCmd = `cd ${currentDir} && ${trimmedCmd}`;

      const response = await fetch(`${apiBase}/v1/vm/${containerId}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          command: prefixedCmd,
        }),
      });

      const data = await response.json();

      // Remove loading indicator
      setTerminalLines(prev => prev.slice(0, loadingLineIndex));

      if (!data.success) {
        addTerminalLine('error', `❌ Error: ${data.message || 'Command execution failed'}`);
        return;
      }

      // Display output from Docker container
      const output = data.output?.trim() || '';
      if (output) {
        // Check if command is ls or ls variant (ls, ls -l, ls -la, etc.)
        const isLsCommand = trimmedCmd.toLowerCase().startsWith('ls') &&
          !trimmedCmd.toLowerCase().includes('-l') &&
          !trimmedCmd.toLowerCase().includes('--list');

        if (isLsCommand) {
          // Format ls output in columns like real terminal
          const formattedOutput = formatLsOutput(output);
          addTerminalLine('output', formattedOutput);
        } else {
          const lines = output.split('\n');
          lines.forEach((line: string) => {
            // Simple colorization based on keywords
            if (line.toLowerCase().includes('error') ||
              line.toLowerCase().includes('failed') ||
              line.toLowerCase().includes('fatal')) {
              addTerminalLine('error', line);
            } else if (line.toLowerCase().includes('success') ||
              line.includes('✓') ||
              line.toLowerCase().includes('done')) {
              addTerminalLine('success', line);
            } else {
              addTerminalLine('output', line);
            }
          });
        }
      }

      // Show exit code if command failed
      if (data.exit_code !== 0 && !output) {
        addTerminalLine('error', `Command exited with code ${data.exit_code}`);
      }

    } catch (error: any) {
      addTerminalLine('error', `❌ Network error: ${error.message}`);
      addTerminalLine('error', 'Failed to execute command on server');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim() && !isExecuting) {
      await executeCommand(currentCommand);
      setCurrentCommand('');
      setHistoryIndex(-1);
      // Reset tab completion
      setTabSuggestions([]);
      setTabIndex(-1);
      setOriginalCommand('');
    }
  };

  // Get file list for tab completion
  const getFileList = async (directory?: string): Promise<string[]> => {
    if (!containerId || isExecuting) return [];

    try {
      const targetDir = directory || currentDir;
      const response = await fetch(`${apiBase}/v1/vm/${containerId}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          command: `cd ${targetDir} && ls -1A 2>/dev/null`,
        }),
      });

      const data = await response.json();
      if (data.success && data.output) {
        return data.output.trim().split('\n').filter(Boolean);
      }
    } catch (error) {
      console.error('Failed to get file list:', error);
    }

    return [];
  };

  // Handle Tab completion
  const handleTabCompletion = async (e: React.KeyboardEvent) => {
    e.preventDefault();

    // Get the last word (what we want to complete)
    const words = currentCommand.split(' ');
    const lastWord = words[words.length - 1] || '';

    // Check if it's a path (contains /)
    const isPath = lastWord.includes('/');

    // If we're starting a new tab sequence
    if (tabSuggestions.length === 0 || originalCommand !== currentCommand) {
      setOriginalCommand(currentCommand);

      let fileList: string[];
      let searchPrefix: string;
      let pathPrefix: string = '';

      if (isPath) {
        // Handle path completion (e.g., /usr/lo<Tab> or ./fold<Tab>)
        const lastSlashIndex = lastWord.lastIndexOf('/');
        pathPrefix = lastWord.substring(0, lastSlashIndex + 1);
        searchPrefix = lastWord.substring(lastSlashIndex + 1);

        // Determine directory to list
        let targetDir: string;
        if (lastWord.startsWith('/')) {
          // Absolute path
          targetDir = pathPrefix || '/';
        } else if (lastWord.startsWith('./')) {
          // Relative path with ./
          targetDir = currentDir + '/' + pathPrefix;
        } else if (lastWord.startsWith('../')) {
          // Relative path with ../
          targetDir = currentDir + '/' + pathPrefix;
        } else {
          // Relative path without ./
          targetDir = currentDir + '/' + pathPrefix;
        }

        fileList = await getFileList(targetDir);
      } else {
        // Simple filename completion in current directory
        searchPrefix = lastWord;
        fileList = await getFileList();
      }

      const matches = fileList.filter(file =>
        file.toLowerCase().startsWith(searchPrefix.toLowerCase())
      ).sort();

      if (matches.length === 0) {
        // No matches - do nothing
        return;
      } else if (matches.length === 1) {
        // Single match - complete it
        const completedWord = pathPrefix + matches[0];
        const completed = [...words.slice(0, -1), completedWord].join(' ');
        setCurrentCommand(completed + ' ');
        setTabSuggestions([]);
        setTabIndex(-1);
      } else {
        // Multiple matches - start cycling
        setTabSuggestions(matches.map(m => pathPrefix + m));
        setTabIndex(0);
        const completedWord = pathPrefix + matches[0];
        const completed = [...words.slice(0, -1), completedWord].join(' ');
        setCurrentCommand(completed);
      }
    } else {
      // Cycle through suggestions
      const nextIndex = (tabIndex + 1) % tabSuggestions.length;
      setTabIndex(nextIndex);
      const words = originalCommand.split(' ');
      const completed = [...words.slice(0, -1), tabSuggestions[nextIndex]].join(' ');
      setCurrentCommand(completed);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    // Tab completion
    if (e.key === 'Tab') {
      await handleTabCompletion(e);
      return;
    }

    // Reset tab completion on any other key
    if (tabSuggestions.length > 0) {
      setTabSuggestions([]);
      setTabIndex(-1);
      setOriginalCommand('');
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            onClick={() => navigate('/services')}
            variant="ghost"
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Services
          </Button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          className="text-center mb-24"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          {/* Accent Line */}
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />

          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white/90">Virtual Machine</span>{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Playground
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Full root access Debian 13 container with internet connectivity. Install any tool, run exploits,
            practice pentesting - just like TryHackMe. Perfect for learning cybersecurity and Linux administration.
          </p>
        </motion.div>

        {/* VM Status Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="relative rounded-xl p-6 lg:p-8 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
            variants={staggerItem}
            whileHover={{ y: -4 }}
          >
            <Server className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
              Operating System
            </div>
            <div className="text-sm lg:text-base font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
              {vmOS || 'Debian 13 (Trixie)'}
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-xl p-6 lg:p-8 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
            variants={staggerItem}
            whileHover={{ y: -4 }}
          >
            <HardDrive className="w-10 h-10 mx-auto mb-3 text-blue-400" />
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
              Resources
            </div>
            <div className="text-sm lg:text-base font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
              {resources.ram && resources.storage ? `${resources.ram} • ${resources.storage}` : '1GB RAM • 20GB'}
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-xl p-6 lg:p-8 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
            variants={staggerItem}
            whileHover={{ y: -4 }}
          >
            <Clock className="w-10 h-10 mx-auto mb-3 text-purple-400" />
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
              Time Remaining
            </div>
            <div className={`text-sm lg:text-base font-mono font-bold ${timeRemaining < 600 ? 'text-red-400' : 'text-green-400'}`}>
              {isVMActive ? formatTime(timeRemaining) : '1:00:00'}
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-xl p-6 lg:p-8 text-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
            variants={staggerItem}
            whileHover={{ y: -4 }}
          >
            <Shield className="w-10 h-10 mx-auto mb-3 text-pink-400" />
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
              Status
            </div>
            <div className="text-sm lg:text-base font-bold">
              {isVMActive ? (
                <span className="text-green-400">● Running</span>
              ) : (
                <span className="text-gray-500">○ Stopped</span>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Terminal Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="border border-white/5 rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
            {/* Terminal Header */}
            <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Terminal className="text-emerald-400" size={24} />
                <div>
                  <h3 className="font-semibold text-white text-lg">Debian 13 Root Terminal</h3>
                  <p className="text-sm text-gray-400">
                    {isVMActive ? (
                      <>
                        Container: <span className="font-mono text-emerald-400">{containerId.substring(0, 12)}</span>
                        {vmPassword && (
                          <>
                            {' • '}
                            <Key size={12} className="inline" />
                            {' '}
                            <span className="font-mono text-green-400">{vmPassword}</span>
                          </>
                        )}
                      </>
                    ) : (
                      'Ready to start'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 flex-wrap">
                {!isVMActive ? (
                  <Button
                    onClick={handleStartVM}
                    variant="primary"
                    leftIcon={<Power size={18} />}
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white transition-all"
                    disabled={isStarting}
                  >
                    {isStarting ? 'Starting...' : 'Start Virtual Machine'}
                  </Button>
                ) : (
                  <>
                    {timeRemaining < 600 && (
                      <div className="flex items-center text-red-400 animate-pulse">
                        <AlertCircle size={18} className="mr-2" />
                        <span className="text-sm font-semibold">Low Time!</span>
                      </div>
                    )}
                    <Button
                      onClick={() => handleExtendTime(1)}
                      variant="ghost"
                      size="sm"
                      leftIcon={<Plus size={16} />}
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      +1 Hour
                    </Button>
                    <Button
                      onClick={handleStopVM}
                      variant="secondary"
                      size="sm"
                      leftIcon={<Power size={16} />}
                      className="bg-red-600 hover:bg-red-700 text-white transition-colors"
                    >
                      Stop VM
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalContainerRef}
              className="bg-black p-6 font-mono text-sm h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent"
            >
              {isStarting && (
                <div className="text-gray-300 text-center py-28">
                  <div className="w-10 h-10 border-4 border-emerald-500/70 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm">Starting VM...</p>
                </div>
              )}

              {!isVMActive && !isStarting && terminalLines.length === 0 && (
                <div className="text-gray-500 text-center py-20">
                  <Terminal size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Virtual Machine Not Running</p>
                  <p className="text-sm mb-4">Click "Start Virtual Machine" to begin</p>
                  <div className="text-left max-w-md mx-auto mt-6 text-xs space-y-1">
                    <p className="text-gray-400">💡 What you'll get:</p>
                    <p className="text-gray-500">• Full root access Debian 13 (privileged mode)</p>
                    <p className="text-gray-500">• APT ready - repositories configured with HTTPS</p>
                    <p className="text-gray-500">• Internet enabled - curl, wget, ping work</p>
                    <p className="text-gray-500">• Clean slate - install only what you need</p>
                    <p className="text-gray-500">• Start with: <code className="text-emerald-400 font-mono">apt update && apt install nano vim</code></p>
                    <p className="text-gray-500">• Session: 1-4 hours, fresh container each time</p>
                  </div>
                </div>
              )}

              {terminalLines.map((line, index) => (
                <div key={index} className="mb-1 whitespace-pre-wrap break-words">
                  <span className={
                    line.type === 'input' ? 'text-emerald-400 font-bold' :
                      line.type === 'error' ? 'text-red-400' :
                        line.type === 'success' ? 'text-green-400' :
                          'text-gray-300'
                  }>
                    {line.content}
                  </span>
                </div>
              ))}

              {isVMActive && (
                <>
                  <form onSubmit={handleSubmit} className="flex items-center mt-2">
                    <span className="text-green-400 mr-2 flex-shrink-0">
                      root@{user?.name ? user.name.toLowerCase().replace(/\s+/g, '-') : 'neverland'}:{currentDir === '/root' ? '~' : currentDir}#
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentCommand}
                      onChange={(e) => {
                        setCurrentCommand(e.target.value);
                        // Reset tab completion when user types manually
                        if (tabSuggestions.length > 0) {
                          setTabSuggestions([]);
                          setTabIndex(-1);
                          setOriginalCommand('');
                        }
                      }}
                      onKeyDown={handleKeyDown}
                      disabled={isExecuting}
                      className="flex-1 bg-transparent text-white outline-none border-none"
                      placeholder={isExecuting ? 'Executing...' : 'Type any Linux command... (Tab to autocomplete)'}
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </form>

                  {/* Tab Completion Suggestions */}
                  {tabSuggestions.length > 1 && (
                    <div className="mt-1 text-xs ml-2">
                      <span className="text-yellow-400">⇥</span>
                      <span className="text-gray-500"> {tabSuggestions.length} matches: </span>
                      <span className="text-emerald-400">{tabSuggestions.slice(0, 5).join('  ')}</span>
                      {tabSuggestions.length > 5 && <span className="text-gray-500"> ...</span>}
                      <span className="text-gray-600"> (Tab to cycle)</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="VM Features"
            title="How It Works"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What Happens When You Start */}
            <motion.div
              className="rounded-xl p-8 border border-white/5 bg-gradient-to-br from-emerald-500/5 to-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <Power className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">🚀 What Happens When You Start</h3>
              <ul className="space-y-2 text-gray-400 text-sm leading-relaxed">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>Creates fresh Debian 13 container in privileged mode</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>Full root access with all Linux capabilities enabled</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>Internet access enabled (HTTPS with SSL verification)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>APT repositories configured & ready to use</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>Clean slate - install only what you need!</span>
                </li>
              </ul>
            </motion.div>

            {/* What You Can Do */}
            <motion.div
              className="rounded-xl p-8 border border-white/5 bg-gradient-to-br from-blue-500/5 to-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="inline-flex p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-4">
                <Terminal className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">💻 What You Can Do (Full Root Access)</h3>
              <ul className="space-y-2 text-gray-400 text-sm leading-relaxed">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Run ANY Linux command with full root privileges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><code className="text-emerald-400 font-mono text-xs">apt update && apt install</code> works immediately!</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Install ANY tool you need (nano, nmap, python, gcc, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Internet access: curl, wget, ping external sites</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Compile & run programs (Python, C/C++, Go, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Perfect for learning, pentesting, CTF challenges</span>
                </li>
              </ul>
            </motion.div>

            {/* Security & Cleanup */}
            <motion.div
              className="rounded-xl p-8 border border-white/5 bg-gradient-to-br from-purple-500/5 to-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 mb-4">
                <Shield className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">🔒 Security & Isolation</h3>
              <ul className="space-y-2 text-gray-400 text-sm leading-relaxed">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Full root access inside container (privileged mode)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Internet enabled but isolated from host system</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Resource limits: 1GB RAM, 1 CPU core</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Auto-deleted when session expires (1-4 hours)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Fresh container every session - nothing persists</span>
                </li>
              </ul>
            </motion.div>

            {/* Quick Commands */}
            <motion.div
              className="rounded-xl p-8 border border-white/5 bg-gradient-to-br from-pink-500/5 to-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex p-3 rounded-lg bg-pink-500/10 border border-pink-500/20 mb-4">
                <Terminal className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">⚡ Quick Start Commands</h3>
              <ul className="space-y-2 text-gray-400 text-sm leading-relaxed">
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><code className="text-emerald-400 font-mono text-xs">apt update</code> - Update package lists</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><code className="text-emerald-400 font-mono text-xs">apt install nano vim curl wget git</code> - Install editors & tools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><code className="text-emerald-400 font-mono text-xs">apt install python3-pip nmap</code> - Install Python & nmap</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><code className="text-emerald-400 font-mono text-xs">curl ifconfig.me</code> - Check your public IP</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><code className="text-emerald-400 font-mono text-xs">ping google.com</code> - Test internet connectivity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><code className="text-emerald-400 font-mono text-xs">clear</code> / <code className="text-emerald-400 font-mono text-xs">exit</code> - Clear terminal or stop VM</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default PlaygroundVM;
