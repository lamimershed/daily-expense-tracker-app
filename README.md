# Project structure and documentation React + TypeScript + Vite

## Project Api, Design, Prd documents link


## Project Folder Conventions and Review Points

- ### Folder Naming Conventions
      - All folder names should follow camelCase.
- ### File Naming Conventions
      - React component files should start with a capital letter.
      - All components, assets, hooks, and sections should have meaningful names.
      - Hooks should start with the use prefix.
      - API functions should end with Service.
      - Zustand stores should start with use and end with Store.
      - Sections should end with Section.
      - Pages should end with Page.
- ### Import Conventions
      - Use aliases to import files across the project.
      - Components: @components
      - Hooks: @hooks
      - Routes: @routes
      - Utilities: @utils
      - Zustand Stores: @store
      - Services: @service
      - Pages: @pages
      - Sections: @sections
      - Types: @types
      - Images: @images
      - SVGs: @svgs
- ### Coding Practices
      - When chaining objects, use optional chaining.
      - The project should be type-safe; all API data and other data should have declared types.
      - Proper comments should be included to ensure the code is understandable.
      - Ensure there are no spelling mistakes in the code and comments.
      - Follow the DRY (Don't Repeat Yourself) principle to avoid code duplication.
      - Do not use unnecessary libraries or packages; ensure proper knowledge and understanding before adding any dependency.
- ### Environment File Editing Conventions
      - .env.development can be edited as needed.
      - Do not edit .env.production or .env.test without proper approval.
- ### File Editing Conventions
      - When editing a file, update the author details at the top of the page.
- ### Folder Structure
      - Please strictly adhere to the established folder structure.

## branch name conventions

- will be only using lower case for branch name and hyphen to sepreate
- branch name will be having a 3 parts
- <branchPrefix>/<ticketNumber>-<branchName>
- example `feature/T-12-new-login-system`
- branch prefixes
  - `feature/` - These branches are used for developing new features.
  - `bugfix/` - These branches are used to fix bugs in the code
  - `hotfix/` - These branches are made directly from the production branch to fix critical bugs in the production environment
  - `release/` - These branches are used to prepare for a new production release. They allow for last-minute dotting of i’s and crossing t’s. Use the prefix `release/`. For example, `release/v1.0.1`
  - `staging/` -These branches are used to prepare for a new test release. They allow for last-minute dotting of i’s and crossing t’s. Use the prefix `test/`. For example, `staging/`

## git commit conventions

=> subject types

- feat: Introduce a new feature to the codebase
- fix: Fix a bug in the codebase
- docs: Create/update documentation
- ui: Feature and updates related to styling
- refactor: Refactor a specific section of the codebase
- test: Add or update code related to testing
- chore: Regular code maintenance
- uifix: any ui related fix

- Subject:<type>(<scope>): <description> (max 50 characters)
  - example: fix(login): multiple user login restricted
  - leave a empty line
  - Body:<insert detailed description of changes made in the commit> (wrap at 72 characters) - give a breif explaination about the change - leave a empty line
    #Footer:<insert any additional information, such as references or issue numbers> - mention ticket number or other references

## project setup docs

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

- `npm create vite@latest` : run this code on the folder where u need to start the project
- specify the folder name
- choose `typescript + swc`

## **Tailwind css setup**

- run this command

```jsx
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- add this to `tailwind.config.js`

```jsx
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- add this to `index.css` at top

```jsx
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- added prettier plugin for class sorting

```jsx
npm install -D prettier prettier-plugin-tailwindcss
```

- add this in `.prettierrc.json` file

```jsx
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## Prettier Setup

- `npm install -D prettier` : run this command
- paste this code in `.prettierrc.json`

```jsx
{
    "trailingComma": "es5",
    "semi": true,
    "tabWidth": 2,
    "singleQuote": true,
    "jsxSingleQuote": true,
    "plugins": ["prettier-plugin-tailwindcss"],
    "endOfLine": "lf"
}
```

- create a `.prettierignore` file and paste this code

```jsx
# Ignore artifacts:
node_modules

/build
/public
.env
/.next
```

- prettier setup package.json

```jsx
"scripts": {
    ....
    "format": "prettier --write src ",
    "format:check": "prettier --check src "
    ....
  },
  // run this command to check the setup is ok
```

## Es-lint configuration

- es lint is pre install so not need to install it again
- `npm install eslint-config-prettier`

```jsx
// copy this code to eslint config file

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'tailwind.config.ts'], // Ignore tailwind.config.ts
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
  },
  plugins: ['react-refresh', 'react'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-console': [
      'error',
      {
        allow: ['error'],
      },
    ],
    'react/jsx-key': ['error'],
    'no-unsafe-optional-chaining': 'error',
    'max-lines': [
      'error',
      {
        max: 400,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'react/react-in-jsx-scope': 'off', // Disable this rule for React 17+
    '@typescript-eslint/no-non-null-assertion': 'off', // Disable if necessary
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
};
```

- run `npm run format` and check everything work properly

## Husky Setup

- `npm install --save-dev husky`
- `npx husky init`

```jsx
// add this to precommit hook file inside husky

npm run format:check

npm run lint
```
