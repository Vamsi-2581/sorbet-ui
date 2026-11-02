/**
 * Sorbet UI Color System
 *
 * A comprehensive color palette supporting:
 * - Semantic colors (primary, secondary, success, warning, danger, info)
 * - Neutral grays
 * - Alpha variations for overlays and states
 * - Dark mode support
 */

export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  main: string;
  light: string;
  dark: string;
  contrastText: string;
  alpha8: string;
  alpha12: string;
  alpha16: string;
  alpha20: string;
  alpha30: string;
  alpha40: string;
};

export type SemanticColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral';

/**
 * Sorbet UI Brand Colors
 * Primary: Sky Blue (Sun-inspired warmth meets modern tech)
 *
 * Components use `main` both as a solid background (with `contrastText`) and as
 * text on light surfaces, so `main` and `dark` must each reach 4.5:1 against
 * white and against `contrastText`. src/contrast.test.ts enforces this.
 */
export const colorPalette = {
  // Brand Primary - Sky Blue
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    main: '#0369a1',
    light: '#7dd3fc',
    dark: '#075985',
    contrastText: '#ffffff',
    alpha8: 'rgba(14, 165, 233, 0.08)',
    alpha12: 'rgba(14, 165, 233, 0.12)',
    alpha16: 'rgba(14, 165, 233, 0.16)',
    alpha20: 'rgba(14, 165, 233, 0.20)',
    alpha30: 'rgba(14, 165, 233, 0.30)',
    alpha40: 'rgba(14, 165, 233, 0.40)',
  } as ColorScale,

  // Secondary - Violet
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    main: '#9333ea',
    light: '#d8b4fe',
    dark: '#7e22ce',
    contrastText: '#ffffff',
    alpha8: 'rgba(168, 85, 247, 0.08)',
    alpha12: 'rgba(168, 85, 247, 0.12)',
    alpha16: 'rgba(168, 85, 247, 0.16)',
    alpha20: 'rgba(168, 85, 247, 0.20)',
    alpha30: 'rgba(168, 85, 247, 0.30)',
    alpha40: 'rgba(168, 85, 247, 0.40)',
  } as ColorScale,

  // Success - Emerald
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    main: '#047857',
    light: '#6ee7b7',
    dark: '#065f46',
    contrastText: '#ffffff',
    alpha8: 'rgba(16, 185, 129, 0.08)',
    alpha12: 'rgba(16, 185, 129, 0.12)',
    alpha16: 'rgba(16, 185, 129, 0.16)',
    alpha20: 'rgba(16, 185, 129, 0.20)',
    alpha30: 'rgba(16, 185, 129, 0.30)',
    alpha40: 'rgba(16, 185, 129, 0.40)',
  } as ColorScale,

  // Warning - Amber
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    main: '#b45309',
    light: '#fcd34d',
    dark: '#92400e',
    contrastText: '#ffffff',
    alpha8: 'rgba(245, 158, 11, 0.08)',
    alpha12: 'rgba(245, 158, 11, 0.12)',
    alpha16: 'rgba(245, 158, 11, 0.16)',
    alpha20: 'rgba(245, 158, 11, 0.20)',
    alpha30: 'rgba(245, 158, 11, 0.30)',
    alpha40: 'rgba(245, 158, 11, 0.40)',
  } as ColorScale,

  // Danger - Rose
  danger: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
    main: '#e11d48',
    light: '#fda4af',
    dark: '#be123c',
    contrastText: '#ffffff',
    alpha8: 'rgba(244, 63, 94, 0.08)',
    alpha12: 'rgba(244, 63, 94, 0.12)',
    alpha16: 'rgba(244, 63, 94, 0.16)',
    alpha20: 'rgba(244, 63, 94, 0.20)',
    alpha30: 'rgba(244, 63, 94, 0.30)',
    alpha40: 'rgba(244, 63, 94, 0.40)',
  } as ColorScale,

  // Info - Cyan
  info: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    main: '#0e7490',
    light: '#67e8f9',
    dark: '#155e75',
    contrastText: '#ffffff',
    alpha8: 'rgba(6, 182, 212, 0.08)',
    alpha12: 'rgba(6, 182, 212, 0.12)',
    alpha16: 'rgba(6, 182, 212, 0.16)',
    alpha20: 'rgba(6, 182, 212, 0.20)',
    alpha30: 'rgba(6, 182, 212, 0.30)',
    alpha40: 'rgba(6, 182, 212, 0.40)',
  } as ColorScale,

  // Neutral - Slate
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    main: '#64748b',
    light: '#f1f5f9',
    dark: '#334155',
    contrastText: '#ffffff',
    alpha8: 'rgba(100, 116, 139, 0.08)',
    alpha12: 'rgba(100, 116, 139, 0.12)',
    alpha16: 'rgba(100, 116, 139, 0.16)',
    alpha20: 'rgba(100, 116, 139, 0.20)',
    alpha30: 'rgba(100, 116, 139, 0.30)',
    alpha40: 'rgba(100, 116, 139, 0.40)',
  } as ColorScale,
};

