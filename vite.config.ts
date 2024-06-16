import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';
const BASE_DEV_PATH = '/';
const BASE_PROD_PATH = '/event-registration-wizard/';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  base: isProd ? BASE_PROD_PATH : BASE_DEV_PATH,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@image': path.resolve(__dirname, 'src/assets/image'),
    },
  },
});
