
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jxsImportSource: '@emotion/react',
      babel: {
        plugins : ['@emotion/babel-plugin'],
      },
    }),
  ],
});
