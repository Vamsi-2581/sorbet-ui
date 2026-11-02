import { Box, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { Meta, StoryObj } from 'storybook/react';
import { expect, fn, userEvent } from 'storybook/test';
import { Pagination } from './Pagination';

// =============================================================================
// META
// =============================================================================

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    count: 10,
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
      description: 'Pagination size',
    },
    count: {
      control: { type: 'number' },
      description: 'Total number of pages',
    },
    siblingCount: {
      control: { type: 'number' },
      description: 'Number of sibling pages',
    },
    boundaryCount: {
      control: { type: 'number' },
      description: 'Number of boundary pages',
    },
    showFirstButton: {
      control: { type: 'boolean' },
      description: 'Show first page button',
    },
    showLastButton: {
      control: { type: 'boolean' },
      description: 'Show last page button',
    },
    hideNextButton: {
      control: { type: 'boolean' },
      description: 'Hide next button',
    },
    hidePrevButton: {
      control: { type: 'boolean' },
      description: 'Hide previous button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable pagination',
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// VARIANT STORIES
// =============================================================================

export const Solid: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    color: 'primary',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    color: 'neutral',
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    color: 'primary',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        5 Pagination Variants
      </Typography>
      {(['solid', 'soft', 'outlined', 'ghost', 'plain'] as const).map((variant) => (
        <Box key={variant}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Typography>
          <Pagination count={10} variant={variant} />
        </Box>
      ))}
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
        Color Schemes (Solid Variant)
      </Typography>
      {(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'] as const).map(
        (color) => (
          <Box key={color}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Typography>
            <Pagination count={10} variant="solid" color={color} />
          </Box>
        )
      )}
    </Stack>
  ),
};

export const SoftColors: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Color Schemes (Soft Variant)
      </Typography>
      {(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'] as const).map(
        (color) => (
          <Box key={color}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Typography>
            <Pagination count={10} variant="soft" color={color} />
          </Box>
        )
      )}
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
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Box key={size}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Size: {size.toUpperCase()}
          </Typography>
          <Pagination count={10} size={size} variant="outlined" />
        </Box>
      ))}
    </Stack>
  ),
};

// =============================================================================
// FEATURE STORIES
// =============================================================================

export const WithFirstLastButtons: Story = {
  args: {
    count: 20,
    showFirstButton: true,
    showLastButton: true,
    variant: 'outlined',
  },
};

export const HiddenNavigation: Story = {
  args: {
    count: 10,
    hideNextButton: true,
    hidePrevButton: true,
    variant: 'outlined',
  },
};

export const CustomSiblingCount: Story = {
  args: {
    count: 20,
    siblingCount: 2,
    variant: 'outlined',
  },
};

export const CustomBoundaryCount: Story = {
  args: {
    count: 20,
    boundaryCount: 2,
    variant: 'outlined',
  },
};

export const Disabled: Story = {
  args: {
    count: 10,
    disabled: true,
    variant: 'outlined',
  },
};

// =============================================================================
// CONTROLLED STORIES
// =============================================================================

export const Controlled: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);

    return (
      <Stack spacing={2}>
        <Typography variant="body2">Current Page: {page}</Typography>
        <Pagination
          count={10}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          variant="solid"
          color="primary"
        />
      </Stack>
    );
  },
};

// =============================================================================
// INTERACTION STORIES
// =============================================================================

export const Clickable: Story = {
  args: {
    count: 10,
    variant: 'outlined',
  },
  play: async ({ args, canvas }) => {
    const buttons = canvas.getAllByRole('button');
    // Find page 2 button
    const page2 = buttons.find((btn) => btn.textContent === '2');
    if (page2) {
      await userEvent.click(page2);
      await expect(args.onChange).toHaveBeenCalled();
    }
  },
};

// =============================================================================
// ACCESSIBILITY STORIES
// =============================================================================

export const Accessibility: Story = {
  args: {
    count: 10,
    'aria-label': 'Page navigation',
    variant: 'outlined',
  },
  play: async ({ canvas }) => {
    const nav = canvas.getByRole('navigation');
    await expect(nav).toHaveAttribute('aria-label', 'Page navigation');
  },
};

// =============================================================================
// FULL DEMO
// =============================================================================

export const FullDemo: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);

    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Sorbet UI Pagination
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            A comprehensive pagination component with 5 variants, 7 colors, 5 sizes, and full
            navigation controls.
          </Typography>
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary">
            Variants
          </Typography>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Pagination count={10} variant="solid" page={page} onChange={(_, p) => setPage(p)} />
            <Pagination count={10} variant="soft" page={page} onChange={(_, p) => setPage(p)} />
            <Pagination count={10} variant="outlined" page={page} onChange={(_, p) => setPage(p)} />
            <Pagination count={10} variant="ghost" page={page} onChange={(_, p) => setPage(p)} />
            <Pagination count={10} variant="plain" page={page} onChange={(_, p) => setPage(p)} />
          </Stack>
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary">
            With All Navigation Controls
          </Typography>
          <Pagination
            count={20}
            page={page}
            onChange={(_, p) => setPage(p)}
            showFirstButton
            showLastButton
            variant="solid"
            color="primary"
          />
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary">
            Current Page: {page}
          </Typography>
        </Box>
      </Stack>
    );
  },
};
