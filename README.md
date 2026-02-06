# The Gauntlet

A Ravenswatch Gauntlet tracker for YouTuber [Positive4ce](https://www.youtube.com/@Positive4ce). Tracks runs, characters, modifiers, and win streaks.

## Development

```bash
npm install
npm run dev      # Start dev server
npm run build    # Production build
npm run test     # Run tests
npm run lint     # Lint check
```

## Adding Runs

Edit `src/data/runs.ts` to add new runs. Each run includes:
- Character ID (cycles through 12 characters)
- 5 modifier IDs (from pool of 10 active modifiers)
- Outcome (win/loss)
- Optional YouTube URL

## Deployment

Hosted on GitHub Pages at `/the-gauntlet/`. Build output goes to `dist/`.
