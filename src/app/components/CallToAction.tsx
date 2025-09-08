import Link from 'next/link';

interface CallToActionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundClass?: string;
}

export default function CallToAction({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundClass = "bg-amber-950"
}: CallToActionProps) {
  return (
    <section className={`${backgroundClass} text-white py-16`}>
      <div className="section-container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-xl mb-8 text-amber-50 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <Link
          href={buttonLink}
          className="btn-secondary"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
