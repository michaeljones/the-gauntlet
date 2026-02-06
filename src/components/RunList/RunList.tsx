import type { Run } from '../../types';
import { RunCard } from '../RunCard';
import styles from './RunList.module.css';

interface RunListProps {
  runs: Run[];
  revealedUpTo: number;
  onRecordOutcome: (runId: string, outcome: 'win' | 'loss') => void;
  onReveal: (runNumber: number) => void;
}

export function RunList({ runs, revealedUpTo, onRecordOutcome, onReveal }: RunListProps) {
  const reversed = [...runs].reverse();

  if (reversed.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No runs yet. Click "Next Run" to begin the gauntlet!</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {reversed.map((run) => (
        <RunCard
          key={run.id}
          run={run}
          isRevealed={run.runNumber <= revealedUpTo}
          onRecordOutcome={onRecordOutcome}
          onReveal={onReveal}
        />
      ))}
    </div>
  );
}
