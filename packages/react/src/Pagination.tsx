import {
  Pagination as MuiPagination,
  PaginationItem as MuiPaginationItem,
  PaginationProps as MuiPaginationProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors, colorScaleForMode, typography } from '@sorbet-ui/tokens';
import * as React from 'react';

// =============================================================================
// TYPES
// =============================================================================

type SorbetVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
type SorbetColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type SorbetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface PaginationProps extends Omit<MuiPaginationProps, 'variant' | 'color' | 'size'> {
  /** Total number of pages */
  count: number;
  /** Current page (1-indexed) */
  page?: number;
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
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  /** Custom ARIA label */
  'aria-label'?: string;
}

// =============================================================================
// SIZE CONFIG
// =============================================================================

const sizeConfig = {
  xs: { size: 24, fontSize: 11, iconSize: 14, borderRadius: 4 },
  sm: { size: 28, fontSize: 12, iconSize: 16, borderRadius: 6 },
  md: { size: 32, fontSize: 14, iconSize: 18, borderRadius: 8 },
  lg: { size: 40, fontSize: 15, iconSize: 20, borderRadius: 10 },
  xl: { size: 48, fontSize: 16, iconSize: 24, borderRadius: 12 },
};

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

interface StyledProps {
  $variant: SorbetVariant;
  $color: SorbetColor;
  $size: SorbetSize;
}

const StyledPagination = styled(MuiPagination, {
  shouldForwardProp: (prop) => !['$variant', '$color', '$size'].includes(prop as string),
})<StyledProps>(({ theme, $variant, $color, $size }) => {
  const colorScale = colorScaleForMode($color, theme.palette.mode === 'dark');
  const neutralScale = colors.neutral;
  const isDark = theme.palette.mode === 'dark';
  const size = sizeConfig[$size];

  const getVariantStyles = () => {
    switch ($variant) {
      case 'solid':
        return {
          '& .MuiPaginationItem-root': {
            backgroundColor: 'transparent',
            color: isDark ? neutralScale[300] : neutralScale[600],
            '&:hover': {
              backgroundColor: isDark ? neutralScale[700] : neutralScale[100],
            },
            '&.Mui-selected': {
              backgroundColor: colorScale.main,
              color: colorScale.contrastText,
              '&:hover': {
                backgroundColor: colorScale.dark,
              },
            },
          },
        };
      case 'soft':
        return {
          '& .MuiPaginationItem-root': {
            backgroundColor: 'transparent',
            color: isDark ? neutralScale[300] : neutralScale[600],
            '&:hover': {
              backgroundColor: isDark ? colorScale.alpha16 : colorScale.alpha8,
            },
            '&.Mui-selected': {
              backgroundColor: isDark ? colorScale.alpha30 : colorScale.alpha20,
              color: isDark ? colorScale.light : colorScale.dark,
              '&:hover': {
                backgroundColor: isDark ? colorScale.alpha40 : colorScale.alpha30,
              },
            },
          },
        };
      case 'outlined':
        return {
          '& .MuiPaginationItem-root': {
            backgroundColor: 'transparent',
            color: isDark ? neutralScale[300] : neutralScale[600],
            border: `1.5px solid ${isDark ? neutralScale[600] : neutralScale[300]}`,
            '&:hover': {
              borderColor: colorScale.main,
              color: colorScale.main,
            },
            '&.Mui-selected': {
              backgroundColor: 'transparent',
              borderColor: colorScale.main,
              color: colorScale.main,
              '&:hover': {
                backgroundColor: colorScale.alpha8,
              },
            },
          },
        };
      case 'ghost':
        return {
          '& .MuiPaginationItem-root': {
            backgroundColor: 'transparent',
            color: isDark ? neutralScale[400] : neutralScale[500],
            '&:hover': {
              backgroundColor: isDark ? neutralScale[800] : neutralScale[100],
              color: isDark ? neutralScale[200] : neutralScale[700],
            },
            '&.Mui-selected': {
              backgroundColor: isDark ? neutralScale[700] : neutralScale[200],
              color: isDark ? neutralScale[100] : neutralScale[800],
              '&:hover': {
                backgroundColor: isDark ? neutralScale[600] : neutralScale[300],
              },
            },
          },
        };
      case 'plain':
        return {
          '& .MuiPaginationItem-root': {
            backgroundColor: 'transparent',
            color: isDark ? neutralScale[400] : neutralScale[500],
            '&:hover': {
              color: colorScale.main,
              textDecoration: 'underline',
            },
            '&.Mui-selected': {
              backgroundColor: 'transparent',
              color: colorScale.main,
              fontWeight: typography.fontWeight.bold,
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        };
      default:
        return {};
    }
  };

  return {
    '& .MuiPaginationItem-root': {
      minWidth: size.size,
      height: size.size,
      fontSize: size.fontSize,
      fontFamily: typography.fontFamily.sans,
      fontWeight: typography.fontWeight.medium,
      borderRadius: size.borderRadius,
      margin: '0 2px',
      transition: 'all 0.2s ease-in-out',
      '& .MuiSvgIcon-root': {
        fontSize: size.iconSize,
      },
      '&.Mui-disabled': {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${colorScale.alpha40}`,
      },
    },
    '& .MuiPaginationItem-ellipsis': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ...getVariantStyles(),
  };
});

// =============================================================================
// COMPONENT
// =============================================================================

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      count,
      page,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      siblingCount = 1,
      boundaryCount = 1,
      showFirstButton = false,
      showLastButton = false,
      hideNextButton = false,
      hidePrevButton = false,
      disabled = false,
      onChange,
      'aria-label': ariaLabel = 'Pagination',
      ...rest
    },
    ref
  ) => {
    return (
      <StyledPagination
        ref={ref}
        count={count}
        page={page}
        $variant={variant}
        $color={color}
        $size={size}
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
        showFirstButton={showFirstButton}
        showLastButton={showLastButton}
        hideNextButton={hideNextButton}
        hidePrevButton={hidePrevButton}
        disabled={disabled}
        onChange={onChange}
        aria-label={ariaLabel}
        renderItem={(item) => (
          <MuiPaginationItem
            {...item}
            slots={{
              first: FirstIcon,
              last: LastIcon,
              previous: PreviousIcon,
              next: NextIcon,
            }}
          />
        )}
        {...rest}
      />
    );
  }
);

Pagination.displayName = 'Pagination';

// =============================================================================
// ICONS
// =============================================================================

const FirstIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LastIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M13 7l5 5-5 5M6 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PreviousIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NextIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
