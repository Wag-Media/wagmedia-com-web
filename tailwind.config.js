const { fontFamily } = require("tailwindcss/defaultTheme")

// Custom color with css variable color in __theme_color.scss
function customColors(cssVar) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${cssVar}), ${opacityValue})`
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`
    }
    return `rgb(var(${cssVar}))`
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: "true",
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        md: "4rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          50: 'customColors("--c-primary-50")',
          100: 'customColors("--c-primary-100")',
          200: 'customColors("--c-primary-200")',
          300: 'customColors("--c-primary-300")',
          400: 'customColors("--c-primary-400")',
          500: 'customColors("--c-primary-500")',
          700: 'customColors("--c-primary-700")',
          800: 'customColors("--c-primary-800")',
          900: 'customColors("--c-primary-900")',
          6000: 'customColors("--c-primary-600")',
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      boxShadow: {
        black: "0 0 0 2px rgba(218,102,123,1), 6px 6px 0 0 rgba(218,102,123,1)",
        white: "0 35px 60px -15px rgba(255, 255, 255, 0.1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        blob: {
          0: {
            transform: "translate(0, 0) scale(1)",
          },
          "33%": {
            transform: "translate(-10%, -10%) scale(0.8)",
          },
          "66%": {
            transform: "translate(-20%, 5%) scale(1.4)",
          },
          "100%": {
            transform: "translate(0, 0) scale(1)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "avatar-1": {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(15px, 10px) rotate(2deg)" },
          "50%": { transform: "translate(-5px, 20px) rotate(-1deg)" },
          "75%": { transform: "translate(-10px, 5px) rotate(1deg)" },
          "100%": { transform: "translate(0, 0) rotate(0deg)" },
        },
        "avatar-2": {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(-15px, -10px) rotate(-2deg)" },
          "50%": { transform: "translate(5px, -20px) rotate(1deg)" },
          "75%": { transform: "translate(10px, -5px) rotate(-1deg)" },
          "100%": { transform: "translate(0, 0) rotate(0deg)" },
        },
        "avatar-3": {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(-10px, 15px) rotate(-1deg)" },
          "50%": { transform: "translate(20px, -5px) rotate(2deg)" },
          "75%": { transform: "translate(5px, -15px) rotate(-2deg)" },
          "100%": { transform: "translate(0, 0) rotate(0deg)" },
        },
        "avatar-4": {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(10px, -15px) rotate(1deg)" },
          "50%": { transform: "translate(-20px, 5px) rotate(-2deg)" },
          "75%": { transform: "translate(-5px, 15px) rotate(2deg)" },
          "100%": { transform: "translate(0, 0) rotate(0deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blob: "blob 7s infinite",
        "avatar-1": "avatar-1 19s ease-in-out infinite",
        "avatar-2": "avatar-2 19s ease-in-out infinite",
        "avatar-3": "avatar-3 19s ease-in-out infinite",
        "avatar-4": "avatar-4 19s ease-in-out infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
}
