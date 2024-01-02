/** @type {import('tailwindcss').Config} */
/* eslint-disable */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'media',
}

