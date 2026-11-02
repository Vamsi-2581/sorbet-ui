import { Box, RadioGroup, Stack, Typography } from '@mui/material';
import { Meta, StoryObj } from 'storybook/react';
import { expect, fn, userEvent } from 'storybook/test';
import { Radio } from './Radio';

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'soft', 'outlined', 'ghost', 'plain'],
      description: 'Visual style variant',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
      description: 'Color scheme',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Radio size',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the radio',
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// VARIANT STORIES
// =============================================================================

export const Solid: Story = {
  args: {
    variant: 'solid',
    label: 'Solid Radio',
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    label: 'Soft Radio',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined Radio',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Radio',
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    label: 'Plain Radio',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        5 Variant Presets (Unchecked → Checked)
      </Typography>
      {(['solid', 'soft', 'outlined', 'ghost', 'plain'] as const).map((variant) => (
        <Stack key={variant} direction="row" spacing={4} alignItems="center">
          <Box sx={{ width: 120 }}>
            <Typography variant="caption" color="text.secondary">
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Typography>
          </Box>
          <Radio variant={variant} />
          <Radio variant={variant} checked />
        </Stack>
      ))}
    </Stack>
  ),
  play: async ({ canvas }) => {
    const radios = canvas.getAllByRole('radio');
    await expect(radios).toHaveLength(10);
  },
};

// =============================================================================
// COLOR STORIES
// =============================================================================

export const Colors: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        7 Color Options (Solid Variant)
      </Typography>
      <Stack spacing={2}>
        {(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'] as const).map(
          (color) => (
            <Stack key={color} direction="row" spacing={3} alignItems="center">
              <Radio
                variant="solid"
                color={color}
                label={color.charAt(0).toUpperCase() + color.slice(1)}
              />
              <Radio variant="solid" color={color} checked />
            </Stack>
          )
        )}
      </Stack>
    </Stack>
  ),
};

export const ColorsByVariant: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="subtitle2" color="text.secondary">
        Colors × Variants Matrix
      </Typography>
      {(['solid', 'soft', 'outlined'] as const).map((variant) => (
        <Box key={variant}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map(
              (color) => (
                <Radio key={color} variant={variant} color={color} checked />
              )
            )}
          </Stack>
        </Box>
      ))}
    </Stack>
  ),
};

// =============================================================================
// SIZE STORIES
// =============================================================================

export const Sizes: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        5 Size Options
      </Typography>
      <Stack direction="row" spacing={3} alignItems="center">
        <Radio size="xs" label="XS" checked />
        <Radio size="sm" label="SM" checked />
        <Radio size="md" label="MD" checked />
        <Radio size="lg" label="LG" checked />
        <Radio size="xl" label="XL" checked />
      </Stack>
    </Stack>
  ),
  play: async ({ canvas }) => {
    const radios = canvas.getAllByRole('radio');
    await expect(radios).toHaveLength(5);
  },
};

// =============================================================================
// STATE STORIES
// =============================================================================

export const Loading: Story = {
  args: {
    loading: true,
    label: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled',
  },
  play: async ({ canvas }) => {
    const radio = canvas.getByRole('radio');
    await expect(radio).toBeDisabled();
  },
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Radio States
      </Typography>
      <Stack spacing={2}>
        <Radio label="Unchecked (Default)" />
        <Radio label="Checked" checked />
        <Radio label="Loading" loading />
        <Radio label="Disabled (Unchecked)" disabled />
        <Radio label="Disabled (Checked)" disabled checked />
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// RADIO GROUP STORIES
// =============================================================================

export const RadioGroupExample: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Radio Group
      </Typography>
      <RadioGroup defaultValue="option1">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    </Stack>
  ),
  play: async ({ canvas }) => {
    const radios = canvas.getAllByRole('radio');
    await expect(radios).toHaveLength(3);
    await userEvent.click(radios[1]);
  },
};

// =============================================================================
// FULL DEMO
// =============================================================================

export const FullDemo: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Sorbet UI Radio
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A comprehensive radio button with 5 variants, 7 colors, 5 sizes, and full accessibility.
        </Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Variants (Checked)
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Radio variant="solid" checked />
          <Radio variant="soft" checked />
          <Radio variant="outlined" checked />
          <Radio variant="ghost" checked />
          <Radio variant="plain" checked />
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Colors (Solid)
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Radio variant="solid" color="primary" checked />
          <Radio variant="solid" color="secondary" checked />
          <Radio variant="solid" color="success" checked />
          <Radio variant="solid" color="warning" checked />
          <Radio variant="solid" color="danger" checked />
          <Radio variant="solid" color="info" checked />
          <Radio variant="solid" color="neutral" checked />
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Sizes
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
          <Radio size="xs" checked />
          <Radio size="sm" checked />
          <Radio size="md" checked />
          <Radio size="lg" checked />
          <Radio size="xl" checked />
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          States
        </Typography>
        <Stack direction="row" spacing={3} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Radio label="Default" />
          <Radio label="Checked" checked />
          <Radio label="Loading" loading />
          <Radio label="Disabled" disabled />
        </Stack>
      </Box>
    </Stack>
  ),
};
