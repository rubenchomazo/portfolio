const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0f172a'
      },
      fontFamily: {
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};