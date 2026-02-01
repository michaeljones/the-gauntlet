import { MODIFIERS } from '../../data/modifiers';
import styles from './ModifierBadge.module.css';

interface ModifierBadgeProps {
  modifierId: number;
}

export function ModifierBadge({ modifierId }: ModifierBadgeProps) {
  const modifier = MODIFIERS[modifierId];
  return (
    <span className={styles.badge}>
      {modifier?.name ?? `Modifier ${modifierId}`}
    </span>
  );
}
