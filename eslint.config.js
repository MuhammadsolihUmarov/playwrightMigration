import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import playwrightPlugin from 'eslint-plugin-playwright';
export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      playwright: playwrightPlugin,
    },
    rules: {
      'no-console': 'off',
      'playwright/no-wait-for-timeout': 'warn',
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      'prettier/prettier': 'warn',
    },
    ignores: ['dist/**', 'node_modules/**'],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
];
