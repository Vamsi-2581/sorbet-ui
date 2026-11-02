import { Box, Stack, Typography } from '@mui/material';
import { Meta, StoryObj } from 'storybook/react';
import { expect, fn } from 'storybook/test';
import { Chip } from './Chip';

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: {
    onDelete: fn(),
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
      description: 'Chip size',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    label: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: 'solid',
    label: 'Solid Chip',
  },
  play: async ({ canvas }) => {
    const chip = canvas.getByText('Solid Chip');
    await expect(chip).toBeInTheDocument();
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    label: 'Soft Chip',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined Chip',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Chip',
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    label: 'Plain Chip',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <Chip variant="solid" label="Solid" />
      <Chip variant="soft" label="Soft" />
      <Chip variant="outlined" label="Outlined" />
      <Chip variant="ghost" label="Ghost" />
      <Chip variant="plain" label="Plain" />
    </Stack>
  ),
};

export const WithDelete: Story = {
  render: () => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <Chip variant="solid" label="Solid" onDelete={() => {}} />
      <Chip variant="soft" label="Soft" onDelete={() => {}} />
      <Chip variant="outlined" label="Outlined" onDelete={() => {}} />
      <Chip variant="ghost" label="Ghost" onDelete={() => {}} />
      <Chip variant="plain" label="Plain" onDelete={() => {}} />
    </Stack>
  ),
  play: async ({ canvas }) => {
    const solidChip = canvas.getByText('Solid');
    const softChip = canvas.getByText('Soft');

    await expect(solidChip).toBeInTheDocument();
    await expect(softChip).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    variant: 'outlined',
    label: 'Disabled Chip',
    disabled: true,
  },
  play: async ({ canvas }) => {
    const chip = canvas.getByText('Disabled Chip');
    await expect(chip).toBeInTheDocument();
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
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip variant="solid" color="primary" label="Primary" />
        <Chip variant="solid" color="secondary" label="Secondary" />
        <Chip variant="solid" color="success" label="Success" />
        <Chip variant="solid" color="warning" label="Warning" />
        <Chip variant="solid" color="danger" label="Danger" />
        <Chip variant="solid" color="info" label="Info" />
        <Chip variant="solid" color="neutral" label="Neutral" />
      </Stack>
      <Typography variant="caption" color="text.secondary">
        Colors work with all variants
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip variant="soft" color="primary" label="Soft Primary" />
        <Chip variant="soft" color="success" label="Soft Success" />
        <Chip variant="outlined" color="danger" label="Outlined Danger" />
        <Chip variant="ghost" color="info" label="Ghost Info" />
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
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
        <Chip variant="solid" size="xs" label="XS" />
        <Chip variant="solid" size="sm" label="SM" />
        <Chip variant="solid" size="md" label="MD" />
        <Chip variant="solid" size="lg" label="LG" />
        <Chip variant="solid" size="xl" label="XL" />
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
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip variant="solid" loading label="Loading..." />
        <Chip variant="soft" loading color="success" label="Processing" />
        <Chip variant="outlined" loading color="primary" label="Saving" />
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
          Sorbet UI Chip
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A comprehensive chip component with 5 variants, 7 colors, 5 sizes, and loading states.
        </Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Variants
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Chip variant="solid" label="Solid" />
          <Chip variant="soft" label="Soft" />
          <Chip variant="outlined" label="Outlined" />
          <Chip variant="ghost" label="Ghost" />
          <Chip variant="plain" label="Plain" />
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Colors
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Chip color="primary" label="Primary" />
          <Chip color="secondary" label="Secondary" />
          <Chip color="success" label="Success" />
          <Chip color="warning" label="Warning" />
          <Chip color="danger" label="Danger" />
          <Chip color="info" label="Info" />
          <Chip color="neutral" label="Neutral" />
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Sizes
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 1 }}
          alignItems="center"
          flexWrap="wrap"
          useFlexGap
        >
          <Chip size="xs" label="XS" />
          <Chip size="sm" label="SM" />
          <Chip size="md" label="MD" />
          <Chip size="lg" label="LG" />
          <Chip size="xl" label="XL" />
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          States
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Chip label="Normal" />
          <Chip loading label="Loading" />
          <Chip disabled label="Disabled" />
          <Chip onDelete={() => {}} label="Deletable" />
        </Stack>
      </Box>
    </Stack>
  ),
};
