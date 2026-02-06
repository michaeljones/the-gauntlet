import type { GauntletStats } from '../../types';
import styles from './Stats.module.css';

interface StatsProps {
  stats: GauntletStats;
  hidden?: boolean;
}

export function Stats({ stats, hidden = false }: StatsProps) {
  return (
    <div className={styles.stats}>
      <div className={`${styles.card} ${styles.streak}`}>
        <span className={styles.value}>{hidden ? '?' : stats.currentStreak}</span>
        <span className={styles.label}>Current Streak</span>
      </div>
      <div className={`${styles.card} ${styles.longest}`}>
        <span className={styles.value}>{hidden ? '?' : stats.longestStreak}</span>
        <span className={styles.label}>Longest Streak</span>
      </div>
      <div className={`${styles.card} ${styles.losses}`}>
        <span className={styles.value}>{hidden ? '?' : stats.totalLosses}</span>
        <span className={styles.label}>Total Losses</span>
      </div>
    </div>
  );
}
