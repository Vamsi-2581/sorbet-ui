/**
 * Sorbet UI Design Tokens
 *
 * Colors, sizing, typography and animation tokens used by the Sorbet UI
 * components and themes.
 */

// Legacy palette (for backwards compatibility)
export * from './palette';

// Individual exports from token files
export * from './animations';
export * from './colors';
export * from './sizing';
export * from './typography';

// Import everything for bundled exports
import { animationPresets, duration, easing, keyframes, transitions } from './animations';
import { backgrounds, borderColors, colorPalette, semantic, textColors } from './colors';
import { breakpoints, componentSizes, radius, shadows, spacing, zIndex } from './sizing';
import {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  typographyPresets,
} from './typography';

// Bundled exports for convenience
export const colors = {
  ...colorPalette,
  semantic,
  backgrounds,
  textColors,
  borderColors,
};

export const sizing = {
  spacing,
  componentSizes,
  radius,
  shadows,
  zIndex,
  breakpoints,
};

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  ...typographyPresets,
};

export const animations = {
  duration,
  easing,
  transitions,
  keyframes,
  ...animationPresets,
};

// Re-export common types
export type { ColorScale, SemanticColor } from './colors';
export type { ComponentSize } from './sizing';
