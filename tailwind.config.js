import { platformSelect } from 'nativewind/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#5271FF',
      },
      fontFamily: {
        winkySans: ['WinkySans', 'sans-serif'],
        system: platformSelect({
          ios: 'AtkinsonHyperlegible',
          android: 'AtkinsonHyperlegible',
          default: 'AtkinsonHyperlegible',
        }),
      },
      animation: {
        spinReverse: "spinReverse 240s linear infinite",
      },
      keyframes: {
        spinReverse: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
      },
    },
  },
  plugins: [],
};
