import { ProcessStepProps } from '@/types';

export default function ProcessStep({ stepNumber, icon, title, description, showArrow = false }: ProcessStepProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-center flex-1">
        <div className="relative inline-flex justify-center items-center mb-4">
          <div className="bg-surface-tertiary w-20 h-20 rounded-full flex items-center justify-center text-primary">
            {icon}
          </div>
          <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-on-primary">{stepNumber}</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-heading mb-2">{title}</h3>
        <p className="text-body">{description}</p>
      </div>
      
      {showArrow && (
        <div className="hidden md:block flex-shrink-0">
          <svg 
            className="w-8 h-8 text-primary" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            />
          </svg>
        </div>
      )}
    </div>
  );
}

