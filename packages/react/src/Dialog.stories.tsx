import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Meta, StoryObj } from 'storybook/react';
import { expect } from 'storybook/test';
import { Button } from './Button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from './Dialog';

const meta = {
  title: 'Molecules/Dialog',
  component: Dialog,
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
      description: 'Dialog size',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading overlay',
    },
    maxWidth: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function DialogExample({
  variant,
}: {
  variant?: 'solid' | 'soft' | 'outlined' | 'ghost' | 'plain';
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="soft">
        Open Dialog
      </Button>
      <Dialog open={open} onClose={handleClose} variant={variant} maxWidth="sm">
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          This is a dialog with {variant} variant. It provides focused interaction with the user.
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} variant="ghost">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="solid">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export const Solid: Story = {
  render: () => <DialogExample variant="solid" />,
  play: async ({ canvas }) => {
    const openButton = canvas.getByRole('button', { name: /open dialog/i });
    await expect(openButton).toBeInTheDocument();
  },
};

export const Soft: Story = {
  render: () => <DialogExample variant="soft" />,
};

export const Outlined: Story = {
  render: () => <DialogExample variant="outlined" />,
};

export const Ghost: Story = {
  render: () => <DialogExample variant="ghost" />,
};

export const Plain: Story = {
  render: () => <DialogExample variant="plain" />,
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <DialogExample variant="solid" />
      <DialogExample variant="soft" />
      <DialogExample variant="outlined" />
      <DialogExample variant="ghost" />
      <DialogExample variant="plain" />
    </Stack>
  ),
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole('button', { name: /open dialog/i });
    await expect(buttons).toHaveLength(5);
  },
};

export const FullWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <Button onClick={handleOpen} variant="soft">
          Open Full Width Dialog
        </Button>
        <Dialog open={open} onClose={handleClose} variant="solid" fullWidth maxWidth="md">
          <DialogTitle>Full Width Dialog</DialogTitle>
          <DialogContent sx={{ py: 2 }}>
            This dialog takes the full width of the screen (constrained by maxWidth).
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClose} variant="ghost">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

export const Scrollable: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <Button onClick={handleOpen} variant="soft">
          Open Scrollable Dialog
        </Button>
        <Dialog open={open} onClose={handleClose} variant="solid" maxWidth="sm">
          <DialogTitle>Scrollable Dialog</DialogTitle>
          <DialogContent dividers sx={{ py: 2 }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i}>Line {i + 1}</div>
            ))}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClose} variant="ghost">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

// =============================================================================
// COLOR STORIES
// =============================================================================

export const Colors: Story = {
  render: () => {
    const [openColor, setOpenColor] = useState<string | null>(null);
    const colors = [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
      'neutral',
    ] as const;

    return (
      <Stack spacing={3}>
        <Typography variant="subtitle2" color="text.secondary">
          7 Color Options
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {colors.map((color) => (
            <Box key={color}>
              <Button onClick={() => setOpenColor(color)} variant="soft" color={color}>
                {color}
              </Button>
              <Dialog
                open={openColor === color}
                onClose={() => setOpenColor(null)}
                variant="soft"
                color={color}
                maxWidth="xs"
              >
                <DialogTitle>{color.charAt(0).toUpperCase() + color.slice(1)} Dialog</DialogTitle>
                <DialogContent>
                  <Typography>This dialog uses the {color} color scheme.</Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenColor(null)} variant="ghost">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          ))}
        </Stack>
      </Stack>
    );
  },
};

// =============================================================================
// SIZE STORIES
// =============================================================================

export const Sizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<string | null>(null);
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    return (
      <Stack spacing={3}>
        <Typography variant="subtitle2" color="text.secondary">
          5 Size Options
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {sizes.map((size) => (
            <Box key={size}>
              <Button onClick={() => setOpenSize(size)} variant="soft" size={size}>
                {size.toUpperCase()}
              </Button>
              <Dialog
                open={openSize === size}
                onClose={() => setOpenSize(null)}
                variant="outlined"
                size={size}
                maxWidth="sm"
              >
                <DialogTitle>{size.toUpperCase()} Size Dialog</DialogTitle>
                <DialogContent>
                  <Typography>This dialog uses {size} size with adjusted padding.</Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenSize(null)} variant="ghost">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          ))}
        </Stack>
      </Stack>
    );
  },
};

// =============================================================================
// LOADING STATE
// =============================================================================

export const Loading: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)} variant="soft">
          Open Loading Dialog
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)} variant="outlined" loading maxWidth="sm">
          <DialogTitle>Loading Dialog</DialogTitle>
          <DialogContent>
            <Typography>
              This dialog shows a loading overlay while data is being fetched.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} variant="ghost">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

// =============================================================================
// FULL DEMO
// =============================================================================

export const FullDemo: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState<'solid' | 'soft' | 'outlined' | 'ghost' | 'plain'>(
      'outlined'
    );
    const [color, setColor] = useState<'primary' | 'success' | 'danger'>('primary');

    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Sorbet UI Dialog
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            A comprehensive dialog with 5 variants, 7 colors, 5 sizes, loading states, and
            animations.
          </Typography>
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary">
            Configure & Open
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
            <Button
              variant={variant === 'solid' ? 'solid' : 'ghost'}
              onClick={() => setVariant('solid')}
            >
              Solid
            </Button>
            <Button
              variant={variant === 'soft' ? 'solid' : 'ghost'}
              onClick={() => setVariant('soft')}
            >
              Soft
            </Button>
            <Button
              variant={variant === 'outlined' ? 'solid' : 'ghost'}
              onClick={() => setVariant('outlined')}
            >
              Outlined
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
            <Button
              color={color === 'primary' ? 'primary' : 'neutral'}
              variant="soft"
              onClick={() => setColor('primary')}
            >
              Primary
            </Button>
            <Button
              color={color === 'success' ? 'success' : 'neutral'}
              variant="soft"
              onClick={() => setColor('success')}
            >
              Success
            </Button>
            <Button
              color={color === 'danger' ? 'danger' : 'neutral'}
              variant="soft"
              onClick={() => setColor('danger')}
            >
              Danger
            </Button>
          </Stack>
          <Button onClick={() => setOpen(true)} variant="solid" color={color} sx={{ mt: 2 }}>
            Open Dialog
          </Button>
        </Box>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          variant={variant}
          color={color}
          maxWidth="sm"
        >
          <DialogTitle>Sorbet UI Dialog Demo</DialogTitle>
          <DialogContent>
            <Typography>
              Variant: <strong>{variant}</strong>, Color: <strong>{color}</strong>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} variant="ghost">
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)} variant="solid" color={color}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    );
  },
};
