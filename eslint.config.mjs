import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // import.meta.url is available after Node.js v10.12.0
  baseDirectory: import.meta.url,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),
];

export default eslintConfig;