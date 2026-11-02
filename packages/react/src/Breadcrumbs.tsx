import {
  IconButton,
  Link,
  Menu,
  MenuItem,
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors, colorScaleForMode, radius, typography } from '@sorbet-ui/tokens';
import * as React from 'react';

// =============================================================================
// TYPES
// =============================================================================

type SorbetVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
type SorbetColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type SorbetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

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
  /** Click handler (for non-link items) */
  onClick?: () => void;
}

export interface BreadcrumbsProps extends Omit<MuiBreadcrumbsProps, 'separator'> {
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
  expandable?: boolean;
  /** Custom ARIA label */
  'aria-label'?: string;
}

// =============================================================================
// SIZE CONFIG
// =============================================================================

const sizeConfig = {
  xs: { fontSize: 11, iconSize: 12, padding: '2px 4px', gap: 4 },
  sm: { fontSize: 12, iconSize: 14, padding: '4px 6px', gap: 6 },
  md: { fontSize: 14, iconSize: 16, padding: '6px 8px', gap: 8 },
  lg: { fontSize: 15, iconSize: 18, padding: '8px 10px', gap: 10 },
  xl: { fontSize: 16, iconSize: 20, padding: '10px 12px', gap: 12 },
};

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

interface StyledProps {
  $variant: SorbetVariant;
  $color: SorbetColor;
  $size: SorbetSize;
}

const StyledBreadcrumbs = styled(MuiBreadcrumbs, {
  shouldForwardProp: (prop) => !['$variant', '$color', '$size'].includes(prop as string),
})<StyledProps>(({ theme, $variant, $color, $size }) => {
  const colorScale = colorScaleForMode($color, theme.palette.mode === 'dark');
  const neutralScale = colors.neutral;
  const isDark = theme.palette.mode === 'dark';
  const size = sizeConfig[$size];

  const getContainerStyles = () => {
    switch ($variant) {
      case 'solid':
        return {
          backgroundColor: isDark ? neutralScale[800] : neutralScale[100],
          padding: size.padding,
          borderRadius: radius.md,
        };
      case 'soft':
        return {
          backgroundColor: isDark ? colorScale.alpha12 : colorScale.alpha8,
          padding: size.padding,
          borderRadius: radius.md,
        };
      case 'outlined':
        return {
          border: `1.5px solid ${isDark ? neutralScale[600] : neutralScale[300]}`,
          padding: size.padding,
          borderRadius: radius.md,
        };
      case 'ghost':
      case 'plain':
        return {};
      default:
        return {};
    }
  };

  return {
    fontFamily: typography.fontFamily.sans,
    fontSize: size.fontSize,
    ...getContainerStyles(),
    '& .MuiBreadcrumbs-separator': {
      margin: `0 ${size.gap}px`,
      color: isDark ? neutralScale[500] : neutralScale[400],
    },
    '& .MuiBreadcrumbs-ol': {
      alignItems: 'center',
    },
  };
});

const BreadcrumbLink = styled(Link, {
  shouldForwardProp: (prop) => !['$variant', '$color', '$size', '$isLast'].includes(prop as string),
})<StyledProps & { $isLast?: boolean }>(({ theme, $variant, $color, $size, $isLast }) => {
  const colorScale = colorScaleForMode($color, theme.palette.mode === 'dark');
  const neutralScale = colors.neutral;
  const isDark = theme.palette.mode === 'dark';
  const size = sizeConfig[$size];

  const getLinkStyles = () => {
    if ($isLast) {
      return {
        color: isDark ? neutralScale[200] : neutralScale[700],
        cursor: 'default',
        '&:hover': {
          textDecoration: 'none',
        },
      };
    }

    switch ($variant) {
      case 'solid':
      case 'soft':
        return {
          color: colorScale.main,
          '&:hover': {
            color: colorScale.dark,
            textDecoration: 'underline',
          },
        };
      case 'outlined':
        return {
          color: isDark ? neutralScale[300] : neutralScale[600],
          '&:hover': {
            color: colorScale.main,
            textDecoration: 'underline',
          },
        };
      case 'ghost':
        return {
          color: isDark ? neutralScale[400] : neutralScale[500],
          padding: '2px 6px',
          borderRadius: radius.sm,
          '&:hover': {
            backgroundColor: isDark ? neutralScale[800] : neutralScale[100],
            color: isDark ? neutralScale[200] : neutralScale[700],
            textDecoration: 'none',
          },
        };
      case 'plain':
        return {
          color: isDark ? neutralScale[400] : neutralScale[500],
          '&:hover': {
            color: colorScale.main,
            textDecoration: 'underline',
          },
        };
      default:
        return {};
    }
  };

  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: size.gap / 2,
    fontSize: size.fontSize,
    fontWeight: $isLast ? typography.fontWeight.medium : typography.fontWeight.normal,
    textDecoration: 'none',
    transition: 'all 0.2s ease-in-out',
    cursor: $isLast ? 'default' : 'pointer',
    '& svg': {
      width: size.iconSize,
      height: size.iconSize,
    },
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${colorScale.alpha40}`,
      borderRadius: radius.sm,
    },
    '&[aria-disabled="true"]': {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    ...getLinkStyles(),
  };
});

const EllipsisButton = styled(IconButton, {
  shouldForwardProp: (prop) => !['$variant', '$color', '$size'].includes(prop as string),
})<StyledProps>(({ theme, $color, $size }) => {
  const colorScale = colorScaleForMode($color, theme.palette.mode === 'dark');
  const neutralScale = colors.neutral;
  const isDark = theme.palette.mode === 'dark';
  const size = sizeConfig[$size];

  return {
    width: size.fontSize + 8,
    height: size.fontSize + 8,
    fontSize: size.fontSize,
    color: isDark ? neutralScale[400] : neutralScale[500],
    '&:hover': {
      backgroundColor: isDark ? neutralScale[800] : neutralScale[100],
      color: colorScale.main,
    },
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${colorScale.alpha40}`,
    },
  };
});

