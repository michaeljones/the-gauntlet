import { useMemo } from 'react';
import { useGameState } from './hooks/useGameState';
import { useSpoilerState } from './hooks/useSpoilerState';
import { computeStats } from './logic/streaks';
import { Header } from './components/Header';
import { Stats } from './components/Stats';
import { GauntletBanner } from './components/GauntletBanner';
import { SpoilerControls } from './components/SpoilerControls';
import { RunList } from './components/RunList';
import styles from './App.module.css';

export default function App() {
  const { runs, stats, resetLocalData } = useGameState();

  const completedRuns = useMemo(() => runs.filter((r) => r.outcome !== null), [runs]);
  const maxRunNumber = completedRuns.length > 0 ? Math.max(...completedRuns.map((r) => r.runNumber)) : 0;

  const { revealedUpTo, revealUpTo, revealAll, hideAll, allRevealed } =
    useSpoilerState(maxRunNumber);

  const revealedStats = useMemo(() => {
    const revealedRuns = runs.filter((r) => r.runNumber <= revealedUpTo);
    return computeStats(revealedRuns);
  }, [runs, revealedUpTo]);

  const statsHidden = revealedUpTo === 0 && completedRuns.length > 0;

  return (
    <div className={styles.app}>
      <Header />
      <Stats stats={statsHidden ? stats : revealedStats} hidden={statsHidden} />
      <GauntletBanner visible={allRevealed && stats.gauntletComplete} />
      <SpoilerControls
        revealedCount={Math.min(revealedUpTo, completedRuns.length)}
        totalCount={completedRuns.length}
        onRevealAll={revealAll}
        onHideAll={hideAll}
      />
      <main className={styles.main}>
        <RunList
          runs={completedRuns}
          revealedUpTo={revealedUpTo}
          onReveal={revealUpTo}
        />
      </main>
      {runs.some((r) => r.source === 'local') && (
        <footer className={styles.footer}>
          <button className={styles.resetBtn} onClick={resetLocalData}>
            Reset Local Data
          </button>
        </footer>
      )}
    </div>
  );
}
