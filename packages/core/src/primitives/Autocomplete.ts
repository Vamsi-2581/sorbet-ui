/**
 * Sorbet UI Autocomplete Primitives
 *
 * Headless autocomplete utilities for building accessible combobox components.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface AutocompleteOption<T = unknown> {
  /** Unique identifier */
  id: string | number;
  /** Display label */
  label: string;
  /** Original value */
  value: T;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Optional group this option belongs to */
  group?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

export interface AutocompleteState<T = unknown> {
  /** Currently selected value(s) */
  value: T | T[] | null;
  /** Current input value */
  inputValue: string;
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Currently highlighted option index */
  highlightedIndex: number;
  /** Available options */
  options: AutocompleteOption<T>[];
  /** Filtered options based on input */
  filteredOptions: AutocompleteOption<T>[];
  /** Whether multiple selection is allowed */
  multiple: boolean;
  /** Whether the component is disabled */
  disabled: boolean;
  /** Whether the component is loading */
  loading: boolean;
}

export interface AutocompleteGroupedOptions<T = unknown> {
  group: string;
  options: AutocompleteOption<T>[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Filtering Utilities
// ─────────────────────────────────────────────────────────────────────────────

export type FilterFunction<T = unknown> = (
  options: AutocompleteOption<T>[],
  inputValue: string
) => AutocompleteOption<T>[];

/**
 * Default filter function - case insensitive contains
 */
export function defaultFilterOptions<T>(
  options: AutocompleteOption<T>[],
  inputValue: string
): AutocompleteOption<T>[] {
  const searchValue = inputValue.toLowerCase().trim();
  if (!searchValue) return options;

  return options.filter((option) => option.label.toLowerCase().includes(searchValue));
}

/**
 * Filter that matches from the start of the string
 */
export function startsWithFilter<T>(
  options: AutocompleteOption<T>[],
  inputValue: string
): AutocompleteOption<T>[] {
  const searchValue = inputValue.toLowerCase().trim();
  if (!searchValue) return options;

  return options.filter((option) => option.label.toLowerCase().startsWith(searchValue));
}

/**
 * Fuzzy filter that matches characters in order
 */
export function fuzzyFilter<T>(
  options: AutocompleteOption<T>[],
  inputValue: string
): AutocompleteOption<T>[] {
  const searchValue = inputValue.toLowerCase().trim();
  if (!searchValue) return options;

  return options.filter((option) => {
    const label = option.label.toLowerCase();
    let searchIndex = 0;

    for (const char of label) {
      if (char === searchValue[searchIndex]) {
        searchIndex++;
        if (searchIndex === searchValue.length) return true;
      }
    }

    return false;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Grouping Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Group options by their group property
 */
export function groupOptions<T>(options: AutocompleteOption<T>[]): AutocompleteGroupedOptions<T>[] {
  const groups = new Map<string, AutocompleteOption<T>[]>();
  const ungrouped: AutocompleteOption<T>[] = [];

  for (const option of options) {
    if (option.group) {
      const existing = groups.get(option.group) || [];
      existing.push(option);
      groups.set(option.group, existing);
    } else {
      ungrouped.push(option);
    }
  }

  const result: AutocompleteGroupedOptions<T>[] = [];

  if (ungrouped.length > 0) {
    result.push({ group: '', options: ungrouped });
  }

  for (const [group, groupOptions] of groups) {
    result.push({ group, options: groupOptions });
  }

  return result;
}

/**
 * Flatten grouped options back to a single array
 */
export function flattenGroupedOptions<T>(
  groupedOptions: AutocompleteGroupedOptions<T>[]
): AutocompleteOption<T>[] {
  return groupedOptions.flatMap((group) => group.options);
}

// ─────────────────────────────────────────────────────────────────────────────
// Selection Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check if an option is selected
 */
export function isOptionSelected<T>(
  option: AutocompleteOption<T>,
  value: T | T[] | null,
  multiple: boolean,
  isEqual?: (a: T, b: T) => boolean
): boolean {
  if (value === null) return false;

  const compareFn = isEqual || ((a: T, b: T) => a === b);

  if (multiple && Array.isArray(value)) {
    return value.some((v) => compareFn(v, option.value));
  }

  return compareFn(value as T, option.value);
}

/**
 * Get the new value after selecting an option
 */
export function getNewAutocompleteValue<T>(
  option: AutocompleteOption<T>,
  currentValue: T | T[] | null,
  multiple: boolean,
  isEqual?: (a: T, b: T) => boolean
): T | T[] | null {
  if (!multiple) {
    return option.value;
  }

  const currentArray = Array.isArray(currentValue)
    ? currentValue
    : currentValue !== null
      ? [currentValue]
      : [];

  const compareFn = isEqual || ((a: T, b: T) => a === b);
  const isSelected = currentArray.some((v) => compareFn(v, option.value));

  if (isSelected) {
    return currentArray.filter((v) => !compareFn(v, option.value));
  }

  return [...currentArray, option.value];
}

/**
 * Get the display value for the input
 */
export function getInputDisplayValue<T>(
  value: T | T[] | null,
  options: AutocompleteOption<T>[],
  multiple: boolean,
  getOptionLabel?: (option: AutocompleteOption<T>) => string
): string {
  if (value === null) return '';

  const labelFn = getOptionLabel || ((opt: AutocompleteOption<T>) => opt.label);

  if (multiple) {
    return ''; // For multiple, typically show chips instead
  }

  const selectedOption = options.find((opt) => opt.value === value);
  return selectedOption ? labelFn(selectedOption) : '';
}

// ─────────────────────────────────────────────────────────────────────────────
// Keyboard Navigation
// ─────────────────────────────────────────────────────────────────────────────

export type AutocompleteKeyboardAction =
  | 'open'
  | 'close'
  | 'highlightNext'
  | 'highlightPrevious'
  | 'highlightFirst'
  | 'highlightLast'
  | 'select'
  | 'clear'
  | 'removeLastChip'
  | null;

/**
 * Get the action for a keyboard event
 */
export function getAutocompleteKeyboardAction(
  event: KeyboardEvent | React.KeyboardEvent,
  isOpen: boolean,
  hasValue: boolean,
  inputValue: string
): AutocompleteKeyboardAction {
  switch (event.key) {
    case 'ArrowDown':
      return isOpen ? 'highlightNext' : 'open';
    case 'ArrowUp':
      return isOpen ? 'highlightPrevious' : 'open';
    case 'Home':
      return isOpen ? 'highlightFirst' : null;
    case 'End':
      return isOpen ? 'highlightLast' : null;
    case 'Enter':
      return isOpen ? 'select' : null;
    case 'Escape':
      return isOpen ? 'close' : hasValue ? 'clear' : null;
    case 'Backspace':
      return inputValue === '' && hasValue ? 'removeLastChip' : null;
    default:
      return null;
  }
}

/**
 * Get the next highlighted index
 */
export function getNextHighlightedIndex<T>(
  currentIndex: number,
  options: AutocompleteOption<T>[],
  action: AutocompleteKeyboardAction
): number {
  const enabledIndices = options
    .map((opt, idx) => ({ opt, idx }))
    .filter(({ opt }) => !opt.disabled)
    .map(({ idx }) => idx);

  if (enabledIndices.length === 0) return -1;

  switch (action) {
    case 'highlightNext': {
      if (currentIndex === -1) return enabledIndices[0];
      const currentPos = enabledIndices.indexOf(currentIndex);
      const nextPos = (currentPos + 1) % enabledIndices.length;
      return enabledIndices[nextPos];
    }
    case 'highlightPrevious': {
      if (currentIndex === -1) return enabledIndices[enabledIndices.length - 1];
      const currentPos = enabledIndices.indexOf(currentIndex);
      const prevPos = currentPos <= 0 ? enabledIndices.length - 1 : currentPos - 1;
      return enabledIndices[prevPos];
    }
    case 'highlightFirst':
      return enabledIndices[0];
    case 'highlightLast':
      return enabledIndices[enabledIndices.length - 1];
    default:
      return currentIndex;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ARIA Utilities
// ─────────────────────────────────────────────────────────────────────────────

export interface ComboboxAriaProps {
  role: 'combobox';
  'aria-expanded': boolean;
  'aria-haspopup': 'listbox';
  'aria-controls'?: string;
  'aria-activedescendant'?: string;
  'aria-autocomplete': 'list' | 'both' | 'none';
  'aria-disabled'?: boolean;
}

export interface ListboxAriaProps {
  role: 'listbox';
  id: string;
  'aria-label'?: string;
  'aria-multiselectable'?: boolean;
}

export interface OptionAriaProps {
  role: 'option';
  id: string;
  'aria-selected': boolean;
  'aria-disabled'?: boolean;
}

/**
 * Get ARIA attributes for the combobox input
 */
export function getComboboxAriaAttributes(
  isOpen: boolean,
  highlightedIndex: number,
  _options: AutocompleteOption<unknown>[],
  listboxId: string,
  disabled: boolean,
  autocomplete: 'list' | 'both' | 'none' = 'list'
): ComboboxAriaProps {
  const activeDescendant =
    highlightedIndex >= 0 ? `${listboxId}-option-${highlightedIndex}` : undefined;

  return {
    role: 'combobox',
    'aria-expanded': isOpen,
    'aria-haspopup': 'listbox',
    'aria-controls': isOpen ? listboxId : undefined,
    'aria-activedescendant': activeDescendant,
    'aria-autocomplete': autocomplete,
    ...(disabled && { 'aria-disabled': true }),
  };
}

/**
 * Get ARIA attributes for the listbox
 */
export function getListboxAriaAttributes(
  id: string,
  multiple: boolean,
  label?: string
): ListboxAriaProps {
  return {
    role: 'listbox',
    id,
    ...(label && { 'aria-label': label }),
    ...(multiple && { 'aria-multiselectable': true }),
  };
}

/**
 * Get ARIA attributes for an option
 */
export function getOptionAriaAttributes(
  listboxId: string,
  index: number,
  isSelected: boolean,
  isDisabled: boolean
): OptionAriaProps {
  return {
    role: 'option',
    id: `${listboxId}-option-${index}`,
    'aria-selected': isSelected,
    ...(isDisabled && { 'aria-disabled': true }),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create autocomplete options from a simple array of strings
 */
export function createOptionsFromStrings(values: string[]): AutocompleteOption<string>[] {
  return values.map((value, index) => ({
    id: index,
    label: value,
    value,
  }));
}

/**
 * Create autocomplete options from objects
 */
export function createOptionsFromObjects<T extends { id?: string | number }>(
  items: T[],
  labelKey: keyof T
): AutocompleteOption<T>[] {
  return items.map((item, index) => ({
    id: item.id ?? index,
    label: String(item[labelKey]),
    value: item,
  }));
}

/**
 * Highlight matching text in a label
 */
export function getHighlightedParts(
  label: string,
  query: string
): Array<{ text: string; highlight: boolean }> {
  if (!query.trim()) {
    return [{ text: label, highlight: false }];
  }

  const parts: Array<{ text: string; highlight: boolean }> = [];
  const lowerLabel = label.toLowerCase();
  const lowerQuery = query.toLowerCase();
  let lastIndex = 0;

  let index = lowerLabel.indexOf(lowerQuery);
  while (index !== -1) {
    if (index > lastIndex) {
      parts.push({
        text: label.slice(lastIndex, index),
        highlight: false,
      });
    }
    parts.push({
      text: label.slice(index, index + query.length),
      highlight: true,
    });
    lastIndex = index + query.length;
    index = lowerLabel.indexOf(lowerQuery, lastIndex);
  }

  if (lastIndex < label.length) {
    parts.push({
      text: label.slice(lastIndex),
      highlight: false,
    });
  }

  return parts;
}
