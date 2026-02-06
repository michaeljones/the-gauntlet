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

const SPOILER_KEY = 'gauntlet-spoiler-state';

export interface SpoilerState {
  revealedUpToRunNumber: number;
}

export function loadSpoilerState(): SpoilerState {
  try {
    const raw = localStorage.getItem(SPOILER_KEY);
    if (!raw) return { revealedUpToRunNumber: 0 };
    return JSON.parse(raw) as SpoilerState;
  } catch {
    return { revealedUpToRunNumber: 0 };
  }
}

export function saveSpoilerState(revealedUpTo: number): void {
  localStorage.setItem(SPOILER_KEY, JSON.stringify({ revealedUpToRunNumber: revealedUpTo }));
}
