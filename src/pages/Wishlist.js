import ProductCard from "../components/ProductCard";
import { theme } from "../theme";

export default function Wishlist({
  wishlist,
  addToCart,
  toggleWishlist,
}) {
  return (
    <div
      style={{
        background: theme.colors.bg,
        minHeight: "100vh",
        padding: "30px 24px",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "20px" }}>
        <h1
          style={{
            color: theme.colors.dark,
            fontSize: "26px",
            fontWeight: "600",
            marginBottom: "6px",
          }}
        >
          Your Wishlist ❤️
        </h1>

        <p
          style={{
            color: theme.colors.muted,
            fontSize: "14px",
          }}
        >
          Saved products you love for later
        </p>
      </div>

      {/* EMPTY STATE */}
      {wishlist.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "70px 20px",
            background: theme.colors.card,
            borderRadius: theme.radius.card,
            border: `1px solid ${theme.colors.border}`,
            boxShadow: theme.shadow,
          }}
        >
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>
            💔
          </div>

          <h2
            style={{
              color: theme.colors.dark,
              marginBottom: "6px",
              fontSize: "18px",
            }}
          >
            Your wishlist is empty
          </h2>

          <p
            style={{
              color: theme.colors.muted,
              fontSize: "14px",
            }}
          >
            Save products you love while shopping
          </p>
        </div>
      ) : (
        /* GRID */
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "18px",
          }}
        >
          {wishlist.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}