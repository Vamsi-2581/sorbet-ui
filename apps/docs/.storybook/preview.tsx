import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from '@sorbet-ui/theme';
import type { Preview } from 'storybook/react';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

// Custom Sorbet UI viewports for specific breakpoints
const sorbetUIViewports = {
  xs: {
    name: 'Extra Small (XS)',
    styles: {
      width: '320px',
      height: '568px',
    },
    type: 'mobile',
  },
  sm: {
    name: 'Small (SM)',
    styles: {
      width: '600px',
      height: '800px',
    },
    type: 'tablet',
  },
  md: {
    name: 'Medium (MD)',
    styles: {
      width: '900px',
      height: '1200px',
    },
    type: 'tablet',
  },
  lg: {
    name: 'Large (LG)',
    styles: {
      width: '1200px',
      height: '800px',
    },
    type: 'desktop',
  },
  xl: {
    name: 'Extra Large (XL)',
    styles: {
      width: '1536px',
      height: '900px',
    },
    type: 'desktop',
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...sorbetUIViewports,
      },
    },
    options: {
      storySort: {
        order: [
          'Atoms',
          ['Button', 'TextField', 'Checkbox', 'Radio', 'Select', 'Switch'],
          'Molecules',
          'Organisms',
          'Pages',
          '*',
          'Documentation',
        ],
        method: 'alphabetical',
        locales: 'en-US',
      },
    },
  },
  initialGlobals: {
    viewport: {
      value: 'iphone12',
    },
  },
  decorators: [
    (Story, context) => {
      // Get background value from Storybook's backgrounds addon
      const backgroundValue = context.globals?.backgrounds?.value;
      const isDarkMode = backgroundValue === 'dark' || backgroundValue === '#333333';

      return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
