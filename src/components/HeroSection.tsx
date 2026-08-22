import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Gift, Flame, PartyPopper, Calendar, Clock, Crown } from 'lucide-react';
import { triggerBirthdayConfetti, triggerHeartConfetti } from '../utils/confetti';

interface HeroSectionProps {
  recipientName: string;
  birthDate: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ recipientName, birthDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let target = new Date(birthDate);

      // Set target to current year or next year if passed
      target.setFullYear(now.getFullYear());
      if (now.getTime() > target.getTime() + 86400000) {
        target.setFullYear(now.getFullYear() + 1);
      }

      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [birthDate]);

  const handleCelebrateClick = () => {
    triggerBirthdayConfetti();
    triggerHeartConfetti();
  };

  const scrollToCake = () => {
    const el = document.getElementById('cake-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-4 py-16 text-center overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-blush-gold/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Crown Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-rose-300/30 mb-8 shadow-lg shadow-rose-500/10"
      >
        <Crown className="w-4 h-4 text-blush-gold animate-bounce" />
        <span className="text-xs font-bold tracking-widest text-rose-200 uppercase">
          Happy Birthday Princess
        </span>
        <Sparkles className="w-4 h-4 text-rose-300 animate-pulse" />
      </motion.div>

      {/* Main Title Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gradient-rose tracking-tight max-w-5xl mb-6 leading-tight"
      >
        Happy Birthday, <br />
        <span className="font-cursive text-rose-300 font-normal hover:text-blush-pink transition-colors">
          {recipientName}! 👑✨
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-base sm:text-lg md:text-xl text-rose-100/90 max-w-2xl mx-auto mb-10 font-sans leading-relaxed"
      >
        May your day be filled with endless laughter, magical surprises, glowing joy, and all the happiness your gorgeous heart deserves! 💖✨
      </motion.p>

      {/* Countdown Timer Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-xl mx-auto mb-12 p-6 rounded-3xl glass-card-glow border border-rose-300/30 shadow-2xl"
      >
        <div className="flex items-center justify-center gap-2 mb-4 text-xs font-bold tracking-widest text-rose-300 uppercase">
          <Clock className="w-4 h-4 text-rose-400" />
          <span>Birthday Celebration Countdown</span>
        </div>

        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900/60 border border-rose-300/15 shadow-inner"
            >
              <span className="font-mono text-2xl sm:text-4xl font-bold text-gradient-gold">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-rose-300/70 mt-1 uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <button
          onClick={scrollToCake}
          className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-rose-400 to-blush-deep text-white font-bold text-base shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all group"
        >
          <Flame className="w-5 h-5 text-yellow-300 group-hover:animate-bounce" />
          <span>Blow Birthday Candles</span>
        </button>

        <button
          onClick={handleCelebrateClick}
          className="flex items-center gap-2 px-8 py-4 rounded-full glass-card border border-rose-300/40 text-rose-100 font-bold text-base hover:bg-rose-500/20 hover:border-rose-400 hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          <PartyPopper className="w-5 h-5 text-blush-gold" />
          <span>Surprise Confetti!</span>
        </button>
      </motion.div>
    </section>
  );
};
