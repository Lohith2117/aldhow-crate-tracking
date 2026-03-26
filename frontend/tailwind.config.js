/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'aldhow-blue': '#0091D5', // Light blue branding
        'aldhow-light': '#F0F9FF',
      },
    },
  },
  plugins: [],
}