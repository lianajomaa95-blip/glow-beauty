// src/components/ProductReviews.js
//
// Product reviews with star ratings. Stored in localStorage,
// keyed by product ID.

import { useState, useEffect } from "react";
import { theme } from "../theme";

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  /* ================= LOAD REVIEWS ================= */

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("reviews")) || {};
    setReviews(all[productId] || []);
  }, [productId]);

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.comment) {
      alert("Please fill your name and comment");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: form.name,
      rating: form.rating,
      comment: form.comment,
      date: new Date().toISOString(),
    };

    const all = JSON.parse(localStorage.getItem("reviews")) || {};
    const productReviews = all[productId] || [];
    const updated = [newReview, ...productReviews];

    all[productId] = updated;
    localStorage.setItem("reviews", JSON.stringify(all));

    setReviews(updated);
    setForm({ name: "", rating: 5, comment: "" });
    setShowForm(false);
  };

  /* ================= STATS ================= */

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div style={section}>
      {/* HEADER */}
      <div style={header}>
        <div>
          <h3 style={title}>Customer Reviews</h3>
          {reviews.length > 0 && (
            <div style={stats}>
              <Stars rating={Math.round(avgRating)} />
              <span style={ratingNum}>{avgRating}</span>
              <span style={countText}>
                ({reviews.length}{" "}
                {reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          style={writeBtn}
        >
          {showForm ? "Cancel" : "✍️ Write a Review"}
        </button>
      </div>

      {/* REVIEW FORM */}
      {showForm && (
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            placeholder="Your name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={input}
          />

          <div style={ratingPicker}>
            <span style={ratingLabel}>Your rating:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setForm({ ...form, rating: n })}
                style={starBtn}
              >
                {n <= form.rating ? "⭐" : "☆"}
              </button>
            ))}
          </div>

          <textarea
            placeholder="Share your thoughts..."
            value={form.comment}
            onChange={(e) =>
              setForm({ ...form, comment: e.target.value })
            }
            style={textarea}
            rows={4}
          />

          <button type="submit" style={submitBtn}>
            Post Review
          </button>
        </form>
      )}

      {/* REVIEWS LIST */}
      {reviews.length === 0 ? (
        <p style={empty}>
          No reviews yet. Be the first to share your experience!
        </p>
      ) : (
        <div style={list}>
          {reviews.map((r) => (
            <div key={r.id} style={reviewCard}>
              <div style={reviewHeader}>
                <strong style={reviewName}>{r.name}</strong>
                <span style={reviewDate}>{formatDate(r.date)}</span>
              </div>
              <Stars rating={r.rating} />
              <p style={comment}>{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= STAR DISPLAY ================= */

function Stars({ rating }) {
  return (
    <div style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} style={{ fontSize: 14 }}>
          {n <= rating ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}

/* ================= STYLES ================= */

const section = {
  marginTop: 30,
  padding: 24,
  background: theme.colors.card,
  borderRadius: 16,
  border: `1px solid ${theme.colors.border}`,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 12,
  marginBottom: 16,
};

const title = {
  margin: 0,
  fontSize: 18,
  color: theme.colors.dark,
};

const stats = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginTop: 6,
};

const ratingNum = {
  fontWeight: 700,
  color: theme.colors.dark,
};

const countText = {
  fontSize: 12,
  color: theme.colors.muted,
};

const writeBtn = {
  padding: "8px 16px",
  background: theme.colors.primary,
  color: "#fff",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
};

const formStyle = {
  background: theme.colors.inputBg,
  padding: 18,
  borderRadius: 12,
  marginBottom: 18,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const input = {
  padding: 12,
  borderRadius: 10,
  border: `1px solid ${theme.colors.border}`,
  background: theme.colors.card,
  color: theme.colors.text,
  outline: "none",
  fontSize: 14,
};

const ratingPicker = {
  display: "flex",
  alignItems: "center",
  gap: 6,
};

const ratingLabel = {
  fontSize: 13,
  marginRight: 6,
  color: theme.colors.muted,
};

const starBtn = {
  background: "none",
  border: "none",
  fontSize: 20,
  cursor: "pointer",
  padding: 2,
};

const textarea = {
  padding: 12,
  borderRadius: 10,
  border: `1px solid ${theme.colors.border}`,
  background: theme.colors.card,
  color: theme.colors.text,
  outline: "none",
  fontSize: 14,
  fontFamily: "inherit",
  resize: "vertical",
};

const submitBtn = {
  padding: "10px 16px",
  background: theme.colors.primary,
  color: "#fff",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 600,
  alignSelf: "flex-start",
};

const empty = {
  color: theme.colors.muted,
  textAlign: "center",
  padding: "20px 0",
  fontSize: 14,
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const reviewCard = {
  padding: 16,
  background: theme.colors.inputBg,
  borderRadius: 12,
};

const reviewHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 6,
};

const reviewName = {
  color: theme.colors.dark,
  fontSize: 14,
};

const reviewDate = {
  fontSize: 11,
  color: theme.colors.muted,
};

const comment = {
  fontSize: 14,
  color: theme.colors.text,
  marginTop: 8,
  lineHeight: 1.6,
};