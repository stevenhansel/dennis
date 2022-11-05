/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pochita-orange': '#d97441',
      },
      maxWidth: {
        '256': '64rem',
      },
      spacing: {
        '128': '32rem',
        '256': '64rem',
      }
    },
  },
  plugins: [],
}
