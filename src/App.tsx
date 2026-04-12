import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { AuthBridge } from "@/components/AuthBridge";
import { useAuth } from "@/hooks/useAuth";
import Auth from "./pages/Auth";
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Discover from "./pages/Discover";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import ProfileForm from "./pages/ProfileForm";
import ProfileDetail from "./pages/ProfileDetail";
import NotFound from "./pages/NotFound";
import { clerkPublishableKey } from "@/lib/public-env";

const queryClient = new QueryClient();

const clerkKey = clerkPublishableKey();

const MissingClerk = () => (
  <div className="flex min-h-screen items-center justify-center bg-background p-6 text-center">
    <div className="max-w-md space-y-3">
      <h1 className="font-serif text-2xl font-bold">Clerk not configured</h1>
      <p className="text-muted-foreground">
        Add <code className="rounded bg-muted px-1">VITE_CLERK_PUBLISHABLE_KEY</code> to <code className="rounded bg-muted px-1">.env</code>{" "}
        and restart Vite.
      </p>
    </div>
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, isSignedIn } = useAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }
  if (!isSignedIn) return <Navigate to="/auth" replace />;
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, isSignedIn } = useAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }
  if (isSignedIn && user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

const RootRedirect = () => {
  const { loading, isSignedIn, user } = useAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }
  if (isSignedIn && user) return <Navigate to="/dashboard" replace />;
  return <Navigate to="/auth" replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<RootRedirect />} />
    {/* Clerk path routing uses nested paths (e.g. /auth/sso-callback, /sign-up/sso-callback). */}
    <Route
      path="/auth/*"
      element={
        <PublicRoute>
          <Auth />
        </PublicRoute>
      }
    />
    <Route
      path="/sign-up/*"
      element={
        <PublicRoute>
          <SignUpPage />
        </PublicRoute>
      }
    />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/discover"
      element={
        <ProtectedRoute>
          <Discover />
        </ProtectedRoute>
      }
    />
    <Route
      path="/settings"
      element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <Admin />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile/new"
      element={
        <ProtectedRoute>
          <ProfileForm />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile/:id"
      element={
        <ProtectedRoute>
          <ProfileDetail />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile/:id/edit"
      element={
        <ProtectedRoute>
          <ProfileForm />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => {
  if (!clerkKey?.trim()) return <MissingClerk />;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ClerkProvider publishableKey={clerkKey.trim()} afterSignOutUrl="/auth">
          <AuthBridge>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AppRoutes />
            </TooltipProvider>
          </AuthBridge>
        </ClerkProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
