module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        120: "30rem",
        160: "40rem",
        200: "50rem",
      },
      height: {
        fit: "fit-content",
      },
      colors: {
        back: "#2D9CDB",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
