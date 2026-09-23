import type { Metadata } from "next"

import HeroSection from "@/app/components/hero/HeroSection"

import ContactInfo from "./ContactInfo"
import MapSection from "./MapSection"

export const metadata: Metadata = {
  title: "Contact Anna M. Schneider Law - Estate Planning Attorney in Torrance",
  description:
    "Contact Anna M. Schneider Law for estate planning services in Torrance, CA. Call (310) 792-7454 or visit our office for a consultation.",
}

export default function Contact() {
  return (
    <div className="bg-page">
      <HeroSection
        title="Contact"
        subtitle="Ready to protect your family's future? Schedule a consultation to discuss your estate planning needs."
        primaryButtonText="Call (310) 792-7454"
        primaryButtonLink="tel:3107927454"
      />

      <section className="py-20 bg-surface-secondary">
        <div className="container-page">
          <div className="max-w-xl mx-auto">
            <ContactInfo />
          </div>
        </div>
      </section>

      <MapSection />
    </div>
  )
}
