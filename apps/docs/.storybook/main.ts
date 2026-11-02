// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ['../../../packages/react/src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    // Note: addon-essentials is built into storybook@10.x core - no need to list it
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@chromatic-com/storybook'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },

  viteFinal: async (config) => {
    // Configure Vite to handle "use client" directives from MUI
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          // Point to dist for proper ESM module resolution in Vitest browser mode
          '@sorbet-ui/tokens': path.resolve(__dirname, '../../../packages/tokens/dist'),
          '@sorbet-ui/theme': path.resolve(__dirname, '../../../packages/theme/dist'),
          '@sorbet-ui/react': path.resolve(__dirname, '../../../packages/react/src'),
          // Fix CJS/ESM compatibility issues
          semver: path.resolve(__dirname, './semver-esm-wrapper.js'),
          'use-sync-external-store/shim/index.js': path.resolve(
            __dirname,
            './use-sync-external-store-shim.js'
          ),
        },
      },
      optimizeDeps: {
        include: ['@mui/material', '@emotion/react', '@emotion/styled'],
        // Exclude workspace packages from pre-bundling - they're resolved via aliases
        exclude: ['@sorbet-ui/tokens', '@sorbet-ui/theme', '@sorbet-ui/react'],
        esbuildOptions: {
          define: {
            global: 'globalThis',
          },
        },
      },
      ssr: {
        ...config.ssr,
        noExternal: [
          '@mui/material',
          '@mui/system',
          '@mui/utils',
          '@emotion/react',
          '@emotion/styled',
        ],
      },
    };
  },

  typescript: {
    check: false,
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
