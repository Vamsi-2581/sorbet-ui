import MovieIcon from '@mui/icons-material/Movie';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import StarIcon from '@mui/icons-material/Star';
import { Box, Stack, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Autocomplete, AutocompleteOption } from './Autocomplete';

const meta: Meta<typeof Autocomplete> = {
  title: 'Molecules/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Autocomplete component extends MUI's Autocomplete with Sorbet UI's design system.
It supports 5 variants (solid, soft, outlined, ghost, plain), 7 colors, 5 sizes,
single/multiple selection, free solo input, and custom option rendering.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outlined', 'ghost', 'plain'],
      description: 'Visual variant of the autocomplete',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'Color theme of the autocomplete',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the autocomplete',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the autocomplete is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the autocomplete takes full width',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

// Sample data
const movies: AutocompleteOption[] = [
  { label: 'The Shawshank Redemption', value: 1 },
  { label: 'The Godfather', value: 2 },
  { label: 'The Dark Knight', value: 3 },
  { label: 'Pulp Fiction', value: 4 },
  { label: 'Forrest Gump', value: 5 },
  { label: 'Inception', value: 6 },
  { label: 'The Matrix', value: 7 },
  { label: 'Interstellar', value: 8 },
  { label: 'Fight Club', value: 9 },
  { label: 'Goodfellas', value: 10 },
];

const countries: AutocompleteOption[] = [
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'Japan', value: 'JP' },
  { label: 'China', value: 'CN' },
  { label: 'India', value: 'IN' },
  { label: 'Brazil', value: 'BR' },
  { label: 'Australia', value: 'AU' },
  { label: 'Canada', value: 'CA' },
];

const categorizedOptions: AutocompleteOption[] = [
  { label: 'Avatar', value: 1, group: 'Movies', icon: <MovieIcon fontSize="small" /> },
  { label: 'Titanic', value: 2, group: 'Movies', icon: <MovieIcon fontSize="small" /> },
  { label: 'Star Wars', value: 3, group: 'Movies', icon: <MovieIcon fontSize="small" /> },
  {
    label: 'Bohemian Rhapsody',
    value: 4,
    group: 'Music',
    icon: <MusicNoteIcon fontSize="small" />,
  },
  { label: 'Thriller', value: 5, group: 'Music', icon: <MusicNoteIcon fontSize="small" /> },
  { label: 'Back in Black', value: 6, group: 'Music', icon: <MusicNoteIcon fontSize="small" /> },
  { label: 'Minecraft', value: 7, group: 'Games', icon: <SportsEsportsIcon fontSize="small" /> },
  {
    label: 'Grand Theft Auto V',
    value: 8,
    group: 'Games',
    icon: <SportsEsportsIcon fontSize="small" />,
  },
  {
    label: 'The Witcher 3',
    value: 9,
    group: 'Games',
    icon: <SportsEsportsIcon fontSize="small" />,
  },
];

