import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: 'inline',
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  minify: false,
  target: 'es2020',
  outDir: 'dist',
  keepNames: true,
});
