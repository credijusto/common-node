/**
 * Copyright (c) present, Credijusto
 */

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'add-mixin',
          'define-mixin',
          'mixin',
          'function',
          'return',
        ],
      },
    ],
    'length-zero-no-unit': true,
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-alphabetical-order': true,
  },
};
