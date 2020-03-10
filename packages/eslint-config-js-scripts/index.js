/**
 * Copyright (c) present, Credijusto
 */

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:jsx-a11y/strict',
    'prettier'
  ],
  plugins: [
    'jsx-a11y',
    'react-hooks',
    'prettier'
  ],
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
    'prettier/prettier': 'warn',
    'react/jsx-filename-extension': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-wrap-multilines': 'off',
    'default-param-last': 'warn',
    'import/prefer-default-export': 'off',
    'func-style': ['error', 'declaration', { "allowArrowFunctions": true }],
  },
};
