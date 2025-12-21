import { useState, useEffect } from 'react';
import { BottomNav, TabId } from '@/components/BottomNav';
import { HomePage } from '@/pages/HomePage';
import { SearchPage } from '@/pages/SearchPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { PropertyDetailsPage } from '@/pages/PropertyDetailsPage';

type Screen = 'main' | 'property-details';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [screen, setScreen] = useState<Screen>('main');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('rentease-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('rentease-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handlePropertyClick = (id: string) => {
    setSelectedPropertyId(id);
    setScreen('property-details');
  };

  const handleBack = () => {
    setScreen('main');
    setSelectedPropertyId(null);
  };

  const handleFavoriteToggle = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSearchFocus = () => {
    setActiveTab('search');
  };

  const handleExplore = () => {
    setActiveTab('home');
  };

  const handleLogout = () => {
    // Mock logout - will integrate with Supabase later
    console.log('Logout clicked');
  };

  // Property details screen
  if (screen === 'property-details' && selectedPropertyId) {
    return (
      <PropertyDetailsPage
        propertyId={selectedPropertyId}
        onBack={handleBack}
        isFavorite={favorites.includes(selectedPropertyId)}
        onFavoriteToggle={handleFavoriteToggle}
      />
    );
  }

  // Main app with bottom nav
  return (
    <div className="min-h-screen bg-background">
      {activeTab === 'home' && (
        <HomePage
          onPropertyClick={handlePropertyClick}
          onSearchFocus={handleSearchFocus}
          favorites={favorites}
          onFavoriteToggle={handleFavoriteToggle}
        />
      )}
      {activeTab === 'search' && (
        <SearchPage
          onPropertyClick={handlePropertyClick}
          onBack={() => setActiveTab('home')}
          favorites={favorites}
          onFavoriteToggle={handleFavoriteToggle}
        />
      )}
      {activeTab === 'favorites' && (
        <FavoritesPage
          favorites={favorites}
          onFavoriteToggle={handleFavoriteToggle}
          onPropertyClick={handlePropertyClick}
          onExplore={handleExplore}
        />
      )}
      {activeTab === 'profile' && (
        <ProfilePage onLogout={handleLogout} />
      )}
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
