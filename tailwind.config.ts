import defaultTheme from "tailwindcss/defaultTheme.js"
import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"
import aspectRatio from "@tailwindcss/aspect-ratio"

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  corePlugins: {
    aspectRatio: false,
  },
  theme: {
    screens: {
      md: "640px",
      lg: "1024px",
      xl: "1500px", // this is the "design resolution"
    },
    extend: {
      container: {
        center: true,
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-xslow": "spin 7s linear infinite",
        "reverse-spin": "reverse-spin 1s linear infinite",
      },
      keyframes: {
        "reverse-spin": {
          from: {
            transform: "rotate(360deg)",
          },
        },
      },
      spacing: {
        "5vw": "5vw", // pull featured sections and navbar in the margin
        "8vw": "8vw", // positions hero img inside the margin
        "10vw": "10vw", // page margin
      },
      zIndex: {
        "-10": "-10",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xl: "1.375rem", // 22px
        "2xl": "1.5625rem", // 25px
        "3xl": "1.875rem", // 30px
        "4xl": "2.5rem", // 40px
        "5xl": "3.125rem", // 50px
        "6xl": "3.75rem", // 60px
        "7xl": "4.375rem", // 70px
      },
      gridTemplateRows: {
        "max-content": "max-content",
      },
      height: {
        hero: "min(60rem, calc(100vh - 10rem))", // screen - navbar height (lg: only)
      },
      maxWidth: {
        "8xl": "96rem",
      },
      maxHeight: {
        "50vh": "50vh", // max height for medium size hero images
        "75vh": "75vh", // max height for giant size hero images
      },
      rotate: {
        "-135": "-135deg",
        135: "135deg",
      },
    },
  },
  plugins: [typography, aspectRatio],
} satisfies Config
