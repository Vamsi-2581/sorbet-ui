import { Box, Stack, Typography } from '@mui/material';
import { Meta, StoryObj } from 'storybook/react';
import { expect } from 'storybook/test';
import { Button } from './Button';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
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
      description: 'Tooltip size',
    },
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip placement',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    disableAnimation: {
      control: { type: 'boolean' },
      description: 'Disable animations',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: 'solid',
    title: 'Solid Tooltip',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="soft">Hover me</Button>
    </Tooltip>
  ),
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    title: 'Soft Tooltip',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="soft">Hover me</Button>
    </Tooltip>
  ),
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    title: 'Outlined Tooltip',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="soft">Hover me</Button>
    </Tooltip>
  ),
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    title: 'Ghost Tooltip',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="soft">Hover me</Button>
    </Tooltip>
  ),
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    title: 'Plain Tooltip',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="soft">Hover me</Button>
    </Tooltip>
  ),
};

export const WithArrow: Story = {
  args: {
    variant: 'solid',
    title: 'Tooltip with Arrow',
    arrow: true,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="soft">Hover me</Button>
    </Tooltip>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={4}>
      <Tooltip variant="solid" title="Solid">
        <Button variant="soft">Solid</Button>
      </Tooltip>
      <Tooltip variant="soft" title="Soft">
        <Button variant="soft">Soft</Button>
      </Tooltip>
      <Tooltip variant="outlined" title="Outlined">
        <Button variant="soft">Outlined</Button>
      </Tooltip>
      <Tooltip variant="ghost" title="Ghost">
        <Button variant="soft">Ghost</Button>
      </Tooltip>
      <Tooltip variant="plain" title="Plain">
        <Button variant="soft">Plain</Button>
      </Tooltip>
    </Stack>
  ),
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole('button');
    await expect(buttons).toHaveLength(5);
  },
};

export const Placements: Story = {
  render: () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, p: 4 }}>
      <Tooltip variant="solid" title="Top" placement="top">
        <Button variant="soft">Top</Button>
      </Tooltip>
      <Tooltip variant="solid" title="Bottom" placement="bottom">
        <Button variant="soft">Bottom</Button>
      </Tooltip>
      <Tooltip variant="solid" title="Left" placement="left">
        <Button variant="soft">Left</Button>
      </Tooltip>
      <Tooltip variant="solid" title="Right" placement="right">
        <Button variant="soft">Right</Button>
      </Tooltip>
    </Box>
  ),
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole('button');
    await expect(buttons).toHaveLength(4);
  },
};

export const Disabled: Story = {
  args: {
    variant: 'solid',
    title: 'Tooltip on disabled button',
  },
  render: (args) => (
    <Tooltip {...args}>
      <span>
        <Button variant="soft" disabled>
          Disabled Button
        </Button>
      </span>
    </Tooltip>
  ),
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /disabled button/i });
    await expect(button).toBeDisabled();
  },
};

// =============================================================================
// COLOR STORIES
// =============================================================================

export const Colors: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        7 Color Options
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Tooltip variant="solid" color="primary" title="Primary Tooltip">
          <Button variant="soft" color="primary">
            Primary
          </Button>
        </Tooltip>
        <Tooltip variant="solid" color="secondary" title="Secondary Tooltip">
          <Button variant="soft" color="secondary">
            Secondary
          </Button>
        </Tooltip>
        <Tooltip variant="solid" color="success" title="Success Tooltip">
          <Button variant="soft" color="success">
            Success
          </Button>
        </Tooltip>
        <Tooltip variant="solid" color="warning" title="Warning Tooltip">
          <Button variant="soft" color="warning">
            Warning
          </Button>
        </Tooltip>
        <Tooltip variant="solid" color="danger" title="Danger Tooltip">
          <Button variant="soft" color="danger">
            Danger
          </Button>
        </Tooltip>
        <Tooltip variant="solid" color="info" title="Info Tooltip">
          <Button variant="soft" color="info">
            Info
          </Button>
        </Tooltip>
        <Tooltip variant="solid" color="neutral" title="Neutral Tooltip">
          <Button variant="soft" color="neutral">
            Neutral
          </Button>
        </Tooltip>
      </Stack>
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
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
        <Tooltip variant="solid" size="xs" title="Extra Small Tooltip">
          <Button size="xs">XS</Button>
        </Tooltip>
        <Tooltip variant="solid" size="sm" title="Small Tooltip">
          <Button size="sm">SM</Button>
        </Tooltip>
        <Tooltip variant="solid" size="md" title="Medium Tooltip (default)">
          <Button size="md">MD</Button>
        </Tooltip>
        <Tooltip variant="solid" size="lg" title="Large Tooltip">
          <Button size="lg">LG</Button>
        </Tooltip>
        <Tooltip variant="solid" size="xl" title="Extra Large Tooltip">
          <Button size="xl">XL</Button>
        </Tooltip>
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// LOADING STATE
// =============================================================================

export const Loading: Story = {
  args: {
    variant: 'solid',
    loading: true,
    title: 'Loading data...',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="soft">Loading Tooltip</Button>
    </Tooltip>
  ),
};

// =============================================================================
// FULL DEMO
// =============================================================================

export const FullDemo: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Sorbet UI Tooltip
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A comprehensive tooltip with 5 variants, 7 colors, 5 sizes, loading states, and
          animations.
        </Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Variants
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Tooltip variant="solid" title="Solid">
            <Button variant="soft">Solid</Button>
          </Tooltip>
          <Tooltip variant="soft" title="Soft">
            <Button variant="soft">Soft</Button>
          </Tooltip>
          <Tooltip variant="outlined" title="Outlined">
            <Button variant="soft">Outlined</Button>
          </Tooltip>
          <Tooltip variant="ghost" title="Ghost">
            <Button variant="soft">Ghost</Button>
          </Tooltip>
          <Tooltip variant="plain" title="Plain">
            <Button variant="soft">Plain</Button>
          </Tooltip>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Colors × Soft Variant
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Tooltip variant="soft" color="primary" title="Primary">
            <Button variant="ghost" color="primary">
              Primary
            </Button>
          </Tooltip>
          <Tooltip variant="soft" color="success" title="Success">
            <Button variant="ghost" color="success">
              Success
            </Button>
          </Tooltip>
          <Tooltip variant="soft" color="warning" title="Warning">
            <Button variant="ghost" color="warning">
              Warning
            </Button>
          </Tooltip>
          <Tooltip variant="soft" color="danger" title="Danger">
            <Button variant="ghost" color="danger">
              Danger
            </Button>
          </Tooltip>
          <Tooltip variant="soft" color="info" title="Info">
            <Button variant="ghost" color="info">
              Info
            </Button>
          </Tooltip>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          States
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Tooltip title="Normal Tooltip">
            <Button variant="soft">Normal</Button>
          </Tooltip>
          <Tooltip loading title="Loading...">
            <Button variant="soft">Loading</Button>
          </Tooltip>
          <Tooltip arrow title="With Arrow">
            <Button variant="soft">Arrow</Button>
          </Tooltip>
        </Stack>
      </Box>
    </Stack>
  ),
};
