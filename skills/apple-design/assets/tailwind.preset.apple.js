/**
 * Apple Design System - Tailwind CSS Preset
 * Plug-and-play preset conforming to Apple HIG standards.
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        apple: {
          blue: "var(--apple-blue, #007AFF)",
          green: "var(--apple-green, #34C759)",
          indigo: "var(--apple-indigo, #5856D6)",
          orange: "var(--apple-orange, #FF9500)",
          pink: "var(--apple-pink, #FF2D55)",
          purple: "var(--apple-purple, #AF52DE)",
          red: "var(--apple-red, #FF3B30)",
          teal: "var(--apple-teal, #5AC8FA)",
          yellow: "var(--apple-yellow, #FFCC00)",
          background: "var(--apple-system-background, #FFFFFF)",
          "secondary-background": "var(--apple-secondary-system-background, #F2F2F7)",
          "tertiary-background": "var(--apple-tertiary-system-background, #FFFFFF)",
          "grouped-background": "var(--apple-system-grouped-background, #F2F2F7)",
          "secondary-grouped": "var(--apple-secondary-grouped-background, #FFFFFF)",
          label: "var(--apple-label, #000000)",
          "secondary-label": "var(--apple-secondary-label, rgba(60, 60, 67, 0.60))",
          "tertiary-label": "var(--apple-tertiary-label, rgba(60, 60, 67, 0.30))",
          "quaternary-label": "var(--apple-quaternary-label, rgba(60, 60, 67, 0.18))",
          separator: "var(--apple-separator, rgba(60, 60, 67, 0.29))",
          fill: "var(--apple-system-fill, rgba(120, 120, 128, 0.20))",
          "secondary-fill": "var(--apple-secondary-system-fill, rgba(120, 120, 128, 0.16))",
        }
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"SF Pro"',
          '"Helvetica Neue"',
          "sans-serif"
        ],
        mono: [
          "ui-monospace",
          '"SF Mono"',
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace"
        ],
        serif: [
          '"New York"',
          "ui-serif",
          "Georgia",
          "Cambria",
          "serif"
        ]
      },
      borderRadius: {
        "apple-sm": "8px",
        "apple-md": "12px",
        "apple-lg": "16px",
        "apple-xl": "22px",
        "apple-2xl": "28px",
        "apple-3xl": "36px",
      },
      boxShadow: {
        "apple-sm": "0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.02)",
        "apple-md": "0 4px 14px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.03)",
        "apple-lg": "0 10px 30px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)",
        "apple-sheet": "0 -4px 30px rgba(0, 0, 0, 0.12)",
      },
      transitionTimingFunction: {
        "apple-interactive": "cubic-bezier(0.25, 1, 0.5, 1)",
        "apple-sheet": "cubic-bezier(0.32, 0.72, 0, 1)",
        "apple-bounce": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }
    }
  }
};
