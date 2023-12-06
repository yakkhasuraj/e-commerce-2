/** @type {import('tailwindcss').Config} */
module.exports = {
  important: "#web",
  content: [
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e3f3f9",
          100: "#b8dff0",
          200: "#8ecae6",
          300: "#67b6dd",
          400: "#4ba8d9",
          500: "#379ad5",
          600: "#328dc7",
          700: "#2c7bb4",
          800: "#256aa1",
          900: "#174c80",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
