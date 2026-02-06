# Gauntlet Tracker

Ravenswatch Gauntlet tracker for YouTuber Positive4ce. Client-side React app hosted on GitHub Pages.

## Tech Stack

- Vite + React + TypeScript
- CSS Modules + CSS variables (Catppuccin Mocha theme)
- Vitest for unit tests
- Jujutsu (jj) for version control
- Node 24.13.0 (via .tool-versions / asdf)

## Commands

- `npm run dev` — start dev server
- `npm run build` — typecheck + production build
- `npm run test` — run vitest tests
- `npm run test:watch` — vitest in watch mode
- `npm run lint` — eslint

## Project Structure

- `src/data/` — characters.ts (12 characters), modifiers.ts (11 negative modifiers, 1 deprecated), runs.ts (hardcoded canonical runs, starts empty)
- `src/types/index.ts` — Character, Modifier (with deprecated flag), Run (with optional youtubeUrl), ModifierPoolState, GauntletStats
- `src/logic/` — modifierSelection.ts (exhaustive rotation algorithm), streaks.ts (stats computation), gauntlet.ts (next character)
- `src/hooks/useGameState.ts` — main state hook, merges hardcoded + localStorage runs
- `src/components/` — Header, Stats, NextRunButton, RunList, RunCard, ModifierBadge, GauntletBanner
- `src/utils/storage.ts` — localStorage helpers (key: `gauntlet-local-state`)
- `tests/` — modifierSelection.test.ts, streaks.test.ts (16 tests total)

## Key Design Decisions

- **Data storage**: Hardcoded runs in `src/data/runs.ts` are committed to repo. Local runs stored in localStorage. Merged on load with hardcoded first.
- **IDs are strings**: Character and modifier IDs are human-readable strings (e.g., 'scarlet', 'bloodlust') for easier manual editing.
- **Modifier selection**: 10 active modifiers (deprecated ones excluded), pick 5 per run via exhaustive rotation. Pool state is reconstructed by replaying all past selections from run history (not stored separately).
- **Character cycling**: 12 characters cycle in order by string ID regardless of win/loss.
- **Gauntlet complete**: Detected when current win streak >= 12.
- **Pending run**: Only one pending run (outcome=null) allowed at a time. "Next Run" button disabled until current run has outcome recorded.
- **Reset**: "Reset Local Data" button clears localStorage, falls back to hardcoded runs only.
- **YouTube links**: Runs can have optional `youtubeUrl` field linking to the video of that run.
- **vite base path**: Set to `/the-gauntlet/` for GitHub Pages deployment.
