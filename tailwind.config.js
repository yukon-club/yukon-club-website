/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'larsseit-light': ['Larsseit Light', 'sans-serif'],
        'larsseit-medium': ['Larsseit Medium', 'sans-serif'],
        'sans': ['Larsseit Medium', 'sans-serif'], // Default to heavier weight for this style
      },
      colors: {
        // Caribou-style Minimal Palette
        'bone': '#f5f4f0',   // Background
        'black': '#000000',  // Text
        'gray-hover': '#555555'
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
}
