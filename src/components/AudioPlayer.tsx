import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Music, Volume2, VolumeX, Sparkles, Disc } from 'lucide-react';
import { birthdayAudio } from '../utils/audioSynth';

interface AudioPlayerProps {
  customAudioUrl?: string;
  autoPlay?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ customAudioUrl, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        handleToggleMusic();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  const handleToggleMusic = () => {
    const nextState = birthdayAudio.toggle(customAudioUrl);
    setIsPlaying(nextState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    birthdayAudio.setVolume(val);
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      birthdayAudio.setVolume(volume || 0.5);
      setIsMuted(false);
    } else {
      birthdayAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 font-sans">
      {/* Floating Audio Controller Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative flex items-center gap-3 p-2.5 px-4 rounded-full glass-card-glow border border-rose-300/30 shadow-2xl backdrop-blur-xl group hover:border-rose-400/50 transition-all"
      >
        {/* Animated Disc / Music Note Icon */}
        <div className="relative flex items-center justify-center">
          <Disc
            className={`w-7 h-7 text-rose-300 transition-transform ${
              isPlaying ? 'animate-spin-slow text-rose-400' : 'opacity-70'
            }`}
          />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          )}
        </div>

        {/* Status Text & Visualizer Bars */}
        <div className="flex flex-col min-w-[100px]">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold tracking-wider text-rose-100 uppercase">
              {isPlaying ? 'Birthday Music' : 'Music Off'}
            </span>
            <Sparkles className="w-3 h-3 text-blush-gold animate-pulse" />
          </div>

          {/* Sound wave animated equalizer bars when playing */}
          <div className="flex items-end gap-1 h-3 mt-1">
            {[0.4, 0.9, 0.5, 0.8, 0.3, 0.7].map((height, idx) => (
              <span
                key={idx}
                className={`w-1 rounded-full bg-gradient-to-t from-rose-500 to-rose-300 transition-all ${
                  isPlaying ? 'animate-bounce' : 'h-1 opacity-30'
                }`}
                style={{
                  height: isPlaying ? `${height * 100}%` : '20%',
                  animationDuration: `${0.4 + idx * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Start / Stop Button with prominent Icon */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleMusic}
          title={isPlaying ? 'Stop Birthday Music' : 'Start Birthday Music'}
          className={`flex items-center justify-center w-11 h-11 rounded-full text-white shadow-lg transition-all ${
            isPlaying
              ? 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 ring-2 ring-rose-400/50 shadow-rose-500/40'
              : 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 ring-2 ring-emerald-300/40 shadow-emerald-500/30'
          }`}
        >
          {isPlaying ? (
            <Square className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </motion.button>

        {/* Volume Slider Popup Toggle */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowVolume(!showVolume)}
            className="p-1.5 text-rose-200/80 hover:text-white rounded-full hover:bg-rose-500/20 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Expanded Volume Slider */}
          <AnimatePresence>
            {showVolume && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: -50 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                className="absolute right-0 bottom-full mb-2 p-3 rounded-2xl glass-card border border-rose-300/30 shadow-xl flex items-center gap-2"
              >
                <button
                  type="button"
                  onClick={handleMuteToggle}
                  className="text-rose-300 hover:text-white"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-rose-400 cursor-pointer h-1.5 rounded-lg bg-slate-800"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
