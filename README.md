# JS Scripts

> Created by Credijusto.com

Set of custom packages, **eslint-config** rules, **stylelint-config** rules and a set of two scripts to include at a JS project.

## Packages

### `js-scripts`

![npm](https://img.shields.io/npm/v/js-scripts)

Set of two scripts, to handle code linting and pre-commit actions.

The available scripts are:

- `js-scripts lint`
- `js-scripts precommit`

### `eslint-config-js-scripts`

![npm](https://img.shields.io/npm/v/eslint-config-js-scripts)

This package includes a ESLint configuration that extends `eslint-config-react-app` and adds some extra rules

### `stylelint-config-js-scripts`

![npm](https://img.shields.io/npm/v/stylelint-config-js-scripts)

This package includes a StyleLint configuration that extends `stylelint-config-standard` and adds some extra rules

### `prettier-config-js-scripts`

![npm](https://img.shields.io/npm/v/prettier-config-js-scripts)

Prettier configuration compatible with `eslint-config-js-scripts`

## Setup

Install dependencies

```sh
> npm i js-scripts eslint-config-js-scripts stylelint-config-js-scripts
```

```sh
> npm i -D husky
```

Make sure you have the following properties in your `package.json`.

```diff
{
  "scripts": {
    ...,
+   "lint": "js-scripts lint"
  },
+ "eslintConfig": {
+   "extends": "js-scripts"
+ },
+ "stylelint": {
+   "extends": "stylelint-config-js-scripts"
+ },
+ "prettier": "prettier-config-js-scripts",
+ "husky": {
+   "hooks": {
+     "pre-commit": "js-scripts lint",
+   }
+ }
}
```

The `js-scripts` package works also with any eslint/stylelint rules, just add the previous rules in your `package.json` or in their custom configuration file.
