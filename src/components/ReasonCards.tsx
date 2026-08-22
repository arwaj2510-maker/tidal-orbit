import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronLeft, ChevronRight, Crown, Star } from 'lucide-react';
import { ReasonItem } from '../types';

interface ReasonCardsProps {
  recipientName: string;
}

const REASONS: ReasonItem[] = [
  {
    id: 1,
    title: 'Your Magical Smile ✨',
    description: 'The way your eyes light up when you smile can turn any gloomy day into pure sunshine.',
    icon: '😊',
  },
  {
    id: 2,
    title: 'Your Kind & Pure Heart ❤️',
    description: 'You care so genuinely for everyone around you with incredible empathy and warmth.',
    icon: '💖',
  },
  {
    id: 3,
    title: 'Your Infectious Laughter 🎵',
    description: 'Hearing your giggle is hands down the sweetest sound in the entire world.',
    icon: '🎀',
  },
  {
    id: 4,
    title: 'Your Incredible Grace 👑',
    description: 'You carry yourself with poise, elegance, and strength in everything you do.',
    icon: '👑',
  },
  {
    id: 5,
    title: 'Your Unique Charm 🌸',
    description: 'There is literally no one else like you. You are truly one of a kind.',
    icon: '✨',
  },
];

export const ReasonCards: React.FC<ReasonCardsProps> = ({ recipientName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REASONS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REASONS.length) % REASONS.length);
  };

  const currentItem = REASONS[currentIndex];

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto text-center font-sans">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-rose-300/30 text-rose-300 text-xs font-bold uppercase tracking-widest mb-3">
          <Crown className="w-4 h-4 text-blush-gold" />
          <span>Reasons Why You Are Extraordinary</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-gradient-rose">
          Why U are Special {recipientName} 💖
        </h2>
      </div>

      {/* Interactive Card Slider */}
      <div className="relative flex items-center justify-center min-h-[300px]">
        <button
          onClick={handlePrev}
          className="absolute left-0 z-20 p-3 rounded-full glass-card border border-rose-300/30 text-rose-200 hover:text-white hover:bg-rose-500/30 transition-all shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -50 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg p-8 rounded-3xl glass-card-glow border border-rose-300/40 shadow-2xl relative text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-rose-500 to-rose-300 flex items-center justify-center text-3xl shadow-lg shadow-rose-500/20">
              {currentItem.icon}
            </div>

            <span className="text-xs font-bold font-mono text-rose-400 uppercase tracking-wider">
              Reason #{currentItem.id} of {REASONS.length}
            </span>

            <h3 className="font-serif text-2xl font-bold text-gradient-rose my-2">
              {currentItem.title}
            </h3>

            <p className="text-rose-100/90 text-sm sm:text-base leading-relaxed font-serif italic">
              "{currentItem.description}"
            </p>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleNext}
          className="absolute right-0 z-20 p-3 rounded-full glass-card border border-rose-300/30 text-rose-200 hover:text-white hover:bg-rose-500/30 transition-all shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {REASONS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex
                ? 'bg-rose-400 w-8'
                : 'bg-rose-900/60 hover:bg-rose-500/40'
              }`}
          />
        ))}
      </div>
    </section>
  );
};
