import StaticPage from "../components/StaticPage";

export default function Returns() {
  return (
    <StaticPage
      title="Returns & Refunds"
      subtitle="Your satisfaction is our priority. Here's our straightforward return policy."
      lastUpdated="May 2026"
      sections={[
        {
          heading: "30-Day Return Policy",
          content:
            "We offer a 30-day return policy from the date you receive your order. If you're not satisfied, you can return your purchase for a full refund or exchange.",
        },
        {
          heading: "What Can Be Returned",
          list: [
            "✅ Unopened products in original packaging",
            "✅ Opened products with valid reason (allergic reaction, defective, wrong item)",
            "✅ Items received damaged or expired",
          ],
        },
        {
          heading: "What Cannot Be Returned",
          list: [
            "❌ Sale or clearance items (marked 'final sale')",
            "❌ Gift cards",
            "❌ Personalized items",
            "❌ Items returned after 30 days",
          ],
        },
        {
          heading: "How to Return",
          content: "Returning an item is easy:",
          list: [
            "1. Contact us via WhatsApp or the Contact page within 30 days",
            "2. Provide your order number and reason for return",
            "3. We'll send you a return shipping label (if applicable)",
            "4. Ship the item back in its original packaging",
            "5. Once received and inspected, your refund is processed within 5–7 business days",
          ],
        },
        {
          heading: "Refund Methods",
          content:
            "Refunds are issued to the original payment method. Credit/debit card refunds take 5–7 business days to appear on your statement. Cash on Delivery refunds are processed via Whish Money or bank transfer.",
        },
        {
          heading: "Damaged or Wrong Items",
          content:
            "If you received a damaged or incorrect item, please contact us within 48 hours of delivery with photos. We'll arrange a replacement or full refund immediately — no questions asked.",
        },
        {
          heading: "Allergic Reactions",
          content:
            "Skincare is personal. If a product causes an allergic reaction, contact us with photos and we'll process a full refund, even if the product is opened. Your skin health matters more to us than any single sale.",
        },
      ]}
    />
  );
}