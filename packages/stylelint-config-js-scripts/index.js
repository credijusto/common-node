/**
 * Copyright (c) present, Credijustio
 *
 */

'use strict'

module.exports = {
  'processors': ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended',
    'stylelint-config-styled-components'
  ],
  plugins: [
    'stylelint-order'
  ],
  rules: {
    'length-zero-no-unit': 'always',
    'order/order': [
      'custom-properties',
      'declarations'
    ],
    'order/properties-alphabetical-order': true
  }
};
