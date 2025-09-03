// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: { '@': '/src' }, // keep in sync with your Vite alias
   },
   test: {
      environment: 'jsdom',
      globals: true, // lets you use describe/it/expect without imports
      setupFiles: ['./src/test/setup.ts'],
      css: true, // allow importing CSS in components
      coverage: {
         provider: 'v8',
         reporter: ['text', 'lcov', 'html'],
         reportsDirectory: './coverage',
         include: ['src/**/*.{ts,tsx}'],
         exclude: [
            'src/test/**',
            'src/main.ts',
            'src/main.tsx',
            'src/*.d.ts',
            'src/**/__mocks__/**',
         ],
      },
   },
});
