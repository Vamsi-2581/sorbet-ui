import {
  AlertTitle,
  CircularProgress,
  Collapse,
  Alert as MuiAlert,
  AlertProps as MuiAlertProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { animations, colorScaleForMode, sizing, typography } from '@sorbet-ui/tokens';
import * as React from 'react';

// =============================================================================
// TYPES
// =============================================================================

type SorbetVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
type SorbetColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type SorbetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AlertProps extends Omit<MuiAlertProps, 'variant' | 'color' | 'severity'> {
  /** Visual style variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Alert size */
  size?: SorbetSize;
  /** Show loading state */
  loading?: boolean;
  /** Disable animations */
  disableAnimation?: boolean;
  /** Start icon override */
  startIcon?: React.ReactNode;
}

// =============================================================================
// STYLE UTILITIES
// =============================================================================

const getColorScale = (color: SorbetColor, isDark: boolean) => colorScaleForMode(color, isDark);

const sizeConfig = {
  xs: {
    padding: `${sizing.spacing[1]} ${sizing.spacing[2]}`,
    fontSize: typography.fontSize.xs,
    iconSize: 16,
    borderRadius: sizing.radius.sm,
  },
  sm: {
    padding: `${sizing.spacing[2]} ${sizing.spacing[3]}`,
    fontSize: typography.fontSize.sm,
    iconSize: 18,
    borderRadius: sizing.radius.md,
  },
  md: {
    padding: `${sizing.spacing[3]} ${sizing.spacing[4]}`,
    fontSize: typography.fontSize.base,
    iconSize: 22,
    borderRadius: sizing.radius.md,
  },
  lg: {
    padding: `${sizing.spacing[4]} ${sizing.spacing[5]}`,
    fontSize: typography.fontSize.lg,
    iconSize: 26,
    borderRadius: sizing.radius.lg,
  },
  xl: {
    padding: `${sizing.spacing[5]} ${sizing.spacing[6]}`,
    fontSize: typography.fontSize.xl,
    iconSize: 30,
    borderRadius: sizing.radius.lg,
  },
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

const StyledAlert = styled(MuiAlert, {
  shouldForwardProp: (prop) =>
    !['sorbetVariant', 'sorbetColor', 'sorbetSize', '$loading', '$disableAnimation'].includes(
      prop as string
    ),
})<StyledProps>(({ theme, sorbetVariant, sorbetColor, sorbetSize, $loading, $disableAnimation }) => {
  const colorScale = getColorScale(sorbetColor, theme.palette.mode === 'dark');
  const sizeStyles = sizeConfig[sorbetSize];
  const isDark = theme.palette.mode === 'dark';

  const baseStyles = {
    padding: sizeStyles.padding,
    fontSize: sizeStyles.fontSize,
    fontFamily: typography.fontFamily.sans,
    borderRadius: sizeStyles.borderRadius,
    transition: $disableAnimation ? 'none' : animations.transitions.smooth,
    alignItems: 'flex-start',
    ...($loading && {
      opacity: 0.8,
    }),
    '& .MuiAlert-icon': {
      fontSize: sizeStyles.iconSize,
      marginRight: sizing.spacing[2],
      padding: 0,
    },
    '& .MuiAlert-message': {
      padding: 0,
    },
    '& .MuiAlert-action': {
      padding: 0,
      marginRight: 0,
    },
    '& .MuiAlertTitle-root': {
      fontWeight: typography.fontWeight.semibold,
      marginBottom: sizing.spacing[1],
    },
  };

  const variantStyles = {
    solid: {
      backgroundColor: colorScale.main,
      color: colorScale.contrastText,
      border: 'none',
      '& .MuiAlert-icon': {
        color: colorScale.contrastText,
      },
      '& .MuiAlert-action': {
        color: colorScale.contrastText,
      },
    },
    soft: {
      backgroundColor: isDark ? colorScale.alpha20 : colorScale.alpha12,
      color: isDark ? colorScale.light : colorScale.dark,
      border: `1px solid ${colorScale.alpha20}`,
      '& .MuiAlert-icon': {
        color: colorScale.main,
      },
    },
    outlined: {
      backgroundColor: 'transparent',
      color: isDark ? theme.palette.text.primary : theme.palette.text.primary,
      border: `1.5px solid ${colorScale.main}`,
      '& .MuiAlert-icon': {
        color: colorScale.main,
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: isDark ? theme.palette.text.primary : theme.palette.text.primary,
      border: `1px solid ${colorScale.alpha20}`,
      '& .MuiAlert-icon': {
        color: colorScale.main,
      },
    },
    plain: {
      backgroundColor: isDark ? colorScale.alpha12 : colorScale.alpha8,
      color: isDark ? theme.palette.text.primary : theme.palette.text.primary,
      border: 'none',
      '& .MuiAlert-icon': {
        color: colorScale.main,
      },
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[sorbetVariant],
  };
});

const LoadingWrapper = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: sizing.spacing[2],
});

// =============================================================================
// COMPONENT
// =============================================================================

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'soft',
      color = 'info',
      size = 'md',
      loading = false,
      disableAnimation = false,
      startIcon,
      icon,
      children,
      ...rest
    },
    ref
  ) => {
    const sizeStyles = sizeConfig[size];

    const renderIcon = () => {
      if (loading) {
        return (
          <LoadingWrapper>
            <CircularProgress size={sizeStyles.iconSize - 4} color="inherit" />
          </LoadingWrapper>
        );
      }
      if (startIcon) {
        return startIcon;
      }
      return icon;
    };

    return (
      <StyledAlert
        ref={ref}
        sorbetVariant={variant}
        sorbetColor={color}
        sorbetSize={size}
        $loading={loading}
        $disableAnimation={disableAnimation}
        icon={renderIcon()}
        {...rest}
      >
        {children}
      </StyledAlert>
    );
  }
);
Alert.displayName = 'Alert';

// Re-export AlertTitle for convenience
export { AlertTitle, Collapse };
