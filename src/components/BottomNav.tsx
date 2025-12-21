import { Home, Search, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TabId = 'home' | 'search' | 'favorites' | 'profile';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <Home className="h-6 w-6" /> },
  { id: 'search', label: 'Search', icon: <Search className="h-6 w-6" /> },
  { id: 'favorites', label: 'Favorites', icon: <Heart className="h-6 w-6" /> },
  { id: 'profile', label: 'Profile', icon: <User className="h-6 w-6" /> },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md safe-area-bottom">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
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
                  isActive && "bg-primary/10"
                )}
              >
                {tab.icon}
              </div>
              <span className={cn("text-xs font-medium", isActive && "text-primary")}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
