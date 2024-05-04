/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        // 'hero-bg': "url('/public/assets/default.png')",
      }),
    },
  },
  plugins: [],
}