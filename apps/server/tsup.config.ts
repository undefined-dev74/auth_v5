import { resolve } from 'path';
import { defineConfig, type Options } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  env: {
    NODE_ENV: process.env.NODE_ENV || 'production'
  },
  onSuccess: process.env.NODE_ENV === 'development' ? 'node dist/index.js' : undefined
});
