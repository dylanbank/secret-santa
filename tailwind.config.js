/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      'red': '#b01b2e',
      'white': '#ffffff',
      'green': '#3c8d0d',
      'gray': '#E5E4E2',
      'pink': '#FFEBEF'
    },
    extend: {
      backgroundImage:{
        "plus-icon": "url('/src/assets/icons/plus-solid.svg')"
      }
    },
  },
  plugins: [],
}

