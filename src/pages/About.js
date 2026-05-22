// src/pages/About.js
//
// Premium accordion-style About page with expandable sections.
// Aura Store branded.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { theme } from "../theme";

const SECTIONS = [
  {
    id: "story",
    title: "Our Story",
    eyebrow: "01",
    content: `Aura Store was born from a simple belief: skincare shouldn't be complicated, overpriced, or full of empty promises.

We curate only the formulas trusted by dermatologists worldwide — bringing you the best of Avène, La Roche-Posay, and other gold-standard names in skin health.

Founded with a vision to make dermatological skincare accessible across the Middle East, we believe that everyone deserves products that actually work — backed by science, not marketing hype.`,
  },
  {
    id: "philosophy",
    title: "Our Philosophy",
    eyebrow: "02",
    content: `We believe that great skincare is rooted in science, not marketing.

Every product in our edit has been tested, vetted, and approved by skin experts. We don't chase trends — we chase results.

Our promise to you:
- Only dermatologist-approved formulas
- Transparent ingredient information
- Honest pricing, no hidden markups
- Real results, not empty claims`,
  },
  {
    id: "what-makes-us",
    title: "What Makes Us Different",
    eyebrow: "03",
    content: `Curated selection — every single product is hand-picked for proven efficacy and safety. We say no to 90% of skincare to bring you the 10% that truly delivers.

Personalized experience — our AI-powered skin quiz analyzes your unique skin profile and creates a routine just for you.

Expert curation — our team includes dermatology consultants and skincare specialists who review every product before it joins our catalog.

Fast delivery — across Lebanon and the Middle East, your routine arrives within 24-48 hours.`,
  },
  {
    id: "brands",
    title: "Brands We Trust",
    eyebrow: "04",
    content: `Avène — Born from a French thermal spring discovered in 1736, Avène's soothing water has been calming sensitive skin for centuries. Their fragrance-free, dermatologist-tested formulas are recommended by skin specialists worldwide.

La Roche-Posay — Trusted by 90,000+ dermatologists globally. Born from a thermal spring in central France, every formula is created with skin sensitivity in mind. Loved by everyone from teenagers to professionals.

We work directly with authorized distributors to ensure 100% authenticity. No counterfeits. No expired stock. Just the real thing.`,
  },
  {
    id: "promise",
    title: "Our Promise To You",
    eyebrow: "05",
    content: `Authenticity guaranteed — every product is sourced from authorized channels.

Privacy first — your skin quiz answers stay on your device. We never sell your data.

Personalized always — your routine, your way. Cancel anytime, no questions asked.

Real support — human responses, never robotic chatbots. We answer within hours, not days.

Quality over quantity — we'd rather offer 100 amazing products than 10,000 mediocre ones.`,
  },
  {
    id: "contact",
    title: "Get in Touch",
    eyebrow: "06",
    content: `Have questions? Want personalized recommendations? We'd love to hear from you.

📧 Email: lianajomaa95@gmail.com
📱 WhatsApp: +961 76 809 185
📍 Lebanon — shipping across the Middle East

For partnerships, brand inquiries, or media:
Reach out via our contact page and we'll get back to you within 24 hours.`,
  },
];

