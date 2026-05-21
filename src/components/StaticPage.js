import { motion } from "framer-motion";
import { theme } from "../theme";

export default function StaticPage({ title, subtitle, sections, lastUpdated }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={page}
    >
      {/* HEADER */}
      <div style={header}>
        <h1 style={titleStyle}>{title}</h1>
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        {lastUpdated && (
          <p style={updated}>Last updated: {lastUpdated}</p>
        )}
      </div>

      {/* CONTENT */}
      <div style={container}>
        {sections.map((section, i) => (
          <div key={i} style={sectionStyle}>
            {section.heading && (
              <h2 style={sectionHeading}>{section.heading}</h2>
            )}
            {Array.isArray(section.content) ? (
              section.content.map((paragraph, j) => (
                <p key={j} style={paragraphStyle}>
                  {paragraph}
                </p>
              ))
            ) : (
              <p style={paragraphStyle}>{section.content}</p>
            )}
            {section.list && (
              <ul style={listStyle}>
                {section.list.map((item, k) => (
                  <li key={k} style={listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ================= STYLES ================= */

const page = {
  background: theme.colors.bg,
  minHeight: "100vh",
};

const header = {
  textAlign: "center",
  padding: "50px 24px 30px",
  background: theme.colors.card,
  borderBottom: `1px solid ${theme.colors.border}`,
};

const titleStyle = {
  fontSize: 36,
  fontWeight: 700,
  color: theme.colors.dark,
  margin: 0,
};

const subtitleStyle = {
  fontSize: 16,
  color: theme.colors.muted,
  marginTop: 10,
  maxWidth: 600,
  marginLeft: "auto",
  marginRight: "auto",
  lineHeight: 1.6,
};

const updated = {
  fontSize: 12,
  color: theme.colors.muted,
  marginTop: 16,
  fontStyle: "italic",
};

const container = {
  maxWidth: 800,
  margin: "0 auto",
  padding: "40px 24px 60px",
};

const sectionStyle = {
  marginBottom: 30,
};

const sectionHeading = {
  fontSize: 22,
  fontWeight: 700,
  color: theme.colors.dark,
  marginBottom: 12,
  marginTop: 0,
};

const paragraphStyle = {
  fontSize: 15,
  color: theme.colors.text,
  lineHeight: 1.8,
  marginBottom: 12,
};

const listStyle = {
  paddingLeft: 24,
  marginTop: 12,
  marginBottom: 0,
};

const listItem = {
  fontSize: 15,
  color: theme.colors.text,
  lineHeight: 1.8,
  marginBottom: 8,
};