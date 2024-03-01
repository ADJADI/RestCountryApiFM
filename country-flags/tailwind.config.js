/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      smPlus: "700px",
      md: "960px",
      lg: "1440px",
    },
    extend: {
      fontFamily: {
        display: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        DarkBlue: "hsl(209, 23%, 22%)",
        VeryDarkBlue: "hsl(207, 26%, 17%)",
        VeryDarkBlueTwo: "hsl(200, 15%, 8%)",
        DarkGray: "hsl(0, 0%, 52%)",
        VeryLightGray: "hsl(0, 0%, 98%)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
