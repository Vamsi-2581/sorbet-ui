import {
  CircularProgress,
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
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

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'variant' | 'size' | 'color'> {
  /** Visual style variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Size of the input */
  size?: SorbetSize;
  /** Show loading state */
  loading?: boolean;
  /** Start adornment icon/element */
  startIcon?: React.ReactNode;
  /** End adornment icon/element */
  endIcon?: React.ReactNode;
}

// =============================================================================
// STYLE UTILITIES
// =============================================================================

const getColorScale = (color: SorbetColor, isDark: boolean) => colorScaleForMode(color, isDark);

const sizeConfig = {
  xs: {
    height: sizing.componentSizes.input.xs,
    fontSize: typography.fontSize.xs,
    padding: `${sizing.spacing[1]} ${sizing.spacing[2]}`,
    labelSize: typography.fontSize.xs,
    borderRadius: sizing.radius.sm,
  },
  sm: {
    height: sizing.componentSizes.input.sm,
    fontSize: typography.fontSize.sm,
    padding: `${sizing.spacing[1]} ${sizing.spacing[3]}`,
    labelSize: typography.fontSize.xs,
    borderRadius: sizing.radius.md,
  },
  md: {
    height: sizing.componentSizes.input.md,
    fontSize: typography.fontSize.base,
    padding: `${sizing.spacing[2]} ${sizing.spacing[3]}`,
    labelSize: typography.fontSize.sm,
    borderRadius: sizing.radius.md,
  },
  lg: {
    height: sizing.componentSizes.input.lg,
    fontSize: typography.fontSize.lg,
    padding: `${sizing.spacing[2]} ${sizing.spacing[4]}`,
    labelSize: typography.fontSize.base,
    borderRadius: sizing.radius.lg,
  },
  xl: {
    height: sizing.componentSizes.input.xl,
    fontSize: typography.fontSize.xl,
    padding: `${sizing.spacing[3]} ${sizing.spacing[5]}`,
    labelSize: typography.fontSize.lg,
    borderRadius: sizing.radius.lg,
  },
};

// =============================================================================
// STYLED COMPONENT
// =============================================================================

interface StyledProps {
  sorbetVariant: SorbetVariant;
  sorbetColor: SorbetColor;
  sorbetSize: SorbetSize;
}

const StyledTextField = styled(MuiTextField, {
  shouldForwardProp: (prop) => !['sorbetVariant', 'sorbetColor', 'sorbetSize'].includes(prop as string),
})<StyledProps>(({ theme, sorbetVariant, sorbetColor, sorbetSize }) => {
  const colorScale = getColorScale(sorbetColor, theme.palette.mode === 'dark');
  const sizeStyles = sizeConfig[sorbetSize];
  const isDark = theme.palette.mode === 'dark';

  const baseStyles = {
    '& .MuiInputBase-root': {
      fontFamily: typography.fontFamily.sans,
      fontSize: sizeStyles.fontSize,
      minHeight: sizeStyles.height,
      borderRadius: sizeStyles.borderRadius,
      transition: animations.transitions.input,
      '& input': {
        padding: sizeStyles.padding,
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: sizeStyles.labelSize,
      fontWeight: typography.fontWeight.medium,
      color: isDark ? colors.semantic.neutral[400] : colors.semantic.neutral[600],
      '&.Mui-focused': {
        color: colorScale.main,
      },
      '&.Mui-error': {
        color: colorScaleForMode('danger', isDark).main,
      },
    },
    '& .MuiFormHelperText-root': {
      fontSize: typography.fontSize.xs,
      marginTop: sizing.spacing[1],
    },
    '& .MuiInputBase-root.Mui-disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    '& .MuiInputAdornment-root': {
      color: isDark ? colors.semantic.neutral[400] : colors.semantic.neutral[500],
    },
  };

  const variantStyles = {
    solid: {
      '& .MuiInputBase-root': {
        backgroundColor: colorScale.alpha12,
        '& fieldset': {
          borderWidth: '2px',
          borderColor: 'transparent',
        },
        '&:hover:not(.Mui-disabled):not(.Mui-focused)': {
          backgroundColor: colorScale.alpha20,
        },
        '&.Mui-focused': {
          backgroundColor: colorScale.alpha12,
          '& fieldset': {
            borderColor: colorScale.main,
          },
        },
        '&.Mui-error': {
          backgroundColor: colors.semantic.danger.alpha12,
          '& fieldset': {
            borderColor: colorScaleForMode('danger', isDark).main,
          },
        },
      },
    },
    soft: {
      '& .MuiInputBase-root': {
        backgroundColor: isDark ? colors.semantic.neutral[800] : colors.semantic.neutral[100],
        '& fieldset': {
          borderWidth: '2px',
          borderColor: isDark ? colors.semantic.neutral[700] : colors.semantic.neutral[200],
        },
        '&:hover:not(.Mui-disabled):not(.Mui-focused)': {
          backgroundColor: isDark ? colors.semantic.neutral[700] : colors.semantic.neutral[200],
          '& fieldset': {
            borderColor: colorScale.light,
          },
        },
        '&.Mui-focused': {
          backgroundColor: isDark ? colors.semantic.neutral[900] : colors.backgrounds.light.paper,
          '& fieldset': {
            borderColor: colorScale.main,
          },
        },
        '&.Mui-error': {
          '& fieldset': {
            borderColor: colorScaleForMode('danger', isDark).main,
          },
        },
      },
    },
    outlined: {
      '& .MuiInputBase-root': {
        backgroundColor: 'transparent',
        '& fieldset': {
          borderWidth: '2px',
          borderColor: isDark ? colors.semantic.neutral[600] : colors.semantic.neutral[300],
        },
        '&:hover:not(.Mui-disabled):not(.Mui-focused)': {
          '& fieldset': {
            borderColor: colorScale.light,
          },
        },
        '&.Mui-focused': {
          '& fieldset': {
            borderColor: colorScale.main,
          },
        },
        '&.Mui-error': {
          '& fieldset': {
            borderColor: colorScaleForMode('danger', isDark).main,
          },
        },
      },
    },
    ghost: {
      '& .MuiInputBase-root': {
        backgroundColor: 'transparent',
        '& fieldset': {
          borderWidth: '2px',
          borderColor: 'transparent',
        },
        '&:hover:not(.Mui-disabled):not(.Mui-focused)': {
          backgroundColor: isDark ? colors.semantic.neutral[800] : colors.semantic.neutral[100],
        },
        '&.Mui-focused': {
          backgroundColor: 'transparent',
          '& fieldset': {
            borderColor: colorScale.main,
          },
        },
        '&.Mui-error': {
          '& fieldset': {
            borderColor: colorScaleForMode('danger', isDark).main,
          },
        },
      },
    },
    plain: {
      '& .MuiInputBase-root': {
        backgroundColor: 'transparent',
        borderRadius: 0,
        '&:before': {
          borderBottom: `2px solid ${isDark ? colors.semantic.neutral[600] : colors.semantic.neutral[300]}`,
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: `2px solid ${colorScale.light}`,
        },
        '&:after': {
          borderBottom: `2px solid ${colorScale.main}`,
        },
        '&.Mui-error:after': {
          borderBottom: `2px solid ${colorScaleForMode('danger', isDark).main}`,
        },
      },
      '& .MuiInputLabel-root': {
        fontSize: sizeStyles.labelSize,
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

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      loading = false,
      startIcon,
      endIcon,
      disabled,
      InputProps,
      ...rest
    },
    ref
  ) => {
    const startAdornment = (startIcon || loading) && (
      <InputAdornment position="start">
        {loading ? (
          <CircularProgress
            size={size === 'xs' || size === 'sm' ? 14 : size === 'md' ? 16 : 20}
            color="inherit"
          />
        ) : (
          startIcon
        )}
      </InputAdornment>
    );

    const endAdornment = endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>;

    // Use MUI's standard variant for plain (underline style), outlined for others
    const muiVariant = variant === 'plain' ? 'standard' : 'outlined';

    return (
      <StyledTextField
        ref={ref}
        variant={muiVariant}
        sorbetVariant={variant}
        sorbetColor={color}
        sorbetSize={size}
        disabled={disabled || loading}
        InputProps={{
          ...InputProps,
          startAdornment: startAdornment || InputProps?.startAdornment,
          endAdornment: endAdornment || InputProps?.endAdornment,
        }}
        {...(rest as any)}
      />
    );
  }
);
TextField.displayName = 'TextField';
