import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, CheckCircle, XCircle, Info, ArrowLeft } from 'lucide-react';
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

const MOBILE_CHALLENGES: Challenge[] = [
  { id: 'mob-001', title: 'Android APK Analysis', description: 'Analyze Android application structure', difficulty: 'Easy', points: 75 },
  { id: 'mob-002', title: 'Android Decompilation', description: 'Decompile APK to source code', difficulty: 'Easy', points: 100 },
  { id: 'mob-003', title: 'Insecure Data Storage', description: 'Find sensitive data in app storage', difficulty: 'Medium', points: 150 },
  { id: 'mob-004', title: 'API Key Extraction', description: 'Extract hardcoded API keys', difficulty: 'Medium', points: 175 },
  { id: 'mob-005', title: 'Traffic Analysis', description: 'Analyze mobile app network traffic', difficulty: 'Medium', points: 200 },
  { id: 'mob-006', title: 'Deep Link Exploitation', description: 'Exploit deep link vulnerabilities', difficulty: 'Hard', points: 300 },
  { id: 'mob-007', title: 'iOS Binary Analysis', description: 'Analyze iOS application binary', difficulty: 'Hard', points: 350 },
  { id: 'mob-008', title: 'Root Detection Bypass', description: 'Bypass root/jailbreak detection', difficulty: 'Hard', points: 325 },
  { id: 'mob-009', title: 'Runtime Manipulation', description: 'Manipulate app at runtime with Frida', difficulty: 'Expert', points: 500 },
  { id: 'mob-010', title: 'Mobile Security Master', description: 'Ultimate mobile security challenge', difficulty: 'Expert', points: 750 },
];

const PlaygroundMobile = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthState();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('solved-mobile-challenges');
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

    // Simple verification for demo purposes
    if (userInput.toLowerCase().includes('flag')) {
      setIsCorrect(true);
      setFeedback('Correct! Vulnerability exploited.');
      const newSolved = [...solvedChallenges, selectedChallenge.id];
      setSolvedChallenges(newSolved);
      localStorage.setItem('solved-mobile-challenges', JSON.stringify(newSolved));
      setTimeout(() => setSelectedChallenge(null), 2000);
    } else {
      setIsCorrect(false);
      setFeedback('Incorrect. Keep trying!');
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

  const totalPoints = MOBILE_CHALLENGES.reduce((sum, c) => sum + c.points, 0);
  const earnedPoints = MOBILE_CHALLENGES
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
            className="mb-6 text-orange-400 hover:text-orange-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Playground
          </Button>

          <div className="flex items-center justify-center mb-4">
            <Smartphone className="w-12 h-12 text-orange-500 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Mobile Security <span className="text-orange-500">Playground</span>
            </h1>
          </div>

          <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
            Master security assessment techniques for mobile applications
          </p>

          {/* Progress Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/10">
              <div className="text-sm text-gray-400">Challenges Solved</div>
              <div className="text-2xl font-bold text-orange-400">
                {solvedChallenges.length}/{MOBILE_CHALLENGES.length}
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
              <div className="text-2xl font-bold text-orange-400">
                {Math.round((solvedChallenges.length / MOBILE_CHALLENGES.length) * 100)}%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOBILE_CHALLENGES.map((challenge, index) => {
            const isSolved = solvedChallenges.includes(challenge.id);
            return (
              <div
                key={challenge.id}
                onClick={() => handleChallengeClick(challenge)}
                className={`
                  relative group cursor-pointer
                  bg-gradient-to-br from-orange-500/10 to-red-500/10
                  backdrop-blur-sm rounded-xl p-6
                  border ${isSolved ? 'border-green-500/50' : 'border-white/10'}
                  hover:border-orange-500/50 transition-all duration-300
                  hover:shadow-lg hover:shadow-orange-500/20
                  hover:scale-105
                `}
              >
                {isSolved && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                )}

                <div className="flex items-start mb-3">
                  <Smartphone className="w-8 h-8 text-orange-400 mr-3 flex-shrink-0" />
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
                className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-start mb-6">
                  <Smartphone className="w-10 h-10 text-orange-400 mr-4 flex-shrink-0" />
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

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">
                      <p className="font-semibold text-white mb-1">Challenge Objective:</p>
                      <p>Analyze the target mobile application to find vulnerabilities. Focus on insecure storage, hardcoded keys, and logic flaws.</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Submit Flag/Exploit:
                  </label>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter the flag or exploit payload..."
                    className="w-full bg-black/50 border border-orange-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 font-mono text-sm"
                    rows={4}
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
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                  >
                    Submit Solution
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

export default PlaygroundMobile;
