interface StatsCardProps {
  number: string;
  label: string;
}

export default function StatsCard({ number, label }: StatsCardProps) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-amber-950 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}
