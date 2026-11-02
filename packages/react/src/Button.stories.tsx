import { Box, Stack, Typography } from '@mui/material';
import { Meta, StoryObj } from 'storybook/react';
import { expect, fn, userEvent } from 'storybook/test';
import { Button } from './Button';

// Sample icons for demos
const PlusIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const HeartIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);
const DownloadIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const SearchIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
  </svg>
);

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'soft', 'outlined', 'dash', 'ghost', 'plain', 'link'],
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
      description: 'Button size',
    },
    shape: {
      control: { type: 'select' },
      options: ['default', 'wide', 'block', 'square', 'circle'],
      description: 'Shape modifier',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    loadingPosition: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: 'Position of loading indicator',
    },
    active: {
      control: { type: 'boolean' },
      description: 'Show active/pressed state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the button',
    },
    disableElevation: {
      control: { type: 'boolean' },
      description: 'Disable hover lift animation',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// VARIANT STORIES
// =============================================================================

export const Solid: Story = {
  args: {
    variant: 'solid',
    children: 'Solid Button',
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    children: 'Soft Button',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined Button',
  },
};

export const Dash: Story = {
  args: {
    variant: 'dash',
    children: 'Dash Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    children: 'Plain Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        7 Variant Presets
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Button variant="solid">Solid</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="dash">Dash</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="plain">Plain</Button>
        <Button variant="link">Link</Button>
      </Stack>
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
        7 Color Options × 7 Variants
      </Typography>
      {(['solid', 'soft', 'outlined', 'dash', 'ghost', 'plain', 'link'] as const).map((variant) => (
        <Box key={variant}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Button variant={variant} color="primary">
              Primary
            </Button>
            <Button variant={variant} color="secondary">
              Secondary
            </Button>
            <Button variant={variant} color="success">
              Success
            </Button>
            <Button variant={variant} color="warning">
              Warning
            </Button>
            <Button variant={variant} color="danger">
              Danger
            </Button>
            <Button variant={variant} color="info">
              Info
            </Button>
            <Button variant={variant} color="neutral">
              Neutral
            </Button>
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
        5 Size Options (DaisyUI-inspired scale)
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
        <Button size="xs">Xsmall</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Xlarge</Button>
      </Stack>
      <Typography variant="caption" color="text.secondary">
        Heights: xs=24px, sm=32px, md=40px, lg=48px, xl=56px
      </Typography>
    </Stack>
  ),
};

// =============================================================================
// SHAPE STORIES
// =============================================================================

export const Shapes: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="subtitle2" color="text.secondary">
        Shape Modifiers
      </Typography>

      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Default
        </Typography>
        <Button>Default Button</Button>
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Wide (max 256px)
        </Typography>
        <Button shape="wide">Wide Button</Button>
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Block (full width)
        </Typography>
        <Button shape="block">Block Button</Button>
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Square & Circle
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button shape="square" size="xs" aria-label="Add">
            <PlusIcon />
          </Button>
          <Button shape="square" size="sm" aria-label="Add">
            <PlusIcon />
          </Button>
          <Button shape="square" size="md" aria-label="Add">
            <PlusIcon />
          </Button>
          <Button shape="square" size="lg" aria-label="Add">
            <PlusIcon />
          </Button>
          <Button shape="square" size="xl" aria-label="Add">
            <PlusIcon />
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Button shape="circle" size="xs" color="danger" aria-label="Like">
            <HeartIcon />
          </Button>
          <Button shape="circle" size="sm" color="danger" aria-label="Like">
            <HeartIcon />
          </Button>
          <Button shape="circle" size="md" color="danger" aria-label="Like">
            <HeartIcon />
          </Button>
          <Button shape="circle" size="lg" color="danger" aria-label="Like">
            <HeartIcon />
          </Button>
          <Button shape="circle" size="xl" color="danger" aria-label="Like">
            <HeartIcon />
          </Button>
        </Stack>
      </Box>
    </Stack>
  ),
};

// =============================================================================
// STATE STORIES
// =============================================================================

export const Loading: Story = {
  args: {
    variant: 'solid',
    loading: true,
    children: 'Loading...',
  },
};

export const LoadingPositions: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Loading Indicator Positions
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Button loading loadingPosition="start">
          Start
        </Button>
        <Button loading loadingPosition="center">
          Center
        </Button>
        <Button loading loadingPosition="end">
          End
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Button variant="soft" loading loadingPosition="start">
          Soft Start
        </Button>
        <Button variant="outlined" loading loadingPosition="center">
          Outlined Center
        </Button>
        <Button shape="square" loading aria-label="Loading" />
      </Stack>
    </Stack>
  ),
};

