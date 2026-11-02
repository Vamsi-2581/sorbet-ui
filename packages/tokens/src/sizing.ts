/**
 * Sorbet UI Spacing & Sizing System
 *
 * Consistent spacing scale based on 4px grid
 * Size tokens for component dimensions
 */

// Spacing scale (based on 4px grid)
export const spacing = {
  0: '0px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px',
} as const;

// Component size presets
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const componentSizes = {
  // Button sizes (following DaisyUI scale: 6×4, 8×4, 10×4, 12×4, 14×4)
  button: {
    xs: { height: '24px', padding: '0 8px', fontSize: '0.6875rem', iconSize: '14px' },
    sm: { height: '32px', padding: '0 12px', fontSize: '0.75rem', iconSize: '16px' },
    md: { height: '40px', padding: '0 16px', fontSize: '0.875rem', iconSize: '18px' },
    lg: { height: '48px', padding: '0 20px', fontSize: '1.125rem', iconSize: '20px' },
    xl: { height: '56px', padding: '0 24px', fontSize: '1.375rem', iconSize: '24px' },
  },

  // Input/TextField sizes (following DaisyUI scale: 6×4, 8×4, 10×4, 12×4, 14×4)
  input: {
    xs: { height: '24px', padding: '0 8px', fontSize: '0.6875rem' },
    sm: { height: '32px', padding: '0 12px', fontSize: '0.75rem' },
    md: { height: '40px', padding: '0 14px', fontSize: '0.875rem' },
    lg: { height: '48px', padding: '0 16px', fontSize: '1.125rem' },
    xl: { height: '56px', padding: '0 18px', fontSize: '1.375rem' },
  },

  // Checkbox/Radio sizes (following DaisyUI scale: 4×4, 5×4, 6×4, 7×4, 8×4)
  control: {
    xs: { size: '16px', iconSize: '10px' },
    sm: { size: '20px', iconSize: '12px' },
    md: { size: '24px', iconSize: '14px' },
    lg: { size: '28px', iconSize: '18px' },
    xl: { size: '32px', iconSize: '22px' },
  },

  // Switch sizes (following DaisyUI toggle scale: 4×4, 5×4, 6×4, 7×4, 8×4)
  switch: {
    xs: { width: '28px', height: '16px', thumbSize: '12px' },
    sm: { width: '36px', height: '20px', thumbSize: '16px' },
    md: { width: '44px', height: '24px', thumbSize: '20px' },
    lg: { width: '52px', height: '28px', thumbSize: '24px' },
    xl: { width: '60px', height: '32px', thumbSize: '28px' },
  },

  // Avatar sizes
  avatar: {
    xs: { size: '24px', fontSize: '0.625rem' },
    sm: { size: '32px', fontSize: '0.75rem' },
    md: { size: '40px', fontSize: '0.875rem' },
    lg: { size: '56px', fontSize: '1.125rem' },
    xl: { size: '80px', fontSize: '1.5rem' },
  },

  // Badge sizes (following DaisyUI scale: 4×4, 5×4, 6×4, 7×4, 8×4)
  badge: {
    xs: { minWidth: '16px', height: '16px', fontSize: '0.625rem', padding: '0 6px' },
    sm: { minWidth: '20px', height: '20px', fontSize: '0.75rem', padding: '0 8px' },
    md: { minWidth: '24px', height: '24px', fontSize: '0.875rem', padding: '0 10px' },
    lg: { minWidth: '28px', height: '28px', fontSize: '1rem', padding: '0 12px' },
    xl: { minWidth: '32px', height: '32px', fontSize: '1.125rem', padding: '0 14px' },
  },

  // Chip sizes
  chip: {
    xs: { height: '20px', padding: '0 6px', fontSize: '0.6875rem' },
    sm: { height: '26px', padding: '0 8px', fontSize: '0.75rem' },
    md: { height: '32px', padding: '0 12px', fontSize: '0.8125rem' },
    lg: { height: '38px', padding: '0 16px', fontSize: '0.875rem' },
    xl: { height: '44px', padding: '0 20px', fontSize: '1rem' },
  },

  // Icon sizes
  icon: {
    xs: '14px',
    sm: '18px',
    md: '22px',
    lg: '28px',
    xl: '36px',
  },
} as const;

// Border radius presets
export const radius = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
} as const;

// Shadow presets
export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  // Focus rings
  focus: '0 0 0 3px rgba(14, 165, 233, 0.4)',
  focusDanger: '0 0 0 3px rgba(244, 63, 94, 0.4)',
  focusSuccess: '0 0 0 3px rgba(16, 185, 129, 0.4)',
  focusWarning: '0 0 0 3px rgba(245, 158, 11, 0.4)',
} as const;

// Z-index scale
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Breakpoints
export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export type Spacing = typeof spacing;
export type ComponentSizes = typeof componentSizes;
export type Radius = typeof radius;
export type Shadows = typeof shadows;
export type ZIndex = typeof zIndex;
export type Breakpoints = typeof breakpoints;
