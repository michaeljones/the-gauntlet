import type { Run } from '../../types';
import { CHARACTERS } from '../../data/characters';
import { ModifierBadge } from '../ModifierBadge';
import styles from './RunCard.module.css';

interface RunCardProps {
  run: Run;
  isRevealed: boolean;
  onReveal: (runNumber: number) => void;
}

export function RunCard({ run, isRevealed, onReveal }: RunCardProps) {
  const characterIndex = CHARACTERS.findIndex((c) => c.id === run.characterId);
  const character = CHARACTERS[characterIndex];
  const characterPosition = characterIndex + 1;

  const cardClass = isRevealed
    ? `${styles.card} ${run.outcome ? styles[run.outcome] : ''}`
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
        {isRevealed && run.outcome && (
          <span className={`${styles.outcome} ${styles[`outcome_${run.outcome}`]}`}>
            {run.outcome.toUpperCase()}
          </span>
        )}
        {!isRevealed && (
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
    </div>
  );
}
