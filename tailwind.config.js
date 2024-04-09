/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-1': '#E7F177',
        'primary-2': '#83BF6E',
        'primary-3': '#FF6A55',
        'secondary-1': '#FFBC99',
        'secondary-2': '#CABDFF',
        'secondary-3': '#B1E5FC',
        'secondary-4': '#B5E4CA',
        'semantic-success-1': '#0FB672',
        'semantic-error-1': '#F86868',
        'semantic-error-3': '#FF6A55',
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
        'neutral-dark-05': '#A7ACB4',
        'neutral-dark-08': '#525860',
        'neutral-shades-0475': '#9A9FA5',
        'yellow-border': '#7E7244',
      },
      fontFamily: {
        'source-sans-pro': ['Source Sans 3'],
      },
      boxShadow: {
        box: '0px 1px 1px 0px rgba(255, 255, 255, 0.11) inset, 0px -2px 1px 0px rgba(0, 0, 0, 0.40) inset;',
      },
    },
  },
  plugins: [],
}
