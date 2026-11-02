import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import type { ProgressColor, ProgressSize, ProgressVariant } from './Progress';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Atoms/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Progress indicators show the status of ongoing processes. Sorbet UI provides both linear and circular variants with 5 visual styles.

## Features
- **Two types**: Linear and circular progress indicators
- **5 Variants**: solid, soft, outlined, ghost, plain
- **7 Colors**: primary, secondary, success, warning, error, info, neutral
- **5 Sizes**: xs, sm, md, lg, xl
- **Determinate & Indeterminate**: Show exact progress or loading state
- **Labels**: Optional value labels with custom formatting
- **Buffer**: Linear progress supports buffer indicator
- **Accessible**: Full ARIA support via @sorbet-ui/core primitives
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['linear', 'circular'],
      description: 'Progress indicator type',
      table: { defaultValue: { summary: 'linear' } },
    },
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
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Show indeterminate loading state',
      table: { defaultValue: { summary: 'false' } },
    },
    showLabel: {
      control: 'boolean',
      description: 'Show value label',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

// ─────────────────────────────────────────────────────────────────────────────
// Default Story
// ─────────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    value: 60,
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Linear Progress Stories
// ─────────────────────────────────────────────────────────────────────────────

export const LinearVariants: Story = {
  name: 'Linear - All Variants',
  render: () => {
    const variants: ProgressVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];

    return (
      <Stack spacing={3} sx={{ width: 400 }}>
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography
              variant="caption"
              sx={{ mb: 1, display: 'block', textTransform: 'capitalize' }}
            >
              {variant}
            </Typography>
            <Progress variant={variant} value={65} />
          </Box>
        ))}
      </Stack>
    );
  },
};

export const LinearColors: Story = {
  name: 'Linear - All Colors',
  render: () => {
    const colors: ProgressColor[] = [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
      'neutral',
    ];

    return (
      <Stack spacing={2} sx={{ width: 400 }}>
        {colors.map((color) => (
          <Box key={color}>
            <Typography
              variant="caption"
              sx={{ mb: 0.5, display: 'block', textTransform: 'capitalize' }}
            >
              {color}
            </Typography>
            <Progress color={color} value={70} />
          </Box>
        ))}
      </Stack>
    );
  },
};

export const LinearSizes: Story = {
  name: 'Linear - All Sizes',
  render: () => {
    const sizes: ProgressSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

    return (
      <Stack spacing={3} sx={{ width: 400 }}>
        {sizes.map((size) => (
          <Box key={size}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Size: {size}
            </Typography>
            <Progress size={size} value={50} />
          </Box>
        ))}
      </Stack>
    );
  },
};

