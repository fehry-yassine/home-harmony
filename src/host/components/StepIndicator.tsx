import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formSteps } from '../types';

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="px-4 py-3">
      {/* Step dots */}
      <div className="flex items-center justify-center gap-2">
        {formSteps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : stepNumber}
              </div>
              {index < formSteps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-6 transition-colors",
                    stepNumber < currentStep ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Current step info */}
      <div className="mt-3 text-center">
        <p className="text-sm font-medium text-foreground">
          {formSteps[currentStep - 1]?.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {formSteps[currentStep - 1]?.description}
        </p>
      </div>
    </div>
  );
}
