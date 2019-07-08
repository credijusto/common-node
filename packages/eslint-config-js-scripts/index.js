/**
 * Copyright (c) present, Credijustio
 *
 */

'use strict';

module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "eslint-config-react-app",
    "plugin:jsx-a11y/strict"
  ],
  "rules": {
    "react/jsx-filename-extension": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  "plugins": [
    "jsx-a11y",
    "react-hooks"
  ]
}
