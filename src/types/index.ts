export type PhotoCategory = 'memories' | 'smiles' | 'cutiee' | 'unforgettable' | 'unforgettables';

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  date?: string;
  likes: number;
  category: PhotoCategory;
}

export interface WishLetter {
  id: string;
  title: string;
  sender: string;
  content: string;
  isUnlocked: boolean;
  tag: string;
}

export interface ReasonItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Balloon {
  id: number;
  color: string;
  message: string;
  x: number; // horizontal percentage
  speed: number;
  popped: boolean;
}

export interface BirthdaySettings {
  recipientName: string;
  nickname: string;
  passcode: string;
  birthDate: string; // YYYY-MM-DD
  customAudioUrl?: string;
  secretMessage: string;
  isUnlocked: boolean;
}
