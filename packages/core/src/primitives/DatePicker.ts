/**
 * Sorbet UI DatePicker Primitives
 *
 * Headless date picker utilities for building accessible date selection components.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface DatePickerState {
  /** Currently selected date */
  value: Date | null;
  /** Date range for range picker */
  rangeValue: [Date | null, Date | null];
  /** Currently viewed month */
  viewDate: Date;
  /** Current view mode */
  view: 'day' | 'month' | 'year';
  /** Whether the picker is open */
  isOpen: boolean;
  /** Whether range selection is enabled */
  isRange: boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disabled dates */
  disabledDates?: Date[];
  /** Whether the picker is disabled */
  disabled: boolean;
}

export interface CalendarDay {
  /** The date */
  date: Date;
  /** Day of month (1-31) */
  day: number;
  /** Whether this is in the current month */
  isCurrentMonth: boolean;
  /** Whether this is today */
  isToday: boolean;
  /** Whether this date is selected */
  isSelected: boolean;
  /** Whether this is the range start */
  isRangeStart: boolean;
  /** Whether this is the range end */
  isRangeEnd: boolean;
  /** Whether this date is within a range */
  isInRange: boolean;
  /** Whether this date is disabled */
  isDisabled: boolean;
  /** Whether this is a weekend */
  isWeekend: boolean;
}

export interface CalendarMonth {
  /** Month index (0-11) */
  month: number;
  /** Month name */
  name: string;
  /** Short month name */
  shortName: string;
  /** Whether this month is selected */
  isSelected: boolean;
  /** Whether this month is disabled */
  isDisabled: boolean;
  /** Whether this is the current month */
  isCurrent: boolean;
}

export interface CalendarYear {
  /** Year number */
  year: number;
  /** Whether this year is selected */
  isSelected: boolean;
  /** Whether this year is disabled */
  isDisabled: boolean;
  /** Whether this is the current year */
  isCurrent: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Date Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if two dates are in the same month
 */
export function isSameMonth(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
}

/**
 * Check if two dates are in the same year
 */
export function isSameYear(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear();
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Check if a date is a weekend
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * Check if a date is before another date
 */
export function isBefore(date: Date, compareDate: Date): boolean {
  return date.getTime() < compareDate.getTime();
}

/**
 * Check if a date is after another date
 */
export function isAfter(date: Date, compareDate: Date): boolean {
  return date.getTime() > compareDate.getTime();
}

/**
 * Check if a date is within a range (inclusive)
 */
export function isWithinRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
}

/**
 * Check if a date is disabled
 */
export function isDateDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[]
): boolean {
  if (minDate && isBefore(date, minDate) && !isSameDay(date, minDate)) {
    return true;
  }
  if (maxDate && isAfter(date, maxDate) && !isSameDay(date, maxDate)) {
    return true;
  }
  if (disabledDates) {
    return disabledDates.some((d) => isSameDay(d, date));
  }
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Calendar Generation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get the first day of the month
 */
export function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Get the last day of the month
 */
export function getLastDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * Get number of days in a month
 */
export function getDaysInMonth(date: Date): number {
  return getLastDayOfMonth(date).getDate();
}

/**
 * Get the start of the calendar grid (may include days from previous month)
 */
export function getCalendarStart(date: Date, startOfWeek = 0): Date {
  const firstDay = getFirstDayOfMonth(date);
  const dayOfWeek = firstDay.getDay();
  const diff = (dayOfWeek - startOfWeek + 7) % 7;
  return new Date(firstDay.getFullYear(), firstDay.getMonth(), 1 - diff);
}

/**
 * Generate calendar days for a month view
 */
export function generateCalendarDays(
  viewDate: Date,
  selectedDate: Date | null,
  rangeStart: Date | null,
  rangeEnd: Date | null,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[],
  startOfWeek = 0
): CalendarDay[] {
  const days: CalendarDay[] = [];
  const start = getCalendarStart(viewDate, startOfWeek);

  // Generate 42 days (6 weeks)
  for (let i = 0; i < 42; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    const isCurrentMonth = isSameMonth(date, viewDate);
    const isSelected = isSameDay(date, selectedDate);
    const isRangeStart = isSameDay(date, rangeStart);
    const isRangeEnd = isSameDay(date, rangeEnd);
    const isInRange = isWithinRange(date, rangeStart, rangeEnd);

    days.push({
      date,
      day: date.getDate(),
      isCurrentMonth,
      isToday: isToday(date),
      isSelected,
      isRangeStart,
      isRangeEnd,
      isInRange,
      isDisabled: isDateDisabled(date, minDate, maxDate, disabledDates),
      isWeekend: isWeekend(date),
    });
  }

  return days;
}

/**
 * Generate months for year view
 */
export function generateCalendarMonths(
  viewDate: Date,
  selectedDate: Date | null,
  minDate?: Date,
  maxDate?: Date
): CalendarMonth[] {
  const months: CalendarMonth[] = [];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const shortNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const today = new Date();
  const year = viewDate.getFullYear();

  for (let i = 0; i < 12; i++) {
    const monthDate = new Date(year, i, 1);
    const isDisabled =
      (minDate && monthDate < new Date(minDate.getFullYear(), minDate.getMonth(), 1)) ||
      (maxDate && monthDate > new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0));

    months.push({
      month: i,
      name: monthNames[i],
      shortName: shortNames[i],
      isSelected: selectedDate
        ? selectedDate.getFullYear() === year && selectedDate.getMonth() === i
        : false,
      isDisabled: !!isDisabled,
      isCurrent: today.getFullYear() === year && today.getMonth() === i,
    });
  }

  return months;
}

