import { LayoutDashboard, List, PlusCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HostTabId } from '../types';

interface HostBottomNavProps {
  activeTab: HostTabId;
  onTabChange: (tab: HostTabId) => void;
}

const tabs: { id: HostTabId; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-6 w-6" /> },
  { id: 'listings', label: 'Listings', icon: <List className="h-6 w-6" /> },
  { id: 'add-property', label: 'Add', icon: <PlusCircle className="h-6 w-6" /> },
  { id: 'profile', label: 'Profile', icon: <User className="h-6 w-6" /> },
];

export function HostBottomNav({ activeTab, onTabChange }: HostBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md safe-area-bottom">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isAddButton = tab.id === 'add-property';
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 py-1 transition-all duration-200",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200",
                  isActive && !isAddButton && "bg-primary/10",
                  isAddButton && "bg-primary text-primary-foreground rounded-full"
                )}
              >
                {tab.icon}
              </div>
              <span className={cn(
                "text-xs font-medium", 
                isActive && "text-primary",
                isAddButton && "text-primary"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
