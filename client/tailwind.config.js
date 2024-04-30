/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xsm: "200px",
        sm: "340px",
        bmd: "600px",
        md: "768px",
        lg: "900px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
