import type { Run } from '../types';

// Runs should be ordered chronologically
export const HARDCODED_RUNS: Run[] = [
  {
    id: "1",
    runNumber: 1,
    characterId: 'scarlet',
    modifierIds: [0, 3, 6, 7, 8],
    outcome: 'loss',
    source: 'hardcoded',
    timestamp: 0,
  },
  {
    id: "2",
    runNumber: 2,
    characterId: 'pied-piper',
    modifierIds: [1, 2, 4, 5, 10],
    outcome: 'win',
    source: 'hardcoded',
    timestamp: 1,
  },
];
