import { useState, useCallback, useMemo } from 'react';
import type { Run } from '../types';
import { HARDCODED_RUNS } from '../data/runs';
import { computeStats } from '../logic/streaks';
import { loadLocalState, clearLocalState } from '../utils/storage';

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

  const resetLocalData = useCallback(() => {
    clearLocalState();
    setAllRuns([...HARDCODED_RUNS]);
  }, []);

  return {
    runs: allRuns,
    localRuns,
    stats,
    resetLocalData,
  };
}
