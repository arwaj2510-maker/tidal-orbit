// Web Audio API Synthesizer for "Happy Birthday" Melody
class BirthdayAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.5;
  private customAudio: HTMLAudioElement | null = null;
  private timerIds: number[] = [];
  private loopIntervalId: number | null = null;

  // Notes for Happy Birthday in C Major:
  // G4 G4 A4 G4 C5 B4
  // G4 G4 A4 G4 D5 C5
  // G4 G4 G5 E5 C5 B4 A4
  // F5 F5 E5 C5 D5 C5
  private notes = [
    { note: 'G4', duration: 0.4 }, { note: 'G4', duration: 0.4 },
    { note: 'A4', duration: 0.8 }, { note: 'G4', duration: 0.8 },
    { note: 'C5', duration: 0.8 }, { note: 'B4', duration: 1.4 },

    { note: 'G4', duration: 0.4 }, { note: 'G4', duration: 0.4 },
    { note: 'A4', duration: 0.8 }, { note: 'G4', duration: 0.8 },
    { note: 'D5', duration: 0.8 }, { note: 'C5', duration: 1.4 },

    { note: 'G4', duration: 0.4 }, { note: 'G4', duration: 0.4 },
    { note: 'G5', duration: 0.8 }, { note: 'E5', duration: 0.8 },
    { note: 'C5', duration: 0.8 }, { note: 'B4', duration: 0.8 },
    { note: 'A4', duration: 1.2 },

    { note: 'F5', duration: 0.4 }, { note: 'F5', duration: 0.4 },
    { note: 'E5', duration: 0.8 }, { note: 'C5', duration: 0.8 },
    { note: 'D5', duration: 0.8 }, { note: 'C5', duration: 1.8 }
  ];

  private noteFrequencies: Record<string, number> = {
    'G4': 392.00,
    'A4': 440.00,
    'B4': 493.88,
    'C5': 523.25,
    'D5': 587.33,
    'E5': 659.25,
    'F5': 698.46,
    'G5': 783.99,
  };

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playNote(freq: number, startTime: number, duration: number) {
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Soft bell / piano tone blending sine and triangle waves
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Envelope: quick attack, smooth decay
      const now = startTime;
      const attack = 0.05;
      const decay = duration * 0.9;

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.4, now + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + attack + decay);

      // Add a subtle overtone for warm music box effect
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, startTime);
      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.linearRampToValueAtTime(this.volume * 0.15, now + attack);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + attack + decay);
    } catch {
      // AudioContext error handling
    }
  }

  public playCustomAudio(url: string) {
    this.stop();
    this.customAudio = new Audio(url);
    this.customAudio.loop = true;
    this.customAudio.volume = this.volume;
    this.customAudio.play().then(() => {
      this.isPlaying = true;
    }).catch(() => {
      // Fallback to synth if external file fails
      this.playSynthMelody();
    });
  }

  public playSynthMelody() {
    this.initCtx();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.clearTimers();

    let currentTime = this.ctx.currentTime + 0.1;
    const tempo = 0.55; // tempo multiplier

    this.notes.forEach((item) => {
      const freq = this.noteFrequencies[item.note];
      if (freq) {
        this.playNote(freq, currentTime, item.duration * tempo);
      }
      currentTime += item.duration * tempo;
    });

    // Schedule loop
    const totalDurationMs = (currentTime - this.ctx.currentTime + 0.5) * 1000;
    const timerId = window.setTimeout(() => {
      if (this.isPlaying) {
        this.playSynthMelody();
      }
    }, totalDurationMs);
    this.timerIds.push(timerId);
  }

  public start(customUrl?: string) {
    if (customUrl && customUrl.trim().length > 5) {
      this.playCustomAudio(customUrl);
    } else {
      this.playSynthMelody();
    }
  }

  public stop() {
    this.isPlaying = false;
    this.clearTimers();
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio.currentTime = 0;
      this.customAudio = null;
    }
  }

  public toggle(customUrl?: string): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start(customUrl);
      return true;
    }
  }

  public setVolume(val: number) {
    this.volume = val;
    if (this.customAudio) {
      this.customAudio.volume = val;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private clearTimers() {
    this.timerIds.forEach(id => clearTimeout(id));
    this.timerIds = [];
    if (this.loopIntervalId) {
      clearInterval(this.loopIntervalId);
      this.loopIntervalId = null;
    }
  }
}

export const birthdayAudio = new BirthdayAudioPlayer();
