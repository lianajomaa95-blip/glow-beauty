// src/utils/analytics.js
//
// Centralized analytics tracking. Wraps Google Analytics gtag,
// Facebook Pixel, and LinkedIn Insight Tag in a single API.
//
// Usage: import { trackEvent, trackPurchase } from "../utils/analytics";

const IS_PROD = process.env.NODE_ENV === "production";

// 🔧 Helper to safely call gtag (skips if not loaded)
function gtag(...args) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

// 🔧 Helper to safely call Facebook Pixel
function fbq(...args) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
}

// 🔧 Helper for LinkedIn Insight Tag
function lintrk(...args) {
  if (typeof window !== "undefined" && typeof window.lintrk === "function") {
    window.lintrk(...args);
  }
}

/* ============================================================
   📊 GENERIC EVENT TRACKING
   ============================================================ */

/**
 * Track a custom event in GA4.
 * @param {string} eventName - GA4 standard or custom event name
 * @param {object} params - Event parameters
 */
export function trackEvent(eventName, params = {}) {
  // Dev mode: log to console so you can verify events fire
  if (!IS_PROD) {
    console.log(`📊 [Analytics Event] ${eventName}`, params);
    return;
  }

  gtag("event", eventName, params);
}

/* ============================================================
   🛍️ E-COMMERCE EVENTS (GA4 standard schema)
   ============================================================ */

/**
 * User viewed a product detail page.
 */
export function trackViewItem(product) {
  if (!product) return;

  trackEvent("view_item", {
    currency: product.currency || "USD",
    value: Number(product.price) || 0,
    items: [productToGA4Item(product)],
  });

  // Facebook Pixel
  fbq("track", "ViewContent", {
    content_ids: [String(product.id)],
    content_name: product.name,
    content_type: "product",
    value: Number(product.price),
    currency: product.currency || "USD",
  });
}

/**
 * User added a product to cart.
 */
export function trackAddToCart(product, quantity = 1) {
  if (!product) return;

  trackEvent("add_to_cart", {
    currency: product.currency || "USD",
    value: Number(product.price) * quantity,
    items: [productToGA4Item(product, quantity)],
  });

  fbq("track", "AddToCart", {
    content_ids: [String(product.id)],
    content_name: product.name,
    content_type: "product",
    value: Number(product.price) * quantity,
    currency: product.currency || "USD",
  });
}

/**
 * User removed a product from cart.
 */
export function trackRemoveFromCart(product, quantity = 1) {
  if (!product) return;

  trackEvent("remove_from_cart", {
    currency: product.currency || "USD",
    value: Number(product.price) * quantity,
    items: [productToGA4Item(product, quantity)],
  });
}

/**
 * User opened cart.
 */
export function trackViewCart(cartItems = []) {
  const value = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.qty || 1),
    0
  );

  trackEvent("view_cart", {
    currency: "USD",
    value,
    items: cartItems.map((item) => productToGA4Item(item, item.qty)),
  });
}

/**
 * User added product to wishlist.
 */
export function trackAddToWishlist(product) {
  if (!product) return;

  trackEvent("add_to_wishlist", {
    currency: product.currency || "USD",
    value: Number(product.price) || 0,
    items: [productToGA4Item(product)],
  });

  fbq("track", "AddToWishlist", {
    content_ids: [String(product.id)],
    content_name: product.name,
    value: Number(product.price),
    currency: product.currency || "USD",
  });
}

/**
 * User started the checkout process.
 */
export function trackBeginCheckout(cartItems = [], promoCode = null) {
  const value = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.qty || 1),
    0
  );

  trackEvent("begin_checkout", {
    currency: "USD",
    value,
    coupon: promoCode,
    items: cartItems.map((item) => productToGA4Item(item, item.qty)),
  });

  fbq("track", "InitiateCheckout", {
    content_ids: cartItems.map((i) => String(i.id)),
    num_items: cartItems.length,
    value,
    currency: "USD",
  });
}

/**
 * User completed a purchase.
 * @param {object} order - The order object
 */
export function trackPurchase(order) {
  if (!order) return;

  trackEvent("purchase", {
    transaction_id: order.orderNumber,
    currency: "USD",
    value: Number(order.total) || 0,
    tax: 0,
    shipping: Number(order.shipping) || 0,
    coupon: order.promoCode || undefined,
    items: order.items.map((item) => productToGA4Item(item, item.qty)),
  });

  fbq("track", "Purchase", {
    content_ids: order.items.map((i) => String(i.id)),
    num_items: order.items.length,
    value: Number(order.total),
    currency: "USD",
  });

  lintrk("track", { conversion_id: "PURCHASE" });
}

/**
 * User applied a promo code.
 */
export function trackApplyPromo(code, discountAmount) {
  trackEvent("select_promotion", {
    promotion_id: code,
    promotion_name: `Promo ${code}`,
    discount: discountAmount,
  });
}

/* ============================================================
   🔍 ENGAGEMENT EVENTS
   ============================================================ */

/**
 * User performed a search.
 */
export function trackSearch(searchTerm, resultsCount = 0) {
  trackEvent("search", {
    search_term: searchTerm,
    results_count: resultsCount,
  });

  fbq("track", "Search", { search_string: searchTerm });
}

/**
 * User signed up for newsletter.
 */
export function trackNewsletterSignup(email) {
  trackEvent("sign_up", {
    method: "newsletter",
  });

  fbq("track", "Lead", { content_name: "Newsletter Signup" });

  lintrk("track", { conversion_id: "NEWSLETTER" });
}

/**
 * User completed the skin quiz.
 */
export function trackQuizComplete(skinType, concerns = []) {
  trackEvent("quiz_complete", {
    skin_type: skinType,
    concerns: concerns.join(","),
  });
}

/**
 * User contacted support.
 */
export function trackContactSubmit() {
  trackEvent("generate_lead", {
    method: "contact_form",
  });

  fbq("track", "Contact");
}

/**
 * User clicked on a CTA button (track which one).
 */
export function trackCTAClick(label, location) {
  trackEvent("cta_click", {
    cta_label: label,
    cta_location: location,
  });
}

/* ============================================================
   📦 INTERNAL HELPERS
   ============================================================ */

/**
 * Convert our product shape into GA4's expected `items` schema.
 */
function productToGA4Item(product, quantity = 1) {
  return {
    item_id: String(product.id || ""),
    item_name: product.name || "",
    item_brand: product.brand || "",
    item_category: product.type || "",
    price: Number(product.price) || 0,
    quantity: quantity,
  };
}