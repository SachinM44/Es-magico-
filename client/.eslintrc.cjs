module.exports = {
  root: false,
  env: { browser: true, es2022: true },
  extends: [
    '../.eslintrc.cjs',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: { version: '18.3' },
    tailwindcss: { config: require('path').join(__dirname, 'tailwind.config.ts') },
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    'vite.config.ts',
    'tailwind.config.ts',
    'postcss.config.js',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'tailwindcss/no-custom-classname': 'off',
  },
};
