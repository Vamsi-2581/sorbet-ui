import Box from '@mui/material/Box';
import MuiCircularProgress, {
  CircularProgressProps as MuiCircularProgressProps,
} from '@mui/material/CircularProgress';
import MuiLinearProgress, {
  LinearProgressProps as MuiLinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import type { SorbetColor, SorbetSize, SorbetVariant } from '@sorbet-ui/core';
import { calculateProgressState, clampProgress, getProgressAriaProps } from '@sorbet-ui/core';
import { colors, ColorScale, radius, transitions } from '@sorbet-ui/tokens';
import * as React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type ProgressVariant = SorbetVariant;
export type ProgressColor = SorbetColor;
export type ProgressSize = SorbetSize;
export type ProgressType = 'linear' | 'circular';

interface BaseProgressProps {
  /** Visual style variant */
  variant?: ProgressVariant;
  /** Color theme */
  color?: ProgressColor;
  /** Size preset */
  size?: ProgressSize;
  /** Current value (0-100 for determinate) */
  value?: number;
  /** Whether the progress is indeterminate */
  indeterminate?: boolean;
  /** Show the value label */
  showLabel?: boolean;
  /** Label position (linear only) */
  labelPosition?: 'end' | 'top' | 'bottom';
  /** Custom label formatter */
  formatLabel?: (value: number) => string;
  /** Additional class name */
  className?: string;
}

export interface LinearProgressProps extends BaseProgressProps {
  /** Progress type */
  type?: 'linear';
  /** Buffer value for buffered progress */
  bufferValue?: number;
  /** Height of the progress bar */
  height?: number;
  /** Whether to show rounded corners */
  rounded?: boolean;
}

export interface CircularProgressProps extends BaseProgressProps {
  /** Progress type */
  type: 'circular';
  /** Thickness of the circular progress */
  thickness?: number;
  /** Size of the circular progress in pixels */
  circleSize?: number;
}

export type ProgressProps = LinearProgressProps | CircularProgressProps;

// ─────────────────────────────────────────────────────────────────────────────
// Size Configuration
// ─────────────────────────────────────────────────────────────────────────────

const linearSizeConfig: Record<
  ProgressSize,
  { height: number; borderRadius: string; fontSize: string }
> = {
  xs: { height: 2, borderRadius: radius.xs, fontSize: '0.625rem' },
  sm: { height: 4, borderRadius: radius.sm, fontSize: '0.75rem' },
  md: { height: 6, borderRadius: radius.md, fontSize: '0.875rem' },
  lg: { height: 8, borderRadius: radius.lg, fontSize: '1rem' },
  xl: { height: 12, borderRadius: radius.xl, fontSize: '1.125rem' },
};

const circularSizeConfig: Record<
  ProgressSize,
  { size: number; thickness: number; fontSize: string }
> = {
  xs: { size: 16, thickness: 4, fontSize: '0.5rem' },
  sm: { size: 24, thickness: 4, fontSize: '0.625rem' },
  md: { size: 40, thickness: 4, fontSize: '0.75rem' },
  lg: { size: 56, thickness: 4, fontSize: '0.875rem' },
  xl: { size: 80, thickness: 5, fontSize: '1rem' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Styled Props Interface
// ─────────────────────────────────────────────────────────────────────────────

interface StyledLinearProgressProps {
  $variant: ProgressVariant;
  $color: ProgressColor;
  $size: ProgressSize;
  $rounded: boolean;
  $height?: number;
}

interface StyledCircularProgressProps {
  $variant: ProgressVariant;
  $color: ProgressColor;
}

// ─────────────────────────────────────────────────────────────────────────────
// Color Utilities
// ─────────────────────────────────────────────────────────────────────────────

const getColorValue = (color: ProgressColor, shade: keyof ColorScale = 500): string => {
  const colorScale = colors[color] as ColorScale;
  return (colorScale[shade] as string) ?? (colors.primary[shade] as string);
};

// ─────────────────────────────────────────────────────────────────────────────
// Linear Progress Variants
// ─────────────────────────────────────────────────────────────────────────────

const getLinearVariantStyles = (variant: ProgressVariant, color: ProgressColor) => {
  const mainColor = getColorValue(color, 500);
  const lightColor = getColorValue(color, 100);
  const darkColor = getColorValue(color, 700);

  const variants: Record<ProgressVariant, Record<string, unknown>> = {
    solid: {
      backgroundColor: getColorValue(color, 200),
      '& .MuiLinearProgress-bar': {
        backgroundColor: mainColor,
      },
      '& .MuiLinearProgress-bar1Buffer': {
        backgroundColor: mainColor,
      },
      '& .MuiLinearProgress-bar2Buffer': {
        backgroundColor: lightColor,
      },
      '& .MuiLinearProgress-dashed': {
        backgroundImage: `radial-gradient(${getColorValue(color, 300)} 0%, ${getColorValue(color, 300)} 16%, transparent 42%)`,
      },
    },
    soft: {
      backgroundColor: lightColor,
      '& .MuiLinearProgress-bar': {
        backgroundColor: getColorValue(color, 400),
      },
      '& .MuiLinearProgress-bar1Buffer': {
        backgroundColor: getColorValue(color, 400),
      },
      '& .MuiLinearProgress-bar2Buffer': {
        backgroundColor: getColorValue(color, 200),
      },
      '& .MuiLinearProgress-dashed': {
        backgroundImage: `radial-gradient(${getColorValue(color, 200)} 0%, ${getColorValue(color, 200)} 16%, transparent 42%)`,
      },
    },
    outlined: {
      backgroundColor: 'transparent',
      border: `1px solid ${mainColor}`,
      '& .MuiLinearProgress-bar': {
        backgroundColor: mainColor,
      },
      '& .MuiLinearProgress-bar1Buffer': {
        backgroundColor: mainColor,
      },
      '& .MuiLinearProgress-bar2Buffer': {
        backgroundColor: lightColor,
      },
      '& .MuiLinearProgress-dashed': {
        backgroundImage: `radial-gradient(${mainColor} 0%, ${mainColor} 16%, transparent 42%)`,
      },
    },
    ghost: {
      backgroundColor: `${mainColor}15`,
      '& .MuiLinearProgress-bar': {
        backgroundColor: `${mainColor}60`,
      },
      '& .MuiLinearProgress-bar1Buffer': {
        backgroundColor: `${mainColor}60`,
      },
      '& .MuiLinearProgress-bar2Buffer': {
        backgroundColor: `${mainColor}30`,
      },
      '& .MuiLinearProgress-dashed': {
        backgroundImage: `radial-gradient(${mainColor}40 0%, ${mainColor}40 16%, transparent 42%)`,
      },
    },
    plain: {
      backgroundColor: colors.neutral[200],
      '& .MuiLinearProgress-bar': {
        backgroundColor: darkColor,
      },
      '& .MuiLinearProgress-bar1Buffer': {
        backgroundColor: darkColor,
      },
      '& .MuiLinearProgress-bar2Buffer': {
        backgroundColor: colors.neutral[300],
      },
      '& .MuiLinearProgress-dashed': {
        backgroundImage: `radial-gradient(${colors.neutral[400]} 0%, ${colors.neutral[400]} 16%, transparent 42%)`,
      },
    },
  };

  return variants[variant];
};

// ─────────────────────────────────────────────────────────────────────────────
// Circular Progress Variants
// ─────────────────────────────────────────────────────────────────────────────

const getCircularVariantStyles = (variant: ProgressVariant, color: ProgressColor) => {
  const mainColor = getColorValue(color, 500);
  const lightColor = getColorValue(color, 300);
  const darkColor = getColorValue(color, 700);

  const variants: Record<ProgressVariant, Record<string, unknown>> = {
    solid: {
      color: mainColor,
      '& .MuiCircularProgress-circle': {
        stroke: mainColor,
      },
    },
    soft: {
      color: lightColor,
      '& .MuiCircularProgress-circle': {
        stroke: lightColor,
      },
    },
    outlined: {
      color: mainColor,
      '& .MuiCircularProgress-circle': {
        stroke: mainColor,
        strokeLinecap: 'round',
      },
    },
    ghost: {
      color: `${mainColor}60`,
      '& .MuiCircularProgress-circle': {
        stroke: `${mainColor}60`,
      },
    },
    plain: {
      color: darkColor,
      '& .MuiCircularProgress-circle': {
        stroke: darkColor,
      },
    },
  };

  return variants[variant];
};

// ─────────────────────────────────────────────────────────────────────────────
// Styled Components
// ─────────────────────────────────────────────────────────────────────────────

const StyledLinearProgress = styled(MuiLinearProgress, {
  shouldForwardProp: (prop) =>
    !['$variant', '$color', '$size', '$rounded', '$height'].includes(prop as string),
})<StyledLinearProgressProps>(({ $variant, $color, $size, $rounded, $height }) => {
  const sizeStyles = linearSizeConfig[$size];
  const height = $height ?? sizeStyles.height;

  return {
    height,
    borderRadius: $rounded ? height / 2 : sizeStyles.borderRadius,
    transition: `all ${transitions.smooth}`,
    overflow: 'hidden',
    '& .MuiLinearProgress-bar': {
      borderRadius: $rounded ? height / 2 : 'inherit',
      transition: `transform ${transitions.smooth}`,
    },
    ...getLinearVariantStyles($variant, $color),
  };
});

const StyledCircularProgress = styled(MuiCircularProgress, {
  shouldForwardProp: (prop) => !['$variant', '$color'].includes(prop as string),
})<StyledCircularProgressProps>(({ $variant, $color }) => ({
  transition: `all ${transitions.smooth}`,
  ...getCircularVariantStyles($variant, $color),
}));

const CircularProgressWithLabel = styled(Box)({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const CircularProgressLabel = styled(Typography)({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const CircularTrack = styled('svg')<{ $color: ProgressColor; $variant: ProgressVariant }>(({
  $color,
  $variant,
}) => {
  const mainColor = getColorValue($color, 500);
  let trackColor: string;

  switch ($variant) {
    case 'solid':
      trackColor = getColorValue($color, 200);
      break;
    case 'soft':
      trackColor = getColorValue($color, 100);
      break;
    case 'outlined':
      trackColor = `${mainColor}20`;
      break;
    case 'ghost':
      trackColor = `${mainColor}15`;
      break;
    case 'plain':
      trackColor = colors.neutral[200];
      break;
    default:
      trackColor = getColorValue($color, 200);
  }

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    '& circle': {
      stroke: trackColor,
      fill: 'none',
    },
  };
});

const LinearProgressWrapper = styled(Box)<{ $labelPosition: 'end' | 'top' | 'bottom' }>(
  ({ $labelPosition }) => ({
    display: 'flex',
    flexDirection: $labelPosition === 'end' ? 'row' : 'column',
    alignItems: $labelPosition === 'end' ? 'center' : 'stretch',
    gap: $labelPosition === 'end' ? '8px' : '4px',
    width: '100%',
    ...($labelPosition === 'bottom' && {
      flexDirection: 'column-reverse',
    }),
  })
);

const LinearProgressLabel = styled(Typography)({
  flexShrink: 0,
  minWidth: '40px',
  textAlign: 'right',
});

// ─────────────────────────────────────────────────────────────────────────────
// Component Implementation
// ─────────────────────────────────────────────────────────────────────────────

const LinearProgress = React.forwardRef<HTMLSpanElement, LinearProgressProps>((props, ref) => {
  const {
    variant = 'solid',
    color = 'primary',
    size = 'md',
    value,
    indeterminate = false,
    showLabel = false,
    labelPosition = 'end',
    formatLabel = (v) => `${Math.round(v)}%`,
    bufferValue,
    height,
    rounded = true,
    className,
    ...rest
  } = props;

  const normalizedValue = clampProgress(value ?? 0);
  const muiVariant = indeterminate
    ? 'indeterminate'
    : bufferValue !== undefined
      ? 'buffer'
      : 'determinate';

  const progressState = calculateProgressState(value, bufferValue, indeterminate, formatLabel);

  const ariaProps = getProgressAriaProps(progressState);
  const sizeConfig = linearSizeConfig[size];

  const progressBar = (
    <StyledLinearProgress
      ref={ref}
      variant={muiVariant}
      value={normalizedValue}
      valueBuffer={bufferValue}
      $variant={variant}
      $color={color}
      $size={size}
      $rounded={rounded}
      $height={height}
      className={className}
      {...ariaProps}
      {...(rest as MuiLinearProgressProps)}
    />
  );

  if (showLabel && !indeterminate) {
    return (
      <LinearProgressWrapper $labelPosition={labelPosition}>
        {labelPosition === 'top' && (
          <LinearProgressLabel
            variant="body2"
            sx={{ fontSize: sizeConfig.fontSize, textAlign: 'left' }}
          >
            {formatLabel(normalizedValue)}
          </LinearProgressLabel>
        )}
        <Box sx={{ flexGrow: 1, width: '100%' }}>{progressBar}</Box>
        {labelPosition === 'end' && (
          <LinearProgressLabel variant="body2" sx={{ fontSize: sizeConfig.fontSize }}>
            {formatLabel(normalizedValue)}
          </LinearProgressLabel>
        )}
        {labelPosition === 'bottom' && (
          <LinearProgressLabel
            variant="body2"
            sx={{ fontSize: sizeConfig.fontSize, textAlign: 'left' }}
          >
            {formatLabel(normalizedValue)}
          </LinearProgressLabel>
        )}
      </LinearProgressWrapper>
    );
  }

  return progressBar;
});

LinearProgress.displayName = 'LinearProgress';

const CircularProgress = React.forwardRef<HTMLSpanElement, CircularProgressProps>((props, ref) => {
  const {
    type: _type,
    variant = 'solid',
    color = 'primary',
    size = 'md',
    value,
    indeterminate = false,
    showLabel = false,
    formatLabel = (v) => `${Math.round(v)}%`,
    thickness,
    circleSize,
    className,
    ...rest
  } = props;

  const normalizedValue = clampProgress(value ?? 0);
  const sizeConfig = circularSizeConfig[size];
  const actualSize = circleSize ?? sizeConfig.size;
  const actualThickness = thickness ?? sizeConfig.thickness;
  const trackRadius = (actualSize - actualThickness) / 2;

  const progressState = calculateProgressState(value, undefined, indeterminate, formatLabel);

  const ariaProps = getProgressAriaProps(progressState);

  const circularProgress = (
    <StyledCircularProgress
      ref={ref}
      variant={indeterminate ? 'indeterminate' : 'determinate'}
      value={normalizedValue}
      size={actualSize}
      thickness={actualThickness}
      $variant={variant}
      $color={color}
      className={className}
      {...ariaProps}
      {...(rest as MuiCircularProgressProps)}
    />
  );

  if (showLabel && !indeterminate) {
    return (
      <CircularProgressWithLabel>
        {/* Track circle */}
        <CircularTrack
          width={actualSize}
          height={actualSize}
          viewBox={`0 0 ${actualSize} ${actualSize}`}
          $color={color}
          $variant={variant}
        >
          <circle
            cx={actualSize / 2}
            cy={actualSize / 2}
            r={trackRadius}
            strokeWidth={actualThickness}
          />
        </CircularTrack>
        {circularProgress}
        <CircularProgressLabel variant="caption" sx={{ fontSize: sizeConfig.fontSize }}>
          {formatLabel(normalizedValue)}
        </CircularProgressLabel>
      </CircularProgressWithLabel>
    );
  }

  // Add track for determinate without label too
  if (!indeterminate) {
    return (
      <CircularProgressWithLabel>
        <CircularTrack
          width={actualSize}
          height={actualSize}
          viewBox={`0 0 ${actualSize} ${actualSize}`}
          $color={color}
          $variant={variant}
        >
          <circle
            cx={actualSize / 2}
            cy={actualSize / 2}
            r={trackRadius}
            strokeWidth={actualThickness}
          />
        </CircularTrack>
        {circularProgress}
      </CircularProgressWithLabel>
    );
  }

  return circularProgress;
});

CircularProgress.displayName = 'CircularProgress';

// ─────────────────────────────────────────────────────────────────────────────
// Main Progress Component
// ─────────────────────────────────────────────────────────────────────────────

export const Progress = React.forwardRef<HTMLSpanElement, ProgressProps>((props, ref) => {
  if (props.type === 'circular') {
    return <CircularProgress ref={ref} {...props} />;
  }
  return <LinearProgress ref={ref} {...(props as LinearProgressProps)} />;
});

Progress.displayName = 'Progress';

export default Progress;
