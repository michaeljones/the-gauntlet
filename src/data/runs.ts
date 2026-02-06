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
    youtubeUrl: 'https://www.youtube.com/watch?v=Hh0LFXwM4jc',
  },
  {
    id: "2",
    runNumber: 2,
    characterId: 'pied-piper',
    modifierIds: ['inflation', 'lack-of-inspiration', 'corruption', 'disease', 'berserker-foes'],
    outcome: 'win',
    source: 'hardcoded',
    timestamp: 1,
    youtubeUrl: 'https://www.youtube.com/watch?v=Hh0LFXwM4jc',
  },
  {
    id: "3",
    runNumber: 3,
    characterId: 'beowulf',
    modifierIds: ['inflation', 'lack-of-inspiration', 'angry-birds', 'oppressive-nightmare', 'berserker-foes'],
    outcome: 'win',
    source: 'hardcoded',
    timestamp: 1,
    youtubeUrl: 'https://www.youtube.com/watch?v=whm6NmEN9cA',
  },
  {
    id: "4",
    runNumber: 4,
    characterId: 'the-snow-queen',
    modifierIds: ['invigorating-death', 'dried-up-fountains', 'corruption', 'disease', 'bloodlust'],
    outcome: 'win',
    source: 'hardcoded',
    timestamp: 1,
    youtubeUrl: 'https://www.youtube.com/watch?v=_CO5laVC6Bg',
  },
];
