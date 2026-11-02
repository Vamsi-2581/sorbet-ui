import {
  Box,
  Checkbox,
  CircularProgress,
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
  TableHead as MuiTableHead,
  TableProps as MuiTableProps,
  TableRow as MuiTableRow,
  TablePagination,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';
import { colors, colorScaleForMode, radius, typography } from '@sorbet-ui/tokens';
import * as React from 'react';

// =============================================================================
// TYPES
// =============================================================================

type SorbetVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
type SorbetColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type SorbetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface TableColumn<T = unknown> {
  /** Unique column identifier */
  id: string;
  /** Header label */
  header: string;
  /** Accessor key or function */
  accessor: keyof T | ((row: T) => unknown);
  /** Column width */
  width?: string | number;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Whether column is sortable */
  sortable?: boolean;
  /** Custom cell renderer */
  cell?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface TableProps<T = unknown> extends Omit<MuiTableProps, 'size'> {
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
  /** Selected row IDs (controlled) */
  selected?: string[];
  /** Selection change handler */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Sort column ID */
  sortBy?: string;
  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
  /** Sort change handler */
  onSortChange?: (columnId: string, direction: 'asc' | 'desc') => void;
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  /** Rows per page (for pagination) */
  rowsPerPage?: number;
  /** Available rows per page options */
  rowsPerPageOptions?: number[];
  /** Empty state content */
  emptyContent?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Caption for accessibility */
  caption?: string;
  /** Maximum height (enables scrolling) */
  maxHeight?: string | number;
}

// =============================================================================
// SIZE CONFIG
// =============================================================================

const sizeConfig = {
  xs: { padding: '4px 8px', fontSize: 11, headerFontSize: 11 },
  sm: { padding: '6px 12px', fontSize: 12, headerFontSize: 12 },
  md: { padding: '12px 16px', fontSize: 14, headerFontSize: 13 },
  lg: { padding: '16px 20px', fontSize: 15, headerFontSize: 14 },
  xl: { padding: '20px 24px', fontSize: 16, headerFontSize: 15 },
};

// =============================================================================
// LOADING ANIMATION
// =============================================================================

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

interface StyledProps {
  $variant: SorbetVariant;
  $color: SorbetColor;
  $size: SorbetSize;
  $striped?: boolean;
  $hoverable?: boolean;
  $loading?: boolean;
}

const StyledTableContainer = styled(MuiTableContainer, {
  shouldForwardProp: (prop) =>
    !['$variant', '$color', '$size', '$striped', '$hoverable', '$loading'].includes(prop as string),
})<StyledProps & { $maxHeight?: string | number }>(({ theme, $variant, $color, $maxHeight }) => {
  const colorScale = colorScaleForMode($color, theme.palette.mode === 'dark');
  const isDark = theme.palette.mode === 'dark';

  const variantStyles = {
    solid: {
      border: 'none',
      boxShadow: `0 1px 3px ${colors.neutral.alpha20}`,
    },
    soft: {
      border: `1px solid ${isDark ? colorScale.alpha20 : colorScale.alpha12}`,
      backgroundColor: isDark ? colorScale.alpha8 : colorScale.alpha12,
    },
    outlined: {
      border: `1.5px solid ${colorScale.main}`,
    },
    ghost: {
      border: `1.5px solid ${isDark ? colors.neutral[600] : colors.neutral[300]}`,
    },
    plain: {
      border: 'none',
    },
  };

  return {
    borderRadius: radius.lg,
    overflow: 'hidden',
    maxHeight: $maxHeight,
    ...variantStyles[$variant],
  };
});

const StyledTable = styled(MuiTable)({
  borderCollapse: 'separate',
  borderSpacing: 0,
});

const StyledTableHead = styled(MuiTableHead, {
  shouldForwardProp: (prop) => !['$variant', '$color', '$size'].includes(prop as string),
})<StyledProps>(({ theme, $variant, $color, $size }) => {
  const colorScale = colorScaleForMode($color, theme.palette.mode === 'dark');
  const isDark = theme.palette.mode === 'dark';
  const size = sizeConfig[$size];

  const variantStyles = {
    solid: {
      backgroundColor: colorScale.main,
      '& .MuiTableCell-head': {
        color: colorScale.contrastText,
        borderBottom: 'none',
      },
    },
    soft: {
      backgroundColor: isDark ? colorScale.alpha20 : colorScale.alpha12,
      '& .MuiTableCell-head': {
        color: isDark ? colorScale.light : colorScale.dark,
        borderBottom: `1px solid ${colorScale.alpha20}`,
      },
    },
    outlined: {
      backgroundColor: 'transparent',
      '& .MuiTableCell-head': {
        color: colorScale.main,
        borderBottom: `1.5px solid ${colorScale.main}`,
      },
    },
    ghost: {
      backgroundColor: isDark ? colors.neutral[800] : colors.neutral[50],
      '& .MuiTableCell-head': {
        color: isDark ? colors.neutral[200] : colors.neutral[700],
        borderBottom: `1px solid ${isDark ? colors.neutral[600] : colors.neutral[300]}`,
      },
    },
    plain: {
      backgroundColor: 'transparent',
      '& .MuiTableCell-head': {
        color: isDark ? colors.neutral[300] : colors.neutral[600],
        borderBottom: `1px solid ${isDark ? colors.neutral[700] : colors.neutral[200]}`,
      },
    },
  };

  const baseHeadStyles = {
    padding: size.padding,
    fontSize: size.headerFontSize,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.sans,
    whiteSpace: 'nowrap',
  };

  const variantHeadStyles = variantStyles[$variant]['& .MuiTableCell-head'] || {};

  return {
    '& .MuiTableCell-head': {
      ...baseHeadStyles,
      ...variantHeadStyles,
    },
    backgroundColor: variantStyles[$variant].backgroundColor,
  };
});

const StyledTableBody = styled(MuiTableBody, {
  shouldForwardProp: (prop) =>
    !['$variant', '$color', '$size', '$striped', '$hoverable', '$loading'].includes(prop as string),
})<StyledProps>(({ theme, $variant: _$variant, $color, $size, $striped, $hoverable, $loading }) => {
  const colorScale = colorScaleForMode($color, theme.palette.mode === 'dark');
  const isDark = theme.palette.mode === 'dark';
  const size = sizeConfig[$size];

  return {
    '& .MuiTableRow-root': {
      transition: 'background-color 0.15s ease',
      ...($striped && {
        '&:nth-of-type(odd)': {
          backgroundColor: isDark ? colors.neutral.alpha8 : colors.neutral.alpha12,
        },
      }),
      ...($hoverable && {
        '&:hover': {
          backgroundColor: isDark ? colorScale.alpha16 : colorScale.alpha8,
          cursor: 'pointer',
        },
      }),
      '&.Mui-selected': {
        backgroundColor: isDark ? colorScale.alpha20 : colorScale.alpha12,
        '&:hover': {
          backgroundColor: isDark ? colorScale.alpha30 : colorScale.alpha20,
        },
      },
    },
    '& .MuiTableCell-body': {
      padding: size.padding,
      fontSize: size.fontSize,
      fontFamily: typography.fontFamily.sans,
      borderBottom: `1px solid ${isDark ? colors.neutral[700] : colors.neutral[200]}`,
      color: isDark ? colors.neutral[200] : colors.neutral[800],
      ...($loading && {
        backgroundImage: `linear-gradient(90deg, transparent 0%, ${isDark ? colors.neutral[700] : colors.neutral[200]} 50%, transparent 100%)`,
        backgroundSize: '200% 100%',
        animation: `${shimmer} 1.5s infinite`,
      }),
    },
  };
});

const EmptyState = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '48px 24px',
  color: theme.palette.mode === 'dark' ? colors.neutral[400] : colors.neutral[500],
}));

const LoadingOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  zIndex: 10,
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getCellValue<T>(row: T, column: TableColumn<T>): unknown {
  if (typeof column.accessor === 'function') {
    return column.accessor(row);
  }
  return row[column.accessor as keyof T];
}

// =============================================================================
// COMPONENT
// =============================================================================

function TableInner<T>(
  {
    data,
    columns,
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    selectable = false,
    sortable = false,
    pagination = false,
    dense = false,
    striped = false,
    hoverable = true,
    stickyHeader = false,
    getRowId = (_, index) => String(index),
    selected = [],
    onSelectionChange,
    sortBy,
    sortDirection = 'asc',
    onSortChange,
    onRowClick,
    rowsPerPage: initialRowsPerPage = 10,
    rowsPerPageOptions = [5, 10, 25, 50],
    emptyContent,
    loading = false,
    caption,
    maxHeight,
    ...rest
  }: TableProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>
) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);

  const selectedSet = React.useMemo(() => new Set(selected), [selected]);
  const allSelected =
    data.length > 0 && data.every((row, index) => selectedSet.has(getRowId(row, index)));
  const someSelected =
    data.some((row, index) => selectedSet.has(getRowId(row, index))) && !allSelected;

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map((row, index) => getRowId(row, index)));
    }
  };

  const handleSelectRow = (rowId: string) => {
    if (!onSelectionChange) return;
    if (selectedSet.has(rowId)) {
      onSelectionChange(selected.filter((id) => id !== rowId));
    } else {
      onSelectionChange([...selected, rowId]);
    }
  };

  const handleSort = (columnId: string) => {
    if (!onSortChange) return;
    const newDirection = sortBy === columnId && sortDirection === 'asc' ? 'desc' : 'asc';
    onSortChange(columnId, newDirection);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayData = pagination
    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : data;

  const effectiveSize = dense ? 'xs' : size;

  return (
    <Box sx={{ position: 'relative' }}>
      <StyledTableContainer
        $variant={variant}
        $color={color}
        $size={effectiveSize}
        $maxHeight={maxHeight}
      >
        <StyledTable
          ref={ref}
          stickyHeader={stickyHeader}
          size={dense ? 'small' : 'medium'}
          aria-label={caption}
          {...rest}
        >
          {caption && (
            <caption
              style={{
                captionSide: 'top',
                textAlign: 'left',
                padding: '8px 16px',
                fontWeight: 600,
              }}
            >
              {caption}
            </caption>
          )}
          <StyledTableHead $variant={variant} $color={color} $size={effectiveSize}>
            <MuiTableRow>
              {selectable && (
                <MuiTableCell padding="checkbox">
                  <Checkbox
                    indeterminate={someSelected}
                    checked={allSelected}
                    onChange={handleSelectAll}
                    inputProps={{ 'aria-label': 'Select all rows' }}
                    sx={{ color: variant === 'solid' ? 'inherit' : undefined }}
                  />
                </MuiTableCell>
              )}
              {columns.map((column) => (
                <MuiTableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ width: column.width, minWidth: column.width }}
                  sortDirection={sortBy === column.id ? sortDirection : false}
                >
                  {sortable && column.sortable !== false ? (
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sortDirection : 'asc'}
                      onClick={() => handleSort(column.id)}
                      sx={{ color: 'inherit !important' }}
                    >
                      {column.header}
                    </TableSortLabel>
                  ) : (
                    column.header
                  )}
                </MuiTableCell>
              ))}
            </MuiTableRow>
          </StyledTableHead>
          <StyledTableBody
            $variant={variant}
            $color={color}
            $size={effectiveSize}
            $striped={striped}
            $hoverable={hoverable}
            $loading={loading}
          >
            {displayData.length === 0 ? (
              <MuiTableRow>
                <MuiTableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  sx={{ border: 'none' }}
                >
                  <EmptyState>
                    {emptyContent || (
                      <>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          No data available
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          There are no items to display.
                        </Typography>
                      </>
                    )}
                  </EmptyState>
                </MuiTableCell>
              </MuiTableRow>
            ) : (
              displayData.map((row, index) => {
                const rowId = getRowId(row, pagination ? page * rowsPerPage + index : index);
                const isSelected = selectedSet.has(rowId);
                return (
                  <MuiTableRow
                    key={rowId}
                    selected={isSelected}
                    onClick={() => onRowClick?.(row, index)}
                    hover={hoverable}
                  >
                    {selectable && (
                      <MuiTableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSelectRow(rowId);
                          }}
                          inputProps={{ 'aria-label': `Select row ${rowId}` }}
                        />
                      </MuiTableCell>
                    )}
                    {columns.map((column) => {
                      const value = getCellValue(row, column);
                      return (
                        <MuiTableCell key={column.id} align={column.align || 'left'}>
                          {column.cell ? column.cell(value, row, index) : String(value ?? '')}
                        </MuiTableCell>
                      );
                    })}
                  </MuiTableRow>
                );
              })
            )}
          </StyledTableBody>
        </StyledTable>
      </StyledTableContainer>

      {pagination && data.length > 0 && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: `1px solid ${colors.neutral[200]}` }}
        />
      )}

      {loading && (
        <LoadingOverlay>
          <CircularProgress color="inherit" />
        </LoadingOverlay>
      )}
    </Box>
  );
}

export const Table = React.forwardRef(TableInner) as <T>(
  props: TableProps<T> & { ref?: React.ForwardedRef<HTMLTableElement> }
) => React.ReactElement;

(Table as React.FC).displayName = 'Table';
