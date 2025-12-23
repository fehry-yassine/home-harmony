import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Building2 } from 'lucide-react';

export function AuthPage() {
  const { user, isLoading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
            <Building2 className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">RentEase</h1>
            <p className="text-sm text-muted-foreground">Find your perfect home</p>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold text-foreground">Welcome back</h2>
          <p className="text-muted-foreground">
            Sign in to browse properties, save favorites, and more
          </p>
        </div>

        {/* Sign in Button */}
        <button
          onClick={signInWithGoogle}
          className="flex w-full max-w-sm items-center justify-center gap-3 rounded-2xl border border-border bg-card px-6 py-4 font-medium text-foreground shadow-card transition-all hover:bg-secondary"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Terms */}
        <p className="mt-6 max-w-sm text-center text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <a href="#" className="text-primary underline">Terms of Service</a> and{' '}
          <a href="#" className="text-primary underline">Privacy Policy</a>
        </p>
      </div>

      {/* Features */}
      <div className="border-t border-border bg-card p-6">
        <div className="mx-auto grid max-w-lg grid-cols-3 gap-4 text-center">
          <div>
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <span className="text-lg">🏠</span>
            </div>
            <p className="text-xs text-muted-foreground">Browse listings</p>
          </div>
          <div>
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <span className="text-lg">❤️</span>
            </div>
            <p className="text-xs text-muted-foreground">Save favorites</p>
          </div>
          <div>
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <span className="text-lg">🔑</span>
            </div>
            <p className="text-xs text-muted-foreground">List properties</p>
          </div>
        </div>
      </div>
    </div>
  );
}
