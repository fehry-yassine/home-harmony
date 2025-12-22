import { useState } from 'react';
import { HostBottomNav } from '../components/HostBottomNav';
import { HostDashboard } from './HostDashboard';
import { HostListingsPage } from './HostListingsPage';
import { HostProfilePage } from './HostProfilePage';
import { AddPropertyPage } from './AddPropertyPage';
import { HostTabId } from '../types';

interface HostIndexProps {
  onSwitchToRenter: () => void;
  onLogout: () => void;
}

export function HostIndex({ onSwitchToRenter, onLogout }: HostIndexProps) {
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
        <HostProfilePage onLogout={onLogout} onSwitchToRenter={onSwitchToRenter} />
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
