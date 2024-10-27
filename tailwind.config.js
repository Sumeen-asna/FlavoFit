/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        garet: ['Garet', 'sans-serif'],
        'canva-sans': ['Canva Sans', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        cream: '#ffe0b5',
        green: '#4a581f',
        background: '#fff8e3',
      },
    },
  },
  plugins: [],
};