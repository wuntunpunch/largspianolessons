import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      textShadow: {
        default: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        strong: "2px 2px 8px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".shadow-text": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        },
        ".shadow-text-strong": {
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
export default config;
