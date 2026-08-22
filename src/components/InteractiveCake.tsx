import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, Wand2, Heart, RotateCcw, PartyPopper } from 'lucide-react';
import { triggerBirthdayConfetti, triggerHeartConfetti } from '../utils/confetti';

interface InteractiveCakeProps {
  recipientName: string;
}

export const InteractiveCake: React.FC<InteractiveCakeProps> = ({ recipientName }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wish, setWish] = useState('');
  const [showWishModal, setShowWishModal] = useState(false);
  const [wishSubmitted, setWishSubmitted] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesBlown) {
      setCandlesBlown(true);
      triggerBirthdayConfetti();
      triggerHeartConfetti();
      setTimeout(() => {
        setShowWishModal(true);
      }, 700);
    }
  };

  const handleRelight = () => {
    setCandlesBlown(false);
    setWishSubmitted(false);
    setWish('');
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wish.trim()) {
      setWishSubmitted(true);
      triggerBirthdayConfetti();
      setTimeout(() => {
        setShowWishModal(false);
      }, 2000);
    }
  };

  return (
    <section id="cake-section" className="py-20 px-4 relative max-w-5xl mx-auto text-center font-sans">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-rose-300/30 text-rose-300 text-xs font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-4 h-4 text-blush-gold" />
          <span>Interactive Birthday Cake</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-gradient-rose">
          Blow Out The Birthday Candles 🎂
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base max-w-xl mx-auto mt-2">
          Click the candles or tap the button below to blow out the flames, make a secret wish, and celebrate! ✨
        </p>
      </motion.div>

      {/* Cake Container */}
      <div className="relative flex flex-col items-center justify-center min-h-[380px] my-6">
        {/* Glow backdrop */}
        <div className="absolute w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* CSS Multi-tier Birthday Cake */}
        <div className="relative z-10 flex flex-col items-center cursor-pointer group" onClick={handleBlowCandles}>
          {/* Candles Row */}
          <div className="flex items-end justify-center gap-6 mb-1">
            {[1, 2, 3, 4, 5].map((candleIndex) => (
              <div key={candleIndex} className="relative flex flex-col items-center">
                {/* Flame */}
                <AnimatePresence>
                  {!candlesBlown && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0, y: -10 }}
                      className="relative w-5 h-8 mb-0.5 animate-flame"
                    >
                      <div className="w-full h-full rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_15px_rgba(255,165,0,0.9),0_0_30px_rgba(255,215,0,0.6)]" />
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full bg-white opacity-80" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Candle Smoke when blown */}
                {candlesBlown && (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0.8, 0], y: -25 }}
                    transition={{ duration: 1.5 }}
                    className="w-2 h-6 bg-gray-300/60 blur-sm rounded-full mb-1"
                  />
                )}

                {/* Candle Stick */}
                <div className="w-3.5 h-14 rounded-t-md bg-gradient-to-r from-rose-200 via-pink-300 to-rose-200 border border-pink-400/40 shadow-md flex flex-col justify-between py-1">
                  <div className="w-full h-1 bg-rose-400/50" />
                  <div className="w-full h-1 bg-rose-400/50" />
                  <div className="w-full h-1 bg-rose-400/50" />
                </div>
              </div>
            ))}
          </div>

          {/* Tier 1 - Top Tier */}
          <div className="relative w-48 h-20 rounded-t-2xl bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 border-2 border-rose-300/60 shadow-lg flex items-center justify-center overflow-hidden">
            {/* Frosting Drips */}
            <div className="absolute top-0 w-full flex justify-around">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-6 h-4 bg-white/90 rounded-b-full shadow-sm" />
              ))}
            </div>
            <span className="font-cursive text-xl text-rose-700 font-bold z-10">
              Happy Birthday
            </span>
          </div>

          {/* Tier 2 - Middle Tier */}
          <div className="relative w-64 h-24 rounded-t-2xl bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 border-2 border-rose-400/60 shadow-xl flex items-center justify-center overflow-hidden -mt-1">
            <div className="absolute top-0 w-full flex justify-around">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-7 h-5 bg-white/90 rounded-b-full shadow-sm" />
              ))}
            </div>
            <div className="flex items-center gap-3 z-10 text-white">
              <Heart className="w-5 h-5 fill-rose-600 text-rose-600 animate-pulse" />
              <span className="font-serif font-bold text-2xl tracking-wide text-rose-950">
                {recipientName}
              </span>
              <Heart className="w-5 h-5 fill-rose-600 text-rose-600 animate-pulse" />
            </div>
          </div>

          {/* Tier 3 - Base Plate */}
          <div className="w-80 h-6 rounded-full bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 border-2 border-amber-300/80 shadow-2xl -mt-1 flex items-center justify-center">
            <div className="w-72 h-2 rounded-full bg-amber-300/40" />
          </div>
        </div>
      </div>

      {/* Blow / Relight Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        {!candlesBlown ? (
          <button
            onClick={handleBlowCandles}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-400 hover:to-rose-300 text-white font-bold text-base shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Wand2 className="w-5 h-5 text-yellow-300" />
            <span>Blow Out Candles 🌬️</span>
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowWishModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-sm shadow-lg hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>{wishSubmitted ? 'View Your Wish 🌟' : 'Make a Wish 🌟'}</span>
            </button>
            <button
              onClick={handleRelight}
              className="flex items-center gap-2 px-5 py-3 rounded-full glass-card border border-rose-300/30 text-rose-200 font-semibold text-sm hover:bg-rose-500/20 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Light Candles Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Wish Popup Modal */}
      <AnimatePresence>
        {showWishModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg p-8 rounded-3xl glass-card-glow border border-rose-300/40 text-center shadow-2xl"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-slate-950 shadow-lg">
                <Sparkles className="w-8 h-8 fill-current" />
              </div>

              <h3 className="font-serif text-3xl font-bold text-gradient-rose mb-2">
                {wishSubmitted ? 'Your Wish is Released! 🌟' : 'Make a Birthday Wish 🌠'}
              </h3>
              <p className="text-xs sm:text-sm text-rose-200/80 mb-6">
                {wishSubmitted
                  ? 'May all your dreams come true and fill your year with sweet magic!'
                  : `Close your eyes, ${recipientName}, think of your secret wish, and type it below:`}
              </p>

              {!wishSubmitted ? (
                <form onSubmit={handleWishSubmit} className="space-y-4">
                  <textarea
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    placeholder="Type your secret birthday wish here..."
                    rows={3}
                    className="w-full p-4 rounded-2xl bg-slate-900/80 border border-rose-300/30 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 text-rose-100 placeholder-rose-300/40 text-sm outline-none transition-all resize-none"
                  />
                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowWishModal(false)}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold text-rose-300 hover:text-white"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      disabled={!wish.trim()}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-400 hover:to-rose-300 disabled:opacity-40 text-white font-bold text-sm shadow-md"
                    >
                      Lock In Wish ✨
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-400/30 text-rose-200 italic font-serif text-base">
                  "{wish}"
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
