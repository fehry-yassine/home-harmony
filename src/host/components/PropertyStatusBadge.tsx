import { cn } from '@/lib/utils';
import { Eye, EyeOff, Archive } from 'lucide-react';

type PropertyStatus = 'draft' | 'published' | 'archived';

interface PropertyStatusBadgeProps {
  status: PropertyStatus;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

const statusConfig: Record<PropertyStatus, {
  label: string;
  className: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  draft: {
    label: 'Draft',
    className: 'bg-amber-500/90 text-white',
    icon: EyeOff,
  },
  published: {
    label: 'Published',
    className: 'bg-emerald-500/90 text-white',
    icon: Eye,
  },
  archived: {
    label: 'Archived',
    className: 'bg-muted-foreground/80 text-white',
    icon: Archive,
  },
};

export function PropertyStatusBadge({ 
  status, 
  size = 'sm',
  showIcon = false 
}: PropertyStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.draft;
  const Icon = config.icon;

  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-full font-semibold",
      size === 'sm' ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
      config.className
    )}>
      {showIcon && <Icon className={cn(size === 'sm' ? "h-3 w-3" : "h-4 w-4")} />}
      {config.label}
    </span>
  );
}
