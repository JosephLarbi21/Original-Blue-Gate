/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff7ff",
          100: "#d9ecff",
          200: "#b7dcff",
          300: "#8cc7ff",
          400: "#5baaff",
          500: "#2f86ff",
          600: "#1e6be6",
          700: "#1854b7",
          800: "#174a94",
          900: "#163f7a",
        },
      },
    },
  },
  plugins: [],
};
