import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import type { SliderColor, SliderSize, SliderVariant } from './Slider';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Sliders allow users to select values from a continuous or discrete range. Sorbet UI extends MUI Slider with 5 visual variants.

## Features
- **5 Variants**: solid, soft, outlined, ghost, plain
- **7 Colors**: primary, secondary, success, warning, error, info, neutral
- **5 Sizes**: xs, sm, md, lg, xl
- **Range support**: Single value or range selection
- **Marks & labels**: Custom marks with optional labels
- **Value display**: Show current value with custom formatting
- **Accessible**: Full keyboard navigation and ARIA support
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
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
    showValue: {
      control: 'boolean',
      description: 'Show value label',
    },
    showMinMax: {
      control: 'boolean',
      description: 'Show min/max labels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

// ─────────────────────────────────────────────────────────────────────────────
// Default Story
// ─────────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    defaultValue: 50,
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
  render: (args) => (
    <Box sx={{ width: 300 }}>
      <Slider {...args} />
    </Box>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Variants
// ─────────────────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => {
    const variants: SliderVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];

    return (
      <Stack spacing={4} sx={{ width: 400 }}>
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography
              variant="caption"
              sx={{ mb: 1, display: 'block', textTransform: 'capitalize' }}
            >
              {variant}
            </Typography>
            <Slider variant={variant} defaultValue={60} />
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
    const colors: SliderColor[] = [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
      'neutral',
    ];

    return (
      <Stack spacing={3} sx={{ width: 400 }}>
        {colors.map((color) => (
          <Box key={color}>
            <Typography
              variant="caption"
              sx={{ mb: 0.5, display: 'block', textTransform: 'capitalize' }}
            >
              {color}
            </Typography>
            <Slider color={color} defaultValue={65} />
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
    const sizes: SliderSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

    return (
      <Stack spacing={4} sx={{ width: 400 }}>
        {sizes.map((size) => (
          <Box key={size}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Size: {size}
            </Typography>
            <Slider size={size} defaultValue={50} />
          </Box>
        ))}
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// With Value Label
// ─────────────────────────────────────────────────────────────────────────────

export const WithValueLabel: Story = {
  name: 'With Value Label',
  render: () => {
    return (
      <Stack spacing={4} sx={{ width: 400 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Value Label on Hover
          </Typography>
          <Slider defaultValue={30} showValue valueLabelPosition="top" />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Value Label at End
          </Typography>
          <Slider defaultValue={50} showValue valueLabelPosition="bottom" />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Custom Format (Temperature)
          </Typography>
          <Slider
            defaultValue={72}
            min={32}
            max={100}
            showValue
            valueLabelPosition="bottom"
            formatValue={(v) => `${v}°F`}
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            With Min/Max Labels
          </Typography>
          <Slider defaultValue={40} showMinMax />
        </Box>
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Range Slider
// ─────────────────────────────────────────────────────────────────────────────

export const RangeSlider: Story = {
  name: 'Range Slider',
  render: () => {
    return (
      <Stack spacing={4} sx={{ width: 400 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Price Range
          </Typography>
          <Slider defaultValue={[20, 80]} showValue formatValue={(v) => `$${v}`} />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Date Range
          </Typography>
          <Slider
            defaultValue={[2020, 2024]}
            min={2000}
            max={2030}
            showValue
            valueLabelPosition="bottom"
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Soft Variant Range
          </Typography>
          <Slider variant="soft" color="success" defaultValue={[30, 70]} showValue />
        </Box>
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// With Marks
// ─────────────────────────────────────────────────────────────────────────────

export const WithMarks: Story = {
  name: 'With Marks',
  render: () => {
    const marks = [
      { value: 0, label: '0°C' },
      { value: 20, label: '20°C' },
      { value: 37, label: '37°C' },
      { value: 100, label: '100°C' },
    ];

    const stepMarks = [{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }];

    return (
      <Stack spacing={5} sx={{ width: 400 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 3 }}>
            With Labels
          </Typography>
          <Slider defaultValue={37} marks={marks} min={0} max={100} />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 3 }}>
            Step Marks
          </Typography>
          <Slider defaultValue={50} marks={stepMarks} step={25} />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 3 }}>
            Auto Marks (step=10)
          </Typography>
          <Slider defaultValue={30} marks step={10} />
        </Box>
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Discrete Slider
// ─────────────────────────────────────────────────────────────────────────────

export const DiscreteSlider: Story = {
  name: 'Discrete Slider',
  render: () => {
    const ratingMarks = [
      { value: 1, label: 'Poor' },
      { value: 2, label: 'Fair' },
      { value: 3, label: 'Good' },
      { value: 4, label: 'Great' },
      { value: 5, label: 'Excellent' },
    ];

    return (
      <Stack spacing={5} sx={{ width: 400 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 3 }}>
            Rating
          </Typography>
          <Slider defaultValue={3} min={1} max={5} step={1} marks={ratingMarks} showValue />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Volume (step=10)
          </Typography>
          <Slider defaultValue={50} step={10} marks showValue valueLabelPosition="bottom" />
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
    const variants: SliderVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];

    return (
      <Stack spacing={3} sx={{ width: 400 }}>
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography
              variant="caption"
              sx={{ mb: 1, display: 'block', textTransform: 'capitalize' }}
            >
              {variant} (disabled)
            </Typography>
            <Slider variant={variant} defaultValue={40} disabled />
          </Box>
        ))}
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
    const variants: SliderVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];
    const colors: SliderColor[] = ['primary', 'secondary', 'success', 'danger'];

    return (
      <Stack spacing={4}>
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography variant="subtitle2" sx={{ mb: 2, textTransform: 'capitalize' }}>
              {variant}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
              {colors.map((color) => (
                <Box key={`${variant}-${color}`}>
                  <Typography
                    variant="caption"
                    sx={{ mb: 1, display: 'block', textTransform: 'capitalize' }}
                  >
                    {color}
                  </Typography>
                  <Slider variant={variant} color={color} defaultValue={60} />
                </Box>
              ))}
            </Box>
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
  name: 'Interactive Volume Control',
  render: function InteractiveSliderDemo() {
    const [volume, setVolume] = React.useState(30);

    return (
      <Box sx={{ width: 300 }}>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Volume Control
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <VolumeDown />
          <Slider
            value={volume}
            onChange={(_, value) => setVolume(value as number)}
            showValue
            color={volume > 80 ? 'danger' : volume > 50 ? 'warning' : 'primary'}
          />
          <VolumeUp />
        </Stack>
      </Box>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Vertical Slider
// ─────────────────────────────────────────────────────────────────────────────

export const VerticalSlider: Story = {
  name: 'Vertical Slider',
  render: () => {
    const variants: SliderVariant[] = ['solid', 'soft', 'outlined'];

    return (
      <Stack direction="row" spacing={6} sx={{ height: 200 }}>
        {variants.map((variant) => (
          <Box key={variant} sx={{ textAlign: 'center' }}>
            <Slider variant={variant} orientation="vertical" defaultValue={50} showValue />
            <Typography
              variant="caption"
              sx={{ mt: 1, display: 'block', textTransform: 'capitalize' }}
            >
              {variant}
            </Typography>
          </Box>
        ))}
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
    const variants: SliderVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];

    return (
      <Box sx={{ p: 4, backgroundColor: '#1a1a2e', borderRadius: 2 }}>
        <Stack spacing={4} sx={{ width: 400 }}>
          <Typography variant="h6" sx={{ color: 'white' }}>
            Sliders (Dark Mode)
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
              <Slider variant={variant} defaultValue={55} />
            </Box>
          ))}
          <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>
            Range Slider
          </Typography>
          <Slider variant="solid" defaultValue={[30, 70]} showValue />
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
  render: () => {
    return (
      <Stack spacing={6}>
        {/* Price Filter */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, width: 400 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Price Filter
          </Typography>
          <Slider
            defaultValue={[100, 500]}
            min={0}
            max={1000}
            showValue
            valueLabelPosition="bottom"
            formatValue={(v) => `$${v}`}
            color="success"
          />
        </Box>

        {/* Brightness Control */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, width: 400 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Brightness
          </Typography>
          <Slider
            defaultValue={75}
            showValue
            valueLabelPosition="bottom"
            formatValue={(v) => `${v}%`}
            variant="soft"
            color="warning"
          />
        </Box>

        {/* Rating System */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, width: 400 }}>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Satisfaction Rating
          </Typography>
          <Slider
            defaultValue={4}
            min={1}
            max={5}
            step={1}
            marks={[
              { value: 1, label: '😞' },
              { value: 2, label: '😕' },
              { value: 3, label: '😐' },
              { value: 4, label: '🙂' },
              { value: 5, label: '😊' },
            ]}
            variant="outlined"
            color="info"
          />
        </Box>

        {/* Time Range */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, width: 400 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Available Hours
          </Typography>
          <Slider
            defaultValue={[9, 17]}
            min={0}
            max={24}
            marks={[
              { value: 0, label: '12am' },
              { value: 6, label: '6am' },
              { value: 12, label: '12pm' },
              { value: 18, label: '6pm' },
              { value: 24, label: '12am' },
            ]}
            formatValue={(v) => `${v}:00`}
            showValue
          />
        </Box>
      </Stack>
    );
  },
};
