/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['testing-library', '@team-monite'],
  rules: {
    'prettier/prettier': 'warn',
    'import/no-default-export': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: false }],
  },
  overrides: [
    {
      files: ['*.test.{ts,tsx,js,jsx,mjs,cjs}'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: 'tsconfig.json',
      },
    },
  },
};
