import { Box, Stack, Typography } from '@mui/material';
import { Meta, StoryObj } from 'storybook/react';
import { expect, fn, userEvent } from 'storybook/test';
import { TextField } from './TextField';

const meta = {
  title: 'Atoms/TextField',
  component: TextField,
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
      description: 'Input size',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the input',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Show error state',
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// VARIANT STORIES
// =============================================================================

export const Solid: Story = {
  args: {
    variant: 'solid',
    label: 'Solid Input',
    placeholder: 'Enter text',
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    label: 'Soft Input',
    placeholder: 'Enter text',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined Input',
    placeholder: 'Enter text',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Input',
    placeholder: 'Enter text',
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    label: 'Plain Input',
    placeholder: 'Enter text',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        5 Variant Presets
      </Typography>
      <Stack spacing={2} sx={{ maxWidth: 350 }}>
        <TextField variant="solid" label="Solid" placeholder="Enter text" />
        <TextField variant="soft" label="Soft" placeholder="Enter text" />
        <TextField variant="outlined" label="Outlined" placeholder="Enter text" />
        <TextField variant="ghost" label="Ghost" placeholder="Enter text" />
        <TextField variant="plain" label="Plain" placeholder="Enter text" />
      </Stack>
    </Stack>
  ),
  play: async ({ canvas }) => {
    const inputs = canvas.getAllByRole('textbox');
    await expect(inputs).toHaveLength(5);
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
      <Stack spacing={2} sx={{ maxWidth: 350 }}>
        <TextField color="primary" label="Primary" placeholder="Primary color" />
        <TextField color="secondary" label="Secondary" placeholder="Secondary color" />
        <TextField color="success" label="Success" placeholder="Success color" />
        <TextField color="warning" label="Warning" placeholder="Warning color" />
        <TextField color="danger" label="Danger" placeholder="Danger color" />
        <TextField color="info" label="Info" placeholder="Info color" />
        <TextField color="neutral" label="Neutral" placeholder="Neutral color" />
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
      <Stack spacing={2} sx={{ maxWidth: 400 }}>
        <TextField size="xs" label="Extra Small" placeholder="XS input" />
        <TextField size="sm" label="Small" placeholder="SM input" />
        <TextField size="md" label="Medium" placeholder="MD input" />
        <TextField size="lg" label="Large" placeholder="LG input" />
        <TextField size="xl" label="Extra Large" placeholder="XL input" />
      </Stack>
    </Stack>
  ),
  play: async ({ canvas }) => {
    const inputs = canvas.getAllByRole('textbox');
    await expect(inputs).toHaveLength(5);
  },
};

// =============================================================================
// STATE STORIES
// =============================================================================

export const Loading: Story = {
  args: {
    variant: 'outlined',
    label: 'Loading',
    loading: true,
    placeholder: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'outlined',
    label: 'Disabled',
    disabled: true,
    value: 'Disabled text',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox');
    await expect(input).toBeDisabled();
  },
};

export const Error: Story = {
  args: {
    variant: 'outlined',
    label: 'Error',
    error: true,
    helperText: 'This field has an error',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();
    const errorText = canvas.getByText('This field has an error');
    await expect(errorText).toBeInTheDocument();
  },
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        Input States
      </Typography>
      <Stack spacing={2} sx={{ maxWidth: 350 }}>
        <TextField label="Default" placeholder="Default state" />
        <TextField label="Loading" loading placeholder="Loading..." />
        <TextField label="Disabled" disabled value="Disabled input" />
        <TextField label="Error" error helperText="This field has an error" />
        <TextField label="Required" required placeholder="Required field" />
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
      <Stack spacing={2} sx={{ maxWidth: 350 }}>
        <TextField startIcon={<span>🔍</span>} label="Search" placeholder="Search..." />
        <TextField endIcon={<span>✓</span>} label="Validated" placeholder="Enter text" />
        <TextField
          startIcon={<span>📧</span>}
          endIcon={<span>→</span>}
          label="Email"
          placeholder="Enter email"
        />
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// INTERACTION STORIES
// =============================================================================

export const Interactive: Story = {
  args: {
    variant: 'outlined',
    label: 'Interactive',
    placeholder: 'Type something...',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();
    await userEvent.type(input, 'Test input');
    await expect(input).toHaveValue('Test input');
  },
};

export const Required: Story = {
  args: {
    variant: 'outlined',
    label: 'Required Field',
    required: true,
    placeholder: 'This field is required',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox');
    await expect(input).toBeRequired();
  },
};

export const WithHelperText: Story = {
  args: {
    variant: 'outlined',
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email',
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
          Sorbet UI TextField
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A comprehensive input component with 5 variants, 7 colors, 5 sizes, loading states, icon
          support, and validation.
        </Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Variants
        </Typography>
        <Stack spacing={1} sx={{ mt: 1, maxWidth: 300 }}>
          <TextField variant="solid" placeholder="Solid" size="sm" />
          <TextField variant="soft" placeholder="Soft" size="sm" />
          <TextField variant="outlined" placeholder="Outlined" size="sm" />
          <TextField variant="ghost" placeholder="Ghost" size="sm" />
          <TextField variant="plain" placeholder="Plain" size="sm" />
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Colors (Outlined)
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
          <TextField color="primary" placeholder="Primary" size="sm" sx={{ width: 120 }} />
          <TextField color="secondary" placeholder="Secondary" size="sm" sx={{ width: 120 }} />
          <TextField color="success" placeholder="Success" size="sm" sx={{ width: 120 }} />
          <TextField color="danger" placeholder="Danger" size="sm" sx={{ width: 120 }} />
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Sizes
        </Typography>
        <Stack spacing={1} sx={{ mt: 1, maxWidth: 300 }}>
          <TextField size="xs" placeholder="XS" />
          <TextField size="sm" placeholder="SM" />
          <TextField size="md" placeholder="MD" />
          <TextField size="lg" placeholder="LG" />
          <TextField size="xl" placeholder="XL" />
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          States
        </Typography>
        <Stack spacing={1} sx={{ mt: 1, maxWidth: 300 }}>
          <TextField placeholder="Default" size="sm" />
          <TextField loading placeholder="Loading" size="sm" />
          <TextField disabled value="Disabled" size="sm" />
          <TextField error helperText="Error message" size="sm" />
        </Stack>
      </Box>
    </Stack>
  ),
};
