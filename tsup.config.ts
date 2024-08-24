import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    outDir: 'dist',
    format: ['cjs'],
    target: 'es6',
    platform: 'node',
    minify: true,
    sourcemap: false,
    dts: true,
  },
  {
    entry: ['src/index.ts'],
    outDir: 'dist',
    format: ['esm'],
    target: 'es6',
    platform: 'node',
    minify: true,
    sourcemap: false,
    dts: true,
  },
]);
