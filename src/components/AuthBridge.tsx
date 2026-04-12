import { useEffect, type ReactNode } from "react";
import { useAuth as useClerkAuth } from "@clerk/clerk-react";
import { setSupabaseClerkTokenGetter } from "@/integrations/supabase/client";

/**
 * When `VITE_SUPABASE_CLERK_JWT` is not `"true"`, Supabase calls use only the anon key (same as the old
 * Lovable + Supabase Auth client after sign-in, as long as your RLS allows it). Turn on only after you add
 * Clerk’s JWT template named `supabase` and Supabase Third-Party Auth so PostgREST accepts the Bearer token.
 */
export function AuthBridge({ children }: { children: ReactNode }) {
  const { getToken, isLoaded } = useClerkAuth();

  useEffect(() => {
    if (!isLoaded) return;
    const attachClerkJwt = import.meta.env.VITE_SUPABASE_CLERK_JWT === "true";
    if (!attachClerkJwt) {
      setSupabaseClerkTokenGetter(null);
      return () => setSupabaseClerkTokenGetter(null);
    }
    setSupabaseClerkTokenGetter(async () => {
      try {
        return (await getToken({ template: "supabase" })) ?? null;
      } catch {
        return null;
      }
    });
    return () => setSupabaseClerkTokenGetter(null);
  }, [getToken, isLoaded]);

  return <>{children}</>;
}
