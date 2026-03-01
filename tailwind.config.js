/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f7f6f3',
          100: '#eeebe3',
          200: '#ddd8c8',
          300: '#c8bfa8',
          400: '#b0a384',
          500: '#9a8b6a',
          600: '#87785a',
          700: '#6e624b',
          800: '#5b5040',
          900: '#4b4236',
          950: '#282318',
        },
        accent: {
          DEFAULT: '#c84b31',
          light: '#e05a3e',
          dark: '#a33825',
        }
      }
    },
  },
  plugins: [],
}
