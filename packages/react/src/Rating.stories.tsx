import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import type { RatingColor, RatingSize, RatingVariant } from './Rating';
import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Atoms/Rating',
  component: Rating,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Rating allows users to provide feedback by selecting a value from a range. Sorbet UI extends MUI Rating with 5 visual variants.

## Features
- **5 Variants**: solid, soft, outlined, ghost, plain
- **7 Colors**: primary, secondary, success, warning, error, info, neutral
- **5 Sizes**: xs, sm, md, lg, xl
- **Precision**: Full or half-star ratings
- **Custom icons**: Use any icon for rating items
- **Labels**: Show value label with custom formatting
- **Read-only mode**: Display-only ratings
- **Accessible**: Full keyboard navigation and ARIA support
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outlined', 'ghost', 'plain'],
      description: 'Visual style variant',
      table: { defaultValue: { summary: 'solid' } },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
      description: 'Color theme',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size preset',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the rating is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the rating is read-only',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show value label',
    },
    max: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum rating value',
    },
    precision: {
      control: 'select',
      options: [0.5, 1],
      description: 'Rating precision',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

// ─────────────────────────────────────────────────────────────────────────────
// Default Story
// ─────────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    defaultValue: 3,
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Variants
// ─────────────────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => {
    const variants: RatingVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];

    return (
      <Stack spacing={3}>
        {variants.map((variant) => (
          <Box key={variant} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="caption" sx={{ minWidth: 80, textTransform: 'capitalize' }}>
              {variant}
            </Typography>
            <Rating variant={variant} defaultValue={3} />
          </Box>
        ))}
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Colors
// ─────────────────────────────────────────────────────────────────────────────

export const AllColors: Story = {
  name: 'All Colors',
  render: () => {
    const colors: RatingColor[] = [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
      'neutral',
    ];

    return (
      <Stack spacing={2}>
        {colors.map((color) => (
          <Box key={color} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="caption" sx={{ minWidth: 80, textTransform: 'capitalize' }}>
              {color}
            </Typography>
            <Rating color={color} defaultValue={4} />
          </Box>
        ))}
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Sizes
// ─────────────────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => {
    const sizes: RatingSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

    return (
      <Stack spacing={3}>
        {sizes.map((size) => (
          <Box key={size} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="caption" sx={{ minWidth: 50 }}>
              {size}
            </Typography>
            <Rating size={size} defaultValue={3} />
          </Box>
        ))}
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// With Label
// ─────────────────────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  name: 'With Label',
  render: () => {
    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Label on Right
          </Typography>
          <Rating defaultValue={3} showLabel labelPosition="right" />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Label on Left
          </Typography>
          <Rating defaultValue={4} showLabel labelPosition="left" />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Label on Top
          </Typography>
          <Rating defaultValue={5} showLabel labelPosition="top" />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Label on Bottom
          </Typography>
          <Rating defaultValue={2} showLabel labelPosition="bottom" />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Custom Label Format
          </Typography>
          <Rating
            defaultValue={4}
            showLabel
            formatLabel={(value) => (value ? `${value}/5 stars` : 'Not rated')}
          />
        </Box>
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Precision
// ─────────────────────────────────────────────────────────────────────────────

export const HalfRating: Story = {
  name: 'Half Rating (Precision 0.5)',
  render: () => {
    return (
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Interactive Half Rating
          </Typography>
          <Rating defaultValue={2.5} precision={0.5} showLabel />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Read-Only Half Rating
          </Typography>
          <Rating value={3.5} precision={0.5} readOnly showLabel />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Different Variants
          </Typography>
          <Stack spacing={2}>
            <Rating variant="solid" value={4.5} precision={0.5} readOnly />
            <Rating variant="soft" value={4.5} precision={0.5} readOnly />
            <Rating variant="outlined" value={4.5} precision={0.5} readOnly />
          </Stack>
        </Box>
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Disabled & Read-Only
// ─────────────────────────────────────────────────────────────────────────────

export const DisabledAndReadOnly: Story = {
  name: 'Disabled & Read-Only',
  render: () => {
    const variants: RatingVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];

    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Disabled
          </Typography>
          <Stack spacing={2}>
            {variants.map((variant) => (
              <Box key={variant} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="caption" sx={{ minWidth: 80, textTransform: 'capitalize' }}>
                  {variant}
                </Typography>
                <Rating variant={variant} value={3} disabled />
              </Box>
            ))}
          </Stack>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Read-Only
          </Typography>
          <Stack spacing={2}>
            {variants.map((variant) => (
              <Box key={variant} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="caption" sx={{ minWidth: 80, textTransform: 'capitalize' }}>
                  {variant}
                </Typography>
                <Rating variant={variant} value={4} readOnly />
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Custom Icons
// ─────────────────────────────────────────────────────────────────────────────

export const CustomIcons: Story = {
  name: 'Custom Icons',
  render: () => {
    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Heart Icons
          </Typography>
          <Rating
            defaultValue={3}
            color="danger"
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Custom Max (10 stars)
          </Typography>
          <Rating defaultValue={7} max={10} size="sm" />
        </Box>
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Variant Showcase
// ─────────────────────────────────────────────────────────────────────────────

export const VariantShowcase: Story = {
  name: 'Variant × Color Matrix',
  render: () => {
    const variants: RatingVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];
    const colors: RatingColor[] = ['primary', 'secondary', 'success', 'danger'];

    return (
      <Stack spacing={4}>
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography variant="subtitle2" sx={{ mb: 2, textTransform: 'capitalize' }}>
              {variant}
            </Typography>
            <Stack direction="row" spacing={4}>
              {colors.map((color) => (
                <Box key={`${variant}-${color}`}>
                  <Rating variant={variant} color={color} value={4} readOnly size="sm" />
                  <Typography
                    variant="caption"
                    sx={{ display: 'block', textTransform: 'capitalize' }}
                  >
                    {color}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Demo
// ─────────────────────────────────────────────────────────────────────────────

export const InteractiveDemo: Story = {
  name: 'Interactive Rating',
  render: function InteractiveRatingDemo() {
    const [value, setValue] = React.useState<number | null>(0);
    const [hover, setHover] = React.useState(-1);

    const labels: { [index: number]: string } = {
      0: 'Not rated',
      1: 'Terrible',
      2: 'Poor',
      3: 'Ok',
      4: 'Good',
      5: 'Excellent',
    };

    return (
      <Box sx={{ width: 300 }}>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Rate your experience
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Rating
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
            onChangeActive={(_, newHover) => setHover(newHover)}
            size="lg"
            color="warning"
          />
          <Typography variant="body2">{labels[hover !== -1 ? hover : (value ?? 0)]}</Typography>
        </Box>
        {value !== null && value > 0 && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            You rated this {value} out of 5 stars
          </Typography>
        )}
      </Box>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Dark Mode
// ─────────────────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => {
    const variants: RatingVariant[] = ['solid', 'soft', 'outlined', 'ghost', 'plain'];

    return (
      <Box sx={{ p: 4, backgroundColor: '#1a1a2e', borderRadius: 2 }}>
        <Stack spacing={4}>
          <Typography variant="h6" sx={{ color: 'white' }}>
            Rating (Dark Mode)
          </Typography>
          <Stack spacing={2}>
            {variants.map((variant) => (
              <Box key={variant} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography
                  variant="caption"
                  sx={{ minWidth: 80, textTransform: 'capitalize', color: 'rgba(255,255,255,0.7)' }}
                >
                  {variant}
                </Typography>
                <Rating variant={variant} defaultValue={3} />
              </Box>
            ))}
          </Stack>
          <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>
            With Labels
          </Typography>
          <Rating variant="solid" color="warning" defaultValue={4} showLabel size="lg" />
        </Stack>
      </Box>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Real-World Examples
// ─────────────────────────────────────────────────────────────────────────────

export const RealWorldExamples: Story = {
  name: 'Real World Examples',
  render: () => {
    return (
      <Stack spacing={6}>
        {/* Product Review */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, maxWidth: 400 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Product Review
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">Quality</Typography>
              <Rating defaultValue={5} size="sm" color="warning" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">Value</Typography>
              <Rating defaultValue={4} size="sm" color="warning" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">Shipping</Typography>
              <Rating defaultValue={3} size="sm" color="warning" />
            </Box>
          </Stack>
        </Box>

        {/* Average Rating Display */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, maxWidth: 400 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Customer Reviews
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              4.5
            </Typography>
            <Box>
              <Rating value={4.5} precision={0.5} readOnly color="warning" />
              <Typography variant="caption" color="text.secondary">
                Based on 1,234 reviews
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Satisfaction Survey */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, maxWidth: 400 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            How satisfied are you?
          </Typography>
          <Rating
            defaultValue={4}
            size="xl"
            color="success"
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            showLabel
            formatLabel={(v) => (v ? `${v} hearts` : 'Select rating')}
            helperText="Your feedback helps us improve"
          />
        </Box>

        {/* Rating Breakdown */}
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, maxWidth: 400 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Rating Breakdown
          </Typography>
          <Stack spacing={1}>
            {[5, 4, 3, 2, 1].map((stars) => (
              <Box key={stars} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="caption" sx={{ minWidth: 60 }}>
                  {stars} stars
                </Typography>
                <Box sx={{ flexGrow: 1, height: 8, backgroundColor: '#e0e0e0', borderRadius: 1 }}>
                  <Box
                    sx={{
                      width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%`,
                      height: '100%',
                      backgroundColor: '#ffc107',
                      borderRadius: 1,
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ minWidth: 40 }}>
                  {stars === 5
                    ? '70%'
                    : stars === 4
                      ? '20%'
                      : stars === 3
                        ? '5%'
                        : stars === 2
                          ? '3%'
                          : '2%'}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// With Helper Text
// ─────────────────────────────────────────────────────────────────────────────

export const WithHelperText: Story = {
  name: 'With Helper Text',
  render: () => {
    return (
      <Stack spacing={4}>
        <Rating defaultValue={0} helperText="Click to rate this product" />
        <Rating value={4} readOnly helperText="Average rating from 500+ reviews" color="warning" />
      </Stack>
    );
  },
};
