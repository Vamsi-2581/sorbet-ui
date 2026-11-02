// @ts-ignore
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@sorbet-ui/tokens': path.resolve(__dirname, '../../../packages/tokens/src'),
      '@sorbet-ui/theme': path.resolve(__dirname, '../../../packages/theme/src'),
      '@sorbet-ui/react': path.resolve(__dirname, '../../../packages/react/src'),
    },
  },
});
