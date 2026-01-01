import { Lightbulb, AlertTriangle } from 'lucide-react';
import { QualityWarning } from '../utils/completenessScore';
import { cn } from '@/lib/utils';

interface QualityWarningsProps {
  warnings: QualityWarning[];
  className?: string;
}

export function QualityWarnings({ warnings, className }: QualityWarningsProps) {
  if (warnings.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      {warnings.map((warning) => (
        <div
          key={warning.id}
          className={cn(
            "flex items-start gap-3 rounded-xl p-3 text-sm",
            warning.type === 'warning' 
              ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
              : "bg-primary/5 text-muted-foreground"
          )}
        >
          {warning.type === 'warning' ? (
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          ) : (
            <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" />
          )}
          <span>{warning.message}</span>
        </div>
      ))}
    </div>
  );
}
