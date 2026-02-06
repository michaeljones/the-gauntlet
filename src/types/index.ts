export interface Character {
  id: string;
  name: string;
}

export interface Modifier {
  id: number;
  name: string;
}

export interface Run {
  id: string;
  runNumber: number;
  characterId: string;
  modifierIds: number[];
  outcome: 'win' | 'loss' | null;
  source: 'hardcoded' | 'local';
  timestamp: number;
}

export interface ModifierPoolState {
  remaining: number[];
}

export interface GauntletStats {
  currentStreak: number;
  longestStreak: number;
  totalLosses: number;
  gauntletComplete: boolean;
}
