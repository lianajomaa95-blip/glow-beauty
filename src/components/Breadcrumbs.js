// src/components/Breadcrumbs.js
//
// Reusable breadcrumb navigation: "Home / Skincare / Cleansers"

import { Link } from "react-router-dom";
import { theme } from "../theme";

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav style={nav} aria-label="Breadcrumb">
      <ol style={list}>
        {/* Home is always first */}
        <li style={item}>
          <Link to="/" style={link}>
            Home
          </Link>
          <span style={separator} aria-hidden="true">
            /
          </span>
        </li>

        {items.map((entry, i) => {
          const isLast = i === items.length - 1;

          return (
            <li key={i} style={item}>
              {entry.to && !isLast ? (
                <>
                  <Link to={entry.to} style={link}>
                    {entry.label}
                  </Link>
                  <span style={separator} aria-hidden="true">
                    /
                  </span>
                </>
              ) : (
                <span style={current} aria-current="page">
                  {entry.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ================= STYLES ================= */

const nav = {
  padding: "14px 24px",
  background: theme.colors.bg,
  borderBottom: `1px solid ${theme.colors.border}`,
};

const list = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 4,
  maxWidth: 1200,
  margin: "0 auto",
  padding: 0,
  listStyle: "none",
  fontSize: 12,
  color: theme.colors.muted,
};

const item = {
  display: "flex",
  alignItems: "center",
  gap: 4,
};

const link = {
  color: theme.colors.primary,
  textDecoration: "none",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  fontWeight: 600,
  fontSize: 11,
  transition: "color 0.2s ease",
};

const current = {
  color: theme.colors.dark,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  fontWeight: 600,
  fontSize: 11,
};

const separator = {
  color: theme.colors.muted,
  margin: "0 6px",
  opacity: 0.5,
};