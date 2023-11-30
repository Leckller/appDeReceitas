/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        afterLoad: {
          '0%': { filter: 'opacity(0)' },
          '100%': { filter: 'opacity(100)' }
        }
      },
      animation: { afterLoad: 'afterLoad 1s' }
    },
  },
  plugins: [],
}

