import config from './rollup.config';

export default {
  ...config,
  output: {
    file: 'es/base64.js',
    format: 'es',
    name: 'base64',
  },
  plugins: [
    ...config.plugins.filter(p => p.name !== 'terser'),
  ],
};
