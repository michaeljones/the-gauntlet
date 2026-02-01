const STORAGE_KEY = 'gauntlet-local-state';

export interface LocalState {
  runs: import('../types').Run[];
}

export function loadLocalState(): LocalState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LocalState;
  } catch {
    return null;
  }
}

export function saveLocalState(state: LocalState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearLocalState(): void {
  localStorage.removeItem(STORAGE_KEY);
}
