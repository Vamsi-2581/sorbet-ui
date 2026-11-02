import {
  Box,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
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

export interface DialogProps extends Omit<MuiDialogProps, 'variant'> {
  /** Visual style variant */
  variant?: SorbetVariant;
  /** Color scheme (affects header accent) */
  color?: SorbetColor;
  /** Dialog size */
  size?: SorbetSize;
  /** Show loading overlay */
  loading?: boolean;
  /** Disable animations */
  disableAnimation?: boolean;
}

// =============================================================================
// STYLE UTILITIES
// =============================================================================

const getColorScale = (color: SorbetColor, isDark: boolean) => colorScaleForMode(color, isDark);

const sizeConfig = {
  xs: { maxWidth: 320, padding: sizing.spacing[3], borderRadius: sizing.radius.md },
  sm: { maxWidth: 400, padding: sizing.spacing[4], borderRadius: sizing.radius.lg },
  md: { maxWidth: 560, padding: sizing.spacing[5], borderRadius: sizing.radius.lg },
  lg: { maxWidth: 720, padding: sizing.spacing[6], borderRadius: sizing.radius.xl },
  xl: { maxWidth: 900, padding: sizing.spacing[8], borderRadius: sizing.radius['2xl'] },
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

const StyledDialog = styled(MuiDialog, {
  shouldForwardProp: (prop) =>
    !['sorbetVariant', 'sorbetColor', 'sorbetSize', '$loading', '$disableAnimation'].includes(
      prop as string
    ),
})<StyledProps>(({ theme, sorbetVariant, sorbetColor, sorbetSize, $loading, $disableAnimation }) => {
  const colorScale = getColorScale(sorbetColor, theme.palette.mode === 'dark');
  const sizeStyles = sizeConfig[sorbetSize];
  const isDark = theme.palette.mode === 'dark';

  const baseStyles = {
    '& .MuiDialog-paper': {
      borderRadius: sizeStyles.borderRadius,
      maxWidth: sizeStyles.maxWidth,
      width: '100%',
      margin: sizing.spacing[4],
      transition: $disableAnimation ? 'none' : animations.transitions.smooth,
      fontFamily: typography.fontFamily.sans,
      position: 'relative' as const,
      overflow: 'hidden',
      ...($loading && {
        pointerEvents: 'none' as const,
        '& > *:not(.dialog-loading-overlay)': {
          opacity: 0.5,
        },
      }),
    },
    '& .MuiDialogTitle-root': {
      padding: sizeStyles.padding,
      paddingBottom: sizing.spacing[3],
      fontWeight: typography.fontWeight.semibold,
    },
    '& .MuiDialogContent-root': {
      padding: sizeStyles.padding,
      paddingTop: sizing.spacing[2],
      paddingBottom: sizing.spacing[2],
    },
    '& .MuiDialogActions-root': {
      padding: sizeStyles.padding,
      paddingTop: sizing.spacing[3],
    },
  };

  const variantStyles = {
    solid: {
      '& .MuiDialog-paper': {
        backgroundColor: isDark ? colors.semantic.neutral[900] : theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: sizing.shadows['2xl'],
      },
      '& .MuiDialogTitle-root': {
        borderBottom: `1px solid ${isDark ? colors.semantic.neutral[700] : colors.semantic.neutral[200]}`,
      },
    },
    soft: {
      '& .MuiDialog-paper': {
        backgroundColor: isDark ? colors.semantic.neutral[800] : colors.semantic.neutral[50],
        color: theme.palette.text.primary,
        boxShadow: sizing.shadows.xl,
      },
      '& .MuiDialogTitle-root': {
        backgroundColor: isDark ? colorScale.alpha20 : colorScale.alpha12,
        color: isDark ? colorScale.light : colorScale.dark,
      },
    },
    outlined: {
      '& .MuiDialog-paper': {
        backgroundColor: isDark ? colors.semantic.neutral[900] : theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: `1.5px solid ${isDark ? colors.semantic.neutral[700] : colors.semantic.neutral[300]}`,
        boxShadow: sizing.shadows.lg,
      },
      '& .MuiDialogTitle-root': {
        borderBottom: `1px solid ${isDark ? colors.semantic.neutral[700] : colors.semantic.neutral[200]}`,
      },
    },
    ghost: {
      '& .MuiDialog-paper': {
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        color: theme.palette.text.primary,
        backdropFilter: 'blur(8px)',
        boxShadow: sizing.shadows.lg,
      },
    },
    plain: {
      '& .MuiDialog-paper': {
        backgroundColor: isDark ? colors.semantic.neutral[900] : theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 'none',
        border: `1px solid ${isDark ? colors.semantic.neutral[800] : colors.semantic.neutral[200]}`,
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

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      loading = false,
      disableAnimation = false,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <StyledDialog
        ref={ref}
        sorbetVariant={variant}
        sorbetColor={color}
        sorbetSize={size}
        $loading={loading}
        $disableAnimation={disableAnimation}
        {...rest}
      >
        {loading && (
          <LoadingOverlay className="dialog-loading-overlay">
            <CircularProgress size={40} />
          </LoadingOverlay>
        )}
        {children}
      </StyledDialog>
    );
  }
);
Dialog.displayName = 'Dialog';

export { DialogActions, DialogContent, DialogTitle };