export default function About() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState("story"); // First section open by default

  const toggle = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <>
      <SEO
        title="About Us"
        description="Aura Store: curated luxury skincare, born from a love of dermatologist-approved formulas. Discover our story."
      />

      <div style={page}>
        {/* HERO */}
        <div style={hero}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={heroInner}
          >
            <span style={heroEyebrow}>OUR STORY</span>
            <h1 style={heroTitle}>
              Where <span style={italic}>dermatology</span> meets
              <br />
              daily ritual
            </h1>
            <p style={heroSubtitle}>
              Curated luxury skincare, born from a love of dermatologist-approved formulas
            </p>
          </motion.div>
        </div>

        {/* ACCORDION SECTIONS */}
        <div style={accordion}>
          {SECTIONS.map((section, i) => {
            const isOpen = openSection === section.id;

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={accordionItem}
              >
                <button
                  onClick={() => toggle(section.id)}
                  style={{
                    ...accordionHeader,
                    ...(isOpen ? accordionHeaderOpen : {}),
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`section-${section.id}`}
                >
                  <div style={headerLeft}>
                    <span style={sectionNumber}>{section.eyebrow}</span>
                    <h2 style={sectionTitle}>{section.title}</h2>
                  </div>
                  <div style={{ ...icon, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`section-${section.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={accordionContent}>
                        {section.content.split("\n\n").map((paragraph, idx) => (
                          <p key={idx} style={paragraph_style}>
                            {paragraph.split("\n").map((line, lineIdx, arr) => (
                              <span key={lineIdx}>
                                {line}
                                {lineIdx < arr.length - 1 && <br />}
                              </span>
                            ))}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={ctaSection}
        >
          <div style={ctaContent}>
            <span style={ctaEyebrow}>READY TO BEGIN?</span>
            <h2 style={ctaTitle}>
              Start your <span style={italicLight}>glow journey</span>
            </h2>
            <p style={ctaSubtitle}>
              Take our 2-minute quiz and discover the routine that's perfect for your skin.
            </p>
            <div style={ctaButtons}>
              <button onClick={() => navigate("/skin-quiz")} style={primaryBtn}>
                Take the Quiz
              </button>
              <button onClick={() => navigate("/shop")} style={secondaryBtn}>
                Browse Products →
              </button>
            </div>
          </div>
        </motion.div>

        {/* LAST UPDATED */}
        <p style={lastUpdated}>Last updated · January 2026</p>
      </div>
    </>
  );
}

/* ============================================================
   STYLES
   ============================================================ */

const page = {
  background: theme.colors.bg,
  minHeight: "100vh",
};

/* HERO */
const hero = {
  background: `linear-gradient(135deg, ${theme.colors.dark} 0%, ${theme.colors.primary} 100%)`,
  padding: "100px 24px 90px",
  color: "#fff",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
};

const heroInner = {
  maxWidth: 800,
  margin: "0 auto",
  position: "relative",
  zIndex: 1,
};

const heroEyebrow = {
  display: "inline-block",
  fontSize: 11,
  letterSpacing: "0.35em",
  fontWeight: 600,
  marginBottom: 24,
  opacity: 0.9,
  textTransform: "uppercase",
};

const heroTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(36px, 5.5vw, 60px)",
  fontWeight: 700,
  margin: 0,
  lineHeight: 1.15,
  letterSpacing: "-0.02em",
  color: "#fff",
};

const italic = {
  fontStyle: "italic",
  fontWeight: 400,
  color: "#ffd4a3",
};

const italicLight = {
  fontStyle: "italic",
  fontWeight: 400,
};

const heroSubtitle = {
  fontSize: 16,
  marginTop: 24,
  lineHeight: 1.6,
  opacity: 0.95,
  maxWidth: 500,
  margin: "24px auto 0",
};

/* ACCORDION */
const accordion = {
  maxWidth: 880,
  margin: "0 auto",
  padding: "80px 24px 60px",
};

const accordionItem = {
  borderBottom: `1px solid ${theme.colors.border}`,
};

const accordionHeader = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "transparent",
  border: "none",
  padding: "32px 0",
  cursor: "pointer",
  textAlign: "left",
  fontFamily: "inherit",
  color: theme.colors.dark,
  transition: "all 0.3s ease",
};

const accordionHeaderOpen = {
  color: theme.colors.primary,
};

const headerLeft = {
  display: "flex",
  alignItems: "center",
  gap: 24,
  flex: 1,
};

const sectionNumber = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 14,
  fontWeight: 500,
  color: theme.colors.primary,
  letterSpacing: "0.1em",
  fontStyle: "italic",
  minWidth: 30,
};

const sectionTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(20px, 3vw, 28px)",
  fontWeight: 500,
  margin: 0,
  letterSpacing: "-0.01em",
  lineHeight: 1.2,
};

const icon = {
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 0.4s ease",
  color: "currentColor",
};

const accordionContent = {
  padding: "0 0 36px",
  paddingLeft: 0,
  maxWidth: 700,
};

const paragraph_style = {
  fontSize: 15,
  lineHeight: 1.8,
  color: theme.colors.text,
  marginBottom: 18,
  whiteSpace: "pre-line",
};

/* CTA SECTION */
const ctaSection = {
  background: theme.colors.card,
  padding: "80px 24px",
  marginTop: 40,
  borderTop: `1px solid ${theme.colors.border}`,
};

const ctaContent = {
  maxWidth: 720,
  margin: "0 auto",
  textAlign: "center",
};

const ctaEyebrow = {
  display: "inline-block",
  fontSize: 11,
  letterSpacing: "0.3em",
  fontWeight: 600,
  color: theme.colors.primary,
  marginBottom: 18,
  textTransform: "uppercase",
};

const ctaTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(30px, 4.5vw, 44px)",
  fontWeight: 700,
  color: theme.colors.dark,
  margin: 0,
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
};

const ctaSubtitle = {
  fontSize: 16,
  color: theme.colors.muted,
  marginTop: 16,
  marginBottom: 32,
  lineHeight: 1.6,
};

const ctaButtons = {
  display: "flex",
  gap: 14,
  justifyContent: "center",
  flexWrap: "wrap",
};

const primaryBtn = {
  padding: "16px 36px",
  background: theme.colors.dark,
  color: "#fff",
  border: "none",
  borderRadius: 0,
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  transition: "all 0.3s ease",
};

const secondaryBtn = {
  padding: "16px 28px",
  background: "transparent",
  color: theme.colors.dark,
  border: `1px solid ${theme.colors.dark}`,
  borderRadius: 0,
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  transition: "all 0.3s ease",
};

const lastUpdated = {
  textAlign: "center",
  fontSize: 11,
  color: theme.colors.muted,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  padding: "40px 24px 60px",
  margin: 0,
};