import { services, whyChooseUsFeatures } from "./constants/data";

import CallToAction from "./components/CallToAction";
import FeatureCard from "./components/FeatureCard";
import HeroSection from "./components/HeroSection";
import ServiceCard from "./components/ServiceCard";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection
        title="Protect Your Family's Future"
        subtitle="Expert legal services for wills, trusts, and estate planning. Secure your legacy with professional guidance you can trust."
        primaryButtonText="Free Consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="Our Services"
        secondaryButtonLink="/services"
      />

      {/* Services Overview */}
      <section className="section-padding bg-amber-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Estate Planning Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide expert legal guidance to help you create a comprehensive estate plan 
              that protects your assets and ensures your wishes are carried out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                buttonText="Learn More"
                buttonLink="/services"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AMS Law?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With years of experience in estate planning, we provide personalized service 
              and expert guidance to protect what matters most to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsFeatures.map((feature, index) => (
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

      {/* Call to Action */}
      <CallToAction
        title="Ready to Protect Your Legacy?"
        subtitle="Don't wait to secure your family's future. Schedule a free consultation to discuss your estate planning needs."
        buttonText="Schedule Free Consultation"
        buttonLink="/contact"
      />
    </div>
  );
}