/**
 * The scales components use in dark mode.
 *
 * The light-theme `main` and `dark` above are dark enough to read on white, which
 * makes them too dark to read on the near-black dark-mode surfaces: no single shade
 * reaches 4.5:1 on both. Dark mode keeps the lighter shades it used before the
 * light-theme contrast fix (`main` is the 500 shade), so text, borders and icons stay
 * readable on dark surfaces. Solid fills in dark mode are a known gap: white on most
 * 500 shades is below 4.5:1.
 */
export const darkModeColorPalette: Record<SemanticColor, ColorScale> = {
  primary: {
    ...colorPalette.primary,
    main: colorPalette.primary[500],
    dark: colorPalette.primary[600],
  },
  secondary: {
    ...colorPalette.secondary,
    main: colorPalette.secondary[500],
    dark: colorPalette.secondary[700],
  },
  success: {
    ...colorPalette.success,
    main: colorPalette.success[500],
    dark: colorPalette.success[700],
  },
  warning: {
    ...colorPalette.warning,
    main: colorPalette.warning[500],
    dark: colorPalette.warning[700],
    contrastText: '#000000',
  },
  danger: {
    ...colorPalette.danger,
    main: colorPalette.danger[500],
    dark: colorPalette.danger[700],
  },
  info: {
    ...colorPalette.info,
    main: colorPalette.info[500],
    dark: colorPalette.info[700],
  },
  neutral: {
    ...colorPalette.neutral,
    main: colorPalette.neutral[500],
    dark: colorPalette.neutral[700],
  },
};

/**
 * Returns the scale for a color in the current mode. Components call it with
 * `theme.palette.mode === 'dark'`. An unknown color falls back to primary.
 */
export function colorScaleForMode(color: SemanticColor, isDark: boolean): ColorScale {
  const palette: Record<SemanticColor, ColorScale> = isDark ? darkModeColorPalette : colorPalette;
  return palette[color] ?? palette.primary;
}

// Common background colors
export const backgrounds = {
  light: {
    default: '#ffffff',
    paper: '#ffffff',
    subtle: colorPalette.neutral[50],
    muted: colorPalette.neutral[100],
  },
  dark: {
    default: colorPalette.neutral[900],
    paper: colorPalette.neutral[800],
    subtle: colorPalette.neutral[800],
    muted: colorPalette.neutral[700],
  },
};

// Semantic color aliases for easier access
export const semantic = {
  primary: colorPalette.primary,
  secondary: colorPalette.secondary,
  success: colorPalette.success,
  warning: colorPalette.warning,
  danger: colorPalette.danger,
  info: colorPalette.info,
  neutral: colorPalette.neutral,
};

// Extended colors object with semantic alias
export const colorsWithSemantic = {
  ...colorPalette,
  semantic,
};

// Text colors
export const textColors = {
  light: {
    primary: colorPalette.neutral[900],
    secondary: colorPalette.neutral[600],
    disabled: colorPalette.neutral[400],
    hint: colorPalette.neutral[500],
  },
  dark: {
    primary: colorPalette.neutral[50],
    secondary: colorPalette.neutral[300],
    disabled: colorPalette.neutral[500],
    hint: colorPalette.neutral[400],
  },
};

// Border colors
export const borderColors = {
  light: {
    default: colorPalette.neutral[200],
    subtle: colorPalette.neutral[100],
    strong: colorPalette.neutral[300],
  },
  dark: {
    default: colorPalette.neutral[700],
    subtle: colorPalette.neutral[800],
    strong: colorPalette.neutral[600],
  },
};

/**
 * Returns the text colors for the current mode. Components call it with
 * `theme.palette.mode === 'dark'`, so labels and helper text stay readable on the
 * dark page instead of keeping the light theme's near-black text.
 */
export function textColorsForMode(isDark: boolean): (typeof textColors)['light'] {
  return isDark ? textColors.dark : textColors.light;
}

export type ColorPalette = typeof colorPalette;
export type Backgrounds = typeof backgrounds;
export type TextColors = typeof textColors;
export type BorderColors = typeof borderColors;
