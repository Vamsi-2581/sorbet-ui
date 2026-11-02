import { Box, Tab as MuiTab, Tabs as MuiTabs, TabsProps as MuiTabsProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors, colorScaleForMode, radius, transitions, typography } from '@sorbet-ui/tokens';
import * as React from 'react';

// =============================================================================
// TYPES
// =============================================================================

type SorbetVariant = 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
type SorbetColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type SorbetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface TabItem {
  /** Unique identifier */
  id: string;
  /** Tab label */
  label: string;
  /** Tab icon */
  icon?: React.ReactNode;
  /** Whether tab is disabled */
  disabled?: boolean;
  /** Panel content */
  content?: React.ReactNode;
}

export interface TabsProps extends Omit<MuiTabsProps, 'variant' | 'onChange' | 'value'> {
  /** Tab items */
  tabs: TabItem[];
  /** Currently selected tab ID */
  value?: string;
  /** Default selected tab ID (uncontrolled) */
  defaultValue?: string;
  /** Visual variant */
  variant?: SorbetVariant;
  /** Color scheme */
  color?: SorbetColor;
  /** Size preset */
  size?: SorbetSize;
  /** Tab orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Tab change handler */
  onChange?: (tabId: string) => void;
  /** Whether tabs should fill container width */
  fullWidth?: boolean;
  /** Tab alignment */
  centered?: boolean;
  /** Show indicator */
  showIndicator?: boolean;
  /** Render tab panels */
  renderPanels?: boolean;
  /** Custom ARIA label */
  'aria-label'?: string;
}

// =============================================================================
// SIZE CONFIG
// =============================================================================

const sizeConfig = {
  xs: { padding: '4px 12px', fontSize: 11, minHeight: 28, iconSize: 14 },
  sm: { padding: '6px 16px', fontSize: 12, minHeight: 32, iconSize: 16 },
  md: { padding: '10px 20px', fontSize: 14, minHeight: 40, iconSize: 18 },
  lg: { padding: '12px 24px', fontSize: 15, minHeight: 48, iconSize: 20 },
  xl: { padding: '16px 32px', fontSize: 16, minHeight: 56, iconSize: 24 },
};

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

interface StyledProps {
  $variant: SorbetVariant;
  $color: SorbetColor;
  $size: SorbetSize;
  $showIndicator?: boolean;
}

const TabsContainer = styled(Box)({
  width: '100%',
});

const StyledTabs = styled(MuiTabs, {
  shouldForwardProp: (prop) =>
    !['$variant', '$color', '$size', '$showIndicator'].includes(prop as string),
})<StyledProps>(({ theme, $variant, $color, $size, $showIndicator, orientation }) => {
  const colorScale = colorScaleForMode($color, theme.palette.mode === 'dark');
  const neutralScale = colors.neutral;
  const isDark = theme.palette.mode === 'dark';
  const size = sizeConfig[$size];
  const isVertical = orientation === 'vertical';

  const getContainerStyles = () => {
    switch ($variant) {
      case 'solid':
        return {
          backgroundColor: isDark ? neutralScale[800] : neutralScale[100],
          borderRadius: radius.lg,
          padding: '4px',
        };
      case 'soft':
        return {
          backgroundColor: isDark ? colorScale.alpha8 : colorScale.alpha12,
          borderRadius: radius.lg,
          padding: '4px',
        };
      case 'outlined':
        return {
          borderBottom: isVertical
            ? 'none'
            : `2px solid ${isDark ? neutralScale[700] : neutralScale[200]}`,
          borderRight: isVertical
            ? `2px solid ${isDark ? neutralScale[700] : neutralScale[200]}`
            : 'none',
        };
      case 'ghost':
        return {
          borderBottom: isVertical
            ? 'none'
            : `1px solid ${isDark ? neutralScale[700] : neutralScale[300]}`,
          borderRight: isVertical
            ? `1px solid ${isDark ? neutralScale[700] : neutralScale[300]}`
            : 'none',
        };
      case 'plain':
        return {};
      default:
        return {};
    }
  };

  const getIndicatorStyles = () => {
    if (!$showIndicator) {
      return { display: 'none' };
    }

    switch ($variant) {
      case 'solid':
      case 'soft':
        return { display: 'none' };
      case 'outlined':
        return {
          backgroundColor: colorScale.main,
          height: isVertical ? 'auto' : '2px',
          width: isVertical ? '2px' : 'auto',
          bottom: isVertical ? 'auto' : 0,
          right: isVertical ? 0 : 'auto',
        };
      case 'ghost':
      case 'plain':
        return {
          backgroundColor: colorScale.main,
          height: isVertical ? 'auto' : '2px',
          width: isVertical ? '2px' : 'auto',
        };
      default:
        return {};
    }
  };

  return {
    minHeight: size.minHeight,
    ...getContainerStyles(),
    '& .MuiTabs-indicator': {
      transition: transitions.smooth,
      ...getIndicatorStyles(),
    },
    '& .MuiTabs-flexContainer': {
      gap: $variant === 'solid' || $variant === 'soft' ? '4px' : 0,
    },
  };
});

