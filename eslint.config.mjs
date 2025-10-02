// @ts-check
import { FlatCompat } from '@eslint/eslintrc';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const compat = new FlatCompat({
  // lets us use legacy "extends: ['next','prettier']" in flat config
  baseDirectory: import.meta.dirname,
});

const config = [
  // ignore build artifacts (replaces .eslintignore)
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'dist/**', 'coverage/**'],
  },

  // == extends: ["next", "prettier"] ==
  ...compat.extends('next'),
  ...compat.extends('prettier'),

  // == plugins & rules ==
  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      semi: 2,
      'simple-import-sort/imports': [
        2,
        {
          groups: [
            [
              '^\\u0000',          // side-effect imports
              '^react.*',
              '^next.*',
              '^node:',
              '^@?\\w',            // packages
            ],
            [
              '^',                 // absolute & aliased (e.g. @/…)
              '^\\.',              // relative
            ],
          ],
        },
      ],
    },
  },
];

export default config;
