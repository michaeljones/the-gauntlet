import { describe, it, expect } from 'vitest';
import { computeStats } from '../src/logic/streaks';
import type { Run } from '../src/types';

function makeRun(overrides: Partial<Run> & { outcome: Run['outcome'] }): Run {
  return {
    id: crypto.randomUUID(),
    runNumber: 1,
    characterId: 0,
    modifierIds: [0, 1, 2, 3, 4],
    source: 'hardcoded',
    timestamp: Date.now(),
    ...overrides,
  };
}

describe('computeStats', () => {
  it('returns zeros for empty runs', () => {
    const stats = computeStats([]);
    expect(stats.currentStreak).toBe(0);
    expect(stats.longestStreak).toBe(0);
    expect(stats.totalLosses).toBe(0);
    expect(stats.gauntletComplete).toBe(false);
  });

  it('counts a single win', () => {
    const stats = computeStats([makeRun({ outcome: 'win' })]);
    expect(stats.currentStreak).toBe(1);
    expect(stats.longestStreak).toBe(1);
    expect(stats.totalLosses).toBe(0);
  });

  it('counts a single loss', () => {
    const stats = computeStats([makeRun({ outcome: 'loss' })]);
    expect(stats.currentStreak).toBe(0);
    expect(stats.longestStreak).toBe(0);
    expect(stats.totalLosses).toBe(1);
  });

  it('resets streak on loss', () => {
    const runs = [
      makeRun({ outcome: 'win' }),
      makeRun({ outcome: 'win' }),
      makeRun({ outcome: 'loss' }),
      makeRun({ outcome: 'win' }),
    ];
    const stats = computeStats(runs);
    expect(stats.currentStreak).toBe(1);
    expect(stats.longestStreak).toBe(2);
    expect(stats.totalLosses).toBe(1);
  });

  it('ignores pending runs', () => {
    const runs = [
      makeRun({ outcome: 'win' }),
      makeRun({ outcome: null }),
    ];
    const stats = computeStats(runs);
    expect(stats.currentStreak).toBe(1);
    expect(stats.longestStreak).toBe(1);
    expect(stats.totalLosses).toBe(0);
  });

  it('detects gauntlet complete at 12 consecutive wins', () => {
    const runs = Array.from({ length: 12 }, (_, i) =>
      makeRun({ outcome: 'win', characterId: i }),
    );
    const stats = computeStats(runs);
    expect(stats.currentStreak).toBe(12);
    expect(stats.gauntletComplete).toBe(true);
  });

  it('gauntlet not complete at 11 wins', () => {
    const runs = Array.from({ length: 11 }, (_, i) =>
      makeRun({ outcome: 'win', characterId: i }),
    );
    const stats = computeStats(runs);
    expect(stats.currentStreak).toBe(11);
    expect(stats.gauntletComplete).toBe(false);
  });

  it('tracks longest streak across multiple loss resets', () => {
    const runs = [
      makeRun({ outcome: 'win' }),
      makeRun({ outcome: 'win' }),
      makeRun({ outcome: 'win' }),
      makeRun({ outcome: 'loss' }),
      makeRun({ outcome: 'win' }),
      makeRun({ outcome: 'win' }),
      makeRun({ outcome: 'loss' }),
      makeRun({ outcome: 'win' }),
    ];
    const stats = computeStats(runs);
    expect(stats.currentStreak).toBe(1);
    expect(stats.longestStreak).toBe(3);
    expect(stats.totalLosses).toBe(2);
  });
});
