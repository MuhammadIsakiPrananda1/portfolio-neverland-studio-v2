import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Binary, CheckCircle, XCircle, Info, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/atoms/Button';
import AuthModal from '@components/organisms/AuthModal';
import { useAuthState } from '@/hooks/useAuthState';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  points: number;
}

const REVERSE_CHALLENGES: Challenge[] = [
  { id: 'rev-001', title: 'Basic Reverse', description: 'Analyze simple compiled program', difficulty: 'Easy', points: 75 },
  { id: 'rev-002', title: 'String Analysis', description: 'Extract hidden strings from binary', difficulty: 'Easy', points: 100 },
  { id: 'rev-003', title: 'Function Identification', description: 'Identify key functions in binary', difficulty: 'Easy', points: 100 },
  { id: 'rev-004', title: 'Password Cracking', description: 'Reverse engineer password check', difficulty: 'Medium', points: 175 },
  { id: 'rev-005', title: 'Algorithm Recovery', description: 'Recover encrypted algorithm', difficulty: 'Medium', points: 200 },
  { id: 'rev-006', title: 'Obfuscated Code', description: 'Analyze obfuscated binary', difficulty: 'Medium', points: 250 },
  { id: 'rev-007', title: 'Packed Binary', description: 'Unpack and analyze packed executable', difficulty: 'Hard', points: 350 },
  { id: 'rev-008', title: 'Anti-Debug Techniques', description: 'Bypass anti-debugging measures', difficulty: 'Hard', points: 400 },
  { id: 'rev-009', title: 'License Key Generator', description: 'Reverse engineer key generation', difficulty: 'Hard', points: 375 },
  { id: 'rev-010', title: 'Malware Analysis', description: 'Analyze malicious software', difficulty: 'Expert', points: 500 },
  { id: 'rev-011', title: 'Kernel Driver Reversing', description: 'Reverse engineer kernel driver', difficulty: 'Expert', points: 600 },
  { id: 'rev-012', title: 'Firmware Analysis', description: 'Extract and analyze firmware', difficulty: 'Expert', points: 550 },
  { id: 'rev-013', title: 'Binary Patching', description: 'Modify binary behavior', difficulty: 'Expert', points: 450 },
  { id: 'rev-014', title: 'Custom Decryption', description: 'Decrypt custom encryption routine', difficulty: 'Expert', points: 650 },
  { id: 'rev-015', title: 'Reverse Engineering Master', description: 'Ultimate reverse engineering challenge', difficulty: 'Expert', points: 1000 },
];

const PlaygroundReverse = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthState();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('solved-reverse-challenges');
    if (saved) {
      setSolvedChallenges(JSON.parse(saved));
    }
  }, []);

  const handleChallengeClick = (challenge: Challenge) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setSelectedChallenge(challenge);
    setUserInput('');
    setFeedback('');
    setIsCorrect(null);
  };

  const handleSubmit = () => {
    if (!selectedChallenge) return;

    if (userInput.toLowerCase().includes('flag')) {
      setIsCorrect(true);
      setFeedback('Correct! Challenge completed.');
      const newSolved = [...solvedChallenges, selectedChallenge.id];
      setSolvedChallenges(newSolved);
      localStorage.setItem('solved-reverse-challenges', JSON.stringify(newSolved));
      setTimeout(() => setSelectedChallenge(null), 2000);
    } else {
      setIsCorrect(false);
      setFeedback('Incorrect. Try analyzing the binary more carefully!');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-orange-400';
      case 'Expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const totalPoints = REVERSE_CHALLENGES.reduce((sum, c) => sum + c.points, 0);
  const earnedPoints = REVERSE_CHALLENGES
    .filter(c => solvedChallenges.includes(c.id))
    .reduce((sum, c) => sum + c.points, 0);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/playground')}
            className="mb-6 text-red-400 hover:text-red-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Playground
          </Button>

          <div className="flex items-center justify-center mb-4">
            <Binary className="w-12 h-12 text-red-500 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Reverse <span className="text-red-500">Engineering</span>
            </h1>
          </div>

          <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
            Deconstruct and analyze binaries to understand how they work
          </p>

          {/* Progress Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/10">
              <div className="text-sm text-gray-400">Challenges Solved</div>
              <div className="text-2xl font-bold text-red-400">
                {solvedChallenges.length}/{REVERSE_CHALLENGES.length}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/10">
              <div className="text-sm text-gray-400">Points Earned</div>
              <div className="text-2xl font-bold text-green-400">
                {earnedPoints}/{totalPoints}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/10">
              <div className="text-sm text-gray-400">Progress</div>
              <div className="text-2xl font-bold text-red-400">
                {Math.round((solvedChallenges.length / REVERSE_CHALLENGES.length) * 100)}%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVERSE_CHALLENGES.map((challenge, index) => {
            const isSolved = solvedChallenges.includes(challenge.id);
            return (
              <div
                key={challenge.id}
                onClick={() => handleChallengeClick(challenge)}
                className={`
                  relative group cursor-pointer
                  bg-gradient-to-br from-red-500/10 to-orange-500/10
                  backdrop-blur-sm rounded-xl p-6
                  border ${isSolved ? 'border-green-500/50' : 'border-white/10'}
                  hover:border-red-500/50 transition-all duration-300
                  hover:shadow-lg hover:shadow-red-500/20
                  hover:scale-105
                `}
              >
                {isSolved && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                )}

                <div className="flex items-start mb-3">
                  <Binary className="w-8 h-8 text-red-400 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {challenge.title}
                    </h3>
                    <span className={`text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty} • {challenge.points} pts
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4">
                  {challenge.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Challenge #{(index + 1).toString().padStart(2, '0')}
                  </span>
                  {isSolved && (
                    <span className="text-xs text-green-400 font-medium">
                      Completed ✓
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Challenge Modal */}
        <AnimatePresence>
          {selectedChallenge && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-start mb-6">
                  <Binary className="w-10 h-10 text-red-400 mr-4 flex-shrink-0" />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedChallenge.title}
                    </h2>
                    <p className={`text-sm font-medium ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                      {selectedChallenge.difficulty} • {selectedChallenge.points} points
                    </p>
                  </div>
                </div>

                <p className="text-gray-400 mb-6">
                  {selectedChallenge.description}
                </p>

                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">
                      <p className="font-semibold text-white mb-1">Challenge Objective:</p>
                      <p>Analyze the provided binary and find the hidden flag. Use tools like Ghidra, IDA, or GDB to reverse engineer the binary.</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Submit Flag:
                  </label>
                  <input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter the flag..."
                    className="w-full bg-black/50 border border-red-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 font-mono text-sm"
                  />
                </div>

                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center p-4 rounded-lg mb-6 ${isCorrect
                      ? 'bg-green-500/10 border border-green-500/30'
                      : 'bg-red-500/10 border border-red-500/30'
                      }`}
                  >
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 mr-3" />
                    )}
                    <span className={isCorrect ? 'text-green-300' : 'text-red-300'}>
                      {feedback}
                    </span>
                  </motion.div>
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={handleSubmit}
                    variant="primary"
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    Submit Flag
                  </Button>
                  <Button
                    onClick={() => setSelectedChallenge(null)}
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    </div>
  );
};

export default PlaygroundReverse;
