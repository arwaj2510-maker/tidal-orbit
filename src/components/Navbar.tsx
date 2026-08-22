import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Heart, Sparkles, Lock, Settings, Gift } from 'lucide-react';

interface NavbarProps {
  recipientName: string;
  onLock: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  recipientName,
  onLock,
  onOpenSettings,
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 w-full px-4 py-3 bg-slate-950/70 backdrop-blur-xl border-b border-rose-300/15 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Name Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-400 to-blush-gold p-0.5 shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-rose-300">
              <Crown className="w-5 h-5 text-rose-300 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg text-gradient-rose tracking-tight leading-tight">
              {recipientName}'s Birthday ✨
            </span>
            <span className="text-[10px] text-rose-300/70 tracking-widest uppercase font-medium">
              Celebration 👑
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full glass-pill border border-rose-300/20">
          {[
            { id: 'cake-section', label: 'Birthday Cake 🎂' },
            { id: 'gallery-section', label: 'Memories 📷' },
            { id: 'letters-section', label: 'Letters 💌' },
            { id: 'balloon-section', label: 'Wish Pop 🎈' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-rose-200/80 hover:text-white hover:bg-rose-500/20 transition-all"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Icons (Settings, Lock) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSettings}
            title="Personalize Website Settings"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill border border-rose-300/30 text-rose-200 text-xs font-medium hover:bg-rose-500/20 hover:border-rose-400/50 transition-all active:scale-95"
          >
            <Settings className="w-3.5 h-3.5 text-rose-300" />
            <span className="hidden sm:inline">Personalize</span>
          </button>

          <button
            onClick={onLock}
            title="Lock Website"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-semibold hover:bg-rose-900/80 hover:text-white transition-all active:scale-95"
          >
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Lock Portal</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};
