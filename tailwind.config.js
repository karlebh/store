module.exports = {
  darkMode: 'class',
  purge: [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
  "./src/**/**/*.{vue,js,ts,jsx,tsx}",
  ],
  content: [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
  "./src/**/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        new: ['Poppins', 'Fraunces', 'Nunito'],
      },
      width: {
        'cart': '90vw',
        '128': '32rem'
      }
    },
  },
  plugins: [],
}
