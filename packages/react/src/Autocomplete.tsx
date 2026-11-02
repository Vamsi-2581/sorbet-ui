'use client';

import {
  Chip,
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  Paper,
  styled,
  TextField,
  TextFieldProps,
} from '@mui/material';
import * as React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────────────────────────────────

export type AutocompleteVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
export type AutocompleteColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';
export type AutocompleteSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface StyledProps {
  $variant: AutocompleteVariant;
  $color: AutocompleteColor;
  $size: AutocompleteSize;
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
    chipSize: 'small' as const,
  },
  sm: {
    fontSize: '0.813rem',
    padding: '6px 10px',
    height: '32px',
    chipSize: 'small' as const,
  },
  md: {
    fontSize: '0.875rem',
    padding: '8px 12px',
    height: '40px',
    chipSize: 'small' as const,
  },
  lg: {
    fontSize: '1rem',
    padding: '10px 14px',
    height: '48px',
    chipSize: 'medium' as const,
  },
  xl: {
    fontSize: '1.125rem',
    padding: '12px 16px',
    height: '56px',
    chipSize: 'medium' as const,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Variant Styles
// ─────────────────────────────────────────────────────────────────────────────

const getVariantStyles = (
  variant: AutocompleteVariant,
  color: AutocompleteColor,
  size: AutocompleteSize
) => {
  const config = sizeConfig[size];
  const colorValue = `var(--sun-color-${color}-500, #1976d2)`;
  const colorLight = `var(--sun-color-${color}-100, #e3f2fd)`;
  const colorDark = `var(--sun-color-${color}-700, #1565c0)`;

  const baseStyles = {
    fontSize: config.fontSize,
    '& .MuiInputBase-root': {
      minHeight: config.height,
      fontSize: config.fontSize,
    },
    '& .MuiInputBase-input': {
      padding: config.padding,
    },
  };

  switch (variant) {
    case 'solid':
      return {
        ...baseStyles,
        '& .MuiOutlinedInput-root': {
          backgroundColor: colorValue,
          color: '#fff',
          '& fieldset': {
            borderColor: colorValue,
          },
          '&:hover fieldset': {
            borderColor: colorDark,
          },
          '&.Mui-focused fieldset': {
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
        '& .MuiOutlinedInput-root': {
          backgroundColor: colorLight,
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover': {
            backgroundColor: colorLight,
            filter: 'brightness(0.95)',
          },
          '&:hover fieldset': {
            borderColor: colorValue,
          },
          '&.Mui-focused': {
            backgroundColor: colorLight,
          },
          '&.Mui-focused fieldset': {
            borderColor: colorValue,
          },
        },
      };

    case 'outlined':
      return {
        ...baseStyles,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: colorValue,
          },
          '&:hover fieldset': {
            borderColor: colorDark,
          },
          '&.Mui-focused fieldset': {
            borderColor: colorValue,
          },
        },
      };

    case 'ghost':
      return {
        ...baseStyles,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover': {
            backgroundColor: `var(--sun-color-${color}-50, rgba(25, 118, 210, 0.08))`,
          },
          '&:hover fieldset': {
            borderColor: 'transparent',
          },
          '&.Mui-focused': {
            backgroundColor: `var(--sun-color-${color}-100, rgba(25, 118, 210, 0.12))`,
          },
          '&.Mui-focused fieldset': {
            borderColor: colorValue,
          },
        },
      };

    case 'plain':
      return {
        ...baseStyles,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
          },
          '&.Mui-focused fieldset': {
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
// Styled Components
// ─────────────────────────────────────────────────────────────────────────────

const StyledAutocomplete = styled(MuiAutocomplete, {
  shouldForwardProp: (prop) =>
    !['$variant', '$color', '$size', '$fullWidth'].includes(prop as string),
})<StyledProps>(({ $variant, $color, $size, $fullWidth }) => {
  const variantStyles = getVariantStyles($variant, $color, $size) as Record<string, unknown>;
  const inputRootStyles = (variantStyles['& .MuiOutlinedInput-root'] ?? {}) as Record<
    string,
    unknown
  >;

  return {
    width: $fullWidth ? '100%' : 'auto',
    ...variantStyles,
    '& .MuiOutlinedInput-root': {
      borderRadius: 'var(--sun-radius-md, 8px)',
      transition: 'var(--sun-transition-normal, all 0.2s ease)',
      ...inputRootStyles,
    },
    '&.Mui-disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  };
});

const StyledPaper = styled(Paper)(() => ({
  borderRadius: 'var(--sun-radius-md, 8px)',
  boxShadow: 'var(--sun-shadow-lg, 0 4px 12px rgba(0, 0, 0, 0.15))',
  marginTop: 4,
  '& .MuiAutocomplete-listbox': {
    padding: 'var(--sun-spacing-1, 4px)',
    '& .MuiAutocomplete-option': {
      borderRadius: 'var(--sun-radius-sm, 4px)',
      margin: '2px 0',
      '&[aria-selected="true"]': {
        backgroundColor: 'var(--sun-color-primary-100, #e3f2fd)',
      },
      '&.Mui-focused': {
        backgroundColor: 'var(--sun-color-neutral-100, #f5f5f5)',
      },
      '&[aria-selected="true"].Mui-focused': {
        backgroundColor: 'var(--sun-color-primary-200, #bbdefb)',
      },
    },
  },
  '& .MuiAutocomplete-noOptions': {
    padding: 'var(--sun-spacing-3, 12px)',
    color: 'var(--sun-color-neutral-500, #9e9e9e)',
  },
  '& .MuiAutocomplete-loading': {
    padding: 'var(--sun-spacing-3, 12px)',
    color: 'var(--sun-color-neutral-500, #9e9e9e)',
  },
}));

// ─────────────────────────────────────────────────────────────────────────────
// AutocompleteChip Component
// ─────────────────────────────────────────────────────────────────────────────

interface AutocompleteChipProps {
  label: string;
  onDelete?: () => void;
  variant: AutocompleteVariant;
  color: AutocompleteColor;
  size: AutocompleteSize;
  disabled?: boolean;
}

const AutocompleteChip = React.forwardRef<HTMLDivElement, AutocompleteChipProps>(
  ({ label, onDelete, variant, color, size, disabled, ...props }, ref) => {
    const chipVariant = variant === 'solid' ? 'filled' : 'outlined';
    const chipColor = color === 'neutral' ? 'default' : color;

    return (
      <Chip
        ref={ref}
        label={label}
        size={sizeConfig[size].chipSize}
        variant={chipVariant}
        color={chipColor as any}
        onDelete={disabled ? undefined : onDelete}
        disabled={disabled}
        {...props}
      />
    );
  }
);

AutocompleteChip.displayName = 'AutocompleteChip';

// ─────────────────────────────────────────────────────────────────────────────
// Autocomplete Props
// ─────────────────────────────────────────────────────────────────────────────

export interface AutocompleteOption {
  label: string;
  value: string | number;
  group?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export interface SorbetAutocompleteProps<
  T = AutocompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
> extends Omit<
  MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  'renderInput' | 'size'
> {
  /** Visual variant of the autocomplete */
  variant?: AutocompleteVariant;
  /** Color theme of the autocomplete */
  color?: AutocompleteColor;
  /** Size of the autocomplete */
  size?: AutocompleteSize;
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
  /** Custom render input function */
  renderInput?: MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['renderInput'];
}

// ─────────────────────────────────────────────────────────────────────────────
// Autocomplete Component
// ─────────────────────────────────────────────────────────────────────────────

function AutocompleteInner<
  T = AutocompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
>(
  props: SorbetAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
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
    options,
    multiple,
    freeSolo,
    renderInput: customRenderInput,
    renderTags,
    renderOption,
    getOptionLabel: getOptionLabelProp,
    ...rest
  } = props;

  const getOptionLabel = (option: T): string => {
    if (getOptionLabelProp) {
      return getOptionLabelProp(option);
    }
    if (typeof option === 'string') {
      return option;
    }
    if (typeof option === 'object' && option !== null && 'label' in option) {
      return (option as unknown as AutocompleteOption).label;
    }
    return String(option);
  };

  const defaultRenderInput = (params: any) => (
    <TextField
      {...params}
      label={label}
      placeholder={placeholder}
      helperText={helperText}
      error={error}
      required={required}
      variant="outlined"
      {...inputProps}
    />
  );

  const defaultRenderTags = (value: T[], getTagProps: any) =>
    value.map((option: T, index: number) => {
      const { key, ...tagProps } = getTagProps({ index });
      return (
        <AutocompleteChip
          key={key}
          label={getOptionLabel(option)}
          variant={variant}
          color={color}
          size={size}
          disabled={disabled}
          {...tagProps}
        />
      );
    });

  const defaultRenderOption = (
    props: React.HTMLAttributes<HTMLLIElement> & { key: React.Key },
    option: T
  ) => {
    const { key, ...otherProps } = props;
    const opt = option as unknown as AutocompleteOption;

    if (typeof option === 'object' && option !== null && 'icon' in option) {
      return (
        <li key={key} {...otherProps}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {opt.icon}
            <span>
              {opt.label}
              {opt.description && (
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    color: 'var(--sun-color-neutral-500, #9e9e9e)',
                  }}
                >
                  {opt.description}
                </span>
              )}
            </span>
          </span>
        </li>
      );
    }

    return (
      <li key={key} {...otherProps}>
        {getOptionLabel(option)}
      </li>
    );
  };

  return (
    <StyledAutocomplete
      ref={ref}
      options={options}
      multiple={multiple}
      freeSolo={freeSolo}
      disabled={disabled}
      getOptionLabel={getOptionLabel}
      renderInput={customRenderInput || defaultRenderInput}
      renderTags={renderTags || (multiple ? defaultRenderTags : undefined)}
      renderOption={renderOption || defaultRenderOption}
      PaperComponent={StyledPaper}
      $variant={variant}
      $color={color}
      $size={size}
      $fullWidth={fullWidth}
      {...(rest as any)}
    />
  );
}

export const Autocomplete = React.forwardRef(AutocompleteInner) as <
  T = AutocompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
>(
  props: SorbetAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> & {
    ref?: React.ForwardedRef<HTMLDivElement>;
  }
) => React.ReactElement;

(Autocomplete as any).displayName = 'Autocomplete';

export default Autocomplete;
