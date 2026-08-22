import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, Sparkles, Heart, RefreshCw, Trophy, Flame } from 'lucide-react';
import { Balloon } from '../types';
import { triggerBirthdayConfetti, triggerHeartConfetti } from '../utils/confetti';

interface WishCollectorProps {
  recipientName: string;
}

const MESSAGES = [
  'You have the sweetest smile ever! 😊',
  'You make everyone around you so happy! ✨',
  'May your year be filled with pure joy & dreams coming true! 🌟',
  'You are brilliant, beautiful, and wonderful! 💖',
  'Sending you the warmest birthday hugs! 🤗',
  'Keep shining bright like a star! 👑',
  'Always stay as sweet as you are! 🍬',
  'Best birthday wishes to a true princess! 🎂',
];

const COLORS = [
  'from-pink-500 to-rose-400',
  'from-amber-400 to-yellow-500',
  'from-purple-500 to-pink-500',
  'from-rose-400 to-blush-deep',
  'from-red-400 to-rose-600',
];

export const WishCollector: React.FC<WishCollectorProps> = ({ recipientName }) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [revealedMessages, setRevealedMessages] = useState<string[]>([]);

  const initBalloons = () => {
    const newBalloons: Balloon[] = Array.from({ length: 8 }).map((_, idx) => ({
      id: idx,
      color: COLORS[idx % COLORS.length],
      message: MESSAGES[idx % MESSAGES.length],
      x: 10 + (idx * 11) % 80,
      speed: 10 + (idx * 2) % 8,
      popped: false,
    }));
    setBalloons(newBalloons);
    setPoppedCount(0);
    setRevealedMessages([]);
  };

  useEffect(() => {
    initBalloons();
  }, []);

  const handlePopBalloon = (id: number, msg: string) => {
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
    setPoppedCount((prev) => prev + 1);
    setRevealedMessages((prev) => [msg, ...prev]);

    triggerHeartConfetti();

    if (poppedCount + 1 === balloons.length) {
      triggerBirthdayConfetti();
    }
  };

  return (
    <section id="balloon-section" className="py-20 px-4 max-w-6xl mx-auto font-sans relative overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-rose-300/30 text-rose-300 text-xs font-bold uppercase tracking-widest mb-3">
          <PartyPopper className="w-4 h-4 text-blush-gold" />
          <span>Interactive Surprise Game</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-gradient-rose">
          Pop The Birthday Balloons! 🎈
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base max-w-xl mx-auto mt-2">
          Click on the floating birthday balloons to pop them and unlock hidden sweet birthday compliments! ✨
        </p>

        {/* Game Stats Badge */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="px-4 py-2 rounded-full glass-card border border-rose-300/30 text-rose-200 font-bold text-xs flex items-center gap-2">
            <Trophy className="w-4 h-4 text-blush-gold" />
            <span>Popped: {poppedCount} / {balloons.length}</span>
          </div>

          <button
            onClick={initBalloons}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-950/60 border border-rose-400/30 text-rose-300 hover:text-white hover:bg-rose-900/80 text-xs font-semibold transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Balloons</span>
          </button>
        </div>
      </div>

      {/* Floating Balloon Canvas Box */}
      <div className="relative w-full h-[420px] rounded-3xl glass-card-glow border border-rose-300/30 overflow-hidden my-6 flex items-center justify-center">
        {/* Floating Balloons */}
        {balloons.map((balloon) => (
          <React.Fragment key={balloon.id}>
            {!balloon.popped && (
              <motion.div
                initial={{ y: 350, x: `${balloon.x}%`, opacity: 0.9 }}
                animate={{
                  y: [-20, 350],
                  x: [`${balloon.x}%`, `${(balloon.x + 8) % 85}%`, `${balloon.x}%`],
                }}
                transition={{
                  y: { duration: balloon.speed, repeat: Infinity, ease: 'linear' },
                  x: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                }}
                onClick={() => handlePopBalloon(balloon.id, balloon.message)}
                className="absolute cursor-pointer flex flex-col items-center group"
              >
                {/* Balloon Body */}
                <div
                  className={`w-20 h-24 rounded-full bg-gradient-to-tr ${balloon.color} shadow-xl shadow-rose-500/20 relative flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <div className="absolute top-2 left-4 w-4 h-8 bg-white/40 rounded-full blur-[1px]" />
                  <Heart className="w-6 h-6 text-white/70" />
                </div>
                {/* Balloon Knot & String */}
                <div className="w-2 h-2 bg-rose-600 rounded-full -mt-0.5" />
                <div className="w-0.5 h-14 bg-rose-300/50" />
              </motion.div>
            )}
          </React.Fragment>
        ))}

        {/* Popped All Victory Screen */}
        {poppedCount === balloons.length && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-6 bg-slate-950/80 rounded-2xl border border-rose-400/40 backdrop-blur-md"
          >
            <Trophy className="w-12 h-12 text-blush-gold mx-auto mb-2 animate-bounce" />
            <h3 className="font-serif text-2xl font-bold text-gradient-rose">
              All Balloons Popped! 🎉
            </h3>
            <p className="text-xs text-rose-200 mt-1">
              You've unlocked every single birthday surprise! You are amazing! 💖
            </p>
          </motion.div>
        )}
      </div>

      {/* Revealed Messages List */}
      <AnimatePresence>
        {revealedMessages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-2xl glass-card border border-rose-300/30 max-w-2xl mx-auto text-center"
          >
            <h4 className="text-xs font-bold text-rose-300 uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blush-gold" />
              <span>Unlocked Birthday Wishes:</span>
            </h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {revealedMessages.map((msg, idx) => (
                <motion.span
                  key={idx}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-3.5 py-1.5 rounded-full bg-rose-950/60 border border-rose-400/30 text-rose-100 text-xs font-medium font-serif italic"
                >
                  "{msg}"
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
