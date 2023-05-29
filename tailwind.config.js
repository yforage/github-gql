/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';

export default {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'stone': colors.stone,
        'yellow': colors.yellow,
        'red': colors.red,
      },
    },
  },
  plugins: [],
}

