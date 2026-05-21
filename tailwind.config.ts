import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0F172A",
        slateDeep: "#0B1220",
        emeraldAccent: "#10B981",
        indigoAccent: "#6366F1"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        glass: "0 10px 30px rgba(2, 6, 23, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
