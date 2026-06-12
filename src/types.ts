export interface Question {
  id: string;
  type: 'A' | 'B' | 'C'; // A = 2M, B = 13M, C = 15M (Application-oriented)
  question: string;
  answer: string;
  stepByStep?: string[];
  formulaUsed?: string;
  diagramTitle?: string;
}

export interface Unit {
  id: number;
  title: string;
  subtitle: string;
  summary: string;
  formulaSheet: { name: string; formula: string; desc: string }[];
  questions: Question[];
}

export type ThemeType = 'lavender' | 'pink' | 'ocean' | 'mint' | 'obsidian';

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  bgLight: string;
  border: string;
  bgPattern: string;
  bgPage: string;
  heartColor: string;
}
