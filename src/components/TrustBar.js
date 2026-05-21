// src/components/TrustBar.js

import { motion } from "framer-motion";
import { theme } from "../theme";

const STATS = [
  { number: "10,000+", label: "Happy Customers" },
  { number: "82+", label: "Curated Products" },
  { number: "4.9", label: "Average Rating", suffix: "/5" },
  { number: "24h", label: "Fast Shipping" },
];

const PRESS = ["VOGUE", "ELLE", "ALLURE", "HARPER'S BAZAAR", "COSMOPOLITAN"];

export default function TrustBar() {
  return (
    <div style={wrap}>
      {/* STATS */}
      <div style={statsContainer}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={statItem}
          >
            <div style={statNumber}>
              {stat.number}
              {stat.suffix && <span style={suffix}>{stat.suffix}</span>}
            </div>
            <div style={statLabel}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* PRESS LOGOS (as styled text) */}
      <div style={pressContainer}>
        <div style={pressLabel}>FEATURED IN</div>
        <div style={pressList}>
          {PRESS.map((name) => (
            <span key={name} style={pressItem}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const wrap = {
  background: theme.colors.card,
  padding: "50px 24px",
  borderTop: `1px solid ${theme.colors.border}`,
  borderBottom: `1px solid ${theme.colors.border}`,
};

const statsContainer = {
  maxWidth: 1100,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 24,
  marginBottom: 40,
};

const statItem = {
  textAlign: "center",
  padding: "0 14px",
};

const statNumber = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 38,
  fontWeight: 700,
  color: theme.colors.dark,
  letterSpacing: "-0.02em",
  lineHeight: 1,
};

const suffix = {
  fontSize: 18,
  fontWeight: 400,
  color: theme.colors.muted,
  marginLeft: 2,
};

const statLabel = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: theme.colors.muted,
  marginTop: 10,
  fontWeight: 600,
};

const pressContainer = {
  maxWidth: 1100,
  margin: "0 auto",
  paddingTop: 30,
  borderTop: `1px solid ${theme.colors.border}`,
  textAlign: "center",
};

const pressLabel = {
  fontSize: 11,
  letterSpacing: "0.3em",
  color: theme.colors.muted,
  fontWeight: 600,
  marginBottom: 18,
};

const pressList = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "clamp(20px, 4vw, 50px)",
  flexWrap: "wrap",
};

const pressItem = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 18,
  fontWeight: 600,
  color: theme.colors.dark,
  letterSpacing: "0.1em",
  opacity: 0.7,
  transition: "opacity 0.3s ease",
};