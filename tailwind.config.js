/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linkedin: {
          blue: '#0a66c2',
          dark: '#1d2226',
          light: '#f3f2ef',
          text: '#000000e6',
          muted: '#00000099',
        }
      }
    },
  },
  plugins: [],
}
