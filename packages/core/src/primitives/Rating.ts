/**
 * Sorbet UI Rating Primitives
 *
 * Headless rating utilities for building accessible rating components.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface RatingState {
  /** Current value */
  value: number | null;
  /** Hover value (during interaction) */
  hoverValue: number;
  /** Maximum rating value */
  max: number;
  /** Precision for fractional ratings */
  precision: number;
  /** Whether the rating is disabled */
  disabled: boolean;
  /** Whether the rating is read-only */
  readOnly: boolean;
}

export interface RatingItemState {
  /** Index of this rating item (1-based) */
  index: number;
  /** Whether this item is filled */
  filled: boolean;
  /** Whether this item is active (hovered or selected) */
  active: boolean;
  /** Whether this item is partially filled */
  partial: boolean;
  /** Fill percentage for partial ratings (0-100) */
  fillPercent: number;
  /** Whether this item is the current hover target */
  isHovered: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Value Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Round value to nearest precision
 */
export function roundToPrecision(value: number, precision: number): number {
  return Math.round(value / precision) * precision;
}

/**
 * Clamp rating value between 0 and max
 */
export function clampRating(value: number | null, max: number): number | null {
  if (value === null) return null;
  return Math.min(Math.max(0, value), max);
}

/**
 * Get the display value (hover value takes precedence)
 */
export function getDisplayValue(value: number | null, hoverValue: number): number {
  if (hoverValue !== -1) return hoverValue;
  return value ?? 0;
}

/**
 * Calculate rating value from mouse position
 */
export function getRatingFromPosition(
  position: number,
  containerWidth: number,
  max: number,
  precision: number,
  isRTL = false
): number {
  let percent = position / containerWidth;
  if (isRTL) {
    percent = 1 - percent;
  }
  const rawValue = percent * max;
  return roundToPrecision(Math.max(precision, rawValue), precision);
}

// ─────────────────────────────────────────────────────────────────────────────
// Item State Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get the state of a single rating item
 */
export function getRatingItemState(
  itemIndex: number,
  value: number,
  hoverValue: number
): RatingItemState {
  const displayValue = getDisplayValue(value, hoverValue);
  const filled = itemIndex <= Math.floor(displayValue);
  const partial = !filled && itemIndex === Math.ceil(displayValue) && displayValue % 1 !== 0;
  const fillPercent = partial ? (displayValue % 1) * 100 : filled ? 100 : 0;

  return {
    index: itemIndex,
    filled,
    active: itemIndex <= displayValue,
    partial,
    fillPercent,
    isHovered: hoverValue !== -1 && itemIndex <= hoverValue,
  };
}

/**
 * Get all rating item states
 */
export function getAllRatingItemStates(
  max: number,
  value: number | null,
  hoverValue: number
): RatingItemState[] {
  const items: RatingItemState[] = [];
  const displayValue = value ?? 0;

  for (let i = 1; i <= max; i++) {
    items.push(getRatingItemState(i, displayValue, hoverValue));
  }

  return items;
}

// ─────────────────────────────────────────────────────────────────────────────
// Keyboard Navigation
// ─────────────────────────────────────────────────────────────────────────────

export type RatingKeyboardAction = 'increment' | 'decrement' | 'setMin' | 'setMax' | 'clear' | null;

/**
 * Get the action for a keyboard event
 */
export function getRatingKeyboardAction(
  event: KeyboardEvent | React.KeyboardEvent
): RatingKeyboardAction {
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      return 'increment';
    case 'ArrowLeft':
    case 'ArrowDown':
      return 'decrement';
    case 'Home':
      return 'setMin';
    case 'End':
      return 'setMax';
    case 'Backspace':
    case 'Delete':
      return 'clear';
    default:
      return null;
  }
}

/**
 * Calculate new value from keyboard action
 */
export function getValueFromRatingKeyboard(
  currentValue: number | null,
  action: RatingKeyboardAction,
  max: number,
  precision: number
): number | null {
  const value = currentValue ?? 0;

  switch (action) {
    case 'increment':
      return Math.min(value + precision, max);
    case 'decrement':
      return Math.max(value - precision, 0);
    case 'setMin':
      return precision;
    case 'setMax':
      return max;
    case 'clear':
      return null;
    default:
      return currentValue;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ARIA Utilities
// ─────────────────────────────────────────────────────────────────────────────

export interface RatingAriaProps {
  role: 'slider';
  'aria-valuemin': number;
  'aria-valuemax': number;
  'aria-valuenow': number | undefined;
  'aria-valuetext': string;
  'aria-label'?: string;
  'aria-disabled'?: boolean;
  'aria-readonly'?: boolean;
  tabIndex: number;
}

/**
 * Get ARIA attributes for the rating component
 */
export function getRatingAriaAttributes(
  value: number | null,
  max: number,
  disabled: boolean,
  readOnly: boolean,
  label?: string,
  getLabelText?: (value: number) => string
): RatingAriaProps {
  const displayValue = value ?? 0;
  const defaultLabelText = `${displayValue} out of ${max} stars`;
  const valueText = getLabelText ? getLabelText(displayValue) : defaultLabelText;

  return {
    role: 'slider',
    'aria-valuemin': 0,
    'aria-valuemax': max,
    'aria-valuenow': value ?? undefined,
    'aria-valuetext': valueText,
    ...(label && { 'aria-label': label }),
    ...(disabled && { 'aria-disabled': true }),
    ...(readOnly && { 'aria-readonly': true }),
    tabIndex: disabled ? -1 : 0,
  };
}

/**
 * Get ARIA attributes for individual rating items (radio-like pattern)
 */
export function getRatingItemAriaAttributes(
  itemIndex: number,
  value: number | null,
  max: number,
  disabled: boolean
): Record<string, unknown> {
  const isSelected = value !== null && itemIndex <= value;

  return {
    role: 'radio',
    'aria-checked': isSelected,
    'aria-posinset': itemIndex,
    'aria-setsize': max,
    ...(disabled && { 'aria-disabled': true }),
    tabIndex: -1,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Label Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Default label text generator
 */
export function getDefaultRatingLabel(value: number): string {
  if (value === 1) return '1 Star';
  return `${value} Stars`;
}

/**
 * Generate labels for all rating values
 */
export function generateRatingLabels(
  max: number,
  precision: number,
  getLabelText: (value: number) => string = getDefaultRatingLabel
): Map<number, string> {
  const labels = new Map<number, string>();

  for (let i = precision; i <= max; i += precision) {
    labels.set(i, getLabelText(i));
  }

  return labels;
}
