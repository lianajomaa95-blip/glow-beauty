// src/components/Newsletter.js

import { useState } from "react";
import { theme } from "../theme";
import { trackNewsletterSignup } from "../utils/analytics";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError("Please enter a valid email");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("newsletter_emails")) || [];

    if (existing.includes(email.toLowerCase())) {
      setError("You're already subscribed ✨");
      return;
    }

    existing.push(email.toLowerCase());
    localStorage.setItem("newsletter_emails", JSON.stringify(existing));

    trackNewsletterSignup(email);

    setSuccess(true);
    setEmail("");

    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div style={wrap}>
      <div style={inner}>
        <div style={{ fontSize: 30 }}>✨</div>

        <h2 style={title}>Join the Aura Club</h2>

        <p style={subtitle}>
          Get 10% off your first order + weekly skincare tips
        </p>

        {success ? (
          <div style={successBox}>
            🎉 Welcome to Aura! Check your inbox for your discount code.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={form}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              style={input}
            />
            <button type="submit" style={btn}>
              Subscribe
            </button>
          </form>
        )}

        {error && <p style={errorText}>{error}</p>}

        <p style={smallText}>No spam, ever. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}

const wrap = {
  padding: "60px 20px",
  background: theme.mode === "dark"
    ? "linear-gradient(135deg, #2a1f25, #1a1419)"
    : "linear-gradient(135deg, #fff5f7, #fdf1f4)",
  borderTop: `1px solid ${theme.colors.border}`,
};

const inner = {
  maxWidth: 520,
  margin: "0 auto",
  textAlign: "center",
};

const title = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 32,
  fontWeight: 600,
  marginTop: 12,
  marginBottom: 8,
  color: theme.colors.dark,
  letterSpacing: "-0.01em",
};

const subtitle = {
  color: theme.colors.muted,
  marginTop: 0,
  marginBottom: 20,
  fontSize: 15,
};

const form = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  justifyContent: "center",
};

const input = {
  flex: 1,
  minWidth: 200,
  padding: "14px 18px",
  borderRadius: 12,
  border: `1px solid ${theme.colors.border}`,
  background: theme.colors.card,
  color: theme.colors.text,
  outline: "none",
  fontSize: 14,
};

const btn = {
  padding: "14px 24px",
  borderRadius: 12,
  border: "none",
  background: theme.colors.primary,
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: 14,
};

const successBox = {
  background: "#d7f5df",
  color: "#1d8a3f",
  padding: "16px 20px",
  borderRadius: 12,
  fontSize: 14,
};

const errorText = {
  color: "#c33",
  fontSize: 13,
  marginTop: 10,
};

const smallText = {
  fontSize: 11,
  color: theme.colors.muted,
  marginTop: 12,
};