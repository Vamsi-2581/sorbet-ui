/**
 * Sorbet UI ToggleButtonGroup Primitives
 *
 * Headless toggle button group utilities for building accessible toggle components.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ToggleButtonItem<T = string> {
  /** Unique value for this button */
  value: T;
  /** Display label */
  label?: string;
  /** Whether this button is disabled */
  disabled?: boolean;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Accessible label if no visible label */
  ariaLabel?: string;
}

export interface ToggleButtonGroupState<T = string> {
  /** Currently selected value(s) */
  value: T | T[] | null;
  /** Whether multiple selection is allowed */
  exclusive: boolean;
  /** Whether the group is disabled */
  disabled: boolean;
  /** Whether at least one button must be selected */
  enforceValueSet: boolean;
  /** Orientation of the group */
  orientation: 'horizontal' | 'vertical';
}

export interface ToggleButtonState {
  /** Whether this button is selected */
  selected: boolean;
  /** Whether this button is disabled */
  disabled: boolean;
  /** Whether this button is focused */
  focused: boolean;
  /** Position in the group */
  index: number;
  /** Whether this is the first button */
  isFirst: boolean;
  /** Whether this is the last button */
  isLast: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Selection Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check if a value is selected
 */
export function isValueSelected<T>(
  value: T,
  selectedValue: T | T[] | null,
  exclusive: boolean
): boolean {
  if (selectedValue === null) return false;

  if (exclusive) {
    return selectedValue === value;
  }

  return Array.isArray(selectedValue) && selectedValue.includes(value);
}

/**
 * Get the new value after toggling a button
 */
export function getNewToggleValue<T>(
  buttonValue: T,
  currentValue: T | T[] | null,
  exclusive: boolean,
  enforceValueSet: boolean
): T | T[] | null {
  if (exclusive) {
    // Exclusive mode: only one can be selected
    if (currentValue === buttonValue) {
      return enforceValueSet ? buttonValue : null;
    }
    return buttonValue;
  }

  // Non-exclusive mode: multiple can be selected
  const currentArray = Array.isArray(currentValue)
    ? currentValue
    : currentValue !== null
      ? [currentValue]
      : [];

  const isCurrentlySelected = currentArray.includes(buttonValue);

  if (isCurrentlySelected) {
    const newArray = currentArray.filter((v) => v !== buttonValue);
    if (enforceValueSet && newArray.length === 0) {
      return currentArray;
    }
    return newArray;
  }

  return [...currentArray, buttonValue];
}

/**
 * Get the count of selected values
 */
export function getSelectedCount<T>(value: T | T[] | null, exclusive: boolean): number {
  if (value === null) return 0;
  if (exclusive) return 1;
  return Array.isArray(value) ? value.length : 1;
}

// ─────────────────────────────────────────────────────────────────────────────
// Keyboard Navigation
// ─────────────────────────────────────────────────────────────────────────────

export type ToggleGroupKeyboardAction = 'next' | 'previous' | 'first' | 'last' | 'select' | null;

/**
 * Get the action for a keyboard event
 */
export function getToggleGroupKeyboardAction(
  event: KeyboardEvent | React.KeyboardEvent,
  orientation: 'horizontal' | 'vertical'
): ToggleGroupKeyboardAction {
  switch (event.key) {
    case 'ArrowRight':
      return orientation === 'horizontal' ? 'next' : null;
    case 'ArrowLeft':
      return orientation === 'horizontal' ? 'previous' : null;
    case 'ArrowDown':
      return orientation === 'vertical' ? 'next' : null;
    case 'ArrowUp':
      return orientation === 'vertical' ? 'previous' : null;
    case 'Home':
      return 'first';
    case 'End':
      return 'last';
    case 'Enter':
    case ' ':
      return 'select';
    default:
      return null;
  }
}

/**
 * Get the next focusable button index
 */
export function getNextFocusableIndex<T>(
  currentIndex: number,
  items: ToggleButtonItem<T>[],
  action: ToggleGroupKeyboardAction
): number {
  const enabledIndices = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !item.disabled)
    .map(({ index }) => index);

  if (enabledIndices.length === 0) return currentIndex;

  const currentEnabledIndex = enabledIndices.indexOf(currentIndex);

  switch (action) {
    case 'next': {
      const nextIndex = currentEnabledIndex + 1;
      return enabledIndices[nextIndex % enabledIndices.length];
    }
    case 'previous': {
      const prevIndex =
        currentEnabledIndex <= 0 ? enabledIndices.length - 1 : currentEnabledIndex - 1;
      return enabledIndices[prevIndex];
    }
    case 'first':
      return enabledIndices[0];
    case 'last':
      return enabledIndices[enabledIndices.length - 1];
    default:
      return currentIndex;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Button State Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get the state of a toggle button
 */
export function getToggleButtonState<T>(
  item: ToggleButtonItem<T>,
  index: number,
  totalCount: number,
  selectedValue: T | T[] | null,
  exclusive: boolean,
  groupDisabled: boolean,
  focusedIndex: number
): ToggleButtonState {
  return {
    selected: isValueSelected(item.value, selectedValue, exclusive),
    disabled: groupDisabled || !!item.disabled,
    focused: focusedIndex === index,
    index,
    isFirst: index === 0,
    isLast: index === totalCount - 1,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// ARIA Utilities
// ─────────────────────────────────────────────────────────────────────────────

export interface ToggleGroupAriaProps {
  role: 'group';
  'aria-label'?: string;
  'aria-orientation': 'horizontal' | 'vertical';
  'aria-disabled'?: boolean;
}

export interface ToggleButtonAriaProps {
  role: 'button';
  'aria-pressed': boolean;
  'aria-disabled'?: boolean;
  'aria-label'?: string;
  tabIndex: number;
}

/**
 * Get ARIA attributes for the toggle button group
 */
export function getToggleGroupAriaAttributes(
  orientation: 'horizontal' | 'vertical',
  disabled: boolean,
  label?: string
): ToggleGroupAriaProps {
  return {
    role: 'group',
    ...(label && { 'aria-label': label }),
    'aria-orientation': orientation,
    ...(disabled && { 'aria-disabled': true }),
  };
}

/**
 * Get ARIA attributes for a toggle button
 */
export function getToggleButtonAriaAttributes(
  selected: boolean,
  disabled: boolean,
  isFocusable: boolean,
  ariaLabel?: string
): ToggleButtonAriaProps {
  return {
    role: 'button',
    'aria-pressed': selected,
    ...(disabled && { 'aria-disabled': true }),
    ...(ariaLabel && { 'aria-label': ariaLabel }),
    tabIndex: isFocusable ? 0 : -1,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create toggle button items from a simple array of values
 */
export function createToggleItems<T extends string>(values: T[]): ToggleButtonItem<T>[] {
  return values.map((value) => ({
    value,
    label: value,
  }));
}

/**
 * Get the first selected value (useful for exclusive mode)
 */
export function getFirstSelectedValue<T>(value: T | T[] | null): T | null {
  if (value === null) return null;
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
}
