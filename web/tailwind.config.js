/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Noto Sans JP", "Helvetica", "Arial", "Apple Color Emoji", "Segoe UI Emoji"],
      },
    },
  },
  plugins: [],
}

