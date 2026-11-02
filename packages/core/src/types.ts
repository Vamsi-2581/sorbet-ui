/**
 * Sorbet UI Shared Types
 *
 * Common type definitions used across all components
 */

import type { CSSProperties } from 'react';

/**
 * Variant presets - The 5 standard Sorbet UI variants
 * These are the core branded presets available across all components
 */
export type SorbetVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';

/**
 * Extended variants for Button component (includes additional link-style variants)
 */
export type SorbetButtonVariant = SorbetVariant | 'dash' | 'link';

/**
 * Semantic colors - 7 color schemes for all components
 */
export type SorbetColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral';

/**
 * Component sizes
 */
export type SorbetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Positions for tooltips, popovers, etc.
 */
export type SorbetPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

/**
 * Anchor positions for drawers
 */
export type SorbetAnchor = 'top' | 'bottom' | 'left' | 'right';

/**
 * Common component states
 */
export interface SorbetStateProps {
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is in a loading state */
  loading?: boolean;
  /** Whether the component is in an error state */
  error?: boolean;
  /** Whether the component is in a success state */
  success?: boolean;
  /** Whether the component is read-only */
  readOnly?: boolean;
  /** Whether the component is required */
  required?: boolean;
}

/**
 * Base props for all Sorbet UI components
 */
export interface SorbetBaseProps {
  /** Unique identifier for the component */
  id?: string;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Test ID for automated testing */
  'data-testid'?: string;
}

/**
 * Props for components that support variants
 */
export interface SorbetVariantProps {
  /** Visual variant of the component */
  variant?: SorbetVariant;
  /** Color scheme of the component */
  color?: SorbetColor;
}

/**
 * Props for components that support sizing
 */
export interface SorbetSizeProps {
  /** Size of the component */
  size?: SorbetSize;
  /** Full width mode */
  fullWidth?: boolean;
}

/**
 * Props for interactive components
 */
export interface SorbetInteractiveProps extends SorbetStateProps {
  /** Click handler */
  onClick?: (event: React.MouseEvent) => void;
  /** Focus handler */
  onFocus?: (event: React.FocusEvent) => void;
  /** Blur handler */
  onBlur?: (event: React.FocusEvent) => void;
  /** Keyboard handler */
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

/**
 * Props for form components
 */
export interface SorbetFormProps extends SorbetStateProps {
  /** Current value */
  value?: string | number | boolean;
  /** Default value (for uncontrolled mode) */
  defaultValue?: string | number | boolean;
  /** Change handler */
  onChange?: (event: React.ChangeEvent<any>) => void;
  /** Form field name */
  name?: string;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Placeholder text */
  placeholder?: string;
}

/**
 * Accessibility props
 */
export interface SorbetA11yProps {
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelledby reference */
  'aria-labelledby'?: string;
  /** ARIA describedby reference */
  'aria-describedby'?: string;
  /** ARIA live region */
  'aria-live'?: 'off' | 'polite' | 'assertive';
  /** ARIA role */
  role?: string;
  /** Tab index */
  tabIndex?: number;
}

/**
 * Icon props for components with icon support
 */
export interface SorbetIconProps {
  /** Icon to show at the start (left in LTR) */
  startIcon?: React.ReactNode;
  /** Icon to show at the end (right in LTR) */
  endIcon?: React.ReactNode;
  /** Size of the icons */
  iconSize?: SorbetSize | number;
}

/**
 * Loading props
 */
export interface SorbetLoadingProps {
  /** Whether component is in loading state */
  loading?: boolean;
  /** Custom loading indicator */
  loadingIndicator?: React.ReactNode;
  /** Position of loading indicator */
  loadingPosition?: 'start' | 'end' | 'center';
}

/**
 * Animation props
 */
export interface SorbetAnimationProps {
  /** Disable all animations */
  disableAnimation?: boolean;
  /** Entrance animation */
  enterAnimation?: string;
  /** Exit animation */
  exitAnimation?: string;
  /** Animation duration */
  animationDuration?: number | string;
}

/**
 * Common combined props for Sorbet UI components
 */
export interface SorbetComponentProps
  extends SorbetBaseProps, SorbetVariantProps, SorbetSizeProps, SorbetA11yProps {}

/**
 * Combined props for interactive Sorbet UI components
 */
export interface SorbetInteractiveComponentProps
  extends SorbetComponentProps, SorbetInteractiveProps, SorbetIconProps, SorbetLoadingProps {}

/**
 * Combined props for form Sorbet UI components
 */
export interface SorbetFormComponentProps extends SorbetComponentProps, SorbetFormProps, SorbetIconProps {}
