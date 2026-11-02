import { Box, Stack, Typography } from '@mui/material';
import { Meta, StoryObj } from 'storybook/react';
import { expect, fn } from 'storybook/test';
import { BreadcrumbItem, Breadcrumbs } from './Breadcrumbs';

// =============================================================================
// SAMPLE DATA
// =============================================================================

const basicItems: BreadcrumbItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'category', label: 'Electronics', href: '/products/electronics' },
  { id: 'item', label: 'Smartphones' },
];

const IconHome = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconFolder = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconFile = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const itemsWithIcons: BreadcrumbItem[] = [
  { id: 'home', label: 'Home', href: '/', icon: <IconHome /> },
  { id: 'documents', label: 'Documents', href: '/documents', icon: <IconFolder /> },
  { id: 'reports', label: 'Reports', href: '/documents/reports', icon: <IconFolder /> },
  { id: 'q4', label: 'Q4 Report.pdf', icon: <IconFile /> },
];

const manyItems: BreadcrumbItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'level1', label: 'Level 1', href: '/level1' },
  { id: 'level2', label: 'Level 2', href: '/level1/level2' },
  { id: 'level3', label: 'Level 3', href: '/level1/level2/level3' },
  { id: 'level4', label: 'Level 4', href: '/level1/level2/level3/level4' },
  { id: 'level5', label: 'Level 5', href: '/level1/level2/level3/level4/level5' },
  { id: 'level6', label: 'Level 6', href: '/level1/level2/level3/level4/level5/level6' },
  { id: 'level7', label: 'Level 7', href: '/level1/level2/level3/level4/level5/level6/level7' },
  { id: 'current', label: 'Current Page' },
];

// =============================================================================
// META
// =============================================================================

const meta = {
  title: 'Molecules/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  args: {
    items: basicItems,
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
      description: 'Breadcrumbs size',
    },
    maxItems: {
      control: { type: 'number' },
      description: 'Maximum items before collapsing',
    },
    itemsBeforeCollapse: {
      control: { type: 'number' },
      description: 'Items shown before ellipsis',
    },
    itemsAfterCollapse: {
      control: { type: 'number' },
      description: 'Items shown after ellipsis',
    },
    expandable: {
      control: { type: 'boolean' },
      description: 'Allow expanding collapsed items',
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// VARIANT STORIES
// =============================================================================

export const Solid: Story = {
  args: {
    variant: 'solid',
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
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        5 Breadcrumb Variants
      </Typography>
      {(['solid', 'soft', 'outlined', 'ghost', 'plain'] as const).map((variant) => (
        <Box key={variant}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Typography>
          <Breadcrumbs items={basicItems} variant={variant} />
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
        Color Schemes (Soft Variant)
      </Typography>
      {(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'] as const).map(
        (color) => (
          <Box key={color}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Typography>
            <Breadcrumbs items={basicItems} variant="soft" color={color} />
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
          <Breadcrumbs items={basicItems} size={size} variant="outlined" />
        </Box>
      ))}
    </Stack>
  ),
};

// =============================================================================
// FEATURE STORIES
// =============================================================================

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
    variant: 'plain',
  },
};

export const Collapsed: Story = {
  args: {
    items: manyItems,
    maxItems: 4,
    variant: 'outlined',
  },
};

export const CollapsedCustom: Story = {
  args: {
    items: manyItems,
    maxItems: 5,
    itemsBeforeCollapse: 2,
    itemsAfterCollapse: 2,
    variant: 'outlined',
  },
};

export const CustomSeparator: Story = {
  args: {
    items: basicItems,
    separator: '/',
    variant: 'plain',
  },
};

export const ArrowSeparator: Story = {
  args: {
    items: basicItems,
    separator: '→',
    variant: 'plain',
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'disabled', label: 'Disabled', disabled: true },
      { id: 'current', label: 'Current Page' },
    ],
    variant: 'plain',
  },
};

export const WithClickHandler: Story = {
  render: () => {
    const handleClick = fn();
    const items: BreadcrumbItem[] = [
      { id: 'home', label: 'Home', onClick: () => handleClick('home') },
      { id: 'products', label: 'Products', onClick: () => handleClick('products') },
      { id: 'current', label: 'Current Page' },
    ];

    return (
      <Stack spacing={2}>
        <Typography variant="body2">Click a breadcrumb to trigger the handler</Typography>
        <Breadcrumbs items={items} variant="ghost" />
      </Stack>
    );
  },
};

// =============================================================================
// ACCESSIBILITY STORIES
// =============================================================================

export const Accessibility: Story = {
  args: {
    items: basicItems,
    'aria-label': 'Site navigation',
    variant: 'plain',
  },
  play: async ({ canvas }) => {
    const nav = canvas.getByRole('navigation');
    await expect(nav).toHaveAttribute('aria-label', 'Site navigation');

    // Check last item has aria-current
    const currentPage = canvas.getByText('Smartphones');
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
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
          Sorbet UI Breadcrumbs
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A comprehensive breadcrumbs component with 5 variants, 7 colors, 5 sizes, icons, and
          collapsible navigation.
        </Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Solid (with background)
        </Typography>
        <Breadcrumbs items={itemsWithIcons} variant="solid" />
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Soft (tinted background)
        </Typography>
        <Breadcrumbs items={itemsWithIcons} variant="soft" color="primary" />
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Outlined (bordered)
        </Typography>
        <Breadcrumbs items={basicItems} variant="outlined" />
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Ghost (hover effect)
        </Typography>
        <Breadcrumbs items={basicItems} variant="ghost" />
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Plain (minimal)
        </Typography>
        <Breadcrumbs items={basicItems} variant="plain" />
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Collapsed (many items)
        </Typography>
        <Breadcrumbs items={manyItems} maxItems={4} variant="outlined" />
      </Box>
    </Stack>
  ),
};
