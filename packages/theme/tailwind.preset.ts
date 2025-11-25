import type { Config } from "tailwindcss";

export const kolosysPreset: Config = {
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
};
