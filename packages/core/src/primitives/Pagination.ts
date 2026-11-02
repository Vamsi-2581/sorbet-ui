/**
 * Sorbet UI Core - Pagination Primitives
 *
 * Headless pagination utilities and types for building accessible pagination controls.
 */

import type { SorbetColor, SorbetSize, SorbetVariant } from '../types';

// =============================================================================
// TYPES
// =============================================================================

export interface PaginationItem {
  /** Type of pagination item */
  type: 'page' | 'first' | 'last' | 'next' | 'previous' | 'start-ellipsis' | 'end-ellipsis';
  /** Page number (only for 'page' type) */
  page: number | null;
  /** Whether item is selected */
  selected: boolean;
  /** Whether item is disabled */
  disabled: boolean;
  /** Click handler */
  onClick: () => void;
  /** ARIA label */
  'aria-label': string;
  /** ARIA current */
  'aria-current'?: 'page' | undefined;
}

export interface PaginationProps {
  /** Total number of pages */
  count: number;
  /** Current page (1-indexed) */
  page: number;
  /** Visual variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Size preset */
  size?: SorbetSize;
  /** Number of sibling pages to show */
  siblingCount?: number;
  /** Number of boundary pages to show */
  boundaryCount?: number;
  /** Show first/last buttons */
  showFirstButton?: boolean;
  /** Show last button */
  showLastButton?: boolean;
  /** Hide next/previous buttons */
  hideNextButton?: boolean;
  /** Hide previous button */
  hidePrevButton?: boolean;
  /** Disable the component */
  disabled?: boolean;
  /** Page change handler */
  onChange?: (page: number) => void;
  /** Custom labels */
  getItemAriaLabel?: (
    type: PaginationItem['type'],
    page: number | null,
    selected: boolean
  ) => string;
}

export interface PaginationState {
  /** Current page */
  page: number;
  /** Total pages */
  totalPages: number;
  /** Whether on first page */
  isFirst: boolean;
  /** Whether on last page */
  isLast: boolean;
  /** Can go to previous page */
  canGoPrevious: boolean;
  /** Can go to next page */
  canGoNext: boolean;
}

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Generate range of numbers
 */
function range(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}

/**
 * Default ARIA label generator
 */
export function getDefaultItemAriaLabel(
  type: PaginationItem['type'],
  page: number | null,
  selected: boolean
): string {
  switch (type) {
    case 'page':
      return selected ? `Page ${page}, current page` : `Go to page ${page}`;
    case 'first':
      return 'Go to first page';
    case 'last':
      return 'Go to last page';
    case 'next':
      return 'Go to next page';
    case 'previous':
      return 'Go to previous page';
    default:
      return '';
  }
}

/**
 * Generate pagination items
 */
export function generatePaginationItems(props: PaginationProps): PaginationItem[] {
  const {
    count,
    page,
    siblingCount = 1,
    boundaryCount = 1,
    showFirstButton = false,
    showLastButton = false,
    hideNextButton = false,
    hidePrevButton = false,
    disabled = false,
    onChange,
    getItemAriaLabel = getDefaultItemAriaLabel,
  } = props;

  const items: PaginationItem[] = [];

  const createItem = (
    type: PaginationItem['type'],
    pageNum: number | null,
    itemDisabled = false
  ): PaginationItem => {
    const selected = type === 'page' && pageNum === page;
    return {
      type,
      page: pageNum,
      selected,
      disabled: disabled || itemDisabled,
      onClick: () => {
        if (!disabled && !itemDisabled && pageNum !== null && onChange) {
          onChange(pageNum);
        }
      },
      'aria-label': getItemAriaLabel(type, pageNum, selected),
      'aria-current': selected ? 'page' : undefined,
    };
  };

  // First button
  if (showFirstButton) {
    items.push(createItem('first', 1, page === 1));
  }

  // Previous button
  if (!hidePrevButton) {
    items.push(createItem('previous', page - 1, page === 1));
  }

  // Calculate page range
  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : count - 1
  );

  // Build page items
  const itemList: (number | 'start-ellipsis' | 'end-ellipsis')[] = [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? ['start-ellipsis' as const]
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < count - boundaryCount - 1
      ? ['end-ellipsis' as const]
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),
    ...endPages,
  ];

  // Add page items
  itemList.forEach((item) => {
    if (typeof item === 'number') {
      items.push(createItem('page', item));
    } else {
      items.push(createItem(item, null, true));
    }
  });

  // Next button
  if (!hideNextButton) {
    items.push(createItem('next', page + 1, page === count));
  }

  // Last button
  if (showLastButton) {
    items.push(createItem('last', count, page === count));
  }

  return items;
}

/**
 * Get pagination state
 */
export function getPaginationState(page: number, totalPages: number): PaginationState {
  return {
    page,
    totalPages,
    isFirst: page === 1,
    isLast: page === totalPages,
    canGoPrevious: page > 1,
    canGoNext: page < totalPages,
  };
}

/**
 * Calculate total pages from item count and page size
 */
export function calculateTotalPages(totalItems: number, pageSize: number): number {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

/**
 * Clamp page number to valid range
 */
export function clampPage(page: number, totalPages: number): number {
  return Math.max(1, Math.min(page, totalPages));
}

/**
 * Get ARIA attributes for pagination nav
 */
export function getPaginationAriaProps(label = 'Pagination') {
  return {
    role: 'navigation',
    'aria-label': label,
  };
}

/**
 * Get ARIA attributes for pagination list
 */
export function getPaginationListAriaProps() {
  return {
    role: 'list',
  };
}
