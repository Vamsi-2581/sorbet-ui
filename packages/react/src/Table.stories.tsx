import { Box, Chip, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { Meta, StoryObj } from 'storybook/react';
import { expect, fn, userEvent } from 'storybook/test';
import { Table, TableColumn } from './Table';

// =============================================================================
// SAMPLE DATA
// =============================================================================

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  department: string;
  joinDate: string;
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'active',
    department: 'Marketing',
    joinDate: '2023-02-20',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Viewer',
    status: 'inactive',
    department: 'Sales',
    joinDate: '2023-03-10',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2023-04-05',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Editor',
    status: 'pending',
    department: 'Design',
    joinDate: '2023-05-12',
  },
  {
    id: 6,
    name: 'Diana Lee',
    email: 'diana@example.com',
    role: 'Viewer',
    status: 'active',
    department: 'Support',
    joinDate: '2023-06-18',
  },
  {
    id: 7,
    name: 'Edward Kim',
    email: 'edward@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2023-07-22',
  },
  {
    id: 8,
    name: 'Fiona Chen',
    email: 'fiona@example.com',
    role: 'Editor',
    status: 'inactive',
    department: 'Marketing',
    joinDate: '2023-08-30',
  },
];

const columns: TableColumn<User>[] = [
  { id: 'name', header: 'Name', accessor: 'name', sortable: true },
  { id: 'email', header: 'Email', accessor: 'email', sortable: true },
  { id: 'role', header: 'Role', accessor: 'role', sortable: true },
  { id: 'department', header: 'Department', accessor: 'department', sortable: true },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (value) => {
      const statusColors = {
        active: 'success',
        inactive: 'default',
        pending: 'warning',
      } as const;
      return (
        <Chip
          label={String(value)}
          size="small"
          color={statusColors[value as keyof typeof statusColors] || 'default'}
          sx={{ textTransform: 'capitalize' }}
        />
      );
    },
  },
  { id: 'joinDate', header: 'Join Date', accessor: 'joinDate', align: 'right' },
];

const basicColumns: TableColumn<User>[] = [
  { id: 'name', header: 'Name', accessor: 'name' },
  { id: 'email', header: 'Email', accessor: 'email' },
  { id: 'role', header: 'Role', accessor: 'role' },
];

// =============================================================================
// META
// =============================================================================

const meta = {
  title: 'Organisms/Table',
  component: Table,
  tags: ['autodocs'],
  args: {
    onRowClick: fn(),
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
      description: 'Table size',
    },
    striped: {
      control: { type: 'boolean' },
      description: 'Striped rows',
    },
    hoverable: {
      control: { type: 'boolean' },
      description: 'Hover effect on rows',
    },
    dense: {
      control: { type: 'boolean' },
      description: 'Dense padding',
    },
    selectable: {
      control: { type: 'boolean' },
      description: 'Enable row selection',
    },
    sortable: {
      control: { type: 'boolean' },
      description: 'Enable sorting',
    },
    pagination: {
      control: { type: 'boolean' },
      description: 'Enable pagination',
    },
    stickyHeader: {
      control: { type: 'boolean' },
      description: 'Sticky header',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state',
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// VARIANT STORIES
// =============================================================================

export const Solid: Story = {
  args: {
    data: sampleUsers.slice(0, 5),
    columns: basicColumns,
    variant: 'solid',
    color: 'primary',
  },
};

export const Soft: Story = {
  args: {
    data: sampleUsers.slice(0, 5),
    columns: basicColumns,
    variant: 'soft',
    color: 'primary',
  },
};

export const Outlined: Story = {
  args: {
    data: sampleUsers.slice(0, 5),
    columns: basicColumns,
    variant: 'outlined',
    color: 'primary',
  },
};

export const Ghost: Story = {
  args: {
    data: sampleUsers.slice(0, 5),
    columns: basicColumns,
    variant: 'ghost',
    color: 'neutral',
  },
};

export const Plain: Story = {
  args: {
    data: sampleUsers.slice(0, 5),
    columns: basicColumns,
    variant: 'plain',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="subtitle2" color="text.secondary">
        5 Table Variants
      </Typography>
      {(['solid', 'soft', 'outlined', 'ghost', 'plain'] as const).map((variant) => (
        <Box key={variant}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Typography>
          <Table data={sampleUsers.slice(0, 3)} columns={basicColumns} variant={variant} />
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
            <Table
              data={sampleUsers.slice(0, 2)}
              columns={basicColumns}
              variant="solid"
              color={color}
            />
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
          <Table
            data={sampleUsers.slice(0, 2)}
            columns={basicColumns}
            size={size}
            variant="outlined"
          />
        </Box>
      ))}
    </Stack>
  ),
};

// =============================================================================
// FEATURE STORIES
// =============================================================================

export const Striped: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
    striped: true,
    variant: 'outlined',
  },
};

