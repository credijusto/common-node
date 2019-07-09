/**
 * Copyright (c) present, Credijusto
 *
 */

'use strict'

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:jsx-a11y/strict'],
  plugins: ['jsx-a11y', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
}
