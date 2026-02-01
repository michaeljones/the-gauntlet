import type { Run, GauntletStats } from '../types';
import { CHARACTERS } from '../data/characters';

export function computeStats(runs: Run[]): GauntletStats {
  const completedRuns = runs.filter((r) => r.outcome !== null);

  let currentStreak = 0;
  let longestStreak = 0;
  let totalLosses = 0;
  let streak = 0;

  for (const run of completedRuns) {
    if (run.outcome === 'win') {
      streak++;
      if (streak > longestStreak) {
        longestStreak = streak;
      }
    } else {
      totalLosses++;
      streak = 0;
    }
  }

  currentStreak = streak;

  const gauntletComplete = currentStreak >= CHARACTERS.length;

  return { currentStreak, longestStreak, totalLosses, gauntletComplete };
}
