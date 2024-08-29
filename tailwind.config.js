/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      main: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        '"Fira Sans"',
        '"Droid Sans"',
        '"Helvetica Neue"',
        "sans-serif",
      ],
      mono: [
        "source-code-pro",
        "Menlo",
        "Monaco",
        "Consolas",
        '"Courier New"',
        "monospace",
      ],
    },
    extend: {
      colors: {
        "main-dark-1": "var(--bg-color-1)",
        "main-dark-2": "var(--bg-color-2)",
        "main-dark-3": "var(--bg-color-3)",
        "main-light-1": "var(--fg-color-1)",
        "main-light-2": "var(--fg-color-2)",
        "main-light-3": "var(--fg-color-3)",
      },
      boxShadow: {
        "main-content-1": "0 0 1rem 0 rgba(0, 0, 0, 0.25)",
        "main-content-2": "0 0 1rem 1px rgba(0, 0, 0, 0.66)",
        footer: "0 0 100px 25px rgba(0, 0, 0, 1)",
        separator: "0 0 10px 0px var(--fg-color-2)",
        "header-item": "0 0 10px 3px rgba(0, 0, 0, 0.33)",
      },
      dropShadow: {
        "header-item": "0 0 15px var(--fg-color-2)",
      },
      width: {
        "content-lg": "calc(1024px - 3rem)",
        "content-xl": "calc(1280px - 3rem)",
      },
    },
  },
  plugins: [],
};
