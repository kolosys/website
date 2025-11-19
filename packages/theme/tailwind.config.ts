import type { Config } from "tailwindcss";

export const baseConfig: Config = {
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default baseConfig;

