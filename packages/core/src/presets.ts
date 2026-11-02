/**
 * Sorbet UI Variant Presets
 *
 * Centralized styling presets for all 5 Sorbet UI variants.
 * This ensures visual consistency across all components.
 */

import { colors, colorScaleForMode, type ColorScale } from '@sorbet-ui/tokens';
import type { SorbetColor, SorbetVariant } from './types';

/**
 * Get color scale for a semantic color.
 *
 * Pass `isDark` in dark mode. The light-theme `main` and `dark` shades are too dark
 * to read on dark surfaces, so dark mode uses the lighter scale the components use.
 */
export const getColorScale = (color: SorbetColor, isDark = false): ColorScale => {
  return colorScaleForMode(color, isDark);
};

/**
 * Variant style configuration
 */
export interface VariantStyles {
  backgroundColor: string;
  color: string;
  borderColor: string;
  borderWidth: string;
  hoverBackgroundColor: string;
  hoverColor: string;
  hoverBorderColor: string;
  activeBackgroundColor: string;
  activeColor: string;
  focusOutlineColor: string;
  focusOutlineWidth: string;
  focusOutlineOffset: string;
  disabledBackgroundColor: string;
  disabledColor: string;
  disabledBorderColor: string;
}

/**
 * Get variant styles for a given variant and color combination. Pass `isDark` in
 * dark mode (see `getColorScale`).
 */
export const getVariantStyles = (
  variant: SorbetVariant,
  color: SorbetColor = 'primary',
  isDark = false
): VariantStyles => {
  const colorScale = getColorScale(color, isDark);
  const neutralScale = colors.neutral;

  const baseStyles: Record<SorbetVariant, VariantStyles> = {
    solid: {
      backgroundColor: colorScale.main,
      color: colorScale.contrastText,
      borderColor: 'transparent',
      borderWidth: '0px',
      hoverBackgroundColor: colorScale.dark,
      hoverColor: colorScale.contrastText,
      hoverBorderColor: 'transparent',
      activeBackgroundColor: colorScale[700],
      activeColor: colorScale.contrastText,
      focusOutlineColor: colorScale.alpha40,
      focusOutlineWidth: '3px',
      focusOutlineOffset: '2px',
      disabledBackgroundColor: neutralScale[200],
      disabledColor: neutralScale[500],
      disabledBorderColor: 'transparent',
    },
    soft: {
      backgroundColor: colorScale.alpha12,
      color: colorScale.dark,
      borderColor: 'transparent',
      borderWidth: '0px',
      hoverBackgroundColor: colorScale.alpha20,
      hoverColor: colorScale.dark,
      hoverBorderColor: 'transparent',
      activeBackgroundColor: colorScale.alpha30,
      activeColor: colorScale.dark,
      focusOutlineColor: colorScale.alpha40,
      focusOutlineWidth: '3px',
      focusOutlineOffset: '2px',
      disabledBackgroundColor: neutralScale[100],
      disabledColor: neutralScale[400],
      disabledBorderColor: 'transparent',
    },
    outlined: {
      backgroundColor: 'transparent',
      color: colorScale.main,
      borderColor: colorScale.main,
      borderWidth: '1.5px',
      hoverBackgroundColor: colorScale.alpha8,
      hoverColor: colorScale.main,
      hoverBorderColor: colorScale.dark,
      activeBackgroundColor: colorScale.alpha16,
      activeColor: colorScale.dark,
      focusOutlineColor: colorScale.alpha40,
      focusOutlineWidth: '3px',
      focusOutlineOffset: '2px',
      disabledBackgroundColor: 'transparent',
      disabledColor: neutralScale[400],
      disabledBorderColor: neutralScale[300],
    },
    ghost: {
      backgroundColor: 'transparent',
      color: neutralScale[700],
      borderColor: neutralScale[300],
      borderWidth: '1.5px',
      hoverBackgroundColor: neutralScale[100],
      hoverColor: neutralScale[800],
      hoverBorderColor: neutralScale[400],
      activeBackgroundColor: neutralScale[200],
      activeColor: neutralScale[900],
      focusOutlineColor: neutralScale.alpha40,
      focusOutlineWidth: '3px',
      focusOutlineOffset: '2px',
      disabledBackgroundColor: 'transparent',
      disabledColor: neutralScale[400],
      disabledBorderColor: neutralScale[200],
    },
    plain: {
      backgroundColor: 'transparent',
      color: colorScale.main,
      borderColor: 'transparent',
      borderWidth: '0px',
      hoverBackgroundColor: colorScale.alpha8,
      hoverColor: colorScale.dark,
      hoverBorderColor: 'transparent',
      activeBackgroundColor: colorScale.alpha16,
      activeColor: colorScale.dark,
      focusOutlineColor: colorScale.alpha40,
      focusOutlineWidth: '3px',
      focusOutlineOffset: '2px',
      disabledBackgroundColor: 'transparent',
      disabledColor: neutralScale[400],
      disabledBorderColor: 'transparent',
    },
  };

  return baseStyles[variant];
};

