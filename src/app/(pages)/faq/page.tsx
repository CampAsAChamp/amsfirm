import type { Metadata } from "next"

import FAQSection from "@/app/(pages)/faq/FAQSection"
import HeroSection from "@/app/components/hero/HeroSection"
import CallToAction from "@/app/components/sections/CallToAction"

export const metadata: Metadata = {
  title: "Estate Planning FAQ - Common Questions About Wills & Trusts | AMS Law",
  description:
    "Find answers to frequently asked questions about estate planning, living trusts, wills, and probate. Expert guidance from Anna M. Schneider Law in Torrance, CA.",
}

export default function FAQ() {
  return (
    <div className="bg-page">
      <HeroSection
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about estate planning, living trusts, and wills."
        primaryButtonText="Contact"
        primaryButtonLink="/contact"
      />

      <FAQSection />

      <CallToAction
        title="Still Have Questions?"
        subtitle="I'm here to help. Schedule a consultation to discuss your specific estate planning needs."
        buttonText="Contact"
        buttonLink="/contact"
      />
    </div>
  )
}
