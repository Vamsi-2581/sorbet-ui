# Sorbet UI documentation

Sorbet UI is a set of 26 React components built on Material UI (MUI) v7. Every component takes the same `variant` and `size` props and, with the three exceptions listed under [`color`](#color), the same `color` prop. Each still accepts the props of the MUI component it wraps. The [Storybook](https://sorbet-ui.vercel.app) shows every component with live controls.

Sorbet UI is in development and nothing has been published to npm. The packages were numbered 1.0.0 before any release; they now start at 0.1.0, which is unreleased.

## Contents

1. [Install](#install)
2. [Setup](#setup)
3. [The shared props](#the-shared-props)
4. [Component examples](#component-examples)
5. [Design tokens](#design-tokens)
6. [Themes and dark mode](#themes-and-dark-mode)
7. [Customization](#customization)
8. [Server rendering and Next.js](#server-rendering-and-nextjs)
9. [Troubleshooting](#troubleshooting)

---

## Install

After the first release:

```bash
npm install @sorbet-ui/react @sorbet-ui/theme \
  @mui/material @mui/icons-material @mui/x-date-pickers \
  @emotion/react @emotion/styled dayjs
```

| Requirement                            | Version       |
| -------------------------------------- | ------------- |
| React and React DOM                    | 19            |
| `@mui/material`, `@mui/icons-material` | 7             |
| `@mui/x-date-pickers`                  | 8             |
| `@emotion/react`, `@emotion/styled`    | 11            |
| `dayjs`                                | 1.11 or later |

These are peer dependencies, so your app owns one copy of each. `@sorbet-ui/react` imports all of them, including MUI X Date Pickers and dayjs, because its single entry point also exports `DatePicker`.

Until then, run Sorbet UI from source:

```bash
git clone https://github.com/tahmidbintaslim/sorbet-ui.git
cd sorbet-ui
pnpm install
pnpm build:packages
pnpm storybook:dev
```

## Setup

Wrap your app in MUI's `ThemeProvider` with a Sorbet UI theme:

```tsx
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@sorbet-ui/react';
import { lightTheme } from '@sorbet-ui/theme';

export function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Button variant="solid">Click me</Button>
    </ThemeProvider>
  );
}
```

Components read their colors from `@sorbet-ui/tokens` and read the theme to choose light or dark styles, so the provider is what turns dark mode on.

## The shared props

### `variant`

| Variant    | Look                                    | Available on   |
| ---------- | --------------------------------------- | -------------- |
| `solid`    | Filled background with contrasting text | All components |
| `soft`     | Tinted background                       | All components |
| `outlined` | Colored border, transparent background  | All components |
| `ghost`    | Neutral until hovered                   | All components |
| `plain`    | No border or background                 | All components |
| `dash`     | Dashed border                           | Button only    |
| `link`     | Underlined, inline                      | Button only    |

### `color`

`primary`, `secondary`, `success`, `warning`, `danger`, `info` and `neutral`. Three components differ:

- Autocomplete calls the red color `error` instead of `danger`. Its input field ignores `color` and renders in MUI's default blue, but its multi-select tags pass `color` to MUI `Chip` and follow the theme palette.
- DatePicker calls the red color `error` and ignores `color` (MUI's default blue).
- Drawer accepts `color` but never reads it.

### `size`

`xs`, `sm`, `md`, `lg` and `xl`. The default is `md`.

```tsx
<Button variant="soft" color="success" size="lg">
  Save changes
</Button>
```

The README has a [table of every component](README.md#components).

## Component examples

These examples use only props that exist in the current code. The Storybook has many more.

### Button

```tsx
import SaveIcon from '@mui/icons-material/Save';
import { Button } from '@sorbet-ui/react';

<Button variant="solid" color="primary">Continue</Button>
<Button variant="solid" loading>Saving</Button>
<Button variant="soft" startIcon={<SaveIcon />}>Save</Button>
<Button variant="dash" color="info">Upload file</Button>
<Button variant="link">View details</Button>
<Button shape="block">Full width</Button>
```

`shape` takes `default`, `wide` (up to 256px), `block` (full width), `square` or `circle`. `loadingPosition` takes `start`, `end` or `center`.

### Form controls

```tsx
import { Checkbox, MenuItem, Select, Switch, TextField } from '@sorbet-ui/react';

<TextField variant="outlined" label="Email" />
<TextField variant="soft" label="Message" multiline rows={4} />
<TextField variant="solid" label="Password" type="password" error helperText="Required" />

<Select variant="outlined" label="Country" value={country} onChange={(e) => setCountry(e.target.value)}>
  <MenuItem value="us">United States</MenuItem>
  <MenuItem value="th">Thailand</MenuItem>
</Select>

<Checkbox variant="solid" label="I agree" />
<Switch variant="soft" label="Email alerts" />
```

### Feedback

```tsx
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@sorbet-ui/react';

<Alert variant="soft" color="warning" onClose={() => setOpen(false)}>
  Your session ends in 5 minutes.
</Alert>

<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogTitle>Delete item?</DialogTitle>
  <DialogContent>This cannot be undone.</DialogContent>
  <DialogActions>
    <Button variant="plain" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="solid" color="danger">Delete</Button>
  </DialogActions>
</Dialog>

<Snackbar open={saved} onClose={() => setSaved(false)} message="Saved" autoHideDuration={3000} />
```

### Navigation

```tsx
import { Pagination, Tabs } from '@sorbet-ui/react';

<Tabs
  variant="soft"
  tabs={[
    { id: 'overview', label: 'Overview', content: <p>Overview panel</p> },
    { id: 'settings', label: 'Settings', content: <p>Settings panel</p> },
  ]}
  defaultValue="overview"
/>

<Pagination count={10} page={page} onChange={(_, next) => setPage(next)} />
```

### Data display

```tsx
import { Avatar, Badge, Chip, Table, type TableColumn } from '@sorbet-ui/react';

type User = { name: string; role: string };

const columns: TableColumn<User>[] = [
  { id: 'name', header: 'Name', accessor: 'name', sortable: true },
  { id: 'role', header: 'Role', accessor: 'role' },
];

<Table<User> columns={columns} data={users} sortable selectable pagination rowsPerPage={10} />

<Badge badgeContent={4} color="danger">
  <Avatar variant="soft" color="primary">JD</Avatar>
</Badge>

<Chip variant="soft" color="success" label="Active" />
```

### DatePicker

```tsx
import { DatePicker, dayjs } from '@sorbet-ui/react';

<DatePicker label="Start date" value={dayjs()} onChange={(value) => setDate(value)} />;
```

DatePicker brings its own `LocalizationProvider` with the dayjs adapter.

## Design tokens

`@sorbet-ui/tokens` holds the raw values the components use.

```ts
import { colors, radius, spacing, typography } from '@sorbet-ui/tokens';

colors.primary.main; // '#0369a1'
colors.primary.dark; // '#075985'
colors.primary.contrastText; // '#ffffff'
colors.primary[500]; // '#0ea5e9'
colors.primary.alpha12; // 'rgba(14, 165, 233, 0.12)'

spacing[4]; // '16px' (4px grid: spacing[1] is 4px)
radius.md; // '8px'
typography.fontSize.base; // '1rem'
typography.fontWeight.semibold; // 600
```

Each color has a 50 to 900 scale, `main`, `light`, `dark`, `contrastText` and alpha steps (`alpha8` to `alpha40`). `main` and `dark` are picked to reach 4.5:1 contrast against white and against `contrastText`; `packages/tokens/src/contrast.test.ts` checks this.

In dark mode the components use `darkModeColorPalette`, where `main` is the lighter 500 shade. `colorScaleForMode` picks the scale for you:

```ts
import { colorScaleForMode } from '@sorbet-ui/tokens';

colorScaleForMode('primary', false).main; // '#0369a1'
colorScaleForMode('primary', true).main; // '#0ea5e9'
```

The variant helpers in `@sorbet-ui/core` (`getColorScale`, `getVariantStyles`, `getVariantCss`) return the light-theme shades unless you pass `true` as their last argument in dark mode:

```ts
import { getVariantStyles } from '@sorbet-ui/core';

getVariantStyles('outlined', 'primary').color; // '#0369a1'
getVariantStyles('outlined', 'primary', true).color; // '#0ea5e9'
```

Text colors work the same way. `textColorsForMode` returns `textColors.light` or `textColors.dark`; Checkbox, Radio and Switch labels, unselected ToggleButtonGroup text and the Slider value and min/max labels use it:

```ts
import { textColorsForMode } from '@sorbet-ui/tokens';

textColorsForMode(false).primary; // '#0f172a'
textColorsForMode(true).primary; // '#f8fafc'
```

## Themes and dark mode

```tsx
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { darkTheme, lightTheme } from '@sorbet-ui/theme';

function Root() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  return (
    <ThemeProvider theme={prefersDark ? darkTheme : lightTheme}>
      <App />
    </ThemeProvider>
  );
}
```

To change the theme, extend it with MUI's `createTheme`:

```ts
import { createTheme } from '@mui/material/styles';
import { lightTheme } from '@sorbet-ui/theme';

const theme = createTheme(lightTheme, {
  typography: { fontFamily: '"Inter", sans-serif' },
});
```

Sorbet UI's variant colors come from the tokens, not from the MUI palette, so changing `palette.primary` changes MUI's own components but not Sorbet UI's variant styles.

Known limits: in dark mode, solid fills (white on the 500 shades) are below 4.5:1 contrast for most colors, and so are neutral text and secondary, danger and neutral text on the paper surface. In the light theme, ghost and plain hover and pressed tints drop below 4.5:1 for some colors.

## Customization

Every component accepts the MUI `sx` prop, and works with MUI's `styled()`:

```tsx
import { styled } from '@mui/material/styles';
import { Button } from '@sorbet-ui/react';

<Button variant="solid" sx={{ borderRadius: '20px', letterSpacing: 1 }}>
  Rounded
</Button>;

const UppercaseButton = styled(Button)({ textTransform: 'uppercase' });
```

Every component's prop type is exported (`ButtonProps`, `TableProps`, `SorbetDatePickerProps`, and so on), so you can wrap components with your own defaults.

## Server rendering and Next.js

The packages ship ESM and CommonJS builds, and both have been server-rendered with `react-dom/server` in Node. The `@sorbet-ui/react` build starts with `"use client"`, so React Server Components frameworks treat it as client code. Put `ThemeProvider` in one of your own client components, because themes contain functions that cannot cross the server and client boundary. Sorbet UI has not been tested inside a Next.js app yet.

## Troubleshooting

**`Cannot find module '@mui/x-date-pickers'` (or `dayjs`, `@mui/icons-material`)**: install all the peer dependencies listed under [Install](#install), even if you do not use DatePicker or Rating.

**Dark styles do not apply**: wrap the app in `ThemeProvider` with `darkTheme`.

**Two copies of MUI or Emotion**: make sure your app lists `@mui/material` and Emotion as dependencies and that only one version of each is installed (`npm ls @mui/material`).

## Resources

- [Storybook](https://sorbet-ui.vercel.app)
- [GitHub repository](https://github.com/tahmidbintaslim/sorbet-ui)
- [Contributing guide](CONTRIBUTING.md)
- [Testing guide](TESTING_GUIDE.md)
