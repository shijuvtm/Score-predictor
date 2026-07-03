/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        stadium: {
          950: "#080A10",
          900: "#0B0E16",
          800: "#131826",
          700: "#1B2233",
          600: "#293349",
        },
        pitch: {
          light: "#F7F4EC",
          card: "#FFFFFF",
        },
        ball: {
          DEFAULT: "#D62839",
          dark: "#B01E2C",
          light: "#F0555F",
        },
        flood: {
          DEFAULT: "#F4C95D",
          dark: "#D9A93A",
        },
        turf: {
          DEFAULT: "#2E8B57",
          dark: "#1F6E43",
        },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(214, 40, 57, 0.35)",
        floodlight: "0 0 60px rgba(244, 201, 93, 0.25)",
      },
      backgroundImage: {
        "stadium-radial":
          "radial-gradient(circle at 50% 0%, rgba(244,201,93,0.08), transparent 60%)",
      },
    },
  },
  plugins: [],
};
