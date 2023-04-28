import { build } from 'esbuild';

const common = {
  bundle: true,
  entryPoints: ['src/index.ts'],
  minify: true,
  sourcemap: false,
};

build({
  ...common,
  outfile: './dist/index.cjs',
  target: ['ES6'],
  format: 'cjs',
  platform: 'node',
});

build({
  ...common,
  outfile: './dist/index.mjs',
  target: ['ES6'],
  format: 'esm',
  platform: 'node',
});
