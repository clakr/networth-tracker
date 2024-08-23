import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ["tr:last-child>td"]: {
          borderBottom: "none",
        },
        th: {
          padding: "theme(spacing.3) theme(spacing.6)",
          textAlign: "start",
          color: "theme(colors.neutral.400)",
          fontWeight: "500",
          fontSize: "theme(fontSize.sm)",
        },
        td: {
          padding: "theme(spacing.3) theme(spacing.6)",
          whiteSpace: "nowrap",
          borderTop:
            "theme(borderWidth.DEFAULT) solid theme(colors.neutral.200)",
          borderBottom:
            "theme(borderWidth.DEFAULT) solid theme(colors.neutral.200)",
        },
      });
    }),
  ],
};
