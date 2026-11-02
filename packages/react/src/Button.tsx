import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';
import { colors, colorScaleForMode, componentSizes, radius, transitions } from '@sorbet-ui/tokens';
import * as React from 'react';

// =============================================================================
// TYPES
// =============================================================================

export type SorbetVariant = 'solid' | 'soft' | 'outlined' | 'dash' | 'ghost' | 'plain' | 'link';
export type SorbetColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral';
export type SorbetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SorbetShape = 'default' | 'wide' | 'block' | 'square' | 'circle';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'color' | 'size'> {
  /** Visual variant of the button */
  variant?: SorbetVariant;
  /** Color scheme of the button */
  color?: SorbetColor;
  /** Size of the button */
  size?: SorbetSize;
  /** Shape modifier: wide (max 256px), block (full width), square, circle */
  shape?: SorbetShape;
  /** Show loading indicator */
  loading?: boolean;
  /** Position of loading indicator */
  loadingPosition?: 'start' | 'end' | 'center';
  /** Show as active/pressed state */
  active?: boolean;
  /** Icon at the start of button */
  startIcon?: React.ReactNode;
  /** Icon at the end of button */
  endIcon?: React.ReactNode;
  /** Disable hover lift animation */
  disableElevation?: boolean;
}

// =============================================================================
// ANIMATIONS
// =============================================================================

const spinKeyframes = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// =============================================================================
// STYLE UTILITIES
// =============================================================================

const getColorStyles = (color: SorbetColor, variant: SorbetVariant, isDark: boolean = false) => {
  const colorScale = colorScaleForMode(color, isDark);
  const neutralScale = colors.neutral;

  const variants: Record<SorbetVariant, object> = {
    // Solid: Filled background with contrast text
    solid: {
      backgroundColor: colorScale.main,
      color: colorScale.contrastText,
      border: 'none',
      '&:hover:not(:disabled)': {
        backgroundColor: colorScale.dark,
        transform: 'translateY(-1px)',
        boxShadow: `0 4px 12px ${colorScale.alpha30}`,
      },
      '&:active:not(:disabled)': {
        backgroundColor: colorScale[700],
        transform: 'translateY(0)',
        boxShadow: 'none',
      },
    },

    // Soft: Light tinted background
    soft: {
      backgroundColor: isDark ? colorScale.alpha20 : colorScale.alpha12,
      color: isDark ? colorScale.light : colorScale.dark,
      border: 'none',
      '&:hover:not(:disabled)': {
        backgroundColor: isDark ? colorScale.alpha30 : colorScale.alpha20,
      },
      '&:active:not(:disabled)': {
        backgroundColor: isDark ? colorScale.alpha40 : colorScale.alpha30,
      },
    },

    // Outlined: Border with transparent background
    outlined: {
      backgroundColor: 'transparent',
      color: colorScale.main,
      border: `2px solid ${colorScale.main}`,
      '&:hover:not(:disabled)': {
        backgroundColor: colorScale.alpha8,
        borderColor: colorScale.dark,
        color: colorScale.dark,
      },
      '&:active:not(:disabled)': {
        backgroundColor: colorScale.alpha16,
      },
    },

    // Dash: Dashed border (DaisyUI-inspired)
    dash: {
      backgroundColor: 'transparent',
      color: colorScale.main,
      border: `2px dashed ${colorScale.main}`,
      '&:hover:not(:disabled)': {
        backgroundColor: colorScale.alpha8,
        borderColor: colorScale.dark,
      },
      '&:active:not(:disabled)': {
        backgroundColor: colorScale.alpha16,
      },
    },

    // Ghost: Neutral border, shows color on hover
    ghost: {
      backgroundColor: 'transparent',
      color: isDark ? neutralScale[300] : neutralScale[700],
      border: `2px solid ${isDark ? neutralScale[600] : neutralScale[300]}`,
      '&:hover:not(:disabled)': {
        backgroundColor: colorScale.alpha8,
        borderColor: colorScale.main,
        color: colorScale.main,
      },
      '&:active:not(:disabled)': {
        backgroundColor: colorScale.alpha16,
      },
    },

    // Plain: No border, subtle hover
    plain: {
      backgroundColor: 'transparent',
      color: colorScale.main,
      border: 'none',
      '&:hover:not(:disabled)': {
        backgroundColor: colorScale.alpha8,
      },
      '&:active:not(:disabled)': {
        backgroundColor: colorScale.alpha16,
      },
    },

    // Link: Looks like a hyperlink
    link: {
      backgroundColor: 'transparent',
      color: colorScale.main,
      border: 'none',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
      padding: 0,
      minHeight: 'auto',
      height: 'auto',
      '&:hover:not(:disabled)': {
        color: colorScale.dark,
        textDecorationThickness: '2px',
        backgroundColor: 'transparent',
      },
      '&:active:not(:disabled)': {
        color: colorScale[700],
      },
    },
  };

  return variants[variant];
};

