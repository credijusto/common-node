/**
 * Copyright (c) present, Credijusto
 */

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'length-zero-no-unit': true,
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-alphabetical-order': true,
  },
};
