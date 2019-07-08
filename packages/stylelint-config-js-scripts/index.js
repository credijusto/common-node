/**
 * Copyright (c) present, Credijusto
 *
 */

'use strict'

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended',
  ],
  plugins: [
    'stylelint-order'
  ],
  rules: {
    'length-zero-no-unit': true,
    'order/order': [
      'custom-properties',
      'declarations'
    ],
    'order/properties-alphabetical-order': true
  }
};
