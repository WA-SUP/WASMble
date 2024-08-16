/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-purple-light": "var(--color-purple-light)",
        "color-purple": "var(--color-purple)",
      },
    },
  },
  plugins: [],
};
