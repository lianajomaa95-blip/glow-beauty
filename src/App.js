import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";
import WhatsappButton from "./components/WhatsappButton";
import DemoBanner from "./components/DemoBanner";
import BackToTop from "./components/BackToTop";
import ScrollToTop from "./components/ScrollToTop";
import SkipLink from "./components/SkipLink";
import Analytics from "./components/Analytics";

import {
  trackAddToCart,
  trackRemoveFromCart,
  trackAddToWishlist,
} from "./utils/analytics";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Wishlist from "./pages/Wishlist";
import Collections from "./pages/Collections";
import CollectionPage from "./pages/CollectionPage";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import SkinQuiz from "./pages/SkinQuiz";
import Recommendations from "./pages/Recommendations";
import RoutineBuilder from "./pages/RoutineBuilder";
import SkinCoach from "./pages/SkinCoach";
import Skincare from "./pages/Skincare";
import Brands from "./pages/Brands";
import BrandPage from "./pages/BrandPage";
import About from "./pages/About";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";
import SearchPage from "./pages/SearchPage";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart"));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  });

  const [selectedCategory] = useState("All");
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [recommended, setRecommended] = useState([]);

  const triggerToast = (message) => {
    setToast(message);
    setShowToast(true);
  };

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to save cart:", err);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (err) {
      console.error("Failed to save wishlist:", err);
    }
  }, [wishlist]);

  const addToCart = (product) => {
    // 📊 TRACK EVENT
    trackAddToCart(product, 1);

    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        triggerToast("Cart updated ✨");
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      triggerToast("Added to cart 🛍️");
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => {
    // 📊 TRACK EVENT (find product first for analytics)
    const product = cart.find((i) => i.id === id);
    if (product) trackRemoveFromCart(product, product.qty || 1);

    setCart((prev) => prev.filter((i) => i.id !== id));
    triggerToast("Item removed 🗑️");
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        triggerToast("Removed from wishlist 💔");
        return prev.filter((p) => p.id !== product.id);
      }
      // 📊 TRACK EVENT (only on add, not remove)
      trackAddToWishlist(product);
      triggerToast("Added to wishlist ❤️");
      return [...prev, product];
    });
  };

  return (
    <>
      <SkipLink />
      <ScrollToTop />
      <Analytics />

      <DemoBanner />

      <Navbar
        cart={cart}
        wishlist={wishlist}
        onCartClick={() => setCartOpen(true)}
      />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
        />
      )}

      <Toast
        message={toast}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                selectedCategory={selectedCategory}
              />
            }
          />
          <Route path="/skincare" element={<Skincare />} />
          <Route path="/brands" element={<Brands />} />
          <Route
            path="/brand/:handle"
            element={
              <BrandPage
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            }
          />
          <Route path="/collections" element={<Collections />} />
          <Route
            path="/collection/:handle"
            element={
              <CollectionPage
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductPage
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            }
          />
          <Route
            path="/cart"
            element={<Cart cart={cart} removeFromCart={removeFromCart} />}
          />
          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
              />
            }
          />
          <Route
            path="/skin-quiz"
            element={<SkinQuiz setRecommended={setRecommended} />}
          />
          <Route
            path="/recommendations"
            element={
              <Recommendations
                recommended={recommended}
                addToCart={addToCart}
              />
            }
          />
          <Route path="/routine" element={<RoutineBuilder />} />
          <Route path="/coach" element={<SkinCoach />} />
          <Route
            path="/checkout"
            element={<Checkout cart={cart} clearCart={clearCart} />}
          />
          <Route path="/orders" element={<Orders addToCart={addToCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route
            path="/search"
            element={
              <SearchPage
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            }
          />
          <Route
            path="/account"
            element={<Account wishlist={wishlist} cart={cart} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <BackToTop />
      <WhatsappButton />
    </>
  );
}