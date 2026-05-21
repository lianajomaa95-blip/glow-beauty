import StaticPage from "../components/StaticPage";
import SEO from "../components/SEO";
export default function About() {
  return (
    <>
      <SEO title="About Us" description="GlowSkin: curated luxury skincare, born from a love of dermatologist-approved formulas. Discover our story." />
      <StaticPage
        title="About GlowSkin"
      subtitle="Skincare that respects your skin, your time, and your wallet."
      sections={[
        {
          heading: "Our Mission",
          content: [
            "GlowSkin was founded with a simple belief: everyone deserves access to dermatologist-approved skincare that actually works. We carefully curate products from the world's most trusted brands so you don't have to spend hours researching what's right for your skin.",
            "We don't believe in trends or 12-step routines. We believe in honest, effective products that respect your skin barrier and deliver real results.",
          ],
        },
        {
          heading: "What We Offer",
          content: "Our collection focuses on:",
          list: [
            "Premium brands trusted by dermatologists (Avène, La Roche-Posay)",
            "Products for every skin type — sensitive, oily, dry, combination",
            "Targeted solutions for acne, aging, dark spots, and more",
            "Honest descriptions and transparent pricing",
            "Personalized skincare advice via our AI Skin Coach",
          ],
        },
        {
          heading: "Why Choose Us",
          content: [
            "Every product on GlowSkin is selected by a team passionate about skincare science. We test, we research, we vet. We're not influenced by what's popular on TikTok this week — we're influenced by what works.",
            "Our AI tools (Skin Quiz, Routine Builder, Skin Coach) help you find the perfect routine in minutes, not weeks. Whether you're new to skincare or a seasoned enthusiast, we're here to make the journey simpler.",
          ],
        },
        {
          heading: "Our Values",
          list: [
            "🌿 Transparency in everything we do",
            "💎 Quality over quantity",
            "🧬 Science-backed recommendations",
            "❤️ Customer-first support",
            "🌍 Sustainable choices when possible",
          ],
        },
        {
          heading: "Get in Touch",
          content:
            "Have questions? Need advice? Want to suggest a brand we should carry? We'd love to hear from you. Visit our Contact page or message us on WhatsApp — we usually reply within hours.",
        },
        ]}
      />
    </>
  );
}