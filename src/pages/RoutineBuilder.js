import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { theme } from "../theme";

export default function RoutineBuilder() {
  const navigate = useNavigate();

  // 🛍️ FETCH PRODUCTS FROM SHOPIFY
  const { products, loading } = useProducts();

  const [type, setType] = useState("morning");

  const routine = buildRoutine(type, products);

  return (
    <div style={page}>
      {/* HEADER */}
      <h1 style={title}>✨ AI Routine Builder</h1>

      <p style={subtitle}>
        Build your perfect <b>{type}</b> skincare routine
      </p>

      {/* SWITCH */}
      <div style={switchWrap}>
        <button
          onClick={() => setType("morning")}
          style={{
            ...switchBtn,
            background:
              type === "morning" ? theme.colors.primary : "#fff",
            color: type === "morning" ? "#fff" : theme.colors.dark,
          }}
        >
          🌞 Morning
        </button>

        <button
          onClick={() => setType("night")}
          style={{
            ...switchBtn,
            background:
              type === "night" ? theme.colors.primary : "#fff",
            color: type === "night" ? "#fff" : theme.colors.dark,
          }}
        >
          🌙 Night
        </button>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
          ✨ Loading your personalized routine...
        </div>
      )}

      {/* ROUTINE STEPS */}
      {!loading && (
        <div style={grid}>
          {routine.map((step, index) => (
            <div key={index} style={card}>
              <div style={stepBadge}>Step {index + 1}</div>

              <h3 style={stepTitle}>{step.title}</h3>

              <p style={stepText}>{step.description}</p>

              {step.product && (
                <div style={productBox}>
                  <img
                    src={step.product.image}
                    alt={step.product.name}
                    style={img}
                  />

                  <div>
                    <p style={name}>{step.product.name}</p>
                    <p style={brand}>{step.product.brand}</p>
                    <strong>${step.product.price}</strong>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div style={actions}>
        <button
          onClick={() => navigate("/skin-quiz")}
          style={secondaryBtn}
        >
          Try Skin Quiz
        </button>

        <button onClick={() => navigate("/shop")} style={primaryBtn}>
          Shop Products
        </button>
      </div>
    </div>
  );
}

/* ================= LOGIC ================= */

function buildRoutine(type, products) {
  if (!products || products.length === 0) return [];

  const cleanser = products.find(
    (p) => p.type?.toLowerCase() === "cleanser"
  );

  const moisturizer = products.find(
    (p) => p.type?.toLowerCase() === "moisturizer"
  );

  const serum = products.find(
    (p) => p.type?.toLowerCase() === "serum"
  );

  const treatment = products.find(
    (p) => p.type?.toLowerCase() === "treatment"
  );

  if (type === "morning") {
    return [
      {
        title: "Cleanse",
        description: "Start fresh by removing oil and buildup.",
        product: cleanser,
      },
      {
        title: "Serum",
        description: "Hydrate & protect your skin barrier.",
        product: serum || treatment,
      },
      {
        title: "Moisturize",
        description: "Lock in hydration for the day.",
        product: moisturizer,
      },
    ];
  }

  return [
    {
      title: "Cleanse",
      description: "Remove dirt, makeup & pollution.",
      product: cleanser,
    },
    {
      title: "Treatment",
      description: "Target acne, spots, and skin repair.",
      product: treatment || serum,
    },
    {
      title: "Repair Moisturizer",
      description: "Deep overnight skin recovery.",
      product: moisturizer,
    },
  ];
}

/* ================= STYLES ================= */

const page = {
  padding: 30,
  background: "#f7f7f7",
  minHeight: "100vh",
};

const title = {
  fontSize: 32,
  marginBottom: 10,
  color: theme.colors.dark,
};

const subtitle = {
  color: "#666",
  marginBottom: 20,
};

const switchWrap = {
  display: "flex",
  gap: 10,
  marginBottom: 30,
};

const switchBtn = {
  padding: "10px 18px",
  borderRadius: 12,
  border: "1px solid #ddd",
  cursor: "pointer",
  fontWeight: 600,
};

const grid = {
  display: "grid",
  gap: 18,
};

const card = {
  background: "#fff",
  padding: 18,
  borderRadius: 20,
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
};

const stepBadge = {
  fontSize: 12,
  fontWeight: 700,
  color: theme.colors.primary,
};

const stepTitle = {
  marginTop: 6,
  fontSize: 18,
};

const stepText = {
  color: "#666",
  fontSize: 13,
  marginTop: 6,
};

const productBox = {
  marginTop: 12,
  display: "flex",
  gap: 12,
  alignItems: "center",
  background: "#fafafa",
  padding: 10,
  borderRadius: 14,
};

const img = {
  width: 60,
  height: 60,
  objectFit: "cover",
  borderRadius: 10,
};

const name = {
  fontSize: 13,
  fontWeight: 600,
};

const brand = {
  fontSize: 11,
  color: "#888",
};

const actions = {
  marginTop: 30,
  display: "flex",
  gap: 12,
};

const primaryBtn = {
  padding: "12px 18px",
  background: theme.colors.primary,
  color: "#fff",
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 600,
};

const secondaryBtn = {
  padding: "12px 18px",
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 600,
};