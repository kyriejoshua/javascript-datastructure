module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  parser: '@babel/eslint-parser',
  extends: ['airbnb', 'prettier', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      // 'jsx': true
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
  },
};
