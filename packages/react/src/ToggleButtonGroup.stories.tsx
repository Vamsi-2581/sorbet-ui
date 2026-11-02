import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import LaptopIcon from '@mui/icons-material/Laptop';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TvIcon from '@mui/icons-material/Tv';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import type {
  ToggleButtonGroupColor,
  ToggleButtonGroupSize,
  ToggleButtonGroupVariant,
} from './ToggleButtonGroup';
import { ToggleButton, ToggleButtonGroup } from './ToggleButtonGroup';

const meta: Meta<typeof ToggleButtonGroup> = {
  title: 'Molecules/ToggleButtonGroup',
  component: ToggleButtonGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ToggleButtonGroup allows users to select one or multiple options from a set. Sorbet UI extends MUI ToggleButtonGroup with 5 visual variants.

## Features
- **5 Variants**: solid, soft, outlined, ghost, plain
- **7 Colors**: primary, secondary, success, warning, error, info, neutral
- **5 Sizes**: xs, sm, md, lg, xl
- **Exclusive mode**: Single selection only
- **Multi-select**: Allow multiple selections
- **Orientation**: Horizontal or vertical layout
- **Full width**: Buttons expand to fill container
- **Gap control**: Space between buttons
- **Accessible**: Full ARIA support
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outlined', 'ghost', 'plain'],
      description: 'Visual style variant',
      table: { defaultValue: { summary: 'solid' } },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
      description: 'Color theme',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size preset',
      table: { defaultValue: { summary: 'md' } },
    },
    exclusive: {
      control: 'boolean',
      description: 'Only allow one selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all buttons',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Buttons expand to fill container',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Button layout direction',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleButtonGroup>;

// ─────────────────────────────────────────────────────────────────────────────
// Default Story
// ─────────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: function DefaultDemo() {
    const [alignment, setAlignment] = React.useState<string | null>('left');

    return (
      <ToggleButtonGroup value={alignment} exclusive onChange={(_, value) => setAlignment(value)}>
        <ToggleButton value="left">
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton value="center">
          <FormatAlignCenterIcon />
        </ToggleButton>
        <ToggleButton value="right">
          <FormatAlignRightIcon />
        </ToggleButton>
        <ToggleButton value="justify">
          <FormatAlignJustifyIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Variants
// ─────────────────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => {
    const variants: ToggleButtonGroupVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];

    return (
      <Stack spacing={3}>
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography
              variant="caption"
              sx={{ mb: 1, display: 'block', textTransform: 'capitalize' }}
            >
              {variant}
            </Typography>
            <ToggleButtonGroup variant={variant} value="center" exclusive>
              <ToggleButton value="left">
                <FormatAlignLeftIcon />
              </ToggleButton>
              <ToggleButton value="center">
                <FormatAlignCenterIcon />
              </ToggleButton>
              <ToggleButton value="right">
                <FormatAlignRightIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        ))}
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Colors
// ─────────────────────────────────────────────────────────────────────────────

