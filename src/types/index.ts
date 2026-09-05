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
  x: number;
  speed: number;
  popped: boolean;
}

export interface SecretWish {
  id: string;
  text: string;
  date: string;
}

export interface LoginLog {
  id: string;
  codeEntered: string;
  isCorrect: boolean;
  timestamp: string;
}

export interface BirthdaySettings {
  recipientName: string;
  nickname: string;
  passcode: string;
  birthDate: string;
  customAudioUrl?: string;
  secretMessage: string;
  webhookUrl?: string;
  isUnlocked: boolean;
}
