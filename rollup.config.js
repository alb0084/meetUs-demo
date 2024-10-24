import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-css-only'; // Aggiungi questa riga
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js'
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: !production
      },
      emitCss: true
    }),
    css({ output: 'bundle.css' }), // Aggiungi questa riga
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    !production && livereload('public'),
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
