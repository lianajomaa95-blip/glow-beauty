// src/components/SectionDivider.js
//
// Decorative divider for between sections.
// Variants: "line", "ornament", "dots"

import { theme } from "../theme";

export default function SectionDivider({ variant = "ornament" }) {
  if (variant === "line") {
    return (
      <div style={wrap}>
        <div style={line} />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div style={wrap}>
        <div style={dotsRow}>
          <span style={dot} />
          <span style={dot} />
          <span style={dot} />
        </div>
      </div>
    );
  }

  // Default: ornament (line ⸙ line)
  return (
    <div style={wrap}>
      <div style={ornament}>
        <div style={ornamentLine} />
        <span style={ornamentSymbol}>✦</span>
        <div style={ornamentLine} />
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const wrap = {
  display: "flex",
  justifyContent: "center",
  padding: "20px 24px",
};

const line = {
  width: 80,
  height: 1,
  background: theme.colors.border,
};

const dotsRow = {
  display: "flex",
  gap: 8,
};

const dot = {
  width: 4,
  height: 4,
  borderRadius: "50%",
  background: theme.colors.primary,
  opacity: 0.5,
};

const ornament = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  maxWidth: 200,
  width: "100%",
  justifyContent: "center",
};

const ornamentLine = {
  flex: 1,
  height: 1,
  background: `linear-gradient(to right, transparent, ${theme.colors.border}, transparent)`,
};

const ornamentSymbol = {
  fontSize: 14,
  color: theme.colors.primary,
  opacity: 0.7,
};