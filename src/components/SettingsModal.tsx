import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Save, Lock, User, Calendar, Music, FileText, CheckCircle2 } from 'lucide-react';
import { BirthdaySettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  settings: BirthdaySettings;
  onClose: () => void;
  onSave: (newSettings: BirthdaySettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<BirthdaySettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl glass-card-glow border border-rose-300/40 shadow-2xl text-left overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-rose-300 hover:text-white hover:bg-rose-500/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-rose-300/20">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-blush-gold flex items-center justify-center text-slate-950 shadow-md">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-gradient-rose">
              Personalize Birthday Website
            </h3>
            <p className="text-xs text-rose-300/80">Customize name, secret passcode & birthday details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Recipient Name */}
          <div>
            <label className="block text-xs font-bold text-rose-300 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-rose-400" />
              <span>Birthday Girl's Name / Nickname:</span>
            </label>
            <input
              type="text"
              required
              value={formData.recipientName}
              onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-900/80 border border-rose-300/30 text-rose-100 text-sm outline-none focus:border-rose-400"
            />
          </div>

          {/* Passcode */}
          <div>
            <label className="text-xs font-bold text-rose-300 mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              <span>Secret Password (Default: 121222):</span>
            </label>
            <input
              type="text"
              required
              value={formData.passcode}
              onChange={(e) => setFormData({ ...formData, passcode: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-900/80 border border-rose-300/30 text-rose-100 font-mono text-sm outline-none focus:border-rose-400"
            />
          </div>

          {/* Birth Date */}
          <div>
            <label className="block text-xs font-bold text-rose-300 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              <span>Birth Date:</span>
            </label>
            <input
              type="date"
              required
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-900/80 border border-rose-300/30 text-rose-100 text-sm outline-none focus:border-rose-400"
            />
          </div>

          {/* Custom Audio MP3 URL */}
          <div>
            <label className="block text-xs font-bold text-rose-300 mb-1 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-rose-400" />
              <span>Custom Audio / MP3 URL (Optional):</span>
            </label>
            <input
              type="url"
              placeholder="Leave empty to use built-in synth Happy Birthday tune"
              value={formData.customAudioUrl || ''}
              onChange={(e) => setFormData({ ...formData, customAudioUrl: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-900/80 border border-rose-300/30 text-rose-100 text-sm outline-none focus:border-rose-400"
            />
          </div>

          {/* Secret Message Letter */}
          <div>
            <label className="block text-xs font-bold text-rose-300 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-rose-400" />
              <span>Personal Birthday Note Letter:</span>
            </label>
            <textarea
              rows={3}
              value={formData.secretMessage}
              onChange={(e) => setFormData({ ...formData, secretMessage: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-900/80 border border-rose-300/30 text-rose-100 text-sm outline-none focus:border-rose-400 resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-rose-300/20">
            {savedSuccess ? (
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Settings Saved Successfully!
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">Updates live instantly ✨</span>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-rose-400 text-white font-bold text-xs shadow-md hover:from-rose-400 hover:to-rose-300 transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
