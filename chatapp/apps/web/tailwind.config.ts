import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          focus: '#4f46e5',
        },
        secondary: {
          DEFAULT: '#8b5cf6',
          focus: '#7c3aed',
        },
      },
    },
  },
  plugins: [require('daisyui')],
}

export default config
