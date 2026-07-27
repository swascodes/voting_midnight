/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#040b08', // Abyssal green/black
        surface: '#0a1a13',    // Deep forest
        primary: '#00ff9d',    // Cyber neon green
        'primary-hover': '#00cc7d',
        accent: '#00e5ff',     // Cyber cyan
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
