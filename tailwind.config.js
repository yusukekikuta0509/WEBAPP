/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        neonPink: "#FB0074",
        darkBlue: "#091933",
        deepPurple: "#5E0B4D",
      },
    },
  },
  plugins: [],
};
