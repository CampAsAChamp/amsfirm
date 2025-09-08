import Link from 'next/link';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  features,
  buttonText,
  buttonLink
}: ServiceCardProps) {
  return (
    <div className="card-base">
      <div className="text-amber-950 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">
        {description}
      </p>
      <ul className="text-sm text-gray-600 space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
      <Link
        href={buttonLink}
        className="btn-primary"
      >
        {buttonText}
      </Link>
    </div>
  );
}
