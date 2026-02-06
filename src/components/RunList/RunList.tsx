import type { Run } from '../../types';
import { RunCard } from '../RunCard';
import styles from './RunList.module.css';

interface RunListProps {
  runs: Run[];
  revealedUpTo: number;
  onReveal: (runNumber: number) => void;
}

export function RunList({ runs, revealedUpTo, onReveal }: RunListProps) {
  const reversed = [...runs].reverse();

  if (reversed.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No runs recorded yet.</p>
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
          onReveal={onReveal}
        />
      ))}
    </div>
  );
}
