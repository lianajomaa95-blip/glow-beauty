import StaticPage from "../components/StaticPage";

export default function Privacy() {
  return (
    <StaticPage
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your information"
      lastUpdated="May 2026"
      sections={[
        {
          heading: "Introduction",
          content:
            "GlowSkin respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit or shop on our website.",
        },
        {
          heading: "Information We Collect",
          content: "We collect information you provide directly to us, such as when you:",
          list: [
            "Create an account or place an order (name, email, phone, address)",
            "Subscribe to our newsletter (email address)",
            "Contact us for support (name, email, message content)",
            "Leave a product review (name, review content)",
            "Take our Skin Quiz (skin type, concerns)",
          ],
        },
        {
          heading: "How We Use Your Information",
          content: "We use your information to:",
          list: [
            "Process and deliver your orders",
            "Send you order confirmations and shipping updates",
            "Provide customer support",
            "Send marketing emails (only if you subscribed — you can unsubscribe anytime)",
            "Improve our website and products based on customer feedback",
            "Comply with legal obligations",
          ],
        },
        {
          heading: "Data Security",
          content:
            "We implement industry-standard security measures to protect your personal information. Payment data is processed securely through encrypted channels — we never store your full credit card details on our servers.",
        },
        {
          heading: "Cookies",
          content:
            "Our website uses cookies to remember your preferences (like dark mode, cart contents, wishlist) and improve your experience. You can disable cookies in your browser settings, but some features may not work correctly.",
        },
        {
          heading: "Third-Party Services",
          content:
            "We use trusted third-party services to operate our store, including Shopify (for product catalog and orders) and Formspree (for the contact form). These providers have their own privacy policies that govern their use of your data.",
        },
        {
          heading: "Your Rights",
          content: "You have the right to:",
          list: [
            "Access your personal data we hold",
            "Request correction of inaccurate data",
            "Request deletion of your data (subject to legal obligations)",
            "Opt out of marketing communications",
            "Lodge a complaint with a data protection authority",
          ],
        },
        {
          heading: "Children's Privacy",
          content:
            "Our services are not directed at children under 16. We do not knowingly collect personal information from minors. If you believe we have collected such data, please contact us and we will delete it.",
        },
        {
          heading: "Changes to This Policy",
          content:
            "We may update this privacy policy from time to time. We'll notify you of significant changes by email or via a notice on our website.",
        },
        {
          heading: "Contact Us",
          content:
            "If you have questions about this privacy policy or your personal data, please reach out via our Contact page or email lianajomaa95@gmail.com.",
        },
      ]}
    />
  );
}