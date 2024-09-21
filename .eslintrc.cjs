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
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'tailwind.config.ts'], // Ignore tailwind.config.ts
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
  },
  plugins: ['react-refresh', 'react', '@tanstack/query'],
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
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
};
