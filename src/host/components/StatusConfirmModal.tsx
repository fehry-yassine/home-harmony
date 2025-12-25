import { AlertTriangle, Eye, EyeOff, Archive, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusAction = 'publish' | 'unpublish' | 'archive';

interface StatusConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: StatusAction;
  propertyTitle: string;
  isLoading?: boolean;
}

const actionConfig: Record<StatusAction, {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  confirmText: string;
  confirmBg: string;
}> = {
  publish: {
    title: 'Publish Property',
    description: 'Your property will be visible to renters and appear in search results.',
    icon: Eye,
    iconBg: 'bg-emerald-500',
    confirmText: 'Publish',
    confirmBg: 'bg-emerald-500 hover:bg-emerald-600',
  },
  unpublish: {
    title: 'Unpublish Property',
    description: 'Your property will be hidden from renters and won\'t appear in search results.',
    icon: EyeOff,
    iconBg: 'bg-amber-500',
    confirmText: 'Unpublish',
    confirmBg: 'bg-amber-500 hover:bg-amber-600',
  },
  archive: {
    title: 'Archive Property',
    description: 'Your property will be archived and hidden from all views. You can unarchive it later.',
    icon: Archive,
    iconBg: 'bg-muted-foreground',
    confirmText: 'Archive',
    confirmBg: 'bg-muted-foreground hover:bg-muted-foreground/80',
  },
};

export function StatusConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  action,
  propertyTitle,
  isLoading = false,
}: StatusConfirmModalProps) {
  if (!isOpen) return null;

  const config = actionConfig[action];
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm animate-fade-in rounded-2xl bg-card p-6 shadow-xl">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className={cn("flex h-14 w-14 items-center justify-center rounded-full", config.iconBg)}>
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="mb-6 text-center">
          <h2 className="text-lg font-semibold text-foreground">{config.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-1">
            "{propertyTitle}"
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {config.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-border py-3 font-medium text-foreground hover:bg-muted disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn("flex-1 rounded-xl py-3 font-semibold text-white disabled:opacity-50", config.confirmBg)}
          >
            {isLoading ? (
              <Loader2 className="mx-auto h-5 w-5 animate-spin" />
            ) : (
              config.confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
