module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'eslint-config-prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'simple-import-sort',
    'unused-imports',
    'react-refresh',
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.stories.tsx'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react'],
              ['^\\u0000'],
              ['^[^@]', '^@?\\w'],
              ['^(@|components)(/.*|$)'],
              ['^\\.\\.(?!/?$)', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ],
};
