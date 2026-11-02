import { Box, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { Meta, StoryObj } from 'storybook/react';
import { expect, fn, userEvent } from 'storybook/test';
import { TabItem, Tabs } from './Tabs';

// =============================================================================
// SAMPLE DATA
// =============================================================================

const basicTabs: TabItem[] = [
  {
    id: 'tab1',
    label: 'Overview',
    content: <Typography>Overview content goes here. This is the first tab panel.</Typography>,
  },
  {
    id: 'tab2',
    label: 'Features',
    content: <Typography>Features content goes here. This is the second tab panel.</Typography>,
  },
  {
    id: 'tab3',
    label: 'Pricing',
    content: <Typography>Pricing content goes here. This is the third tab panel.</Typography>,
  },
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

const IconSettings = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="3" />
    <path
      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconUser = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const tabsWithIcons: TabItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <IconHome />,
    content: <Typography>Home dashboard with key metrics.</Typography>,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <IconUser />,
    content: <Typography>User profile settings and information.</Typography>,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <IconSettings />,
    content: <Typography>Application settings and preferences.</Typography>,
  },
];

const tabsWithDisabled: TabItem[] = [
  { id: 'tab1', label: 'Active Tab', content: <Typography>This tab is active.</Typography> },
  {
    id: 'tab2',
    label: 'Disabled Tab',
    disabled: true,
    content: <Typography>This tab is disabled.</Typography>,
  },
  { id: 'tab3', label: 'Another Tab', content: <Typography>This tab is also active.</Typography> },
];

// =============================================================================
// META
// =============================================================================

const meta = {
  title: 'Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    tabs: basicTabs,
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
      description: 'Tabs size',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Full width tabs',
    },
    centered: {
      control: { type: 'boolean' },
      description: 'Center tabs',
    },
    showIndicator: {
      control: { type: 'boolean' },
      description: 'Show indicator line',
    },
    renderPanels: {
      control: { type: 'boolean' },
      description: 'Render tab panels',
    },
  },
} satisfies Meta<typeof Tabs>;

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
    color: 'primary',
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
    <Stack spacing={4}>
      <Typography variant="subtitle2" color="text.secondary">
        5 Tab Variants
      </Typography>
      {(['solid', 'soft', 'outlined', 'ghost', 'plain'] as const).map((variant) => (
        <Box key={variant}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Typography>
          <Tabs tabs={basicTabs} variant={variant} renderPanels={false} />
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
    <Stack spacing={4}>
      <Typography variant="subtitle2" color="text.secondary">
        Color Schemes (Solid Variant)
      </Typography>
      {(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'] as const).map(
        (color) => (
          <Box key={color}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Typography>
            <Tabs tabs={basicTabs} variant="solid" color={color} renderPanels={false} />
          </Box>
        )
      )}
    </Stack>
  ),
};

export const SoftColors: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="subtitle2" color="text.secondary">
        Color Schemes (Soft Variant)
      </Typography>
      {(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'] as const).map(
        (color) => (
          <Box key={color}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Typography>
            <Tabs tabs={basicTabs} variant="soft" color={color} renderPanels={false} />
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
    <Stack spacing={4}>
      <Typography variant="subtitle2" color="text.secondary">
        5 Size Options
      </Typography>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Box key={size}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Size: {size.toUpperCase()}
          </Typography>
          <Tabs tabs={basicTabs} size={size} variant="outlined" renderPanels={false} />
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
    tabs: tabsWithIcons,
    variant: 'solid',
  },
};

export const DisabledTabs: Story = {
  args: {
    tabs: tabsWithDisabled,
    variant: 'outlined',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    variant: 'outlined',
  },
};

export const Centered: Story = {
  args: {
    centered: true,
    variant: 'outlined',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    variant: 'outlined',
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 200 }}>
        <Story />
      </Box>
    ),
  ],
};

export const VerticalSolid: Story = {
  args: {
    orientation: 'vertical',
    variant: 'solid',
    tabs: tabsWithIcons,
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 200 }}>
        <Story />
      </Box>
    ),
  ],
};

export const WithoutIndicator: Story = {
  args: {
    showIndicator: false,
    variant: 'outlined',
  },
};

export const WithoutPanels: Story = {
  args: {
    renderPanels: false,
    variant: 'solid',
  },
};

// =============================================================================
// CONTROLLED STORIES
// =============================================================================

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('tab1');

    return (
      <Stack spacing={2}>
        <Typography variant="body2">Selected: {value}</Typography>
        <Tabs tabs={basicTabs} value={value} onChange={setValue} variant="solid" color="primary" />
      </Stack>
    );
  },
};

// =============================================================================
// INTERACTION STORIES
// =============================================================================

export const Clickable: Story = {
  args: {
    variant: 'outlined',
    renderPanels: false,
  },
  play: async ({ args, canvas }) => {
    const tab2 = canvas.getByRole('tab', { name: 'Features' });
    await userEvent.click(tab2);
    await expect(args.onChange).toHaveBeenCalledWith('tab2');
  },
};

// =============================================================================
// ACCESSIBILITY STORIES
// =============================================================================

export const Accessibility: Story = {
  args: {
    'aria-label': 'Main navigation tabs',
    variant: 'outlined',
  },
  play: async ({ canvas }) => {
    const tablist = canvas.getByRole('tablist');
    await expect(tablist).toHaveAttribute('aria-label', 'Main navigation tabs');

    const tabs = canvas.getAllByRole('tab');
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
  },
};

// =============================================================================
// FULL DEMO
// =============================================================================

export const FullDemo: Story = {
  render: () => {
    const [value, setValue] = React.useState('home');

    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Sorbet UI Tabs
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            A comprehensive tabs component with 5 variants, 7 colors, 5 sizes, icons, and keyboard
            navigation.
          </Typography>
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary">
            Solid Tabs with Icons
          </Typography>
          <Tabs tabs={tabsWithIcons} variant="solid" value={value} onChange={setValue} />
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary">
            Soft Tabs
          </Typography>
          <Tabs
            tabs={tabsWithIcons}
            variant="soft"
            value={value}
            onChange={setValue}
            renderPanels={false}
          />
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary">
            Outlined Tabs (Full Width)
          </Typography>
          <Tabs tabs={basicTabs} variant="outlined" fullWidth renderPanels={false} />
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary">
            Ghost Tabs
          </Typography>
          <Tabs tabs={basicTabs} variant="ghost" renderPanels={false} />
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary">
            Plain Tabs (Centered)
          </Typography>
          <Tabs tabs={basicTabs} variant="plain" centered renderPanels={false} />
        </Box>
      </Stack>
    );
  },
};
