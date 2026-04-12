import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { supabaseAnonKey, supabaseUrl } from "@/lib/public-env";

const SUPABASE_URL = supabaseUrl();
const SUPABASE_PUBLISHABLE_KEY = supabaseAnonKey();

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.warn(
    "[supabase] Missing URL or anon key. Add VITE_SUPABASE_URL + VITE_SUPABASE_PUBLISHABLE_KEY to the same .env.local as rishta-matchmaker (or this app’s cwd).",
  );
}

type TokenFn = () => Promise<string | null | undefined>;

let clerkTokenGetter: TokenFn | null = null;

/** Called from `AuthBridge` so PostgREST requests carry the Clerk→Supabase JWT (when configured). */
export function setSupabaseClerkTokenGetter(fn: TokenFn | null) {
  clerkTokenGetter = fn;
}

const supabaseFetch: typeof fetch = async (input, init) => {
  const headers = new Headers(init?.headers);
  if (clerkTokenGetter) {
    try {
      const t = await clerkTokenGetter();
      if (t) headers.set("Authorization", `Bearer ${t}`);
    } catch {
      /* no session yet */
    }
  }
  return fetch(input, { ...init, headers });
};

export const supabase = createClient<Database>(
  SUPABASE_URL ?? "",
  SUPABASE_PUBLISHABLE_KEY ?? "",
  {
    global: { fetch: supabaseFetch },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  },
);
