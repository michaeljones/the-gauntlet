import { useGameState } from './hooks/useGameState';
import { Header } from './components/Header';
import { Stats } from './components/Stats';
import { NextRunButton } from './components/NextRunButton';
import { GauntletBanner } from './components/GauntletBanner';
import { RunList } from './components/RunList';
import styles from './App.module.css';

export default function App() {
  const { runs, stats, hasPendingRun, createNextRun, recordOutcome, resetLocalData } =
    useGameState();

  return (
    <div className={styles.app}>
      <Header />
      <Stats stats={stats} />
      <GauntletBanner visible={stats.gauntletComplete} />
      <NextRunButton onClick={createNextRun} disabled={hasPendingRun} />
      <main className={styles.main}>
        <RunList runs={runs} onRecordOutcome={recordOutcome} />
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
