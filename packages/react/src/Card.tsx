import {
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Card as MuiCard,
  CardProps as MuiCardProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { animations, colors, colorScaleForMode, sizing } from '@sorbet-ui/tokens';
import * as React from 'react';

// =============================================================================
// TYPES
// =============================================================================

type SorbetVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
type SorbetColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type SorbetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  /** Visual style variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Card size (affects padding and border-radius) */
  size?: SorbetSize;
  /** Show loading state */
  loading?: boolean;
  /** Clickable card with hover effects */
  clickable?: boolean;
  /** Disable hover animation */
  disableAnimation?: boolean;
}

// =============================================================================
// STYLE UTILITIES
// =============================================================================

const getColorScale = (color: SorbetColor, isDark: boolean) => colorScaleForMode(color, isDark);

const sizeConfig = {
  xs: { padding: sizing.spacing[2], borderRadius: sizing.radius.sm },
  sm: { padding: sizing.spacing[3], borderRadius: sizing.radius.md },
  md: { padding: sizing.spacing[4], borderRadius: sizing.radius.lg },
  lg: { padding: sizing.spacing[5], borderRadius: sizing.radius.xl },
  xl: { padding: sizing.spacing[6], borderRadius: sizing.radius['2xl'] },
};

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

interface StyledProps {
  sorbetVariant: SorbetVariant;
  sorbetColor: SorbetColor;
  sorbetSize: SorbetSize;
  $clickable?: boolean;
  $loading?: boolean;
  $disableAnimation?: boolean;
}

const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) =>
    !['sorbetVariant', 'sorbetColor', 'sorbetSize', '$clickable', '$loading', '$disableAnimation'].includes(
      prop as string
    ),
})<StyledProps>(({
  theme,
  sorbetVariant,
  sorbetColor,
  sorbetSize,
  $clickable,
  $loading,
  $disableAnimation,
}) => {
  const colorScale = getColorScale(sorbetColor, theme.palette.mode === 'dark');
  const sizeStyles = sizeConfig[sorbetSize];
  const isDark = theme.palette.mode === 'dark';

  const baseStyles = {
    borderRadius: sizeStyles.borderRadius,
    transition: $disableAnimation ? 'none' : animations.transitions.smooth,
    position: 'relative' as const,
    overflow: 'hidden',
    ...($clickable && {
      cursor: 'pointer',
      '&:hover': $disableAnimation
        ? {}
        : {
            transform: 'translateY(-2px)',
            boxShadow: sizing.shadows.lg,
          },
      '&:active': {
        transform: 'translateY(0)',
      },
    }),
    ...($loading && {
      pointerEvents: 'none' as const,
      '& > *:not(.card-loading-overlay)': {
        opacity: 0.6,
      },
    }),
    '& .MuiCardContent-root': {
      padding: sizeStyles.padding,
    },
    '& .MuiCardActions-root': {
      padding: sizeStyles.padding,
      paddingTop: 0,
    },
    '& .MuiCardHeader-root': {
      padding: sizeStyles.padding,
      paddingBottom: 0,
    },
  };

  const variantStyles = {
    solid: {
      backgroundColor: colorScale.main,
      color: colorScale.contrastText,
      boxShadow: `0 4px 12px ${colorScale.alpha30}`,
      '& .MuiCardHeader-subheader': {
        color: `${colorScale.contrastText}99`,
      },
    },
    soft: {
      backgroundColor: isDark ? colorScale.alpha20 : colorScale.alpha12,
      color: isDark ? theme.palette.text.primary : theme.palette.text.primary,
      border: `1px solid ${colorScale.alpha20}`,
      boxShadow: sizing.shadows.sm,
    },
    outlined: {
      backgroundColor: isDark ? colors.semantic.neutral[900] : theme.palette.background.paper,
      color: theme.palette.text.primary,
      border: `1.5px solid ${isDark ? colors.semantic.neutral[700] : colors.semantic.neutral[200]}`,
      boxShadow: sizing.shadows.sm,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.palette.text.primary,
      border: `1px solid ${isDark ? colors.semantic.neutral[700] : colors.semantic.neutral[300]}`,
      boxShadow: 'none',
    },
    plain: {
      backgroundColor: isDark ? colors.semantic.neutral[900] : theme.palette.background.paper,
      color: theme.palette.text.primary,
      border: 'none',
      boxShadow: 'none',
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[sorbetVariant],
  };
});

const LoadingOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  zIndex: 1,
});

// =============================================================================
// COMPONENT
// =============================================================================

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'outlined',
      color = 'neutral',
      size = 'md',
      loading = false,
      clickable = false,
      disableAnimation = false,
      children,
      onClick,
      ...rest
    },
    ref
  ) => {
    return (
      <StyledCard
        ref={ref}
        sorbetVariant={variant}
        sorbetColor={color}
        sorbetSize={size}
        $clickable={clickable || !!onClick}
        $loading={loading}
        $disableAnimation={disableAnimation}
        onClick={onClick}
        {...rest}
      >
        {loading && (
          <LoadingOverlay className="card-loading-overlay">
            <CircularProgress size={32} />
          </LoadingOverlay>
        )}
        {children}
      </StyledCard>
    );
  }
);
Card.displayName = 'Card';

// Re-export MUI Card sub-components for convenience
export { CardActions, CardContent, CardHeader, CardMedia };
