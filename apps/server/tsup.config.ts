import { resolve } from 'path';
import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: ['src/index.ts'],
  noExternal: ['@repo'],
  external: ['swagger-parser'],
  format: ['cjs', 'esm'], // Adding ESM format
  clean: true,
  dts: true, // Generate declaration files
  splitting: false,
  sourcemap: true,
  minify: false,
  shims: true,
  cjsInterop: true, // Enable better CommonJS interop
  env: {
    NODE_ENV: process.env.NODE_ENV || 'production'
  },

  ...options
}));
