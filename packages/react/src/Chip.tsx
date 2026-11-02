import { CircularProgress, Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { animations, colors, colorScaleForMode, typography } from '@sorbet-ui/tokens';
import * as React from 'react';

// =============================================================================
// TYPES
// =============================================================================

type SorbetVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
type SorbetColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type SorbetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ChipProps extends Omit<MuiChipProps, 'variant' | 'size' | 'color'> {
  /** Visual style variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Chip size */
  size?: SorbetSize;
  /** Show loading state */
  loading?: boolean;
  /** Disable hover animation */
  disableAnimation?: boolean;
}

// =============================================================================
// STYLE UTILITIES
// =============================================================================

const getColorScale = (color: SorbetColor, isDark: boolean) => colorScaleForMode(color, isDark);

const sizeConfig = {
  xs: { height: 20, paddingX: 6, fontSize: 11, iconSize: 12, borderRadius: 10 },
  sm: { height: 26, paddingX: 8, fontSize: 12, iconSize: 14, borderRadius: 13 },
  md: { height: 32, paddingX: 12, fontSize: 13, iconSize: 16, borderRadius: 16 },
  lg: { height: 38, paddingX: 16, fontSize: 14, iconSize: 18, borderRadius: 19 },
  xl: { height: 44, paddingX: 20, fontSize: 16, iconSize: 20, borderRadius: 22 },
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

const StyledChip = styled(MuiChip, {
  shouldForwardProp: (prop) =>
    !['sorbetVariant', 'sorbetColor', 'sorbetSize', '$loading', '$disableAnimation'].includes(
      prop as string
    ),
})<StyledProps>(({ theme, sorbetVariant, sorbetColor, sorbetSize, $loading, $disableAnimation }) => {
  const colorScale = getColorScale(sorbetColor, theme.palette.mode === 'dark');
  const sizeStyles = sizeConfig[sorbetSize];
  const isDark = theme.palette.mode === 'dark';

  const baseStyles = {
    height: sizeStyles.height,
    fontSize: sizeStyles.fontSize,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.sans,
    borderRadius: sizeStyles.borderRadius,
    padding: `0 ${sizeStyles.paddingX}px`,
    transition: $disableAnimation ? 'none' : animations.transitions.button,
    ...($loading && {
      opacity: 0.7,
      pointerEvents: 'none' as const,
    }),
    '& .MuiChip-label': {
      padding: `0 ${sizeStyles.paddingX / 2}px`,
    },
    '& .MuiChip-icon': {
      fontSize: sizeStyles.iconSize,
      marginLeft: sizeStyles.paddingX / 2,
    },
    '& .MuiChip-deleteIcon': {
      fontSize: sizeStyles.iconSize,
      marginRight: sizeStyles.paddingX / 2,
      transition: $disableAnimation ? 'none' : animations.transitions.button,
    },
  };

  const variantStyles = {
    solid: {
      backgroundColor: colorScale.main,
      color: colorScale.contrastText,
      '&:hover': {
        backgroundColor: colorScale.dark,
      },
      '& .MuiChip-deleteIcon': {
        color: `${colorScale.contrastText}99`,
        '&:hover': { color: colorScale.contrastText },
      },
    },
    soft: {
      backgroundColor: isDark ? colorScale.alpha20 : colorScale.alpha12,
      color: isDark ? colorScale.light : colorScale.dark,
      border: `1px solid ${colorScale.alpha20}`,
      '&:hover': {
        backgroundColor: isDark ? colorScale.alpha30 : colorScale.alpha20,
      },
      '& .MuiChip-deleteIcon': {
        color: isDark ? colorScale.light : colorScale.dark,
      },
    },
    outlined: {
      backgroundColor: 'transparent',
      color: colorScale.main,
      border: `1.5px solid ${colorScale.main}`,
      '&:hover': {
        backgroundColor: colorScale.alpha8,
      },
      '& .MuiChip-deleteIcon': {
        color: colorScale.main,
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: isDark ? colors.semantic.neutral[300] : colors.semantic.neutral[700],
      border: `1.5px solid ${isDark ? colors.semantic.neutral[600] : colors.semantic.neutral[300]}`,
      '&:hover': {
        backgroundColor: isDark ? colors.semantic.neutral[800] : colors.semantic.neutral[100],
        borderColor: colorScale.main,
        color: colorScale.main,
      },
      '& .MuiChip-deleteIcon': {
        color: isDark ? colors.semantic.neutral[400] : colors.semantic.neutral[600],
      },
    },
    plain: {
      backgroundColor: isDark ? colors.semantic.neutral[800] : colors.semantic.neutral[100],
      color: isDark ? colors.semantic.neutral[200] : colors.semantic.neutral[700],
      border: 'none',
      '&:hover': {
        backgroundColor: isDark ? colors.semantic.neutral[700] : colors.semantic.neutral[200],
      },
      '& .MuiChip-deleteIcon': {
        color: isDark ? colors.semantic.neutral[400] : colors.semantic.neutral[600],
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

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      loading = false,
      disableAnimation = false,
      icon,
      ...rest
    },
    ref
  ) => {
    const sizeStyles = sizeConfig[size];

    const renderIcon = () => {
      if (loading) {
        return <CircularProgress size={sizeStyles.iconSize - 4} color="inherit" />;
      }
      return icon;
    };

    return (
      <StyledChip
        ref={ref}
        sorbetVariant={variant}
        sorbetColor={color}
        sorbetSize={size}
        $loading={loading}
        $disableAnimation={disableAnimation}
        icon={renderIcon()}
        {...rest}
      />
    );
  }
);
Chip.displayName = 'Chip';
