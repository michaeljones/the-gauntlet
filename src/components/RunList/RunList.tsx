import type { Run } from '../../types';
import { RunCard } from '../RunCard';
import styles from './RunList.module.css';

interface RunListProps {
  runs: Run[];
  onRecordOutcome: (runId: string, outcome: 'win' | 'loss') => void;
}

export function RunList({ runs, onRecordOutcome }: RunListProps) {
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
        <RunCard key={run.id} run={run} onRecordOutcome={onRecordOutcome} />
      ))}
    </div>
  );
}
