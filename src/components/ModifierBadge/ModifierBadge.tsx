import { MODIFIERS } from '../../data/modifiers';
import styles from './ModifierBadge.module.css';

interface ModifierBadgeProps {
  modifierId: string;
}

export function ModifierBadge({ modifierId }: ModifierBadgeProps) {
  const modifier = MODIFIERS.find((m) => m.id === modifierId);
  return (
    <span className={styles.badge}>
      {modifier?.name ?? modifierId}
    </span>
  );
}
