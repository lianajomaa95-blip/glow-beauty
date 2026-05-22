import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollections } from "../hooks/useCollections";
import useDarkMode from "../hooks/useDarkMode";
import { theme } from "../theme";

const SPECIAL_LINKS = [
  { label: "Best Sellers", path: "/best-sellers" },
  { label: "Under $30", path: "/under-30" },
  { label: "Premium", path: "/premium" },
];

/* ============================================================
   ICONS (real SVG, not emojis)
   ============================================================ */

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const BagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4 }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ============================================================
   NAVBAR COMPONENT
   ============================================================ */

export default function Navbar({ cart, wishlist, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [skincareDropdown, setSkincareDropdown] = useState(false);
  const navigate = useNavigate();
  const { isDark, toggle } = useDarkMode();

  const { collections, loading } = useCollections();

  const cartCount = cart?.length || 0;
  const wishlistCount = wishlist?.length || 0;

  const go = (path) => {
    setMenuOpen(false);
    setSkincareDropdown(false);
    navigate(path);
  };

  return (
    <>
      <nav style={nav} aria-label="Main navigation">
        {/* ====== LEFT: Hamburger (mobile) + Nav links (desktop) ====== */}
        <div style={leftSection}>
          <button
            onClick={() => setMenuOpen(true)}
            style={hamburger}
            className="navbar-hamburger"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>

          <div style={desktopNav} className="navbar-desktop-nav">
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
                style={{ ...navLink, display: "inline-flex", alignItems: "center" }}
                aria-haspopup="true"
                aria-expanded={skincareDropdown}
              >
                Skincare
                <ChevronDownIcon />
              </button>

              {skincareDropdown && (
                <div style={dropdown} role="menu">
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
              Shop
            </button>
          </div>
        </div>

        {/* ====== CENTER: Logo ====== */}
        <div style={centerSection}>
          <h1
            style={logo}
            onClick={() => navigate("/")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/")}
            tabIndex={0}
            role="link"
            aria-label="Aura Store home"
          >
            Aura Store
          </h1>
        </div>

        {/* ====== RIGHT: Icons ====== */}
        <div style={rightSection}>
          <button
            style={iconBtn}
            onClick={() => navigate("/search")}
            aria-label="Search products"
            title="Search"
          >
            <SearchIcon />
          </button>

          <button
            style={iconBtn}
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title="Toggle theme"
            className="navbar-icon-desktop"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            style={iconBtn}
            onClick={() => navigate("/account")}
            aria-label="My account"
            title="My Account"
            className="navbar-icon-desktop"
          >
            <UserIcon />
          </button>

          {/* WISHLIST with badge */}
          <button
            style={iconBtnWithBadge}
            onClick={() => navigate("/wishlist")}
            aria-label={`Wishlist with ${wishlistCount} items`}
            title="Wishlist"
          >
            <HeartIcon />
            {wishlistCount > 0 && (
              <span style={badge}>{wishlistCount > 99 ? "99+" : wishlistCount}</span>
            )}
          </button>

          {/* CART with badge */}
          <button
            style={iconBtnWithBadge}
            onClick={onCartClick}
            data-cart-icon
            aria-label={`Shopping bag with ${cartCount} items`}
            title="Bag"
          >
            <BagIcon />
            {cartCount > 0 && (
              <span style={badge}>{cartCount > 99 ? "99+" : cartCount}</span>
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE SIDE MENU OVERLAY */}
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
        <div style={sideMenuHeader}>
          <h2 style={sideMenuLogo}>Aura Store</h2>
          <button
            onClick={() => setMenuOpen(false)}
            style={sideMenuClose}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <MenuItem label="Home" onClick={() => go("/")} />
        <MenuItem label="Search" onClick={() => go("/search")} />
        <MenuItem label="Skincare Hub" onClick={() => go("/skincare")} />
        <MenuItem label="Shop All" onClick={() => go("/shop")} />
        <MenuItem label="Brands" onClick={() => go("/brands")} />

        <SectionLabel>Shop the Edit</SectionLabel>
        {SPECIAL_LINKS.map((link) => (
          <MenuItem
            key={link.path}
            label={link.label}
            onClick={() => go(link.path)}
          />
        ))}

        <SectionLabel>Categories</SectionLabel>
        {loading && <div style={loadingText}>Loading...</div>}
        {!loading &&
          collections.map((col) => (
            <MenuItem
              key={col.id}
              label={col.name}
              onClick={() => go(`/collection/${col.handle}`)}
            />
          ))}

        <SectionLabel>My Account</SectionLabel>
        <MenuItem label="My Account" onClick={() => go("/account")} />
        <MenuItem label="My Orders" onClick={() => go("/orders")} />
        <MenuItem label="Wishlist" onClick={() => go("/wishlist")} />
        <MenuItem label="Skin Quiz" onClick={() => go("/skin-quiz")} />

        <SectionLabel>Help</SectionLabel>
        <MenuItem label="Contact Us" onClick={() => go("/contact")} />
        <MenuItem label="FAQ" onClick={() => go("/faq")} />
      </aside>

      {/* RESPONSIVE STYLES */}
      <style>{`
        @media (max-width: 900px) {
          .navbar-desktop-nav { display: none !important; }
          .navbar-icon-desktop { display: none !important; }
        }
        @media (min-width: 901px) {
          .navbar-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */

function MenuItem({ label, onClick }) {
  return (
    <button onClick={onClick} style={menuItem}>
      {label}
    </button>
  );
}

function SectionLabel({ children }) {
  return <div style={sectionLabelStyle}>{children}</div>;
}

/* ============================================================
   STYLES
   ============================================================ */

const nav = {
  height: 70,
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  padding: "0 24px",
  background: theme.colors.card,
  borderBottom: `1px solid ${theme.colors.border}`,
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

/* LEFT SECTION */
const leftSection = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  justifySelf: "start",
};

const hamburger = {
  border: "none",
  background: "none",
  cursor: "pointer",
  color: theme.colors.dark,
  padding: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
};

const desktopNav = {
  display: "flex",
  alignItems: "center",
  gap: 4,
};

const navLink = {
  border: "none",
  background: "transparent",
  color: theme.colors.dark,
  cursor: "pointer",
  padding: "8px 14px",
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: "0.05em",
  transition: "color 0.2s ease",
  fontFamily: "inherit",
};

/* CENTER LOGO */
const centerSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  justifySelf: "center",
};

const logo = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(20px, 2.5vw, 28px)",
  fontWeight: 600,
  color: theme.colors.dark,
  margin: 0,
  cursor: "pointer",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  userSelect: "none",
};

/* RIGHT SECTION */
const rightSection = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  justifySelf: "end",
};

const iconBtn = {
  border: "none",
  background: "none",
  cursor: "pointer",
  color: theme.colors.dark,
  padding: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  transition: "background 0.2s ease",
};

const iconBtnWithBadge = {
  ...iconBtn,
  position: "relative",
};

const badge = {
  position: "absolute",
  top: 4,
  right: 4,
  background: theme.colors.primary,
  color: "#fff",
  fontSize: 10,
  fontWeight: 700,
  minWidth: 18,
  height: 18,
  borderRadius: 999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 5px",
  border: `2px solid ${theme.colors.card}`,
};

/* DROPDOWN */
const dropdown = {
  position: "absolute",
  top: "100%",
  left: 0,
  marginTop: 8,
  background: theme.colors.card,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: 14,
  boxShadow: "0 14px 50px rgba(0,0,0,0.18)",
  padding: 8,
  minWidth: 240,
  zIndex: 1001,
};

const dropdownHeader = {
  padding: "8px 14px",
  fontSize: 10,
  fontWeight: 700,
  color: theme.colors.muted,
  letterSpacing: "0.18em",
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
  fontFamily: "inherit",
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

/* MOBILE SIDE MENU */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  zIndex: 998,
  animation: "fadeIn 0.2s ease",
};

const sideMenu = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "min(320px, 85vw)",
  height: "100vh",
  background: theme.colors.card,
  padding: "20px 24px",
  zIndex: 999,
  transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "4px 0 30px rgba(0,0,0,0.2)",
  overflowY: "auto",
  color: theme.colors.text,
};

const sideMenuHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 24,
  paddingBottom: 16,
  borderBottom: `1px solid ${theme.colors.border}`,
};

const sideMenuLogo = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 22,
  fontWeight: 600,
  color: theme.colors.dark,
  margin: 0,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const sideMenuClose = {
  border: "none",
  background: "none",
  cursor: "pointer",
  color: theme.colors.dark,
  padding: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const menuItem = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "12px 0",
  cursor: "pointer",
  fontSize: 14,
  color: theme.colors.dark,
  background: "transparent",
  border: "none",
  fontFamily: "inherit",
};

const sectionLabelStyle = {
  fontSize: 10,
  fontWeight: 700,
  textTransform: "uppercase",
  color: theme.colors.muted,
  letterSpacing: "0.2em",
  marginTop: 20,
  marginBottom: 4,
  paddingTop: 14,
  borderTop: `1px solid ${theme.colors.border}`,
};

const loadingText = {
  fontSize: 12,
  color: theme.colors.muted,
  fontStyle: "italic",
  padding: "8px 0",
};