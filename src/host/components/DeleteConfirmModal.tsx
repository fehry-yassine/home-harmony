import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  propertyTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ isOpen, propertyTitle, onConfirm, onCancel }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm animate-scale-in rounded-2xl bg-card p-6 shadow-xl">
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>
          
          <h3 className="mt-4 text-lg font-semibold text-foreground">Delete Property?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Are you sure you want to delete "<span className="font-medium text-foreground">{propertyTitle}</span>"? This action cannot be undone.
          </p>

          <div className="mt-6 flex w-full gap-3">
            <button
              onClick={onCancel}
              className="flex-1 rounded-xl bg-secondary py-3 font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-xl bg-destructive py-3 font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
