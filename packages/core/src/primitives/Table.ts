/**
 * Sorbet UI Core - Table Primitives
 *
 * Headless table utilities and types for building accessible data tables.
 * These primitives can be used with any styling solution.
 */

import type { SorbetColor, SorbetSize, SorbetVariant } from '../types';

// =============================================================================
// TYPES
// =============================================================================

export interface TableColumn<T = unknown> {
  /** Unique identifier for the column */
  id: string;
  /** Header label */
  header: string;
  /** Accessor key or function to get cell value */
  accessor: keyof T | ((row: T) => unknown);
  /** Column width */
  width?: string | number;
  /** Minimum width */
  minWidth?: string | number;
  /** Maximum width */
  maxWidth?: string | number;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Whether column is sortable */
  sortable?: boolean;
  /** Whether column is sticky */
  sticky?: 'left' | 'right';
  /** Custom cell renderer */
  cell?: (value: unknown, row: T, index: number) => React.ReactNode;
  /** Custom header renderer */
  headerCell?: () => React.ReactNode;
}

export interface TableSortState {
  /** Column ID being sorted */
  columnId: string | null;
  /** Sort direction */
  direction: 'asc' | 'desc' | null;
}

export interface TableSelectionState {
  /** Selected row IDs */
  selectedIds: Set<string>;
  /** Whether all rows are selected */
  allSelected: boolean;
  /** Whether some rows are selected (indeterminate) */
  indeterminate: boolean;
}

export interface TablePaginationState {
  /** Current page (0-indexed) */
  page: number;
  /** Rows per page */
  rowsPerPage: number;
  /** Total row count */
  totalRows: number;
}

export interface TableProps<T = unknown> {
  /** Table data */
  data: T[];
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Visual variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Size preset */
  size?: SorbetSize;
  /** Enable row selection */
  selectable?: boolean;
  /** Enable sorting */
  sortable?: boolean;
  /** Enable pagination */
  pagination?: boolean;
  /** Dense padding mode */
  dense?: boolean;
  /** Striped rows */
  striped?: boolean;
  /** Show hover effect on rows */
  hoverable?: boolean;
  /** Sticky header */
  stickyHeader?: boolean;
  /** Row key accessor */
  getRowId?: (row: T, index: number) => string;
  /** Sort state */
  sortState?: TableSortState;
  /** Sort change handler */
  onSortChange?: (state: TableSortState) => void;
  /** Selection state */
  selectionState?: TableSelectionState;
  /** Selection change handler */
  onSelectionChange?: (state: TableSelectionState) => void;
  /** Pagination state */
  paginationState?: TablePaginationState;
  /** Pagination change handler */
  onPaginationChange?: (state: TablePaginationState) => void;
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  /** Empty state content */
  emptyContent?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Caption for accessibility */
  caption?: string;
}

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Get cell value from a row using column accessor
 */
export function getCellValue<T>(row: T, column: TableColumn<T>): unknown {
  if (typeof column.accessor === 'function') {
    return column.accessor(row);
  }
  return row[column.accessor as keyof T];
}

/**
 * Sort data by column
 */
export function sortData<T>(data: T[], column: TableColumn<T>, direction: 'asc' | 'desc'): T[] {
  return [...data].sort((a, b) => {
    const aVal = getCellValue(a, column);
    const bVal = getCellValue(b, column);

    if (aVal === bVal) return 0;
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    const comparison = aVal < bVal ? -1 : 1;
    return direction === 'asc' ? comparison : -comparison;
  });
}

/**
 * Paginate data
 */
export function paginateData<T>(data: T[], page: number, rowsPerPage: number): T[] {
  const start = page * rowsPerPage;
  return data.slice(start, start + rowsPerPage);
}

/**
 * Create initial sort state
 */
export function createSortState(columnId?: string, direction?: 'asc' | 'desc'): TableSortState {
  return {
    columnId: columnId ?? null,
    direction: direction ?? null,
  };
}

/**
 * Create initial selection state
 */
export function createSelectionState(selectedIds?: string[]): TableSelectionState {
  return {
    selectedIds: new Set(selectedIds ?? []),
    allSelected: false,
    indeterminate: false,
  };
}

/**
 * Create initial pagination state
 */
export function createPaginationState(
  page = 0,
  rowsPerPage = 10,
  totalRows = 0
): TablePaginationState {
  return { page, rowsPerPage, totalRows };
}

/**
 * Toggle sort direction
 */
export function toggleSort(current: TableSortState, columnId: string): TableSortState {
  if (current.columnId !== columnId) {
    return { columnId, direction: 'asc' };
  }
  if (current.direction === 'asc') {
    return { columnId, direction: 'desc' };
  }
  return { columnId: null, direction: null };
}

/**
 * Toggle row selection
 */
export function toggleRowSelection<T>(
  current: TableSelectionState,
  rowId: string,
  data: T[],
  getRowId: (row: T, index: number) => string
): TableSelectionState {
  const newSelectedIds = new Set(current.selectedIds);

  if (newSelectedIds.has(rowId)) {
    newSelectedIds.delete(rowId);
  } else {
    newSelectedIds.add(rowId);
  }

  const allIds = data.map((row, index) => getRowId(row, index));
  const allSelected = allIds.every((id) => newSelectedIds.has(id));
  const indeterminate = !allSelected && newSelectedIds.size > 0;

  return { selectedIds: newSelectedIds, allSelected, indeterminate };
}

/**
 * Toggle all row selection
 */
export function toggleAllSelection<T>(
  current: TableSelectionState,
  data: T[],
  getRowId: (row: T, index: number) => string
): TableSelectionState {
  if (current.allSelected || current.indeterminate) {
    return { selectedIds: new Set(), allSelected: false, indeterminate: false };
  }

  const allIds = data.map((row, index) => getRowId(row, index));
  return { selectedIds: new Set(allIds), allSelected: true, indeterminate: false };
}

/**
 * Get ARIA attributes for table
 */
export function getTableAriaProps(props: { caption?: string; sortable?: boolean }) {
  return {
    role: 'table',
    'aria-label': props.caption,
    'aria-describedby': props.caption ? 'table-caption' : undefined,
  };
}

/**
 * Get ARIA attributes for sortable column header
 */
export function getSortAriaProps(sortState: TableSortState, columnId: string) {
  const isSorted = sortState.columnId === columnId;
  return {
    'aria-sort': isSorted
      ? sortState.direction === 'asc'
        ? ('ascending' as const)
        : ('descending' as const)
      : ('none' as const),
    role: 'columnheader',
  };
}
