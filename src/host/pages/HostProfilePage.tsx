import { User, Settings, LogOut, ChevronRight, Building2, ArrowLeftRight } from 'lucide-react';
import { mockHostUser } from '../data/mockData';

interface HostProfilePageProps {
  onLogout: () => void;
  onSwitchToRenter: () => void;
}

export function HostProfilePage({ onLogout, onSwitchToRenter }: HostProfilePageProps) {
  const menuItems = [
    { icon: Building2, label: 'My Listings', value: '3 properties' },
    { icon: Settings, label: 'Account Settings', value: '' },
  ];

  return (
    <div className="animate-fade-in pb-24">
      {/* Header */}
      <div className="p-4 pt-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">Host Profile</h1>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            Host Mode
          </span>
        </div>
      </div>

      {/* User Card */}
      <div className="mx-4 mb-6 flex items-center gap-4 rounded-2xl bg-card p-4 shadow-card">
        <img
          src={mockHostUser.avatar}
          alt={mockHostUser.name}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">{mockHostUser.name}</h2>
          <p className="text-sm text-muted-foreground">{mockHostUser.email}</p>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <Settings className="h-5 w-5 text-secondary-foreground" />
        </button>
      </div>

      {/* Switch to Renter Mode */}
      <div className="mx-4 mb-4">
        <button
          onClick={onSwitchToRenter}
          className="flex w-full items-center gap-4 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-4 transition-colors hover:from-primary/15 hover:to-primary/10"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
            <ArrowLeftRight className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-foreground">Switch to Renter Mode</p>
            <p className="text-xs text-muted-foreground">Browse and rent properties</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="mx-4 overflow-hidden rounded-2xl bg-card shadow-card">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            className={`flex w-full items-center gap-4 p-4 transition-colors hover:bg-secondary/50 ${
              index !== menuItems.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
            {item.value && <span className="text-sm text-muted-foreground">{item.value}</span>}
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="mx-4 mt-6">
        <button
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-destructive/10 p-4 text-destructive transition-colors hover:bg-destructive/20"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
}
