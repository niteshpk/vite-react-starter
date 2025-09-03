// Flat config for ESLint v9
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';
import vitest from 'eslint-plugin-vitest';

export default [
   {
      parser: '@typescript-eslint/parser',
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
         parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            ecmaFeatures: { jsx: true },
         },
      },
      plugins: {
         'react-hooks': reactHooks,
         'react-refresh': reactRefresh,
         '@typescript-eslint': '@typescript-eslint/eslint-plugin',
      },
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      rules: {
         ...reactHooks.configs.recommended.rules,
         'react-refresh/only-export-components': 'warn',
      },
   },
   {
      files: ['**/*.test.{ts,tsx}'],
      plugins: {
         'testing-library': testingLibrary,
         'jest-dom': jestDom,
         vitest,
      },
      rules: {
         ...testingLibrary.configs.react.rules,
         ...jestDom.configs['flat/recommended'].rules,
         ...vitest.configs.recommended.rules,
      },
   },
];
