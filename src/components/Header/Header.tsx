import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Positive4ce's Ravenswatch Gauntlet</h1>
      <p className={styles.subtitle}>Nightmare difficulty &middot; 5 random negative modifiers &middot; 12 characters in a row</p>
    </header>
  );
}
