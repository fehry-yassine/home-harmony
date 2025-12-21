import { User, Settings, LogOut, ChevronRight, Heart, Bell, HelpCircle } from 'lucide-react';

interface ProfilePageProps {
  onLogout: () => void;
}

export function ProfilePage({ onLogout }: ProfilePageProps) {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
  };

  const menuItems = [
    { icon: Heart, label: 'My Favorites', value: '12 saved' },
    { icon: Bell, label: 'Notifications', value: 'On' },
    { icon: Settings, label: 'Settings', value: '' },
    { icon: HelpCircle, label: 'Help & Support', value: '' },
  ];

  return (
    <div className="animate-fade-in pb-24">
      {/* Header */}
      <div className="p-4 pt-6">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </div>

      {/* User Card */}
      <div className="mx-4 mb-6 flex items-center gap-4 rounded-2xl bg-card p-4 shadow-card">
        <img
          src={user.avatar}
          alt={user.name}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <Settings className="h-5 w-5 text-secondary-foreground" />
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
