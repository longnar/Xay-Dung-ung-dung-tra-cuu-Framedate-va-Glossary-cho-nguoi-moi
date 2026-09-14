/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./main/**/*.{js,ts,jsx,tsx}",
    "./select/**/*.{js,ts,jsx,tsx}",
    "./infor/**/*.{js,ts,jsx,tsx}",
    "./golosary/**/*.{js,ts,jsx,tsx}",
    "./test/**/*.{js,ts,jsx,tsx}"
  ],
  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