const getSizeStyles = (size: SorbetSize) => {
  const sizeConfig = componentSizes.button[size];
  return {
    minHeight: sizeConfig.height,
    height: sizeConfig.height,
    padding: sizeConfig.padding,
    fontSize: sizeConfig.fontSize,
    lineHeight: 1.5,
    gap: size === 'xs' ? '4px' : size === 'sm' ? '6px' : '8px',
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      margin: 0,
      '& > *:first-of-type': {
        fontSize: sizeConfig.iconSize,
      },
    },
  };
};

const getShapeStyles = (shape: SorbetShape, size: SorbetSize) => {
  const sizeConfig = componentSizes.button[size];

  switch (shape) {
    case 'wide':
      return { width: '100%', maxWidth: '256px' };
    case 'block':
      return { width: '100%' };
    case 'square':
      return { width: sizeConfig.height, minWidth: sizeConfig.height, padding: 0 };
    case 'circle':
      return {
        width: sizeConfig.height,
        minWidth: sizeConfig.height,
        padding: 0,
        borderRadius: '9999px',
      };
    default:
      return {};
  }
};

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

interface StyledButtonProps {
  $variant: SorbetVariant;
  $color: SorbetColor;
  $size: SorbetSize;
  $shape: SorbetShape;
  $loading?: boolean;
  $active?: boolean;
  $disableElevation?: boolean;
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) =>
    !['$variant', '$color', '$size', '$shape', '$loading', '$active', '$disableElevation'].includes(
      prop as string
    ),
})<StyledButtonProps>(({
  theme,
  $variant,
  $color,
  $size,
  $shape,
  $loading,
  $active,
  $disableElevation,
}) => {
  const isDark = theme.palette.mode === 'dark';

  return {
    // Base styles
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'none',
    fontWeight: 600,
    fontFamily: 'inherit',
    borderRadius: radius.md,
    transition: transitions.button,
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    flexShrink: 0,

    // Apply variant, size, and shape styles
    ...getColorStyles($color, $variant, isDark),
    ...getSizeStyles($size),
    ...getShapeStyles($shape, $size),

    // Disable hover lift if requested
    ...($disableElevation && {
      '&:hover:not(:disabled)': {
        transform: 'none',
        boxShadow: 'none',
      },
    }),

    // Focus visible styles (keyboard navigation)
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 3px ${colors[$color].alpha40}`,
    },

    // Active/pressed state
    ...($active && {
      backgroundColor: colors[$color].alpha20,
      boxShadow: `inset 0 2px 4px ${colors[$color].alpha30}`,
    }),

    // Disabled state
    '&.Mui-disabled': {
      backgroundColor: isDark ? colors.neutral[700] : colors.neutral[200],
      color: isDark ? colors.neutral[500] : colors.neutral[400],
      borderColor: 'transparent',
      cursor: 'not-allowed',
      opacity: 0.6,
      transform: 'none',
      boxShadow: 'none',
    },

    // Loading state
    ...($loading && {
      cursor: 'wait',
      pointerEvents: 'none',
      '& .button-content': {
        opacity: 0.6,
      },
    }),
  };
});

const LoadingSpinner = styled('span')<{ $size: SorbetSize }>(({ $size }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${spinKeyframes} 1s linear infinite`,
  '& svg': {
    width:
      $size === 'xs' ? 12 : $size === 'sm' ? 14 : $size === 'lg' ? 20 : $size === 'xl' ? 24 : 16,
    height:
      $size === 'xs' ? 12 : $size === 'sm' ? 14 : $size === 'lg' ? 20 : $size === 'xl' ? 24 : 16,
  },
}));

const LoadingOverlay = styled('span')({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// Custom spinner SVG (lighter than MUI CircularProgress)
const SpinnerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
  </svg>
);

// =============================================================================
// COMPONENT
// =============================================================================

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      shape = 'default',
      loading = false,
      loadingPosition = 'center',
      active = false,
      disabled,
      disableElevation = false,
      children,
      startIcon,
      endIcon,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Render loading spinner
    const renderLoadingIndicator = () => (
      <LoadingSpinner $size={size}>
        <SpinnerIcon />
      </LoadingSpinner>
    );

    // Handle start icon with loading
    const renderStartIcon = () => {
      if (loading && loadingPosition === 'start') {
        return renderLoadingIndicator();
      }
      return startIcon;
    };

    // Handle end icon with loading
    const renderEndIcon = () => {
      if (loading && loadingPosition === 'end') {
        return renderLoadingIndicator();
      }
      return endIcon;
    };

    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $color={color}
        $size={size}
        $shape={shape}
        $loading={loading}
        $active={active}
        $disableElevation={disableElevation}
        disabled={isDisabled}
        startIcon={renderStartIcon()}
        endIcon={renderEndIcon()}
        aria-busy={loading}
        aria-disabled={isDisabled}
        aria-label={ariaLabel}
        {...rest}
      >
        {/* Center loading overlay */}
        {loading && loadingPosition === 'center' && (
          <LoadingOverlay>{renderLoadingIndicator()}</LoadingOverlay>
        )}

        {/* Button content */}
        <span
          className="button-content"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'inherit',
            opacity: loading && loadingPosition === 'center' ? 0 : 1,
          }}
        >
          {children}
        </span>
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';
