/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode:'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      // ...
      
        'light': '#fcfcfc',
        'darkborder': '#bbbbbb',
        'text': '#777777',
        'dark': '#252525',
        'header': '#1d1f1f',

    },
    extend: {},
  },
  plugins: [],
}