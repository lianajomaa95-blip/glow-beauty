import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollections } from "../hooks/useCollections";
import useDarkMode from "../hooks/useDarkMode";
import { theme } from "../theme";

const SPECIAL_LINKS = [
  { label: "💎 Best Sellers", path: "/best-sellers" },
  { label: "💰 Under $30", path: "/under-30" },
  { label: "✨ Premium", path: "/premium" },
];

export default function Navbar({ cart, wishlist, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [skincareDropdown, setSkincareDropdown] = useState(false);
  const navigate = useNavigate();
  const { isDark, toggle } = useDarkMode();

  const { collections, loading } = useCollections();

  const go = (path) => {
    setMenuOpen(false);
    setSkincareDropdown(false);
    navigate(path);
  };

  return (
    <>
      <nav style={nav} aria-label="Main navigation">
        <div style={leftGroup}>
          <button
            onClick={() => setMenuOpen(true)}
            style={hamburger}
            className="navbar-hamburger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>

          <h2
            style={logo}
            onClick={() => navigate("/")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/")}
            tabIndex={0}
            role="link"
            aria-label="GlowSkin home"
          >
            GlowSkin
          </h2>
        </div>

        <div style={desktopNav} className="navbar-desktop">
          <button onClick={() => navigate("/")} style={navLink}>
            Home
          </button>

          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setSkincareDropdown(true)}
            onMouseLeave={() => setSkincareDropdown(false)}
          >
            <button
              onClick={() => navigate("/skincare")}
              style={navLink}
              aria-haspopup="true"
              aria-expanded={skincareDropdown}
            >
              Skincare ▾
            </button>

            {skincareDropdown && (
              <div style={dropdown} role="menu">
                {/* SPECIAL COLLECTIONS SECTION */}
                <div style={dropdownHeader}>SHOP THE EDIT</div>
                {SPECIAL_LINKS.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => go(link.path)}
                    style={dropdownItem}
                    role="menuitem"
                  >
                    {link.label}
                  </button>
                ))}

                <div style={dropdownDivider} />

                {/* CATEGORIES SECTION */}
                <div style={dropdownHeader}>SHOP BY CATEGORY</div>
                {loading && <div style={dropdownLoading}>Loading...</div>}
                {!loading &&
                  collections.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => go(`/collection/${col.handle}`)}
                      style={dropdownItem}
                      role="menuitem"
                    >
                      {col.name}
                    </button>
                  ))}

                <div style={dropdownDivider} />
                <button
                  onClick={() => go("/skincare")}
                  style={{
                    ...dropdownItem,
                    color: theme.colors.primary,
                    fontWeight: 600,
                  }}
                  role="menuitem"
                >
                  View All Skincare →
                </button>
              </div>
            )}
          </div>

          <button onClick={() => navigate("/brands")} style={navLink}>
            Brands
          </button>

          <button onClick={() => navigate("/shop")} style={navLink}>
            Shop All
          </button>
        </div>

        <div style={right}>
          <button
            style={iconBtn}
            onClick={() => navigate("/search")}
            aria-label="Search products"
            title="Search"
          >
            🔍
          </button>
          <button
            style={iconBtn}
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          <button
            style={iconBtn}
            onClick={() => navigate("/account")}
            aria-label="My account"
            title="My Account"
          >
            👤
          </button>
          <button
            style={iconBtn}
            onClick={() => navigate("/wishlist")}
            aria-label={`Wishlist with ${wishlist.length} items`}
          >
            ❤️ <span aria-hidden="true">{wishlist.length}</span>
          </button>
          <button
            style={iconBtn}
            onClick={onCartClick}
            data-cart-icon
            aria-label={`Shopping cart with ${cart.length} items`}
          >
            🛒 <span aria-hidden="true">{cart.length}</span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={overlay}
          aria-hidden="true"
        />
      )}

      <aside
        style={{
          ...sideMenu,
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
        }}
        aria-label="Side navigation menu"
        aria-hidden={!menuOpen}
      >
        <h3 style={menuTitle}>Menu</h3>

        <MenuItem label="🏠 Home" onClick={() => go("/")} />
        <MenuItem label="🔍 Search" onClick={() => go("/search")} />
        <MenuItem label="✨ Skincare Hub" onClick={() => go("/skincare")} />
        <MenuItem label="🛍️ Shop All" onClick={() => go("/shop")} />
        <MenuItem label="🏷️ Brands" onClick={() => go("/brands")} />

        <hr style={hr} />

        <div style={sectionLabel}>Shop the Edit</div>

        {SPECIAL_LINKS.map((link) => (
          <MenuItem
            key={link.path}
            label={link.label}
            onClick={() => go(link.path)}
          />
        ))}

        <hr style={hr} />

        <div style={sectionLabel}>Categories</div>

        {loading && <div style={loadingText}>Loading...</div>}

        {!loading && collections.length === 0 && (
          <div style={loadingText}>No categories yet</div>
        )}

        {!loading &&
          collections.map((col) => (
            <MenuItem
              key={col.id}
              label={col.name}
              onClick={() => go(`/collection/${col.handle}`)}
            />
          ))}

        <hr style={hr} />

        <div style={sectionLabel}>My Account</div>

        <MenuItem label="👤 My Account" onClick={() => go("/account")} />
        <MenuItem label="📋 My Orders" onClick={() => go("/orders")} />
        <MenuItem label="❤️ Wishlist" onClick={() => go("/wishlist")} />
        <MenuItem label="✨ Skin Quiz" onClick={() => go("/skin-quiz")} />
        <MenuItem label="🧴 AI Coach" onClick={() => go("/coach")} />
        <MenuItem label="📅 Routine Builder" onClick={() => go("/routine")} />

        <hr style={hr} />

        <MenuItem label="📞 Contact Us" onClick={() => go("/contact")} />
      </aside>

      <style>{`
        @media (max-width: 900px) {
          .navbar-desktop { display: none !important; }
        }
        @media (min-width: 901px) {
          .navbar-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}

function MenuItem({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={item}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {label}
    </button>
  );
}

/* ================= STYLES ================= */

const nav = {
  height: 64,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  background: theme.colors.card,
  borderBottom: `1px solid ${theme.colors.border}`,
  zIndex: 1000,
};

const leftGroup = {
  display: "flex",
  alignItems: "center",
  gap: 14,
};

const hamburger = {
  fontSize: 22,
  border: "none",
  background: "none",
  cursor: "pointer",
  color: theme.colors.dark,
  padding: 0,
};

const logo = {
  cursor: "pointer",
  color: theme.colors.dark,
  margin: 0,
  fontSize: 22,
  fontWeight: 700,
};

const desktopNav = {
  display: "flex",
  alignItems: "center",
  gap: 6,
};

const navLink = {
  border: "none",
  background: "transparent",
  color: theme.colors.dark,
  cursor: "pointer",
  padding: "8px 14px",
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 500,
  transition: "background 0.2s ease",
};

const dropdown = {
  position: "absolute",
  top: "100%",
  left: 0,
  marginTop: 4,
  background: theme.colors.card,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: 14,
  boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
  padding: 8,
  minWidth: 240,
  zIndex: 1001,
};

const dropdownHeader = {
  padding: "8px 14px",
  fontSize: 10,
  fontWeight: 700,
  color: theme.colors.muted,
  letterSpacing: 1,
};

const dropdownItem = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "10px 14px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  borderRadius: 8,
  fontSize: 14,
  color: theme.colors.dark,
};

const dropdownLoading = {
  padding: "10px 14px",
  fontSize: 13,
  color: theme.colors.muted,
};

const dropdownDivider = {
  height: 1,
  background: theme.colors.border,
  margin: "6px 0",
};

const right = {
  display: "flex",
  gap: 10,
  alignItems: "center",
};

const iconBtn = {
  border: "none",
  background: "none",
  cursor: "pointer",
  fontSize: 14,
  color: theme.colors.dark,
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  zIndex: 998,
};

const sideMenu = {
  position: "fixed",
  top: 0,
  left: 0,
  width: 280,
  height: "100vh",
  background: theme.colors.card,
  padding: 20,
  zIndex: 999,
  transition: "0.3s ease",
  boxShadow: "2px 0 20px rgba(0,0,0,0.2)",
  overflowY: "auto",
  color: theme.colors.text,
};

const menuTitle = {
  marginBottom: 20,
  color: theme.colors.dark,
};

const item = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "12px 0",
  cursor: "pointer",
  fontSize: 14,
  color: theme.colors.dark,
  background: "transparent",
  border: "none",
  borderBottom: `1px solid ${theme.colors.border}`,
  fontFamily: "inherit",
};

const hr = {
  margin: "15px 0",
  border: "none",
  borderTop: `1px solid ${theme.colors.border}`,
};

const sectionLabel = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase",
  color: theme.colors.muted,
  letterSpacing: 0.5,
  marginBottom: 8,
};

const loadingText = {
  fontSize: 12,
  color: theme.colors.muted,
  fontStyle: "italic",
  padding: "8px 0",
};