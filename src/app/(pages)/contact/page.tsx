import type { Metadata } from "next"

import ContactForm from "@/app/(pages)/contact/ContactForm"
import HeroSection from "@/app/components/hero/HeroSection"

import ContactInfo from "./ContactInfo"
import MapSection from "./MapSection"

export const metadata: Metadata = {
  title: "Contact Anna M. Schneider Law - Estate Planning Attorney in Torrance",
  description:
    "Schedule a consultation with Anna M. Schneider Law for estate planning services in Torrance, CA. Call (310) 792-7454 or fill out our contact form to get started.",
}

export default function Contact() {
  return (
    <div className="bg-page">
      <HeroSection
        title="Contact"
        subtitle="Ready to protect your family's future? Schedule a consultation to discuss your estate planning needs."
        primaryButtonText="Call (310) 792-7454"
        primaryButtonLink="tel:3107927454"
        secondaryButtonText="Schedule Appointment"
        secondaryButtonLink="https://schneiderlaw.cliogrow.com/book/23e33029a379134b415e1386768a136d"
      />

      <section className="py-20 bg-surface-secondary">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      <MapSection />
    </div>
  )
}
