import type { Run } from '../../types';
import { CHARACTERS } from '../../data/characters';
import { ModifierBadge } from '../ModifierBadge';
import styles from './RunCard.module.css';

interface RunCardProps {
  run: Run;
  onRecordOutcome: (runId: string, outcome: 'win' | 'loss') => void;
}

export function RunCard({ run, onRecordOutcome }: RunCardProps) {
  const characterIndex = CHARACTERS.findIndex((c) => c.id === run.characterId);
  const character = CHARACTERS[characterIndex];
  const characterPosition = characterIndex + 1;

  return (
    <div className={`${styles.card} ${run.outcome ? styles[run.outcome] : styles.pending}`}>
      <div className={styles.header}>
        <span className={styles.runNumber}>Run {run.runNumber}</span>
        <span className={styles.character}>
          {character?.name ?? 'Unknown'}{' '}
          <span className={styles.position}>({characterPosition}/12)</span>
        </span>
        {run.outcome && (
          <span className={`${styles.outcome} ${styles[`outcome_${run.outcome}`]}`}>
            {run.outcome.toUpperCase()}
          </span>
        )}
      </div>
      <div className={styles.modifiers}>
        {run.modifierIds.map((id) => (
          <ModifierBadge key={id} modifierId={id} />
        ))}
      </div>
      {run.outcome === null && (
        <div className={styles.actions}>
          <button
            className={`${styles.btn} ${styles.winBtn}`}
            onClick={() => onRecordOutcome(run.id, 'win')}
          >
            Win
          </button>
          <button
            className={`${styles.btn} ${styles.lossBtn}`}
            onClick={() => onRecordOutcome(run.id, 'loss')}
          >
            Loss
          </button>
        </div>
      )}
    </div>
  );
}
