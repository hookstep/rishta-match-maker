import { useUser, useClerk, useAuth as useClerkAuth } from "@clerk/clerk-react";
import { useMemo } from "react";

function adminEmailList(): string[] {
  const injected =
    typeof __RISHTA_ADMIN_EMAILS__ !== "undefined" ? String(__RISHTA_ADMIN_EMAILS__).trim() : "";
  const combined = [
    import.meta.env.VITE_ADMIN_EMAILS,
    import.meta.env.NEXT_PUBLIC_ADMIN_EMAILS,
    injected,
  ]
    .filter((x): x is string => typeof x === "string" && x.trim().length > 0)
    .join(",");
  return combined
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

const adminEmails = adminEmailList();

export function useAuth() {
  const { user, isLoaded: userLoaded } = useUser();
  const { isSignedIn, isLoaded: sessionLoaded } = useClerkAuth();
  const { signOut } = useClerk();

  const loading = !userLoaded || !sessionLoaded;

  const isAdmin = useMemo(() => {
    const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
    if (!email) return false;
    return adminEmails.includes(email);
  }, [user]);

  return {
    /** Clerk user; use `user?.id` for `user_id` in profiles. */
    user,
    loading,
    isAdmin,
    isSignedIn: Boolean(isSignedIn),
    signOut: () => signOut({ redirectUrl: "/auth" }),
  };
}
