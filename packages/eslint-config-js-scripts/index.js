/**
 * Copyright (c) present, Credijusto
 */

module.exports = {
  parser: 'babel-eslint',
  extends: ['plugin:prettier/recommended', 'airbnb', 'plugin:jsx-a11y/strict'],
  plugins: ['jsx-a11y', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
