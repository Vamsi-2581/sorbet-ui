import MuiToggleButton, {
  ToggleButtonProps as MuiToggleButtonProps,
} from '@mui/material/ToggleButton';
import MuiToggleButtonGroup, {
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import type { SorbetColor, SorbetSize, SorbetVariant } from '@sorbet-ui/core';
import {
  colors,
  ColorScale,
  colorScaleForMode,
  radius,
  textColorsForMode,
  transitions,
} from '@sorbet-ui/tokens';
import * as React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type ToggleButtonGroupVariant = SorbetVariant;
export type ToggleButtonGroupColor = SorbetColor;
export type ToggleButtonGroupSize = SorbetSize;

export interface ToggleButtonGroupProps extends Omit<MuiToggleButtonGroupProps, 'color' | 'size'> {
  /** Visual style variant */
  variant?: ToggleButtonGroupVariant;
  /** Color theme */
  color?: ToggleButtonGroupColor;
  /** Size preset */
  size?: ToggleButtonGroupSize;
  /** Whether buttons should have equal width */
  fullWidth?: boolean;
  /** Gap between buttons */
  gap?: number;
  /** Additional class name */
  className?: string;
  /** Children toggle buttons */
  children: React.ReactNode;
}

export interface ToggleButtonItemProps extends Omit<MuiToggleButtonProps, 'color' | 'size'> {
  /** Unique value for this button */
  value: string;
  /** Button content */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Size Configuration
// ─────────────────────────────────────────────────────────────────────────────

const sizeConfig: Record<
  ToggleButtonGroupSize,
  { padding: string; fontSize: string; minWidth: string; iconSize: string }
> = {
  xs: { padding: '4px 8px', fontSize: '0.625rem', minWidth: '24px', iconSize: '14px' },
  sm: { padding: '6px 12px', fontSize: '0.75rem', minWidth: '32px', iconSize: '16px' },
  md: { padding: '8px 16px', fontSize: '0.875rem', minWidth: '40px', iconSize: '20px' },
  lg: { padding: '10px 20px', fontSize: '1rem', minWidth: '48px', iconSize: '24px' },
  xl: { padding: '12px 24px', fontSize: '1.125rem', minWidth: '56px', iconSize: '28px' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Styled Props Interface
// ─────────────────────────────────────────────────────────────────────────────

interface StyledToggleButtonGroupProps {
  $variant: ToggleButtonGroupVariant;
  $color: ToggleButtonGroupColor;
  $size: ToggleButtonGroupSize;
  $fullWidth: boolean;
  $gap: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Color Utilities
// ─────────────────────────────────────────────────────────────────────────────

const getColorValue = (color: ToggleButtonGroupColor, shade: keyof ColorScale = 500): string => {
  const colorScale = colors[color] as ColorScale;
  return (colorScale[shade] as string) ?? (colors.primary[shade] as string);
};

// ─────────────────────────────────────────────────────────────────────────────
// Variant Styles
// ─────────────────────────────────────────────────────────────────────────────

const getVariantStyles = (
  variant: ToggleButtonGroupVariant,
  color: ToggleButtonGroupColor,
  size: ToggleButtonGroupSize,
  isDark: boolean
) => {
  const mainColor = getColorValue(color, 500);
  const lightColor = getColorValue(color, 100);
  const darkColor = getColorValue(color, 700);
  const config = sizeConfig[size];
  // Unselected text and the light hover and resting fills behind it follow the mode;
  // the light-theme values are the ones these variants always used.
  const unselectedText = isDark ? textColorsForMode(true).secondary : colors.neutral[600];
  const solidHover = isDark ? colorScaleForMode(color, true).alpha12 : getColorValue(color, 50);
  const softRest = isDark ? colors.neutral[800] : colors.neutral[100];
  const softHover = isDark ? colors.neutral[700] : colors.neutral[200];
  const plainHover = isDark ? colors.neutral[800] : colors.neutral[50];

  const baseButtonStyles = {
    padding: config.padding,
    fontSize: config.fontSize,
    minWidth: config.minWidth,
    textTransform: 'none' as const,
    transition: `all ${transitions.button}`,
    borderRadius: 0,
    '& .MuiSvgIcon-root': {
      fontSize: config.iconSize,
    },
  };

  const variants: Record<ToggleButtonGroupVariant, Record<string, unknown>> = {
    solid: {
      '& .MuiToggleButton-root': {
        ...baseButtonStyles,
        color: unselectedText,
        backgroundColor: 'transparent',
        border: `1px solid ${colors.neutral[300]}`,
        '&:hover': {
          backgroundColor: solidHover,
        },
        '&.Mui-selected': {
          color: 'white',
          backgroundColor: mainColor,
          borderColor: mainColor,
          '&:hover': {
            backgroundColor: darkColor,
          },
        },
        '&.Mui-disabled': {
          opacity: 0.5,
        },
      },
    },
    soft: {
      '& .MuiToggleButton-root': {
        ...baseButtonStyles,
        color: unselectedText,
        backgroundColor: softRest,
        border: 'none',
        '&:hover': {
          backgroundColor: softHover,
        },
        '&.Mui-selected': {
          color: darkColor,
          backgroundColor: lightColor,
          '&:hover': {
            backgroundColor: getColorValue(color, 200),
          },
        },
        '&.Mui-disabled': {
          opacity: 0.5,
        },
      },
    },
    outlined: {
      '& .MuiToggleButton-root': {
        ...baseButtonStyles,
        color: unselectedText,
        backgroundColor: 'transparent',
        border: `1px solid ${colors.neutral[300]}`,
        '&:hover': {
          borderColor: mainColor,
          backgroundColor: 'transparent',
        },
        '&.Mui-selected': {
          color: mainColor,
          backgroundColor: 'transparent',
          borderColor: mainColor,
          '&:hover': {
            backgroundColor: `${mainColor}10`,
          },
        },
        '&.Mui-disabled': {
          opacity: 0.5,
        },
      },
    },
    ghost: {
      '& .MuiToggleButton-root': {
        ...baseButtonStyles,
        color: unselectedText,
        backgroundColor: 'transparent',
        border: 'none',
        '&:hover': {
          backgroundColor: `${mainColor}10`,
        },
        '&.Mui-selected': {
          color: mainColor,
          backgroundColor: `${mainColor}15`,
          '&:hover': {
            backgroundColor: `${mainColor}25`,
          },
        },
        '&.Mui-disabled': {
          opacity: 0.5,
        },
      },
    },
    plain: {
      '& .MuiToggleButton-root': {
        ...baseButtonStyles,
        color: unselectedText,
        backgroundColor: 'transparent',
        border: `1px solid ${colors.neutral[200]}`,
        '&:hover': {
          backgroundColor: plainHover,
        },
        '&.Mui-selected': {
          color: darkColor,
          backgroundColor: colors.neutral[100],
          borderColor: colors.neutral[400],
          '&:hover': {
            backgroundColor: colors.neutral[200],
          },
        },
        '&.Mui-disabled': {
          opacity: 0.5,
        },
      },
    },
  };

  return variants[variant];
};

// ─────────────────────────────────────────────────────────────────────────────
// Styled Components
// ─────────────────────────────────────────────────────────────────────────────

const StyledToggleButtonGroup = styled(MuiToggleButtonGroup, {
  shouldForwardProp: (prop) =>
    !['$variant', '$color', '$size', '$fullWidth', '$gap'].includes(prop as string),
})<StyledToggleButtonGroupProps>(
  ({ theme, $variant, $color, $size, $fullWidth, $gap, orientation }) => ({
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    gap: $gap,
    ...($fullWidth && {
      width: '100%',
      '& .MuiToggleButton-root': {
        flex: 1,
      },
    }),
    ...($gap > 0 && {
      '& .MuiToggleButtonGroup-grouped': {
        borderRadius: `${radius.md} !important`,
        border: 'inherit !important',
        '&:not(:first-of-type)': {
          marginLeft: 0,
          borderLeft: 'inherit !important',
        },
      },
    }),
    ...($gap === 0 && {
      '& .MuiToggleButtonGroup-grouped': {
        '&:first-of-type': {
          borderTopLeftRadius: radius.md,
          borderBottomLeftRadius: orientation === 'vertical' ? 0 : radius.md,
          borderTopRightRadius: orientation === 'vertical' ? radius.md : 0,
        },
        '&:last-of-type': {
          borderTopRightRadius: orientation === 'vertical' ? 0 : radius.md,
          borderBottomRightRadius: radius.md,
          borderBottomLeftRadius: orientation === 'vertical' ? radius.md : 0,
        },
        '&:not(:first-of-type):not(:last-of-type)': {
          borderRadius: 0,
        },
      },
    }),
    ...getVariantStyles($variant, $color, $size, theme.palette.mode === 'dark'),
  })
);

// ─────────────────────────────────────────────────────────────────────────────
// ToggleButton Component
// ─────────────────────────────────────────────────────────────────────────────

export const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonItemProps>(
  (props, ref) => {
    const { value, children, className, ...rest } = props;

    return (
      <MuiToggleButton ref={ref} value={value} className={className} {...rest}>
        {children}
      </MuiToggleButton>
    );
  }
);

ToggleButton.displayName = 'ToggleButton';

// ─────────────────────────────────────────────────────────────────────────────
// ToggleButtonGroup Component
// ─────────────────────────────────────────────────────────────────────────────

export const ToggleButtonGroup = React.forwardRef<HTMLDivElement, ToggleButtonGroupProps>(
  (props, ref) => {
    const {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      fullWidth = false,
      gap = 0,
      exclusive = false,
      orientation = 'horizontal',
      disabled = false,
      value,
      onChange,
      className,
      children,
      ...rest
    } = props;

    return (
      <StyledToggleButtonGroup
        ref={ref}
        $variant={variant}
        $color={color}
        $size={size}
        $fullWidth={fullWidth}
        $gap={gap}
        exclusive={exclusive}
        orientation={orientation}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={className}
        {...rest}
      >
        {children}
      </StyledToggleButtonGroup>
    );
  }
);

ToggleButtonGroup.displayName = 'ToggleButtonGroup';

export default ToggleButtonGroup;
