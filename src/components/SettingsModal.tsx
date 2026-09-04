import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Save, Lock, User, Calendar, Music, FileText, CheckCircle2, MessageSquare, Trash2, Bell, Copy } from 'lucide-react';
import { BirthdaySettings, SecretWish } from '../types';

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
  const [savedWishes, setSavedWishes] = useState<SecretWish[]>([]);
  const [activeTab, setActiveTab] = useState<'settings' | 'wishes'>('settings');

  useEffect(() => {
    if (isOpen) {
      setFormData({ ...settings });
      // Load saved secret wishes from LocalStorage
      try {
        const wishes: SecretWish[] = JSON.parse(localStorage.getItem('birthday_secret_wishes') || '[]');
        setSavedWishes(wishes);
      } catch (err) {
        setSavedWishes([]);
      }
    }
  }, [isOpen, settings]);

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

  const handleClearWishes = () => {
    if (window.confirm('Are you sure you want to clear all recorded secret wishes?')) {
      localStorage.removeItem('birthday_secret_wishes');
      setSavedWishes([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl glass-card-glow border border-rose-300/40 shadow-2xl text-left overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-rose-300 hover:text-white hover:bg-rose-500/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-rose-300/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-blush-gold flex items-center justify-center text-slate-950 shadow-md">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-gradient-rose">
                Website Control Center
              </h3>
              <p className="text-xs text-rose-300/80">Customize details & view submitted secret wishes</p>
            </div>
          </div>
        </div>

        {/* Tabs navigation */}
        <div className="flex gap-2 mb-4 p-1 rounded-xl bg-slate-900/80 border border-rose-300/20">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-rose-300 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Site Customizer</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wishes')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 relative ${
              activeTab === 'wishes'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-rose-300 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Secret Wishes Inbox ({savedWishes.length})</span>
            {savedWishes.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute top-1 right-2" />
            )}
          </button>
        </div>

        {activeTab === 'settings' ? (
          <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
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
              <label className="block text-xs font-bold text-rose-300 mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-rose-400" />
                <span>Secret Passcode (Default: 121222):</span>
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

            {/* Optional Discord / Webhook URL */}
            <div>
              <label className="block text-xs font-bold text-rose-300 mb-1 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span>Instant Wish Notification Webhook (Discord / Telegram Webhook URL):</span>
              </label>
              <input
                type="url"
                placeholder="Optional: Paste Discord Webhook URL to get instant notifications on phone"
                value={formData.webhookUrl || ''}
                onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900/80 border border-rose-300/30 text-rose-100 text-xs outline-none focus:border-rose-400 placeholder-rose-300/30"
              />
            </div>

            {/* Secret Message Letter */}
            <div>
              <label className="block text-xs font-bold text-rose-300 mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-rose-400" />
                <span>Personal Birthday Letter Note:</span>
              </label>
              <textarea
                rows={3}
                value={formData.secretMessage}
                onChange={(e) => setFormData({ ...formData, secretMessage: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900/80 border border-rose-300/30 text-rose-100 text-sm outline-none focus:border-rose-400 resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-rose-300/20">
              {savedSuccess ? (
                <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  Settings Saved!
                </span>
              ) : (
                <span className="text-[11px] text-slate-400">Updates live instantly 🔒</span>
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
        ) : (
          /* Secret Wishes Inbox View */
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Submitted Wishes Inbox
              </span>
              {savedWishes.length > 0 && (
                <button
                  onClick={handleClearWishes}
                  className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-200 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Inbox</span>
                </button>
              )}
            </div>

            {savedWishes.length === 0 ? (
              <div className="text-center py-10 px-4 rounded-2xl bg-slate-900/60 border border-rose-300/10">
                <MessageSquare className="w-10 h-10 text-rose-400/40 mx-auto mb-2" />
                <p className="text-xs text-rose-200 font-medium">No secret wishes submitted yet!</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  When {formData.recipientName} blows the candles and types a wish, it will appear right here!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedWishes.map((w) => (
                  <div
                    key={w.id}
                    className="p-4 rounded-2xl bg-slate-900/90 border border-rose-400/30 text-left relative group shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-amber-300/90 font-semibold">
                        📅 {w.date}
                      </span>
                      <button
                        onClick={() => navigator.clipboard.writeText(w.text)}
                        className="text-xs text-rose-300 hover:text-white flex items-center gap-1"
                        title="Copy wish text"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                    </div>
                    <p className="font-serif italic text-sm text-rose-100 leading-relaxed">
                      "{w.text}"
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-3 border-t border-rose-300/10 text-center">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-slate-900 text-rose-300 text-xs font-semibold hover:text-white"
              >
                Close Inbox
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
