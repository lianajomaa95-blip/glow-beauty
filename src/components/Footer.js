import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { theme } from "../theme";

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const go = (path) => navigate(path);

  return (
    <footer style={footer}>
      <div style={container}>
        {/* TOP — 4 COLUMNS */}
        <div style={grid}>
          {/* BRAND */}
          <div>
            <h2 style={brandTitle}>GlowSkin</h2>
            <p style={tagline}>
              Curated skincare for every skin type. Dermatologist-approved
              formulas from the world's most trusted brands.
            </p>
            <div style={socials}>
              <a
                href="https://wa.me/96176809185"
                target="_blank"
                rel="noreferrer"
                style={socialIcon}
                title="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={socialIcon}
                title="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={socialIcon}
                title="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                style={socialIcon}
                title="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h4 style={columnTitle}>Shop</h4>
            <ul style={list}>
              <li>
                <button style={link} onClick={() => go("/skincare")}>
                  Skincare
                </button>
              </li>
              <li>
                <button style={link} onClick={() => go("/brands")}>
                  Brands
                </button>
              </li>
              <li>
                <button style={link} onClick={() => go("/shop")}>
                  All Products
                </button>
              </li>
              <li>
                <button style={link} onClick={() => go("/collections")}>
                  Collections
                </button>
              </li>
              <li>
                <button style={link} onClick={() => go("/wishlist")}>
                  Wishlist
                </button>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h4 style={columnTitle}>Help</h4>
            <ul style={list}>
              <li>
                <button style={link} onClick={() => go("/contact")}>
                  Contact Us
                </button>
              </li>
              <li>
                <button style={link} onClick={() => go("/faq")}>
                  FAQ
                </button>
              </li>
              <li>
                <button style={link} onClick={() => go("/shipping")}>
                  Shipping Info
                </button>
              </li>
              <li>
                <button style={link} onClick={() => go("/returns")}>
                  Returns & Refunds
                </button>
              </li>
              <li>
                <button style={link} onClick={() => go("/orders")}>
                  Track Order
                </button>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 style={columnTitle}>Company</h4>
            <ul style={list}>
              <li>
                <button style={link} onClick={() => go("/about")}>
                  About Us
                </button>
              </li>
              <li>
                <button style={link} onClick={() => go("/privacy")}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button style={link} onClick={() => go("/skin-quiz")}>
                  Skin Quiz
                </button>
              </li>
              <li>
                <button style={link} onClick={() => go("/routine")}>
                  Routine Builder
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div style={bottomBar}>
          <p style={copyright}>
            © {year} GlowSkin. All rights reserved.
          </p>
          <p style={builtBy}>
            🌸 Demo portfolio project · Built with React + Shopify
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ================= STYLES ================= */

const footer = {
  background: theme.colors.card,
  borderTop: `1px solid ${theme.colors.border}`,
  marginTop: 40,
  paddingBottom: 80, // extra padding so WhatsApp button doesn't overlap
};

const container = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "50px 24px 20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 40,
  marginBottom: 40,
};

const brandTitle = {
  fontSize: 24,
  fontWeight: 700,
  color: theme.colors.dark,
  margin: 0,
};

const tagline = {
  fontSize: 13,
  color: theme.colors.muted,
  lineHeight: 1.6,
  marginTop: 12,
  marginBottom: 18,
};

const socials = {
  display: "flex",
  gap: 10,
};

const socialIcon = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  background: theme.colors.bg,
  border: `1px solid ${theme.colors.border}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.colors.primary,
  fontSize: 16,
  textDecoration: "none",
  transition: "0.2s ease",
};

const columnTitle = {
  fontSize: 13,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 1,
  color: theme.colors.dark,
  marginBottom: 16,
  marginTop: 0,
};

const list = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const link = {
  background: "none",
  border: "none",
  color: theme.colors.muted,
  cursor: "pointer",
  fontSize: 13,
  padding: 0,
  textAlign: "left",
  transition: "color 0.2s ease",
  fontFamily: "inherit",
};

const bottomBar = {
  borderTop: `1px solid ${theme.colors.border}`,
  paddingTop: 20,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 10,
};

const copyright = {
  fontSize: 12,
  color: theme.colors.muted,
  margin: 0,
};

const builtBy = {
  fontSize: 11,
  color: theme.colors.muted,
  margin: 0,
};