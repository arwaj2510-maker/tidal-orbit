import React, { useState, useEffect } from 'react';
import { PasswordScreen } from './components/PasswordScreen';
import { AudioPlayer } from './components/AudioPlayer';
import { FloatingElements } from './components/FloatingElements';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveCake } from './components/InteractiveCake';
import { PhotoGallery } from './components/PhotoGallery';
import { WishLetters } from './components/WishLetters';
import { ReasonCards } from './components/ReasonCards';
import { WishCollector } from './components/WishCollector';
import { SettingsModal } from './components/SettingsModal';
import { Footer } from './components/Footer';
import { BirthdaySettings } from './types';

const DEFAULT_SETTINGS: BirthdaySettings = {
  recipientName: 'Jagriti',
  nickname: 'Princess',
  passcode: '121222',
  birthDate: '2026-09-10',
  secretMessage: 'Happy Birthday to the most breathtakingly wonderful person in the world! You light up my universe every single day. Wishing you a year full of dreams coming true, endless giggles, and magic!',
  webhookUrl: 'https://ntfy.sh/jagriti-birthday-wishes-121222',
  isUnlocked: false,
};

const STORAGE_KEY = 'birthday_settings_v5';

export function App() {
  const [settings, setSettings] = useState<BirthdaySettings>(() => {
    try {
      localStorage.removeItem('birthday_settings');
      localStorage.removeItem('birthday_settings_v2');
      localStorage.removeItem('birthday_settings_v3');
      localStorage.removeItem('birthday_settings_v4');
    } catch (e) {
      // ignore
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.recipientName || parsed.recipientName === 'Sophia') {
          return DEFAULT_SETTINGS;
        }
        return { ...DEFAULT_SETTINGS, ...parsed, isUnlocked: false };
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...settings, isUnlocked: false })
    );
  }, [settings]);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleLock = () => {
    setIsUnlocked(false);
  };

  const handleSaveSettings = (newSettings: BirthdaySettings) => {
    setSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-rose-50 font-sans relative selection:bg-rose-500 selection:text-white">
      {/* Ambient Floating Elements (Hearts, Sparkles, Stars) */}
      <FloatingElements />

      {/* Password Protection Gatekeeper Screen */}
      {!isUnlocked ? (
        <PasswordScreen
          correctPasscode={settings.passcode}
          recipientName={settings.recipientName}
          onUnlock={handleUnlock}
        />
      ) : (
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Top Sticky Navigation Bar */}
          <Navbar
            recipientName={settings.recipientName}
            onLock={handleLock}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />

          {/* Main Content Sections */}
          <main className="flex-grow">
            {/* Hero Section */}
            <HeroSection
              recipientName={settings.recipientName}
              birthDate={settings.birthDate}
            />

            {/* Interactive Birthday Cake & Candles */}
            <InteractiveCake
              recipientName={settings.recipientName}
              webhookUrl={settings.webhookUrl}
            />

            {/* Photo Gallery Wall */}
            <PhotoGallery recipientName={settings.recipientName} />

            {/* Openable Birthday Secret Letters */}
            <WishLetters
              recipientName={settings.recipientName}
              secretMessage={settings.secretMessage}
            />

            {/* Reasons Why She is Extraordinary */}
            <ReasonCards recipientName={settings.recipientName} />

            {/* Balloon Pop Mini-Game */}
            <WishCollector recipientName={settings.recipientName} />
          </main>

          {/* Persistent Floating Birthday Music Player */}
          <AudioPlayer customAudioUrl={settings.customAudioUrl} autoPlay={true} />

          {/* Customizer Settings Modal */}
          <SettingsModal
            isOpen={isSettingsOpen}
            settings={settings}
            onClose={() => setIsSettingsOpen(false)}
            onSave={handleSaveSettings}
          />

          {/* Footer */}
          <Footer recipientName={settings.recipientName} />
        </div>
      )}
    </div>
  );
}

export default App;
