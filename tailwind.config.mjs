/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary colors (from design.md)
        'primary': '#3F3F3F',
        'primary-dark': '#2B2B2B',

        // Accent colors (warm gold)
        'accent': '#C9952E',
        'accent-soft': '#F3E5C2',

        // Background & surface
        'bg-warm': '#FAF8F3',
        'surface-warm': '#F5EFE4',

        // Text colors
        'text-primary': '#2F2F2F',
        'text-muted': '#6B6B6B',

        // Supporting
        'border-warm': '#E6DDCF',
        'wood': '#A67845',
      },
      fontFamily: {
        'sans': ['system-ui', 'sans-serif'],
        'serif': ['system-ui', 'serif'],
      },
      spacing: {
        'section': '3rem',    // mobile: 48px
        'section-lg': '5rem', // desktop: 80px
      },
      maxWidth: {
        'container': '1120px',
      },
    },
  },
  plugins: [],
};
