import { useState, useCallback, useMemo } from 'react';
import { loadSpoilerState, saveSpoilerState } from '../utils/storage';

export function useSpoilerState(maxRunNumber: number) {
  const [revealedUpTo, setRevealedUpTo] = useState(() => loadSpoilerState().revealedUpToRunNumber);

  const revealUpTo = useCallback((runNumber: number) => {
    setRevealedUpTo(runNumber);
    saveSpoilerState(runNumber);
  }, []);

  const revealAll = useCallback(() => {
    setRevealedUpTo(maxRunNumber);
    saveSpoilerState(maxRunNumber);
  }, [maxRunNumber]);

  const hideAll = useCallback(() => {
    setRevealedUpTo(0);
    saveSpoilerState(0);
  }, []);

  const isRunRevealed = useCallback(
    (runNumber: number) => runNumber <= revealedUpTo,
    [revealedUpTo]
  );

  const allRevealed = useMemo(
    () => maxRunNumber > 0 && revealedUpTo >= maxRunNumber,
    [maxRunNumber, revealedUpTo]
  );

  return {
    revealedUpTo,
    revealUpTo,
    revealAll,
    hideAll,
    isRunRevealed,
    allRevealed,
  };
}
