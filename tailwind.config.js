/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#111315',
      },
      fontFamily: {
        'source-sans-pro': ['Source Sans 3'],
      },
    },
  },
  plugins: [],
}
