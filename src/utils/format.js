// src/utils/format.js
//
// Helpers for formatting numbers, currency, etc.

/**
 * Format a price with proper decimals and currency symbol.
 * formatPrice(18) → "$18.00"
 * formatPrice(18.5, "EUR") → "€18.50"
 * formatPrice(18, "USD", "en-US") → "$18.00"
 */
export function formatPrice(amount, currency = "USD", locale = "en-US") {
  const number = Number(amount) || 0;

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  } catch (err) {
    // fallback if currency code is invalid
    return `$${number.toFixed(2)}`;
  }
}