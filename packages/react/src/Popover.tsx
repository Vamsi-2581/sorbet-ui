import {
  Box,
  CircularProgress,
  Popover as MuiPopover,
  PopoverProps as MuiPopoverProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { animations, colors, colorScaleForMode, sizing, typography } from '@sorbet-ui/tokens';
import * as React from 'react';

// =============================================================================
// TYPES
// =============================================================================

type SorbetVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
type SorbetColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type SorbetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface PopoverProps extends Omit<MuiPopoverProps, 'variant'> {
  /** Visual style variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Popover size */
  size?: SorbetSize;
  /** Show loading state */
  loading?: boolean;
  /** Disable animations */
  disableAnimation?: boolean;
}

// =============================================================================
// STYLE UTILITIES
// =============================================================================

const getColorScale = (color: SorbetColor, isDark: boolean) => colorScaleForMode(color, isDark);

const sizeConfig = {
  xs: { padding: sizing.spacing[2], borderRadius: sizing.radius.sm, maxWidth: 200 },
  sm: { padding: sizing.spacing[3], borderRadius: sizing.radius.md, maxWidth: 280 },
  md: { padding: sizing.spacing[4], borderRadius: sizing.radius.md, maxWidth: 360 },
  lg: { padding: sizing.spacing[5], borderRadius: sizing.radius.lg, maxWidth: 480 },
  xl: { padding: sizing.spacing[6], borderRadius: sizing.radius.xl, maxWidth: 600 },
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

const StyledPopover = styled(MuiPopover, {
  shouldForwardProp: (prop) =>
    !['sorbetVariant', 'sorbetColor', 'sorbetSize', '$loading', '$disableAnimation'].includes(
      prop as string
    ),
})<StyledProps>(({ theme, sorbetVariant, sorbetColor, sorbetSize, $loading, $disableAnimation }) => {
  const colorScale = getColorScale(sorbetColor, theme.palette.mode === 'dark');
  const sizeStyles = sizeConfig[sorbetSize];
  const isDark = theme.palette.mode === 'dark';

  const baseStyles = {
    '& .MuiPopover-paper': {
      borderRadius: sizeStyles.borderRadius,
      maxWidth: sizeStyles.maxWidth,
      padding: sizeStyles.padding,
      transition: $disableAnimation ? 'none' : animations.transitions.smooth,
      fontFamily: typography.fontFamily.sans,
      position: 'relative' as const,
      overflow: 'hidden',
      ...($loading && {
        pointerEvents: 'none' as const,
        '& > *:not(.popover-loading-overlay)': {
          opacity: 0.5,
        },
      }),
    },
  };

  const variantStyles = {
    solid: {
      '& .MuiPopover-paper': {
        backgroundColor: colorScale.main,
        color: colorScale.contrastText,
        boxShadow: sizing.shadows.lg,
      },
    },
    soft: {
      '& .MuiPopover-paper': {
        backgroundColor: isDark ? colorScale.alpha30 : colorScale.alpha20,
        color: isDark ? colorScale.light : colorScale.dark,
        boxShadow: sizing.shadows.md,
      },
    },
    outlined: {
      '& .MuiPopover-paper': {
        backgroundColor: isDark ? colors.semantic.neutral[900] : colors.semantic.neutral[50],
        color: isDark ? colors.semantic.neutral[100] : colors.semantic.neutral[900],
        border: `1.5px solid ${colorScale.main}`,
        boxShadow: sizing.shadows.md,
      },
    },
    ghost: {
      '& .MuiPopover-paper': {
        backgroundColor: isDark ? colors.semantic.neutral[800] : colors.semantic.neutral[100],
        color: isDark ? colors.semantic.neutral[100] : colors.semantic.neutral[800],
        boxShadow: sizing.shadows.sm,
      },
    },
    plain: {
      '& .MuiPopover-paper': {
        backgroundColor: isDark ? colors.semantic.neutral[900] : '#ffffff',
        color: isDark ? colors.semantic.neutral[100] : colors.semantic.neutral[900],
        border: `1px solid ${isDark ? colors.semantic.neutral[700] : colors.semantic.neutral[200]}`,
        boxShadow: sizing.shadows.md,
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

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      variant = 'plain',
      color = 'neutral',
      size = 'md',
      loading = false,
      disableAnimation = false,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <StyledPopover
        ref={ref}
        sorbetVariant={variant}
        sorbetColor={color}
        sorbetSize={size}
        $loading={loading}
        $disableAnimation={disableAnimation}
        {...rest}
      >
        {loading && (
          <LoadingOverlay className="popover-loading-overlay">
            <CircularProgress size={24} />
          </LoadingOverlay>
        )}
        {children}
      </StyledPopover>
    );
  }
);
Popover.displayName = 'Popover';