export const AllColors: Story = {
  name: 'All Colors',
  render: () => {
    const colors: ToggleButtonGroupColor[] = [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
      'neutral',
    ];

    return (
      <Stack spacing={3}>
        {colors.map((color) => (
          <Box key={color}>
            <Typography
              variant="caption"
              sx={{ mb: 1, display: 'block', textTransform: 'capitalize' }}
            >
              {color}
            </Typography>
            <ToggleButtonGroup color={color} value="center" exclusive>
              <ToggleButton value="left">
                <FormatAlignLeftIcon />
              </ToggleButton>
              <ToggleButton value="center">
                <FormatAlignCenterIcon />
              </ToggleButton>
              <ToggleButton value="right">
                <FormatAlignRightIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        ))}
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Sizes
// ─────────────────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => {
    const sizes: ToggleButtonGroupSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

    return (
      <Stack spacing={4}>
        {sizes.map((size) => (
          <Box key={size}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Size: {size}
            </Typography>
            <ToggleButtonGroup size={size} value="center" exclusive>
              <ToggleButton value="left">
                <FormatAlignLeftIcon />
              </ToggleButton>
              <ToggleButton value="center">
                <FormatAlignCenterIcon />
              </ToggleButton>
              <ToggleButton value="right">
                <FormatAlignRightIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        ))}
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// With Text
// ─────────────────────────────────────────────────────────────────────────────

export const WithText: Story = {
  name: 'With Text Labels',
  render: function WithTextDemo() {
    const [view, setView] = React.useState('day');

    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Calendar View
          </Typography>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, value) => value && setView(value)}
          >
            <ToggleButton value="day">Day</ToggleButton>
            <ToggleButton value="week">Week</ToggleButton>
            <ToggleButton value="month">Month</ToggleButton>
            <ToggleButton value="year">Year</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Text with Icons
          </Typography>
          <ToggleButtonGroup value="list" exclusive variant="outlined">
            <ToggleButton value="list">
              <ViewListIcon sx={{ mr: 1 }} />
              List
            </ToggleButton>
            <ToggleButton value="module">
              <ViewModuleIcon sx={{ mr: 1 }} />
              Grid
            </ToggleButton>
            <ToggleButton value="quilt">
              <ViewQuiltIcon sx={{ mr: 1 }} />
              Quilt
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Multiple Selection
// ─────────────────────────────────────────────────────────────────────────────

export const MultipleSelection: Story = {
  name: 'Multiple Selection',
  render: function MultipleSelectionDemo() {
    const [formats, setFormats] = React.useState<string[]>(['bold']);

    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Text Formatting (Multi-select)
          </Typography>
          <ToggleButtonGroup value={formats} onChange={(_, value) => setFormats(value)}>
            <ToggleButton value="bold">
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic">
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underlined">
              <FormatUnderlinedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            Selected: {formats.length > 0 ? formats.join(', ') : 'none'}
          </Typography>
        </Box>
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Vertical Orientation
// ─────────────────────────────────────────────────────────────────────────────

export const VerticalOrientation: Story = {
  name: 'Vertical Orientation',
  render: () => {
    const variants: ToggleButtonGroupVariant[] = ['solid', 'soft', 'outlined'];

    return (
      <Stack direction="row" spacing={6}>
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography
              variant="caption"
              sx={{ mb: 1, display: 'block', textTransform: 'capitalize' }}
            >
              {variant}
            </Typography>
            <ToggleButtonGroup variant={variant} orientation="vertical" value="list" exclusive>
              <ToggleButton value="list">
                <ViewListIcon />
              </ToggleButton>
              <ToggleButton value="module">
                <ViewModuleIcon />
              </ToggleButton>
              <ToggleButton value="quilt">
                <ViewQuiltIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        ))}
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Full Width
// ─────────────────────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  name: 'Full Width',
  render: function FullWidthDemo() {
    const [plan, setPlan] = React.useState('monthly');

    return (
      <Box sx={{ width: 400 }}>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Billing Period
        </Typography>
        <ToggleButtonGroup
          value={plan}
          exclusive
          onChange={(_, value) => value && setPlan(value)}
          fullWidth
        >
          <ToggleButton value="monthly">Monthly</ToggleButton>
          <ToggleButton value="yearly">Yearly</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// With Gap
// ─────────────────────────────────────────────────────────────────────────────

export const WithGap: Story = {
  name: 'With Gap Between Buttons',
  render: () => {
    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Gap: 0 (default)
          </Typography>
          <ToggleButtonGroup gap={0} value="center" exclusive>
            <ToggleButton value="left">Left</ToggleButton>
            <ToggleButton value="center">Center</ToggleButton>
            <ToggleButton value="right">Right</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Gap: 8px
          </Typography>
          <ToggleButtonGroup gap={8} value="center" exclusive>
            <ToggleButton value="left">Left</ToggleButton>
            <ToggleButton value="center">Center</ToggleButton>
            <ToggleButton value="right">Right</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Gap: 16px (soft variant)
          </Typography>
          <ToggleButtonGroup gap={16} variant="soft" value="center" exclusive>
            <ToggleButton value="left">Left</ToggleButton>
            <ToggleButton value="center">Center</ToggleButton>
            <ToggleButton value="right">Right</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Disabled State
// ─────────────────────────────────────────────────────────────────────────────

export const DisabledState: Story = {
  name: 'Disabled State',
  render: () => {
    const variants: ToggleButtonGroupVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];

    return (
      <Stack spacing={3}>
        <Typography variant="h6">Group Disabled</Typography>
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography
              variant="caption"
              sx={{ mb: 1, display: 'block', textTransform: 'capitalize' }}
            >
              {variant}
            </Typography>
            <ToggleButtonGroup variant={variant} value="center" exclusive disabled>
              <ToggleButton value="left">
                <FormatAlignLeftIcon />
              </ToggleButton>
              <ToggleButton value="center">
                <FormatAlignCenterIcon />
              </ToggleButton>
              <ToggleButton value="right">
                <FormatAlignRightIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        ))}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Individual Button Disabled
        </Typography>
        <ToggleButtonGroup value="left" exclusive>
          <ToggleButton value="left">
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center" disabled>
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="right">
            <FormatAlignRightIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Variant Showcase
// ─────────────────────────────────────────────────────────────────────────────

export const VariantShowcase: Story = {
  name: 'Variant × Color Matrix',
  render: () => {
    const variants: ToggleButtonGroupVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];
    const colors: ToggleButtonGroupColor[] = ['primary', 'secondary', 'success', 'danger'];

    return (
      <Stack spacing={4}>
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography variant="subtitle2" sx={{ mb: 2, textTransform: 'capitalize' }}>
              {variant}
            </Typography>
            <Stack direction="row" spacing={3} flexWrap="wrap">
              {colors.map((color) => (
                <Box key={`${variant}-${color}`}>
                  <ToggleButtonGroup variant={variant} color={color} value="b" exclusive size="sm">
                    <ToggleButton value="a">A</ToggleButton>
                    <ToggleButton value="b">B</ToggleButton>
                    <ToggleButton value="c">C</ToggleButton>
                  </ToggleButtonGroup>
                  <Typography
                    variant="caption"
                    sx={{ display: 'block', textTransform: 'capitalize', mt: 0.5 }}
                  >
                    {color}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Demo
// ─────────────────────────────────────────────────────────────────────────────

export const InteractiveDemo: Story = {
  name: 'Interactive Demo',
  render: function InteractiveToggleDemo() {
    const [device, setDevice] = React.useState('laptop');
    const [view, setView] = React.useState('list');

    return (
      <Stack spacing={4}>
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Device Selection
          </Typography>
          <ToggleButtonGroup
            value={device}
            exclusive
            onChange={(_, value) => value && setDevice(value)}
            color="info"
          >
            <ToggleButton value="phone">
              <PhoneAndroidIcon sx={{ mr: 1 }} />
              Phone
            </ToggleButton>
            <ToggleButton value="laptop">
              <LaptopIcon sx={{ mr: 1 }} />
              Laptop
            </ToggleButton>
            <ToggleButton value="tv">
              <TvIcon sx={{ mr: 1 }} />
              TV
            </ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Selected: {device}
          </Typography>
        </Box>

        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            View Toggle
          </Typography>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, value) => value && setView(value)}
            variant="outlined"
          >
            <ToggleButton value="list">
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="grid">
              <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Current view: {view}
          </Typography>
        </Box>
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Dark Mode
// ─────────────────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => {
    const variants: ToggleButtonGroupVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];

    return (
      <Box sx={{ p: 4, backgroundColor: '#1a1a2e', borderRadius: 2 }}>
        <Stack spacing={4}>
          <Typography variant="h6" sx={{ color: 'white' }}>
            ToggleButtonGroup (Dark Mode)
          </Typography>
          {variants.map((variant) => (
            <Box key={variant}>
              <Typography
                variant="caption"
                sx={{
                  mb: 1,
                  display: 'block',
                  textTransform: 'capitalize',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {variant}
              </Typography>
              <ToggleButtonGroup variant={variant} value="center" exclusive>
                <ToggleButton value="left">
                  <FormatAlignLeftIcon />
                </ToggleButton>
                <ToggleButton value="center">
                  <FormatAlignCenterIcon />
                </ToggleButton>
                <ToggleButton value="right">
                  <FormatAlignRightIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          ))}
        </Stack>
      </Box>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Real-World Examples
// ─────────────────────────────────────────────────────────────────────────────

export const RealWorldExamples: Story = {
  name: 'Real World Examples',
  render: function RealWorldExamplesDemo() {
    const [textAlign, setTextAlign] = React.useState('left');
    const [fontSize, setFontSize] = React.useState('md');

    return (
      <Stack spacing={6}>
        {/* Text Editor Toolbar */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Text Editor Toolbar
          </Typography>
          <Stack direction="row" spacing={2}>
            <ToggleButtonGroup value={[]} size="sm">
              <ToggleButton value="bold">
                <FormatBoldIcon />
              </ToggleButton>
              <ToggleButton value="italic">
                <FormatItalicIcon />
              </ToggleButton>
              <ToggleButton value="underlined">
                <FormatUnderlinedIcon />
              </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              value={textAlign}
              exclusive
              onChange={(_, v) => v && setTextAlign(v)}
              size="sm"
            >
              <ToggleButton value="left">
                <FormatAlignLeftIcon />
              </ToggleButton>
              <ToggleButton value="center">
                <FormatAlignCenterIcon />
              </ToggleButton>
              <ToggleButton value="right">
                <FormatAlignRightIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Box>

        {/* Size Selector */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Font Size
          </Typography>
          <ToggleButtonGroup
            value={fontSize}
            exclusive
            onChange={(_, v) => v && setFontSize(v)}
            variant="outlined"
            gap={8}
          >
            <ToggleButton value="sm">Small</ToggleButton>
            <ToggleButton value="md">Medium</ToggleButton>
            <ToggleButton value="lg">Large</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Pricing Toggle */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, maxWidth: 300 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Billing
          </Typography>
          <ToggleButtonGroup value="monthly" exclusive fullWidth variant="soft" color="success">
            <ToggleButton value="monthly">Monthly</ToggleButton>
            <ToggleButton value="yearly">
              Yearly
              <Typography component="span" variant="caption" sx={{ ml: 1, color: 'success.main' }}>
                -20%
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Stack>
    );
  },
};
