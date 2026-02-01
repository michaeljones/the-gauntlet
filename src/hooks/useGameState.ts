import { useState, useCallback, useMemo } from 'react';
import type { Run } from '../types';
import { HARDCODED_RUNS } from '../data/runs';
import { selectModifiers, reconstructPool } from '../logic/modifierSelection';
import { computeStats } from '../logic/streaks';
import { getNextCharacterId } from '../logic/gauntlet';
import { loadLocalState, saveLocalState, clearLocalState } from '../utils/storage';

function loadMergedRuns(): Run[] {
  const local = loadLocalState();
  const localRuns = local?.runs ?? [];
  return [...HARDCODED_RUNS, ...localRuns];
}

export function useGameState() {
  const [allRuns, setAllRuns] = useState<Run[]>(loadMergedRuns);

  const localRuns = useMemo(
    () => allRuns.filter((r) => r.source === 'local'),
    [allRuns],
  );

  const stats = useMemo(() => computeStats(allRuns), [allRuns]);

  const createNextRun = useCallback(() => {
    setAllRuns((prev) => {
      const pool = reconstructPool(prev.map((r) => r.modifierIds));
      const { selected, newPool: _ } = selectModifiers(pool);
      const characterId = getNextCharacterId(prev);
      const newRun: Run = {
        id: crypto.randomUUID(),
        runNumber: prev.length + 1,
        characterId,
        modifierIds: selected,
        outcome: null,
        source: 'local',
        timestamp: Date.now(),
      };
      const next = [...prev, newRun];
      const newLocalRuns = next.filter((r) => r.source === 'local');
      saveLocalState({ runs: newLocalRuns });
      return next;
    });
  }, []);

  const recordOutcome = useCallback((runId: string, outcome: 'win' | 'loss') => {
    setAllRuns((prev) => {
      const next = prev.map((r) =>
        r.id === runId ? { ...r, outcome } : r,
      );
      const newLocalRuns = next.filter((r) => r.source === 'local');
      saveLocalState({ runs: newLocalRuns });
      return next;
    });
  }, []);

  const resetLocalData = useCallback(() => {
    clearLocalState();
    setAllRuns([...HARDCODED_RUNS]);
  }, []);

  // Check if the last run has a pending outcome
  const hasPendingRun = allRuns.length > 0 && allRuns[allRuns.length - 1].outcome === null;

  return {
    runs: allRuns,
    localRuns,
    stats,
    hasPendingRun,
    createNextRun,
    recordOutcome,
    resetLocalData,
  };
}