const optionsWithDescription: AutocompleteOption[] = [
  {
    label: 'Premium Plan',
    value: 'premium',
    description: 'Best for power users',
    icon: <StarIcon fontSize="small" color="warning" />,
  },
  {
    label: 'Business Plan',
    value: 'business',
    description: 'Perfect for teams',
    icon: <StarIcon fontSize="small" color="primary" />,
  },
  {
    label: 'Starter Plan',
    value: 'starter',
    description: 'Great for individuals',
    icon: <StarIcon fontSize="small" color="action" />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    options: movies,
    label: 'Select a movie',
    placeholder: 'Search movies...',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    sx: { width: 300 },
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 350 }}>
      <Typography variant="h6">All Variants</Typography>
      {(['solid', 'soft', 'outlined', 'ghost', 'plain'] as const).map((variant) => (
        <Autocomplete
          key={variant}
          options={movies}
          label={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`}
          placeholder="Select movie..."
          variant={variant}
        />
      ))}
    </Stack>
  ),
};

export const AllColors: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 350 }}>
      <Typography variant="h6">All Colors</Typography>
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map(
        (color) => (
          <Autocomplete
            key={color}
            options={movies}
            label={`${color.charAt(0).toUpperCase() + color.slice(1)} Color`}
            placeholder="Select movie..."
            color={color}
            variant="soft"
          />
        )
      )}
    </Stack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 350 }}>
      <Typography variant="h6">All Sizes</Typography>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Autocomplete
          key={size}
          options={movies}
          label={`Size: ${size.toUpperCase()}`}
          placeholder="Select movie..."
          size={size}
        />
      ))}
    </Stack>
  ),
};

export const MultipleSelection: Story = {
  render: () => {
    const [value, setValue] = useState<AutocompleteOption[]>([]);

    return (
      <Stack spacing={3} sx={{ width: 400 }}>
        <Typography variant="h6">Multiple Selection</Typography>
        <Autocomplete
          multiple
          options={movies}
          value={value}
          onChange={(_, newValue) => setValue(newValue as AutocompleteOption[])}
          label="Select movies"
          placeholder="Add movies..."
          variant="soft"
          color="primary"
        />
        <Typography variant="body2" color="text.secondary">
          Selected: {value.map((v) => v.label).join(', ') || 'None'}
        </Typography>
      </Stack>
    );
  },
};

export const FreeSolo: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 350 }}>
      <Typography variant="h6">Free Solo (Custom Input)</Typography>
      <Autocomplete
        freeSolo
        options={movies.map((m) => m.label)}
        label="Enter or select a movie"
        placeholder="Type anything..."
        helperText="You can type any value or select from the list"
      />
    </Stack>
  ),
};

export const GroupedOptions: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 350 }}>
      <Typography variant="h6">Grouped Options</Typography>
      <Autocomplete
        options={categorizedOptions}
        groupBy={(option) => (option as AutocompleteOption).group || ''}
        getOptionLabel={(option) => (option as AutocompleteOption).label}
        label="Select an item"
        placeholder="Search..."
        variant="soft"
      />
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 400 }}>
      <Typography variant="h6">Options with Icons</Typography>
      <Autocomplete
        options={categorizedOptions}
        label="Select with icons"
        placeholder="Search..."
        variant="outlined"
      />
    </Stack>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 400 }}>
      <Typography variant="h6">Options with Descriptions</Typography>
      <Autocomplete
        options={optionsWithDescription}
        label="Select a plan"
        placeholder="Choose your plan..."
        variant="soft"
        color="primary"
      />
    </Stack>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 350 }}>
      <Typography variant="h6">Disabled State</Typography>
      <Autocomplete
        options={movies}
        label="Disabled autocomplete"
        placeholder="Cannot interact"
        disabled
        value={movies[0]}
      />
      <Autocomplete
        multiple
        options={movies}
        label="Disabled multiple"
        placeholder="Cannot interact"
        disabled
        value={[movies[0], movies[1]]}
      />
    </Stack>
  ),
};

export const WithError: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 350 }}>
      <Typography variant="h6">Error State</Typography>
      <Autocomplete
        options={movies}
        label="Required field"
        placeholder="Select a movie..."
        error
        helperText="This field is required"
        required
        color="error"
      />
    </Stack>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>
        Full Width
      </Typography>
      <Autocomplete
        fullWidth
        options={movies}
        label="Full width autocomplete"
        placeholder="Search..."
      />
    </Box>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<AutocompleteOption | null>(null);
    const [inputValue, setInputValue] = useState('');

    return (
      <Stack spacing={3} sx={{ width: 350 }}>
        <Typography variant="h6">Controlled</Typography>
        <Autocomplete
          options={movies}
          value={value}
          onChange={(_, newValue) => setValue(newValue as AutocompleteOption)}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
          label="Controlled autocomplete"
          placeholder="Select..."
        />
        <Box>
          <Typography variant="body2">Value: {value?.label || 'null'}</Typography>
          <Typography variant="body2">Input value: "{inputValue}"</Typography>
        </Box>
      </Stack>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 350 }}>
      <Typography variant="h6">Loading State</Typography>
      <Autocomplete options={[]} loading label="Loading data..." placeholder="Please wait..." />
    </Stack>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <Box
      sx={{
        p: 4,
        borderRadius: 2,
        backgroundColor: '#1a1a2e',
        width: 450,
      }}
    >
      <Typography variant="h6" color="white" gutterBottom>
        Dark Mode
      </Typography>
      <Stack spacing={3}>
        {(['solid', 'soft', 'outlined', 'ghost', 'plain'] as const).map((variant) => (
          <Autocomplete
            key={variant}
            options={movies}
            label={`${variant} variant`}
            placeholder="Select..."
            variant={variant}
            color="primary"
            sx={{
              '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
              '& .MuiInputBase-input': { color: 'white' },
              '& .MuiSvgIcon-root': { color: 'rgba(255,255,255,0.7)' },
            }}
          />
        ))}
      </Stack>
    </Box>
  ),
};

export const Playground: Story = {
  args: {
    options: movies,
    label: 'Playground',
    placeholder: 'Experiment here...',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    fullWidth: false,
    disabled: false,
    error: false,
    required: false,
  },
  render: (args) => (
    <Box sx={{ width: 350 }}>
      <Autocomplete {...args} />
    </Box>
  ),
};
