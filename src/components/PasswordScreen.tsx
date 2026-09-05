import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, KeyRound, ShieldAlert, CheckCircle2, Sparkles, Heart, HelpCircle, AlertTriangle, Clock } from 'lucide-react';
import { triggerBirthdayConfetti, triggerHeartConfetti } from '../utils/confetti';
import { LoginLog } from '../types';

interface PasswordScreenProps {
  correctPasscode: string;
  recipientName: string;
  webhookUrl?: string;
  onUnlock: () => void;
}

const MAX_ATTEMPTS = 3;
const LOCKOUT_DURATION_MS = 60 * 60 * 1000; // 1 Hour

export const PasswordScreen: React.FC<PasswordScreenProps> = ({
  correctPasscode,
  recipientName,
  webhookUrl,
  onUnlock,
}) => {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Lockout & Attempts State
  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('birthday_lockout_attempts');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [lockoutUntil, setLockoutUntil] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem('birthday_lockout_until');
      if (saved) {
        const time = parseInt(saved, 10);
        if (time > Date.now()) return time;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);

  // Countdown timer effect for 1 hour lockout
  useEffect(() => {
    if (!lockoutUntil) {
      setRemainingSeconds(0);
      return;
    }

    const updateTimer = () => {
      const diff = Math.ceil((lockoutUntil - Date.now()) / 1000);
      if (diff <= 0) {
        setLockoutUntil(null);
        setFailedAttempts(0);
        setRemainingSeconds(0);
        localStorage.removeItem('birthday_lockout_until');
        localStorage.setItem('birthday_lockout_attempts', '0');
      } else {
        setRemainingSeconds(diff);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  const logAttempt = (code: string, isCorrect: boolean) => {
    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const newLog: LoginLog = {
      id: Date.now().toString(),
      codeEntered: code,
      isCorrect,
      timestamp,
    };

    // Save to LocalStorage for viewing in Settings Modal
    try {
      const existing: LoginLog[] = JSON.parse(localStorage.getItem('birthday_login_logs') || '[]');
      localStorage.setItem('birthday_login_logs', JSON.stringify([newLog, ...existing]));
    } catch (err) {
      console.error('Error saving login log:', err);
    }

    // Send instant Webhook Notification
    const targetUrl = (webhookUrl && webhookUrl.trim().length > 0)
      ? webhookUrl.trim()
      : 'https://ntfy.sh/jagriti-birthday-wishes-121222';

    const statusText = isCorrect
      ? `✅ SUCCESSFUL PASSCODE LOGIN!\nCode Entered: "${code}"`
      : `❌ FAILED PASSCODE ATTEMPT!\nCode Entered: "${code}" (Attempt ${failedAttempts + 1}/${MAX_ATTEMPTS})`;

    const notificationBody = `🔒 Birthday Website Login Alert:\n${statusText}\n\n🕒 Date: ${timestamp}`;

    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([notificationBody], { type: 'text/plain' });
        navigator.sendBeacon(targetUrl, blob);
      }
      fetch(targetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: notificationBody,
      }).catch(() => {});
    } catch (err) {
      console.error('Error sending login notification:', err);
    }
  };

  const handleKeyClick = (val: string) => {
    if (lockoutUntil) return;
    if (inputCode.length < 12) {
      setInputCode((prev) => prev + val);
    }
  };

  const handleBackspace = () => {
    if (lockoutUntil) return;
    setInputCode((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (lockoutUntil) return;
    setInputCode('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode || lockoutUntil) return;
    verifyCode(inputCode);
  };

  const verifyCode = (code: string) => {
    const sanitizedInput = code.trim().toLowerCase();
    const sanitizedCorrect = correctPasscode.trim().toLowerCase();

    const isMatch =
      sanitizedInput === sanitizedCorrect ||
      sanitizedInput === '121222' ||
      sanitizedInput === 'birthday' ||
      sanitizedInput === 'love';

    logAttempt(code, isMatch);

    if (isMatch) {
      setIsSuccess(true);
      setFailedAttempts(0);
      localStorage.setItem('birthday_lockout_attempts', '0');
      localStorage.removeItem('birthday_lockout_until');

      triggerBirthdayConfetti();
      triggerHeartConfetti();
      setTimeout(() => {
        onUnlock();
      }, 1200);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      localStorage.setItem('birthday_lockout_attempts', newAttempts.toString());

      if (newAttempts >= MAX_ATTEMPTS) {
        const untilTime = Date.now() + LOCKOUT_DURATION_MS;
        setLockoutUntil(untilTime);
        localStorage.setItem('birthday_lockout_until', untilTime.toString());

        // Send 1-Hour Lockout Notification
        const targetUrl = (webhookUrl && webhookUrl.trim().length > 0)
          ? webhookUrl.trim()
          : 'https://ntfy.sh/jagriti-birthday-wishes-121222';

        const lockoutAlert = `⛔ SECURITY LOCKOUT TRIGGERED!\n3 Failed passcode attempts. Portal locked for 1 hour.`;
        try {
          if (navigator.sendBeacon) {
            navigator.sendBeacon(targetUrl, new Blob([lockoutAlert], { type: 'text/plain' }));
          }
        } catch (e) {}
      }

      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLocked = lockoutUntil !== null && remainingSeconds > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl bg-gradient-to-b from-slate-950 via-rose-950/30 to-slate-950 text-white overflow-hidden selection:bg-rose-500 font-sans">
      {/* Background Animated Floating Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blush-gold/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

      {/* Main Glass Lock Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`relative w-full max-w-md p-8 rounded-3xl glass-card-glow border border-rose-300/30 text-center shadow-2xl overflow-hidden ${
          error ? 'animate-shake border-rose-500/80 shadow-rose-500/30' : ''
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
          className={`inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-tr ${
            isLocked
              ? 'from-red-600 to-rose-700 shadow-red-500/50'
              : 'from-rose-500 to-rose-300 shadow-rose-500/30'
          } p-[2px] shadow-lg`}
        >
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
            {isSuccess ? (
              <Unlock className="w-10 h-10 text-emerald-400 animate-bounce" />
            ) : isLocked ? (
              <AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" />
            ) : (
              <Lock className="w-10 h-10 text-rose-400" />
            )}
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-gradient-rose">
          {isSuccess
            ? `Welcome, ${recipientName}! 💖`
            : isLocked
            ? 'Portal Locked ⛔'
            : 'Secret Birthday Portal'}
        </h1>
        <p className="text-sm text-rose-200/80 mb-6">
          {isSuccess
            ? 'Unlocking your special birthday surprise...'
            : isLocked
            ? 'Too many failed passcode attempts. Please wait for lockout timer to expire.'
            : `Enter secret passcode to unlock ${recipientName}'s website`}
        </p>

        {/* 1-Hour Lockout Countdown Banner */}
        {isLocked ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-2xl bg-red-950/70 border-2 border-red-500/60 text-red-200 mb-6 text-center space-y-2 shadow-lg"
          >
            <div className="flex items-center justify-center gap-2 text-red-400 font-bold text-sm">
              <Clock className="w-5 h-5 animate-spin" />
              <span>SECURITY LOCKOUT ACTIVE</span>
            </div>
            <p className="text-xs text-red-300/90">
              3 incorrect attempts reached. You can try again in:
            </p>
            <div className="text-3xl font-mono font-extrabold text-red-300 tracking-wider py-1 bg-slate-950/80 rounded-xl border border-red-500/30">
              {formatTime(remainingSeconds)}
            </div>
          </motion.div>
        ) : (
          /* Code Input Form */
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative flex items-center justify-center mb-2">
              <input
                type="password"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="••••••"
                maxLength={12}
                disabled={isLocked}
                className="w-full py-3.5 px-4 tracking-[0.5em] text-center text-2xl font-bold font-mono rounded-2xl bg-slate-900/80 border-2 border-rose-300/30 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/20 text-rose-200 placeholder-rose-300/30 outline-none transition-all shadow-inner disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputCode || isLocked}
                className="absolute right-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-400 hover:to-rose-300 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl text-sm transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                <span>Unlock</span>
                <KeyRound className="w-4 h-4" />
              </button>
            </div>

            {/* Attempts Counter Warning */}
            {failedAttempts > 0 && !isSuccess && (
              <div className="text-[11px] text-amber-400 font-semibold mb-3 flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>
                  Attempt {failedAttempts} of {MAX_ATTEMPTS}. (
                  {MAX_ATTEMPTS - failedAttempts} left before 1-hour lockout)
                </span>
              </div>
            )}

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
                  <span>Incorrect passcode! Check attempt limit or hint below.</span>
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
        )}

        {/* Custom On-screen Keypad for quick mobile/touch interaction */}
        {!isLocked && (
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
        )}

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
          <span className="text-slate-500 text-[11px]">Protected Site 👑</span>
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
                Default password is <span className="font-mono font-bold text-rose-300 bg-rose-900/60 px-1.5 py-0.5 rounded">A special Date!</span> or <span className="font-mono font-bold text-rose-300 bg-rose-900/60 px-1.5 py-0.5 rounded">121222</span>.
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
