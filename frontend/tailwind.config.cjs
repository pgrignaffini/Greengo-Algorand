/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'pacifico': ['pacifico', 'cursive'],
        'montserrat': ['montserrat', 'cursive'],
        'poppins': ['poppins', 'sans-serif'],
      },
    }
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar-hide'),
  ],
  daisyui: {
    themes: [
      {
        light: {
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
      {
        dark: {
          "primary": "#086972",
          "secondary": "#17B978",
          "accent": "#A7FF83",
          "neutral": "#424242",
          "base-100": "#071A52",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
};
