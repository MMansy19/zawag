/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom color palette using CSS variables for admin configurability
      colors: {
        primary: {
          50: "hsl(var(--primary-50))",
          100: "hsl(var(--primary-100))",
          200: "hsl(var(--primary-200))",
          300: "hsl(var(--primary-300))",
          400: "hsl(var(--primary-400))",
          500: "var(--primary-color, #1E88E5)",
          600: "hsl(var(--primary-600))",
          700: "hsl(var(--primary-700))",
          800: "hsl(var(--primary-800))",
          900: "hsl(var(--primary-900))",
          DEFAULT: "var(--primary-color, #1E88E5)",
          hover: "var(--primary-hover, #1565C0)",
        },
        secondary: {
          50: "hsl(var(--secondary-50))",
          100: "hsl(var(--secondary-100))",
          200: "hsl(var(--secondary-200))",
          300: "hsl(var(--secondary-300))",
          400: "hsl(var(--secondary-400))",
          500: "var(--secondary-color, #4CAF50)",
          600: "hsl(var(--secondary-600))",
          700: "hsl(var(--secondary-700))",
          800: "hsl(var(--secondary-800))",
          900: "hsl(var(--secondary-900))",
          DEFAULT: "var(--secondary-color, #4CAF50)",
          hover: "var(--secondary-hover, #388E3C)",
        },
        accent: {
          50: "hsl(var(--accent-50))",
          100: "hsl(var(--accent-100))",
          200: "hsl(var(--accent-200))",
          300: "hsl(var(--accent-300))",
          400: "hsl(var(--accent-400))",
          500: "var(--accent-color, #FBC02D)",
          600: "hsl(var(--accent-600))",
          700: "hsl(var(--accent-700))",
          800: "hsl(var(--accent-800))",
          900: "hsl(var(--accent-900))",
          DEFAULT: "var(--accent-color, #FBC02D)",
          hover: "var(--accent-hover, #F9A825)",
        },
        background: {
          DEFAULT: "var(--background-color, #F5F5F5)",
          secondary: "var(--background-secondary, #FFFFFF)",
        },
        text: {
          DEFAULT: "var(--text-color, #212121)",
          secondary: "var(--text-secondary, #757575)",
        },
        error: {
          DEFAULT: "var(--error-color, #D32F2F)",
          hover: "var(--error-hover, #B71C1C)",
        },
        border: {
          DEFAULT: "var(--border-color, #E0E0E0)",
          secondary: "var(--border-secondary, #B0BEC5)",
        },
        card: {
          DEFAULT: "var(--card-bg, #FFFFFF)",
          shadow: "var(--card-shadow, rgba(0, 0, 0, 0.05))",
        },
        modal: {
          DEFAULT: "var(--modal-bg, #FFFFFF)",
          shadow: "var(--modal-shadow, rgba(0, 0, 0, 0.2))",
        },
        disabled: {
          DEFAULT: "var(--disabled-color, #B0BEC5)",
          bg: "var(--disabled-bg, #ECEFF1)",
        },
      },

      // Typography using Arabic fonts
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Noto Kufi Arabic",
          "Amiri",
          "system-ui",
          "sans-serif",
        ],
        serif: ["var(--font-serif)", "Amiri", "Georgia", "serif"],
        arabic: ["Noto Kufi Arabic", "Amiri", "system-ui"],
        kufi: ["Noto Kufi Arabic", "system-ui"],
        amiri: ["Amiri", "serif"],
      },

      // Custom font sizes using CSS variables
      fontSize: {
        xs: [
          "var(--font-size-xs, 0.75rem)",
          { lineHeight: "var(--line-height-tight, 1.2)" },
        ],
        sm: [
          "var(--font-size-sm, 0.875rem)",
          { lineHeight: "var(--line-height-normal, 1.5)" },
        ],
        base: [
          "var(--font-size-md, 1rem)",
          { lineHeight: "var(--line-height-normal, 1.5)" },
        ],
        lg: [
          "var(--font-size-lg, 1.25rem)",
          { lineHeight: "var(--line-height-normal, 1.5)" },
        ],
        xl: [
          "var(--font-size-xl, 1.5rem)",
          { lineHeight: "var(--line-height-tight, 1.2)" },
        ],
        "2xl": [
          "var(--font-size-2xl, 2rem)",
          { lineHeight: "var(--line-height-tight, 1.2)" },
        ],
        "3xl": [
          "var(--font-size-3xl, 2.5rem)",
          { lineHeight: "var(--line-height-tight, 1.2)" },
        ],
      },

      // Custom spacing using CSS variables
      spacing: {
        xxs: "var(--spacing-xxs, 0.25rem)",
        xs: "var(--spacing-xs, 0.5rem)",
        sm: "var(--spacing-sm, 1rem)",
        md: "var(--spacing-md, 1.5rem)",
        lg: "var(--spacing-lg, 2rem)",
        xl: "var(--spacing-xl, 3rem)",
        "2xl": "var(--spacing-2xl, 4rem)",
        "3xl": "var(--spacing-3xl, 6rem)",
      },

      // Custom border radius
      borderRadius: {
        sm: "var(--radius-sm, 0.25rem)",
        md: "var(--radius-md, 0.5rem)",
        lg: "var(--radius-lg, 0.75rem)",
        full: "var(--radius-full, 9999px)",
      },

      // Custom shadows
      boxShadow: {
        sm: "var(--shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.05))",
        md: "var(--shadow-md, 0 4px 8px rgba(0, 0, 0, 0.05))",
        lg: "var(--shadow-lg, 0 8px 16px rgba(0, 0, 0, 0.05))",
        xl: "var(--shadow-xl, 0 12px 24px rgba(0, 0, 0, 0.2))",
      },

      // Custom transitions
      transitionDuration: {
        fast: "var(--transition-fast, 200ms)",
        normal: "var(--transition-normal, 300ms)",
        slow: "var(--transition-slow, 500ms)",
      },

      // Animation configurations
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInRTL: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },

      animation: {
        fadeIn: "fadeIn var(--transition-normal, 300ms) ease-in-out",
        slideIn: "slideIn var(--transition-normal, 300ms) ease-out",
        slideInRTL: "slideInRTL var(--transition-normal, 300ms) ease-out",
        scaleIn: "scaleIn var(--transition-fast, 200ms) ease-out",
        pulse: "pulse 1.5s infinite",
        spin: "spin 1s linear infinite",
        bounce: "bounce 1s infinite",
      },

      // Responsive breakpoints for Arabic content
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      // Grid configurations for profile cards
      gridTemplateColumns: {
        "auto-fit-cards": "repeat(auto-fit, minmax(280px, 1fr))",
        "auto-fill-cards": "repeat(auto-fill, minmax(280px, 1fr))",
      },

      // Custom backdrop blur
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [
    // RTL support for Arabic
    require("@tailwindcss/rtl"),

    // Custom plugin for Islamic design utilities
    function ({ addUtilities, addComponents, theme }) {
      // Islamic-specific utilities
      addUtilities({
        ".text-islamic-primary": {
          color: theme("colors.primary.DEFAULT"),
        },
        ".bg-islamic-secondary": {
          backgroundColor: theme("colors.secondary.DEFAULT"),
        },
        ".rtl-flip": {
          transform: "scaleX(-1)",
        },
        ".writing-mode-vertical": {
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        },
      });

      // Islamic design components
      addComponents({
        ".islamic-card": {
          backgroundColor: theme("colors.card.DEFAULT"),
          borderRadius: theme("borderRadius.md"),
          boxShadow: theme("boxShadow.sm"),
          padding: theme("spacing.md"),
          border: `1px solid ${theme("colors.border.DEFAULT")}`,
          transition: `all ${theme("transitionDuration.normal")} ease-in-out`,
          "&:hover": {
            boxShadow: theme("boxShadow.md"),
          },
        },
        ".islamic-button": {
          padding: `${theme("spacing.sm")} ${theme("spacing.md")}`,
          borderRadius: theme("borderRadius.sm"),
          fontWeight: theme("fontWeight.medium"),
          fontSize: theme("fontSize.base[0]"),
          lineHeight: theme("fontSize.base[1].lineHeight"),
          transition: `all ${theme("transitionDuration.fast")} ease-in-out`,
          cursor: "pointer",
          border: "none",
          "&:focus": {
            outline: `2px solid ${theme("colors.primary.DEFAULT")}`,
            outlineOffset: "2px",
          },
          "&:disabled": {
            backgroundColor: theme("colors.disabled.bg"),
            color: theme("colors.disabled.DEFAULT"),
            cursor: "not-allowed",
          },
        },
        ".islamic-input": {
          padding: theme("spacing.sm"),
          borderRadius: theme("borderRadius.sm"),
          fontSize: theme("fontSize.base[0]"),
          lineHeight: theme("fontSize.base[1].lineHeight"),
          border: `1px solid ${theme("colors.border.DEFAULT")}`,
          backgroundColor: theme("colors.background.secondary"),
          color: theme("colors.text.DEFAULT"),
          transition: `all ${theme("transitionDuration.fast")} ease-in-out`,
          "&:focus": {
            borderColor: theme("colors.primary.DEFAULT"),
            boxShadow: `0 0 0 2px ${theme("colors.primary.DEFAULT")}20`,
            outline: "none",
          },
          "&:disabled": {
            backgroundColor: theme("colors.disabled.bg"),
            color: theme("colors.disabled.DEFAULT"),
            cursor: "not-allowed",
          },
        },
      });
    },
  ],

  // Dark mode configuration (disabled for light-mode-only requirement)
  darkMode: "class", // Keep for potential future use

  // Important prefix for CSS specificity
  important: false,

  // Separator for responsive/state prefixes
  separator: ":",

  // Prefix for all CSS classes
  prefix: "",

  // Core plugins configuration
  corePlugins: {
    preflight: true,
  },
};
