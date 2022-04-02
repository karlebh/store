module.exports = {
  mode: 'jit',
  purge: [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  content: [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        new: ['Poppins', 'Fraunces', 'Nunito'],
      },
    },
  },
  plugins: [],
}
