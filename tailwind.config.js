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
      'lime': '#d1f9ba',
      'gray': '#E5E4E2',
      'pink': '#FFEBEF',
      'gold': '#B59410'
    },
    extend: {
      backgroundImage:{
        "plus-icon": "url('/src/assets/icons/plus-solid.svg')",
        "trash-icon": "url('/src/assets/icons/trash-solid.svg')",
        "gift-icon": "url('/src/assets/icons/gift-solid.svg')",
        "santa": "url('/src/assets/santaClaus.png')",
      }
    },
  },
  plugins: [],
}

