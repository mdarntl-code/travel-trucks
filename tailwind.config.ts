import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        main: "var(--color-main)",
        accent: "var(--color-accent)",
        textDark: "var(--color-text-dark)",
        gray: "var(--color-gray)",
        secondary: "var(--color-secondary)",
        muted: "var(--color-muted)",
        bgLight: "var(--color-background-light)",
        bgExtraLight: "var(--color-background-extra-light)",
        border: "var(--color-border)",
        white: "var(--color-white)",
      },
    },
  },
  plugins: [],
};

export default config;
