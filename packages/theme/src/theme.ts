import { createTheme, ThemeOptions } from '@mui/material/styles';
import { radiusScale, sorbetPalette } from '@sorbet-ui/tokens';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: sorbetPalette.primary.main,
      dark: sorbetPalette.primary.dark,
      light: sorbetPalette.primary.light,
    },
    secondary: {
      main: sorbetPalette.neutral.main,
    },
    success: {
      main: sorbetPalette.success.main,
    },
    warning: {
      main: sorbetPalette.warning.main,
    },
    error: {
      main: sorbetPalette.danger.main,
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: sorbetPalette.neutral[900],
      secondary: sorbetPalette.neutral[500],
    },
  },
  shape: {
    borderRadius: radiusScale.md,
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
  },
};

export const lightTheme = createTheme(themeOptions);

// The light-theme `main` shades are too dark to read as text on dark surfaces (MUI
// uses `main` for outlined and text buttons, links and focused labels), so dark
// mode uses the lighter 500 shades.
export const darkTheme = createTheme({
  ...themeOptions,
  palette: {
    ...themeOptions.palette,
    mode: 'dark',
    primary: {
      main: sorbetPalette.primary[500],
      dark: sorbetPalette.primary[600],
      light: sorbetPalette.primary.light,
    },
    success: {
      main: sorbetPalette.success[500],
    },
    warning: {
      main: sorbetPalette.warning[500],
    },
    error: {
      main: sorbetPalette.danger[500],
    },
    background: {
      default: sorbetPalette.neutral[900],
      paper: sorbetPalette.neutral[800],
    },
    text: {
      primary: sorbetPalette.neutral[50],
      secondary: sorbetPalette.neutral[400],
    },
  },
});

export { createTheme };
