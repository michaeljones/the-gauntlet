import type { Run } from '../types';
import { CHARACTERS } from '../data/characters';

export function getNextCharacterId(runs: Run[]): string {
  if (runs.length === 0) return CHARACTERS[0].id;
  const lastRun = runs[runs.length - 1];
  const lastIndex = CHARACTERS.findIndex((c) => c.id === lastRun.characterId);
  const nextIndex = (lastIndex + 1) % CHARACTERS.length;
  return CHARACTERS[nextIndex].id;
}
