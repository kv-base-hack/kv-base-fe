import { fontFamily } from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-linear-1':
          'linear-gradient(180deg, rgba(27, 27, 49, 0.50) 0%, rgba(60, 82, 75, 0.50) 100%)',
        'sol-gradient': 'linear-gradient(239deg, #5B599A 9.01%, #5C958C 48.59%, #5EBC75 85.68%)',
        'gradient-btn': 'linear-gradient(180deg, rgba(27, 27, 49, 0.50) 0%, rgba(60, 82, 75, 0.50) 100%)',
      },
      colors: {
        'primary-1': '#E7F177',
        'primary-2': '#83BF6E',
        'primary-3': '#FF6A55',
        'primary-6': '#6139FF',
        'secondary-1': '#FFBC99',
        'secondary-2': '#CABDFF',
        'secondary-3': '#B1E5FC',
        'secondary-4': '#B5E4CA',
        'semantic-success-1': '#0FB672',
        'semantic-error-1': '#F86868',
        'semantic-error-3': '#FF6A55',
        'success-500': '#34C759',
        'error-500': '#FF3B30',
        background: '#111315',
        'neutral-00': '#FFFFFF',
        'neutral-01': '#FCFCFC',
        'neutral-02': '#F4F4F4',
        'neutral-03': '#D6D9DC',
        'neutral-04': '#6F767E',
        'neutral-05': '#33383F',
        'neutral-06': '#272B30',
        'neutral-07': '#1C1A1F',
        'neutral-08': '#111315',
        'neutral-09': '#3D3D3D',
        'neutral-200': '#DCDCDC',
        'neutral-400': '#989898',
        'neutral-dark-01': '#F7F7F8',
        'neutral-dark-03': '#D6D9DC',
        'neutral-dark-05': '#A7ACB4',
        'neutral-dark-08': '#525860',
        'neutral-shades-0475': '#9A9FA5',
        'yellow-border': '#7E7244',
        'black-300': '#DADCE0',
      },
      boxShadow: {
        'chat-ai':
          '0px 0px 14px -4px rgba(0, 0, 0, 0.05), 0px 32px 48px -8px rgba(0, 0, 0, 0.10)',
        box: '0px 17.525px 21.907px 0px rgba(0, 0, 0, 0.05), 0px -0.73px 0.73px -1.46px rgba(255, 255, 255, 0.35) inset;',
        lg: '0px 6px 16px 0px rgba(0, 0, 0, 0.08);',
      },
      screens: {
        xl: '1440px',
        '2xl': '1560px',
        '3xl': '1700px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
