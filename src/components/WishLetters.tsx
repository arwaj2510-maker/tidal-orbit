import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, X, Stamp, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { WishLetter } from '../types';
import { triggerHeartConfetti } from '../utils/confetti';

interface WishLettersProps {
  recipientName: string;
  secretMessage: string;
}

export const WishLetters: React.FC<WishLettersProps> = ({ recipientName, secretMessage }) => {
  const letters: WishLetter[] = [
    {
      id: '1',
      title: `A Birthday Note For ${recipientName} 💌`,
      sender: 'Your Manuu',
      tag: 'Heartfelt Wishes',
      content: secretMessage || `Happy Birthday to the most stunning, kind-hearted, and extraordinary girl in the whole world! May this new year bring you infinite laughter, endless happiness, and all your biggest dreams fulfilled! 🌟✨`,
      isUnlocked: true,
    },
    {
      id: '2',
      title: 'Why You Light Up Every Room ✨',
      sender: 'With Endless Admiration',
      tag: 'Sweet Compliments',
      content: `Your laughter is the sweetest melody, your smile can brighten even the darkest days, and your pure heart makes the world a thousand times more beautiful. Never stop shining your magical light! 👑💖`,
      isUnlocked: true,
    },
    {
      id: '3',
      title: 'A Secret Birthday Promise 🌺',
      sender: 'Forever & Always',
      tag: 'Personal Promise',
      content: `My promise to you on your birthday: To always support your dreams, celebrate your victories, cheer you up whenever you're low, and remind you every single day how truly irreplaceable you are! And more than anything, I just want to see you happy. Even if that means I have to stay away from you, I'll accept the distance—because your happiness will always mean more to me than my own. Happy Birthday! 🎂❤️`,
      isUnlocked: true,
    },
  ];

  const [activeLetter, setActiveLetter] = useState<WishLetter | null>(null);

  const handleOpenLetter = (letter: WishLetter) => {
    setActiveLetter(letter);
    triggerHeartConfetti();
  };

  return (
    <section id="letters-section" className="py-20 px-4 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-rose-300/30 text-rose-300 text-xs font-bold uppercase tracking-widest mb-3">
          <Mail className="w-4 h-4 text-rose-400" />
          <span>Secret Love Notes</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-gradient-rose">
          Unseal Your Birthday Letters 💌
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base max-w-xl mx-auto mt-2">
          Tap on any wax-sealed envelope to unseal personal handwritten birthday notes created just for you ✨
        </p>
      </div>

      {/* Letters Envelopes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {letters.map((letter, index) => (
          <motion.div
            key={letter.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            onClick={() => handleOpenLetter(letter)}
            className="group cursor-pointer relative p-6 rounded-3xl glass-card-glow border border-rose-300/30 shadow-2xl flex flex-col justify-between text-center overflow-hidden hover:border-rose-400/60 transition-all"
          >
            {/* Top Tag */}
            <div className="flex justify-center mb-4">
              <span className="px-3 py-1 rounded-full bg-rose-950/80 border border-rose-400/30 text-rose-300 font-semibold text-[11px] uppercase tracking-wider">
                {letter.tag}
              </span>
            </div>

            {/* Envelope Visual with Wax Seal */}
            <div className="relative my-4 flex flex-col items-center">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-rose-900 via-rose-800 to-rose-700 border-2 border-rose-400/40 shadow-inner flex items-center justify-center relative group-hover:scale-105 transition-transform">
                <Mail className="w-12 h-12 text-rose-200 group-hover:text-white transition-colors" />

                {/* Animated Gold Wax Seal */}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 border-2 border-yellow-200 shadow-md flex items-center justify-center text-slate-950 font-bold text-xs animate-pulse">
                  <Stamp className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Letter Title */}
            <div>
              <h3 className="font-serif text-xl font-bold text-gradient-rose mb-2">
                {letter.title}
              </h3>
              <p className="text-xs text-rose-300/70">From: {letter.sender}</p>

              <button className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-400 text-white font-bold text-xs shadow-md group-hover:from-rose-400 group-hover:to-rose-300 transition-all">
                Unseal Letter ✨
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Letter Reading Modal */}
      <AnimatePresence>
        {activeLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="relative w-full max-w-xl p-8 rounded-3xl glass-card-glow border-2 border-rose-300/40 text-left shadow-2xl overflow-hidden"
            >
              {/* Close Icon */}
              <button
                onClick={() => setActiveLetter(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-rose-300 hover:text-white hover:bg-rose-500/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Decorative Header Stamp */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-rose-300/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-blush-gold flex items-center justify-center text-slate-950 font-bold shadow-md">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-gradient-rose">
                    {activeLetter.title}
                  </h3>
                  <span className="text-xs text-rose-300/80 font-mono">
                    Signed: {activeLetter.sender}
                  </span>
                </div>
              </div>

              {/* Letter Content Body */}
              <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-400/20 shadow-inner mb-6">
                <p className="font-cursive text-2xl text-rose-100 leading-relaxed font-semibold">
                  "{activeLetter.content}"
                </p>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between text-xs text-rose-300/70">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blush-gold" />
                  Made with pure love for {recipientName}
                </span>
                <button
                  onClick={() => setActiveLetter(null)}
                  className="px-5 py-2 rounded-full bg-rose-500 text-white font-bold hover:bg-rose-400 transition-colors"
                >
                  Close & Keep Safe 💖
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
