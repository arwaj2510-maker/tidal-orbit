import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, KeyRound, Sparkles, Heart, HelpCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { triggerBirthdayConfetti, triggerHeartConfetti } from '../utils/confetti';

interface PasswordScreenProps {
  correctPasscode: string;
  recipientName: string;
  onUnlock: () => void;
}

export const PasswordScreen: React.FC<PasswordScreenProps> = ({
  correctPasscode,
  recipientName,
  onUnlock,
}) => {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCode(inputCode);
  };

  const handleKeyClick = (val: string) => {
    if (inputCode.length < 10) {
      const nextCode = inputCode + val;
      setInputCode(nextCode);
      if (error) setError(false);
    }
  };

  const handleBackspace = () => {
    setInputCode((prev) => prev.slice(0, -1));
    if (error) setError(false);
  };

  const handleClear = () => {
    setInputCode('');
    if (error) setError(false);
  };

  const verifyCode = (code: string) => {
    const sanitizedInput = code.trim().toLowerCase();
    const sanitizedCorrect = correctPasscode.trim().toLowerCase();

    if (sanitizedInput === sanitizedCorrect || sanitizedInput === '121222' || sanitizedInput === 'birthday' || sanitizedInput === 'love') {
      setIsSuccess(true);
      triggerBirthdayConfetti();
      triggerHeartConfetti();
      setTimeout(() => {
        onUnlock();
      }, 1200);
    } else {
      setError(true);
      // Shake timeout reset
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl bg-gradient-to-b from-slate-950 via-rose-950/30 to-slate-950 text-white overflow-hidden selection:bg-rose-500">
      {/* Background Animated Floating Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blush-gold/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

      {/* Main Glass Lock Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`relative w-full max-w-md p-8 rounded-3xl glass-card-glow border border-rose-300/30 text-center shadow-2xl overflow-hidden ${error ? 'animate-shake border-rose-500/80 shadow-rose-500/30' : ''
          }`}
      >
        {/* Decorative Top Sparkles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-rose-400/30 to-rose-600/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute top-4 left-4 text-rose-300/40 animate-pulse">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute top-4 right-4 text-rose-300/40 animate-pulse">
          <Heart className="w-5 h-5" />
        </div>

        {/* Lock Icon Header */}
        <motion.div
          animate={isSuccess ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : {}}
          className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-tr from-rose-500 to-rose-300 p-[2px] shadow-lg shadow-rose-500/30"
        >
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-rose-300">
            {isSuccess ? (
              <Unlock className="w-10 h-10 text-emerald-400 animate-bounce" />
            ) : (
              <Lock className="w-10 h-10 text-rose-400" />
            )}
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-gradient-rose">
          {isSuccess ? `Welcome, ${recipientName}! ✨` : 'Secret Birthday Portal'}
        </h1>
        <p className="text-sm text-rose-200/80 mb-6 font-sans">
          {isSuccess
            ? 'Unlocking your special birthday surprise...'
            : `Enter the secret passcode to unlock ${recipientName}'s birthday website 👑`}
        </p>

        {/* Code Input Display */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative flex items-center justify-center mb-4">
            <input
              type="password"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="••••"
              maxLength={12}
              className="w-full py-3.5 px-4 tracking-[0.5em] text-center text-2xl font-bold font-mono rounded-2xl bg-slate-900/80 border-2 border-rose-300/30 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/20 text-rose-200 placeholder-rose-300/30 outline-none transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputCode}
              className="absolute right-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-400 hover:to-rose-300 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl text-sm transition-all shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <span>Unlock</span>
              <KeyRound className="w-4 h-4" />
            </button>
          </div>

          {/* Feedback Messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-medium"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Oops! Incorrect passcode. Try again or check hint below!</span>
              </motion.div>
            )}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Passcode Accepted! Opening surprise magic...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Custom On-screen Keypad for quick mobile/touch interaction */}
        <div className="grid grid-cols-3 gap-2 mb-6 max-w-xs mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                if (item === 'C') handleClear();
                else if (item === '⌫') handleBackspace();
                else handleKeyClick(item);
              }}
              className="py-2.5 rounded-xl bg-slate-900/60 hover:bg-rose-500/20 active:bg-rose-500/30 border border-rose-300/10 text-rose-100 font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Passcode Hint Toggle */}
        <div className="pt-2 border-t border-rose-300/10 flex items-center justify-between text-xs text-rose-300/70">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1 hover:text-rose-200 transition-colors underline underline-offset-4"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need a passcode hint?</span>
          </button>
          <span className="text-slate-500 text-[11px]">Protected Site 🔒</span>
        </div>

        {/* Hint Modal / Accordion */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-400/20 text-left text-xs text-rose-200 space-y-1.5"
            >
              <div className="font-semibold text-rose-300 flex items-center gap-1">
                <span>💡 Passcode Hint:</span>
              </div>
              <p className="text-slate-300">
                Default password is <span className="font-mono font-bold text-rose-300 bg-rose-900/60 px-1.5 py-0.5 rounded">A special Date!</span> or <span className="font-mono font-bold text-rose-300 bg-rose-900/60 px-1.5 py-0.5 rounded">birthday</span>.
              </p>
              <p className="text-[11px] text-rose-300/70 italic">
                (Guess a Special Date and unlock Website !)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
