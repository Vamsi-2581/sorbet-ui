import { Box, Stack, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker, dayjs, Dayjs } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The DatePicker component extends MUI X Date Picker with Sorbet UI's design system.
It supports 5 variants (solid, soft, outlined, ghost, plain), 7 colors, 5 sizes,
and integrates with dayjs for date handling.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outlined', 'ghost', 'plain'],
      description: 'Visual variant of the date picker',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'Color theme of the date picker',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the date picker',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the date picker takes full width',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// ─────────────────────────────────────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Select Date',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
  },
  render: (args) => {
    const [value, setValue] = useState<Dayjs | null>(null);
    return <DatePicker {...args} value={value} onChange={(newValue) => setValue(newValue)} />;
  },
};

export const AllVariants: Story = {
  render: () => {
    const VariantDemo = () => {
      const [values, setValues] = useState<Record<string, Dayjs | null>>({});

      return (
        <Stack spacing={3} sx={{ width: 350 }}>
          <Typography variant="h6">All Variants</Typography>
          {(['solid', 'soft', 'outlined', 'ghost', 'plain'] as const).map((variant) => (
            <DatePicker
              key={variant}
              label={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`}
              variant={variant}
              value={values[variant] || null}
              onChange={(newValue) => setValues((v) => ({ ...v, [variant]: newValue }))}
            />
          ))}
        </Stack>
      );
    };
    return <VariantDemo />;
  },
};

export const AllColors: Story = {
  render: () => {
    const ColorDemo = () => {
      const [values, setValues] = useState<Record<string, Dayjs | null>>({});

      return (
        <Stack spacing={3} sx={{ width: 350 }}>
          <Typography variant="h6">All Colors</Typography>
          {(
            ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const
          ).map((color) => (
            <DatePicker
              key={color}
              label={`${color.charAt(0).toUpperCase() + color.slice(1)} Color`}
              color={color}
              variant="soft"
              value={values[color] || null}
              onChange={(newValue) => setValues((v) => ({ ...v, [color]: newValue }))}
            />
          ))}
        </Stack>
      );
    };
    return <ColorDemo />;
  },
};

export const AllSizes: Story = {
  render: () => {
    const SizeDemo = () => {
      const [values, setValues] = useState<Record<string, Dayjs | null>>({});

      return (
        <Stack spacing={3} sx={{ width: 350 }}>
          <Typography variant="h6">All Sizes</Typography>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <DatePicker
              key={size}
              label={`Size: ${size.toUpperCase()}`}
              size={size}
              value={values[size] || null}
              onChange={(newValue) => setValues((v) => ({ ...v, [size]: newValue }))}
            />
          ))}
        </Stack>
      );
    };
    return <SizeDemo />;
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs());

    return (
      <Stack spacing={3} sx={{ width: 350 }}>
        <Typography variant="h6">With Initial Value</Typography>
        <DatePicker
          label="Today's Date"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          variant="soft"
        />
        <Typography variant="body2" color="text.secondary">
          Selected: {value?.format('MMMM D, YYYY') || 'None'}
        </Typography>
      </Stack>
    );
  },
};

export const DisabledState: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 350 }}>
      <Typography variant="h6">Disabled State</Typography>
      <DatePicker label="Disabled Date Picker" disabled value={dayjs()} />
      <DatePicker label="Disabled Empty" disabled value={null} />
    </Stack>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 350 }}>
      <Typography variant="h6">Read Only</Typography>
      <DatePicker label="Read Only Date" readOnly value={dayjs()} />
    </Stack>
  ),
};

export const WithError: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 350 }}>
      <Typography variant="h6">Error State</Typography>
      <DatePicker
        label="Required Date"
        error
        helperText="Please select a valid date"
        required
        color="error"
        value={null}
      />
    </Stack>
  ),
};

export const MinMaxDates: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(null);
    const minDate = dayjs().subtract(7, 'day');
    const maxDate = dayjs().add(30, 'day');

    return (
      <Stack spacing={3} sx={{ width: 350 }}>
        <Typography variant="h6">Min/Max Date Constraints</Typography>
        <DatePicker
          label="Select Date (±7 days to +30 days)"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          minDate={minDate}
          maxDate={maxDate}
          helperText={`Available: ${minDate.format('MMM D')} - ${maxDate.format('MMM D')}`}
          variant="soft"
        />
      </Stack>
    );
  },
};

export const DisablePast: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(null);

    return (
      <Stack spacing={3} sx={{ width: 350 }}>
        <Typography variant="h6">Disable Past Dates</Typography>
        <DatePicker
          label="Future Dates Only"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          disablePast
          helperText="Only future dates can be selected"
          variant="outlined"
          color="success"
        />
      </Stack>
    );
  },
};

export const DisableFuture: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(null);

    return (
      <Stack spacing={3} sx={{ width: 350 }}>
        <Typography variant="h6">Disable Future Dates</Typography>
        <DatePicker
          label="Past Dates Only"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          disableFuture
          helperText="Only past dates can be selected"
          variant="outlined"
          color="info"
        />
      </Stack>
    );
  },
};

export const CustomFormat: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs());

    return (
      <Stack spacing={3} sx={{ width: 350 }}>
        <Typography variant="h6">Custom Date Format</Typography>
        <DatePicker
          label="DD/MM/YYYY Format"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          format="DD/MM/YYYY"
          variant="soft"
        />
        <DatePicker
          label="YYYY-MM-DD Format"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          format="YYYY-MM-DD"
          variant="soft"
        />
        <DatePicker
          label="Full Date Format"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          format="dddd, MMMM D, YYYY"
          variant="soft"
          sx={{ width: 400 }}
        />
      </Stack>
    );
  },
};

export const FullWidth: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(null);

    return (
      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>
          Full Width
        </Typography>
        <DatePicker
          fullWidth
          label="Full Width Date Picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </Box>
    );
  },
};

export const OpenTo: Story = {
  render: () => {
    const [yearValue, setYearValue] = useState<Dayjs | null>(null);
    const [monthValue, setMonthValue] = useState<Dayjs | null>(null);

    return (
      <Stack spacing={3} sx={{ width: 350 }}>
        <Typography variant="h6">Open To Different Views</Typography>
        <DatePicker
          label="Open to Year"
          value={yearValue}
          onChange={(newValue) => setYearValue(newValue)}
          openTo="year"
          views={['year', 'month', 'day']}
          variant="soft"
        />
        <DatePicker
          label="Open to Month"
          value={monthValue}
          onChange={(newValue) => setMonthValue(newValue)}
          openTo="month"
          views={['year', 'month', 'day']}
          variant="soft"
        />
      </Stack>
    );
  },
};

export const DarkMode: Story = {
  render: () => {
    const DarkModeDemo = () => {
      const [values, setValues] = useState<Record<string, Dayjs | null>>({});

      return (
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
              <DatePicker
                key={variant}
                label={`${variant} variant`}
                variant={variant}
                color="primary"
                value={values[variant] || null}
                onChange={(newValue) => setValues((v) => ({ ...v, [variant]: newValue }))}
                inputProps={{
                  sx: {
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                    '& .MuiInputBase-input': { color: 'white' },
                    '& .MuiSvgIcon-root': { color: 'rgba(255,255,255,0.7)' },
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      );
    };
    return <DarkModeDemo />;
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs());

    return (
      <Stack spacing={3} sx={{ width: 350 }}>
        <Typography variant="h6">Controlled</Typography>
        <DatePicker
          label="Controlled Date Picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
        <Box>
          <Typography variant="body2">Selected: {value?.format('YYYY-MM-DD') || 'null'}</Typography>
          <Typography variant="body2">Day of week: {value?.format('dddd') || '-'}</Typography>
          <Typography variant="body2">
            Is weekend: {value ? (value.day() === 0 || value.day() === 6 ? 'Yes' : 'No') : '-'}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <button onClick={() => setValue(dayjs())}>Today</button>
          <button onClick={() => setValue(dayjs().add(1, 'week'))}>Next Week</button>
          <button onClick={() => setValue(null)}>Clear</button>
        </Stack>
      </Stack>
    );
  },
};

export const Playground: Story = {
  args: {
    label: 'Playground',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    fullWidth: false,
    disabled: false,
    error: false,
    required: false,
  },
  render: (args) => {
    const [value, setValue] = useState<Dayjs | null>(null);
    return (
      <Box sx={{ width: 350 }}>
        <DatePicker {...args} value={value} onChange={(newValue) => setValue(newValue)} />
      </Box>
    );
  },
};
