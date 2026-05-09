import type { Config } from 'tailwindcss';
import tokens from '../docs/design-tokens.json';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: tokens.backgroundColors,
      textColor: tokens.textColors,
      borderColor: tokens.borderColors,
      divideColor: tokens.divideColors,
      placeholderColor: tokens.placeholderColors,
      ringColor: tokens.ringColors,
    },
  },
  plugins: [],
} satisfies Config;
