import { describe, it, expect } from 'vitest';
import { selectModifiers, reconstructPool, initialPool } from '../src/logic/modifierSelection';

describe('modifierSelection', () => {
  it('selects 5 modifiers from a full pool', () => {
    const pool = initialPool();
    const { selected, newPool } = selectModifiers(pool);
    expect(selected).toHaveLength(5);
    expect(newPool.remaining).toHaveLength(5);
    // No overlap between selected and remaining
    const overlap = selected.filter((id) => newPool.remaining.includes(id));
    expect(overlap).toHaveLength(0);
  });

  it('selects 5 modifiers from a pool of 6', () => {
    const pool = { remaining: ['dried-up-fountains', 'inflation', 'lack-of-inspiration', 'bloodlust', 'corruption', 'disease'] };
    const { selected, newPool } = selectModifiers(pool);
    expect(selected).toHaveLength(5);
    expect(newPool.remaining).toHaveLength(1);
  });

  it('handles pool with fewer than 5 by refilling', () => {
    const pool = { remaining: ['dried-up-fountains', 'inflation'] };
    const { selected, newPool } = selectModifiers(pool);
    expect(selected).toHaveLength(5);
    // Should include the two from remaining plus 3 from refill
    expect(selected).toContain('dried-up-fountains');
    expect(selected).toContain('inflation');
    // Remaining should be from the refill pool minus what was picked
    // Refill had 8 items (10 - 2), picked 3, so 5 remaining
    expect(newPool.remaining).toHaveLength(5);
  });

  it('handles empty pool by refilling completely', () => {
    const pool = { remaining: [] as string[] };
    const { selected, newPool } = selectModifiers(pool);
    expect(selected).toHaveLength(5);
    expect(newPool.remaining).toHaveLength(5);
  });

  it('all 10 active modifiers appear over exhaustive cycle', () => {
    let pool = initialPool();
    const allSelected: string[] = [];

    // Run 1: pick 5 from 10, leaving 5
    const r1 = selectModifiers(pool);
    allSelected.push(...r1.selected);
    pool = r1.newPool;
    expect(pool.remaining).toHaveLength(5);

    // Run 2: pick 5 from 5, leaving 0 (refills)
    const r2 = selectModifiers(pool);
    allSelected.push(...r2.selected);
    pool = r2.newPool;

    // After 2 runs, we should have 10 selections total
    expect(allSelected).toHaveLength(10);
    // All 10 active modifiers should appear exactly once
    const unique = new Set(allSelected);
    expect(unique.size).toBe(10);
  });

  it('no modifier repeats within first two runs', () => {
    let pool = initialPool();
    const r1 = selectModifiers(pool);
    pool = r1.newPool;
    const r2 = selectModifiers(pool);

    const combined = [...r1.selected, ...r2.selected];
    const unique = new Set(combined);
    expect(unique.size).toBe(10); // 5 + 5, all different
  });

  it('reconstructs pool correctly from run history', () => {
    let pool = initialPool();
    const selections: string[][] = [];

    // Simulate 3 runs
    for (let i = 0; i < 3; i++) {
      const { selected, newPool } = selectModifiers(pool);
      selections.push(selected);
      pool = newPool;
    }

    const reconstructed = reconstructPool(selections);
    expect([...reconstructed.remaining].sort()).toEqual([...pool.remaining].sort());
  });

  it('reconstructs pool from empty history as initial', () => {
    const pool = reconstructPool([]);
    expect(pool.remaining).toHaveLength(10);
    expect(pool.remaining).toEqual(initialPool().remaining);
  });
});
