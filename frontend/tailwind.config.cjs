/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'montserrat': ['Montserrat', 'cursive'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    }
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary-light": "#dbf39b",
          "primary": "#00B906",
          "secondary": "#B9E937",
          "accent": "#1FB2A6",
          "neutral": "#424242",
          "base-100": "#F2F9F1",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
};