/**
 * Generate years for decade view
 */
export function generateCalendarYears(
  viewDate: Date,
  selectedDate: Date | null,
  minDate?: Date,
  maxDate?: Date,
  yearsPerPage = 12
): CalendarYear[] {
  const years: CalendarYear[] = [];
  const currentYear = viewDate.getFullYear();
  const startYear = currentYear - Math.floor(yearsPerPage / 2);
  const today = new Date();

  for (let i = 0; i < yearsPerPage; i++) {
    const year = startYear + i;
    const isDisabled =
      (minDate && year < minDate.getFullYear()) || (maxDate && year > maxDate.getFullYear());

    years.push({
      year,
      isSelected: selectedDate ? selectedDate.getFullYear() === year : false,
      isDisabled: !!isDisabled,
      isCurrent: today.getFullYear() === year,
    });
  }

  return years;
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Navigate to previous month
 */
export function getPreviousMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

/**
 * Navigate to next month
 */
export function getNextMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

/**
 * Navigate to previous year
 */
export function getPreviousYear(date: Date): Date {
  return new Date(date.getFullYear() - 1, date.getMonth(), 1);
}

/**
 * Navigate to next year
 */
export function getNextYear(date: Date): Date {
  return new Date(date.getFullYear() + 1, date.getMonth(), 1);
}

/**
 * Navigate to previous decade
 */
export function getPreviousDecade(date: Date): Date {
  return new Date(date.getFullYear() - 10, date.getMonth(), 1);
}

/**
 * Navigate to next decade
 */
export function getNextDecade(date: Date): Date {
  return new Date(date.getFullYear() + 10, date.getMonth(), 1);
}

// ─────────────────────────────────────────────────────────────────────────────
// Keyboard Navigation
// ─────────────────────────────────────────────────────────────────────────────

export type DatePickerKeyboardAction =
  | 'previousDay'
  | 'nextDay'
  | 'previousWeek'
  | 'nextWeek'
  | 'previousMonth'
  | 'nextMonth'
  | 'startOfMonth'
  | 'endOfMonth'
  | 'select'
  | 'close'
  | null;

/**
 * Get the action for a keyboard event
 */
export function getDatePickerKeyboardAction(
  event: KeyboardEvent | React.KeyboardEvent
): DatePickerKeyboardAction {
  switch (event.key) {
    case 'ArrowLeft':
      return 'previousDay';
    case 'ArrowRight':
      return 'nextDay';
    case 'ArrowUp':
      return 'previousWeek';
    case 'ArrowDown':
      return 'nextWeek';
    case 'PageUp':
      return 'previousMonth';
    case 'PageDown':
      return 'nextMonth';
    case 'Home':
      return 'startOfMonth';
    case 'End':
      return 'endOfMonth';
    case 'Enter':
    case ' ':
      return 'select';
    case 'Escape':
      return 'close';
    default:
      return null;
  }
}

/**
 * Get the new focused date based on keyboard action
 */
export function getDateFromKeyboard(currentDate: Date, action: DatePickerKeyboardAction): Date {
  const newDate = new Date(currentDate);

  switch (action) {
    case 'previousDay':
      newDate.setDate(newDate.getDate() - 1);
      break;
    case 'nextDay':
      newDate.setDate(newDate.getDate() + 1);
      break;
    case 'previousWeek':
      newDate.setDate(newDate.getDate() - 7);
      break;
    case 'nextWeek':
      newDate.setDate(newDate.getDate() + 7);
      break;
    case 'previousMonth':
      newDate.setMonth(newDate.getMonth() - 1);
      break;
    case 'nextMonth':
      newDate.setMonth(newDate.getMonth() + 1);
      break;
    case 'startOfMonth':
      newDate.setDate(1);
      break;
    case 'endOfMonth':
      newDate.setDate(getDaysInMonth(newDate));
      break;
  }

  return newDate;
}

// ─────────────────────────────────────────────────────────────────────────────
// Formatting
// ─────────────────────────────────────────────────────────────────────────────

export type DateFormat = 'short' | 'medium' | 'long' | 'full';

/**
 * Format a date to string
 */
export function formatDate(
  date: Date | null,
  format: DateFormat = 'medium',
  locale = 'en-US'
): string {
  if (!date) return '';

  const formatOptions: Record<DateFormat, Intl.DateTimeFormatOptions> = {
    short: { month: 'numeric', day: 'numeric', year: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  };

  return new Intl.DateTimeFormat(locale, formatOptions[format]).format(date);
}

/**
 * Format month and year for header
 */
export function formatMonthYear(date: Date, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Get weekday names
 */
export function getWeekdayNames(
  format: 'narrow' | 'short' | 'long' = 'short',
  locale = 'en-US',
  startOfWeek = 0
): string[] {
  const baseDate = new Date(2024, 0, 7); // A Sunday
  const days: string[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + ((i + startOfWeek) % 7));
    days.push(new Intl.DateTimeFormat(locale, { weekday: format }).format(date));
  }

  return days;
}

// ─────────────────────────────────────────────────────────────────────────────
// ARIA Utilities
// ─────────────────────────────────────────────────────────────────────────────

export interface DatePickerAriaProps {
  role: 'dialog' | 'grid';
  'aria-label': string;
  'aria-modal'?: boolean;
}

export interface CalendarCellAriaProps {
  role: 'gridcell';
  'aria-selected': boolean;
  'aria-disabled'?: boolean;
  'aria-current'?: 'date';
  tabIndex: number;
}

/**
 * Get ARIA attributes for the date picker dialog
 */
export function getDatePickerAriaAttributes(viewDate: Date, isModal = true): DatePickerAriaProps {
  return {
    role: isModal ? 'dialog' : 'grid',
    'aria-label': `Choose date, ${formatMonthYear(viewDate)}`,
    ...(isModal && { 'aria-modal': true }),
  };
}

/**
 * Get ARIA attributes for a calendar day cell
 */
export function getCalendarCellAriaAttributes(
  day: CalendarDay,
  isFocused: boolean
): CalendarCellAriaProps {
  return {
    role: 'gridcell',
    'aria-selected': day.isSelected || day.isRangeStart || day.isRangeEnd,
    ...(day.isDisabled && { 'aria-disabled': true }),
    ...(day.isToday && { 'aria-current': 'date' }),
    tabIndex: isFocused ? 0 : -1,
  };
}

/**
 * Get accessible label for a date
 */
export function getDateAriaLabel(date: Date, locale = 'en-US'): string {
  return formatDate(date, 'full', locale);
}

// ─────────────────────────────────────────────────────────────────────────────
// Parsing
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Parse a date string to Date object
 */
export function parseDate(value: string, format = 'MM/DD/YYYY'): Date | null {
  if (!value) return null;

  // Simple parsing for common formats
  const parts = value.split(/[/\-.]/);
  if (parts.length !== 3) return null;

  let year: number;
  let month: number;
  let day: number;

  if (format.startsWith('MM')) {
    [month, day, year] = parts.map(Number);
  } else if (format.startsWith('DD')) {
    [day, month, year] = parts.map(Number);
  } else {
    [year, month, day] = parts.map(Number);
  }

  // Handle 2-digit years
  if (year < 100) {
    year += year > 50 ? 1900 : 2000;
  }

  const date = new Date(year, month - 1, day);

  // Validate the date is real
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }

  return date;
}
