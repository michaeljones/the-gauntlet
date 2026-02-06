import type { Run } from '../../types';
import { CHARACTERS } from '../../data/characters';
import { ModifierBadge } from '../ModifierBadge';
import styles from './RunCard.module.css';

interface RunCardProps {
  run: Run;
  isRevealed: boolean;
  onRecordOutcome: (runId: string, outcome: 'win' | 'loss') => void;
  onReveal: (runNumber: number) => void;
}

export function RunCard({ run, isRevealed, onRecordOutcome, onReveal }: RunCardProps) {
  const characterIndex = CHARACTERS.findIndex((c) => c.id === run.characterId);
  const character = CHARACTERS[characterIndex];
  const characterPosition = characterIndex + 1;

  const isPending = run.outcome === null;
  const showOutcome = isPending || isRevealed;

  const cardClass = showOutcome
    ? `${styles.card} ${run.outcome ? styles[run.outcome] : styles.pending}`
    : `${styles.card} ${styles.hidden}`;

  return (
    <div className={cardClass}>
      <div className={styles.header}>
        <span className={styles.runNumber}>Run {run.runNumber}</span>
        {run.youtubeUrl && (
          <a
            href={run.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.youtubeLink}
            title="Watch on YouTube"
          >
            YouTube
          </a>
        )}
        <span className={styles.character}>
          {character?.name ?? 'Unknown'}{' '}
          <span className={styles.position}>({characterPosition}/12)</span>
        </span>
        {showOutcome && run.outcome && (
          <span className={`${styles.outcome} ${styles[`outcome_${run.outcome}`]}`}>
            {run.outcome.toUpperCase()}
          </span>
        )}
        {!showOutcome && (
          <button className={styles.revealBtn} onClick={() => onReveal(run.runNumber)}>
            Reveal
          </button>
        )}
      </div>
      <div className={styles.modifiers}>
        {run.modifierIds.map((id) => (
          <ModifierBadge key={id} modifierId={id} />
        ))}
      </div>
      {isPending && (
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
