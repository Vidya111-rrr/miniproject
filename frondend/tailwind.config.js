/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // Include all frontend files
    "./public/index.html" // Ensure Tailwind scans the main HTML file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
