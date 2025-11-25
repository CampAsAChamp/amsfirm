import { SectionHeaderProps } from '@/types';

export default function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
        {title}
      </h2>
      <p className="text-xl text-body max-w-3xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
