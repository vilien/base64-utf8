const path = require('path');
const resolve = _path => path.resolve(__dirname, _path);

module.exports = {
  // https://git.woa.com/standards/javascript
  env: {
    browser: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: resolve('./tsconfig.json'),
    tsconfigRootDir: resolve('./'),
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
  ]
};
