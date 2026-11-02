import { Box, Stack, Typography } from '@mui/material';
import { Meta, StoryObj } from 'storybook/react';
import { expect, fn } from 'storybook/test';
import { MenuItem, Select } from './Select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
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
      description: 'Select size',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the select',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Show error state',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = (
  <>
    <MenuItem value="option1">Option 1</MenuItem>
    <MenuItem value="option2">Option 2</MenuItem>
    <MenuItem value="option3">Option 3</MenuItem>
  </>
);

// =============================================================================
// VARIANT STORIES
// =============================================================================

export const Solid: Story = {
  args: {
    variant: 'solid',
    label: 'Solid Select',
    defaultValue: 'option1',
    children: options,
    sx: { minWidth: 200 },
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    label: 'Soft Select',
    defaultValue: 'option1',
    children: options,
    sx: { minWidth: 200 },
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined Select',
    defaultValue: 'option1',
    children: options,
    sx: { minWidth: 200 },
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Select',
    defaultValue: 'option1',
    children: options,
    sx: { minWidth: 200 },
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    label: 'Plain Select',
    defaultValue: 'option1',
    children: options,
    sx: { minWidth: 200 },
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        5 Variant Presets
      </Typography>
      <Stack spacing={2} sx={{ maxWidth: 300 }}>
        <Select variant="solid" label="Solid" defaultValue="option1">
          {options}
        </Select>
        <Select variant="soft" label="Soft" defaultValue="option1">
          {options}
        </Select>
        <Select variant="outlined" label="Outlined" defaultValue="option1">
          {options}
        </Select>
        <Select variant="ghost" label="Ghost" defaultValue="option1">
          {options}
        </Select>
        <Select variant="plain" label="Plain" defaultValue="option1">
          {options}
        </Select>
      </Stack>
    </Stack>
  ),
  play: async ({ canvas }) => {
    const selects = canvas.getAllByRole('combobox');
    await expect(selects).toHaveLength(5);
  },
};

// =============================================================================
// COLOR STORIES
// =============================================================================

export const Colors: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        7 Color Options (Outlined Variant)
      </Typography>
      <Stack spacing={2} sx={{ maxWidth: 300 }}>
        {(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'] as const).map(
          (color) => (
            <Select
              key={color}
              color={color}
              label={color.charAt(0).toUpperCase() + color.slice(1)}
              defaultValue="option1"
            >
              {options}
            </Select>
          )
        )}
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
      <Stack spacing={2} sx={{ maxWidth: 350 }}>
        <Select size="xs" label="Extra Small" defaultValue="option1">
          {options}
        </Select>
        <Select size="sm" label="Small" defaultValue="option1">
          {options}
        </Select>
        <Select size="md" label="Medium" defaultValue="option1">
          {options}
        </Select>
        <Select size="lg" label="Large" defaultValue="option1">
          {options}
        </Select>
        <Select size="xl" label="Extra Large" defaultValue="option1">
          {options}
        </Select>
      </Stack>
    </Stack>
  ),
  play: async ({ canvas }) => {
    const selects = canvas.getAllByRole('combobox');
    await expect(selects).toHaveLength(5);
  },
};

// =============================================================================
// STATE STORIES
// =============================================================================

export const Loading: Story = {
  args: {
    loading: true,
    label: 'Loading',
    defaultValue: 'option1',
    children: options,
    sx: { minWidth: 200 },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled',
    defaultValue: 'option1',
    children: options,
    sx: { minWidth: 200 },
  },
  play: async ({ canvas }) => {
    const select = canvas.getByRole('combobox');
    const disabled = select.closest('[aria-disabled="true"]') || select.hasAttribute('disabled');
    await expect(disabled).toBeTruthy();
  },
};

export const Error: Story = {
  args: {
    error: true,
    label: 'Error',
    helperText: 'Please select an option',
    defaultValue: '',
    children: options,
    sx: { minWidth: 200 },
  },
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Select States
      </Typography>
      <Stack spacing={2} sx={{ maxWidth: 300 }}>
        <Select label="Default" defaultValue="option1">
          {options}
        </Select>
        <Select label="Loading" loading defaultValue="option1">
          {options}
        </Select>
        <Select label="Disabled" disabled defaultValue="option1">
          {options}
        </Select>
        <Select label="Error" error helperText="This field is required">
          {options}
        </Select>
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// ICON STORIES
// =============================================================================

export const WithIcon: Story = {
  args: {
    startIcon: <span>🔍</span>,
    label: 'With Icon',
    defaultValue: 'option1',
    children: options,
    sx: { minWidth: 200 },
  },
};

// =============================================================================
// INTERACTION STORIES
// =============================================================================

export const Interactive: Story = {
  args: {
    label: 'Select an option',
    defaultValue: 'option1',
    children: options,
    sx: { minWidth: 200 },
  },
  play: async ({ canvas }) => {
    const select = canvas.getByRole('combobox');
    await expect(select).toBeInTheDocument();
    await expect(select).not.toBeDisabled();
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
          Sorbet UI Select
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A comprehensive dropdown select with 5 variants, 7 colors, 5 sizes, loading states, and
          validation.
        </Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Variants
        </Typography>
        <Stack spacing={1} sx={{ mt: 1, maxWidth: 250 }}>
          <Select variant="solid" defaultValue="option1" size="sm">
            {options}
          </Select>
          <Select variant="soft" defaultValue="option1" size="sm">
            {options}
          </Select>
          <Select variant="outlined" defaultValue="option1" size="sm">
            {options}
          </Select>
          <Select variant="ghost" defaultValue="option1" size="sm">
            {options}
          </Select>
          <Select variant="plain" defaultValue="option1" size="sm">
            {options}
          </Select>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Sizes
        </Typography>
        <Stack spacing={1} sx={{ mt: 1, maxWidth: 250 }}>
          <Select size="xs" defaultValue="option1">
            {options}
          </Select>
          <Select size="sm" defaultValue="option1">
            {options}
          </Select>
          <Select size="md" defaultValue="option1">
            {options}
          </Select>
          <Select size="lg" defaultValue="option1">
            {options}
          </Select>
          <Select size="xl" defaultValue="option1">
            {options}
          </Select>
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          States
        </Typography>
        <Stack spacing={1} sx={{ mt: 1, maxWidth: 250 }}>
          <Select defaultValue="option1" size="sm">
            {options}
          </Select>
          <Select loading defaultValue="option1" size="sm">
            {options}
          </Select>
          <Select disabled defaultValue="option1" size="sm">
            {options}
          </Select>
          <Select error helperText="Error message" size="sm">
            {options}
          </Select>
        </Stack>
      </Box>
    </Stack>
  ),
};
