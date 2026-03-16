/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./features/**/*.{js,jsx,ts,tsx}", "./shared/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        text: '#000000',
        textSecondary: '#666666',
        primary: '#007AFF',
      },
    },
  },
  plugins: [],
}
