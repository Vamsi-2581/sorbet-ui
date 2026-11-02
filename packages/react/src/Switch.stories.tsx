import { Box, Stack, Typography } from '@mui/material';
import { Meta, StoryObj } from 'storybook/react';
import { expect, fn, userEvent } from 'storybook/test';
import { Switch } from './Switch';

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
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
      description: 'Switch size',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the switch',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// VARIANT STORIES
// =============================================================================

export const Solid: Story = {
  args: {
    variant: 'solid',
    label: 'Solid Switch',
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    label: 'Soft Switch',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined Switch',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Switch',
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    label: 'Plain Switch',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        5 Variant Presets (Off → On)
      </Typography>
      {(['solid', 'soft', 'outlined', 'ghost', 'plain'] as const).map((variant) => (
        <Stack key={variant} direction="row" spacing={4} alignItems="center">
          <Box sx={{ width: 100 }}>
            <Typography variant="caption" color="text.secondary">
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Typography>
          </Box>
          <Switch variant={variant} />
          <Switch variant={variant} defaultChecked />
        </Stack>
      ))}
    </Stack>
  ),
  play: async ({ canvas }) => {
    const switches = canvas.getAllByRole('switch');
    await expect(switches).toHaveLength(10);
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
              <Switch
                variant="solid"
                color={color}
                label={color.charAt(0).toUpperCase() + color.slice(1)}
              />
              <Switch variant="solid" color={color} defaultChecked />
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
        Colors × Variants Matrix (Checked)
      </Typography>
      {(['solid', 'soft', 'outlined'] as const).map((variant) => (
        <Box key={variant}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map(
              (color) => (
                <Switch key={color} variant={variant} color={color} defaultChecked />
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
        <Switch size="xs" label="XS" defaultChecked />
        <Switch size="sm" label="SM" defaultChecked />
        <Switch size="md" label="MD" defaultChecked />
        <Switch size="lg" label="LG" defaultChecked />
        <Switch size="xl" label="XL" defaultChecked />
      </Stack>
    </Stack>
  ),
  play: async ({ canvas }) => {
    const switches = canvas.getAllByRole('switch');
    await expect(switches).toHaveLength(5);
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
    const switchElement = canvas.getByRole('switch');
    await expect(switchElement).toBeDisabled();
  },
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Switch States
      </Typography>
      <Stack spacing={2}>
        <Switch label="Off (Default)" />
        <Switch label="On" defaultChecked />
        <Switch label="Loading" loading />
        <Switch label="Disabled (Off)" disabled />
        <Switch label="Disabled (On)" disabled defaultChecked />
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// INTERACTION STORIES
// =============================================================================

export const Interactive: Story = {
  args: {
    label: 'Toggle me',
  },
  play: async ({ canvas }) => {
    const switchElement = canvas.getByRole('switch');
    await expect(switchElement).not.toBeChecked();
    await userEvent.click(switchElement);
    await expect(switchElement).toBeChecked();
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
          Sorbet UI Switch
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A comprehensive toggle switch with 5 variants, 7 colors, 5 sizes, and smooth animations.
        </Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Variants (On)
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Switch variant="solid" defaultChecked />
          <Switch variant="soft" defaultChecked />
          <Switch variant="outlined" defaultChecked />
          <Switch variant="ghost" defaultChecked />
          <Switch variant="plain" defaultChecked />
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Colors (Solid)
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Switch variant="solid" color="primary" defaultChecked />
          <Switch variant="solid" color="secondary" defaultChecked />
          <Switch variant="solid" color="success" defaultChecked />
          <Switch variant="solid" color="warning" defaultChecked />
          <Switch variant="solid" color="danger" defaultChecked />
          <Switch variant="solid" color="info" defaultChecked />
          <Switch variant="solid" color="neutral" defaultChecked />
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Sizes
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
          <Switch size="xs" defaultChecked />
          <Switch size="sm" defaultChecked />
          <Switch size="md" defaultChecked />
          <Switch size="lg" defaultChecked />
          <Switch size="xl" defaultChecked />
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          States
        </Typography>
        <Stack direction="row" spacing={3} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Switch label="Off" />
          <Switch label="On" defaultChecked />
          <Switch label="Loading" loading />
          <Switch label="Disabled" disabled />
        </Stack>
      </Box>
    </Stack>
  ),
};
