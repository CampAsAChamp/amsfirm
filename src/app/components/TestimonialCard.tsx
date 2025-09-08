interface TestimonialCardProps {
  quote: string;
  author: string;
}

export default function TestimonialCard({ quote, author }: TestimonialCardProps) {
  return (
    <div className="border-l-4 border-amber-800 pl-6">
      <p className="text-gray-600 mb-4 italic">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="font-semibold text-gray-900">- {author}</div>
    </div>
  );
}
