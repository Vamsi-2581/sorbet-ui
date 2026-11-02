# Sorbet UI landing page

A one-page demo of Sorbet UI components, built with React, Vite and Material UI. It is not deployed.

## Development

```bash
# Install dependencies (from the repo root)
pnpm install

# Build the workspace packages it imports
pnpm build:packages

# Start the dev server on http://localhost:3000
pnpm web:dev

# Production build into apps/web/dist
pnpm web:build
```

## What it shows

- Hero, feature cards and a component showcase built with Sorbet UI components
- A light and dark theme toggle using `lightTheme` and `darkTheme` from `@sorbet-ui/theme`
