// src/pages/About.js

import SEO from "../components/SEO";
import StaticPage from "../components/StaticPage";

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Aura Store: curated luxury skincare, born from a love of dermatologist-approved formulas. Discover our story."
      />
      <StaticPage
        title="Our Story"
        subtitle="Where dermatology meets daily ritual"
        sections={[
          {
            heading: "Welcome to Aura Store",
            content:
              "Aura Store was born from a simple belief: skincare shouldn't be complicated, overpriced, or full of empty promises. We curate only the formulas trusted by dermatologists worldwide — bringing you the best of Avène, La Roche-Posay, and other gold-standard names in skin health.",
          },
          {
            heading: "Our Philosophy",
            content:
              "We believe that great skincare is rooted in science, not marketing. Every product in our edit has been tested, vetted, and approved by skin experts. We don't chase trends — we chase results.",
          },
          {
            heading: "Why we exist",
            list: [
              "Curated selection — only proven, dermatologist-approved formulas",
              "Personalized recommendations through our smart skin quiz",
              "Transparent pricing and honest ingredient information",
              "Fast delivery across Lebanon and the Middle East",
              "Real human support — never robotic chatbots",
            ],
          },
          {
            heading: "Built for you",
            content:
              "Whether you're starting your first routine or refining an advanced regimen, Aura Store is here to help you discover skincare that actually works. Take our quiz, browse our edits, and find your perfect match.",
          },
        ]}
        lastUpdated="January 2026"
      />
    </>
  );
}