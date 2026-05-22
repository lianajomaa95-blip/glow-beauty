// src/components/Footer.js

import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={footer}>
      <div style={container}>
        {/* BRAND COLUMN */}
        <div>
          <h3 style={brandName}>GlowSkin</h3>
          <p style={tagline}>
            Curated luxury skincare from the world's most trusted dermatological
            brands.
          </p>
          <div style={socials}>
            <a
              href="https://wa.me/96176809185"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              style={socialIcon}
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              style={socialIcon}
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:lianajomaa95@gmail.com"
              aria-label="Email"
              style={socialIcon}
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* SHOP COLUMN */}
        <div>
          <h4 style={columnTitle}>Shop</h4>
          <ul style={linkList}>
            <li>
              <Link to="/shop" style={linkStyle}>
                All Products
              </Link>
            </li>
            <li>
              <Link to="/best-sellers" style={linkStyle}>
                Best Sellers
              </Link>
            </li>
            <li>
              <Link to="/under-30" style={linkStyle}>
                Under $30
              </Link>
            </li>
            <li>
              <Link to="/premium" style={linkStyle}>
                Premium
              </Link>
            </li>
            <li>
              <Link to="/brands" style={linkStyle}>
                Brands
              </Link>
            </li>
            <li>
              <Link to="/skincare" style={linkStyle}>
                Skincare Hub
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT COLUMN */}
        <div>
          <h4 style={columnTitle}>Support</h4>
          <ul style={linkList}>
            <li>
              <Link to="/contact" style={linkStyle}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/shipping" style={linkStyle}>
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/returns" style={linkStyle}>
                Returns
              </Link>
            </li>
            <li>
              <Link to="/faq" style={linkStyle}>
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* ABOUT COLUMN */}
        <div>
          <h4 style={columnTitle}>About</h4>
          <ul style={linkList}>
            <li>
              <Link to="/about" style={linkStyle}>
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/skin-quiz" style={linkStyle}>
                Skin Quiz
              </Link>
            </li>
            <li>
              <Link to="/routine" style={linkStyle}>
                Routine Builder
              </Link>
            </li>
            <li>
              <Link to="/privacy" style={linkStyle}>
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div style={bottomBar}>
        <p style={bottomText}>
          © {new Date().getFullYear()} GlowSkin · Demo portfolio · Built with
          React + Shopify
        </p>
      </div>
    </footer>
  );
}

/* ================= STYLES ================= */

const footer = {
  background: "#1a1419",
  color: "#fff",
  padding: "60px 24px 30px",
  marginTop: 60,
};

const container = {
  maxWidth: 1200,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 40,
  marginBottom: 40,
};

const brandName = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 28,
  fontWeight: 700,
  margin: "0 0 12px",
  color: "#fff",
};

const tagline = {
  fontSize: 13,
  lineHeight: 1.6,
  opacity: 0.7,
  marginBottom: 20,
};

const socials = {
  display: "flex",
  gap: 12,
};

const socialIcon = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: 16,
  textDecoration: "none",
};

const columnTitle = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "#fff",
  marginBottom: 18,
  marginTop: 0,
};

const linkList = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const linkStyle = {
  color: "rgba(255,255,255,0.7)",
  textDecoration: "none",
  fontSize: 14,
};

const bottomBar = {
  maxWidth: 1200,
  margin: "0 auto",
  paddingTop: 24,
  borderTop: "1px solid rgba(255,255,255,0.1)",
  textAlign: "center",
};

const bottomText = {
  fontSize: 12,
  opacity: 0.5,
  margin: 0,
};