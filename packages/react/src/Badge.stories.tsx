import { Avatar, Box, Stack, Typography } from '@mui/material';
import { Meta, StoryObj } from 'storybook/react';
import { expect } from 'storybook/test';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'soft', 'outlined', 'ghost', 'plain', 'dot'],
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
      description: 'Badge size',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    animated: {
      control: { type: 'boolean' },
      description: 'Enable pulse animation',
    },
    badgeContent: {
      control: { type: 'number' },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: 'solid',
    badgeContent: 4,
  },
  render: (args) => (
    <Badge {...args}>
      <Avatar>JD</Avatar>
    </Badge>
  ),
  play: async ({ canvas }) => {
    const badgeContent = canvas.getByText('4');
    await expect(badgeContent).toBeInTheDocument();

    const avatar = canvas.getByText('JD');
    await expect(avatar).toBeInTheDocument();
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    badgeContent: 2,
  },
  render: (args) => (
    <Badge {...args}>
      <Avatar>AB</Avatar>
    </Badge>
  ),
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    badgeContent: 1,
  },
  render: (args) => (
    <Badge {...args}>
      <Avatar>CR</Avatar>
    </Badge>
  ),
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    badgeContent: 3,
  },
  render: (args) => (
    <Badge {...args}>
      <Avatar>DM</Avatar>
    </Badge>
  ),
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    badgeContent: 5,
  },
  render: (args) => (
    <Badge {...args}>
      <Avatar>EW</Avatar>
    </Badge>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={3}>
      <Badge variant="solid" badgeContent={4}>
        <Avatar>S</Avatar>
      </Badge>
      <Badge variant="soft" badgeContent={2}>
        <Avatar>So</Avatar>
      </Badge>
      <Badge variant="outlined" badgeContent={1}>
        <Avatar>O</Avatar>
      </Badge>
      <Badge variant="ghost" badgeContent={3}>
        <Avatar>G</Avatar>
      </Badge>
      <Badge variant="plain" badgeContent={5}>
        <Avatar>P</Avatar>
      </Badge>
    </Stack>
  ),
  play: async ({ canvas }) => {
    // Verify all avatars and badges are rendered
    const avatarS = canvas.getByText('S');
    const avatarSo = canvas.getByText('So');
    const avatarO = canvas.getByText('O');

    await expect(avatarS).toBeInTheDocument();
    await expect(avatarSo).toBeInTheDocument();
    await expect(avatarO).toBeInTheDocument();
  },
};

export const Dot: Story = {
  args: {
    variant: 'dot',
    overlap: 'circular',
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
  },
  render: (args) => (
    <Badge {...args}>
      <Avatar>JD</Avatar>
    </Badge>
  ),
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
      <Stack direction="row" spacing={3}>
        <Badge variant="solid" color="primary" badgeContent={4}>
          <Avatar>PR</Avatar>
        </Badge>
        <Badge variant="solid" color="secondary" badgeContent={2}>
          <Avatar>SE</Avatar>
        </Badge>
        <Badge variant="solid" color="success" badgeContent={3}>
          <Avatar>SU</Avatar>
        </Badge>
        <Badge variant="solid" color="warning" badgeContent={1}>
          <Avatar>WA</Avatar>
        </Badge>
        <Badge variant="solid" color="danger" badgeContent={5}>
          <Avatar>DA</Avatar>
        </Badge>
        <Badge variant="solid" color="info" badgeContent={7}>
          <Avatar>IN</Avatar>
        </Badge>
        <Badge variant="solid" color="neutral" badgeContent={9}>
          <Avatar>NE</Avatar>
        </Badge>
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
      <Stack direction="row" spacing={3} alignItems="center">
        <Badge variant="solid" size="xs" badgeContent={1}>
          <Avatar>XS</Avatar>
        </Badge>
        <Badge variant="solid" size="sm" badgeContent={2}>
          <Avatar>SM</Avatar>
        </Badge>
        <Badge variant="solid" size="md" badgeContent={3}>
          <Avatar>MD</Avatar>
        </Badge>
        <Badge variant="solid" size="lg" badgeContent={4}>
          <Avatar>LG</Avatar>
        </Badge>
        <Badge variant="solid" size="xl" badgeContent={5}>
          <Avatar>XL</Avatar>
        </Badge>
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// ANIMATED STATE
// =============================================================================

export const Animated: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Pulse Animation
      </Typography>
      <Stack direction="row" spacing={3}>
        <Badge variant="solid" color="danger" animated badgeContent={3}>
          <Avatar>AN</Avatar>
        </Badge>
        <Badge variant="dot" color="success" animated overlap="circular">
          <Avatar>ON</Avatar>
        </Badge>
      </Stack>
      <Typography variant="caption" color="text.secondary">
        Use animated prop for attention-grabbing notifications
      </Typography>
    </Stack>
  ),
};

// =============================================================================
// LOADING STATE
// =============================================================================

export const Loading: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Loading States
      </Typography>
      <Stack direction="row" spacing={3}>
        <Badge variant="solid" loading badgeContent={4}>
          <Avatar>LD</Avatar>
        </Badge>
        <Badge variant="soft" loading color="success" badgeContent={2}>
          <Avatar>LD</Avatar>
        </Badge>
      </Stack>
    </Stack>
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
          Sorbet UI Badge
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A comprehensive badge component with 5 variants, 7 colors, 5 sizes, animated and loading
          states.
        </Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Variants
        </Typography>
        <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
          <Badge variant="solid" badgeContent={4}>
            <Avatar>SO</Avatar>
          </Badge>
          <Badge variant="soft" badgeContent={3}>
            <Avatar>SF</Avatar>
          </Badge>
          <Badge variant="outlined" badgeContent={2}>
            <Avatar>OL</Avatar>
          </Badge>
          <Badge variant="ghost" badgeContent={1}>
            <Avatar>GH</Avatar>
          </Badge>
          <Badge variant="plain" badgeContent={5}>
            <Avatar>PL</Avatar>
          </Badge>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Colors
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Badge color="primary" badgeContent={1}>
            <Avatar>PR</Avatar>
          </Badge>
          <Badge color="success" badgeContent={2}>
            <Avatar>SU</Avatar>
          </Badge>
          <Badge color="warning" badgeContent={3}>
            <Avatar>WA</Avatar>
          </Badge>
          <Badge color="danger" badgeContent={4}>
            <Avatar>DA</Avatar>
          </Badge>
          <Badge color="info" badgeContent={5}>
            <Avatar>IN</Avatar>
          </Badge>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          States
        </Typography>
        <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
          <Badge badgeContent={1}>
            <Avatar>OK</Avatar>
          </Badge>
          <Badge animated color="danger" badgeContent={3}>
            <Avatar>AN</Avatar>
          </Badge>
          <Badge loading badgeContent={2}>
            <Avatar>LD</Avatar>
          </Badge>
        </Stack>
      </Box>
    </Stack>
  ),
};
