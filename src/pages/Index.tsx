import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav, TabId } from '@/components/BottomNav';
import { HomePage } from '@/pages/HomePage';
import { SearchPage } from '@/pages/SearchPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { PropertyDetailsPage } from '@/pages/PropertyDetailsPage';
import { useAuth } from '@/contexts/AuthContext';
import { useFavoriteIds, useToggleFavorite } from '@/hooks/useFavorites';

type Screen = 'main' | 'property-details';

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [screen, setScreen] = useState<Screen>('main');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Use real favorites from DB if logged in
  const { data: favoriteIds = [] } = useFavoriteIds();
  const toggleFavoriteMutation = useToggleFavorite();

  const handlePropertyClick = (id: string) => {
    setSelectedPropertyId(id);
    setScreen('property-details');
  };

  const handleBack = () => {
    setScreen('main');
    setSelectedPropertyId(null);
  };

  const handleFavoriteToggle = (id: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    toggleFavoriteMutation.mutate(id);
  };

  const handleSearchFocus = () => {
    setActiveTab('search');
  };

  const handleExplore = () => {
    setActiveTab('home');
  };

  // Property details screen
  if (screen === 'property-details' && selectedPropertyId) {
    return (
      <PropertyDetailsPage
        propertyId={selectedPropertyId}
        onBack={handleBack}
        isFavorite={favoriteIds.includes(selectedPropertyId)}
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
          favorites={favoriteIds}
          onFavoriteToggle={handleFavoriteToggle}
        />
      )}
      {activeTab === 'search' && (
        <SearchPage
          onPropertyClick={handlePropertyClick}
          onBack={() => setActiveTab('home')}
          favorites={favoriteIds}
          onFavoriteToggle={handleFavoriteToggle}
        />
      )}
      {activeTab === 'favorites' && (
        <FavoritesPage
          favorites={favoriteIds}
          onFavoriteToggle={handleFavoriteToggle}
          onPropertyClick={handlePropertyClick}
          onExplore={handleExplore}
        />
      )}
      {activeTab === 'profile' && (
        <ProfilePage />
      )}
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
