import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../theme";

export default function Orders({ addToCart }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  /* ================= LOAD ORDERS FROM LOCALSTORAGE ================= */

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved);
  }, []);

  /* ================= HELPERS ================= */

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const paymentLabel = (method) => {
    if (method === "cod") return "📦 Cash on Delivery";
    if (method === "whish") return "📱 Whish Money";
    if (method === "card") return "💳 Credit Card";
    return method;
  };

  const statusBadge = (status) => {
    if (status === "paid") {
      return { label: "Paid", bg: "#d7f5df", color: "#1d8a3f" };
    }
    if (status === "pending_delivery") {
      return { label: "Pending Delivery", bg: "#fff3cd", color: "#a76a00" };
    }
    return { label: status, bg: "#eee", color: "#555" };
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        "Delete all your order history? This cannot be undone."
      )
    ) {
      localStorage.removeItem("orders");
      setOrders([]);
    }
  };

  const handleReorder = (order) => {
    order.items.forEach((item) => addToCart?.(item));
    navigate("/cart");
  };

  /* ================= EMPTY STATE ================= */

  if (orders.length === 0) {
    return (
      <div style={emptyPage}>
        <div style={emptyCard}>
          <div style={{ fontSize: 60, marginBottom: 10 }}>📋</div>
          <h1 style={emptyTitle}>No orders yet</h1>
          <p style={emptyText}>
            When you place an order, it'll appear here so you can track and
            reorder it anytime.
          </p>
          <button onClick={() => navigate("/shop")} style={shopBtn}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  /* ================= MAIN ================= */

  return (
    <div style={page}>
      {/* HEADER */}
      <div style={header}>
        <div>
          <h1 style={title}>My Orders</h1>
          <p style={subtitle}>
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>

        <button onClick={handleClearAll} style={clearBtn}>
          Clear All
        </button>
      </div>

      {/* ORDER LIST */}
      <div style={ordersList}>
        {orders.map((order) => {
          const badge = statusBadge(order.status);
          const isExpanded = expandedOrder === order.orderNumber;

          return (
            <div key={order.orderNumber} style={orderCard}>
              {/* HEADER ROW */}
              <div
                onClick={() =>
                  setExpandedOrder(isExpanded ? null : order.orderNumber)
                }
                style={orderHeader}
              >
                <div style={{ flex: 1 }}>
                  <div style={orderNumber}>
                    Order {order.orderNumber}
                  </div>
                  <div style={orderDate}>{formatDate(order.date)}</div>
                </div>

                <div style={headerRight}>
                  <span
                    style={{
                      ...badgeStyle,
                      background: badge.bg,
                      color: badge.color,
                    }}
                  >
                    {badge.label}
                  </span>
                  <strong style={orderTotal}>
                    ${order.total.toFixed(2)}
                  </strong>
                  <span style={chevron}>{isExpanded ? "▲" : "▼"}</span>
                </div>
              </div>

              {/* COMPACT PREVIEW (always visible) */}
              <div style={previewRow}>
                <div style={previewImages}>
                  {order.items.slice(0, 4).map((item) => (
                    <img
                      key={item.id}
                      src={item.image}
                      alt={item.name}
                      style={previewImg}
                    />
                  ))}
                  {order.items.length > 4 && (
                    <div style={moreItems}>
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>
                <div style={previewMethod}>
                  {paymentLabel(order.paymentMethod)}
                </div>
              </div>

              {/* EXPANDED DETAILS */}
              {isExpanded && (
                <div style={expanded}>
                  {/* ITEMS */}
                  <h4 style={sectionLabel}>Items</h4>
                  <div style={itemsList}>
                    {order.items.map((item) => (
                      <div key={item.id} style={itemRow}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={itemImg}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={itemName}>{item.name}</div>
                          <div style={itemMeta}>
                            Qty: {item.qty} × ${item.price}
                          </div>
                        </div>
                        <strong>
                          ${(item.price * item.qty).toFixed(2)}
                        </strong>
                      </div>
                    ))}
                  </div>

                  {/* TOTALS */}
                  <div style={totalsBox}>
                    <div style={totalRow}>
                      <span>Subtotal</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div style={totalRow}>
                      <span>Shipping</span>
                      <span>
                        {order.shipping === 0
                          ? "Free"
                          : `$${order.shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {order.codFee > 0 && (
                      <div style={totalRow}>
                        <span>COD Fee</span>
                        <span>${order.codFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div
                      style={{
                        ...totalRow,
                        fontSize: 16,
                        fontWeight: 700,
                        marginTop: 8,
                        borderTop: "1px solid #eee",
                        paddingTop: 8,
                      }}
                    >
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* SHIPPING INFO */}
                  <h4 style={sectionLabel}>Shipping To</h4>
                  <div style={shippingBox}>
                    <strong>{order.customer.name}</strong>
                    <div style={shippingLine}>{order.customer.email}</div>
                    <div style={shippingLine}>📞 {order.customer.phone}</div>
                    <div style={shippingLine}>
                      📍 {order.customer.address}
                      {order.customer.city && `, ${order.customer.city}`}
                      {order.customer.country && `, ${order.customer.country}`}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <button
                    onClick={() => handleReorder(order)}
                    style={reorderBtn}
                  >
                    🔄 Reorder
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  background: "#f7f7f7",
  minHeight: "100vh",
  padding: "30px 20px 60px",
};

const header = {
  maxWidth: 900,
  margin: "0 auto 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const title = {
  fontSize: 30,
  color: theme.colors.dark,
  margin: 0,
};

const subtitle = {
  color: theme.colors.muted,
  marginTop: 4,
  fontSize: 14,
};

const clearBtn = {
  padding: "8px 14px",
  background: "transparent",
  border: "1px solid #e5e5e5",
  borderRadius: 10,
  fontSize: 12,
  cursor: "pointer",
  color: "#888",
};

const ordersList = {
  maxWidth: 900,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const orderCard = {
  background: "#fff",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
};

const orderHeader = {
  display: "flex",
  alignItems: "center",
  padding: "16px 20px",
  cursor: "pointer",
  gap: 12,
};

const orderNumber = {
  fontSize: 15,
  fontWeight: 700,
  color: theme.colors.dark,
};

const orderDate = {
  fontSize: 12,
  color: "#888",
  marginTop: 2,
};

const headerRight = {
  display: "flex",
  alignItems: "center",
  gap: 14,
};

const badgeStyle = {
  padding: "5px 10px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 600,
};

const orderTotal = {
  fontSize: 16,
  color: theme.colors.dark,
};

const chevron = {
  fontSize: 10,
  color: "#aaa",
};

const previewRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px 16px",
  gap: 12,
  flexWrap: "wrap",
};

const previewImages = {
  display: "flex",
  gap: 6,
};

const previewImg = {
  width: 40,
  height: 40,
  objectFit: "cover",
  borderRadius: 8,
  border: "1px solid #eee",
};

const moreItems = {
  width: 40,
  height: 40,
  borderRadius: 8,
  background: "#f2f2f2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  color: "#666",
  fontWeight: 600,
};

const previewMethod = {
  fontSize: 12,
  color: "#666",
};

const expanded = {
  borderTop: "1px solid #f0f0f0",
  padding: "18px 20px",
  background: "#fafafa",
};

const sectionLabel = {
  fontSize: 12,
  textTransform: "uppercase",
  color: "#888",
  letterSpacing: 0.5,
  marginBottom: 10,
  marginTop: 14,
};

const itemsList = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const itemRow = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  background: "#fff",
  padding: 10,
  borderRadius: 10,
};

const itemImg = {
  width: 50,
  height: 50,
  objectFit: "cover",
  borderRadius: 8,
};

const itemName = {
  fontSize: 13,
  fontWeight: 600,
  color: theme.colors.dark,
};

const itemMeta = {
  fontSize: 11,
  color: "#888",
  marginTop: 2,
};

const totalsBox = {
  marginTop: 14,
  background: "#fff",
  padding: 14,
  borderRadius: 10,
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 13,
  marginBottom: 6,
  color: "#555",
};

const shippingBox = {
  background: "#fff",
  padding: 14,
  borderRadius: 10,
  fontSize: 13,
  color: "#555",
};

const shippingLine = {
  marginTop: 4,
  color: "#666",
};

const reorderBtn = {
  marginTop: 16,
  width: "100%",
  padding: "12px",
  background: theme.colors.primary,
  color: "#fff",
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14,
};

/* ================= EMPTY STATE ================= */

const emptyPage = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f7f7f7",
  padding: 20,
};

const emptyCard = {
  background: "#fff",
  padding: "50px 40px",
  borderRadius: 28,
  textAlign: "center",
  maxWidth: 450,
  width: "100%",
  boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
};

const emptyTitle = {
  fontSize: 26,
  marginBottom: 10,
  color: theme.colors.dark,
};

const emptyText = {
  color: "#777",
  marginBottom: 24,
  lineHeight: 1.6,
};

const shopBtn = {
  padding: "14px 28px",
  background: theme.colors.primary,
  color: "#fff",
  border: "none",
  borderRadius: 14,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14,
};