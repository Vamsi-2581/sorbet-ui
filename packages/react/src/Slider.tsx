import Box from '@mui/material/Box';
import MuiSlider, { SliderProps as MuiSliderProps } from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import type { SorbetColor, SorbetSize, SorbetVariant } from '@sorbet-ui/core';
import { colors, ColorScale, radius, textColorsForMode, transitions } from '@sorbet-ui/tokens';
import * as React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type SliderVariant = SorbetVariant;
export type SliderColor = SorbetColor;
export type SliderSize = SorbetSize;

export interface SliderProps extends Omit<
  MuiSliderProps,
  'color' | 'size' | 'components' | 'componentsProps'
> {
  /** Visual style variant */
  variant?: SliderVariant;
  /** Color theme */
  color?: SliderColor;
  /** Size preset */
  size?: SliderSize;
  /** Show value label */
  showValue?: boolean;
  /** Value label position */
  valueLabelPosition?: 'top' | 'bottom';
  /** Custom value formatter */
  formatValue?: (value: number) => string;
  /** Show min/max labels */
  showMinMax?: boolean;
  /** Custom className */
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Size Configuration
// ─────────────────────────────────────────────────────────────────────────────

const sizeConfig: Record<
  SliderSize,
  {
    trackHeight: number;
    thumbSize: number;
    railHeight: number;
    fontSize: string;
    markSize: number;
  }
> = {
  xs: { trackHeight: 2, thumbSize: 12, railHeight: 2, fontSize: '0.625rem', markSize: 4 },
  sm: { trackHeight: 4, thumbSize: 16, railHeight: 4, fontSize: '0.75rem', markSize: 6 },
  md: { trackHeight: 6, thumbSize: 20, railHeight: 6, fontSize: '0.875rem', markSize: 8 },
  lg: { trackHeight: 8, thumbSize: 24, railHeight: 8, fontSize: '1rem', markSize: 10 },
  xl: { trackHeight: 10, thumbSize: 32, railHeight: 10, fontSize: '1.125rem', markSize: 12 },
};

// ─────────────────────────────────────────────────────────────────────────────
// Styled Props Interface
// ─────────────────────────────────────────────────────────────────────────────

interface StyledSliderProps {
  $variant: SliderVariant;
  $color: SliderColor;
  $size: SliderSize;
}

// ─────────────────────────────────────────────────────────────────────────────
// Color Utilities
// ─────────────────────────────────────────────────────────────────────────────

const getColorValue = (color: SliderColor, shade: keyof ColorScale = 500): string => {
  const colorScale = colors[color] as ColorScale;
  return (colorScale[shade] as string) ?? (colors.primary[shade] as string);
};

// ─────────────────────────────────────────────────────────────────────────────
// Variant Styles
// ─────────────────────────────────────────────────────────────────────────────

const getVariantStyles = (variant: SliderVariant, color: SliderColor, size: SliderSize) => {
  const mainColor = getColorValue(color, 500);
  const lightColor = getColorValue(color, 100);
  const darkColor = getColorValue(color, 700);
  const config = sizeConfig[size];

  const baseStyles = {
    height: config.trackHeight,
    padding: `${config.thumbSize / 2}px 0`,
    '& .MuiSlider-rail': {
      height: config.railHeight,
      borderRadius: config.railHeight / 2,
    },
    '& .MuiSlider-track': {
      height: config.trackHeight,
      borderRadius: config.trackHeight / 2,
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      width: config.thumbSize,
      height: config.thumbSize,
      '&:before': {
        boxShadow: 'none',
      },
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0 0 0 8px ${mainColor}20`,
      },
      '&.Mui-active': {
        boxShadow: `0 0 0 12px ${mainColor}30`,
      },
    },
    '& .MuiSlider-mark': {
      width: config.markSize,
      height: config.markSize,
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      top: '50%',
    },
    '& .MuiSlider-markLabel': {
      fontSize: config.fontSize,
    },
    '& .MuiSlider-valueLabel': {
      fontSize: config.fontSize,
      padding: '4px 8px',
      borderRadius: radius.sm,
    },
  };

  const variants: Record<SliderVariant, Record<string, unknown>> = {
    solid: {
      ...baseStyles,
      '& .MuiSlider-rail': {
        ...baseStyles['& .MuiSlider-rail'],
        backgroundColor: getColorValue(color, 200),
      },
      '& .MuiSlider-track': {
        ...baseStyles['& .MuiSlider-track'],
        backgroundColor: mainColor,
      },
      '& .MuiSlider-thumb': {
        ...baseStyles['& .MuiSlider-thumb'],
        backgroundColor: mainColor,
        border: `2px solid ${mainColor}`,
      },
      '& .MuiSlider-mark': {
        ...baseStyles['& .MuiSlider-mark'],
        backgroundColor: getColorValue(color, 300),
      },
      '& .MuiSlider-markActive': {
        backgroundColor: 'white',
      },
      '& .MuiSlider-valueLabel': {
        ...baseStyles['& .MuiSlider-valueLabel'],
        backgroundColor: mainColor,
        color: 'white',
      },
    },
    soft: {
      ...baseStyles,
      '& .MuiSlider-rail': {
        ...baseStyles['& .MuiSlider-rail'],
        backgroundColor: lightColor,
      },
      '& .MuiSlider-track': {
        ...baseStyles['& .MuiSlider-track'],
        backgroundColor: getColorValue(color, 300),
      },
      '& .MuiSlider-thumb': {
        ...baseStyles['& .MuiSlider-thumb'],
        backgroundColor: getColorValue(color, 400),
        border: `2px solid ${getColorValue(color, 300)}`,
      },
      '& .MuiSlider-mark': {
        ...baseStyles['& .MuiSlider-mark'],
        backgroundColor: getColorValue(color, 200),
      },
      '& .MuiSlider-markActive': {
        backgroundColor: getColorValue(color, 500),
      },
      '& .MuiSlider-valueLabel': {
        ...baseStyles['& .MuiSlider-valueLabel'],
        backgroundColor: getColorValue(color, 300),
        color: darkColor,
      },
    },
    outlined: {
      ...baseStyles,
      '& .MuiSlider-rail': {
        ...baseStyles['& .MuiSlider-rail'],
        backgroundColor: 'transparent',
        border: `1px solid ${mainColor}`,
      },
      '& .MuiSlider-track': {
        ...baseStyles['& .MuiSlider-track'],
        backgroundColor: mainColor,
      },
      '& .MuiSlider-thumb': {
        ...baseStyles['& .MuiSlider-thumb'],
        backgroundColor: 'white',
        border: `2px solid ${mainColor}`,
      },
      '& .MuiSlider-mark': {
        ...baseStyles['& .MuiSlider-mark'],
        backgroundColor: mainColor,
      },
      '& .MuiSlider-markActive': {
        backgroundColor: 'white',
      },
      '& .MuiSlider-valueLabel': {
        ...baseStyles['& .MuiSlider-valueLabel'],
        backgroundColor: 'white',
        color: mainColor,
        border: `1px solid ${mainColor}`,
      },
    },
    ghost: {
      ...baseStyles,
      '& .MuiSlider-rail': {
        ...baseStyles['& .MuiSlider-rail'],
        backgroundColor: `${mainColor}15`,
      },
      '& .MuiSlider-track': {
        ...baseStyles['& .MuiSlider-track'],
        backgroundColor: `${mainColor}40`,
      },
      '& .MuiSlider-thumb': {
        ...baseStyles['& .MuiSlider-thumb'],
        backgroundColor: `${mainColor}60`,
        border: 'none',
      },
      '& .MuiSlider-mark': {
        ...baseStyles['& .MuiSlider-mark'],
        backgroundColor: `${mainColor}30`,
      },
      '& .MuiSlider-markActive': {
        backgroundColor: `${mainColor}60`,
      },
      '& .MuiSlider-valueLabel': {
        ...baseStyles['& .MuiSlider-valueLabel'],
        backgroundColor: `${mainColor}20`,
        color: darkColor,
      },
    },
    plain: {
      ...baseStyles,
      '& .MuiSlider-rail': {
        ...baseStyles['& .MuiSlider-rail'],
        backgroundColor: colors.neutral[300],
      },
      '& .MuiSlider-track': {
        ...baseStyles['& .MuiSlider-track'],
        backgroundColor: darkColor,
      },
      '& .MuiSlider-thumb': {
        ...baseStyles['& .MuiSlider-thumb'],
        backgroundColor: darkColor,
        border: `2px solid ${colors.neutral[100]}`,
      },
      '& .MuiSlider-mark': {
        ...baseStyles['& .MuiSlider-mark'],
        backgroundColor: colors.neutral[400],
      },
      '& .MuiSlider-markActive': {
        backgroundColor: colors.neutral[100],
      },
      '& .MuiSlider-valueLabel': {
        ...baseStyles['& .MuiSlider-valueLabel'],
        backgroundColor: darkColor,
        color: 'white',
      },
    },
  };

  return variants[variant];
};

// ─────────────────────────────────────────────────────────────────────────────
// Styled Components
// ─────────────────────────────────────────────────────────────────────────────

const StyledSlider = styled(MuiSlider, {
  shouldForwardProp: (prop) => !['$variant', '$color', '$size'].includes(prop as string),
})<StyledSliderProps>(({ $variant, $color, $size }) => ({
  transition: `all ${transitions.smooth}`,
  '&.Mui-disabled': {
    opacity: 0.5,
  },
  ...getVariantStyles($variant, $color, $size),
}));

const SliderWrapper = styled(Box)({
  width: '100%',
});

const SliderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

const ValueLabel = styled(Typography)({
  minWidth: '40px',
  textAlign: 'center',
  flexShrink: 0,
});

const MinMaxContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '4px',
});

// ─────────────────────────────────────────────────────────────────────────────
// Component Implementation
// ─────────────────────────────────────────────────────────────────────────────

export const Slider = React.forwardRef<HTMLSpanElement, SliderProps>((props, ref) => {
  const {
    variant = 'solid',
    color = 'primary',
    size = 'md',
    showValue = false,
    valueLabelPosition = 'top',
    formatValue = (v) => String(v),
    showMinMax = false,
    min = 0,
    max = 100,
    value,
    defaultValue,
    disabled = false,
    className,
    onChange,
    ...rest
  } = props;

  const [internalValue, setInternalValue] = React.useState<number | number[]>(
    defaultValue ?? value ?? min
  );
  const currentValue = value ?? internalValue;

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!value) {
      setInternalValue(newValue);
    }
    onChange?.(event, newValue, activeThumb);
  };

  const displayValue = Array.isArray(currentValue)
    ? `${formatValue(currentValue[0])} - ${formatValue(currentValue[1])}`
    : formatValue(currentValue);

  const config = sizeConfig[size];
  // In the light theme these labels keep the inherited page color, as before; dark
  // mode sets the dark text colors so they do not stay near-black on the dark page.
  const isDark = useTheme().palette.mode === 'dark';
  const valueSx = {
    fontSize: config.fontSize,
    ...(isDark && { color: textColorsForMode(true).primary }),
  };
  const boundSx = {
    fontSize: config.fontSize,
    ...(isDark && { color: textColorsForMode(true).secondary }),
  };

  const slider = (
    <StyledSlider
      ref={ref}
      $variant={variant}
      $color={color}
      $size={size}
      min={min}
      max={max}
      value={currentValue}
      onChange={handleChange}
      disabled={disabled}
      className={className}
      valueLabelDisplay={showValue && valueLabelPosition === 'top' ? 'auto' : 'off'}
      valueLabelFormat={formatValue}
      {...rest}
    />
  );

  if (showValue && valueLabelPosition === 'bottom') {
    return (
      <SliderWrapper>
        <SliderContainer>
          {slider}
          <ValueLabel variant="body2" sx={valueSx}>
            {displayValue}
          </ValueLabel>
        </SliderContainer>
        {showMinMax && (
          <MinMaxContainer>
            <Typography variant="caption" sx={boundSx}>
              {formatValue(min)}
            </Typography>
            <Typography variant="caption" sx={boundSx}>
              {formatValue(max)}
            </Typography>
          </MinMaxContainer>
        )}
      </SliderWrapper>
    );
  }

  if (showMinMax) {
    return (
      <SliderWrapper>
        {slider}
        <MinMaxContainer>
          <Typography variant="caption" sx={boundSx}>
            {formatValue(min)}
          </Typography>
          <Typography variant="caption" sx={boundSx}>
            {formatValue(max)}
          </Typography>
        </MinMaxContainer>
      </SliderWrapper>
    );
  }

  return slider;
});

Slider.displayName = 'Slider';

export default Slider;
