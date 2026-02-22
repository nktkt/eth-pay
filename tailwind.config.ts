import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "eth-blue": "#627EEA",
        "eth-dark": "#0A0E27",
        "eth-card": "#141836",
        "eth-border": "#1E2448",
      },
    },
  },
  plugins: [],
};
export default config;
