/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-tint": "#4d44e3",
        "on-primary-container": "#dad7ff",
        "outline-variant": "#c7c4d8",
        "inverse-surface": "#213145",
        "on-secondary-fixed": "#131b2e",
        "surface-container-low": "#eff4ff",
        "secondary-fixed-dim": "#bec6e0",
        "primary-fixed-dim": "#c3c0ff",
        "on-tertiary-container": "#67f4b7",
        "on-secondary": "#ffffff",
        "surface-container-high": "#dce9ff",
        "surface": "#f8f9ff",
        "secondary": "#565e74",
        "on-error": "#ffffff",
        "on-secondary-fixed-variant": "#3f465c",
        "primary-fixed": "#e2dfff",
        "surface-dim": "#cbdbf5",
        "tertiary": "#005338",
        "inverse-primary": "#c3c0ff",
        "on-tertiary": "#ffffff",
        "surface-variant": "#d3e4fe",
        "inverse-on-surface": "#eaf1ff",
        "on-surface": "#0b1c30",
        "on-surface-variant": "#464555",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        "tertiary-fixed-dim": "#4edea3",
        "primary": "#3525cd",
        "surface-container-highest": "#d3e4fe",
        "on-secondary-container": "#5c647a",
        "outline": "#777587",
        "tertiary-container": "#006e4b",
        "on-primary": "#ffffff",
        "surface-bright": "#f8f9ff",
        "primary-container": "#4f46e5",
        "on-tertiary-fixed": "#002113",
        "surface-container": "#e5eeff",
        "surface-container-lowest": "#ffffff",
        "background": "#f8f9ff",
        "on-primary-fixed": "#0f0069",
        "tertiary-fixed": "#6ffbbe",
        "on-primary-fixed-variant": "#3323cc",
        "secondary-container": "#dae2fd",
        "secondary-fixed": "#dae2fd",
        "on-background": "#0b1c30",
        "on-tertiary-fixed-variant": "#005236",
        "error": "#ba1a1a"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      spacing: {
        base: "4px",
        "container-max": "1280px",
        "stack-md": "16px",
        "stack-sm": "8px",
        "stack-lg": "24px",
        gutter: "24px",
        "margin-page": "32px"
      },
      fontFamily: {
        h3: ["Inter"],
        "body-sm": ["Inter"],
        "body-md": ["Inter"],
        "body-lg": ["Inter"],
        "label-sm": ["Inter"],
        h1: ["Inter"],
        h2: ["Inter"],
        "label-md": ["Inter"]
      },
      fontSize: {
        h3: ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "500" }],
        h1: ["36px", { lineHeight: "44px", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["30px", { lineHeight: "38px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "600" }]
      }
    }
  },
  plugins: []
}