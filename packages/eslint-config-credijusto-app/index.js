/**
 * Copyright (c) present, Credijustio
 *
 */

'use strict';

module.exports = {
  "parser": "babel-eslint",
  "env": {
    "jest": true,
    "browser": true
  },
  "extends": [
    "airbnb",
    "plugin:jsx-a11y/strict"
  ],
  "rules": {
    "jsx-quotes": ["error", "prefer-single"],
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": true,
      "optionalDependencies": false,
      "peerDependencies": false
    }],
    "import/no-unresolved": 0,
    "react/jsx-filename-extension": 0,
    "react-hooks/rules-of-hooks": "error"
  },
  "plugins": [
    "jsx-a11y",
    "react-hooks"
  ]
}
