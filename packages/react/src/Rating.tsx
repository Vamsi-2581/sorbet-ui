import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import MuiRating, { RatingProps as MuiRatingProps } from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import type { SorbetColor, SorbetSize, SorbetVariant } from '@sorbet-ui/core';
import { getDefaultRatingLabel } from '@sorbet-ui/core';
import { colors, ColorScale, transitions } from '@sorbet-ui/tokens';
import * as React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type RatingVariant = SorbetVariant;
export type RatingColor = SorbetColor;
export type RatingSize = SorbetSize;

export interface RatingProps extends Omit<MuiRatingProps, 'color' | 'size'> {
  /** Visual style variant */
  variant?: RatingVariant;
  /** Color theme */
  color?: RatingColor;
  /** Size preset */
  size?: RatingSize;
  /** Show the value label */
  showLabel?: boolean;
  /** Label position */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Custom label formatter */
  formatLabel?: (value: number | null) => string;
  /** Show helper text */
  helperText?: string;
  /** Additional class name */
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Size Configuration
// ─────────────────────────────────────────────────────────────────────────────

const sizeConfig: Record<RatingSize, { iconSize: string; fontSize: string; gap: string }> = {
  xs: { iconSize: '0.875rem', fontSize: '0.625rem', gap: '2px' },
  sm: { iconSize: '1.125rem', fontSize: '0.75rem', gap: '2px' },
  md: { iconSize: '1.5rem', fontSize: '0.875rem', gap: '4px' },
  lg: { iconSize: '2rem', fontSize: '1rem', gap: '4px' },
  xl: { iconSize: '2.5rem', fontSize: '1.125rem', gap: '6px' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Styled Props Interface
// ─────────────────────────────────────────────────────────────────────────────

interface StyledRatingProps {
  $variant: RatingVariant;
  $color: RatingColor;
  $size: RatingSize;
}

// ─────────────────────────────────────────────────────────────────────────────
// Color Utilities
// ─────────────────────────────────────────────────────────────────────────────

const getColorValue = (color: RatingColor, shade: keyof ColorScale = 500): string => {
  const colorScale = colors[color] as ColorScale;
  return (colorScale[shade] as string) ?? (colors.primary[shade] as string);
};

// ─────────────────────────────────────────────────────────────────────────────
// Variant Styles
// ─────────────────────────────────────────────────────────────────────────────

const getVariantStyles = (variant: RatingVariant, color: RatingColor, size: RatingSize) => {
  const mainColor = getColorValue(color, 500);
  const lightColor = getColorValue(color, 200);
  const darkColor = getColorValue(color, 700);
  const config = sizeConfig[size];

  const baseStyles = {
    gap: config.gap,
    '& .MuiRating-icon': {
      transition: `all ${transitions.button}`,
    },
    '& .MuiRating-iconFilled': {
      fontSize: config.iconSize,
    },
    '& .MuiRating-iconEmpty': {
      fontSize: config.iconSize,
    },
    '& .MuiRating-iconHover': {
      transform: 'scale(1.1)',
    },
  };

  const variants: Record<RatingVariant, Record<string, unknown>> = {
    solid: {
      ...baseStyles,
      '& .MuiRating-iconFilled': {
        ...baseStyles['& .MuiRating-iconFilled'],
        color: mainColor,
      },
      '& .MuiRating-iconEmpty': {
        ...baseStyles['& .MuiRating-iconEmpty'],
        color: lightColor,
      },
    },
    soft: {
      ...baseStyles,
      '& .MuiRating-iconFilled': {
        ...baseStyles['& .MuiRating-iconFilled'],
        color: getColorValue(color, 400),
      },
      '& .MuiRating-iconEmpty': {
        ...baseStyles['& .MuiRating-iconEmpty'],
        color: getColorValue(color, 100),
      },
    },
    outlined: {
      ...baseStyles,
      '& .MuiRating-iconFilled': {
        ...baseStyles['& .MuiRating-iconFilled'],
        color: mainColor,
        '& path': {
          stroke: mainColor,
          strokeWidth: 1,
        },
      },
      '& .MuiRating-iconEmpty': {
        ...baseStyles['& .MuiRating-iconEmpty'],
        color: 'transparent',
        '& path': {
          stroke: mainColor,
          strokeWidth: 1,
        },
      },
    },
    ghost: {
      ...baseStyles,
      '& .MuiRating-iconFilled': {
        ...baseStyles['& .MuiRating-iconFilled'],
        color: `${mainColor}70`,
      },
      '& .MuiRating-iconEmpty': {
        ...baseStyles['& .MuiRating-iconEmpty'],
        color: `${mainColor}20`,
      },
    },
    plain: {
      ...baseStyles,
      '& .MuiRating-iconFilled': {
        ...baseStyles['& .MuiRating-iconFilled'],
        color: darkColor,
      },
      '& .MuiRating-iconEmpty': {
        ...baseStyles['& .MuiRating-iconEmpty'],
        color: colors.neutral[300],
      },
    },
  };

  return variants[variant];
};

// ─────────────────────────────────────────────────────────────────────────────
// Styled Components
// ─────────────────────────────────────────────────────────────────────────────

const StyledRating = styled(MuiRating, {
  shouldForwardProp: (prop) => !['$variant', '$color', '$size'].includes(prop as string),
})<StyledRatingProps>(({ $variant, $color, $size }) => ({
  transition: `all ${transitions.smooth}`,
  '&.Mui-disabled': {
    opacity: 0.5,
  },
  '&.Mui-readOnly': {
    pointerEvents: 'none',
  },
  '&:focus': {
    outline: 'none',
  },
  '&.Mui-focusVisible': {
    outline: `2px solid ${getColorValue($color, 500)}`,
    outlineOffset: '2px',
    borderRadius: '4px',
  },
  ...getVariantStyles($variant, $color, $size),
}));

const RatingWrapper = styled(Box)<{
  $labelPosition: 'left' | 'right' | 'top' | 'bottom';
}>(({ $labelPosition }) => ({
  display: 'flex',
  flexDirection: $labelPosition === 'top' || $labelPosition === 'bottom' ? 'column' : 'row',
  alignItems: $labelPosition === 'top' || $labelPosition === 'bottom' ? 'flex-start' : 'center',
  gap: '8px',
  ...($labelPosition === 'bottom' && { flexDirection: 'column-reverse' }),
  ...($labelPosition === 'left' && { flexDirection: 'row-reverse' }),
}));

const ValueLabel = styled(Typography)({
  minWidth: '2em',
  textAlign: 'center',
});

// ─────────────────────────────────────────────────────────────────────────────
// Component Implementation
// ─────────────────────────────────────────────────────────────────────────────

export const Rating = React.forwardRef<HTMLSpanElement, RatingProps>((props, ref) => {
  const {
    variant = 'solid',
    color = 'primary',
    size = 'md',
    showLabel = false,
    labelPosition = 'right',
    formatLabel,
    helperText,
    max = 5,
    precision = 1,
    value,
    defaultValue,
    disabled = false,
    readOnly = false,
    className,
    onChange,
    onChangeActive,
    ...rest
  } = props;

  const [internalValue, setInternalValue] = React.useState<number | null>(
    defaultValue ?? value ?? null
  );
  const [hoverValue, setHoverValue] = React.useState<number>(-1);

  const currentValue = value ?? internalValue;
  const displayValue = hoverValue !== -1 ? hoverValue : currentValue;

  const handleChange = (event: React.SyntheticEvent, newValue: number | null) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(event, newValue);
  };

  const handleChangeActive = (event: React.SyntheticEvent, newHover: number) => {
    setHoverValue(newHover);
    onChangeActive?.(event, newHover);
  };

  const config = sizeConfig[size];

  const labelText = formatLabel
    ? formatLabel(displayValue)
    : displayValue !== null
      ? getDefaultRatingLabel(displayValue)
      : 'No rating';

  const rating = (
    <StyledRating
      ref={ref}
      $variant={variant}
      $color={color}
      $size={size}
      max={max}
      precision={precision}
      value={currentValue}
      onChange={handleChange}
      onChangeActive={handleChangeActive}
      disabled={disabled}
      readOnly={readOnly}
      className={className}
      icon={<StarIcon fontSize="inherit" />}
      emptyIcon={<StarBorderIcon fontSize="inherit" />}
      {...rest}
    />
  );

  if (showLabel || helperText) {
    return (
      <Box>
        <RatingWrapper $labelPosition={labelPosition}>
          {rating}
          {showLabel && (
            <ValueLabel variant="body2" sx={{ fontSize: config.fontSize }} aria-live="polite">
              {labelText}
            </ValueLabel>
          )}
        </RatingWrapper>
        {helperText && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.5, display: 'block', fontSize: config.fontSize }}
          >
            {helperText}
          </Typography>
        )}
      </Box>
    );
  }

  return rating;
});

Rating.displayName = 'Rating';

export default Rating;
