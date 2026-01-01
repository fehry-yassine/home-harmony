import { useMemo } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { 
  CompletenessResult, 
  getCompletenessColor, 
  getCompletenessBarColor 
} from '../utils/completenessScore';
import { cn } from '@/lib/utils';

interface CompletenessIndicatorProps {
  result: CompletenessResult;
  variant?: 'compact' | 'detailed';
  className?: string;
}

export function CompletenessIndicator({ 
  result, 
  variant = 'compact',
  className 
}: CompletenessIndicatorProps) {
  const { percentage, completed, missing } = result;
  
  const colorClass = getCompletenessColor(percentage);
  const barColorClass = getCompletenessBarColor(percentage);

  if (variant === 'compact') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="h-2 flex-1 max-w-24 rounded-full bg-muted overflow-hidden">
          <div 
            className={cn("h-full transition-all duration-300", barColorClass)}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={cn("text-sm font-medium", colorClass)}>
          {percentage}%
        </span>
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl bg-card p-4 shadow-card", className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground">Listing Completeness</h3>
        <span className={cn("text-lg font-bold", colorClass)}>
          {percentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden mb-4">
        <div 
          className={cn("h-full transition-all duration-500 ease-out", barColorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {completed.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span className="text-muted-foreground">{item}</span>
          </div>
        ))}
        {missing.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-muted-foreground/70">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
