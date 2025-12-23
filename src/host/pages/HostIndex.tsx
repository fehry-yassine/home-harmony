import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HostBottomNav } from '../components/HostBottomNav';
import { HostDashboard } from './HostDashboard';
import { HostListingsPage } from './HostListingsPage';
import { HostProfilePage } from './HostProfilePage';
import { AddPropertyPage } from './AddPropertyPage';
import { HostTabId } from '../types';
import { useAuth } from '@/contexts/AuthContext';

export function HostIndex() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const handleSwitchToRenter = () => navigate('/');
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };
  const [activeTab, setActiveTab] = useState<HostTabId>('dashboard');
  const [showAddProperty, setShowAddProperty] = useState(false);

  if (showAddProperty) {
    return (
      <AddPropertyPage
        onBack={() => setShowAddProperty(false)}
        onSuccess={() => {
          setShowAddProperty(false);
          setActiveTab('listings');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {activeTab === 'dashboard' && (
        <HostDashboard
          onAddProperty={() => setShowAddProperty(true)}
          onViewListings={() => setActiveTab('listings')}
        />
      )}
      {activeTab === 'listings' && (
        <HostListingsPage
          onAddProperty={() => setShowAddProperty(true)}
          onEditProperty={(id) => console.log('Edit:', id)}
        />
      )}
      {activeTab === 'profile' && (
        <HostProfilePage onLogout={handleLogout} onSwitchToRenter={handleSwitchToRenter} />
      )}

      <HostBottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'add-property') {
            setShowAddProperty(true);
          } else {
            setActiveTab(tab);
          }
        }}
      />
    </div>
  );
}
