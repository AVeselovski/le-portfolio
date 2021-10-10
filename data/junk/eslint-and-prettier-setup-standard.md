---
title: "Eslint & Prettier Setup (Standard)"
slug: "eslint-and-prettier-setup-standard"
description: "Simple setup with Eslint (Standard) & Prettier for when you don’t want to bother with custom setups. Clean and simple. Additional rules / exceptions can always be added as needed."
image: "junk-general.jpg"
tags: ["JavaScript", "Node"]
createdAt: "2021-10-01T18:00:00.816Z"
updatedAt: "2021-10-01T18:00:00.816Z"
pinned: true
---

Simple setup with Eslint (Standard) & Prettier for when you don’t want to bother with custom setups. Clean and simple. Additional rules / exceptions can always be added as needed.

### Eslint

Install Eslint with `yarn add --dev eslint` and run `yarn run eslint --init`. Answer the questions that are presented and install dependencies at the end. That is it. Add rules configurations as needed, or don’t.

NOTE: Install `yarn add --dev babel-eslint` and add `parser: "babel-eslint"` to **.eslintrc** to avoid "Parsing error: Unexpected token =" - error.

### Prettier

Make sure “Prettier - Code formatter” plugin is installed.

It is important to install Prettier also locally in projects, not only editor plugin. Editor plugin will pick up local version and use it. This avoids situations, where a team members with different Prettier versions would overwrite each other’s code. It is also needed for CI setups.

Install “exact” version `yarn add --dev --exact prettier` to avoid formatting conflicts. Even a patch release can result in different formatting.

Add **.prettierignore** to avoid messing with unwanted files. Generally mirror **.gitignore** and **.eslintignore** (if exists) and use common sense.
Run `prettier --check .` to help identify unwanted files and update **.prettierignore** file accordingly.

#### Ignoring code

Use magic comment “prettier-ignore” to ignore “next node”, “prettier-ignore-attribute” / “prettier-ignore-attribute (mouseup)” for more specific cases and “prettier-ignore-start” and “prettier-ignore-end” for larger blocks of code.

Eslint integration

Prettier team’s stand on Eslint plugins, such as “eslint-plugin-prettier”, “prettier-eslint”, is that they are “generally not recommended”, although have their uses. What is advised is to use “eslint-config-prettier”, which turns off linter’s formatting rules, not to conflict with Prettier.

Install config `yarn add --dev eslint-config-prettier` and add as last to “extends” in **.eslintrc**:

```json
{
  "extends": ["some-other-config-you-use", "prettier"]
}
```

### TL;DR

0. Install Eslint with `yarn add --dev eslint` and run `yarn run eslint --init`
   - Install `yarn add --dev babel-eslint` and add `parser: "babel-eslint"` to **.eslintrc** to avoid "Parsing error: Unexpected token =" - error.
1. Install “Prettier - Code formatter” plugin
2. `yarn add --dev --exact prettier`
3. `yarn add --dev eslint-config-prettier`
4. Add **.prettierrc** file with `{}`
   - Add custom options as needed (defaults are very good)
5. Add **.prettierignore** file and (more or less) mirror **.gitignore** and **.eslintignore**
   - Use `yarn prettier --check .` to identify unwanted folders and files
6. Add “prettier” to .eslintrc > “extends” last