export const LinearWithLabel: Story = {
  name: 'Linear - With Label',
  render: () => {
    return (
      <Stack spacing={4} sx={{ width: 400 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Label at End
          </Typography>
          <Progress value={75} showLabel labelPosition="end" />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Label at Top
          </Typography>
          <Progress value={45} showLabel labelPosition="top" />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Label at Bottom
          </Typography>
          <Progress value={30} showLabel labelPosition="bottom" />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Custom Label Format
          </Typography>
          <Progress value={85} showLabel formatLabel={(v) => `${v}% completed`} />
        </Box>
      </Stack>
    );
  },
};

export const LinearBuffer: Story = {
  name: 'Linear - Buffer',
  render: () => {
    return (
      <Stack spacing={3} sx={{ width: 400 }}>
        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            Video buffering (value: 30, buffer: 60)
          </Typography>
          <Progress value={30} bufferValue={60} />
        </Box>
        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            Download progress (value: 50, buffer: 75)
          </Typography>
          <Progress value={50} bufferValue={75} color="success" />
        </Box>
        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            Soft variant buffer
          </Typography>
          <Progress value={40} bufferValue={80} variant="soft" color="info" />
        </Box>
      </Stack>
    );
  },
};

export const LinearIndeterminate: Story = {
  name: 'Linear - Indeterminate',
  render: () => {
    const variants: ProgressVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];

    return (
      <Stack spacing={3} sx={{ width: 400 }}>
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography
              variant="caption"
              sx={{ mb: 1, display: 'block', textTransform: 'capitalize' }}
            >
              {variant}
            </Typography>
            <Progress variant={variant} indeterminate />
          </Box>
        ))}
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Circular Progress Stories
// ─────────────────────────────────────────────────────────────────────────────

export const CircularVariants: Story = {
  name: 'Circular - All Variants',
  render: () => {
    const variants: ProgressVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];

    return (
      <Stack direction="row" spacing={3} alignItems="center">
        {variants.map((variant) => (
          <Box key={variant} sx={{ textAlign: 'center' }}>
            <Progress type="circular" variant={variant} value={65} />
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

export const CircularColors: Story = {
  name: 'Circular - All Colors',
  render: () => {
    const colors: ProgressColor[] = [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
      'neutral',
    ];

    return (
      <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
        {colors.map((color) => (
          <Box key={color} sx={{ textAlign: 'center' }}>
            <Progress type="circular" color={color} value={70} />
            <Typography
              variant="caption"
              sx={{ mt: 1, display: 'block', textTransform: 'capitalize' }}
            >
              {color}
            </Typography>
          </Box>
        ))}
      </Stack>
    );
  },
};

export const CircularSizes: Story = {
  name: 'Circular - All Sizes',
  render: () => {
    const sizes: ProgressSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

    return (
      <Stack direction="row" spacing={4} alignItems="center">
        {sizes.map((size) => (
          <Box key={size} sx={{ textAlign: 'center' }}>
            <Progress type="circular" size={size} value={50} />
            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
              {size}
            </Typography>
          </Box>
        ))}
      </Stack>
    );
  },
};

export const CircularWithLabel: Story = {
  name: 'Circular - With Label',
  render: () => {
    return (
      <Stack direction="row" spacing={4} alignItems="center">
        <Box sx={{ textAlign: 'center' }}>
          <Progress type="circular" value={75} showLabel size="lg" />
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            Default Label
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Progress type="circular" value={100} showLabel size="lg" color="success" />
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            Complete
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Progress type="circular" value={42} showLabel size="xl" formatLabel={(v) => `${v}`} />
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            Custom Format
          </Typography>
        </Box>
      </Stack>
    );
  },
};

export const CircularIndeterminate: Story = {
  name: 'Circular - Indeterminate',
  render: () => {
    const variants: ProgressVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];

    return (
      <Stack direction="row" spacing={3} alignItems="center">
        {variants.map((variant) => (
          <Box key={variant} sx={{ textAlign: 'center' }}>
            <Progress type="circular" variant={variant} indeterminate />
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
// Variant Showcase
// ─────────────────────────────────────────────────────────────────────────────

export const VariantShowcase: Story = {
  name: 'All Variants Matrix',
  render: () => {
    const variants: ProgressVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];
    const colors: ProgressColor[] = ['primary', 'secondary', 'success', 'danger'];

    return (
      <Stack spacing={4}>
        <Typography variant="h6">Linear Progress</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          {variants.map((variant) =>
            colors.map((color) => (
              <Box key={`${variant}-${color}`}>
                <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                  {variant} / {color}
                </Typography>
                <Progress variant={variant} color={color} value={60} />
              </Box>
            ))
          )}
        </Box>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Circular Progress
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 3 }}>
          {variants.map((variant) => (
            <Stack key={variant} spacing={2} alignItems="center">
              <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                {variant}
              </Typography>
              {colors.map((color) => (
                <Progress
                  key={`${variant}-${color}`}
                  type="circular"
                  variant={variant}
                  color={color}
                  value={65}
                  size="sm"
                />
              ))}
            </Stack>
          ))}
        </Box>
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Demo
// ─────────────────────────────────────────────────────────────────────────────

export const InteractiveDemo: Story = {
  name: 'Interactive Progress',
  render: function InteractiveProgressDemo() {
    const [progress, setProgress] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);

    React.useEffect(() => {
      if (!isRunning) return;

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsRunning(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(timer);
    }, [isRunning]);

    const handleStart = () => {
      setProgress(0);
      setIsRunning(true);
    };

    const handleReset = () => {
      setProgress(0);
      setIsRunning(false);
    };

    return (
      <Stack spacing={4} sx={{ width: 400 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Linear Progress
          </Typography>
          <Progress value={progress} showLabel color={progress === 100 ? 'success' : 'primary'} />
        </Box>

        <Stack direction="row" spacing={4} alignItems="center">
          <Box sx={{ textAlign: 'center' }}>
            <Progress
              type="circular"
              value={progress}
              showLabel
              size="xl"
              color={progress === 100 ? 'success' : 'primary'}
            />
          </Box>
          <Stack spacing={1}>
            <button onClick={handleStart} disabled={isRunning}>
              Start
            </button>
            <button onClick={handleReset}>Reset</button>
          </Stack>
        </Stack>
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
    const variants: ProgressVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];

    return (
      <Box sx={{ p: 4, backgroundColor: '#1a1a2e', borderRadius: 2 }}>
        <Stack spacing={4}>
          <Typography variant="h6" sx={{ color: 'white' }}>
            Linear Progress (Dark Mode)
          </Typography>
          <Stack spacing={2} sx={{ width: 400 }}>
            {variants.map((variant) => (
              <Progress key={variant} variant={variant} value={60} />
            ))}
          </Stack>

          <Typography variant="h6" sx={{ color: 'white', mt: 4 }}>
            Circular Progress (Dark Mode)
          </Typography>
          <Stack direction="row" spacing={3}>
            {variants.map((variant) => (
              <Progress key={variant} type="circular" variant={variant} value={60} />
            ))}
          </Stack>

          <Typography variant="h6" sx={{ color: 'white', mt: 4 }}>
            With Labels
          </Typography>
          <Stack direction="row" spacing={4} alignItems="center">
            <Box sx={{ width: 300 }}>
              <Progress value={75} showLabel variant="solid" />
            </Box>
            <Progress type="circular" value={75} showLabel size="lg" variant="solid" />
          </Stack>
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
        {/* File Upload */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            File Upload
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">document.pdf</Typography>
              <Typography variant="caption" color="text.secondary">
                2.4 MB / 5 MB
              </Typography>
            </Box>
            <Progress value={48} variant="soft" color="info" showLabel />
          </Stack>
        </Box>

        {/* Skills */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Skills
          </Typography>
          <Stack spacing={2}>
            {[
              { skill: 'React', level: 90 },
              { skill: 'TypeScript', level: 85 },
              { skill: 'CSS', level: 75 },
              { skill: 'Node.js', level: 70 },
            ].map(({ skill, level }) => (
              <Box key={skill}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">{skill}</Typography>
                  <Typography variant="caption">{level}%</Typography>
                </Box>
                <Progress value={level} variant="solid" color="primary" size="sm" />
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Dashboard Stats */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Dashboard Stats
          </Typography>
          <Stack direction="row" spacing={6} justifyContent="center">
            {[
              { label: 'CPU', value: 67, color: 'info' as const },
              { label: 'Memory', value: 82, color: 'warning' as const },
              { label: 'Storage', value: 45, color: 'success' as const },
              { label: 'Network', value: 23, color: 'primary' as const },
            ].map(({ label, value, color }) => (
              <Box key={label} sx={{ textAlign: 'center' }}>
                <Progress type="circular" value={value} showLabel size="lg" color={color} />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Loading States */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Loading States
          </Typography>
          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Processing request...
              </Typography>
              <Progress indeterminate variant="soft" color="primary" />
            </Box>
            <Stack direction="row" spacing={4} alignItems="center">
              <Progress type="circular" indeterminate size="sm" />
              <Typography variant="body2">Loading data...</Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Steps Progress */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Order Status
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Progress
              value={66}
              variant="solid"
              color="success"
              showLabel
              formatLabel={() => 'Step 2 of 3'}
              sx={{ flexGrow: 1 }}
            />
          </Box>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="caption" color="success.main">
              ✓ Ordered
            </Typography>
            <Typography variant="caption" color="success.main">
              ✓ Shipped
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Delivered
            </Typography>
          </Stack>
        </Box>
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Custom Styling
// ─────────────────────────────────────────────────────────────────────────────

export const CustomStyling: Story = {
  name: 'Custom Styling',
  render: () => {
    return (
      <Stack spacing={4} sx={{ width: 400 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Custom Height
          </Typography>
          <Progress value={60} height={20} rounded />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Square Corners
          </Typography>
          <Progress value={60} rounded={false} size="lg" />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Custom Circular Size
          </Typography>
          <Stack direction="row" spacing={3} alignItems="center">
            <Progress type="circular" value={75} circleSize={100} thickness={8} showLabel />
            <Progress type="circular" value={50} circleSize={60} thickness={2} />
          </Stack>
        </Box>
      </Stack>
    );
  },
};
