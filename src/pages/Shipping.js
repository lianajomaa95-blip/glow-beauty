import StaticPage from "../components/StaticPage";

export default function Shipping() {
  return (
    <StaticPage
      title="Shipping Information"
      subtitle="Fast, reliable delivery across Lebanon"
      lastUpdated="May 2026"
      sections={[
        {
          heading: "Delivery Times",
          content:
            "We process orders within 24 hours (Monday–Friday). Once shipped, your order will arrive within:",
          list: [
            "🏙️ Beirut & suburbs: 1–2 business days",
            "🇱🇧 Other Lebanese cities: 2–4 business days",
            "📦 Remote areas: 3–5 business days",
          ],
        },
        {
          heading: "Shipping Costs",
          list: [
            "Free shipping on orders over $40",
            "Standard shipping under $40: $10 flat rate",
            "Cash on Delivery: +$2 handling fee",
            "Express delivery (Beirut only): $15 (same-day if ordered before 12 PM)",
          ],
        },
        {
          heading: "Order Tracking",
          content:
            "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order anytime from the 'My Orders' page in your account.",
        },
        {
          heading: "Payment Methods",
          content: "We currently accept:",
          list: [
            "💳 Credit/Debit Cards (Visa, Mastercard)",
            "📱 Whish Money",
            "📦 Cash on Delivery",
          ],
        },
        {
          heading: "International Shipping",
          content:
            "We currently ship only within Lebanon. International shipping is coming soon — sign up for our newsletter to be notified when we expand!",
        },
        {
          heading: "Need Help?",
          content:
            "If you have questions about your shipment or want to update your delivery address, contact us via WhatsApp at +961 76 809 185 or through our Contact page.",
        },
      ]}
    />
  );
}