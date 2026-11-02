# Sorbet UI architecture

How the packages fit together and how a component is put together. For usage, see [DOCUMENTATION.md](DOCUMENTATION.md). For tests and the release flow, see [TESTING_GUIDE.md](TESTING_GUIDE.md).

## Packages

Sorbet UI is a pnpm workspace run with Turborepo. The npm packages use the `@sorbet-ui` scope (the `sorbet-ui` npm org exists; the first publish needs an `NPM_TOKEN`).

| Package           | Source            | What it holds                                                                                                         |
| ----------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| `@sorbet-ui/react`  | `packages/react`  | The 26 components, their unit tests and their Storybook stories                                                       |
| `@sorbet-ui/theme`  | `packages/theme`  | `lightTheme` and `darkTheme` (MUI `createTheme`) and MUI module augmentation for the Sorbet UI variant names             |
| `@sorbet-ui/tokens` | `packages/tokens` | Color scales, sizing, typography and animation tokens, plus the contrast test                                         |
| `@sorbet-ui/core`   | `packages/core`   | Shared `SorbetVariant` / `SorbetColor` / `SorbetSize` types, variant presets, accessibility helpers and headless state helpers |
| `@sorbet-ui/icons`  | `packages/icons`  | Empty placeholder, private                                                                                            |
| `docs` (private)  | `apps/docs`       | Storybook 10, deployed to Vercel                                                                                      |
| `web` (private)   | `apps/web`        | Vite landing page demo, not deployed                                                                                  |

Dependencies between them:

```
@sorbet-ui/react
├── @sorbet-ui/core   ── @sorbet-ui/tokens
├── @sorbet-ui/theme  ── @sorbet-ui/tokens
└── @sorbet-ui/tokens

peer dependencies of @sorbet-ui/react:
react, react-dom, @mui/material, @mui/icons-material, @mui/x-date-pickers,
@emotion/react, @emotion/styled, dayjs
```

`@sorbet-ui/core` is used at runtime by Progress and Rating; Slider and ToggleButtonGroup import only its types.

## Build

Each package builds with [tsup](https://tsup.egoist.dev) (`packages/*/tsup.config.ts`):

- one entry, `src/index.ts`
- ESM and CommonJS, each with its own type file and a source map. Tokens, theme and core are `"type": "module"` packages (`index.js` is ESM, `index.cjs` is CommonJS). `@sorbet-ui/react` is `"type": "commonjs"` (`index.mjs` is ESM, `index.js` is CommonJS), because its components default-import MUI subpaths such as `@mui/material/Box`, and under `"type": "module"` esbuild compiles those imports so that `require()` returns the module object instead of the component. `packages/react/src/cjs-build.test.ts` guards this.
- dependencies and peer dependencies stay external
- `@sorbet-ui/react` starts with a `"use client"` banner, because every component uses MUI `styled()` and React hooks

`package.json` `exports` maps `import` and `require` to those files, and every package declares `"sideEffects": false`.

Inside the workspace, packages import each other from `dist/`, so `pnpm build:packages` must run before tests, type-check or Storybook. Turborepo handles this for `build`, `type-check` and `test` through `dependsOn: ["^build"]`.

## Components

Every component in `packages/react/src` follows the same shape:

1. A props interface that extends the MUI component's props, with `variant`, `color` and `size` replaced by the Sorbet UI unions:

   ```ts
   type SorbetVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
   type SorbetColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
   type SorbetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

   export interface ChipProps extends Omit<MuiChipProps, 'variant' | 'size' | 'color'> {
     variant?: SorbetVariant;
     color?: SorbetColor;
     size?: SorbetSize;
   }
   ```

   Button adds `dash` and `link` to its variants. Autocomplete and DatePicker name the red color `error`.

2. A `styled()` wrapper around the MUI component. The Sorbet UI props travel as styled-only props (for example `$variant` and `$color`, or `sorbetVariant` and `sorbetColor`) that `shouldForwardProp` keeps off the DOM.

3. Styles that take the variant colors from `@sorbet-ui/tokens` with `colorScaleForMode(color, theme.palette.mode === 'dark')` and read `theme.palette.mode` to pick light or dark values. Progress, Rating, Slider and ToggleButtonGroup read numbered shades (`colors[color][500]`) instead. Tooltip takes its color scale from the theme mode like the rest, but picks its neutral surfaces from a `data-theme="dark"` ancestor. Drawer reads no variant color at all. Changing `palette.primary` in your MUI theme does not change them.

4. A `React.forwardRef` export with a `displayName`.

Each component has a `*.test.tsx` file (Vitest, Testing Library, jsdom) and a `*.stories.tsx` file next to it.

## Tokens and themes

`@sorbet-ui/tokens` exports each color as a scale (`50` to `900`) with `main`, `light`, `dark`, `contrastText` and alpha steps (`alpha8` to `alpha40`). Components use `main` both as a solid background under `contrastText` and as text on light surfaces, so `main` and `dark` are chosen to reach 4.5:1 against white and against `contrastText`.

No single shade reaches 4.5:1 on both white and near-black, so dark mode has its own scales: `darkModeColorPalette` uses the 500 shade as `main`. `colorScaleForMode(color, isDark)` returns the right one, and the `@sorbet-ui/core` helpers `getColorScale`, `getVariantStyles` and `getVariantCss` take the same `isDark` flag as an optional last argument. `src/contrast.test.ts` checks the light pairs, the dark-mode text and border pairs it can meet, and fails the unit test run if a change breaks one.

`sorbetPalette` is a second, smaller palette that feeds `@sorbet-ui/theme`. The themes set MUI's `primary`, `secondary`, `success`, `warning` and `error` from it, which affects plain MUI components rendered inside the provider.

## Extending

- Pass `sx` or wrap a component with MUI's `styled()`; both work because Sorbet UI components are MUI components underneath.
- Extend a theme with `createTheme(lightTheme, { ... })`.
- Prop types are exported (`ButtonProps`, `TableProps`, and so on) for your own wrappers.

## Known limits

- Dark mode: solid fills (white on the 500 shades) are below 4.5:1 for most colors, and so are neutral text and secondary, danger and neutral text on the paper surface.
- Autocomplete's input field and DatePicker style themselves with `--sun-color-*` CSS variables that nothing defines, so `color` has no visible effect on them. Autocomplete's multi-select tags pass `color` to MUI `Chip` and do follow it.
- Drawer accepts `color` but never reads it.
- In the light theme, ghost and plain hover and pressed tints drop below 4.5:1 for some colors.
- Each component declares its own copy of the variant, color and size unions instead of importing them from `@sorbet-ui/core`, except Progress, Rating, Slider and ToggleButtonGroup.
