import { Box, Stack, Typography } from '@mui/material';
import { Meta, StoryObj } from 'storybook/react';
import { expect, fn, userEvent } from 'storybook/test';
import { Alert } from './Alert';

const meta = {
  title: 'Atoms/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    onClose: fn(),
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
      description: 'Alert size',
    },
    severity: {
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'error'],
      description: 'Alert severity (sets default color)',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Show close button',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: 'solid',
    severity: 'success',
    children: 'This is a solid success alert!',
  },
  play: async ({ canvas }) => {
    const alert = canvas.getByRole('alert');
    await expect(alert).toBeInTheDocument();
    await expect(alert).toHaveClass('MuiAlert-root');
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    severity: 'info',
    children: 'This is a soft info alert!',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    severity: 'warning',
    children: 'This is an outlined warning alert!',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    severity: 'error',
    children: 'This is a ghost error alert!',
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    severity: 'info',
    children: 'This is a plain info alert!',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert variant="solid" severity="success">
        Solid Success Alert
      </Alert>
      <Alert variant="soft" severity="info">
        Soft Info Alert
      </Alert>
      <Alert variant="outlined" severity="warning">
        Outlined Warning Alert
      </Alert>
      <Alert variant="ghost" severity="error">
        Ghost Error Alert
      </Alert>
      <Alert variant="plain" severity="success">
        Plain Success Alert
      </Alert>
    </Stack>
  ),
};

export const AllSeverities: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert variant="soft" severity="success">
        Success Alert
      </Alert>
      <Alert variant="soft" severity="info">
        Info Alert
      </Alert>
      <Alert variant="soft" severity="warning">
        Warning Alert
      </Alert>
      <Alert variant="soft" severity="error">
        Error Alert
      </Alert>
    </Stack>
  ),
};

export const Closeable: Story = {
  args: {
    variant: 'outlined',
    severity: 'warning',
    onClose: fn(),
    children: 'This is a closeable alert!',
  },
  play: async ({ args, canvas }) => {
    const alert = canvas.getByRole('alert');

    // Verify alert is present
    await expect(alert).toBeInTheDocument();

    // Find and click the close button
    const closeButton = alert.querySelector('button[aria-label="Close"]');
    if (closeButton) {
      await userEvent.click(closeButton);
      await expect(args.onClose).toHaveBeenCalled();
    }
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
      <Stack spacing={2}>
        <Alert variant="soft" color="primary">
          Primary Alert - Use for general information
        </Alert>
        <Alert variant="soft" color="secondary">
          Secondary Alert - Alternative styling
        </Alert>
        <Alert variant="soft" color="success">
          Success Alert - Operation completed successfully
        </Alert>
        <Alert variant="soft" color="warning">
          Warning Alert - Attention needed
        </Alert>
        <Alert variant="soft" color="danger">
          Danger Alert - Error or critical issue
        </Alert>
        <Alert variant="soft" color="info">
          Info Alert - Informational message
        </Alert>
        <Alert variant="soft" color="neutral">
          Neutral Alert - Generic notification
        </Alert>
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
      <Stack spacing={2}>
        <Alert variant="soft" size="xs" color="primary">
          Extra Small Alert (xs)
        </Alert>
        <Alert variant="soft" size="sm" color="primary">
          Small Alert (sm)
        </Alert>
        <Alert variant="soft" size="md" color="primary">
          Medium Alert (md) - Default
        </Alert>
        <Alert variant="soft" size="lg" color="primary">
          Large Alert (lg)
        </Alert>
        <Alert variant="soft" size="xl" color="primary">
          Extra Large Alert (xl)
        </Alert>
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
      <Stack spacing={2}>
        <Alert variant="soft" loading color="primary">
          Loading data...
        </Alert>
        <Alert variant="outlined" loading color="success">
          Saving changes...
        </Alert>
        <Alert variant="solid" loading color="info">
          Processing request...
        </Alert>
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// WITH ICONS
// =============================================================================

export const WithIcons: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Alerts with Icons (via severity or custom icon)
      </Typography>
      <Stack spacing={2}>
        <Alert severity="success">Success - Uses default success icon</Alert>
        <Alert severity="info">Info - Uses default info icon</Alert>
        <Alert severity="warning">Warning - Uses default warning icon</Alert>
        <Alert severity="error">Error - Uses default error icon</Alert>
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
          Sorbet UI Alert
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A comprehensive alert component with 5 variants, 7 colors, 5 sizes, loading states, and
          close functionality.
        </Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Variants
        </Typography>
        <Stack spacing={1} sx={{ mt: 1 }}>
          <Alert variant="solid" color="primary">
            Solid Alert
          </Alert>
          <Alert variant="soft" color="primary">
            Soft Alert
          </Alert>
          <Alert variant="outlined" color="primary">
            Outlined Alert
          </Alert>
          <Alert variant="ghost" color="primary">
            Ghost Alert
          </Alert>
          <Alert variant="plain" color="primary">
            Plain Alert
          </Alert>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Colors × Soft Variant
        </Typography>
        <Stack spacing={1} sx={{ mt: 1 }}>
          <Alert variant="soft" color="success">
            Success
          </Alert>
          <Alert variant="soft" color="warning">
            Warning
          </Alert>
          <Alert variant="soft" color="danger">
            Danger
          </Alert>
          <Alert variant="soft" color="info">
            Info
          </Alert>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          States
        </Typography>
        <Stack spacing={1} sx={{ mt: 1 }}>
          <Alert variant="soft" color="primary">
            Normal Alert
          </Alert>
          <Alert variant="soft" loading color="primary">
            Loading Alert
          </Alert>
          <Alert variant="soft" closable color="primary">
            Closable Alert
          </Alert>
        </Stack>
      </Box>
    </Stack>
  ),
};
