import CallToAction from "../components/CallToAction";
import HeroSection from "../components/HeroSection";
import Link from "next/link";
import ProcessStep from "../components/ProcessStep";
import { processSteps } from "../constants/data";

export default function Services() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection
        title="Comprehensive Legal Services"
        subtitle="Expert guidance for all your estate planning and probate needs. Protecting your family&apos;s future with professional legal services."
        primaryButtonText="Free Consultation"
        primaryButtonLink="/contact"
      />

      {/* Main Services */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Wills & Testaments */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-amber-950 mb-6">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Wills & Testaments</h2>
              <p className="text-gray-600 mb-6">
                A will is the foundation of any estate plan. It ensures your assets are distributed 
                according to your wishes and provides for your loved ones after you&apos;re gone.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What We Include:</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Last Will and Testament</li>
                <li>• Living Will (Healthcare Directive)</li>
                <li>• Durable Power of Attorney</li>
                <li>• Healthcare Power of Attorney</li>
                <li>• HIPAA Authorization</li>
                <li>• Asset Inventory and Planning</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Why You Need a Will:</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Control asset distribution</li>
                <li>• Name guardians for minor children</li>
                <li>• Minimize family disputes</li>
                <li>• Reduce probate costs and delays</li>
                <li>• Ensure your wishes are legally binding</li>
              </ul>

              <Link
                href="/contact"
                className="bg-amber-950 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-block"
              >
                Get Started Today
              </Link>
            </div>

            {/* Trust Planning */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-amber-950 mb-6">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Trust Planning</h2>
              <p className="text-gray-600 mb-6">
                Trusts offer advanced estate planning benefits including asset protection, 
                tax minimization, and avoiding probate while maintaining control over your assets.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Types of Trusts We Create:</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Revocable Living Trusts</li>
                <li>• Irrevocable Trusts</li>
                <li>• Special Needs Trusts</li>
                <li>• Charitable Remainder Trusts</li>
                <li>• Asset Protection Trusts</li>
                <li>• Generation-Skipping Trusts</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Trust Benefits:</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Avoid probate proceedings</li>
                <li>• Maintain privacy</li>
                <li>• Reduce estate taxes</li>
                <li>• Protect assets from creditors</li>
                <li>• Provide for special needs beneficiaries</li>
                <li>• Control distribution timing</li>
              </ul>

              <Link
                href="/contact"
                className="bg-amber-950 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-block"
              >
                Learn More
              </Link>
            </div>

            {/* Probate & Administration */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-amber-950 mb-6">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 0a1 1 0 100 2h.01a1 1 0 100-2H9zm2 0a1 1 0 100 2h.01a1 1 0 100-2h-.01z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Probate & Administration</h2>
              <p className="text-gray-600 mb-6">
                When a loved one passes away, navigating the probate process can be overwhelming. 
                We guide you through every step with compassion and expertise.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Probate Services:</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Probate Court Filings</li>
                <li>• Estate Administration</li>
                <li>• Asset Inventory and Valuation</li>
                <li>• Creditor Notification</li>
                <li>• Tax Return Preparation</li>
                <li>• Final Distribution to Beneficiaries</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">How We Help:</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Handle all court proceedings</li>
                <li>• Manage estate assets</li>
                <li>• Resolve disputes among heirs</li>
                <li>• Minimize delays and costs</li>
                <li>• Ensure legal compliance</li>
                <li>• Provide peace of mind</li>
              </ul>

              <Link
                href="/contact"
                className="bg-amber-950 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-block"
              >
                Get Help Now
              </Link>
            </div>

            {/* Estate Planning */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-amber-950 mb-6">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Comprehensive Estate Planning</h2>
              <p className="text-gray-600 mb-6">
                A complete estate plan protects your family and assets while minimizing taxes 
                and ensuring your wishes are carried out exactly as you intend.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Estate Planning Includes:</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Will and Trust Creation</li>
                <li>• Beneficiary Designations</li>
                <li>• Tax Planning Strategies</li>
                <li>• Business Succession Planning</li>
                <li>• Charitable Giving Plans</li>
                <li>• Regular Plan Reviews</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Planning Benefits:</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Protect your family&apos;s future</li>
                <li>• Minimize estate taxes</li>
                <li>• Avoid probate delays</li>
                <li>• Maintain asset control</li>
                <li>• Plan for incapacity</li>
                <li>• Ensure business continuity</li>
              </ul>

              <Link
                href="/contact"
                className="bg-amber-950 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-block"
              >
                Start Planning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Simple Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make estate planning straightforward and stress-free with our proven process 
              that ensures your documents are comprehensive and legally sound.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction
        title="Ready to Secure Your Legacy?"
        subtitle="Don&apos;t leave your family&apos;s future to chance. Schedule a free consultation to discuss your estate planning needs today."
        buttonText="Schedule Free Consultation"
        buttonLink="/contact"
      />
    </div>
  );
}
