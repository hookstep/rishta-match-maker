import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart } from "lucide-react";
import { CheckoutButton } from "@/components/CheckoutButton";
import { apiDisplayTarget, mobileGate } from "@/lib/public-env";

const Admin = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  const gate = mobileGate();
  const proxy = apiDisplayTarget();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Link to="/dashboard" className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
          </Link>
          <h1 className="text-lg font-semibold">Operator</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-4 px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Environment</CardTitle>
            <CardDescription>Read-only summary (no live toggles).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Mobile gate: </span>
              <code className="rounded bg-muted px-1">{gate}</code> (warn | off | block via{" "}
              <code className="rounded bg-muted px-1">NEXT_PUBLIC_MOBILE_GATE</code> /{" "}
              <code className="rounded bg-muted px-1">VITE_MOBILE_GATE</code>)
            </p>
            <p>
              <span className="text-muted-foreground">API proxy target: </span>
              <code className="break-all rounded bg-muted px-1 text-xs">{proxy}</code>
            </p>
            <p className="text-muted-foreground">
              Defaults to <code className="rounded bg-muted px-1">NEXT_PUBLIC_APP_URL</code> for <code className="rounded bg-muted px-1">/api/*</code>{" "}
              proxy, or set <code className="rounded bg-muted px-1">VITE_API_PROXY_TARGET</code> to override.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Billing smoke</CardTitle>
            <CardDescription>Opens Stripe Checkout when proxy + server are configured.</CardDescription>
          </CardHeader>
          <CardContent>
            <CheckoutButton />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
