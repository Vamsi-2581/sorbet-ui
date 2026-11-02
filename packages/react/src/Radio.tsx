import {
  Box,
  CircularProgress,
  FormControlLabel,
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
  animations,
  colors,
  colorScaleForMode,
  sizing,
  textColorsForMode,
  typography,
} from '@sorbet-ui/tokens';
import * as React from 'react';

// =============================================================================
// TYPES
// =============================================================================

type SorbetVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
type SorbetColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type SorbetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface RadioProps extends Omit<MuiRadioProps, 'size' | 'color'> {
  /** Visual style variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Radio size */
  size?: SorbetSize;
  /** Label text */
  label?: React.ReactNode;
  /** Show loading state */
  loading?: boolean;
}

// =============================================================================
// STYLE UTILITIES
// =============================================================================

const getColorScale = (color: SorbetColor, isDark: boolean) => colorScaleForMode(color, isDark);

const sizeConfig = {
  xs: { radio: 16, dot: 6, label: typography.fontSize.xs },
  sm: { radio: 18, dot: 7, label: typography.fontSize.sm },
  md: { radio: 22, dot: 9, label: typography.fontSize.base },
  lg: { radio: 26, dot: 11, label: typography.fontSize.lg },
  xl: { radio: 32, dot: 14, label: typography.fontSize.xl },
};

// =============================================================================
// CUSTOM RADIO ICONS
// =============================================================================

interface IconProps {
  size: number;
  dotSize: number;
  variant: SorbetVariant;
  colorScale: ReturnType<typeof getColorScale>;
  checked?: boolean;
}

const RadioIcon = ({ size, dotSize, variant, colorScale, checked }: IconProps) => {
  const baseStyles: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: animations.transitions.button,
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: checked ? colorScale.main : colors.semantic.neutral[200],
          border: 'none',
        };
      case 'soft':
        return {
          backgroundColor: checked ? colorScale.alpha20 : colors.semantic.neutral[100],
          border: `2px solid ${checked ? colorScale.main : colors.semantic.neutral[300]}`,
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          border: `2px solid ${checked ? colorScale.main : colors.semantic.neutral[400]}`,
        };
      case 'ghost':
        return {
          backgroundColor: checked ? colorScale.alpha12 : 'transparent',
          border: `2px solid ${checked ? colorScale.main : 'transparent'}`,
        };
      case 'plain':
      default:
        return {
          backgroundColor: 'transparent',
          border: `2px solid ${checked ? colorScale.main : colors.semantic.neutral[400]}`,
        };
    }
  };

  const dotColor = variant === 'solid' && checked ? '#fff' : colorScale.main;

  return (
    <Box sx={{ ...baseStyles, ...getVariantStyles() }}>
      {checked && (
        <Box
          sx={{
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            backgroundColor: dotColor,
            transition: animations.transitions.scale,
          }}
        />
      )}
    </Box>
  );
};

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

interface StyledProps {
  sorbetSize: SorbetSize;
}

const StyledRadio = styled(MuiRadio, {
  shouldForwardProp: (prop) => prop !== 'sorbetSize',
})<StyledProps>(({ theme }) => ({
  padding: sizing.spacing[1],
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '&.Mui-focusVisible': {
    outline: `2px solid ${colorScaleForMode('primary', theme.palette.mode === 'dark').main}`,
    outlineOffset: '2px',
    borderRadius: '50%',
  },
  '&.Mui-disabled': {
    opacity: 0.5,
  },
}));

const StyledLabel = styled(FormControlLabel, {
  shouldForwardProp: (prop) => prop !== 'sorbetSize',
})<{ sorbetSize: SorbetSize }>(({ theme, sorbetSize }) => ({
  margin: 0,
  gap: sizing.spacing[2],
  '& .MuiFormControlLabel-label': {
    fontSize: sizeConfig[sorbetSize].label,
    fontFamily: typography.fontFamily.sans,
    color: textColorsForMode(theme.palette.mode === 'dark').primary,
    '&.Mui-disabled': {
      color: textColorsForMode(theme.palette.mode === 'dark').disabled,
    },
  },
}));

// =============================================================================
// COMPONENT
// =============================================================================

export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  (
    {
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      label,
      loading = false,
      checked,
      disabled,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const colorScale = getColorScale(color, theme.palette.mode === 'dark');
    const sizeStyles = sizeConfig[size];

    const radioElement = (
      <StyledRadio
        ref={ref}
        sorbetSize={size}
        checked={checked}
        disabled={disabled || loading}
        icon={
          loading ? (
            <CircularProgress size={sizeStyles.dot * 2} color="inherit" />
          ) : (
            <RadioIcon
              size={sizeStyles.radio}
              dotSize={sizeStyles.dot}
              variant={variant}
              colorScale={colorScale}
            />
          )
        }
        checkedIcon={
          <RadioIcon
            size={sizeStyles.radio}
            dotSize={sizeStyles.dot}
            variant={variant}
            colorScale={colorScale}
            checked
          />
        }
        {...rest}
      />
    );

    if (label) {
      return (
        <StyledLabel
          sorbetSize={size}
          control={radioElement}
          label={label}
          disabled={disabled || loading}
        />
      );
    }

    return radioElement;
  }
);
Radio.displayName = 'Radio';
