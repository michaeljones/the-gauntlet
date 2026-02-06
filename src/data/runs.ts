import type { Run } from '../types';

// Runs should be ordered chronologically
export const HARDCODED_RUNS: Run[] = [
  {
    id: "1",
    runNumber: 1,
    characterId: 'scarlet',
    modifierIds: ['dried-up-fountains', 'bloodlust', 'invigorating-death', 'angry-birds', 'shadowy-fog'],
    outcome: 'loss',
    source: 'hardcoded',
    timestamp: 0,
  },
  {
    id: "2",
    runNumber: 2,
    characterId: 'pied-piper',
    modifierIds: ['inflation', 'lack-of-inspiration', 'corruption', 'disease', 'berserker-foes'],
    outcome: 'win',
    source: 'hardcoded',
    timestamp: 1,
  },
];
