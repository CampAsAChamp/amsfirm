interface ProcessStepProps {
  stepNumber: number;
  title: string;
  description: string;
}

export default function ProcessStep({ stepNumber, title, description }: ProcessStepProps) {
  return (
    <div className="text-center">
      <div className="icon-circle">
        <span className="text-2xl font-bold text-amber-950">{stepNumber}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
