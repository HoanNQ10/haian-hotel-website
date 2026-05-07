/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': '#4D4D5E',
        'primary-dark': '#3A3A4A',
        'accent': '#C4A882',
        'accent-dark': '#A88B67',
        'accent-soft': '#F0EAE0',
        'background': '#EDE8DF',
        'bg-warm': '#EDE8DF',
        'surface': '#FFFFFF',
        'surface-warm': '#F7F3EC',
        'text-main': '#2E2E38',
        'text-primary': '#2E2E38',
        'text-muted': '#72727E',
        'border': '#DDD8CE',
        'border-warm': '#DDD8CE',
        'slate': '#8A8A9A',
        'wood': '#A67845',
      },
      fontFamily: {
        'heading': ['"Playfair Display"', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
        'serif': ['"Playfair Display"', 'serif'],
      },
      fontSize: {
        'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2rem', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'section': '3rem',    // mobile: 48px
        'section-lg': '5rem', // desktop: 80px
      },
      maxWidth: {
        'container': '1120px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 8px 12px -2px rgba(0, 0, 0, 0.12)',
        'lg': '0 12px 24px -3px rgba(0, 0, 0, 0.15)',
        'warm-sm': '0 2px 8px 0 rgba(201, 149, 46, 0.1)',
        'warm-md': '0 4px 16px 0 rgba(201, 149, 46, 0.15)',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
        'slow': '500ms',
      },
    },
  },
  plugins: [],
};
