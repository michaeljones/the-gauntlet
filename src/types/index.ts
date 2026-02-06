export interface Character {
  id: string;
  name: string;
}

export interface Modifier {
  id: string;
  name: string;
  deprecated?: boolean;
}

export interface Run {
  id: string;
  runNumber: number;
  characterId: string;
  modifierIds: string[];
  outcome: 'win' | 'loss' | null;
  source: 'hardcoded' | 'local';
  timestamp: number;
  youtubeUrl?: string;
}

export interface ModifierPoolState {
  remaining: string[];
}

export interface GauntletStats {
  currentStreak: number;
  longestStreak: number;
  totalLosses: number;
  gauntletComplete: boolean;
}
