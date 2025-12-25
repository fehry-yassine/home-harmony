import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, CheckCircle2, Home, DollarSign, Users, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function BecomeHostPage() {
  const navigate = useNavigate();
  const { user, isHost, refreshProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already a host
  if (isHost) {
    navigate('/host', { replace: true });
    return null;
  }

  // Redirect if not logged in
  if (!user) {
    navigate('/auth', { replace: true });
    return null;
  }

  const benefits = [
    {
      icon: Home,
      title: 'List Your Properties',
      description: 'Showcase your spaces to thousands of potential renters',
    },
    {
      icon: DollarSign,
      title: 'Earn Extra Income',
      description: 'Turn your unused spaces into a source of revenue',
    },
    {
      icon: Users,
      title: 'Connect with Renters',
      description: 'Build relationships with quality tenants',
    },
  ];

  const handleBecomeHost = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('become-host', {
        body: {},
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        toast.success('Welcome to Home Harmony Hosting!', {
          description: 'You can now list your properties.',
        });
        
        // Refresh profile to get updated role, then navigate
        await refreshProfile();
        navigate('/host', { replace: true });
      } else {
        throw new Error(data?.error || 'Failed to upgrade to host');
      }
    } catch (error: any) {
      console.error('Error becoming host:', error);
      toast.error('Failed to become a host', {
        description: error.message || 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-border bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Become a Host</h1>
      </div>

      <div className="mx-auto max-w-lg px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
            <Building2 className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            Start Your Hosting Journey
          </h2>
          <p className="text-muted-foreground">
            Join our community of hosts and share your spaces with renters looking for their next home.
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-8 space-y-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex items-start gap-4 rounded-xl bg-card p-4 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* What You'll Get */}
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">What you'll get:</h3>
          <ul className="space-y-3">
            {[
              'Access to the Host Dashboard',
              'Ability to create and manage listings',
              'Analytics and insights for your properties',
              'Keep your Renter account active',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Button
          onClick={handleBecomeHost}
          disabled={isLoading}
          className="w-full py-6 text-lg font-semibold"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Setting up your account...
            </>
          ) : (
            'Become a Host'
          )}
        </Button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By becoming a host, you agree to our hosting terms and community guidelines.
        </p>
      </div>
    </div>
  );
}
