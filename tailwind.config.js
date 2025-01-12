/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#202021",
        primary: "#fefffe",
        secondary: "#2e2e2f",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
