// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        foreground: 'var(--color-text)',
        'foreground-secondary': 'var(--color-text-secondary)',
        heading: 'var(--color-heading)',
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
        'border-subtle': 'var(--color-border-subtle)',
        'button-text': 'var(--color-button-text)',
      },
      fontFamily: {
        sans: ['var(--font-raleway)', 'sans-serif'], // Use the Next.js font variable
      }
    },
  },
  plugins: [],
};

export default config;