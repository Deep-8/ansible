/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      dark: "#210062",
      "blue-medium": "#447DF7",
      main: "#4B00EA",
      page: "#4510F4",
      "blue-border": "#7B2EEB33",
      grey: "#6C757D",
      lightBlue: "#F5F7FC",
      white: "#FFFFFF",
      red: "#DC3545",
      "blue-2d": "#2D94F36F",
      "grey-med": "#77869C",
      "grey-very-light": "#F8F9FA",
      green: "#009E25",
      yellow: "#DDA100",
      blueish: "#8391A5",
      "grey-for-text": "#233A5C",
      "grey-for-border": "#dde1e0",
    },
  },
  extend: {
    // theme: {
    //   colors: {
    //     "dark": "#142549",
    //     "blue-medium": "#447DF7",
    //     "main": "#2C7FFF",
    //     "page": "#2D94F3",
    //     grey: "#6C757D",
    //     lightBlue: "#142549",
    //   },
    // },
  },
  plugins: [],
};
