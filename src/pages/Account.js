import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { theme } from "../theme";

export default function Account({ wishlist = [], cart = [] }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [newsletterCount, setNewsletterCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  // Load all user data from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);

    const emails = JSON.parse(localStorage.getItem("newsletter_emails")) || [];
    setNewsletterCount(emails.length);

    const reviews = JSON.parse(localStorage.getItem("reviews")) || {};
    let total = 0;
    Object.values(reviews).forEach((arr) => {
      total += arr.length;
    });
    setReviewsCount(total);
  }, []);

  // Calculate total spent
  const totalSpent = orders.reduce(
    (sum, order) => sum + (Number(order.total) || 0),
    0
  );

  const recentOrders = orders.slice(0, 3);

  const handleClearData = () => {
    if (
      window.confirm(
        "Clear all your local data (orders, reviews, wishlist, newsletter)? This cannot be undone."
      )
    ) {
      localStorage.removeItem("orders");
      localStorage.removeItem("reviews");
      localStorage.removeItem("wishlist");
      localStorage.removeItem("newsletter_emails");
      localStorage.removeItem("contact_messages");
      window.location.reload();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={page}
    >
      {/* HEADER */}
      <div style={header}>
        <div style={avatar}>👋</div>
        <h1 style={title}>Welcome Back</h1>
        <p style={subtitle}>Your skincare journey at a glance</p>
      </div>

      <div style={container}>
        {/* STATS GRID */}
        <div style={statsGrid}>
          <StatCard
            icon="📦"
            label="Orders"
            value={orders.length}
            onClick={() => navigate("/orders")}
          />
          <StatCard
            icon="❤️"
            label="Wishlist"
            value={wishlist.length}
            onClick={() => navigate("/wishlist")}
          />
          <StatCard
            icon="🛒"
            label="Cart"
            value={cart.length}
            onClick={() => navigate("/cart")}
          />
          <StatCard
            icon="⭐"
            label="Reviews"
            value={reviewsCount}
          />
          <StatCard
            icon="💰"
            label="Total Spent"
            value={`$${totalSpent.toFixed(2)}`}
          />
          <StatCard
            icon="📧"
            label="Newsletter"
            value={newsletterCount > 0 ? "✓ Subscribed" : "Not subscribed"}
          />
        </div>

        {/* RECENT ORDERS */}
        <div style={section}>
          <div style={sectionHeader}>
            <h2 style={sectionTitle}>Recent Orders</h2>
            {orders.length > 0 && (
              <button
                onClick={() => navigate("/orders")}
                style={viewAllBtn}
              >
                View all →
              </button>
            )}
          </div>

          {orders.length === 0 ? (
            <div style={emptyBox}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>📋</div>
              <p style={{ color: theme.colors.muted, marginBottom: 14 }}>
                No orders yet
              </p>
              <button
                onClick={() => navigate("/shop")}
                style={shopBtn}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={ordersList}>
              {recentOrders.map((order) => (
                <div
                  key={order.orderNumber}
                  onClick={() => navigate("/orders")}
                  style={orderRow}
                >
                  <div>
                    <div style={orderNumber}>{order.orderNumber}</div>
                    <div style={orderDate}>
                      {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={orderTotal}>
                      ${Number(order.total).toFixed(2)}
                    </div>
                    <div style={orderItems}>
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div style={section}>
          <h2 style={sectionTitle}>Quick Actions</h2>
          <div style={actionsGrid}>
            <ActionCard
              icon="✨"
              title="Take Skin Quiz"
              description="Get personalized recommendations"
              onClick={() => navigate("/skin-quiz")}
            />
            <ActionCard
              icon="🧴"
              title="AI Skin Coach"
              description="Chat with our AI for skin advice"
              onClick={() => navigate("/coach")}
            />
            <ActionCard
              icon="📅"
              title="Routine Builder"
              description="Build your perfect routine"
              onClick={() => navigate("/routine")}
            />
            <ActionCard
              icon="📞"
              title="Contact Support"
              description="We're here to help"
              onClick={() => navigate("/contact")}
            />
          </div>
        </div>

        {/* DANGER ZONE */}
        <div style={dangerBox}>
          <h3 style={dangerTitle}>⚠️ Demo Settings</h3>
          <p style={dangerText}>
            This is a demo project. All data is stored locally in your browser.
            Clear it anytime to reset the experience.
          </p>
          <button onClick={handleClearData} style={dangerBtn}>
            Clear All Local Data
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= SUBCOMPONENTS ================= */

function StatCard({ icon, label, value, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        ...statCard,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div style={statIcon}>{icon}</div>
      <div style={statValue}>{value}</div>
      <div style={statLabel}>{label}</div>
    </div>
  );
}

function ActionCard({ icon, title, description, onClick }) {
  return (
    <div onClick={onClick} style={actionCard}>
      <div style={actionIcon}>{icon}</div>
      <div style={actionTitle}>{title}</div>
      <div style={actionDesc}>{description}</div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  background: theme.colors.bg,
  minHeight: "100vh",
};

const header = {
  textAlign: "center",
  padding: "40px 24px 30px",
  background: theme.colors.card,
  borderBottom: `1px solid ${theme.colors.border}`,
};

const avatar = {
  width: 70,
  height: 70,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #fde6e9, #fff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 32,
  margin: "0 auto 14px",
  border: `2px solid ${theme.colors.border}`,
};

const title = {
  fontSize: 28,
  fontWeight: 700,
  color: theme.colors.dark,
  margin: 0,
};

const subtitle = {
  color: theme.colors.muted,
  marginTop: 6,
};

const container = {
  maxWidth: 1000,
  margin: "0 auto",
  padding: "30px 24px 60px",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 14,
  marginBottom: 36,
};

const statCard = {
  background: theme.colors.card,
  padding: 20,
  borderRadius: 16,
  textAlign: "center",
  border: `1px solid ${theme.colors.border}`,
  transition: "transform 0.2s ease",
};

const statIcon = {
  fontSize: 28,
  marginBottom: 8,
};

const statValue = {
  fontSize: 24,
  fontWeight: 700,
  color: theme.colors.dark,
  marginBottom: 4,
};

const statLabel = {
  fontSize: 12,
  color: theme.colors.muted,
  textTransform: "uppercase",
  letterSpacing: 0.5,
};

const section = {
  marginBottom: 36,
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};

const sectionTitle = {
  fontSize: 18,
  fontWeight: 700,
  color: theme.colors.dark,
  margin: 0,
};

const viewAllBtn = {
  background: "none",
  border: "none",
  color: theme.colors.primary,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
};

const emptyBox = {
  textAlign: "center",
  padding: 30,
  background: theme.colors.card,
  borderRadius: 14,
  border: `1px solid ${theme.colors.border}`,
};

const shopBtn = {
  padding: "10px 20px",
  background: theme.colors.primary,
  color: "#fff",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 13,
};

const ordersList = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const orderRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 16,
  background: theme.colors.card,
  borderRadius: 12,
  border: `1px solid ${theme.colors.border}`,
  cursor: "pointer",
};

const orderNumber = {
  fontSize: 14,
  fontWeight: 600,
  color: theme.colors.dark,
};

const orderDate = {
  fontSize: 12,
  color: theme.colors.muted,
  marginTop: 2,
};

const orderTotal = {
  fontSize: 15,
  fontWeight: 700,
  color: theme.colors.dark,
};

const orderItems = {
  fontSize: 11,
  color: theme.colors.muted,
  marginTop: 2,
};

const actionsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 14,
};

const actionCard = {
  background: theme.colors.card,
  padding: 20,
  borderRadius: 16,
  border: `1px solid ${theme.colors.border}`,
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const actionIcon = {
  fontSize: 26,
  marginBottom: 10,
};

const actionTitle = {
  fontSize: 14,
  fontWeight: 600,
  color: theme.colors.dark,
  marginBottom: 4,
};

const actionDesc = {
  fontSize: 12,
  color: theme.colors.muted,
  lineHeight: 1.5,
};

const dangerBox = {
  background: theme.colors.card,
  padding: 24,
  borderRadius: 16,
  border: `1px solid ${theme.colors.border}`,
  textAlign: "center",
};

const dangerTitle = {
  fontSize: 15,
  fontWeight: 600,
  color: theme.colors.dark,
  marginBottom: 8,
  marginTop: 0,
};

const dangerText = {
  fontSize: 13,
  color: theme.colors.muted,
  marginBottom: 16,
  lineHeight: 1.6,
};

const dangerBtn = {
  padding: "10px 20px",
  background: "transparent",
  color: "#c33",
  border: "1px solid #c33",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 13,
};