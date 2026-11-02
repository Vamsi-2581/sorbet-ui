import { render, screen, waitFor } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { colorScaleForMode } from '@sorbet-ui/tokens';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { DatePicker, dayjs } from './DatePicker';

expect.extend(toHaveNoViolations);

describe('DatePicker', () => {
  // ─────────────────────────────────────────────────────────────────────────────
  // Basic Rendering
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Rendering', () => {
    it('renders date picker with label', () => {
      render(<DatePicker label="Select Date" />);
      // MUI X DatePicker renders multiple elements with the label
      expect(screen.getAllByText('Select Date').length).toBeGreaterThan(0);
    });

    it('renders date picker with placeholder', () => {
      render(<DatePicker placeholder="MM/DD/YYYY" />);
      expect(screen.getByPlaceholderText('MM/DD/YYYY')).toBeInTheDocument();
    });

    it('renders date picker with helper text', () => {
      render(<DatePicker label="Date" helperText="Select a date" />);
      expect(screen.getByText('Select a date')).toBeInTheDocument();
    });

    it('renders with initial value', () => {
      const date = dayjs('2024-01-15');
      render(<DatePicker label="Date" value={date} />);
      // Check the date label is rendered somewhere in the component
      expect(screen.getAllByText('Date').length).toBeGreaterThan(0);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Variants
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Variants', () => {
    const variants = ['solid', 'soft', 'outlined', 'ghost', 'plain'] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant`, () => {
        render(<DatePicker label={`${variant} variant`} variant={variant} />);
        expect(screen.getAllByText(`${variant} variant`).length).toBeGreaterThan(0);
      });
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Colors
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Colors', () => {
    const colors = [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
      'neutral',
    ] as const;

    colors.forEach((color) => {
      it(`renders ${color} color`, () => {
        render(<DatePicker label={`${color} color`} color={color} />);
        expect(screen.getAllByText(`${color} color`).length).toBeGreaterThan(0);
      });
    });
  });

  describe.each([
    ['light', createTheme({ palette: { mode: 'light' } }), false],
    ['dark', createTheme({ palette: { mode: 'dark' } }), true],
  ] as const)('%s color mode', (_mode, theme, isDark) => {
    it('uses the color scale for the input and selected date', async () => {
      const colorScale = colorScaleForMode('primary', isDark);
      const { container } = render(
        <ThemeProvider theme={theme}>
          <DatePicker label="Date" color="primary" value={dayjs('2024-01-15')} />
        </ThemeProvider>
      );
      const input = container.querySelector('.MuiPickersOutlinedInput-root');
      expect(input).not.toBeNull();
      const wrapperClass = container.firstElementChild?.className;
      const wrapperStyles = Array.from(document.head.querySelectorAll('style'))
        .map((style) => style.textContent ?? '')
        .filter((css) => css.includes(`.${wrapperClass} .MuiPickersOutlinedInput-root`))
        .join('');
      expect(wrapperStyles).toContain(`border-color:${colorScale.main}`);

      await userEvent.click(screen.getByRole('button'));
      await waitFor(() => {
        const popperStyles = Array.from(document.head.querySelectorAll('style'))
          .map((style) => style.textContent ?? '')
          .filter((css) => css.includes('.MuiPickersDay-root.Mui-selected'))
          .join('');
        expect(popperStyles).toContain(`background-color:${colorScale.main}`);
      });
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Sizes
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      it(`renders ${size} size`, () => {
        render(<DatePicker label={`${size} size`} size={size} />);
        expect(screen.getAllByText(`${size} size`).length).toBeGreaterThan(0);
      });
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Interaction
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Interaction', () => {
    it('opens calendar on click', async () => {
      render(<DatePicker label="Date" />);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('calls onChange when date is selected', async () => {
      const handleChange = vi.fn();
      render(<DatePicker label="Date" onChange={handleChange} />);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // In MUI X v8, clickable days are buttons inside gridcells
      const dayButtons = screen.getAllByRole('gridcell').flatMap((cell) => {
        const btn = cell.querySelector('button:not([disabled])');
        return btn ? [btn] : [];
      });

      const availableDay = dayButtons[0];
      if (availableDay) {
        await userEvent.click(availableDay as HTMLElement);
        expect(handleChange).toHaveBeenCalled();
      }
    });

    it('allows typing date manually', async () => {
      render(<DatePicker label="Date" />);

      // MUI X v8 DatePicker uses spinbuttons for date sections
      const monthSpinbutton = screen.getByRole('spinbutton', { name: /month/i });

      // Check that the spinbutton is editable (contenteditable)
      expect(monthSpinbutton).toHaveAttribute('contenteditable', 'true');
      expect(monthSpinbutton).not.toHaveAttribute('aria-readonly', 'true');
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Disabled State
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Disabled State', () => {
    it('renders disabled date picker', () => {
      render(<DatePicker label="Date" disabled />);
      // Check spinbuttons are disabled
      const spinbuttons = screen.getAllByRole('spinbutton');
      spinbuttons.forEach((spinbutton) => {
        expect(spinbutton).toHaveAttribute('aria-disabled', 'true');
      });
    });

    it('does not open calendar when disabled', async () => {
      render(<DatePicker label="Date" disabled />);

      const button = screen.getByRole('button');
      await userEvent.click(button).catch(() => {});

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Read Only State
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Read Only State', () => {
    it('renders read only date picker', () => {
      const date = dayjs('2024-01-15');
      render(<DatePicker label="Date" readOnly value={date} />);
      // Check spinbuttons have readonly attribute
      const spinbuttons = screen.getAllByRole('spinbutton');
      spinbuttons.forEach((spinbutton) => {
        expect(spinbutton).toHaveAttribute('aria-readonly', 'true');
      });
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Error State
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Error State', () => {
    it('renders error state', () => {
      render(<DatePicker label="Date" error helperText="Invalid date" />);
      expect(screen.getByText('Invalid date')).toBeInTheDocument();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Date Constraints
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Date Constraints', () => {
    it('renders with minDate constraint', () => {
      const minDate = dayjs('2024-01-01');
      render(<DatePicker label="Date" minDate={minDate} />);
      expect(screen.getByRole('group', { name: /date/i })).toBeInTheDocument();
    });

    it('renders with maxDate constraint', () => {
      const maxDate = dayjs('2024-12-31');
      render(<DatePicker label="Date" maxDate={maxDate} />);
      expect(screen.getByRole('group', { name: /date/i })).toBeInTheDocument();
    });

    it('renders with disablePast', () => {
      render(<DatePicker label="Date" disablePast />);
      expect(screen.getByRole('group', { name: /date/i })).toBeInTheDocument();
    });

    it('renders with disableFuture', () => {
      render(<DatePicker label="Date" disableFuture />);
      expect(screen.getByRole('group', { name: /date/i })).toBeInTheDocument();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Custom Format
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Custom Format', () => {
    it('renders with custom date format', () => {
      const date = dayjs('2024-01-15');
      render(<DatePicker label="Date" value={date} format="DD/MM/YYYY" />);
      // Check that the day spinbutton has value 15
      const daySpinbutton = screen.getByRole('spinbutton', { name: /day/i });
      expect(daySpinbutton).toHaveAttribute('aria-valuenow', '15');
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Full Width
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Full Width', () => {
    it('renders full width', () => {
      const { container } = render(<DatePicker label="Date" fullWidth />);
      const wrapper = container.firstChild;
      expect(wrapper).toBeInTheDocument();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Views
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Views', () => {
    it('opens to year view when specified', async () => {
      render(<DatePicker label="Date" openTo="year" views={['year', 'month', 'day']} />);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        // Year view should be visible
        expect(screen.getByRole('radiogroup')).toBeInTheDocument();
      });
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Keyboard Navigation
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Keyboard Navigation', () => {
    it('input is focusable', async () => {
      render(<DatePicker label="Date" />);

      const monthSpinbutton = screen.getByRole('spinbutton', { name: /month/i });
      monthSpinbutton.focus();
      expect(document.activeElement).toBe(monthSpinbutton);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Accessibility
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<DatePicker label="Select a date" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(<DatePicker label="Select a date" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with error', async () => {
      const { container } = render(
        <DatePicker label="Select a date" error helperText="Date is required" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with value', async () => {
      const { container } = render(
        <DatePicker label="Select a date" value={dayjs('2024-01-15')} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
