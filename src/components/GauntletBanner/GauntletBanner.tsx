import styles from './GauntletBanner.module.css';

interface GauntletBannerProps {
  visible: boolean;
}

export function GauntletBanner({ visible }: GauntletBannerProps) {
  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <h2 className={styles.title}>GAUNTLET COMPLETE!</h2>
      <p className={styles.message}>
        12 consecutive wins &mdash; the Ravenswatch Gauntlet has been conquered!
      </p>
    </div>
  );
}
