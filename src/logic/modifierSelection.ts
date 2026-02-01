import { MODIFIERS } from '../data/modifiers';
import type { ModifierPoolState } from '../types';

const ALL_MODIFIER_IDS = MODIFIERS.map((m) => m.id);
const MODIFIERS_PER_RUN = 5;

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function selectModifiers(pool: ModifierPoolState): {
  selected: number[];
  newPool: ModifierPoolState;
} {
  let remaining = [...pool.remaining];
  let selected: number[];

  if (remaining.length >= MODIFIERS_PER_RUN) {
    const shuffled = shuffleArray(remaining);
    selected = shuffled.slice(0, MODIFIERS_PER_RUN);
    remaining = shuffled.slice(MODIFIERS_PER_RUN);
  } else {
    // Take all remaining, then refill and pick the rest
    const fromCurrent = [...remaining];
    const usedIds = new Set(fromCurrent);
    const refill = ALL_MODIFIER_IDS.filter((id) => !usedIds.has(id));
    const shuffledRefill = shuffleArray(refill);
    const needed = MODIFIERS_PER_RUN - fromCurrent.length;
    const fromRefill = shuffledRefill.slice(0, needed);
    selected = [...fromCurrent, ...fromRefill];
    remaining = shuffledRefill.slice(needed);
  }

  return { selected, newPool: { remaining } };
}

export function reconstructPool(allModifierSelections: number[][]): ModifierPoolState {
  let remaining = [...ALL_MODIFIER_IDS];

  for (const selection of allModifierSelections) {
    // Remove selected modifiers from pool
    const selectedSet = new Set(selection);
    remaining = remaining.filter((id) => !selectedSet.has(id));

    // If pool is now empty or was insufficient, it was refilled during selection
    // We need to simulate the same logic
    if (remaining.length === 0) {
      remaining = [...ALL_MODIFIER_IDS];
      // The modifiers that were picked from the refill are also removed
      // But since we took all remaining before refill, the ones from refill
      // are the ones in selection that weren't in the pre-refill remaining
      // Since remaining was empty, all of selection came from refill... no.
      // Let's redo: remaining was emptied by taking from it, then refilled,
      // then more taken from refill. Actually we need to be more precise.
    }
  }

  // More accurate reconstruction: replay the exact algorithm
  return replayPool(allModifierSelections);
}

function replayPool(allModifierSelections: number[][]): ModifierPoolState {
  let remaining = [...ALL_MODIFIER_IDS];

  for (const selection of allModifierSelections) {
    if (remaining.length >= MODIFIERS_PER_RUN) {
      // All 5 came from remaining
      const selectedSet = new Set(selection);
      remaining = remaining.filter((id) => !selectedSet.has(id));
    } else {
      // Some came from remaining, rest from refill
      const fromCurrent = remaining;
      const usedIds = new Set(fromCurrent);
      const refill = ALL_MODIFIER_IDS.filter((id) => !usedIds.has(id));
      const fromRefill = selection.filter((id) => !usedIds.has(id));
      const fromRefillSet = new Set(fromRefill);
      remaining = refill.filter((id) => !fromRefillSet.has(id));
    }
  }

  return { remaining };
}

export function initialPool(): ModifierPoolState {
  return { remaining: [...ALL_MODIFIER_IDS] };
}
