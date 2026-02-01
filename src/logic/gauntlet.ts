import type { Run } from '../types';
import { CHARACTERS } from '../data/characters';

export function getNextCharacterId(runs: Run[]): number {
  if (runs.length === 0) return 0;
  const lastRun = runs[runs.length - 1];
  return (lastRun.characterId + 1) % CHARACTERS.length;
}
