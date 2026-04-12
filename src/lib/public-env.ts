/** Clerk publishable — same key as `rishta-matchmaker` (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`). */
export function clerkPublishableKey(): string {
  const a = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const b = import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (typeof a === "string" && a.trim() ? a : typeof b === "string" && b.trim() ? b : "").trim();
}

/** Same as Next app `NEXT_PUBLIC_MOBILE_GATE`. */
export function mobileGate(): string {
  const a = import.meta.env.VITE_MOBILE_GATE;
  const b = import.meta.env.NEXT_PUBLIC_MOBILE_GATE;
  const v = (typeof a === "string" && a.trim() ? a : typeof b === "string" && b.trim() ? b : "warn").trim();
  return v || "warn";
}

/** Supabase URL — keep `VITE_*` in the same env file as rishta (or only in cwd). */
export function supabaseUrl(): string | undefined {
  const a = import.meta.env.VITE_SUPABASE_URL;
  const b = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
  const v = typeof a === "string" && a.trim() ? a : typeof b === "string" && b.trim() ? b : "";
  return v.trim() || undefined;
}

/** Billing API proxy target shown in Admin (same as `NEXT_PUBLIC_APP_URL` when `VITE_API_PROXY_TARGET` unset). */
export function apiDisplayTarget(): string {
  const a = import.meta.env.VITE_API_PROXY_TARGET;
  const b = import.meta.env.NEXT_PUBLIC_APP_URL;
  const v =
    typeof a === "string" && a.trim()
      ? a.trim()
      : typeof b === "string" && b.trim()
        ? b.trim()
        : "(not set)";
  return v;
}

export function supabaseAnonKey(): string | undefined {
  const a = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const b = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const c = import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const v =
    typeof a === "string" && a.trim()
      ? a
      : typeof b === "string" && b.trim()
        ? b
        : typeof c === "string" && c.trim()
          ? c
          : "";
  return v.trim() || undefined;
}