export const Active: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Active/Pressed State
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Button active>Active Solid</Button>
        <Button variant="soft" active>
          Active Soft
        </Button>
        <Button variant="outlined" active>
          Active Outlined
        </Button>
        <Button variant="ghost" active>
          Active Ghost
        </Button>
      </Stack>
    </Stack>
  ),
};

export const Disabled: Story = {
  args: {
    variant: 'solid',
    disabled: true,
    children: 'Disabled Button',
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: /disabled button/i });
    await expect(button).toBeDisabled();
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const DisabledVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Disabled State
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Button variant="solid" disabled>
          Solid
        </Button>
        <Button variant="soft" disabled>
          Soft
        </Button>
        <Button variant="outlined" disabled>
          Outlined
        </Button>
        <Button variant="dash" disabled>
          Dash
        </Button>
        <Button variant="ghost" disabled>
          Ghost
        </Button>
        <Button variant="plain" disabled>
          Plain
        </Button>
        <Button variant="link" disabled>
          Link
        </Button>
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// ICON STORIES
// =============================================================================

export const WithIcons: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Icon Support
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
        <Button startIcon={<PlusIcon />}>Create New</Button>
        <Button variant="soft" endIcon={<ArrowRightIcon />}>
          Continue
        </Button>
        <Button variant="outlined" startIcon={<DownloadIcon />}>
          Download
        </Button>
        <Button variant="ghost" startIcon={<SearchIcon />}>
          Search
        </Button>
      </Stack>

      <Typography variant="caption" color="text.secondary">
        Icon-only buttons (use shape="square" or shape="circle")
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button shape="square" variant="solid" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button shape="square" variant="soft" aria-label="Download">
          <DownloadIcon />
        </Button>
        <Button shape="circle" variant="outlined" aria-label="Search">
          <SearchIcon />
        </Button>
        <Button shape="circle" variant="ghost" aria-label="Like">
          <HeartIcon />
        </Button>
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// ANIMATION STORIES
// =============================================================================

export const Animations: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Hover & Active Animations
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Solid buttons lift on hover with shadow. Active press brings them back down.
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Button>Hover Me (with lift)</Button>
        <Button disableElevation>No Elevation</Button>
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// INTERACTION STORIES
// =============================================================================

export const Clickable: Story = {
  args: {
    variant: 'solid',
    children: 'Click Me',
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: /click me/i });
    await expect(button).not.toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

// =============================================================================
// ACCESSIBILITY STORIES
// =============================================================================

export const Accessibility: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Accessibility Features
      </Typography>
      <Typography variant="caption" color="text.secondary">
        All buttons support aria-label, aria-busy, aria-disabled, and focus-visible styling.
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Button aria-label="Submit form">With ARIA Label</Button>
        <Button variant="soft" loading aria-busy="true">
          Loading (aria-busy)
        </Button>
        <Button variant="outlined" disabled aria-disabled="true">
          Disabled
        </Button>
        <Button shape="circle" color="danger" aria-label="Delete item">
          <HeartIcon />
        </Button>
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
          Sorbet UI Button
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A comprehensive button component with 7 variants, 7 colors, 5 sizes, shape modifiers,
          loading states, icon support, hover animations, and full accessibility.
        </Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Variants
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Button variant="solid">Solid</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="dash">Dash</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="plain">Plain</Button>
          <Button variant="link">Link</Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Colors (Solid Variant)
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color="danger">Danger</Button>
          <Button color="info">Info</Button>
          <Button color="neutral">Neutral</Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Sizes
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mt: 1 }}
          flexWrap="wrap"
          useFlexGap
        >
          <Button size="xs">XS</Button>
          <Button size="sm">SM</Button>
          <Button size="md">MD</Button>
          <Button size="lg">LG</Button>
          <Button size="xl">XL</Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Shapes
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mt: 1 }}
          flexWrap="wrap"
          useFlexGap
        >
          <Button shape="square" aria-label="Add">
            <PlusIcon />
          </Button>
          <Button shape="circle" aria-label="Like">
            <HeartIcon />
          </Button>
          <Button shape="wide">Wide</Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          States
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <Button>Default</Button>
          <Button loading>Loading</Button>
          <Button active>Active</Button>
          <Button disabled>Disabled</Button>
        </Stack>
      </Box>
    </Stack>
  ),
};
