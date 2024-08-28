/** @type {import("tailwindcss").Config} */
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
        mainScroll: "var(--color-darkgray)",
        border: "var(--color-purple-light)",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      maxHeight: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontSize: {
        "vw-5": "5vw",
        "vw-6": "6vw",
        "vw-8": "8vw",
        "vw-10": "10vw",
      },
    },
  },
  plugins: [],
};
