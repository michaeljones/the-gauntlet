import styles from './NextRunButton.module.css';

interface NextRunButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function NextRunButton({ onClick, disabled }: NextRunButtonProps) {
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={onClick}
        disabled={disabled}
        title={disabled ? 'Complete the current run first' : 'Generate next run'}
      >
        Next Run
      </button>
      {disabled && (
        <p className={styles.hint}>Record the outcome of the current run first</p>
      )}
    </div>
  );
}
