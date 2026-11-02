import { Box, Stack, Typography } from '@mui/material';
import { Meta, StoryObj } from 'storybook/react';
import { expect, fn, userEvent } from 'storybook/test';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
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
      description: 'Checkbox size',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the checkbox',
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Show indeterminate state',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// VARIANT STORIES
// =============================================================================

export const Solid: Story = {
  args: {
    variant: 'solid',
    label: 'Solid Checkbox',
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    label: 'Soft Checkbox',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined Checkbox',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Checkbox',
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    label: 'Plain Checkbox',
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
          <Checkbox variant={variant} />
          <Checkbox variant={variant} defaultChecked />
          <Checkbox variant={variant} indeterminate />
        </Stack>
      ))}
    </Stack>
  ),
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole('checkbox');
    await expect(checkboxes).toHaveLength(15);
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
              <Checkbox
                variant="solid"
                color={color}
                label={color.charAt(0).toUpperCase() + color.slice(1)}
              />
              <Checkbox variant="solid" color={color} defaultChecked />
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
                <Checkbox key={color} variant={variant} color={color} defaultChecked />
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
        <Checkbox size="xs" label="XS" defaultChecked />
        <Checkbox size="sm" label="SM" defaultChecked />
        <Checkbox size="md" label="MD" defaultChecked />
        <Checkbox size="lg" label="LG" defaultChecked />
        <Checkbox size="xl" label="XL" defaultChecked />
      </Stack>
    </Stack>
  ),
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole('checkbox');
    await expect(checkboxes).toHaveLength(5);
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
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).toBeDisabled();
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Indeterminate',
  },
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Checkbox States
      </Typography>
      <Stack spacing={2}>
        <Checkbox label="Unchecked (Default)" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
        <Checkbox label="Loading" loading />
        <Checkbox label="Disabled (Unchecked)" disabled />
        <Checkbox label="Disabled (Checked)" disabled defaultChecked />
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// INTERACTION STORIES
// =============================================================================

export const Interactive: Story = {
  args: {
    label: 'Click me',
  },
  play: async ({ args, canvas }) => {
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(args.onChange).toHaveBeenCalled();
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
          Sorbet UI Checkbox
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A comprehensive checkbox with 5 variants, 7 colors, 5 sizes, indeterminate state, and full
          accessibility.
        </Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Variants (Checked)
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Checkbox variant="solid" defaultChecked />
          <Checkbox variant="soft" defaultChecked />
          <Checkbox variant="outlined" defaultChecked />
          <Checkbox variant="ghost" defaultChecked />
          <Checkbox variant="plain" defaultChecked />
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Colors (Solid)
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Checkbox variant="solid" color="primary" defaultChecked />
          <Checkbox variant="solid" color="secondary" defaultChecked />
          <Checkbox variant="solid" color="success" defaultChecked />
          <Checkbox variant="solid" color="warning" defaultChecked />
          <Checkbox variant="solid" color="danger" defaultChecked />
          <Checkbox variant="solid" color="info" defaultChecked />
          <Checkbox variant="solid" color="neutral" defaultChecked />
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Sizes
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
          <Checkbox size="xs" defaultChecked />
          <Checkbox size="sm" defaultChecked />
          <Checkbox size="md" defaultChecked />
          <Checkbox size="lg" defaultChecked />
          <Checkbox size="xl" defaultChecked />
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          States
        </Typography>
        <Stack direction="row" spacing={3} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Checkbox label="Default" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Loading" loading />
          <Checkbox label="Disabled" disabled />
        </Stack>
      </Box>
    </Stack>
  ),
};