export const Dense: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
    dense: true,
    variant: 'outlined',
  },
};

export const WithSorting: Story = {
  render: () => {
    const [sortBy, setSortBy] = React.useState<string>('name');
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

    const sortedData = React.useMemo(() => {
      return [...sampleUsers].sort((a, b) => {
        const aVal = a[sortBy as keyof User];
        const bVal = b[sortBy as keyof User];
        const comparison = String(aVal).localeCompare(String(bVal));
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }, [sortBy, sortDirection]);

    return (
      <Table
        data={sortedData}
        columns={columns}
        sortable
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={(columnId, direction) => {
          setSortBy(columnId);
          setSortDirection(direction);
        }}
        variant="outlined"
      />
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    return (
      <Stack spacing={2}>
        <Typography variant="body2">Selected: {selected.length} rows</Typography>
        <Table
          data={sampleUsers}
          columns={basicColumns}
          selectable
          selected={selected}
          onSelectionChange={setSelected}
          getRowId={(row) => String(row.id)}
          variant="outlined"
        />
      </Stack>
    );
  },
};

export const WithPagination: Story = {
  args: {
    data: sampleUsers,
    columns: columns,
    pagination: true,
    rowsPerPage: 5,
    variant: 'outlined',
  },
};

export const StickyHeader: Story = {
  args: {
    data: [...sampleUsers, ...sampleUsers, ...sampleUsers],
    columns: basicColumns,
    stickyHeader: true,
    maxHeight: 300,
    variant: 'outlined',
  },
};

export const Loading: Story = {
  args: {
    data: sampleUsers.slice(0, 3),
    columns: basicColumns,
    loading: true,
    variant: 'outlined',
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns: basicColumns,
    variant: 'outlined',
  },
};

export const CustomEmptyState: Story = {
  args: {
    data: [],
    columns: basicColumns,
    variant: 'outlined',
    emptyContent: (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" gutterBottom>
          No users found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your search or filters.
        </Typography>
      </Box>
    ),
  },
};

export const CustomCellRendering: Story = {
  args: {
    data: sampleUsers,
    columns: columns,
    variant: 'soft',
    striped: true,
  },
};

// =============================================================================
// INTERACTION STORIES
// =============================================================================

export const Clickable: Story = {
  args: {
    data: sampleUsers.slice(0, 3),
    columns: basicColumns,
    hoverable: true,
    variant: 'outlined',
  },
  play: async ({ args, canvas }) => {
    const rows = canvas.getAllByRole('row');
    // Skip header row
    if (rows[1]) {
      await userEvent.click(rows[1]);
      await expect(args.onRowClick).toHaveBeenCalled();
    }
  },
};

// =============================================================================
// ACCESSIBILITY STORIES
// =============================================================================

export const Accessibility: Story = {
  args: {
    data: sampleUsers.slice(0, 3),
    columns: basicColumns,
    caption: 'User Directory Table',
    variant: 'outlined',
  },
  play: async ({ canvas }) => {
    const table = canvas.getByRole('table');
    await expect(table).toHaveAttribute('aria-label', 'User Directory Table');
  },
};

// =============================================================================
// FULL DEMO
// =============================================================================

export const FullDemo: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);
    const [sortBy, setSortBy] = React.useState<string>('name');
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

    const sortedData = React.useMemo(() => {
      return [...sampleUsers].sort((a, b) => {
        const aVal = a[sortBy as keyof User];
        const bVal = b[sortBy as keyof User];
        const comparison = String(aVal).localeCompare(String(bVal));
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }, [sortBy, sortDirection]);

    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Sorbet UI Table
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            A comprehensive table component with sorting, selection, pagination, and custom cell
            rendering.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Chip
            label={`${selected.length} selected`}
            color={selected.length > 0 ? 'primary' : 'default'}
          />
          <Typography variant="body2" color="text.secondary">
            Sort: {sortBy} ({sortDirection})
          </Typography>
        </Stack>

        <Table
          data={sortedData}
          columns={columns}
          variant="soft"
          color="primary"
          selectable
          sortable
          pagination
          striped
          selected={selected}
          onSelectionChange={setSelected}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={(columnId, direction) => {
            setSortBy(columnId);
            setSortDirection(direction);
          }}
          getRowId={(row) => String(row.id)}
          rowsPerPage={5}
          caption="Complete Table Demo"
        />
      </Stack>
    );
  },
};
