module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  // parser: '@babel/eslint-parser',
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    // sourceType: 'module',
  },
  plugins: [
    'prettier',
    '@typescript-eslint',
    // 'react'
  ],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-plusplus': 0,
  },
};
