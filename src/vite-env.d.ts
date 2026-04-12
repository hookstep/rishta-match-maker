/// <reference types="vite/client" />

/** Injected in `vite.config.ts` from `ADMIN_EMAILS` when loading `rishta-matchmaker/.env.local`. */
declare const __RISHTA_ADMIN_EMAILS__: string;

interface ImportMetaEnv {
  readonly VITE_CLERK_PUBLISHABLE_KEY?: string;
  readonly NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly NEXT_PUBLIC_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  readonly NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
  readonly NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
  readonly VITE_ADMIN_EMAILS?: string;
  readonly NEXT_PUBLIC_ADMIN_EMAILS?: string;
  readonly VITE_MOBILE_GATE?: string;
  readonly NEXT_PUBLIC_MOBILE_GATE?: string;
  readonly VITE_API_PROXY_TARGET?: string;
  readonly NEXT_PUBLIC_APP_URL?: string;
  /** Set to `"true"` only after Clerk JWT template `supabase` + Supabase third-party auth work. */
  readonly VITE_SUPABASE_CLERK_JWT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
