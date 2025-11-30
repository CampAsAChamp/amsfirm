'use client';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="rounded-lg overflow-hidden bg-surface hover:shadow-md transition-shadow">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-surface-secondary transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <h3 className="text-heading font-semibold text-lg pr-4">{question}</h3>
        <svg
          className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="px-6 py-4 bg-surface-secondary">
          <p className="text-body leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

