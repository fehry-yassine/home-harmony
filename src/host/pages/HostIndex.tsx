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
  const [editingPropertyId, setEditingPropertyId] = useState<string | undefined>(undefined);

  const handleAddProperty = () => {
    setEditingPropertyId(undefined);
    setShowAddProperty(true);
  };

  const handleEditProperty = (id: string) => {
    setEditingPropertyId(id);
    setShowAddProperty(true);
  };

  const handlePropertySuccess = () => {
    setShowAddProperty(false);
    setEditingPropertyId(undefined);
    setActiveTab('listings');
  };

  const handleBackFromForm = () => {
    setShowAddProperty(false);
    setEditingPropertyId(undefined);
  };

  if (showAddProperty) {
    return (
      <AddPropertyPage
        onBack={handleBackFromForm}
        onSuccess={handlePropertySuccess}
        editingId={editingPropertyId}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {activeTab === 'dashboard' && (
        <HostDashboard
          onAddProperty={handleAddProperty}
          onViewListings={() => setActiveTab('listings')}
        />
      )}
      {activeTab === 'listings' && (
        <HostListingsPage
          onAddProperty={handleAddProperty}
          onEditProperty={handleEditProperty}
        />
      )}
      {activeTab === 'profile' && (
        <HostProfilePage onLogout={handleLogout} onSwitchToRenter={handleSwitchToRenter} />
      )}

      <HostBottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'add-property') {
            handleAddProperty();
          } else {
            setActiveTab(tab);
          }
        }}
      />
    </div>
  );
}
