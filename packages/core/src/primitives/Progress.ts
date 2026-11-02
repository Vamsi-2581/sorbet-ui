/**
 * Sorbet UI Core - Progress Primitives
 *
 * Headless progress utilities and types for building accessible progress indicators.
 */

import type { SorbetColor, SorbetSize, SorbetVariant } from '../types';

// =============================================================================
// TYPES
// =============================================================================

export type ProgressType = 'linear' | 'circular';

export interface ProgressProps {
  /** Current progress value (0-100) */
  value?: number;
  /** Visual variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Size preset */
  size?: SorbetSize;
  /** Progress type */
  type?: ProgressType;
  /** Indeterminate state (animated, unknown progress) */
  indeterminate?: boolean;
  /** Show value label */
  showValue?: boolean;
  /** Custom value formatter */
  formatValue?: (value: number) => string;
  /** Buffer value for buffered progress (0-100) */
  bufferValue?: number;
  /** Thickness for linear progress */
  thickness?: number;
  /** Custom ARIA label */
  'aria-label'?: string;
  /** ARIA labelledby */
  'aria-labelledby'?: string;
  /** Disable animation */
  disableAnimation?: boolean;
}

export interface CircularProgressProps extends ProgressProps {
  /** Size of circular progress (diameter) */
  circleSize?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Start angle (degrees, 0 = top) */
  startAngle?: number;
  /** End angle (degrees) for partial circles */
  endAngle?: number;
  /** Show track (background circle) */
  showTrack?: boolean;
}

export interface ProgressState {
  /** Normalized value (0-100) */
  value: number;
  /** Buffer value (0-100) */
  bufferValue: number;
  /** Whether progress is indeterminate */
  isIndeterminate: boolean;
  /** Whether progress is complete */
  isComplete: boolean;
  /** Percentage string */
  percentage: string;
  /** Formatted display value */
  displayValue: string;
}

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Clamp value to valid progress range
 */
export function clampProgress(value: number): number {
  return Math.max(0, Math.min(100, value));
}

/**
 * Default value formatter
 */
export function defaultFormatValue(value: number): string {
  return `${Math.round(value)}%`;
}

/**
 * Calculate progress state
 */
export function calculateProgressState(
  value: number | undefined,
  bufferValue: number | undefined,
  indeterminate: boolean | undefined,
  formatValue: (value: number) => string = defaultFormatValue
): ProgressState {
  const normalizedValue = clampProgress(value ?? 0);
  const normalizedBuffer = clampProgress(bufferValue ?? 100);

  return {
    value: normalizedValue,
    bufferValue: normalizedBuffer,
    isIndeterminate: indeterminate ?? false,
    isComplete: normalizedValue >= 100,
    percentage: `${normalizedValue}%`,
    displayValue: formatValue(normalizedValue),
  };
}

/**
 * Calculate circular progress SVG parameters
 */
export function calculateCircularProgress(
  size: number,
  strokeWidth: number,
  value: number,
  startAngle = -90,
  endAngle = 270
) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Calculate the arc length for the given value
  const totalAngle = endAngle - startAngle;
  const valueAngle = (value / 100) * totalAngle;

  // Convert angles to radians
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = ((startAngle + valueAngle) * Math.PI) / 180;

  // Calculate stroke-dashoffset for progress
  const dashOffset = circumference - (value / 100) * circumference;

  // Calculate arc path for non-full circles
  const startX = center + radius * Math.cos(startRad);
  const startY = center + radius * Math.sin(startRad);
  const endX = center + radius * Math.cos(endRad);
  const endY = center + radius * Math.sin(endRad);

  return {
    radius,
    circumference,
    center,
    dashOffset,
    dashArray: circumference,
    startX,
    startY,
    endX,
    endY,
    transform: `rotate(${startAngle + 90}, ${center}, ${center})`,
  };
}

/**
 * Get linear progress bar style
 */
export function getLinearProgressStyle(value: number): React.CSSProperties {
  return {
    width: `${value}%`,
    transition: 'width 0.3s ease-in-out',
  };
}

/**
 * Get linear buffer bar style
 */
export function getLinearBufferStyle(bufferValue: number): React.CSSProperties {
  return {
    width: `${bufferValue}%`,
    transition: 'width 0.3s ease-in-out',
  };
}

/**
 * Get ARIA attributes for progress
 */
export function getProgressAriaProps(state: ProgressState, label?: string, labelledBy?: string) {
  const baseProps = {
    role: 'progressbar' as const,
    'aria-label': label,
    'aria-labelledby': labelledBy,
  };

  if (state.isIndeterminate) {
    return {
      ...baseProps,
      'aria-valuetext': 'Loading...',
    };
  }

  return {
    ...baseProps,
    'aria-valuenow': state.value,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-valuetext': state.displayValue,
  };
}

/**
 * Size presets for progress components
 */
export const progressSizePresets = {
  linear: {
    xs: { height: 2 },
    sm: { height: 4 },
    md: { height: 6 },
    lg: { height: 8 },
    xl: { height: 12 },
  },
  circular: {
    xs: { size: 20, strokeWidth: 2 },
    sm: { size: 28, strokeWidth: 3 },
    md: { size: 40, strokeWidth: 4 },
    lg: { size: 56, strokeWidth: 5 },
    xl: { size: 80, strokeWidth: 6 },
  },
};

/**
 * Indeterminate animation keyframes (as CSS string)
 */
export const indeterminateKeyframes = {
  linear: `
    @keyframes sun-progress-linear-indeterminate {
      0% { left: -35%; right: 100%; }
      60% { left: 100%; right: -90%; }
      100% { left: 100%; right: -90%; }
    }
  `,
  circular: `
    @keyframes sun-progress-circular-indeterminate {
      0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
      50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
      100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
    }
    @keyframes sun-progress-circular-rotate {
      100% { transform: rotate(360deg); }
    }
  `,
};
