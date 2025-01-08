// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
  {
    ignores: ['**/dist/**'],
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    plugins: {
      react: reactPlugin,
    },
    rules: {
      // Enforce using curly braces for string literals in JSX
      'react/jsx-curly-brace-presence': ['error', { props: 'always' }],
    },
  }
);
