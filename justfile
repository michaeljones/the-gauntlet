# Development
dev:
    npm run dev

# Run tests
test:
    npm run test

# Run tests in watch mode
test-watch:
    npm run test:watch

# Lint
lint:
    npm run lint

# Production build
build:
    npm run build

# Preview production build locally
preview:
    npm run preview

# Deploy to GitHub Pages
deploy: build
    npx gh-pages -d dist
