/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  /** Stripe Payment Link or Checkout URL for ₹499/month subscription */
  readonly VITE_STRIPE_SUBSCRIPTION_CHECKOUT_URL?: string;
  /** Override default desk email (default: rishtewalesardarji@gmail.com) */
  readonly VITE_DEFAULT_APP_EMAIL?: string;
  /** Canonical site URL for SEO meta (no trailing slash), e.g. https://rishtewalesardarji.in */
  readonly VITE_PUBLIC_SITE_URL?: string;
  /** Google AdSense client id, e.g. ca-pub-1234567890123456 — loads script on marketing home only when set */
  readonly VITE_ADSENSE_CLIENT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
