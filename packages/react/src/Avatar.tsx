import {
  CircularProgress,
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { animations, colors, colorScaleForMode, typography } from '@sorbet-ui/tokens';
import * as React from 'react';

// =============================================================================
// TYPES
// =============================================================================

type SorbetVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
type SorbetColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type SorbetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends Omit<MuiAvatarProps, 'variant'> {
  /** Visual style variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Avatar size */
  size?: SorbetSize;
  /** Show loading state */
  loading?: boolean;
  /** Show online/offline status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Disable hover animation */
  disableAnimation?: boolean;
}

// =============================================================================
// STYLE UTILITIES
// =============================================================================

const getColorScale = (color: SorbetColor, isDark: boolean) => colorScaleForMode(color, isDark);

const sizeConfig = {
  xs: { size: 24, fontSize: typography.fontSize.xs, iconSize: 12, statusSize: 6 },
  sm: { size: 32, fontSize: typography.fontSize.sm, iconSize: 16, statusSize: 8 },
  md: { size: 40, fontSize: typography.fontSize.base, iconSize: 20, statusSize: 10 },
  lg: { size: 56, fontSize: typography.fontSize.lg, iconSize: 28, statusSize: 12 },
  xl: { size: 80, fontSize: typography.fontSize.xl, iconSize: 40, statusSize: 16 },
};

const statusScales = {
  online: 'success',
  away: 'warning',
  busy: 'danger',
} as const;

// The status dot follows the mode like the avatar itself: the light-theme `main`
// shades are too dark to see on dark surfaces.
const getStatusColor = (status: 'online' | 'offline' | 'away' | 'busy', isDark: boolean) =>
  status === 'offline'
    ? colors.semantic.neutral[400]
    : colorScaleForMode(statusScales[status], isDark).main;

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

interface StyledProps {
  sorbetVariant: SorbetVariant;
  sorbetColor: SorbetColor;
  sorbetSize: SorbetSize;
  $disableAnimation?: boolean;
}

const StyledAvatar = styled(MuiAvatar, {
  shouldForwardProp: (prop) =>
    !['sorbetVariant', 'sorbetColor', 'sorbetSize', '$disableAnimation'].includes(prop as string),
})<StyledProps>(({ theme, sorbetVariant, sorbetColor, sorbetSize, $disableAnimation }) => {
  const colorScale = getColorScale(sorbetColor, theme.palette.mode === 'dark');
  const sizeStyles = sizeConfig[sorbetSize];
  const isDark = theme.palette.mode === 'dark';

  const baseStyles = {
    width: sizeStyles.size,
    height: sizeStyles.size,
    fontSize: sizeStyles.fontSize,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.sans,
    transition: $disableAnimation ? 'none' : animations.transitions.button,
    '&:hover': $disableAnimation
      ? {}
      : {
          transform: 'scale(1.05)',
        },
  };

  const variantStyles = {
    solid: {
      backgroundColor: colorScale.main,
      color: colorScale.contrastText,
      boxShadow: `0 2px 8px ${colorScale.alpha30}`,
    },
    soft: {
      backgroundColor: isDark ? colorScale.alpha20 : colorScale.alpha12,
      color: isDark ? colorScale.light : colorScale.dark,
      border: `2px solid ${colorScale.alpha20}`,
    },
    outlined: {
      backgroundColor: isDark ? colorScale.alpha12 : colorScale.alpha8,
      color: colorScale.main,
      border: `2px solid ${colorScale.main}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: isDark ? colors.semantic.neutral[300] : colors.semantic.neutral[700],
      border: `2px solid ${isDark ? colors.semantic.neutral[600] : colors.semantic.neutral[300]}`,
    },
    plain: {
      backgroundColor: isDark ? colors.semantic.neutral[800] : colors.semantic.neutral[100],
      color: isDark ? colors.semantic.neutral[200] : colors.semantic.neutral[700],
      border: 'none',
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[sorbetVariant],
  };
});

const AvatarWrapper = styled('div')({
  position: 'relative',
  display: 'inline-flex',
});

const StatusIndicator = styled('span')<{
  status: 'online' | 'offline' | 'away' | 'busy';
  sorbetSize: SorbetSize;
}>(({ theme, status, sorbetSize }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: sizeConfig[sorbetSize].statusSize,
  height: sizeConfig[sorbetSize].statusSize,
  borderRadius: '50%',
  backgroundColor: getStatusColor(status, theme.palette.mode === 'dark'),
  border: '2px solid white',
  boxSizing: 'content-box',
}));

const LoadingOverlay = styled('div')<{ sorbetSize: SorbetSize }>(({ sorbetSize }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: sizeConfig[sorbetSize].size,
  height: sizeConfig[sorbetSize].size,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
}));

// =============================================================================
// COMPONENT
// =============================================================================

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      loading = false,
      status,
      disableAnimation = false,
      children,
      ...rest
    },
    ref
  ) => {
    const sizeStyles = sizeConfig[size];

    return (
      <AvatarWrapper>
        <StyledAvatar
          ref={ref}
          sorbetVariant={variant}
          sorbetColor={color}
          sorbetSize={size}
          $disableAnimation={disableAnimation}
          {...rest}
        >
          {children}
        </StyledAvatar>
        {loading && (
          <LoadingOverlay sorbetSize={size}>
            <CircularProgress size={sizeStyles.iconSize} sx={{ color: 'white' }} />
          </LoadingOverlay>
        )}
        {status && !loading && <StatusIndicator status={status} sorbetSize={size} />}
      </AvatarWrapper>
    );
  }
);
Avatar.displayName = 'Avatar';