/**
 * Get CSS object for variant styles (for use with styled-components or emotion). Pass
 * `isDark` in dark mode (see `getColorScale`).
 */
export const getVariantCss = (variant: SorbetVariant, color: SorbetColor = 'primary', isDark = false) => {
  const styles = getVariantStyles(variant, color, isDark);

  return {
    backgroundColor: styles.backgroundColor,
    color: styles.color,
    border:
      styles.borderWidth !== '0px' ? `${styles.borderWidth} solid ${styles.borderColor}` : 'none',
    transition: 'all 0.2s ease-in-out',

    '&:hover:not(:disabled)': {
      backgroundColor: styles.hoverBackgroundColor,
      color: styles.hoverColor,
      borderColor: styles.hoverBorderColor,
    },

    '&:active:not(:disabled)': {
      backgroundColor: styles.activeBackgroundColor,
      color: styles.activeColor,
    },

    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 ${styles.focusOutlineWidth} ${styles.focusOutlineColor}`,
    },

    '&:disabled, &[aria-disabled="true"]': {
      backgroundColor: styles.disabledBackgroundColor,
      color: styles.disabledColor,
      borderColor: styles.disabledBorderColor,
      cursor: 'not-allowed',
      opacity: 0.7,
    },
  };
};

/**
 * Get loading state styles
 */
export const getLoadingStyles = () => ({
  position: 'relative' as const,
  cursor: 'wait',
  '& > *:not(.loading-indicator)': {
    opacity: 0.6,
  },
});

/**
 * Size presets for different component types
 */
export const sizePresets = {
  button: {
    xs: { height: 24, paddingX: 8, paddingY: 4, fontSize: 12, borderRadius: 4 },
    sm: { height: 32, paddingX: 12, paddingY: 6, fontSize: 13, borderRadius: 6 },
    md: { height: 40, paddingX: 16, paddingY: 8, fontSize: 14, borderRadius: 8 },
    lg: { height: 48, paddingX: 20, paddingY: 10, fontSize: 16, borderRadius: 10 },
    xl: { height: 56, paddingX: 24, paddingY: 12, fontSize: 18, borderRadius: 12 },
  },
  input: {
    xs: { height: 28, paddingX: 8, fontSize: 12, borderRadius: 4 },
    sm: { height: 36, paddingX: 12, fontSize: 13, borderRadius: 6 },
    md: { height: 44, paddingX: 14, fontSize: 14, borderRadius: 8 },
    lg: { height: 52, paddingX: 16, fontSize: 16, borderRadius: 10 },
    xl: { height: 60, paddingX: 18, fontSize: 18, borderRadius: 12 },
  },
  checkbox: {
    xs: { size: 16, iconSize: 12, borderRadius: 3 },
    sm: { size: 18, iconSize: 14, borderRadius: 4 },
    md: { size: 22, iconSize: 16, borderRadius: 5 },
    lg: { size: 26, iconSize: 20, borderRadius: 6 },
    xl: { size: 30, iconSize: 24, borderRadius: 7 },
  },
  radio: {
    xs: { size: 16, dotSize: 6 },
    sm: { size: 18, dotSize: 7 },
    md: { size: 22, dotSize: 9 },
    lg: { size: 26, dotSize: 11 },
    xl: { size: 30, dotSize: 13 },
  },
  switch: {
    xs: { width: 32, height: 18, thumbSize: 14 },
    sm: { width: 40, height: 22, thumbSize: 18 },
    md: { width: 52, height: 28, thumbSize: 24 },
    lg: { width: 64, height: 34, thumbSize: 30 },
    xl: { width: 76, height: 40, thumbSize: 36 },
  },
  avatar: {
    xs: { size: 24, fontSize: 10 },
    sm: { size: 32, fontSize: 12 },
    md: { size: 40, fontSize: 14 },
    lg: { size: 56, fontSize: 18 },
    xl: { size: 80, fontSize: 24 },
  },
  chip: {
    xs: { height: 20, paddingX: 6, fontSize: 11, borderRadius: 10 },
    sm: { height: 26, paddingX: 8, fontSize: 12, borderRadius: 13 },
    md: { height: 32, paddingX: 12, fontSize: 13, borderRadius: 16 },
    lg: { height: 38, paddingX: 16, fontSize: 14, borderRadius: 19 },
    xl: { height: 44, paddingX: 20, fontSize: 16, borderRadius: 22 },
  },
  badge: {
    xs: { minWidth: 14, height: 14, fontSize: 9, paddingX: 4 },
    sm: { minWidth: 18, height: 18, fontSize: 10, paddingX: 5 },
    md: { minWidth: 22, height: 22, fontSize: 11, paddingX: 6 },
    lg: { minWidth: 26, height: 26, fontSize: 13, paddingX: 8 },
    xl: { minWidth: 32, height: 32, fontSize: 15, paddingX: 10 },
  },
};
