'use client';

import { styled, TextFieldProps, useTheme } from '@mui/material';
import {
  LocalizationProvider,
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { colorScaleForMode, SemanticColor } from '@sorbet-ui/tokens';
import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────────────────────────────────

export type DatePickerVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
export type DatePickerColor = SemanticColor | 'error';
export type DatePickerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface StyledProps {
  $variant: DatePickerVariant;
  $color: DatePickerColor;
  $size: DatePickerSize;
  $fullWidth?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Size Configuration
// ─────────────────────────────────────────────────────────────────────────────

const sizeConfig = {
  xs: {
    fontSize: '0.75rem',
    padding: '4px 8px',
    height: '28px',
    iconSize: 16,
  },
  sm: {
    fontSize: '0.813rem',
    padding: '6px 10px',
    height: '32px',
    iconSize: 18,
  },
  md: {
    fontSize: '0.875rem',
    padding: '8px 12px',
    height: '40px',
    iconSize: 20,
  },
  lg: {
    fontSize: '1rem',
    padding: '10px 14px',
    height: '48px',
    iconSize: 22,
  },
  xl: {
    fontSize: '1.125rem',
    padding: '12px 16px',
    height: '56px',
    iconSize: 24,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Variant Styles
// ─────────────────────────────────────────────────────────────────────────────

const getVariantStyles = (
  variant: DatePickerVariant,
  colorScale: ReturnType<typeof colorScaleForMode>,
  size: DatePickerSize
) => {
  const config = sizeConfig[size];
  const colorValue = colorScale.main;
  const colorLight = colorScale.alpha12;
  const colorDark = colorScale.dark;

  const baseStyles = {
    fontSize: config.fontSize,
    '& .MuiInputBase-root': {
      minHeight: config.height,
      fontSize: config.fontSize,
    },
    '& .MuiInputBase-input': {
      padding: config.padding,
    },
    '& .MuiSvgIcon-root': {
      fontSize: config.iconSize,
    },
  };

  switch (variant) {
    case 'solid':
      return {
        ...baseStyles,
        '& .MuiPickersOutlinedInput-root': {
          backgroundColor: colorValue,
          color: '#fff',
          '& .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: colorValue,
          },
          '&:hover .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: colorDark,
          },
          '&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: colorDark,
          },
          '& .MuiSvgIcon-root': {
            color: '#fff',
          },
          '& input::placeholder': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.7)',
          '&.Mui-focused': {
            color: '#fff',
          },
        },
      };

    case 'soft':
      return {
        ...baseStyles,
        '& .MuiPickersOutlinedInput-root': {
          backgroundColor: colorLight,
          '& .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '&:hover': {
            backgroundColor: colorLight,
            filter: 'brightness(0.95)',
          },
          '&:hover .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: colorValue,
          },
          '&.Mui-focused': {
            backgroundColor: colorLight,
          },
          '&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: colorValue,
          },
        },
      };

    case 'outlined':
      return {
        ...baseStyles,
        '& .MuiPickersOutlinedInput-root': {
          '& .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: colorValue,
          },
          '&:hover .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: colorDark,
          },
          '&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: colorValue,
          },
        },
      };

    case 'ghost':
      return {
        ...baseStyles,
        '& .MuiPickersOutlinedInput-root': {
          '& .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '&:hover': {
            backgroundColor: colorScale.alpha8,
          },
          '&:hover .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '&.Mui-focused': {
            backgroundColor: colorScale.alpha12,
          },
          '&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: colorValue,
          },
        },
      };

    case 'plain':
      return {
        ...baseStyles,
        '& .MuiPickersOutlinedInput-root': {
          '& .MuiPickersOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '&:hover .MuiPickersOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
            border: 'none',
            boxShadow: `0 1px 0 0 ${colorValue}`,
          },
        },
      };

    default:
      return baseStyles;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Styled DatePicker Wrapper
// ─────────────────────────────────────────────────────────────────────────────

