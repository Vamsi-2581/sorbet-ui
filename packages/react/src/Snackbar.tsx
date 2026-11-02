import {
  CircularProgress,
  Snackbar as MuiSnackbar,
  SnackbarContent as MuiSnackbarContent,
  SnackbarContentProps as MuiSnackbarContentProps,
  SnackbarProps as MuiSnackbarProps,
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

export interface SnackbarProps extends Omit<MuiSnackbarProps, 'variant'> {
  /** Visual style variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Snackbar size */
  size?: SorbetSize;
  /** Show loading state */
  loading?: boolean;
  /** Disable animations */
  disableAnimation?: boolean;
  /** Start icon */
  startIcon?: React.ReactNode;
}

export interface SnackbarContentProps extends Omit<MuiSnackbarContentProps, 'variant'> {
  /** Visual style variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Size */
  size?: SorbetSize;
}

// =============================================================================
// STYLE UTILITIES
// =============================================================================

const getColorScale = (color: SorbetColor, isDark: boolean) => colorScaleForMode(color, isDark);

const sizeConfig = {
  xs: {
    padding: `${sizing.spacing[1]} ${sizing.spacing[2]}`,
    fontSize: typography.fontSize.xs,
    borderRadius: sizing.radius.sm,
    minWidth: 200,
  },
  sm: {
    padding: `${sizing.spacing[2]} ${sizing.spacing[3]}`,
    fontSize: typography.fontSize.sm,
    borderRadius: sizing.radius.md,
    minWidth: 260,
  },
  md: {
    padding: `${sizing.spacing[3]} ${sizing.spacing[4]}`,
    fontSize: typography.fontSize.base,
    borderRadius: sizing.radius.md,
    minWidth: 320,
  },
  lg: {
    padding: `${sizing.spacing[4]} ${sizing.spacing[5]}`,
    fontSize: typography.fontSize.lg,
    borderRadius: sizing.radius.lg,
    minWidth: 400,
  },
  xl: {
    padding: `${sizing.spacing[5]} ${sizing.spacing[6]}`,
    fontSize: typography.fontSize.xl,
    borderRadius: sizing.radius.lg,
    minWidth: 480,
  },
};

// =============================================================================
// STYLED SNACKBAR CONTENT
// =============================================================================

interface StyledContentProps {
  sorbetVariant: SorbetVariant;
  sorbetColor: SorbetColor;
  sorbetSize: SorbetSize;
}

const StyledSnackbarContent = styled(MuiSnackbarContent, {
  shouldForwardProp: (prop) => !['sorbetVariant', 'sorbetColor', 'sorbetSize'].includes(prop as string),
})<StyledContentProps>(({ theme, sorbetVariant, sorbetColor, sorbetSize }) => {
  const colorScale = getColorScale(sorbetColor, theme.palette.mode === 'dark');
  const sizeStyles = sizeConfig[sorbetSize];
  const isDark = theme.palette.mode === 'dark';

  const baseStyles = {
    padding: sizeStyles.padding,
    fontSize: sizeStyles.fontSize,
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.medium,
    borderRadius: sizeStyles.borderRadius,
    minWidth: sizeStyles.minWidth,
    flexWrap: 'nowrap' as const,
    '& .MuiSnackbarContent-message': {
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      gap: sizing.spacing[2],
    },
    '& .MuiSnackbarContent-action': {
      marginRight: 0,
      paddingLeft: sizing.spacing[3],
    },
  };

  const variantStyles = {
    solid: {
      backgroundColor: colorScale.main,
      color: colorScale.contrastText,
      boxShadow: sizing.shadows.lg,
    },
    soft: {
      backgroundColor: isDark ? colorScale.alpha30 : colorScale.alpha20,
      color: isDark ? colorScale.light : colorScale.dark,
      boxShadow: sizing.shadows.md,
    },
    outlined: {
      backgroundColor: isDark ? colors.semantic.neutral[900] : colors.semantic.neutral[50],
      color: isDark ? colors.semantic.neutral[100] : colors.semantic.neutral[900],
      border: `1.5px solid ${colorScale.main}`,
      boxShadow: sizing.shadows.md,
    },
    ghost: {
      backgroundColor: isDark ? colors.semantic.neutral[800] : colors.semantic.neutral[100],
      color: isDark ? colors.semantic.neutral[100] : colors.semantic.neutral[800],
      boxShadow: sizing.shadows.sm,
    },
    plain: {
      backgroundColor: isDark ? colors.semantic.neutral[900] : '#ffffff',
      color: isDark ? colors.semantic.neutral[100] : colors.semantic.neutral[900],
      border: `1px solid ${isDark ? colors.semantic.neutral[700] : colors.semantic.neutral[200]}`,
      boxShadow: sizing.shadows.md,
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[sorbetVariant],
  };
});

// =============================================================================
// SNACKBAR CONTENT COMPONENT
// =============================================================================

export const SnackbarContent = React.forwardRef<HTMLDivElement, SnackbarContentProps>(
  ({ variant = 'solid', color = 'neutral', size = 'md', ...rest }, ref) => {
    return (
      <StyledSnackbarContent
        ref={ref}
        sorbetVariant={variant}
        sorbetColor={color}
        sorbetSize={size}
        {...rest}
      />
    );
  }
);
SnackbarContent.displayName = 'SnackbarContent';

// =============================================================================
// STYLED SNACKBAR
// =============================================================================

interface StyledSnackbarProps {
  $disableAnimation?: boolean;
}

const StyledSnackbar = styled(MuiSnackbar, {
  shouldForwardProp: (prop) => !['$disableAnimation'].includes(prop as string),
})<StyledSnackbarProps>(({ $disableAnimation }) => ({
  '& .MuiSnackbar-root': {
    transition: $disableAnimation ? 'none' : animations.transitions.slide,
  },
}));

const LoadingWrapper = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: sizing.spacing[2],
});

// =============================================================================
// SNACKBAR COMPONENT
// =============================================================================

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      variant = 'solid',
      color = 'neutral',
      size = 'md',
      loading = false,
      disableAnimation = false,
      startIcon,
      message,
      action,
      ...rest
    },
    ref
  ) => {
    const sizeStyles = sizeConfig[size];

    const renderMessage = () => {
      return (
        <>
          {loading && (
            <LoadingWrapper>
              <CircularProgress size={parseInt(sizeStyles.fontSize) + 2} color="inherit" />
            </LoadingWrapper>
          )}
          {!loading && startIcon}
          {message}
        </>
      );
    };

    return (
      <StyledSnackbar ref={ref} $disableAnimation={disableAnimation} {...rest}>
        <StyledSnackbarContent
          sorbetVariant={variant}
          sorbetColor={color}
          sorbetSize={size}
          message={renderMessage()}
          action={action}
        />
      </StyledSnackbar>
    );
  }
);
Snackbar.displayName = 'Snackbar';
