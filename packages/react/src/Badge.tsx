import { CircularProgress, Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { animations, colors, colorScaleForMode, typography } from '@sorbet-ui/tokens';
import * as React from 'react';

// =============================================================================
// TYPES
// =============================================================================

type SorbetVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
type SorbetColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type SorbetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface BadgeProps extends Omit<MuiBadgeProps, 'variant' | 'color'> {
  /** Visual style variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Badge size */
  size?: SorbetSize;
  /** Show loading state */
  loading?: boolean;
  /** Pulse animation for attention */
  pulse?: boolean;
  /** Disable animations */
  disableAnimation?: boolean;
}

// =============================================================================
// STYLE UTILITIES
// =============================================================================

const getColorScale = (color: SorbetColor, isDark: boolean) => colorScaleForMode(color, isDark);

const sizeConfig = {
  xs: { minWidth: 14, height: 14, fontSize: 9, paddingX: 4 },
  sm: { minWidth: 18, height: 18, fontSize: 10, paddingX: 5 },
  md: { minWidth: 22, height: 22, fontSize: 11, paddingX: 6 },
  lg: { minWidth: 26, height: 26, fontSize: 13, paddingX: 8 },
  xl: { minWidth: 32, height: 32, fontSize: 15, paddingX: 10 },
};

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

interface StyledProps {
  sorbetVariant: SorbetVariant;
  sorbetColor: SorbetColor;
  sorbetSize: SorbetSize;
  $pulse?: boolean;
  $disableAnimation?: boolean;
}

const StyledBadge = styled(MuiBadge, {
  shouldForwardProp: (prop) =>
    !['sorbetVariant', 'sorbetColor', 'sorbetSize', '$pulse', '$disableAnimation'].includes(prop as string),
})<StyledProps>(({ theme, sorbetVariant, sorbetColor, sorbetSize, $pulse, $disableAnimation }) => {
  const colorScale = getColorScale(sorbetColor, theme.palette.mode === 'dark');
  const sizeStyles = sizeConfig[sorbetSize];
  const isDark = theme.palette.mode === 'dark';

  const baseStyles = {
    '& .MuiBadge-badge': {
      minWidth: sizeStyles.minWidth,
      height: sizeStyles.height,
      fontSize: sizeStyles.fontSize,
      fontWeight: typography.fontWeight.semibold,
      fontFamily: typography.fontFamily.sans,
      padding: `0 ${sizeStyles.paddingX}px`,
      borderRadius: sizeStyles.height / 2,
      transition: $disableAnimation ? 'none' : animations.transitions.button,
      animation: $pulse && !$disableAnimation ? 'pulse 2s infinite' : 'none',
      '@keyframes pulse': {
        '0%': {
          boxShadow: `0 0 0 0 ${colorScale.alpha40}`,
        },
        '70%': {
          boxShadow: `0 0 0 8px ${colorScale.alpha8}`,
        },
        '100%': {
          boxShadow: `0 0 0 0 ${colorScale.alpha8}`,
        },
      },
    },
  };

  const variantStyles = {
    solid: {
      '& .MuiBadge-badge': {
        backgroundColor: colorScale.main,
        color: colorScale.contrastText,
        boxShadow: `0 0 0 2px ${isDark ? colors.semantic.neutral[900] : 'white'}`,
      },
    },
    soft: {
      '& .MuiBadge-badge': {
        backgroundColor: isDark ? colorScale.alpha30 : colorScale.alpha12,
        color: isDark ? colorScale.light : colorScale.dark,
        boxShadow: `0 0 0 2px ${isDark ? colors.semantic.neutral[900] : 'white'}`,
        border: `1px solid ${colorScale.alpha20}`,
      },
    },
    outlined: {
      '& .MuiBadge-badge': {
        backgroundColor: isDark ? colors.semantic.neutral[900] : 'white',
        color: colorScale.main,
        border: `2px solid ${colorScale.main}`,
        boxShadow: `0 0 0 1px ${isDark ? colors.semantic.neutral[900] : 'white'}`,
      },
    },
    ghost: {
      '& .MuiBadge-badge': {
        backgroundColor: 'transparent',
        color: isDark ? colors.semantic.neutral[300] : colors.semantic.neutral[700],
        border: `1px solid ${isDark ? colors.semantic.neutral[600] : colors.semantic.neutral[300]}`,
        boxShadow: 'none',
      },
    },
    plain: {
      '& .MuiBadge-badge': {
        backgroundColor: isDark ? colors.semantic.neutral[700] : colors.semantic.neutral[100],
        color: isDark ? colors.semantic.neutral[200] : colors.semantic.neutral[700],
        border: 'none',
        boxShadow: 'none',
      },
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[sorbetVariant],
  };
});

// =============================================================================
// COMPONENT
// =============================================================================

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      loading = false,
      pulse = false,
      disableAnimation = false,
      badgeContent,
      ...rest
    },
    ref
  ) => {
    const sizeStyles = sizeConfig[size];

    const renderBadgeContent = () => {
      if (loading) {
        return <CircularProgress size={sizeStyles.fontSize} color="inherit" />;
      }
      return badgeContent;
    };

    return (
      <StyledBadge
        ref={ref}
        sorbetVariant={variant}
        sorbetColor={color}
        sorbetSize={size}
        $pulse={pulse}
        $disableAnimation={disableAnimation}
        badgeContent={renderBadgeContent()}
        {...rest}
      />
    );
  }
);
Badge.displayName = 'Badge';
