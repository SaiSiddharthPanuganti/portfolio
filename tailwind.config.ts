import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f2ede0",
        "paper-dark": "#e8e0cc",
        "paper-light": "#f9f0e0",
        ink: "#1a1508",
        red: "#c8271e",
        green: "#2a5a2e",
        navy: "#12284a",
        gold: "#b8860b",
        purple: "#4a1a5e",
        orange: "#d45a00",
      },
      fontFamily: {
        abril: ['"Abril Fatface"', "serif"],
        cormorant: ['"Cormorant Garamond"', "serif"],
        marker: ['"Permanent Marker"', "cursive"],
        shoulders: ['"Big Shoulders Display"', "sans-serif"],
        unifraktur: ['"UnifrakturMaguntia"', "cursive"],
        readex: ['"Readex Pro"', "sans-serif"],
        teko: ['"Teko"', "sans-serif"],
        baskerville: ['"Libre Baskerville"', "serif"],
        josefin: ['"Josefin Sans"', "sans-serif"],
        unbounded: ['"Unbounded"', "sans-serif"],
        syne: ['"Syne"', "sans-serif"],
        playfair: ['"Playfair Display"', "serif"],
        mono: ['"DM Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
