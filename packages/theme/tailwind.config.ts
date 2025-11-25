import type { Config } from "tailwindcss";

export const baseConfig: Config = {
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      spacing: {
        11: "2.75rem",
      },
    },
  },
  plugins: [],
};

export default baseConfig;
