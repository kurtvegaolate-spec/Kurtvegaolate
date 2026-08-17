/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "var(--color-accent)",
          light: "var(--color-accent-light)",
          dark: "var(--color-accent-dark)",
        },
        ink: {
          DEFAULT: "#14181B",
          soft: "#4A5257",
          faint: "#8B9299",
        },
        paper: "#FAFAF8",
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
        serif: ["'Source Serif 4'", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,24,27,0.04), 0 8px 24px rgba(20,24,27,0.06)",
      },
    },
  },
  plugins: [],
};
