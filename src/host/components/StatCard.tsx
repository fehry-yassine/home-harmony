import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

export function StatCard({ title, value, icon, variant = 'default' }: StatCardProps) {
  const variantStyles = {
    default: 'bg-card',
    primary: 'bg-primary/10',
    success: 'bg-emerald-500/10',
    warning: 'bg-amber-500/10',
  };

  const iconStyles = {
    default: 'bg-secondary text-secondary-foreground',
    primary: 'bg-primary/20 text-primary',
    success: 'bg-emerald-500/20 text-emerald-600',
    warning: 'bg-amber-500/20 text-amber-600',
  };

  return (
    <div className={cn(
      "rounded-2xl p-4 shadow-card transition-transform hover:scale-[1.02]",
      variantStyles[variant]
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl",
          iconStyles[variant]
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
}
