import storybookTest from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Use SB_URL environment variable for CI debugging (points to deployed Storybook)
// Falls back to localhost for local development
const storybookUrl = process.env.SB_URL || 'http://localhost:6006';

// Absolute path to .storybook config (required when running from monorepo root)
const storybookConfigDir = path.resolve(__dirname, '.storybook');

export default defineConfig({
  plugins: [
    // This plugin reads your main.ts to find stories
    storybookTest({
      configDir: storybookConfigDir,
      // Use the environment variable for CI debugging
      storybookUrl,
    }),
  ],
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        {
          browser: 'chromium',
        },
      ],
    },
    // Register the setup file here
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      // Point to dist for proper ESM module resolution
      '@sorbet-ui/tokens': path.resolve(__dirname, '../../packages/tokens/dist'),
      '@sorbet-ui/theme': path.resolve(__dirname, '../../packages/theme/dist'),
      '@sorbet-ui/react': path.resolve(__dirname, '../../packages/react/src'),
      '@emotion/react': path.dirname(require.resolve('@emotion/react/package.json')),
      '@emotion/styled': path.dirname(require.resolve('@emotion/styled/package.json')),
      react: path.dirname(require.resolve('react/package.json')),
      'react-dom': path.dirname(require.resolve('react-dom/package.json')),
    },
  },
  optimizeDeps: {
    include: ['@mui/material', '@emotion/react', '@emotion/styled'],
    // Exclude workspace packages from pre-bundling - they're resolved via aliases
    exclude: ['@sorbet-ui/tokens', '@sorbet-ui/theme', '@sorbet-ui/react'],
  },
});
