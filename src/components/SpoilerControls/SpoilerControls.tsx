import styles from './SpoilerControls.module.css';

interface SpoilerControlsProps {
  revealedCount: number;
  totalCount: number;
  onRevealAll: () => void;
  onHideAll: () => void;
}

export function SpoilerControls({
  revealedCount,
  totalCount,
  onRevealAll,
  onHideAll,
}: SpoilerControlsProps) {
  if (totalCount === 0) return null;

  const allRevealed = revealedCount >= totalCount;

  return (
    <div className={styles.controls}>
      <span className={styles.status}>
        {revealedCount}/{totalCount} runs revealed
      </span>
      {!allRevealed && (
        <button className={styles.revealAllBtn} onClick={onRevealAll}>
          Reveal All
        </button>
      )}
      {revealedCount > 0 && (
        <button className={styles.hideAllBtn} onClick={onHideAll}>
          Hide All
        </button>
      )}
    </div>
  );
}
