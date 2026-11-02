/**
 * Sorbet UI Core - Tabs Primitives
 *
 * Headless tabs utilities and types for building accessible tab interfaces.
 * Based on WAI-ARIA Tabs Pattern.
 */

import type { SorbetColor, SorbetSize, SorbetVariant } from '../types';

// =============================================================================
// TYPES
// =============================================================================

export interface TabItem {
  /** Unique identifier */
  id: string;
  /** Tab label */
  label: string;
  /** Tab icon */
  icon?: React.ReactNode;
  /** Whether tab is disabled */
  disabled?: boolean;
  /** Panel content */
  content?: React.ReactNode;
}

export interface TabsProps {
  /** Tab items */
  tabs: TabItem[];
  /** Currently selected tab ID */
  value?: string;
  /** Default selected tab ID (uncontrolled) */
  defaultValue?: string;
  /** Visual variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Size preset */
  size?: SorbetSize;
  /** Tab orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Tab change handler */
  onChange?: (tabId: string) => void;
  /** Whether tabs should fill container width */
  fullWidth?: boolean;
  /** Tab alignment (when not fullWidth) */
  centered?: boolean;
  /** Allow keyboard navigation to wrap around */
  loop?: boolean;
  /** Automatically activate tab on focus */
  activateOnFocus?: boolean;
  /** Custom ARIA label */
  'aria-label'?: string;
}

export interface TabState {
  /** Selected tab ID */
  selectedId: string | null;
  /** Focused tab ID */
  focusedId: string | null;
  /** Tab orientation */
  orientation: 'horizontal' | 'vertical';
  /** Available (non-disabled) tab IDs */
  availableIds: string[];
}

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Create initial tab state
 */
export function createTabState(
  tabs: TabItem[],
  defaultValue?: string,
  orientation: 'horizontal' | 'vertical' = 'horizontal'
): TabState {
  const availableIds = tabs.filter((tab) => !tab.disabled).map((tab) => tab.id);
  const selectedId = defaultValue ?? availableIds[0] ?? null;

  return {
    selectedId,
    focusedId: null,
    orientation,
    availableIds,
  };
}

/**
 * Get tab index for keyboard navigation
 */
function getTabIndex(state: TabState, tabId: string): number {
  return state.availableIds.indexOf(tabId);
}

/**
 * Get next available tab ID
 */
export function getNextTabId(state: TabState, currentId: string, loop = true): string | null {
  const currentIndex = getTabIndex(state, currentId);
  if (currentIndex === -1) return state.availableIds[0] ?? null;

  const nextIndex = currentIndex + 1;
  if (nextIndex >= state.availableIds.length) {
    return loop ? state.availableIds[0] : state.availableIds[currentIndex];
  }
  return state.availableIds[nextIndex] ?? null;
}

/**
 * Get previous available tab ID
 */
export function getPreviousTabId(state: TabState, currentId: string, loop = true): string | null {
  const currentIndex = getTabIndex(state, currentId);
  if (currentIndex === -1) return state.availableIds[0] ?? null;

  const prevIndex = currentIndex - 1;
  if (prevIndex < 0) {
    return loop
      ? state.availableIds[state.availableIds.length - 1]
      : state.availableIds[currentIndex];
  }
  return state.availableIds[prevIndex] ?? null;
}

/**
 * Get first available tab ID
 */
export function getFirstTabId(state: TabState): string | null {
  return state.availableIds[0] ?? null;
}

/**
 * Get last available tab ID
 */
export function getLastTabId(state: TabState): string | null {
  return state.availableIds[state.availableIds.length - 1] ?? null;
}

/**
 * Handle keyboard navigation
 */
export function handleTabKeyDown(
  event: KeyboardEvent,
  state: TabState,
  currentId: string,
  loop = true
): string | null {
  const isHorizontal = state.orientation === 'horizontal';

  switch (event.key) {
    case 'ArrowRight':
      if (isHorizontal) {
        event.preventDefault();
        return getNextTabId(state, currentId, loop);
      }
      break;
    case 'ArrowLeft':
      if (isHorizontal) {
        event.preventDefault();
        return getPreviousTabId(state, currentId, loop);
      }
      break;
    case 'ArrowDown':
      if (!isHorizontal) {
        event.preventDefault();
        return getNextTabId(state, currentId, loop);
      }
      break;
    case 'ArrowUp':
      if (!isHorizontal) {
        event.preventDefault();
        return getPreviousTabId(state, currentId, loop);
      }
      break;
    case 'Home':
      event.preventDefault();
      return getFirstTabId(state);
    case 'End':
      event.preventDefault();
      return getLastTabId(state);
  }

  return null;
}

/**
 * Generate unique IDs for tab and panel
 */
export function generateTabIds(baseId: string, tabId: string) {
  return {
    tabId: `${baseId}-tab-${tabId}`,
    panelId: `${baseId}-panel-${tabId}`,
  };
}

/**
 * Get ARIA attributes for tab list
 */
export function getTabListAriaProps(orientation: 'horizontal' | 'vertical', label?: string) {
  return {
    role: 'tablist',
    'aria-orientation': orientation,
    'aria-label': label,
  };
}

/**
 * Get ARIA attributes for a tab
 */
export function getTabAriaProps(
  baseId: string,
  tabId: string,
  isSelected: boolean,
  isDisabled: boolean
) {
  const ids = generateTabIds(baseId, tabId);
  return {
    id: ids.tabId,
    role: 'tab',
    'aria-selected': isSelected,
    'aria-controls': ids.panelId,
    'aria-disabled': isDisabled || undefined,
    tabIndex: isSelected ? 0 : -1,
  };
}

/**
 * Get ARIA attributes for a tab panel
 */
export function getTabPanelAriaProps(baseId: string, tabId: string, isSelected: boolean) {
  const ids = generateTabIds(baseId, tabId);
  return {
    id: ids.panelId,
    role: 'tabpanel',
    'aria-labelledby': ids.tabId,
    hidden: !isSelected,
    tabIndex: 0,
  };
}
