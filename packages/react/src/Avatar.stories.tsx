import { Box, Stack, Typography } from '@mui/material';
import { Meta, StoryObj } from 'storybook/react';
import { expect } from 'storybook/test';
import { Avatar } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
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
      description: 'Avatar size',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    alt: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: 'solid',
    children: 'JD',
    alt: 'John Doe',
  },
  play: async ({ canvas }) => {
    const avatar = canvas.getByText('JD');
    await expect(avatar).toBeInTheDocument();
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    children: 'AB',
    alt: 'Alice Brown',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'CR',
    alt: 'Charlie Rose',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'DM',
    alt: 'Diana Miller',
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    children: 'EW',
    alt: 'Emma Watson',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar variant="solid">JD</Avatar>
      <Avatar variant="soft">AB</Avatar>
      <Avatar variant="outlined">CR</Avatar>
      <Avatar variant="ghost">DM</Avatar>
      <Avatar variant="plain">EW</Avatar>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        5 Size Options
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar variant="solid" size="xs">
          XS
        </Avatar>
        <Avatar variant="solid" size="sm">
          SM
        </Avatar>
        <Avatar variant="solid" size="md">
          MD
        </Avatar>
        <Avatar variant="solid" size="lg">
          LG
        </Avatar>
        <Avatar variant="solid" size="xl">
          XL
        </Avatar>
      </Stack>
    </Stack>
  ),
  play: async ({ canvas }) => {
    const xsAvatar = canvas.getByText('XS');
    const mdAvatar = canvas.getByText('MD');
    const xlAvatar = canvas.getByText('XL');

    await expect(xsAvatar).toBeInTheDocument();
    await expect(mdAvatar).toBeInTheDocument();
    await expect(xlAvatar).toBeInTheDocument();
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
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar variant="solid" color="primary">
          PR
        </Avatar>
        <Avatar variant="solid" color="secondary">
          SE
        </Avatar>
        <Avatar variant="solid" color="success">
          SU
        </Avatar>
        <Avatar variant="solid" color="warning">
          WA
        </Avatar>
        <Avatar variant="solid" color="danger">
          DA
        </Avatar>
        <Avatar variant="solid" color="info">
          IN
        </Avatar>
        <Avatar variant="solid" color="neutral">
          NE
        </Avatar>
      </Stack>
      <Typography variant="caption" color="text.secondary">
        Colors work with all variants
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar variant="soft" color="primary">
          PR
        </Avatar>
        <Avatar variant="soft" color="success">
          SU
        </Avatar>
        <Avatar variant="soft" color="danger">
          DA
        </Avatar>
        <Avatar variant="outlined" color="primary">
          PR
        </Avatar>
        <Avatar variant="outlined" color="success">
          SU
        </Avatar>
        <Avatar variant="outlined" color="danger">
          DA
        </Avatar>
      </Stack>
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
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar variant="solid" loading>
          JD
        </Avatar>
        <Avatar variant="soft" loading color="success">
          AB
        </Avatar>
        <Avatar variant="outlined" loading color="danger">
          CR
        </Avatar>
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
          Sorbet UI Avatar
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A comprehensive avatar component with 5 variants, 7 colors, 5 sizes, and loading states.
        </Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Variants
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }} alignItems="center">
          <Avatar variant="solid">SO</Avatar>
          <Avatar variant="soft">SF</Avatar>
          <Avatar variant="outlined">OL</Avatar>
          <Avatar variant="ghost">GH</Avatar>
          <Avatar variant="plain">PL</Avatar>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Colors
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }} alignItems="center">
          <Avatar color="primary">PR</Avatar>
          <Avatar color="secondary">SE</Avatar>
          <Avatar color="success">SU</Avatar>
          <Avatar color="warning">WA</Avatar>
          <Avatar color="danger">DA</Avatar>
          <Avatar color="info">IN</Avatar>
          <Avatar color="neutral">NE</Avatar>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Sizes
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }} alignItems="center">
          <Avatar size="xs">XS</Avatar>
          <Avatar size="sm">SM</Avatar>
          <Avatar size="md">MD</Avatar>
          <Avatar size="lg">LG</Avatar>
          <Avatar size="xl">XL</Avatar>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          States
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }} alignItems="center">
          <Avatar>OK</Avatar>
          <Avatar loading>LD</Avatar>
        </Stack>
      </Box>
    </Stack>
  ),
};
