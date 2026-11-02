import { Box, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import { Meta, StoryObj } from 'storybook/react';
import { expect } from 'storybook/test';
import { Card } from './Card';

const meta = {
  title: 'Atoms/Card',
  component: Card,
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
      description: 'Card size (padding)',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading overlay',
    },
    hoverable: {
      control: { type: 'boolean' },
      description: 'Add hover effect',
    },
    clickable: {
      control: { type: 'boolean' },
      description: 'Make card clickable',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: 'solid',
  },
  render: (args) => (
    <Card {...args} sx={{ maxWidth: 400 }}>
      <CardHeader title="Solid Card" />
      <CardContent>
        <Typography>This is a solid card with primary background.</Typography>
      </CardContent>
    </Card>
  ),
  play: async ({ canvas }) => {
    const cardTitle = canvas.getByText('Solid Card');
    await expect(cardTitle).toBeInTheDocument();

    const cardContent = canvas.getByText('This is a solid card with primary background.');
    await expect(cardContent).toBeInTheDocument();
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
  },
  render: (args) => (
    <Card {...args} sx={{ maxWidth: 400 }}>
      <CardHeader title="Soft Card" />
      <CardContent>
        <Typography>This is a soft card with light background.</Typography>
      </CardContent>
    </Card>
  ),
  play: async ({ canvas }) => {
    const cardTitle = canvas.getByText('Soft Card');
    await expect(cardTitle).toBeInTheDocument();
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
  render: (args) => (
    <Card {...args} sx={{ maxWidth: 400 }}>
      <CardHeader title="Outlined Card" />
      <CardContent>
        <Typography>This is an outlined card with border.</Typography>
      </CardContent>
    </Card>
  ),
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  render: (args) => (
    <Card {...args} sx={{ maxWidth: 400 }}>
      <CardHeader title="Ghost Card" />
      <CardContent>
        <Typography>This is a ghost card with minimal styling.</Typography>
      </CardContent>
    </Card>
  ),
};

export const Plain: Story = {
  args: {
    variant: 'plain',
  },
  render: (args) => (
    <Card {...args} sx={{ maxWidth: 400 }}>
      <CardHeader title="Plain Card" />
      <CardContent>
        <Typography>This is a plain card without shadows or borders.</Typography>
      </CardContent>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={2}>
      <Card variant="solid" sx={{ maxWidth: 400 }}>
        <CardHeader title="Solid" />
        <CardContent>
          <Typography variant="body2">Solid variant</Typography>
        </CardContent>
      </Card>
      <Card variant="soft" sx={{ maxWidth: 400 }}>
        <CardHeader title="Soft" />
        <CardContent>
          <Typography variant="body2">Soft variant</Typography>
        </CardContent>
      </Card>
      <Card variant="outlined" sx={{ maxWidth: 400 }}>
        <CardHeader title="Outlined" />
        <CardContent>
          <Typography variant="body2">Outlined variant</Typography>
        </CardContent>
      </Card>
      <Card variant="ghost" sx={{ maxWidth: 400 }}>
        <CardHeader title="Ghost" />
        <CardContent>
          <Typography variant="body2">Ghost variant</Typography>
        </CardContent>
      </Card>
      <Card variant="plain" sx={{ maxWidth: 400 }}>
        <CardHeader title="Plain" />
        <CardContent>
          <Typography variant="body2">Plain variant</Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// =============================================================================
// COLOR STORIES
// =============================================================================

export const Colors: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        7 Color Options (Soft Variant)
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Card variant="soft" color="primary" sx={{ width: 150 }}>
          <CardContent>
            <Typography variant="body2">Primary</Typography>
          </CardContent>
        </Card>
        <Card variant="soft" color="secondary" sx={{ width: 150 }}>
          <CardContent>
            <Typography variant="body2">Secondary</Typography>
          </CardContent>
        </Card>
        <Card variant="soft" color="success" sx={{ width: 150 }}>
          <CardContent>
            <Typography variant="body2">Success</Typography>
          </CardContent>
        </Card>
        <Card variant="soft" color="warning" sx={{ width: 150 }}>
          <CardContent>
            <Typography variant="body2">Warning</Typography>
          </CardContent>
        </Card>
        <Card variant="soft" color="danger" sx={{ width: 150 }}>
          <CardContent>
            <Typography variant="body2">Danger</Typography>
          </CardContent>
        </Card>
        <Card variant="soft" color="info" sx={{ width: 150 }}>
          <CardContent>
            <Typography variant="body2">Info</Typography>
          </CardContent>
        </Card>
        <Card variant="soft" color="neutral" sx={{ width: 150 }}>
          <CardContent>
            <Typography variant="body2">Neutral</Typography>
          </CardContent>
        </Card>
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
        5 Size Options (Padding)
      </Typography>
      <Stack direction="row" spacing={2} alignItems="flex-start" flexWrap="wrap" useFlexGap>
        <Card variant="outlined" size="xs" sx={{ width: 120 }}>
          <CardContent>
            <Typography variant="caption">XS</Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" size="sm" sx={{ width: 140 }}>
          <CardContent>
            <Typography variant="body2">SM</Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" size="md" sx={{ width: 160 }}>
          <CardContent>
            <Typography>MD</Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" size="lg" sx={{ width: 180 }}>
          <CardContent>
            <Typography>LG</Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" size="xl" sx={{ width: 200 }}>
          <CardContent>
            <Typography>XL</Typography>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// INTERACTIVE STATES
// =============================================================================

export const Hoverable: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Hover Effect
      </Typography>
      <Stack direction="row" spacing={2}>
        <Card variant="outlined" hoverable sx={{ width: 200 }}>
          <CardContent>
            <Typography variant="body2">Hover me!</Typography>
          </CardContent>
        </Card>
        <Card variant="soft" hoverable sx={{ width: 200 }}>
          <CardContent>
            <Typography variant="body2">Hover me!</Typography>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  ),
};

export const Clickable: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Clickable Cards
      </Typography>
      <Stack direction="row" spacing={2}>
        <Card variant="outlined" clickable sx={{ width: 200 }}>
          <CardContent>
            <Typography variant="body2">Click me!</Typography>
          </CardContent>
        </Card>
        <Card variant="soft" clickable color="primary" sx={{ width: 200 }}>
          <CardContent>
            <Typography variant="body2">Click me!</Typography>
          </CardContent>
        </Card>
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
      <Stack direction="row" spacing={2}>
        <Card variant="outlined" loading sx={{ width: 200, height: 100 }}>
          <CardContent>
            <Typography variant="body2">Loading...</Typography>
          </CardContent>
        </Card>
        <Card variant="soft" loading color="primary" sx={{ width: 200, height: 100 }}>
          <CardContent>
            <Typography variant="body2">Loading...</Typography>
          </CardContent>
        </Card>
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
          Sorbet UI Card
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A comprehensive card component with 5 variants, 7 colors, 5 sizes, hover/click states, and
          loading.
        </Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Variants
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Card variant="solid" sx={{ width: 100 }}>
            <CardContent>Solid</CardContent>
          </Card>
          <Card variant="soft" sx={{ width: 100 }}>
            <CardContent>Soft</CardContent>
          </Card>
          <Card variant="outlined" sx={{ width: 100 }}>
            <CardContent>Outlined</CardContent>
          </Card>
          <Card variant="ghost" sx={{ width: 100 }}>
            <CardContent>Ghost</CardContent>
          </Card>
          <Card variant="plain" sx={{ width: 100 }}>
            <CardContent>Plain</CardContent>
          </Card>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Colors × Outlined
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Card variant="outlined" color="primary" sx={{ width: 80 }}>
            <CardContent>PR</CardContent>
          </Card>
          <Card variant="outlined" color="success" sx={{ width: 80 }}>
            <CardContent>SU</CardContent>
          </Card>
          <Card variant="outlined" color="warning" sx={{ width: 80 }}>
            <CardContent>WA</CardContent>
          </Card>
          <Card variant="outlined" color="danger" sx={{ width: 80 }}>
            <CardContent>DA</CardContent>
          </Card>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          States
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Card variant="outlined" sx={{ width: 100 }}>
            <CardContent>Normal</CardContent>
          </Card>
          <Card variant="outlined" hoverable sx={{ width: 100 }}>
            <CardContent>Hover</CardContent>
          </Card>
          <Card variant="outlined" loading sx={{ width: 100, height: 60 }}>
            <CardContent>Load</CardContent>
          </Card>
        </Stack>
      </Box>
    </Stack>
  ),
};
