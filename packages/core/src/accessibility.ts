/**
 * Sorbet UI Accessibility Utilities
 *
 * Helper functions and constants for accessibility
 */

/**
 * Screen reader only styles
 * Visually hides content while keeping it accessible to screen readers
 */
export const srOnly = {
  position: 'absolute' as const,
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap' as const,
  border: '0',
};

/**
 * Focus visible styles
 * Only show focus ring when navigating with keyboard
 */
export const focusVisible = {
  '&:focus': {
    outline: 'none',
  },
  '&:focus-visible': {
    outline: '2px solid currentColor',
    outlineOffset: '2px',
  },
};

/**
 * Keyboard navigation keys
 */
export const KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  TAB: 'Tab',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const;

/**
 * Check if event key is an activation key (Enter or Space)
 */
export const isActivationKey = (key: string): boolean => {
  return key === KEYS.ENTER || key === KEYS.SPACE;
};

/**
 * Check if event key is a navigation key
 */
export const isNavigationKey = (key: string): boolean => {
  return [
    KEYS.ARROW_UP,
    KEYS.ARROW_DOWN,
    KEYS.ARROW_LEFT,
    KEYS.ARROW_RIGHT,
    KEYS.HOME,
    KEYS.END,
  ].includes(key as any);
};

/**
 * Generate unique ID for accessibility
 */
let idCounter = 0;
export const generateId = (prefix = 'sorbet-ui'): string => {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
};

/**
 * ARIA live region announcer
 * Creates announcements for screen readers
 */
export const announce = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  if (typeof document === 'undefined') return;

  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  Object.assign(announcer.style, srOnly);
  announcer.textContent = message;

  document.body.appendChild(announcer);

  setTimeout(() => {
    document.body.removeChild(announcer);
  }, 1000);
};

/**
 * Color contrast checker
 * Returns true if colors meet WCAG AA requirements
 */
export const meetsContrastRatio = (
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean => {
  // This is a simplified check - in production, use a proper color contrast library
  const ratio = getContrastRatio(foreground, background);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
};

/**
 * Calculate contrast ratio between two colors
 */
export const getContrastRatio = (foreground: string, background: string): number => {
  const fgLuminance = getLuminance(foreground);
  const bgLuminance = getLuminance(background);
  const lighter = Math.max(fgLuminance, bgLuminance);
  const darker = Math.min(fgLuminance, bgLuminance);
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Get relative luminance of a color
 */
const getLuminance = (color: string): number => {
  const rgb = hexToRgb(color);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Convert hex color to RGB
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
};

/**
 * Reduced motion media query check
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * High contrast mode check
 */
export const prefersHighContrast = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
};

/**
 * Get appropriate aria attributes for loading state
 */
export const getLoadingAriaProps = (loading: boolean) => ({
  'aria-busy': loading,
  'aria-live': loading ? ('polite' as const) : undefined,
});

/**
 * Get appropriate aria attributes for error state
 */
export const getErrorAriaProps = (error: boolean, errorMessageId?: string) => ({
  'aria-invalid': error,
  'aria-errormessage': error ? errorMessageId : undefined,
});
