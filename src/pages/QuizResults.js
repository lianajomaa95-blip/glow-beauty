// src/pages/QuizResults.js
//
// Personalized skin profile + product recommendations from YOUR Shopify catalog.
// Smart bundle building with "Add All to Cart" CTA.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getRecommendedProductTypes,
  generateRoutine,
  getSkinTypeDescription,
  getConcernDescription,
} from "../data/quizQuestions";
import useProducts from "../hooks/useProducts";
import SEO from "../components/SEO";
import { trackEvent, trackAddToCart } from "../utils/analytics";
import { formatPrice } from "../utils/format";
import { theme } from "../theme";

export default function QuizResults({ addToCart }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const { products, loading: productsLoading } = useProducts();

  // Load saved profile
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("skinProfile"));
      if (saved && saved.profile) {
        setProfile(saved.profile);
      }
    } catch (e) {
      console.error("Failed to load skin profile:", e);
    }
    setLoading(false);
  }, []);

  // Build personalized product list
  const recommendedProducts = (() => {
    if (!profile || !products || products.length === 0) return [];

    const targetTypes = getRecommendedProductTypes(profile);
    const result = [];
    const usedIds = new Set();

    // Match products by type, preferring brand variety
    targetTypes.forEach((type) => {
      // Find available products of this type, not already added
      const matches = products.filter(
        (p) =>
          p.type === type &&
          p.available !== false &&
          !usedIds.has(p.id)
      );

      if (matches.length > 0) {
        // Prefer products that match brand variety
        const product = matches[0];
        result.push(product);
        usedIds.add(product.id);
      }
    });

    return result;
  })();

  const routine = profile && recommendedProducts.length > 0
    ? generateRoutine(profile, recommendedProducts)
    : { morning: [], evening: [] };

  const bundleTotal = recommendedProducts.reduce(
    (sum, p) => sum + Number(p.price || 0),
    0
  );

  const handleAddBundle = () => {
    recommendedProducts.forEach((product) => {
      addToCart(product);
      trackAddToCart(product, 1);
    });
    trackEvent("quiz_add_bundle", {
      bundle_size: recommendedProducts.length,
      bundle_value: bundleTotal,
    });
  };

  const handleRetake = () => {
    localStorage.removeItem("skinProfile");
    navigate("/skin-quiz");
  };

  /* ============================================================
     LOADING / NO PROFILE STATES
     ============================================================ */
  if (loading || productsLoading) {
    return (
      <div style={page}>
        <div style={loadingBox}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={spinner}
          />
          <p style={loadingText}>Building your personalized routine...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={page}>
        <div style={emptyBox}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>📋</div>
          <h2 style={emptyTitle}>No quiz results found</h2>
          <p style={emptySub}>
            Take our quick skin quiz to see personalized recommendations.
          </p>
          <button onClick={() => navigate("/skin-quiz")} style={primaryBtn}>
            Take the Quiz →
          </button>
        </div>
      </div>
    );
  }

  /* ============================================================
     RESULTS DISPLAY
     ============================================================ */
  return (
    <>
      <SEO
        title="Your Skin Profile"
        description="Personalized skincare recommendations based on your skin quiz results."
      />

      <div style={page}>
        {/* HERO HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={hero}
        >
          <span style={eyebrow}>YOUR PERSONALIZED PLAN</span>
          <h1 style={heroTitle}>
            Welcome to your <span style={italic}>glow journey</span>
          </h1>
          <p style={heroSubtitle}>
            Based on your answers, we've crafted a routine tailored
            specifically to your skin.
          </p>
        </motion.div>

        {/* SKIN PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={profileCard}
        >
          <div style={profileGrid}>
            {/* SKIN TYPE */}
            <div style={profileSection}>
              <span style={profileLabel}>YOUR SKIN TYPE</span>
              <h2 style={profileValue}>{profile.skinType}</h2>
              <p style={profileDescription}>
                {getSkinTypeDescription(profile.primarySkinType)}
              </p>
            </div>

            {/* TOP CONCERNS */}
            <div style={profileSection}>
              <span style={profileLabel}>TOP PRIORITIES</span>
              <div style={concernsList}>
                {profile.topConcerns.map((concern, i) => (
                  <motion.div
                    key={concern}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    style={concernItem}
                  >
                    <div style={concernNumber}>{i + 1}</div>
                    <span style={concernText}>
                      {getConcernDescription(concern)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* RECOMMENDED PRODUCTS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={sectionWrap}
        >
          <div style={sectionHeader}>
            <h2 style={sectionTitle}>
              Your <span style={italic}>Recommended</span> Products
            </h2>
            <p style={sectionSub}>
              {recommendedProducts.length} products handpicked for your skin
            </p>
          </div>

          {recommendedProducts.length === 0 ? (
            <div style={noProducts}>
              <p>We couldn't match products to your profile right now.</p>
              <button onClick={() => navigate("/shop")} style={primaryBtn}>
                Browse All Products
              </button>
            </div>
          ) : (
            <>
              <div style={productGrid}>
                {recommendedProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    style={productCard}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div style={productImageWrap}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={productImage}
                      />
                      <span style={productTypeBadge}>{product.type}</span>
                    </div>
                    <div style={productInfo}>
                      <p style={productBrand}>{product.brand}</p>
                      <h3 style={productName}>{product.name}</h3>
                      <p style={productPrice}>
                        {formatPrice(product.price, "USD")}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* BUNDLE CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={bundleCard}
              >
                <div style={bundleContent}>
                  <div>
                    <span style={bundleLabel}>
                      ✨ COMPLETE YOUR ROUTINE
                    </span>
                    <h3 style={bundleTitle}>
                      Get all {recommendedProducts.length} products in one click
                    </h3>
                    <p style={bundleSubtitle}>
                      Build your personalized skincare routine instantly
                    </p>
                  </div>
                  <div style={bundlePriceWrap}>
                    <span style={bundlePriceLabel}>Bundle total</span>
                    <span style={bundlePrice}>
                      {formatPrice(bundleTotal, "USD")}
                    </span>
                  </div>
                </div>

                <button onClick={handleAddBundle} style={bundleBtn}>
                  🛍️ Add All to Cart
                </button>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* ROUTINE BREAKDOWN */}
        {(routine.morning.length > 0 || routine.evening.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={sectionWrap}
          >
            <div style={sectionHeader}>
              <h2 style={sectionTitle}>
                Your <span style={italic}>Daily</span> Routine
              </h2>
              <p style={sectionSub}>Apply in this order for best results</p>
            </div>

            <div style={routineGrid}>
              {/* MORNING */}
              {routine.morning.length > 0 && (
                <div style={routineColumn}>
                  <div style={routineHeader}>
                    <span style={routineIcon}>☀️</span>
                    <div>
                      <h3 style={routineTitle}>Morning</h3>
                      <p style={routineSub}>Start your day glowing</p>
                    </div>
                  </div>
                  <div style={routineSteps}>
                    {routine.morning.map((step, i) => (
                      <div key={i} style={routineStep}>
                        <div style={routineStepNumber}>{step.step}</div>
                        <div style={routineStepContent}>
                          <p style={routineStepName}>{step.name}</p>
                          <p style={routineStepProduct}>
                            {step.product.brand} · {step.product.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EVENING */}
              {routine.evening.length > 0 && (
                <div style={routineColumn}>
                  <div style={routineHeader}>
                    <span style={routineIcon}>🌙</span>
                    <div>
                      <h3 style={routineTitle}>Evening</h3>
                      <p style={routineSub}>Repair and renew overnight</p>
                    </div>
                  </div>
                  <div style={routineSteps}>
                    {routine.evening.map((step, i) => (
                      <div key={i} style={routineStep}>
                        <div style={routineStepNumber}>{step.step}</div>
                        <div style={routineStepContent}>
                          <p style={routineStepName}>{step.name}</p>
                          <p style={routineStepProduct}>
                            {step.product.brand} · {step.product.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ACTIONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          style={actionsRow}
        >
          <button onClick={handleRetake} style={secondaryBtn}>
            Retake Quiz
          </button>
          <button onClick={() => navigate("/shop")} style={secondaryBtn}>
            Browse All Products
          </button>
        </motion.div>
      </div>

      {/* MOBILE STYLES */}
      <style>{`
        @media (max-width: 768px) {
          .results-profile-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .results-routine-grid {
            grid-template-columns: 1fr !important;
          }
          .results-bundle-content {
            flex-direction: column !important;
            text-align: center !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </>
  );
}

/* ============================================================
   🎨 STYLES
   ============================================================ */

const page = {
  background: `linear-gradient(135deg, ${theme.colors.bg} 0%, #fde6e9 100%)`,
  minHeight: "100vh",
  padding: "40px 20px",
};

const hero = {
  maxWidth: 720,
  margin: "0 auto 40px",
  textAlign: "center",
};

const eyebrow = {
  display: "inline-block",
  fontSize: 11,
  letterSpacing: "0.3em",
  fontWeight: 600,
  color: theme.colors.primary,
  marginBottom: 14,
  textTransform: "uppercase",
};

const italic = { fontStyle: "italic", fontWeight: 400 };

const heroTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(28px, 4.5vw, 44px)",
  fontWeight: 700,
  color: theme.colors.dark,
  margin: "0 0 16px",
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
};

const heroSubtitle = {
  fontSize: 16,
  color: theme.colors.muted,
  lineHeight: 1.6,
  maxWidth: 500,
  margin: "0 auto",
};

/* PROFILE CARD */
const profileCard = {
  maxWidth: 960,
  margin: "0 auto 50px",
  background: theme.colors.card,
  borderRadius: 24,
  padding: "36px",
  boxShadow: "0 20px 60px rgba(125,42,60,0.08)",
};

const profileGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 40,
  className: "results-profile-grid",
};

const profileSection = {};

const profileLabel = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.25em",
  color: theme.colors.primary,
  marginBottom: 8,
  display: "block",
};

const profileValue = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 28,
  fontWeight: 600,
  color: theme.colors.dark,
  margin: "0 0 12px",
  lineHeight: 1.2,
};

const profileDescription = {
  fontSize: 14,
  color: theme.colors.muted,
  lineHeight: 1.6,
  margin: 0,
};

const concernsList = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  marginTop: 8,
};

const concernItem = {
  display: "flex",
  alignItems: "center",
  gap: 14,
};

const concernNumber = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.dark})`,
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  fontSize: 14,
  flexShrink: 0,
};

const concernText = {
  fontSize: 15,
  fontWeight: 500,
  color: theme.colors.dark,
};

/* SECTION WRAPPER */
const sectionWrap = {
  maxWidth: 1100,
  margin: "0 auto 50px",
};

const sectionHeader = {
  textAlign: "center",
  marginBottom: 30,
};

const sectionTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(26px, 3.5vw, 36px)",
  fontWeight: 700,
  color: theme.colors.dark,
  margin: 0,
  letterSpacing: "-0.02em",
};

const sectionSub = {
  fontSize: 14,
  color: theme.colors.muted,
  marginTop: 8,
};

/* PRODUCT GRID */
const productGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: 16,
  marginBottom: 30,
};

const productCard = {
  background: theme.colors.card,
  borderRadius: 16,
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 6px 20px rgba(125,42,60,0.06)",
};

const productImageWrap = {
  position: "relative",
  width: "100%",
  paddingTop: "100%",
  background: theme.colors.bg,
};

const productImage = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const productTypeBadge = {
  position: "absolute",
  top: 10,
  left: 10,
  background: theme.colors.dark,
  color: "#fff",
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

const productInfo = {
  padding: "14px 16px",
};

const productBrand = {
  fontSize: 10,
  color: theme.colors.primary,
  fontWeight: 600,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  margin: "0 0 4px",
};

const productName = {
  fontSize: 14,
  fontWeight: 600,
  color: theme.colors.dark,
  margin: "0 0 6px",
  lineHeight: 1.3,
};

const productPrice = {
  fontSize: 14,
  fontWeight: 700,
  color: theme.colors.dark,
  margin: 0,
};

/* BUNDLE CTA */
const bundleCard = {
  background: `linear-gradient(135deg, ${theme.colors.dark} 0%, ${theme.colors.primary} 100%)`,
  borderRadius: 24,
  padding: "32px",
  color: "#fff",
};

const bundleContent = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 24,
  marginBottom: 24,
  className: "results-bundle-content",
};

const bundleLabel = {
  fontSize: 11,
  letterSpacing: "0.25em",
  fontWeight: 600,
  display: "block",
  marginBottom: 8,
  opacity: 0.9,
};

const bundleTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 24,
  fontWeight: 600,
  margin: "0 0 6px",
  letterSpacing: "-0.01em",
};

const bundleSubtitle = {
  fontSize: 14,
  opacity: 0.85,
  margin: 0,
};

const bundlePriceWrap = {
  textAlign: "right",
  flexShrink: 0,
};

const bundlePriceLabel = {
  fontSize: 11,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  opacity: 0.8,
  display: "block",
  marginBottom: 4,
};

const bundlePrice = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 36,
  fontWeight: 700,
};

const bundleBtn = {
  width: "100%",
  padding: "18px",
  background: "#fff",
  color: theme.colors.dark,
  border: "none",
  borderRadius: 14,
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 700,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  transition: "all 0.3s ease",
};

/* ROUTINE */
const routineGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 24,
  className: "results-routine-grid",
};

const routineColumn = {
  background: theme.colors.card,
  borderRadius: 20,
  padding: "28px",
  boxShadow: "0 10px 30px rgba(125,42,60,0.06)",
};

const routineHeader = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  marginBottom: 24,
  paddingBottom: 18,
  borderBottom: `1px solid ${theme.colors.border}`,
};

const routineIcon = {
  fontSize: 32,
};

const routineTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 22,
  fontWeight: 600,
  color: theme.colors.dark,
  margin: 0,
};

const routineSub = {
  fontSize: 12,
  color: theme.colors.muted,
  margin: "2px 0 0",
};

const routineSteps = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const routineStep = {
  display: "flex",
  alignItems: "flex-start",
  gap: 14,
};

const routineStepNumber = {
  width: 28,
  height: 28,
  borderRadius: "50%",
  background: theme.colors.bg,
  border: `2px solid ${theme.colors.primary}`,
  color: theme.colors.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  fontWeight: 700,
  flexShrink: 0,
};

const routineStepContent = {
  flex: 1,
  minWidth: 0,
};

const routineStepName = {
  fontSize: 14,
  fontWeight: 600,
  color: theme.colors.dark,
  margin: "0 0 2px",
};

const routineStepProduct = {
  fontSize: 12,
  color: theme.colors.muted,
  margin: 0,
};

/* ACTIONS */
const actionsRow = {
  display: "flex",
  gap: 14,
  justifyContent: "center",
  flexWrap: "wrap",
  marginTop: 40,
};

const primaryBtn = {
  padding: "14px 28px",
  background: theme.colors.dark,
  color: "#fff",
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

const secondaryBtn = {
  padding: "14px 24px",
  background: "transparent",
  color: theme.colors.dark,
  border: `1px solid ${theme.colors.dark}`,
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

/* LOADING / EMPTY */
const loadingBox = {
  textAlign: "center",
  padding: "100px 20px",
};

const spinner = {
  width: 40,
  height: 40,
  border: `3px solid ${theme.colors.border}`,
  borderTop: `3px solid ${theme.colors.primary}`,
  borderRadius: "50%",
  margin: "0 auto 20px",
};

const loadingText = {
  color: theme.colors.muted,
  fontSize: 14,
};

const emptyBox = {
  textAlign: "center",
  padding: "80px 20px",
  maxWidth: 480,
  margin: "0 auto",
};

const emptyTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 28,
  color: theme.colors.dark,
  marginBottom: 12,
};

const emptySub = {
  color: theme.colors.muted,
  marginBottom: 24,
};

const noProducts = {
  textAlign: "center",
  padding: 40,
  background: theme.colors.card,
  borderRadius: 16,
};