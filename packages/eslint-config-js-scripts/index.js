/**
 * Copyright (c) present, Credijusto
 */

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:jsx-a11y/strict'],
  plugins: ['jsx-a11y', 'react-hooks'],
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
    'react/jsx-filename-extension': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
  },
};
