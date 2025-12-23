import { useNavigate } from 'react-router-dom';
import { Users, Building2, Eye, Heart, DollarSign, ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAdminStats, getPropertiesByCity, getViewsOverTime } from '@/services/adminService';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: getAdminStats,
  });

  const { data: citiesData } = useQuery({
    queryKey: ['propertiesByCity'],
    queryFn: getPropertiesByCity,
  });

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 pt-6">
        <button onClick={() => navigate('/')} className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-card">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Platform overview</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        <StatCard title="Total Users" value={stats?.total_users || 0} icon={<Users className="h-5 w-5" />} />
        <StatCard title="Total Properties" value={stats?.total_properties || 0} icon={<Building2 className="h-5 w-5" />} />
        <StatCard title="Total Views" value={stats?.total_views || 0} icon={<Eye className="h-5 w-5" />} />
        <StatCard title="Total Favorites" value={stats?.total_favorites || 0} icon={<Heart className="h-5 w-5" />} />
        <StatCard title="Revenue" value={`$${stats?.total_revenue?.toFixed(2) || '0.00'}`} icon={<DollarSign className="h-5 w-5" />} isHighlight />
        <StatCard title="Published" value={stats?.published_properties || 0} icon={<Building2 className="h-5 w-5" />} />
      </div>

      {/* Properties by City */}
      <div className="mx-4 rounded-2xl bg-card p-4 shadow-card">
        <h3 className="mb-4 font-semibold text-foreground">Properties by City</h3>
        {citiesData && citiesData.length > 0 ? (
          <div className="space-y-2">
            {citiesData.map((city) => (
              <div key={city.city} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{city.city}</span>
                <span className="font-medium text-foreground">{city.count}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No data available</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, isHighlight }: { title: string; value: number | string; icon: React.ReactNode; isHighlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 shadow-card ${isHighlight ? 'bg-primary/10' : 'bg-card'}`}>
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isHighlight ? 'bg-primary/20 text-primary' : 'bg-secondary text-secondary-foreground'}`}>
          {icon}
        </div>
      </div>
      <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{title}</p>
    </div>
  );
}
