import type { Config } from 'tailwindcss'

// Token to CSS variable map. Raw color values live in src/styles/tokens.css.
// To re-skin: edit tokens.css. To rename or add a utility: edit this file.
const tokens = {
  backgroundColor: {
    white: 'var(--color-neutral-white)',
    neutral: 'var(--color-neutral-default)',
    'neutral-dark': 'var(--color-neutral-dark)',
    'neutral-darker': 'var(--color-neutral-darker)',
    placeholder: 'var(--color-neutral-placeholder)',

    primary: 'var(--color-primary-default)',
    'primary-light': 'var(--color-primary-light)',
    'primary-lighter': 'var(--color-primary-lighter)',
    'primary-dark': 'var(--color-primary-dark)',
    'primary-darker': 'var(--color-primary-darker)',

    red: 'var(--color-red-default)',
    'red-light': 'var(--color-red-light)',
    'red-lighter': 'var(--color-red-lighter)',
    'red-dark': 'var(--color-red-dark)',

    yellow: 'var(--color-yellow-default)',
    'yellow-light': 'var(--color-yellow-light)',
    'yellow-lighter': 'var(--color-yellow-lighter)',
    'yellow-dark': 'var(--color-yellow-dark)',
    'yellow-darker': 'var(--color-yellow-darker)',

    green: 'var(--color-green-default)',
    'green-light': 'var(--color-green-light)',
    'green-lighter': 'var(--color-green-lighter)',
    'green-dark': 'var(--color-green-dark)',

    purple: 'var(--color-purple-default)',
    'purple-lighter': 'var(--color-purple-lighter)',
    'purple-dark': 'var(--color-purple-dark)',

    cyan: 'var(--color-cyan-default)',
    'cyan-lighter': 'var(--color-cyan-lighter)',
    'cyan-dark': 'var(--color-cyan-dark)',

    blue: 'var(--color-blue-default)',
    'blue-light': 'var(--color-blue-light)',
    'blue-lighter': 'var(--color-blue-lighter)',
    'blue-dark': 'var(--color-blue-dark)',
  },
  textColor: {
    white: 'var(--color-neutral-white)',
    heading: 'var(--color-neutral-heading)',
    body: 'var(--color-neutral-body)',
    labels: 'var(--color-neutral-labels)',
    alternative: 'var(--color-neutral-alternative)',
    primary: 'var(--color-primary-default)',
    red: 'var(--color-red-default)',
    'red-dark': 'var(--color-red-dark)',
    yellow: 'var(--color-yellow-default)',
    'yellow-dark': 'var(--color-yellow-dark)',
    'yellow-darker': 'var(--color-yellow-darker)',
    green: 'var(--color-green-default)',
    'green-dark': 'var(--color-green-dark)',
    purple: 'var(--color-purple-default)',
    'purple-dark': 'var(--color-purple-dark)',
    cyan: 'var(--color-cyan-default)',
    'cyan-dark': 'var(--color-cyan-dark)',
    blue: 'var(--color-blue-default)',
    'blue-dark': 'var(--color-blue-dark)',
  },
  borderColor: {
    default: 'var(--color-neutral-border)',
    darker: 'var(--color-neutral-darker)',
    primary: 'var(--color-primary-default)',
    red: 'var(--color-red-default)',
    'red-light': 'var(--color-red-light)',
    green: 'var(--color-green-default)',
    'green-light': 'var(--color-green-light)',
    yellow: 'var(--color-yellow-default)',
    purple: 'var(--color-purple-default)',
    'purple-light': 'var(--color-purple-light)',
    cyan: 'var(--color-cyan-default)',
    blue: 'var(--color-blue-default)',
    'blue-light': 'var(--color-blue-light)',
  },
  divideColor: {
    default: 'var(--color-neutral-border)',
  },
  placeholderColor: {
    default: 'var(--color-neutral-placeholder)',
  },
  ringColor: {
    primary: 'var(--color-primary-lighter)',
    red: 'var(--color-red-lighter)',
  },
}

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: tokens,
  },
  plugins: [],
} satisfies Config
