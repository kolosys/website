import type { Config } from "tailwindcss";
import { kolosysPreset } from "@kolosys-sites/theme/tailwind.preset";

const config: Config = {
  presets: [kolosysPreset],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
};

export default config;
