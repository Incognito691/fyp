module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./features/**/*.{js,ts,jsx,tsx}", "./shared/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {

      // ─── COLORS ───────────────────────────────────────
      colors: {

        // Backgrounds
        background: "#0D0D0F",
        card:       "#161618",
        surface:    "#1C1C1F",

        // Borders
        border: {
          default: "rgba(255,255,255,0.08)",
          subtle:  "rgba(255,255,255,0.05)",
          strong:  "rgba(255,255,255,0.14)",
        },

        // Text
        text: {
          primary:   "#FFFFFF",
          secondary: "#9CA3AF",
          tertiary:  "#6B7280",
        },

        // Semantic — Solid (for buttons, icons)
        safe:    "#16A34A",
        warning: "#F97316",
        danger:  "#EF4444",
        info:    "#3B82F6",

        // Semantic — Dimmed (for card backgrounds)
        "safe-dim":    "rgba(22,163,74,0.12)",
        "warning-dim": "rgba(249,115,22,0.12)",
        "danger-dim":  "rgba(239,68,68,0.12)",
        "info-dim":    "rgba(59,130,246,0.12)",

        // Semantic — Text on dimmed backgrounds
        "safe-text":    "#4ADE80",
        "warning-text": "#FB923C",
        "danger-text":  "#F87171",
        "info-text":    "#60A5FA",

        // Semantic — Borders on dimmed cards
        "safe-border":    "rgba(22,163,74,0.25)",
        "warning-border": "rgba(249,115,22,0.25)",
        "danger-border":  "rgba(239,68,68,0.25)",
        "info-border":    "rgba(59,130,246,0.25)",

        // Glass
        "glass-default": "rgba(255,255,255,0.05)",
        "glass-strong":  "rgba(255,255,255,0.09)",
      },

      // ─── FONT SIZES ───────────────────────────────────
      fontSize: {
        "display": ["28px", { lineHeight: "1.2",  fontWeight: "700", letterSpacing: "-0.02em" }],
        "h1":      ["22px", { lineHeight: "1.3",  fontWeight: "700" }],
        "h2":      ["18px", { lineHeight: "1.35", fontWeight: "600" }],
        "h3":      ["15px", { lineHeight: "1.4",  fontWeight: "600" }],
        "body":    ["14px", { lineHeight: "1.6",  fontWeight: "400" }],
        "small":   ["12px", { lineHeight: "1.5",  fontWeight: "400" }],
        "label":   ["11px", { lineHeight: "1.4",  fontWeight: "500", letterSpacing: "0.06em" }],
      },

      // ─── FONT WEIGHTS ─────────────────────────────────
      fontWeight: {
        regular:   "400",
        medium:    "500",
        semibold:  "600",
        bold:      "700",
      },

      // ─── SPACING ──────────────────────────────────────
      // Tailwind already has 1=4px, 2=8px etc. These are named aliases:
      spacing: {
        "xs":  "4px",
        "sm":  "8px",
        "md":  "12px",
        "lg":  "16px",
        "xl":  "20px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "40px",
        "5xl": "48px",
        "6xl": "64px",
        "screen-padding": "20px",
        "card-padding":   "16px",
        "section-gap":    "24px",
      },

      // ─── BORDER RADIUS ────────────────────────────────
      borderRadius: {
        "xs":   "4px",   // tags, small chips
        "sm":   "8px",   // small buttons
        "md":   "12px",  // buttons, inputs
        "lg":   "16px",  // cards, modals
        "xl":   "20px",  // bottom sheets
        "full": "9999px", // badges, pills
      },

      // ─── BORDER WIDTH ─────────────────────────────────
      borderWidth: {
        DEFAULT: "1px",
        "0":     "0px",
        "2":     "2px",
      },

      // ─── ICON SIZES ───────────────────────────────────
      width: {
        "icon-sm": "16px",
        "icon-md": "20px",
        "icon-lg": "24px",
        "icon-xl": "32px",
        "avatar":  "40px",
        "avatar-lg": "56px",
      },
      height: {
        "icon-sm": "16px",
        "icon-md": "20px",
        "icon-lg": "24px",
        "icon-xl": "32px",
        "avatar":  "40px",
        "avatar-lg": "56px",
        "btn":     "48px",
        "btn-sm":  "38px",
        "input":   "52px",
        "tab-bar": "64px",
        "header":  "56px",
      },
    },
  },
  plugins: [],
};
