/**
 * Copyright (c) present, Credijusto
 */

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:jsx-a11y/strict'],
  plugins: ['jsx-a11y', 'react-hooks', 'prettier'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: { paths: ['src'] },
    },
  },
  rules: {
    'react/jsx-filename-extension': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': 'error',
  },
};
