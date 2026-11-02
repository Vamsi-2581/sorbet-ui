/**
 * Sorbet UI Core - Breadcrumbs Primitives
 *
 * Headless breadcrumb utilities and types for building accessible navigation breadcrumbs.
 */

import type { SorbetColor, SorbetSize, SorbetVariant } from '../types';

// =============================================================================
// TYPES
// =============================================================================

export interface BreadcrumbItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Navigation href */
  href?: string;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether this is the current page */
  current?: boolean;
  /** Click handler (for non-link items) */
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Visual variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Size preset */
  size?: SorbetSize;
  /** Maximum items to display before collapsing */
  maxItems?: number;
  /** Number of items to show before ellipsis when collapsed */
  itemsBeforeCollapse?: number;
  /** Number of items to show after ellipsis when collapsed */
  itemsAfterCollapse?: number;
  /** Custom separator element */
  separator?: React.ReactNode;
  /** Whether to expand collapsed items on click */
  expandOnClick?: boolean;
  /** Custom ARIA label */
  'aria-label'?: string;
}

export interface BreadcrumbsState {
  /** Whether breadcrumbs are collapsed */
  collapsed: boolean;
  /** Visible items (accounting for collapse) */
  visibleItems: BreadcrumbItem[];
  /** Hidden items (when collapsed) */
  hiddenItems: BreadcrumbItem[];
  /** Total number of items */
  totalItems: number;
}

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Calculate breadcrumb state with collapsing
 */
export function calculateBreadcrumbState(
  items: BreadcrumbItem[],
  maxItems = 8,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 2,
  isExpanded = false
): BreadcrumbsState {
  const totalItems = items.length;
  const shouldCollapse = !isExpanded && totalItems > maxItems;

  if (!shouldCollapse) {
    return {
      collapsed: false,
      visibleItems: items,
      hiddenItems: [],
      totalItems,
    };
  }

  const beforeItems = items.slice(0, itemsBeforeCollapse);
  const afterItems = items.slice(-itemsAfterCollapse);
  const hiddenItems = items.slice(itemsBeforeCollapse, -itemsAfterCollapse);

  return {
    collapsed: true,
    visibleItems: [...beforeItems, ...afterItems],
    hiddenItems,
    totalItems,
  };
}

/**
 * Get the current (last) breadcrumb item
 */
export function getCurrentBreadcrumb(items: BreadcrumbItem[]): BreadcrumbItem | null {
  if (items.length === 0) return null;

  // Find explicitly marked current item or return last item
  const current = items.find((item) => item.current);
  return current ?? items[items.length - 1];
}

/**
 * Check if an item is the last (current page)
 */
export function isLastItem(items: BreadcrumbItem[], item: BreadcrumbItem): boolean {
  return items[items.length - 1]?.id === item.id;
}

/**
 * Create breadcrumb items from path segments
 */
export function createBreadcrumbsFromPath(
  path: string,
  options?: {
    homeLabel?: string;
    homeHref?: string;
    formatLabel?: (segment: string) => string;
    formatHref?: (segments: string[], index: number) => string;
  }
): BreadcrumbItem[] {
  const {
    homeLabel = 'Home',
    homeHref = '/',
    formatLabel = (segment: string) =>
      segment.replace(/-/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase()),
    formatHref = (segments: string[], index: number) =>
      '/' + segments.slice(0, index + 1).join('/'),
  } = options ?? {};

  const segments = path.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [{ id: 'home', label: homeLabel, href: homeHref }];

  segments.forEach((segment, index) => {
    items.push({
      id: segment,
      label: formatLabel(segment),
      href: formatHref(segments, index),
      current: index === segments.length - 1,
    });
  });

  return items;
}

/**
 * Get ARIA attributes for breadcrumb nav
 */
export function getBreadcrumbNavAriaProps(label = 'Breadcrumb') {
  return {
    'aria-label': label,
    role: 'navigation',
  };
}

/**
 * Get ARIA attributes for breadcrumb list
 */
export function getBreadcrumbListAriaProps() {
  return {
    role: 'list',
  };
}

/**
 * Get ARIA attributes for breadcrumb item
 */
export function getBreadcrumbItemAriaProps(_item: BreadcrumbItem, _isLast: boolean) {
  return {
    role: 'listitem',
  };
}

/**
 * Get ARIA attributes for breadcrumb link
 */
export function getBreadcrumbLinkAriaProps(item: BreadcrumbItem, isLast: boolean) {
  if (isLast || item.current) {
    return {
      'aria-current': 'page' as const,
      'aria-disabled': true,
    };
  }

  return {
    'aria-disabled': item.disabled || undefined,
  };
}

/**
 * Get ARIA attributes for collapsed items button
 */
export function getCollapsedButtonAriaProps(hiddenCount: number) {
  return {
    'aria-label': `Show ${hiddenCount} more breadcrumb items`,
    'aria-expanded': false,
  };
}

/**
 * Default separator
 */
export const DEFAULT_SEPARATOR = '/';
