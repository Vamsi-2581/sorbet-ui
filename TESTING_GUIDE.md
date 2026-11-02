# Testing and development guide

How to set up the repo, run the checks, add a component and cut a release. For the package layout and component pattern, see [API_ARCHITECTURE.md](API_ARCHITECTURE.md).

## Setup

Requirements:

- Node 22 (see `.nvmrc`)
- pnpm, at the version pinned in `packageManager` (run `corepack enable` once)

```bash
git clone https://github.com/tahmidbintaslim/sorbet-ui.git
cd sorbet-ui
pnpm install
pnpm build:packages   # workspace packages import each other from dist/
```

## Scripts

| Command                  | What it does                                                                 |
| ------------------------ | ---------------------------------------------------------------------------- |
| `pnpm build:packages`    | Build tokens, theme, core, icons and react with tsup                         |
| `pnpm build`             | Build the packages, Storybook and the web demo                               |
| `pnpm lint`              | ESLint in every package and app                                              |
| `pnpm type-check`        | `tsc --noEmit` in every package and the web demo (builds dependencies first) |
| `pnpm test`              | Unit tests in watch mode                                                     |
| `pnpm test:ci`           | Unit tests once (`pnpm test:unit` is the same)                               |
| `pnpm test:storybook:ci` | Every Storybook story as a test in headless Chromium                         |
| `pnpm check:all`         | `lint`, `type-check` and `test:ci`                                           |
| `pnpm storybook:dev`     | Storybook on http://localhost:6006                                           |
| `pnpm storybook:build`   | Static Storybook in `apps/docs/storybook-static`                             |
| `pnpm format`            | Prettier over TS, TSX, JSON and Markdown files                               |

`pnpm clean` deletes each package's build output, the root `node_modules` and also `pnpm-lock.yaml`. Do not commit a regenerated lockfile unless you meant to change dependencies.

## Test suites

### Unit tests

- Vitest with Testing Library in jsdom, configured per package (`packages/react/vitest.config.ts`, `packages/tokens/vitest.config.ts`) and run together from the root `vitest.config.ts`.
- 505 tests in 29 files: one file per component in `packages/react/src` (376 tests), `packages/react/src/dark-mode.test.tsx` (35 tests that render components in light and dark mode and check their text, label, background and status-dot colors, and call the `@sorbet-ui/core` variant helpers in both modes), `packages/react/src/cjs-build.test.ts` (5 tests that `require()` the built CommonJS bundle; skipped until `pnpm build:packages` has run) and `packages/tokens/src/contrast.test.ts` (89 tests).
- Six component test files also run jest-axe.

```bash
pnpm test:ci                                      # everything, once
pnpm vitest run packages/react/src/Button.test.tsx  # one file
pnpm vitest run --project=@sorbet-ui/react          # one project (or --project=tokens)
pnpm vitest run --coverage                        # with a v8 coverage report in coverage/
```

### Contrast test

`packages/tokens/src/contrast.test.ts` computes WCAG 2.x contrast ratios for the color tokens and requires 4.5:1 for:

- `contrastText` on `main` and on `dark` (solid fill and its hover)
- `main` and `dark` on white (outlined, plain and link text)
- `dark` on the `alpha12` and `alpha20` tints (soft)
- the MUI theme palette `main` colors on white

For dark mode it requires 4.5:1 for `main` text on the dark page (every color except neutral), `light` on the soft tint, the dark MUI theme's primary, success, warning and error, and the dark primary and secondary text colors on the page and on paper; and 3:1 for `main` borders and icons on the page and on paper. Dark-mode solid fills, neutral text, secondary, danger and neutral text on paper, and the light-theme ghost and plain hover tints are known gaps.

### Storybook tests

`apps/docs/vitest.config.ts` uses the Storybook Vitest plugin to turn every story in `packages/react/src/*.stories.tsx` into a test that renders it in headless Chromium and runs its `play` function. There are 372 stories, 54 of them with a `play` function. No running Storybook server is needed.

```bash
pnpm exec playwright install chromium   # first time only
pnpm build:packages
pnpm test:storybook:ci
```

When `SB_URL` is set, failure messages link to that deployed Storybook instead of `http://localhost:6006`.

## Adding a component

1. Create `packages/react/src/MyComponent.tsx`. Copy the structure of an existing component such as `Chip.tsx`: extend the MUI props, replace `variant`, `color` and `size` with the Sorbet UI unions, style with `styled()` and the tokens, and export with `React.forwardRef` and a `displayName`.
2. Add `MyComponent.test.tsx` next to it: render, each variant, keyboard and ARIA behavior, and a jest-axe check.
3. Add `MyComponent.stories.tsx` with a `play` function for the main interaction. Import test helpers from `storybook/test`.
4. Export the component and its prop types from `packages/react/src/index.ts`.
5. Add a row to the component table in `README.md`.
6. Add a changeset: `pnpm changeset`.

## CI

| Workflow                     | Trigger                                              | Jobs                                                                          |
| ---------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------- |
| `test.yml`                   | Push and pull request to `main`                      | lint and type-check, unit tests, Storybook tests, build, Chromatic (optional) |
| `storybook-deploy-check.yml` | Successful Production deployment, weekly, or by hand | Checks that the public Storybook serves every component                       |
| `publish.yml`                | A published GitHub release                           | Build, type-check, unit tests, then `pnpm publish` of the public packages     |

Vercel builds and deploys the Storybook from `vercel.json`; no workflow deploys it. `storybook-deploy-check.yml` runs `node scripts/check-deployed-storybook.mjs`, which you can also run locally. Dependabot (`.github/dependabot.yml`) opens grouped npm and GitHub Actions updates every Monday, 14 days after a release at the earliest; it does not propose npm major versions.

Every `test.yml` and `publish.yml` job installs with `pnpm install --frozen-lockfile` on Node 22, and builds the packages before it runs tests. The Chromatic step does not fail the run when the `CHROMATIC_PROJECT_TOKEN` secret is not set.

To run the same checks locally:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm type-check
pnpm build:packages
pnpm test:ci
pnpm test:storybook:ci
pnpm build
```

## Releasing

Only the maintainer releases, and a push never publishes anything.

1. Each change that should ship adds a changeset (`pnpm changeset`).
2. The maintainer runs `pnpm changeset version`, which bumps the package versions and writes their changelogs, and merges that to `main`.
3. The maintainer publishes a GitHub release whose tag is `v<version>` (for example `v0.1.0`).
4. `publish.yml` checks that the tag matches every public package version, builds and tests, then publishes to npm with the `NPM_TOKEN` repository secret. It stops before publishing if the secret is missing.

The public packages were numbered 1.0.0 before anything was published; the readiness pass lowered them to 0.1.0. So the first release skips steps 1 and 2: publish a release tagged `v0.1.0`.

Before the first publish, add an `NPM_TOKEN` from a member of the `sorbet-ui` npm org (the `@sorbet-ui` scope).

Private packages (`@sorbet-ui/icons`, `docs`, `web`) are never versioned or published.

## Troubleshooting

- **`Cannot find module '@sorbet-ui/tokens'` (or theme, core) in tests or Storybook**: run `pnpm build:packages`. Workspace packages resolve to their `dist/` folders.
- **`Executable doesn't exist` from Playwright**: run `pnpm exec playwright install chromium`.
- **Storybook cache problems**: delete `apps/docs/node_modules/.cache` and start Storybook again.
