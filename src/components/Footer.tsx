import React from 'react';
import { Heart, Sparkles, Crown, ChevronUp } from 'lucide-react';

interface FooterProps {
  recipientName: string;
}

export const Footer: React.FC<FooterProps> = ({ recipientName }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 border-t border-rose-300/15 bg-slate-950/80 backdrop-blur-md text-center font-sans">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Crown & Brand */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-blush-gold p-0.5 mb-4 shadow-lg shadow-rose-500/30 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-rose-300">
            <Crown className="w-6 h-6 text-rose-300 animate-pulse" />
          </div>
        </div>

        <h3 className="font-serif text-2xl font-bold text-gradient-rose mb-2">
          Made Special For {recipientName} ✨👑
        </h3>
        <p className="text-xs text-rose-200/70 max-w-md mx-auto mb-6">
          Wishing you a magnificent birthday filled with endless laughter, glowing warmth, and everlasting joy!
        </p>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-card border border-rose-300/30 text-rose-300 text-xs font-semibold hover:bg-rose-500/20 hover:text-white transition-all mb-8 shadow-md"
        >
          <span>Back To Top</span>
          <ChevronUp className="w-3.5 h-3.5" />
        </button>

        {/* Bottom copyright line */}
        <div className="flex items-center justify-center gap-2 text-xs text-rose-400/60 pt-6 border-t border-rose-300/10 w-full">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-bounce" />
          <span>for a truly special birthday</span>
        </div>
      </div>
    </footer>
  );
};
