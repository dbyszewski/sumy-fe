module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'linebreak-style': ['error', 'windows'],
    'no-console': 'warn',
    'prettier/prettier': ['error', {
      "trailingComma": "es5",
      "singleQuote": true,
      "jsxBracketSameLine": true,
      "arrowParens": "always",
      "printWidth": 100,
      "tabWidth": 2,
      "useTabs": false,
      "bracketSpacing": true,
      "semi": true,
      "endOfLine": 'crlf',
    }, { usePrettierrc: false }],
  },
}
