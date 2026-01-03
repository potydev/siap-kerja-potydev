import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, name: 'Data Pribadi', short: 'Pribadi' },
  { id: 2, name: 'Profil Singkat', short: 'Profil' },
  { id: 3, name: 'Pendidikan', short: 'Pendidikan' },
  { id: 4, name: 'Pengalaman', short: 'Pengalaman' },
  { id: 5, name: 'Skill', short: 'Skill' },
  { id: 6, name: 'Sertifikat', short: 'Sertifikat' },
];

interface StepperProgressProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const StepperProgress = ({ currentStep, onStepClick }: StepperProgressProps) => {
  return (
    <div className="w-full py-4">
      {/* Desktop view */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <button
              onClick={() => onStepClick(step.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300",
                  currentStep > step.id && "bg-step-completed text-success-foreground",
                  currentStep === step.id && "bg-step-active text-primary-foreground scale-110",
                  currentStep < step.id && "bg-step-pending text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  currentStep === step.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 transition-colors duration-300",
                  currentStep > step.id ? "bg-step-completed" : "bg-step-pending"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Langkah {currentStep} dari {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {steps[currentStep - 1]?.name}
          </span>
        </div>
        <div className="flex gap-1">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={cn(
                "flex-1 h-2 rounded-full transition-colors duration-300",
                currentStep > step.id && "bg-step-completed",
                currentStep === step.id && "bg-step-active",
                currentStep < step.id && "bg-step-pending"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
