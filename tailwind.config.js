/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-2': '#83BF6E',
        background: '#111315',
        'neutral-00': '#FFFFFF',
        'neutral-01': '#FCFCFC',
        'neutral-02': '#F4F4F4',
        'neutral-03': '#D6D9DC',
        'neutral-04': '#6F767E',
        'neutral-05': '#33383F',
        'neutral-06': '#272B30',
        'neutral-07': '#1A1D1F',
        'neutral-08': '#111315',
        'neutral-dark-08': '#525860',
      },
      fontFamily: {
        'source-sans-pro': ['Source Sans 3'],
      },
    },
  },
  plugins: [],
}
