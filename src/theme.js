// src/theme.js
//
// Two themes: light + dark. Pick via useTheme hook.

const light = {
  mode: "light",
  colors: {
    primary: "#c2687a",
    dark: "#7d2a3c",
    bg: "#fff5f7",
    card: "#ffffff",
    border: "rgba(194,104,122,0.12)",
    muted: "rgba(125,42,60,0.7)",
    text: "#1a1a1a",
    inputBg: "#fafafa",
  },
  radius: {
    card: "22px",
    button: "30px",
    soft: "16px",
  },
  shadow: {
    card: "0 6px 18px rgba(0,0,0,0.04)",
    hover: "0 10px 25px rgba(0,0,0,0.06)",
  },
  spacing: {
    xs: "6px",
    sm: "10px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  font: {
    primary: "'Inter', sans-serif",
  },
};

const dark = {
  mode: "dark",
  colors: {
    primary: "#e89aac",       // softer rose for contrast
    dark: "#f8e6ea",          // text color (was dark, now light)
    bg: "#1a1419",            // deep dark background
    card: "#2a1f25",          // raised dark surface
    border: "rgba(232,154,172,0.15)",
    muted: "rgba(248,230,234,0.6)",
    text: "#f5f5f5",
    inputBg: "#2a1f25",
  },
  radius: light.radius,
  shadow: {
    card: "0 6px 18px rgba(0,0,0,0.4)",
    hover: "0 10px 25px rgba(0,0,0,0.5)",
  },
  spacing: light.spacing,
  font: light.font,
};

// 🟢 The "theme" export stays so existing code works.
// We pick light/dark based on a localStorage flag.
const savedMode =
  typeof localStorage !== "undefined"
    ? localStorage.getItem("themeMode")
    : null;

export const theme = savedMode === "dark" ? dark : light;

// also export both for the toggle to switch between
export const themes = { light, dark };