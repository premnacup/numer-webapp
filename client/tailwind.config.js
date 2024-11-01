/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#1E3E62",
        "custom-orange": "#FF6500",
      },
    },
  },
  plugins: [],
};
