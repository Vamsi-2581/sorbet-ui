/**
 * Sorbet UI Core
 *
 * Core utilities, types, and presets for Sorbet UI components
 */

// Types
export * from './types';

// Variant presets
export * from './presets';

// Accessibility utilities
export * from './accessibility';

// Headless primitives
export * from './primitives';

// Re-export commonly used types
export type {
  SorbetA11yProps,
  SorbetAnchor,
  SorbetAnimationProps,
  SorbetBaseProps,
  SorbetButtonVariant,
  SorbetColor,
  SorbetComponentProps,
  SorbetFormComponentProps,
  SorbetFormProps,
  SorbetIconProps,
  SorbetInteractiveComponentProps,
  SorbetInteractiveProps,
  SorbetLoadingProps,
  SorbetPlacement,
  SorbetSize,
  SorbetSizeProps,
  SorbetStateProps,
  SorbetVariant,
  SorbetVariantProps,
} from './types';
