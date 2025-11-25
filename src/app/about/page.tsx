import { philosophyFeatures, stats, testimonials } from "../constants/data";

import CallToAction from "../components/CallToAction";
import FeatureCard from "../components/FeatureCard";
import HeroSection from "../components/HeroSection";
import Link from "next/link";
import StatsCard from "../components/StatsCard";
import TestimonialCard from "../components/TestimonialCard";

export default function About() {
  return (
    <div className="bg-page">
      {/* Hero Section */}
      <HeroSection
        title="About AMS Law"
        subtitle="Dedicated to protecting your family's future with expert legal guidance and personalized estate planning solutions."
        primaryButtonText="Schedule Consultation"
        primaryButtonLink="/contact"
      />

      {/* Attorney Profile */}
      <section className="py-20 bg-surface-secondary">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6">
                Meet Your Attorney
              </h2>
              <div className="space-y-4 text-body mb-8">
                <p>
                  With over 15 years of experience in estate planning and probate law, 
                  I am dedicated to helping families protect their assets and ensure their 
                  wishes are carried out exactly as intended.
                </p>
                <p>
                  My practice focuses exclusively on wills, trusts, and estate planning, 
                  allowing me to provide specialized expertise that larger firms often lack. 
                  I believe that every family deserves personalized attention and comprehensive 
                  legal protection.
                </p>
                <p>
                  I understand that discussing estate planning can be difficult, which is why 
                  I approach every client relationship with compassion, patience, and clear 
                  communication. My goal is to make the process as straightforward as possible 
                  while ensuring your family&apos;s future is secure.
                </p>
              </div>
              
              <div className="card-info">
                <h3 className="text-xl font-semibold text-heading mb-4">Education & Credentials</h3>
                <ul className="space-y-2 text-body">
                  <li>• Juris Doctor, [Law School Name]</li>
                  <li>• Bachelor of Arts, [University Name]</li>
                  <li>• Licensed to practice in [State]</li>
                  <li>• Member, [State] Bar Association</li>
                  <li>• Member, Estate Planning Council</li>
                  <li>• Certified Estate Planning Specialist</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="aspect-square bg-placeholder rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-24 h-24 text-muted" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-heading mb-2">Attorney Name</h3>
                <p className="text-primary-hover font-semibold mb-4">Principal Attorney</p>
                <p className="text-body mb-6">
                  Specializing in Estate Planning, Wills, Trusts, and Probate Administration
                </p>
                <Link
                  href="/contact"
                  className="btn-cta"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-surface">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              Our Philosophy
            </h2>
            <p className="text-xl text-body max-w-3xl mx-auto">
              We believe that estate planning is about more than just legal documents—it&apos;s about 
              protecting the people and values you hold most dear.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Results */}
      <section className="py-20 bg-surface-secondary">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              Experience & Results
            </h2>
            <p className="text-xl text-body max-w-3xl mx-auto">
              Our track record speaks for itself. We&apos;ve helped hundreds of families 
              protect their assets and secure their legacies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                number={stat.number}
                label={stat.label}
              />
            ))}
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold text-heading mb-6 text-center">
              What Our Clients Say
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction
        title="Ready to Work Together?"
        subtitle="Let's discuss how we can help protect your family's future. Schedule a free consultation to get started."
        buttonText="Schedule Free Consultation"
        buttonLink="/contact"
      />
    </div>
  );
}
