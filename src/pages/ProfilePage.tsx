import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, ChevronRight, Heart, Bell, HelpCircle, Building2, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';

export function ProfilePage() {
  const { user, profile, role, isHost, isAdmin, signOut } = useAuth();
  const { data: favorites } = useFavorites();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleBecomeHost = () => {
    navigate('/become-host');
  };

  const handleGoToHost = () => {
    navigate('/host');
  };

  const handleGoToAdmin = () => {
    navigate('/admin');
  };

  // If not logged in, show login prompt
  if (!user) {
    return (
      <div className="animate-fade-in pb-24">
        <div className="p-4 pt-6">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        </div>

        <div className="mx-4 flex flex-col items-center rounded-2xl bg-card p-8 text-center shadow-card">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Sign in to continue</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Create an account to save favorites and list properties
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="mt-4 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: Heart, label: 'My Favorites', value: `${favorites?.length || 0} saved` },
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
          src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || 'User')}&background=0d9488&color=fff`}
          alt={profile?.name || 'User'}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">{profile?.name || 'User'}</h2>
          <p className="text-sm text-muted-foreground">{profile?.email || user.email}</p>
          <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium capitalize text-primary">
            {role}
          </span>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <Settings className="h-5 w-5 text-secondary-foreground" />
        </button>
      </div>

      {/* Host Mode Card */}
      {isHost ? (
        <div className="mx-4 mb-4">
          <button
            onClick={handleGoToHost}
            className="flex w-full items-center gap-4 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-4 transition-colors hover:from-primary/15 hover:to-primary/10"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">Go to Host Dashboard</p>
              <p className="text-xs text-muted-foreground">Manage your properties</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      ) : (
        <div className="mx-4 mb-4">
          <button
            onClick={handleBecomeHost}
            className="flex w-full items-center gap-4 rounded-2xl border-2 border-dashed border-primary/30 p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">Become a Host</p>
              <p className="text-xs text-muted-foreground">Start listing your properties</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Admin Panel Link */}
      {isAdmin && (
        <div className="mx-4 mb-4">
          <button
            onClick={handleGoToAdmin}
            className="flex w-full items-center gap-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 p-4 transition-colors hover:from-amber-500/15 hover:to-amber-500/10"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20">
              <Shield className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">Admin Dashboard</p>
              <p className="text-xs text-muted-foreground">Manage the platform</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      )}

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
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-destructive/10 p-4 text-destructive transition-colors hover:bg-destructive/20"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
}
