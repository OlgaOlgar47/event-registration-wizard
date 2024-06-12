import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  base: 'https://olgaolgar47.github.io/event-registration-wizard/',
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: '@modules',
        replacement: fileURLToPath(new URL('./src/modules', import.meta.url)),
      },
      {
        find: '@components',
        replacement: fileURLToPath(
          new URL('./src/components', import.meta.url)
        ),
      },
      {
        find: '@assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
      {
        find: '@icon',
        replacement: fileURLToPath(
          new URL('./src/assets/icon', import.meta.url)
        ),
      },
      {
        find: '@image',
        replacement: fileURLToPath(
          new URL('./src/assets/image', import.meta.url)
        ),
      },
    ],
  },
});

