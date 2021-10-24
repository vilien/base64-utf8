import typescript from 'rollup-plugin-typescript2';
import tsTreeshaking from 'rollup-plugin-ts-treeshaking';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { name, version, author } from '../package.json';

const isDev = process.env.NODE_ENV === 'development';

// banner
const banner = `${'/*!\n' + ' * '}${name} v${version}\n`
  + ` * (c) 2021-${new Date().getFullYear()} ${author}\n`
  + ` */`;

export default {
  input: 'src/base64.ts',
  output: {
    file: 'dist/base64.js',
    format: 'umd',
    name: 'base64',
    banner,
  },
  plugins: [
    nodeResolve(),
    eslint(),
    typescript(),
    tsTreeshaking(),
    json(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    commonjs(),
    !isDev && terser(),
  ],
};