// =============================================================================
// DEFAULT SEPARATOR
// =============================================================================

const ChevronIcon = ({ size }: { size: SorbetSize }) => {
  const iconSize = sizeConfig[size].iconSize;
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const EllipsisIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

// =============================================================================
// COMPONENT
// =============================================================================

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      items,
      variant = 'plain',
      color = 'primary',
      size = 'md',
      maxItems = 8,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 2,
      separator,
      expandable = true,
      'aria-label': ariaLabel = 'Breadcrumb',
      ...rest
    },
    ref
  ) => {
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    const shouldCollapse = !expanded && items.length > maxItems;

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      if (expandable) {
        setAnchorEl(event.currentTarget);
      }
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleExpand = () => {
      setExpanded(true);
      handleMenuClose();
    };

    const handleItemClick = (item: BreadcrumbItem) => {
      if (item.onClick) {
        item.onClick();
      }
      handleMenuClose();
    };

    // Calculate visible and hidden items
    let visibleItems = items;
    let hiddenItems: BreadcrumbItem[] = [];

    if (shouldCollapse) {
      const beforeItems = items.slice(0, itemsBeforeCollapse);
      const afterItems = items.slice(-itemsAfterCollapse);
      hiddenItems = items.slice(itemsBeforeCollapse, -itemsAfterCollapse);
      visibleItems = [...beforeItems, { id: '__ellipsis__', label: '...' }, ...afterItems];
    }

    const renderItem = (item: BreadcrumbItem, _index: number, isLast: boolean) => {
      if (item.id === '__ellipsis__') {
        return (
          <EllipsisButton
            key="ellipsis"
            onClick={handleMenuOpen}
            aria-label={`Show ${hiddenItems.length} more items`}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            $variant={variant}
            $color={color}
            $size={size}
          >
            <EllipsisIcon />
          </EllipsisButton>
        );
      }

      const content = (
        <>
          {item.icon}
          {item.label}
        </>
      );

      if (isLast) {
        return (
          <Typography
            key={item.id}
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: sizeConfig[size].gap / 2,
              fontSize: sizeConfig[size].fontSize,
              fontWeight: typography.fontWeight.medium,
              color: 'text.primary',
              '& svg': {
                width: sizeConfig[size].iconSize,
                height: sizeConfig[size].iconSize,
              },
            }}
            aria-current="page"
          >
            {content}
          </Typography>
        );
      }

      return (
        <BreadcrumbLink
          key={item.id}
          href={item.href}
          onClick={(e) => {
            if (item.onClick) {
              e.preventDefault();
              item.onClick();
            }
          }}
          underline="none"
          $variant={variant}
          $color={color}
          $size={size}
          $isLast={false}
          aria-disabled={item.disabled}
        >
          {content}
        </BreadcrumbLink>
      );
    };

    return (
      <>
        <StyledBreadcrumbs
          ref={ref}
          aria-label={ariaLabel}
          separator={separator ?? <ChevronIcon size={size} />}
          $variant={variant}
          $color={color}
          $size={size}
          {...rest}
        >
          {visibleItems.map((item, index) =>
            renderItem(item, index, index === visibleItems.length - 1)
          )}
        </StyledBreadcrumbs>

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          slotProps={{
            paper: {
              sx: {
                borderRadius: radius.md,
                boxShadow: `0 4px 16px ${colors.neutral.alpha20}`,
                minWidth: 160,
              },
            },
          }}
        >
          {hiddenItems.map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              sx={{
                fontSize: sizeConfig[size].fontSize,
                gap: 1,
              }}
            >
              {item.icon}
              {item.label}
            </MenuItem>
          ))}
          {expandable && (
            <MenuItem
              onClick={handleExpand}
              sx={{
                fontSize: sizeConfig[size].fontSize,
                fontWeight: typography.fontWeight.medium,
                borderTop: `1px solid ${colors.neutral[200]}`,
                mt: 0.5,
                pt: 1,
              }}
            >
              Show all ({items.length} items)
            </MenuItem>
          )}
        </Menu>
      </>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';
