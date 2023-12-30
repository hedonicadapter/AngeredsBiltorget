/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // All defined in root
        bg: 'var(--bg)',
        'bg-transparent': 'var(--bg-transparent)',
        'on-bg': 'var(--on-bg)',
        'on-bg-medium': 'var(--on-bg-medium)',
        'on-bg-light': 'var(--on-bg-light)',
        'on-bg-lightest': 'var(--on-bg-lightest)',
        surface: 'var(--surface)',
        'surface-variant': 'var(--surface-variant)',
        'surface-dark': 'var(--surface-dark)',

        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        accent: 'var(--accent)',
        outline: 'var(--outline)',
        'outline-hovered': 'var(--outline-hovered)',
        error: 'var(--error)',
      },
    },
  },
  plugins: [],
};