const StyledTab = styled(MuiTab, {
  shouldForwardProp: (prop) => !['$variant', '$color', '$size'].includes(prop as string),
})<StyledProps>(({ theme, $variant, $color, $size }) => {
  const colorScale = colorScaleForMode($color, theme.palette.mode === 'dark');
  const neutralScale = colors.neutral;
  const isDark = theme.palette.mode === 'dark';
  const size = sizeConfig[$size];

  const getTabStyles = () => {
    const baseStyles = {
      color: isDark ? neutralScale[400] : neutralScale[600],
      '&:hover': {
        color: isDark ? neutralScale[200] : neutralScale[800],
      },
      '&.Mui-selected': {
        color: colorScale.main,
      },
    };

    switch ($variant) {
      case 'solid':
        return {
          ...baseStyles,
          borderRadius: radius.md,
          '&.Mui-selected': {
            backgroundColor: colorScale.main,
            color: colorScale.contrastText,
            boxShadow: `0 1px 3px ${colors.neutral.alpha20}`,
          },
          '&:hover:not(.Mui-selected)': {
            backgroundColor: isDark ? neutralScale[700] : neutralScale[200],
          },
        };
      case 'soft':
        return {
          ...baseStyles,
          borderRadius: radius.md,
          '&.Mui-selected': {
            backgroundColor: isDark ? colorScale.alpha30 : colorScale.alpha20,
            color: isDark ? colorScale.light : colorScale.dark,
          },
          '&:hover:not(.Mui-selected)': {
            backgroundColor: isDark ? colorScale.alpha16 : colorScale.alpha8,
          },
        };
      case 'outlined':
        return {
          ...baseStyles,
          '&.Mui-selected': {
            color: colorScale.main,
          },
        };
      case 'ghost':
        return {
          ...baseStyles,
          '&:hover': {
            backgroundColor: isDark ? neutralScale[800] : neutralScale[100],
          },
          '&.Mui-selected': {
            color: colorScale.main,
            backgroundColor: isDark ? colorScale.alpha12 : colorScale.alpha8,
          },
        };
      case 'plain':
        return {
          ...baseStyles,
          '&:hover': {
            color: colorScale.main,
          },
        };
      default:
        return baseStyles;
    }
  };

  return {
    textTransform: 'none',
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.sans,
    fontSize: size.fontSize,
    padding: size.padding,
    minHeight: size.minHeight,
    minWidth: 'auto',
    transition: transitions.smooth,
    '&.Mui-disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 3px ${colorScale.alpha40}`,
      borderRadius: radius.md,
    },
    '& .MuiTab-iconWrapper': {
      fontSize: size.iconSize,
      marginBottom: 0,
    },
    ...getTabStyles(),
  };
});

const TabPanel = styled(Box)(() => ({
  padding: '16px 0',
  '&[hidden]': {
    display: 'none',
  },
}));

// =============================================================================
// COMPONENT
// =============================================================================

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      value,
      defaultValue,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      orientation = 'horizontal',
      onChange,
      fullWidth = false,
      centered = false,
      showIndicator = true,
      renderPanels = true,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? tabs[0]?.id ?? '');

    const currentValue = value ?? internalValue;

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
      if (!value) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const tabsId = React.useId();

    return (
      <TabsContainer
        ref={ref}
        sx={{
          display: orientation === 'vertical' ? 'flex' : 'block',
        }}
      >
        <StyledTabs
          value={currentValue}
          onChange={handleChange}
          orientation={orientation}
          $variant={variant}
          $color={color}
          $size={size}
          $showIndicator={showIndicator}
          variant={fullWidth ? 'fullWidth' : 'standard'}
          centered={centered}
          aria-label={ariaLabel}
          {...rest}
        >
          {tabs.map((tab) => (
            <StyledTab
              key={tab.id}
              value={tab.id}
              label={tab.label}
              icon={tab.icon as React.ReactElement}
              iconPosition="start"
              disabled={tab.disabled}
              $variant={variant}
              $color={color}
              $size={size}
              id={`${tabsId}-tab-${tab.id}`}
              aria-controls={`${tabsId}-panel-${tab.id}`}
            />
          ))}
        </StyledTabs>

        {renderPanels && (
          <Box sx={{ flex: 1 }}>
            {tabs.map((tab) => (
              <TabPanel
                key={tab.id}
                role="tabpanel"
                hidden={currentValue !== tab.id}
                id={`${tabsId}-panel-${tab.id}`}
                aria-labelledby={`${tabsId}-tab-${tab.id}`}
                tabIndex={0}
              >
                {currentValue === tab.id && tab.content}
              </TabPanel>
            ))}
          </Box>
        )}
      </TabsContainer>
    );
  }
);

Tabs.displayName = 'Tabs';
