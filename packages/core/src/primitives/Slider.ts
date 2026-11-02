/**
 * Sorbet UI Slider Primitives
 *
 * Headless slider utilities for building accessible slider components.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface SliderState {
  /** Current value(s) */
  value: number | number[];
  /** Minimum value */
  min: number;
  /** Maximum value */
  max: number;
  /** Step increment */
  step: number;
  /** Whether the slider is disabled */
  disabled: boolean;
  /** Whether the slider is a range slider */
  isRange: boolean;
}

export interface SliderMark {
  /** Value at which to place the mark */
  value: number;
  /** Optional label for the mark */
  label?: string;
}

export interface SliderThumbState {
  /** Index of the thumb (0 for single, 0 or 1 for range) */
  index: number;
  /** Current value of this thumb */
  value: number;
  /** Percentage position (0-100) */
  percent: number;
  /** Whether this thumb is focused */
  focused: boolean;
  /** Whether this thumb is being dragged */
  dragging: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Value Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Clamp a value between min and max
 */
export function clampValue(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Round a value to the nearest step
 */
export function roundToStep(value: number, step: number, min: number): number {
  const remainder = (value - min) % step;
  const lower = value - remainder;
  const upper = lower + step;
  return value - lower < upper - value ? lower : upper;
}

/**
 * Convert a value to a percentage position
 */
export function valueToPercent(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100;
}

/**
 * Convert a percentage position to a value
 */
export function percentToValue(percent: number, min: number, max: number, step: number): number {
  const rawValue = (percent / 100) * (max - min) + min;
  return roundToStep(rawValue, step, min);
}

/**
 * Get the percentage for a single value or array of values
 */
export function getPercentages(value: number | number[], min: number, max: number): number[] {
  const values = Array.isArray(value) ? value : [value];
  return values.map((v) => valueToPercent(v, min, max));
}

/**
 * Normalize value to always be an array
 */
export function normalizeValue(value: number | number[]): number[] {
  return Array.isArray(value) ? value : [value];
}

// ─────────────────────────────────────────────────────────────────────────────
// Keyboard Navigation
// ─────────────────────────────────────────────────────────────────────────────

export type SliderKeyboardAction =
  | 'increment'
  | 'decrement'
  | 'incrementLarge'
  | 'decrementLarge'
  | 'setMin'
  | 'setMax'
  | null;

/**
 * Get the action for a keyboard event
 */
export function getSliderKeyboardAction(
  event: KeyboardEvent | React.KeyboardEvent
): SliderKeyboardAction {
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      return 'increment';
    case 'ArrowLeft':
    case 'ArrowDown':
      return 'decrement';
    case 'PageUp':
      return 'incrementLarge';
    case 'PageDown':
      return 'decrementLarge';
    case 'Home':
      return 'setMin';
    case 'End':
      return 'setMax';
    default:
      return null;
  }
}

/**
 * Calculate the new value based on keyboard action
 */
export function getValueFromKeyboard(
  currentValue: number,
  action: SliderKeyboardAction,
  min: number,
  max: number,
  step: number,
  largeStep?: number
): number {
  const bigStep = largeStep ?? step * 10;

  switch (action) {
    case 'increment':
      return clampValue(currentValue + step, min, max);
    case 'decrement':
      return clampValue(currentValue - step, min, max);
    case 'incrementLarge':
      return clampValue(currentValue + bigStep, min, max);
    case 'decrementLarge':
      return clampValue(currentValue - bigStep, min, max);
    case 'setMin':
      return min;
    case 'setMax':
      return max;
    default:
      return currentValue;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Mark Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate marks at regular intervals
 */
export function generateMarks(
  min: number,
  max: number,
  step: number,
  includeLabels = false
): SliderMark[] {
  const marks: SliderMark[] = [];
  for (let value = min; value <= max; value += step) {
    marks.push({
      value,
      label: includeLabels ? String(value) : undefined,
    });
  }
  return marks;
}

/**
 * Get the position style for a mark
 */
export function getMarkStyle(
  mark: SliderMark,
  min: number,
  max: number,
  orientation: 'horizontal' | 'vertical' = 'horizontal'
): { left?: string; bottom?: string } {
  const percent = valueToPercent(mark.value, min, max);
  if (orientation === 'vertical') {
    return { bottom: `${percent}%` };
  }
  return { left: `${percent}%` };
}

// ─────────────────────────────────────────────────────────────────────────────
// ARIA Utilities
// ─────────────────────────────────────────────────────────────────────────────

export interface SliderAriaProps {
  role: 'slider';
  'aria-valuemin': number;
  'aria-valuemax': number;
  'aria-valuenow': number;
  'aria-valuetext'?: string;
  'aria-orientation': 'horizontal' | 'vertical';
  'aria-disabled'?: boolean;
  tabIndex: number;
}

/**
 * Get ARIA attributes for a slider thumb
 */
export function getSliderAriaAttributes(
  value: number,
  min: number,
  max: number,
  disabled: boolean,
  orientation: 'horizontal' | 'vertical' = 'horizontal',
  valueText?: string | ((value: number) => string)
): SliderAriaProps {
  const ariaValueText = typeof valueText === 'function' ? valueText(value) : valueText;

  return {
    role: 'slider',
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': value,
    ...(ariaValueText && { 'aria-valuetext': ariaValueText }),
    'aria-orientation': orientation,
    ...(disabled && { 'aria-disabled': true }),
    tabIndex: disabled ? -1 : 0,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Track Utilities
// ─────────────────────────────────────────────────────────────────────────────

export interface TrackStyle {
  left?: string;
  right?: string;
  width?: string;
  bottom?: string;
  top?: string;
  height?: string;
}

/**
 * Get the style for the filled track portion
 */
export function getTrackStyle(
  value: number | number[],
  min: number,
  max: number,
  orientation: 'horizontal' | 'vertical' = 'horizontal'
): TrackStyle {
  const values = normalizeValue(value);
  const percentages = getPercentages(values, min, max);

  if (values.length === 1) {
    // Single thumb: track from start to thumb
    if (orientation === 'vertical') {
      return { bottom: '0%', height: `${percentages[0]}%` };
    }
    return { left: '0%', width: `${percentages[0]}%` };
  }

  // Range: track between two thumbs
  const [startPercent, endPercent] = percentages.sort((a, b) => a - b);
  if (orientation === 'vertical') {
    return {
      bottom: `${startPercent}%`,
      height: `${endPercent - startPercent}%`,
    };
  }
  return {
    left: `${startPercent}%`,
    width: `${endPercent - startPercent}%`,
  };
}
