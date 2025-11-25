import Link from 'next/link';
import Image from 'next/image';
import { HeroSectionProps } from '@/types';

export default function HeroSection({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  backgroundClass = "bg-gradient-to-r from-primary-hover to-primary-dark",
  showLogo = false
}: HeroSectionProps) {
  return (
    <section className={`${backgroundClass} text-on-primary section-padding`}>
      <div className="section-container">
        <div className="text-center">
          {showLogo && (
            <div className="mb-8 flex justify-center">
              <Image 
                src="/schneider-law-logo.svg" 
                alt="Schneider Law" 
                width={300} 
                height={100}
                className="h-24 w-auto filter brightness-0 invert"
                priority
              />
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-hero-heading">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-hero-body max-w-3xl mx-auto">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryButtonLink}
              className="btn-hero-secondary"
            >
              {primaryButtonText}
            </Link>
            {secondaryButtonText && secondaryButtonLink && (
              <Link
                href={secondaryButtonLink}
                className="btn-hero-primary"
              >
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
