# JS Scripts

> Created by Credijusto.com

Set of custom scripts to include at a JS project.
The available scripts are

- `js-scripts lint`
- `js-scripts precommit`


#### Setup

Install dependencies

```sh
> npm i js-scripts eslint-config-js-scripts stylelint-config-js-scripts
```

```sh
> npm i -D husky
```

Add scripts and configuration to the package.json

```diff
{
  "scripts": {
+   "lint": "js-scripts lint"
  },
+ "eslintConfig": {
+   "extends": "js-scripts"
+ },
+ "stylelint": {
+   "extends": "stylelint-config-js-scripts"
+ },
+ "husky": {
+   "hooks": {
+     "pre-commit": "js-scripts lint",
+   }
+ }
}
```

### eslint-config-js-scripts

This package includes a ESLint configuration that extends `eslint-config-react-app` and adds some extra rules


### stylelint-config-js-scripts

This package includes a StyleLint configuration that extends `stylelint-config-standard` and adds some extra rules