const DatePickerWrapper = styled('div', {
  shouldForwardProp: (prop) =>
    !['$variant', '$color', '$size', '$fullWidth'].includes(prop as string),
})<StyledProps>(({ theme, $variant, $color, $size, $fullWidth }) => {
  const semanticColor = $color === 'error' ? 'danger' : $color;
  const colorScale = colorScaleForMode(semanticColor, theme.palette.mode === 'dark');
  const variantStyles = getVariantStyles($variant, colorScale, $size) as Record<string, unknown>;
  const inputRootStyles = (variantStyles['& .MuiPickersOutlinedInput-root'] ?? {}) as Record<
    string,
    unknown
  >;

  return {
    width: $fullWidth ? '100%' : 'auto',
    display: 'inline-flex',
    ...variantStyles,
    '& .MuiPickersOutlinedInput-root': {
      borderRadius: 'var(--sun-radius-md, 8px)',
      transition: 'var(--sun-transition-normal, all 0.2s ease)',
      ...inputRootStyles,
    },
    '& .MuiTextField-root': {
      width: $fullWidth ? '100%' : 'auto',
    },
    '&.Mui-disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  };
});

// ─────────────────────────────────────────────────────────────────────────────
// DatePicker Props
// ─────────────────────────────────────────────────────────────────────────────

export interface SorbetDatePickerProps extends Omit<MuiDatePickerProps, 'renderInput'> {
  /** Visual variant of the date picker */
  variant?: DatePickerVariant;
  /** Color theme of the date picker */
  color?: DatePickerColor;
  /** Size of the date picker */
  size?: DatePickerSize;
  /** Label for the input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Whether input takes full width */
  fullWidth?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Custom input props */
  inputProps?: Partial<TextFieldProps>;
}

// ─────────────────────────────────────────────────────────────────────────────
// DatePicker Component
// ─────────────────────────────────────────────────────────────────────────────

export const DatePicker = React.forwardRef<HTMLDivElement, SorbetDatePickerProps>((props, ref) => {
  const theme = useTheme();
  const {
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    label,
    placeholder,
    helperText,
    error = false,
    fullWidth = false,
    required = false,
    disabled = false,
    inputProps,
    value,
    onChange,
    ...rest
  } = props;
  const semanticColor = color === 'error' ? 'danger' : color;
  const colorScale = colorScaleForMode(semanticColor, theme.palette.mode === 'dark');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePickerWrapper
        ref={ref}
        $variant={variant}
        $color={color}
        $size={size}
        $fullWidth={fullWidth}
        className={disabled ? 'Mui-disabled' : undefined}
      >
        <MuiDatePicker
          value={value}
          onChange={onChange}
          disabled={disabled}
          slotProps={{
            textField: {
              label,
              placeholder,
              helperText,
              error,
              required,
              variant: 'outlined',
              fullWidth,
              ...inputProps,
            },
            popper: {
              sx: {
                '& .MuiPaper-root': {
                  borderRadius: 'var(--sun-radius-lg, 12px)',
                  boxShadow: 'var(--sun-shadow-lg, 0 4px 12px rgba(0, 0, 0, 0.15))',
                },
                '& .MuiPickersDay-root': {
                  borderRadius: 'var(--sun-radius-full, 9999px)',
                  '&.Mui-selected': {
                    backgroundColor: colorScale.main,
                  },
                  '&:hover': {
                    backgroundColor: colorScale.alpha12,
                  },
                },
                '& .MuiPickersYear-yearButton, & .MuiPickersMonth-monthButton': {
                  borderRadius: 'var(--sun-radius-md, 8px)',
                  '&.Mui-selected': {
                    backgroundColor: colorScale.main,
                  },
                },
              },
            },
          }}
          {...rest}
        />
      </DatePickerWrapper>
    </LocalizationProvider>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;

// ─────────────────────────────────────────────────────────────────────────────
// Re-export dayjs for convenience
// ─────────────────────────────────────────────────────────────────────────────

export { dayjs };
export type { Dayjs };
