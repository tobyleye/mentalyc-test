/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fontFamily: {
          body: ["var(--font-montserat)"],
          heading: ["var(--font-poppins)"],
        },
      },
      colors: {
        primary: {
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
        },
        gray: {
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
        },
        success: {
          500: "var(--color-success-500)",
        },
      },
    },
  },
  plugins: [],
};
