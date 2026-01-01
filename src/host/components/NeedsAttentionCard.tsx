import { AlertCircle, ArrowRight } from 'lucide-react';
import { PropertyWithImages } from '@/services/propertyService';
import { calculatePropertyCompleteness } from '../utils/completenessScore';
import { cn } from '@/lib/utils';

interface NeedsAttentionCardProps {
  properties: PropertyWithImages[];
  onEditProperty: (id: string) => void;
}

export function NeedsAttentionCard({ properties, onEditProperty }: NeedsAttentionCardProps) {
  // Find properties that need attention (incomplete or have issues)
  const propertiesNeedingAttention = properties
    .map((property) => {
      const completeness = calculatePropertyCompleteness(property);
      return {
        property,
        completeness,
        issues: [] as string[],
      };
    })
    .filter(({ property, completeness }) => {
      // Draft with low completeness
      if (property.status === 'draft' && completeness.percentage < 80) {
        return true;
      }
      // Published but has warnings
      if (property.status === 'published' && completeness.warnings.length > 0) {
        return true;
      }
      // No images
      if (!property.images || property.images.length === 0) {
        return true;
      }
      return false;
    })
    .slice(0, 3); // Show max 3

  if (propertiesNeedingAttention.length === 0) return null;

  return (
    <div className="p-4">
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <h3 className="font-semibold text-foreground">Needs Attention</h3>
          <span className="ml-auto text-xs bg-amber-500/20 text-amber-700 px-2 py-0.5 rounded-full">
            {propertiesNeedingAttention.length}
          </span>
        </div>

        <div className="space-y-2">
          {propertiesNeedingAttention.map(({ property, completeness }) => (
            <button
              key={property.id}
              onClick={() => onEditProperty(property.id)}
              className="w-full flex items-center gap-3 rounded-xl bg-background p-3 text-left transition-colors hover:bg-muted/50"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {property.title || 'Untitled Property'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {completeness.percentage < 80 
                    ? `${completeness.percentage}% complete - ${completeness.missing[0]}`
                    : completeness.warnings[0]?.message || 'Review recommended'
                  }
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className={cn(
                    "h-2 w-12 rounded-full overflow-hidden bg-muted"
                  )}
                >
                  <div 
                    className={cn(
                      "h-full",
                      completeness.percentage >= 80 ? "bg-emerald-500" :
                      completeness.percentage >= 50 ? "bg-amber-500" : "bg-red-500"
                    )}
                    style={{ width: `${completeness.percentage}%` }}
                  />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
