import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
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

export interface SelectProps extends Omit<MuiSelectProps<string>, 'variant' | 'size' | 'color'> {
  /** Visual style variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Select size */
  size?: SorbetSize;
  /** Show loading state */
  loading?: boolean;
  /** Helper text */
  helperText?: React.ReactNode;
  /** Start adornment icon/element */
  startIcon?: React.ReactNode;
}

// =============================================================================
// STYLE UTILITIES
// =============================================================================

const getColorScale = (color: SorbetColor, isDark: boolean) => colorScaleForMode(color, isDark);

const sizeConfig = {
  xs: {
    height: sizing.componentSizes.input.xs.height,
    fontSize: sizing.componentSizes.input.xs.fontSize,
    padding: sizing.componentSizes.input.xs.padding,
    labelSize: typography.fontSize.xs,
    borderRadius: sizing.radius.sm,
  },
  sm: {
    height: sizing.componentSizes.input.sm.height,
    fontSize: sizing.componentSizes.input.sm.fontSize,
    padding: sizing.componentSizes.input.sm.padding,
    labelSize: typography.fontSize.xs,
    borderRadius: sizing.radius.md,
  },
  md: {
    height: sizing.componentSizes.input.md.height,
    fontSize: sizing.componentSizes.input.md.fontSize,
    padding: sizing.componentSizes.input.md.padding,
    labelSize: typography.fontSize.sm,
    borderRadius: sizing.radius.md,
  },
  lg: {
    height: sizing.componentSizes.input.lg.height,
    fontSize: sizing.componentSizes.input.lg.fontSize,
    padding: sizing.componentSizes.input.lg.padding,
    labelSize: typography.fontSize.base,
    borderRadius: sizing.radius.lg,
  },
  xl: {
    height: sizing.componentSizes.input.xl.height,
    fontSize: sizing.componentSizes.input.xl.fontSize,
    padding: sizing.componentSizes.input.xl.padding,
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

const StyledSelect = styled(MuiSelect, {
  shouldForwardProp: (prop) => !['sorbetVariant', 'sorbetColor', 'sorbetSize'].includes(prop as string),
})<StyledProps>(({ theme, sorbetVariant, sorbetColor, sorbetSize }) => {
  const colorScale = getColorScale(sorbetColor, theme.palette.mode === 'dark');
  const sizeStyles = sizeConfig[sorbetSize];
  const isDark = theme.palette.mode === 'dark';

  const baseStyles = {
    fontFamily: typography.fontFamily.sans,
    fontSize: sizeStyles.fontSize,
    minHeight: sizeStyles.height,
    borderRadius: sizeStyles.borderRadius,
    transition: animations.transitions.input,
    '& .MuiSelect-select': {
      padding: sizeStyles.padding,
      minHeight: 'unset',
    },
    '&.Mui-disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  };

  const variantStyles = {
    solid: {
      backgroundColor: colorScale.alpha12,
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '2px',
        borderColor: 'transparent',
      },
      '&:hover:not(.Mui-disabled):not(.Mui-focused)': {
        backgroundColor: colorScale.alpha20,
      },
      '&.Mui-focused': {
        backgroundColor: colorScale.alpha12,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colorScale.main,
        },
      },
      '&.Mui-error': {
        backgroundColor: colors.semantic.danger.alpha12,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colorScaleForMode('danger', isDark).main,
        },
      },
    },
    soft: {
      backgroundColor: isDark ? colors.semantic.neutral[800] : colors.semantic.neutral[100],
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '2px',
        borderColor: isDark ? colors.semantic.neutral[700] : colors.semantic.neutral[200],
      },
      '&:hover:not(.Mui-disabled):not(.Mui-focused)': {
        backgroundColor: isDark ? colors.semantic.neutral[700] : colors.semantic.neutral[200],
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colorScale.light,
        },
      },
      '&.Mui-focused': {
        backgroundColor: isDark ? colors.semantic.neutral[900] : colors.backgrounds.light.paper,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colorScale.main,
        },
      },
      '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colorScaleForMode('danger', isDark).main,
        },
      },
    },
    outlined: {
      backgroundColor: 'transparent',
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '2px',
        borderColor: isDark ? colors.semantic.neutral[600] : colors.semantic.neutral[300],
      },
      '&:hover:not(.Mui-disabled):not(.Mui-focused)': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colorScale.light,
        },
      },
      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colorScale.main,
        },
      },
      '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colorScaleForMode('danger', isDark).main,
        },
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '2px',
        borderColor: 'transparent',
      },
      '&:hover:not(.Mui-disabled):not(.Mui-focused)': {
        backgroundColor: isDark ? colors.semantic.neutral[800] : colors.semantic.neutral[100],
      },
      '&.Mui-focused': {
        backgroundColor: 'transparent',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colorScale.main,
        },
      },
      '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colorScaleForMode('danger', isDark).main,
        },
      },
    },
    plain: {
      backgroundColor: 'transparent',
      borderRadius: 0,
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
        borderBottom: `2px solid ${isDark ? colors.semantic.neutral[600] : colors.semantic.neutral[300]}`,
        borderRadius: 0,
      },
      '&:hover:not(.Mui-disabled):not(.Mui-focused)': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderBottomColor: colorScale.light,
        },
      },
      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderBottomColor: colorScale.main,
          borderBottom: `2px solid ${colorScale.main}`,
        },
      },
      '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderBottomColor: colorScaleForMode('danger', isDark).main,
        },
      },
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[sorbetVariant],
  };
});

const StyledFormControl = styled(FormControl, {
  shouldForwardProp: (prop) => !['sorbetSize', 'sorbetColor'].includes(prop as string),
})<{ sorbetSize: SorbetSize; sorbetColor: SorbetColor }>(({ theme, sorbetSize, sorbetColor }) => {
  const colorScale = getColorScale(sorbetColor, theme.palette.mode === 'dark');
  const isDark = theme.palette.mode === 'dark';
  return {
    '& .MuiInputLabel-root': {
      fontSize: sizeConfig[sorbetSize].labelSize,
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
  };
});

// =============================================================================
// COMPONENT
// =============================================================================

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      loading = false,
      label,
      helperText,
      error,
      disabled,
      startIcon,
      children,
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

    return (
      <StyledFormControl
        sorbetSize={size}
        sorbetColor={color}
        error={error}
        disabled={disabled || loading}
        fullWidth
      >
        {label && <InputLabel>{label}</InputLabel>}
        <StyledSelect
          ref={ref}
          variant="outlined"
          sorbetVariant={variant}
          sorbetColor={color}
          sorbetSize={size}
          label={label}
          disabled={disabled || loading}
          error={error}
          startAdornment={startAdornment}
          {...(rest as any)}
        >
          {children}
        </StyledSelect>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </StyledFormControl>
    );
  }
);
Select.displayName = 'Select';

export { MenuItem };
