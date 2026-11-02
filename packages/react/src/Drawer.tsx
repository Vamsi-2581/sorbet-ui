import {
  Box,
  CircularProgress,
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { animations, colors, sizing, typography } from '@sorbet-ui/tokens';
import * as React from 'react';

// =============================================================================
// TYPES
// =============================================================================

type SorbetVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
type SorbetColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type SorbetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface DrawerProps extends Omit<MuiDrawerProps, 'variant'> {
  /** Visual style variant */
  variant?: SorbetVariant;
  /** Color scheme (affects header accent) */
  color?: SorbetColor;
  /** Drawer size (width for left/right, height for top/bottom) */
  size?: SorbetSize;
  /** Show loading overlay */
  loading?: boolean;
  /** Disable animations */
  disableAnimation?: boolean;
}

// =============================================================================
// STYLE UTILITIES
// =============================================================================

const sizeConfig = {
  xs: { width: 240, height: 200 },
  sm: { width: 320, height: 280 },
  md: { width: 400, height: 360 },
  lg: { width: 520, height: 480 },
  xl: { width: 680, height: 600 },
};

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

interface StyledProps {
  sorbetVariant: SorbetVariant;
  sorbetColor: SorbetColor;
  sorbetSize: SorbetSize;
  $loading?: boolean;
  $disableAnimation?: boolean;
}

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) =>
    !['sorbetVariant', 'sorbetColor', 'sorbetSize', '$loading', '$disableAnimation'].includes(
      prop as string
    ),
})<StyledProps>(({ theme, sorbetVariant, sorbetSize, $loading, $disableAnimation, anchor }) => {
  const sizeStyles = sizeConfig[sorbetSize];
  const isDark = theme.palette.mode === 'dark';
  const isHorizontal = anchor === 'left' || anchor === 'right';

  const baseStyles = {
    '& .MuiDrawer-paper': {
      width: isHorizontal ? sizeStyles.width : '100%',
      height: isHorizontal ? '100%' : sizeStyles.height,
      transition: $disableAnimation ? 'none' : animations.transitions.slide,
      fontFamily: typography.fontFamily.sans,
      position: 'relative' as const,
      ...($loading && {
        pointerEvents: 'none' as const,
        '& > *:not(.drawer-loading-overlay)': {
          opacity: 0.5,
        },
      }),
    },
  };

  const getBorderStyle = () => {
    if (anchor === 'left') return { borderRight: `1px solid` };
    if (anchor === 'right') return { borderLeft: `1px solid` };
    if (anchor === 'top') return { borderBottom: `1px solid` };
    if (anchor === 'bottom') return { borderTop: `1px solid` };
    return { borderRight: `1px solid` };
  };

  const variantStyles = {
    solid: {
      '& .MuiDrawer-paper': {
        backgroundColor: isDark ? colors.semantic.neutral[900] : theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: sizing.shadows['2xl'],
      },
    },
    soft: {
      '& .MuiDrawer-paper': {
        backgroundColor: isDark ? colors.semantic.neutral[800] : colors.semantic.neutral[50],
        color: theme.palette.text.primary,
        boxShadow: sizing.shadows.xl,
      },
    },
    outlined: {
      '& .MuiDrawer-paper': {
        backgroundColor: isDark ? colors.semantic.neutral[900] : theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 'none',
        ...getBorderStyle(),
        borderColor: isDark ? colors.semantic.neutral[700] : colors.semantic.neutral[300],
      },
    },
    ghost: {
      '& .MuiDrawer-paper': {
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)',
        color: theme.palette.text.primary,
        backdropFilter: 'blur(8px)',
        boxShadow: sizing.shadows.lg,
      },
    },
    plain: {
      '& .MuiDrawer-paper': {
        backgroundColor: isDark ? colors.semantic.neutral[900] : theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 'none',
      },
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[sorbetVariant],
  };
});

const LoadingOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  zIndex: 10,
});

// =============================================================================
// COMPONENT
// =============================================================================

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      variant = 'solid',
      color = 'neutral',
      size = 'md',
      loading = false,
      disableAnimation = false,
      children,
      anchor = 'left',
      ...rest
    },
    ref
  ) => {
    return (
      <StyledDrawer
        ref={ref}
        sorbetVariant={variant}
        sorbetColor={color}
        sorbetSize={size}
        $loading={loading}
        $disableAnimation={disableAnimation}
        anchor={anchor}
        {...rest}
      >
        {loading && (
          <LoadingOverlay className="drawer-loading-overlay">
            <CircularProgress size={32} />
          </LoadingOverlay>
        )}
        {children}
      </StyledDrawer>
    );
  }
);
Drawer.displayName = 'Drawer';
