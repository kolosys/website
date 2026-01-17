import type { Config } from "tailwindcss";

export const kolosysPreset: Config = {
  theme: {
    extend: {
      colors: {
        // Semantic background tokens automatically pick up CSS variables
        // These are defined in packages/theme/styles/colors.css
      },
    },
  },
};
